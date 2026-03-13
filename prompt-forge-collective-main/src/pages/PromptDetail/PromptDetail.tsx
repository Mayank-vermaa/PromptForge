import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GitFork, ChevronUp, ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { prompts, getInitials, timeAgo, Comment } from '@/utils/mockData';
import SplitView from '@/components/SplitView/SplitView';
import ForkTree from '@/components/ForkTree/ForkTree';
import VersionHistory from '@/components/VersionHistory/VersionHistory';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export default function PromptDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const prompt = prompts.find(p => p._id === id);
  const [activeVersion, setActiveVersion] = useState(prompt?.currentVersion ?? 0);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(prompt?.comments ?? []);

  if (!prompt) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground mb-2">404</p>
          <p className="text-muted-foreground">Prompt not found</p>
          <Link to="/" className="text-primary text-sm mt-4 inline-block hover:underline">← Back to feed</Link>
        </div>
      </div>
    );
  }

  const version = prompt.versions[activeVersion];

  const handleFork = () => {
    if (!isAuthenticated) { toast.error('Login to fork prompts'); return; }
    toast.success('Prompt forked!');
    navigate('/create');
  };

  const handleUpvote = () => {
    if (!isAuthenticated) { toast.error('Login to upvote'); return; }
    toast.success('Upvote toggled!');
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    if (!isAuthenticated || !user) { toast.error('Login to comment'); return; }
    const newComment: Comment = {
      _id: `c_${Date.now()}`,
      body: commentText,
      author: user,
      prompt: prompt._id,
      createdAt: new Date().toISOString(),
    };
    setLocalComments(prev => [...prev, newComment]);
    setCommentText('');
    toast.success('Comment added!');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">{prompt.title}</h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">{prompt.category}</Badge>
            {prompt.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">{tag}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
              {getInitials(prompt.author.username)}
            </div>
            <span className="text-sm text-muted-foreground">{prompt.author.username}</span>
            <span className="text-xs text-muted-foreground/50">· {timeAgo(prompt.createdAt)}</span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={handleUpvote} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors">
            <ChevronUp className="w-4 h-4" /> {prompt.upvotes.length}
          </button>
          <button onClick={handleFork} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <GitFork className="w-4 h-4" /> Fork
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6">
        <div className="space-y-6">
          <SplitView promptText={version?.promptText ?? ''} outputImage={version?.outputImage} />

          {/* Fork Tree */}
          <div className="rounded-lg border border-border p-4">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5" /> Fork Tree
            </h2>
            <ForkTree promptId={prompt._id} />
          </div>

          {/* Comments */}
          <div className="rounded-lg border border-border p-4">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Comments ({localComments.length})
            </h2>
            <div className="space-y-3 mb-4">
              {localComments.map(c => (
                <div key={c._id} className="flex gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[9px] font-bold text-secondary-foreground shrink-0 mt-0.5">
                    {getInitials(c.author.username)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-foreground">{c.author.username}</span>
                      <span className="text-[10px] text-muted-foreground">{timeAgo(c.createdAt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{c.body}</p>
                  </div>
                </div>
              ))}
              {localComments.length === 0 && <p className="text-sm text-muted-foreground">No comments yet. Start the conversation!</p>}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()}
                className="flex-1 bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button onClick={handleComment} className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Version history sidebar */}
        <aside className="lg:sticky lg:top-20 self-start">
          <VersionHistory versions={prompt.versions} activeVersion={activeVersion} onSelectVersion={setActiveVersion} />
        </aside>
      </div>
    </motion.div>
  );
}
