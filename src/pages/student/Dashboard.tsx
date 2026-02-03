import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockCourses } from '@/lib/mockData';
import { CourseCard } from '@/components/CourseCard';
import { CoinWidget } from '@/components/CoinWidget';
import { MascotDisplay } from '@/components/MascotDisplay';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Flame,
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const enrolledCourses = mockCourses.filter(c => c.isEnrolled);
  const totalProgress = enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length;

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCourses.length, color: 'text-primary' },
    { icon: Trophy, label: 'Completed', value: 1, color: 'text-success' },
    { icon: Target, label: 'Avg. Progress', value: `${Math.round(totalProgress)}%`, color: 'text-warning' },
    { icon: Flame, label: 'Day Streak', value: 7, color: 'text-destructive' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome back, <span className="text-gradient">{user.name.split(' ')[0]}</span>!
          </h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey and earn more coins.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <CoinWidget size="lg" showLabel />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 lg:p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Continue Learning</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/courses">
                View All
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {enrolledCourses.slice(0, 2).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Mascot & Progress */}
        <div className="space-y-6">
          {/* Mascot Card */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
              Your Progress Companion
            </h3>
            <MascotDisplay level={user.level} size="md" />
            
            {/* Level progress */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Level</span>
                <span className="font-medium text-foreground">
                  {user.level === 'novice' ? '500' : user.level === 'practitioner' ? '1500' : '∞'} coins
                </span>
              </div>
              <Progress 
                value={
                  user.level === 'novice' 
                    ? (user.coins / 500) * 100 
                    : user.level === 'practitioner' 
                    ? ((user.coins - 500) / 1000) * 100 
                    : 100
                } 
                className="h-2"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 rounded-xl bg-card border border-border space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Actions</h3>
            
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/courses">
                <BookOpen className="mr-2 w-4 h-4" />
                Browse Courses
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/wallet">
                <TrendingUp className="mr-2 w-4 h-4" />
                View Transactions
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/certificates">
                <Trophy className="mr-2 w-4 h-4" />
                My Certificates
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Completed lesson', detail: 'Variables and Data Types', course: 'Python Fundamentals', time: '2 hours ago', coins: '+25' },
            { action: 'Started course', detail: 'JavaScript Essentials', course: '', time: '1 day ago', coins: null },
            { action: 'Earned achievement', detail: 'Fast Learner Badge', course: '', time: '2 days ago', coins: '+50' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.detail}
                    {activity.course && ` • ${activity.course}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {activity.coins && (
                  <p className="font-semibold text-coin">{activity.coins}</p>
                )}
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
