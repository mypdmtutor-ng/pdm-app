import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  ArrowRight,
  Code2,
  Trophy,
  Coins,
  BookOpen,
  Users,
  Sparkles,
  CheckCircle2,
  Play,
} from 'lucide-react';
import { MascotDisplay } from '@/components/MascotDisplay';

export default function Landing() {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Crafted Courses',
      description: 'Learn from industry professionals with hands-on, project-based curriculum.',
    },
    {
      icon: Coins,
      title: 'Coin-Based Economy',
      description: 'Earn coins as you learn, unlock advanced courses and exclusive content.',
    },
    {
      icon: Trophy,
      title: 'Gamified Progress',
      description: 'Level up your mascot, earn achievements, and track your journey.',
    },
    {
      icon: Code2,
      title: 'Developer-First Design',
      description: 'Built by developers, for developers. Clean UI, powerful features.',
    },
  ];

  const stats = [
    { value: '15+', label: 'Premium Courses' },
    { value: '1.2K+', label: 'Active Students' },
    { value: '95%', label: 'Completion Rate' },
    { value: '4.9/5', label: 'Student Rating' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Gamified Learning Platform</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className="text-foreground">Master </span>
              <span className="text-gradient">Programming</span>
              <br />
              <span className="text-foreground">The Fun Way</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Learn to code through gamified lessons, earn coins for your progress, 
              and level up your skills with My PDM Tutor.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" className="text-lg px-8 h-14 hover-glow">
                <Link to="/signup">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 h-14">
                <Link to="/courses">
                  <Play className="mr-2 h-5 w-5" />
                  Browse Courses
                </Link>
              </Button>
            </div>

            {/* Demo credentials */}
            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border inline-block animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-sm text-muted-foreground mb-2">Try the demo:</p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">Student:</span>
                  <code className="px-2 py-1 bg-background rounded text-primary">student@demo.com</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">Admin:</span>
                  <code className="px-2 py-1 bg-background rounded text-primary">admin@demo.com</code>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Password for both: demo123 / admin123</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">My PDM Tutor</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A learning platform designed with developers in mind. Clean, powerful, and engaging.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mascot Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Level Up Your <span className="text-gradient">Mascot</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              As you progress through courses and earn coins, your mascot evolves with you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
            <MascotDisplay level="novice" size="lg" />
            <MascotDisplay level="practitioner" size="lg" />
            <MascotDisplay level="expert" size="lg" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(0_0%_100%/0.1),transparent_50%)]" />
            
            <div className="relative px-8 py-16 lg:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join thousands of developers learning, earning, and growing with My PDM Tutor.
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 h-14">
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} My PDM Tutor. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
