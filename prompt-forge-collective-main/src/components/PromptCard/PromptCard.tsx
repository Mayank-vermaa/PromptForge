import { Link } from 'react-router-dom';
import { ArrowUpRight, GitFork, MessageSquare, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Prompt, getInitials, timeAgo } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';

const categoryColors: Record<string, string> = {
  'Vibe Coding': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Image Gen': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  'UI Design': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  'Writing': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  'Terminal': 'bg-lime-500/15 text-lime-400 border-lime-500/30',
  'Data': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

interface PromptCardProps {
  prompt: Prompt;
  onUpvote?: (id: string) => void;
  onFork?: (id: string) => void;
}

export default function PromptCard({ prompt, onUpvote, onFork }: PromptCardProps) {
  const currentText = prompt.versions[prompt.currentVersion]?.promptText || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:forge-glow"
    >
      <Link to={`/prompt/${prompt._id}`} className="absolute inset-0 z-10" />

      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {prompt.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${categoryColors[prompt.category]}`}>
              {prompt.category}
            </span>
            {prompt.forkedFrom && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <GitFork className="w-3 h-3" /> forked
              </span>
            )}
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>

      <p className="text-xs text-muted-foreground font-mono line-clamp-3 mb-3 leading-relaxed">
        {currentText}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {prompt.tags.slice(0, 3).map(tag => (
          <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground border-none">
            {tag}
          </Badge>
        ))}
        {prompt.tags.length > 3 && (
          <span className="text-[10px] text-muted-foreground">+{prompt.tags.length - 3}</span>
        )}
      </div>

      <div className="flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-bold text-primary">
            {getInitials(prompt.author.username)}
          </div>
          <span className="text-xs text-muted-foreground">{prompt.author.username}</span>
          <span className="text-[10px] text-muted-foreground/50">·</span>
          <span className="text-[10px] text-muted-foreground/50">{timeAgo(prompt.createdAt)}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.preventDefault(); onUpvote?.(prompt._id); }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            {prompt.upvotes.length}
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onFork?.(prompt._id); }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <GitFork className="w-3.5 h-3.5" />
            {prompt.forks.length}
          </button>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessageSquare className="w-3.5 h-3.5" />
            {prompt.comments.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
