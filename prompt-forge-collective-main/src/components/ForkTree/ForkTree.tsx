import { Link } from 'react-router-dom';
import { GitFork } from 'lucide-react';
import { Prompt, prompts as allPrompts, getInitials } from '@/utils/mockData';

interface ForkTreeProps {
  promptId: string;
}

function getForksForPrompt(id: string): Prompt[] {
  return allPrompts.filter(p => p.forkedFrom === id);
}

function ForkNode({ prompt, depth = 0 }: { prompt: Prompt; depth?: number }) {
  const childForks = getForksForPrompt(prompt._id);

  return (
    <div className={`${depth > 0 ? 'ml-6 border-l border-border pl-4' : ''}`}>
      <Link
        to={`/prompt/${prompt._id}`}
        className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 transition-colors group"
      >
        <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
          {getInitials(prompt.author.username)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {prompt.title}
          </p>
          <p className="text-[10px] text-muted-foreground">
            by {prompt.author.username} · v{prompt.currentVersion + 1}
          </p>
        </div>
        <GitFork className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      </Link>
      {childForks.map(fork => (
        <ForkNode key={fork._id} prompt={fork} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function ForkTree({ promptId }: ForkTreeProps) {
  // Find root
  let root = allPrompts.find(p => p._id === promptId);
  if (!root) return null;

  // Walk up to original
  while (root.forkedFrom) {
    const parent = allPrompts.find(p => p._id === root!.forkedFrom);
    if (parent) root = parent;
    else break;
  }

  const childForks = getForksForPrompt(root._id);
  if (childForks.length === 0 && root._id === promptId) {
    return (
      <div className="text-center py-6">
        <GitFork className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
        <p className="text-sm text-muted-foreground">No forks yet</p>
        <p className="text-xs text-muted-foreground/60">Be the first to fork this prompt</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <ForkNode prompt={root} />
    </div>
  );
}
