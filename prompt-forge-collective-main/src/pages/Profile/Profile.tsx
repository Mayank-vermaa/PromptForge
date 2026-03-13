import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { users, prompts, getInitials } from '@/utils/mockData';
import PromptCard from '@/components/PromptCard/PromptCard';
import { toast } from 'sonner';

type Tab = 'prompts' | 'forked' | 'upvoted';

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [tab, setTab] = useState<Tab>('prompts');

  const user = users.find(u => u.username === username);
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground mb-2">404</p>
          <p className="text-muted-foreground">User not found</p>
          <Link to="/" className="text-primary text-sm mt-4 inline-block hover:underline">← Back to feed</Link>
        </div>
      </div>
    );
  }

  const userPrompts = prompts.filter(p => p.author._id === user._id && !p.forkedFrom);
  const forkedPrompts = prompts.filter(p => p.author._id === user._id && p.forkedFrom);
  const upvotedPrompts = prompts.filter(p => p.upvotes.includes(user._id));

  const displayed = tab === 'prompts' ? userPrompts : tab === 'forked' ? forkedPrompts : upvotedPrompts;

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center text-xl font-bold text-primary">
          {getInitials(user.username)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{user.username}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{user.bio}</p>
          <p className="text-xs text-muted-foreground/60 mt-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6 pb-2">
        {([['prompts', 'My Prompts'], ['forked', 'Forked'], ['upvoted', 'Upvoted']] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              tab === key ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground">No prompts here yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map(p => (
            <PromptCard key={p._id} prompt={p} onUpvote={() => toast.success('Upvote toggled!')} onFork={() => toast.success('Forked!')} />
          ))}
        </div>
      )}
    </div>
  );
}
