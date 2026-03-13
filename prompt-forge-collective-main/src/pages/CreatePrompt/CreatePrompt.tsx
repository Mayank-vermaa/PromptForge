import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { categories } from '@/utils/mockData';

const categoryOptions = categories.filter(c => c !== 'All');

export default function CreatePrompt() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categoryOptions[0]);
  const [promptText, setPromptText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 8) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Login to publish prompts'); return; }
    if (!title.trim() || !promptText.trim()) { toast.error('Title and prompt text are required'); return; }
    toast.success('Prompt published! 🔥');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Forge a New Prompt</h1>
      <p className="text-sm text-muted-foreground mb-6">Share your prompt with the community</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Cyberpunk City Generator"
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value as typeof category)}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
          >
            {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Prompt Text */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Prompt Text</label>
            <span className="text-[10px] text-muted-foreground">{promptText.length} chars</span>
          </div>
          <textarea
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            placeholder="Write your prompt here..."
            rows={10}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors resize-y scrollbar-thin"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Tags</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">
                {tag}
                <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              placeholder="Add tag..."
              className="flex-1 bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button type="button" onClick={addTag} className="px-3 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Screenshot upload placeholder */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Output Screenshot</label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-sm ember-gradient text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Publish Prompt 🔥
        </button>
      </form>
    </div>
  );
}
