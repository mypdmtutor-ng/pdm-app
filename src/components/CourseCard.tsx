import { Link } from 'react-router-dom';
import { Lock, Play, Clock, BookOpen } from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CourseCardProps {
  course: Course;
  onUnlock?: (courseId: string) => void;
}

export function CourseCard({ course, onUnlock }: CourseCardProps) {
  const levelColors = {
    beginner: 'bg-success/10 text-success border-success/20',
    intermediate: 'bg-warning/10 text-warning border-warning/20',
    advanced: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="group relative">
      <div
        className={cn(
          'relative rounded-xl overflow-hidden',
          'bg-card border border-border',
          'transition-all duration-300',
          'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5',
          course.isLocked && 'opacity-90'
        )}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-primary/40" />
          </div>
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-background/90 backdrop-blur-sm text-foreground border border-border">
              {course.category}
            </span>
          </div>

          {/* Level badge */}
          <div className="absolute top-3 right-3">
            <span className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-full capitalize border',
              levelColors[course.level]
            )}>
              {course.level}
            </span>
          </div>

          {/* Locked overlay */}
          {course.isLocked && (
            <div className="locked-overlay">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{course.price} coins</p>
              </div>
            </div>
          )}

          {/* Play button on hover for unlocked */}
          {!course.isLocked && course.isEnrolled && (
            <Link
              to={`/course/${course.id}`}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/50"
            >
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
              </div>
            </Link>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {course.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.lessonsCount} lessons
            </span>
          </div>

          {/* Progress or action */}
          {course.isEnrolled && !course.isLocked ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1.5" />
            </div>
          ) : course.isLocked ? (
            <Button
              onClick={() => onUnlock?.(course.id)}
              className="w-full"
              variant="default"
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock for {course.price} coins
            </Button>
          ) : (
            <Button asChild className="w-full" variant="outline">
              <Link to={`/course/${course.id}`}>
                Start Learning
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
