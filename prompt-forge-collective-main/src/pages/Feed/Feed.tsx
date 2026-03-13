import { useState, useMemo } from 'react';
import { Search, Menu, X, Flame, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PromptCard from '@/components/PromptCard/PromptCard';
import { prompts, categories } from '@/utils/mockData';
import { toast } from 'sonner';

type SortMode = 'top' | 'new' | 'trending';

export default function Feed() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<SortMode>('top');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...prompts];
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.versions[p.currentVersion]?.promptText.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'top': result.sort((a, b) => b.upvotes.length - a.upvotes.length); break;
      case 'new': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'trending': result.sort((a, b) => (b.upvotes.length + b.forks.length * 2) - (a.upvotes.length + a.forks.length * 2)); break;
    }
    return result;
  }, [category, sort, search]);

  const handleUpvote = (id: string) => {
    toast.success('Upvote toggled!');
  };
  const handleFork = (id: string) => {
    toast.success('Prompt forked!');
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5 text-primary-foreground" /> : <SlidersHorizontal className="w-5 h-5 text-primary-foreground" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <motion.aside
            initial={false}
            className={`${sidebarOpen ? 'fixed inset-0 z-40 bg-background/95 backdrop-blur' : 'hidden'} lg:block lg:relative lg:bg-transparent lg:backdrop-blur-none w-full lg:w-56 shrink-0 border-r border-border`}
          >
            <div className="p-4 pt-6 lg:sticky lg:top-16">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Categories</h2>
              <nav className="space-y-0.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      category === cat
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    {cat === 'All' ? '🔥 All' : cat}
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 max-w-5xl">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search prompts, tags, authors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
          />
        </div>

        {/* Sort tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-border pb-2">
          {(['top', 'new', 'trending'] as SortMode[]).map(s => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                sort === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s === 'trending' && <Flame className="w-3 h-3 inline mr-1" />}
              {s}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <Search className="w-7 h-7 text-muted-foreground/40" />
            </div>
            <p className="text-foreground font-medium">No prompts found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different category or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(prompt => (
              <PromptCard key={prompt._id} prompt={prompt} onUpvote={handleUpvote} onFork={handleFork} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
