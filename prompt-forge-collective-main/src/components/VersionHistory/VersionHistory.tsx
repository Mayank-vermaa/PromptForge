import { Clock } from 'lucide-react';
import { Version } from '@/utils/mockData';

interface VersionHistoryProps {
  versions: Version[];
  activeVersion: number;
  onSelectVersion: (index: number) => void;
}

export default function VersionHistory({ versions, activeVersion, onSelectVersion }: VersionHistoryProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" /> Version History
      </h3>
      {versions.map((version, index) => {
        const isActive = index === activeVersion;
        const date = new Date(version.createdAt);
        return (
          <button
            key={index}
            onClick={() => onSelectVersion(index)}
            className={`w-full text-left p-2.5 rounded-md transition-all ${
              isActive
                ? 'bg-primary/10 border border-primary/30'
                : 'hover:bg-secondary/50 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                v{index + 1}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 font-mono">
              {version.promptText.slice(0, 80)}…
            </p>
          </button>
        );
      })}
    </div>
  );
}
