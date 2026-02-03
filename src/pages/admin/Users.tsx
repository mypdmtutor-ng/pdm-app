import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Ban,
  Shield,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock users data
const mockUsers = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'student', coins: 750, status: 'active', joinedAt: '2024-01-15' },
  { id: '2', name: 'Sarah Admin', email: 'sarah@example.com', role: 'admin', coins: 9999, status: 'active', joinedAt: '2023-06-01' },
  { id: '3', name: 'Mike Chen', email: 'mike@example.com', role: 'student', coins: 1200, status: 'active', joinedAt: '2024-02-20' },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', role: 'student', coins: 450, status: 'active', joinedAt: '2024-01-05' },
  { id: '5', name: 'James Brown', email: 'james@example.com', role: 'student', coins: 2100, status: 'suspended', joinedAt: '2023-11-12' },
  { id: '6', name: 'Lisa Park', email: 'lisa@example.com', role: 'student', coins: 890, status: 'active', joinedAt: '2024-03-01' },
  { id: '7', name: 'David Kim', email: 'david@example.com', role: 'student', coins: 320, status: 'active', joinedAt: '2024-02-15' },
  { id: '8', name: 'Nina Patel', email: 'nina@example.com', role: 'student', coins: 1560, status: 'active', joinedAt: '2023-12-20' },
];

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-1">
          View and manage platform users
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={roleFilter === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRoleFilter(null)}
          >
            All
          </Button>
          <Button
            variant={roleFilter === 'student' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRoleFilter('student')}
          >
            Students
          </Button>
          <Button
            variant={roleFilter === 'admin' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRoleFilter('admin')}
          >
            Admins
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Coins</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full capitalize',
                      user.role === 'admin'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="font-medium text-coin">{user.coins.toLocaleString()}</td>
                  <td>
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full capitalize',
                      user.status === 'active'
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="w-4 h-4 mr-2" />
                          Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredUsers.length} of {mockUsers.length} users
      </div>
    </div>
  );
}
