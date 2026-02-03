import { adminStats, mockCourses, mockTransactions } from '@/lib/mockData';
import {
  Users,
  BookOpen,
  DollarSign,
  Award,
  TrendingUp,
  Activity,
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { icon: Users, label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), change: '+12%', color: 'text-primary' },
    { icon: BookOpen, label: 'Total Courses', value: adminStats.totalCourses, change: '+2', color: 'text-success' },
    { icon: DollarSign, label: 'Revenue', value: `$${adminStats.totalRevenue.toLocaleString()}`, change: '+18%', color: 'text-coin' },
    { icon: Award, label: 'Certificates', value: adminStats.certificatesIssued, change: '+45', color: 'text-warning' },
  ];

  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your platform metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts & Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity Chart Placeholder */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            User Activity
          </h2>
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
            <div className="text-center">
              <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Activity chart placeholder</p>
              <p className="text-xs text-muted-foreground mt-1">Connect to backend for real data</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-coin" />
            Recent Transactions
          </h2>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`font-semibold ${tx.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Courses */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Popular Courses</h2>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Level</th>
                <th>Price</th>
                <th>Enrollments</th>
              </tr>
            </thead>
            <tbody>
              {mockCourses.slice(0, 5).map((course) => (
                <tr key={course.id}>
                  <td className="font-medium text-foreground">{course.title}</td>
                  <td>{course.category}</td>
                  <td className="capitalize">{course.level}</td>
                  <td>{course.price === 0 ? 'Free' : `${course.price} coins`}</td>
                  <td>{Math.floor(Math.random() * 500) + 50}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
