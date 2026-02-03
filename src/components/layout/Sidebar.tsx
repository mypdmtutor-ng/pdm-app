import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { MascotDisplay } from '@/components/MascotDisplay';
import {
  LayoutDashboard,
  BookOpen,
  Wallet,
  ShoppingCart,
  Award,
  User,
  Settings,
  Users,
  FileText,
  CreditCard,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const studentNavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Courses', href: '/courses', icon: BookOpen },
  { title: 'My Wallet', href: '/wallet', icon: Wallet },
  { title: 'Buy Coins', href: '/checkout', icon: ShoppingCart },
  { title: 'Certificates', href: '/certificates', icon: Award },
  { title: 'Profile', href: '/profile', icon: User },
  { title: 'Settings', href: '/settings', icon: Settings },
];

const adminNavItems = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Courses', href: '/admin/courses', icon: BookOpen },
  { title: 'Users', href: '/admin/users', icon: Users },
  { title: 'Transactions', href: '/admin/transactions', icon: CreditCard },
  { title: 'Certificates', href: '/admin/certificates', icon: FileText },
  { title: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = user.role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64',
          'bg-sidebar border-r border-sidebar-border',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            <Logo size="sm" />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-custom">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    'sidebar-item',
                    isActive && 'sidebar-item-active'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mascot section for students */}
          {user.role === 'student' && (
            <div className="p-4 border-t border-sidebar-border">
              <MascotDisplay level={user.level} size="sm" showInfo={false} />
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-sidebar-foreground capitalize">
                  {user.level} Level
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  {user.coins} coins earned
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
