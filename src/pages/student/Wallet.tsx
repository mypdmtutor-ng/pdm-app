import { useAuth } from '@/contexts/AuthContext';
import { mockTransactions } from '@/lib/mockData';
import { CoinWidget } from '@/components/CoinWidget';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Wallet() {
  const { user } = useAuth();

  if (!user) return null;

  const transactions = mockTransactions;

  const totalEarned = transactions
    .filter(t => t.type === 'earned' || t.type === 'purchased')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalSpent = transactions
    .filter(t => t.type === 'spent')
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Wallet</h1>
          <p className="text-muted-foreground mt-1">
            Track your coin balance and transactions
          </p>
        </div>
        <Button asChild>
          <Link to="/checkout">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Coins
          </Link>
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Current Balance */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <span className="text-sm opacity-90">Current Balance</span>
          </div>
          <p className="text-3xl font-bold">{user.coins.toLocaleString()}</p>
          <p className="text-sm opacity-75 mt-1">coins available</p>
        </div>

        {/* Total Earned */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Total Earned</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalEarned.toLocaleString()}</p>
          <p className="text-sm text-success mt-1">+{totalEarned} coins</p>
        </div>

        {/* Total Spent */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-destructive" />
            </div>
            <span className="text-sm text-muted-foreground">Total Spent</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalSpent.toLocaleString()}</p>
          <p className="text-sm text-destructive mt-1">-{totalSpent} coins</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
        </div>

        <div className="divide-y divide-border">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  tx.type === 'earned' && 'bg-success/10',
                  tx.type === 'spent' && 'bg-destructive/10',
                  tx.type === 'purchased' && 'bg-primary/10'
                )}>
                  {tx.type === 'earned' && <ArrowDownLeft className="w-5 h-5 text-success" />}
                  {tx.type === 'spent' && <ArrowUpRight className="w-5 h-5 text-destructive" />}
                  {tx.type === 'purchased' && <ShoppingCart className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <p className="font-medium text-foreground">{tx.description}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(tx.createdAt)}</p>
                </div>
              </div>
              <div className={cn(
                'text-lg font-semibold',
                tx.type === 'earned' && 'text-success',
                tx.type === 'spent' && 'text-destructive',
                tx.type === 'purchased' && 'text-primary'
              )}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
