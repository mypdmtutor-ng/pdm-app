import { Link } from 'react-router-dom';
import { Code2, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-xl' },
    lg: { icon: 36, text: 'text-2xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/30 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Logo icon container */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg group-hover:shadow-primary/25 transition-shadow duration-300">
          <Code2 size={icon} className="text-primary-foreground" strokeWidth={2.5} />
          
          {/* Sparkle accent */}
          <Sparkles 
            size={12} 
            className="absolute -top-1 -right-1 text-coin animate-pulse" 
          />
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${text} tracking-tight`}>
            <span className="text-gradient">My PDM</span>
            <span className="text-foreground"> Tutor</span>
          </span>
        </div>
      )}
    </Link>
  );
}
