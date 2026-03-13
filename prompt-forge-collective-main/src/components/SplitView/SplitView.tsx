import { useState } from 'react';
import { Copy, Check, ZoomIn } from 'lucide-react';
import { toast } from 'sonner';

interface SplitViewProps {
  promptText: string;
  outputImage?: string;
}

export default function SplitView({ promptText, outputImage }: SplitViewProps) {
  const [copied, setCopied] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    toast.success('Prompt copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left: Prompt Text */}
      <div className="relative rounded-lg border border-border bg-secondary/50 p-4 min-h-[300px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Prompt</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="font-mono text-sm text-foreground whitespace-pre-wrap leading-relaxed scrollbar-thin overflow-auto max-h-[500px]">
          {promptText}
        </pre>
      </div>

      {/* Right: Output Image */}
      <div
        className="relative rounded-lg border border-border bg-secondary/30 min-h-[300px] flex items-center justify-center cursor-pointer group"
        onClick={() => setZoomed(!zoomed)}
      >
        {outputImage ? (
          <img
            src={outputImage}
            alt="Output"
            className={`rounded transition-transform duration-300 ${zoomed ? 'scale-150' : 'group-hover:scale-105'}`}
          />
        ) : (
          <div className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-sm text-muted-foreground">No output screenshot</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Add one to show your prompt's result</p>
          </div>
        )}
      </div>
    </div>
  );
}
