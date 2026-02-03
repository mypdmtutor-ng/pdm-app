import { Coins } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface CoinWidgetProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function CoinWidget({ size = 'md', showLabel = false, className }: CoinWidgetProps) {
  const { user } = useAuth();

  if (!user) return null;

  const sizes = {
    sm: { icon: 14, text: 'text-sm', padding: 'px-2 py-1' },
    md: { icon: 16, text: 'text-base', padding: 'px-3 py-1.5' },
    lg: { icon: 20, text: 'text-lg', padding: 'px-4 py-2' },
  };

  const { icon, text, padding } = sizes[size];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full',
        'bg-gradient-to-r from-coin/20 to-warning/20',
        'border border-coin/30',
        padding,
        className
      )}
    >
      <Coins size={icon} className="text-coin animate-coin-bounce" />
      <span className={cn('font-semibold text-coin', text)}>
        {user.coins.toLocaleString()}
      </span>
      {showLabel && (
        <span className="text-muted-foreground text-sm ml-1">coins</span>
      )}
    </div>
  );
}
