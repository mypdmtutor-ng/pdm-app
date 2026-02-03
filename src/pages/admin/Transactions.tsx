import { useState } from 'react';
import { mockTransactions } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingCart,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminTransactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  // Extended mock transactions for admin view
  const allTransactions = [
    ...mockTransactions,
    { id: 'tx-6', userId: 'user-2', type: 'purchased', amount: 1000, description: 'Mike Chen - Package purchase', createdAt: '2024-01-25T12:00:00Z' },
    { id: 'tx-7', userId: 'user-3', type: 'earned', amount: 50, description: 'Emma Wilson - Quiz completed', createdAt: '2024-01-24T09:30:00Z' },
    { id: 'tx-8', userId: 'user-4', type: 'spent', amount: -200, description: 'James Brown - Course unlock', createdAt: '2024-01-23T16:20:00Z' },
  ] as typeof mockTransactions;

  const filteredTransactions = allTransactions.filter((tx) => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalRevenue = allTransactions
    .filter(t => t.type === 'purchased')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            View all platform coin transactions
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-coin">{totalRevenue.toLocaleString()} coins</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">Total Transactions</p>
          <p className="text-2xl font-bold text-foreground">{allTransactions.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="text-2xl font-bold text-foreground">{allTransactions.length}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={typeFilter === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter(null)}
          >
            All
          </Button>
          <Button
            variant={typeFilter === 'earned' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('earned')}
          >
            Earned
          </Button>
          <Button
            variant={typeFilter === 'spent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('spent')}
          >
            Spent
          </Button>
          <Button
            variant={typeFilter === 'purchased' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('purchased')}
          >
            Purchased
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center',
                        tx.type === 'earned' && 'bg-success/10',
                        tx.type === 'spent' && 'bg-destructive/10',
                        tx.type === 'purchased' && 'bg-primary/10'
                      )}>
                        {tx.type === 'earned' && <ArrowDownLeft className="w-4 h-4 text-success" />}
                        {tx.type === 'spent' && <ArrowUpRight className="w-4 h-4 text-destructive" />}
                        {tx.type === 'purchased' && <ShoppingCart className="w-4 h-4 text-primary" />}
                      </div>
                      <span className="capitalize text-foreground font-medium">{tx.type}</span>
                    </div>
                  </td>
                  <td className="text-foreground">{tx.description}</td>
                  <td className={cn(
                    'font-semibold',
                    tx.amount > 0 ? 'text-success' : 'text-destructive'
                  )}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(tx.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="text-muted-foreground font-mono text-xs">
                    {tx.reference || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
