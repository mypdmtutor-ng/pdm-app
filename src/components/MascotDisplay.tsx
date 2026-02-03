import { mascots } from '@/lib/mockData';
import type { MascotLevel } from '@/types';
import { cn } from '@/lib/utils';
import { Bot, Cpu, Zap } from 'lucide-react';

interface MascotDisplayProps {
  level: MascotLevel;
  size?: 'sm' | 'md' | 'lg';
  showInfo?: boolean;
  className?: string;
}

export function MascotDisplay({ level, size = 'md', showInfo = true, className }: MascotDisplayProps) {
  const mascot = mascots[level];

  const sizes = {
    sm: { container: 'w-16 h-16', icon: 28 },
    md: { container: 'w-24 h-24', icon: 40 },
    lg: { container: 'w-32 h-32', icon: 56 },
  };

  const { container, icon } = sizes[size];

  const MascotIcon = {
    novice: Bot,
    practitioner: Cpu,
    expert: Zap,
  }[level];

  const gradients = {
    novice: 'from-primary/60 via-primary/40 to-muted',
    practitioner: 'from-primary via-primary/80 to-primary/60',
    expert: 'from-primary via-primary to-foreground/80',
  };

  const glowColors = {
    novice: 'bg-primary/20',
    practitioner: 'bg-primary/40',
    expert: 'bg-primary/60',
  };

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="mascot-container">
        {/* Glow effect */}
        <div className={cn('mascot-glow', glowColors[level])} />
        
        {/* Mascot body */}
        <div
          className={cn(
            container,
            'relative rounded-2xl',
            'bg-gradient-to-br',
            gradients[level],
            'flex items-center justify-center',
            'shadow-lg hover:shadow-xl transition-shadow duration-300',
            'border border-primary/20',
            level === 'expert' && 'animate-pulse-glow'
          )}
        >
          <MascotIcon 
            size={icon} 
            className="text-primary-foreground drop-shadow-lg"
            strokeWidth={1.5}
          />
          
          {/* Level badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-card border border-border text-foreground capitalize shadow-sm">
              {level}
            </span>
          </div>
        </div>
      </div>

      {showInfo && (
        <div className="text-center mt-2">
          <h4 className="font-semibold text-foreground">{mascot.name}</h4>
          <p className="text-sm text-muted-foreground max-w-[200px]">
            {mascot.description}
          </p>
        </div>
      )}
    </div>
  );
}
