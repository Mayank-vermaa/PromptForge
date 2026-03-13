import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    toast.success('Welcome back! 🔥');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-sm p-6 rounded-lg border border-border bg-card">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Flame className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Sign in to PromptForge</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username (try: alice, bob, carol)"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <input
            type="password"
            placeholder="Password (any value)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button type="submit" className="w-full py-2.5 rounded-lg font-semibold text-sm ember-gradient text-primary-foreground hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-4">Demo: any username/password works</p>
      </div>
    </div>
  );
}
