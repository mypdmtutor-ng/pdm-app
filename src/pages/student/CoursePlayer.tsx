import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCourses, mockLessons, mockQuiz } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Play,
  CheckCircle2,
  Circle,
  Lock,
  ChevronLeft,
  Clock,
  Award,
  BookOpen,
} from 'lucide-react';

export default function CoursePlayer() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, updateUser } = useAuth();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const course = mockCourses.find(c => c.id === courseId);
  const lessons = mockLessons;
  const quiz = mockQuiz;

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-xl font-semibold mb-4">Course not found</h2>
        <Button asChild>
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  const lesson = lessons[currentLesson];
  const completedLessons = lessons.filter(l => l.isCompleted).length;
  const progressPercent = (completedLessons / lessons.length) * 100;

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < quiz.questions.length) {
      toast.error('Please answer all questions');
      return;
    }

    const correctCount = quiz.questions.reduce((acc, q) => {
      return acc + (quizAnswers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    setQuizSubmitted(true);

    if (passed && user) {
      updateUser({ coins: user.coins + quiz.coinReward });
      toast.success(`Congratulations! You passed with ${score}%`, {
        description: `You earned ${quiz.coinReward} coins!`,
      });
    } else {
      toast.error(`You scored ${score}%`, {
        description: `You need ${quiz.passingScore}% to pass. Try again!`,
      });
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button & Course title */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/courses">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">{course.title}</h1>
          <p className="text-sm text-muted-foreground">
            Lesson {currentLesson + 1} of {lessons.length}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {!showQuiz ? (
            <>
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-muted rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Play className="w-10 h-10 text-primary ml-1" />
                  </div>
                  <p className="text-foreground font-medium">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Duration: {lesson.duration}
                  </p>
                </div>
              </div>

              {/* Lesson Info */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {lesson.title}
                </h2>
                <p className="text-muted-foreground mb-4">{lesson.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </span>
                  {lesson.quizId && (
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Quiz available
                    </span>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => {
                      if (currentLesson < lessons.length - 1) {
                        setCurrentLesson(currentLesson + 1);
                      }
                    }}
                    disabled={currentLesson === lessons.length - 1}
                  >
                    Next Lesson
                  </Button>
                  {lesson.quizId && (
                    <Button variant="outline" onClick={() => setShowQuiz(true)}>
                      Take Quiz
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Quiz Section */
            <div className="p-6 rounded-xl bg-card border border-border space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{quiz.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Pass with {quiz.passingScore}% to earn {quiz.coinReward} coins
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setShowQuiz(false)}>
                  Back to Lesson
                </Button>
              </div>

              <div className="space-y-6">
                {quiz.questions.map((question, qIndex) => (
                  <div key={question.id} className="space-y-3">
                    <p className="font-medium text-foreground">
                      {qIndex + 1}. {question.question}
                    </p>
                    <div className="grid gap-2">
                      {question.options.map((option, oIndex) => {
                        const isSelected = quizAnswers[question.id] === oIndex;
                        const isCorrect = question.correctAnswer === oIndex;
                        const showResult = quizSubmitted;

                        return (
                          <button
                            key={oIndex}
                            onClick={() => {
                              if (!quizSubmitted) {
                                setQuizAnswers({ ...quizAnswers, [question.id]: oIndex });
                              }
                            }}
                            disabled={quizSubmitted}
                            className={cn(
                              'quiz-option text-left',
                              isSelected && !showResult && 'quiz-option-selected',
                              showResult && isCorrect && 'quiz-option-correct',
                              showResult && isSelected && !isCorrect && 'quiz-option-incorrect'
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium">
                                {String.fromCharCode(65 + oIndex)}
                              </span>
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                {!quizSubmitted ? (
                  <Button onClick={handleQuizSubmit}>Submit Quiz</Button>
                ) : (
                  <Button onClick={resetQuiz}>Try Again</Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Lesson List */}
        <div className="space-y-4">
          {/* Progress */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Course Progress</span>
              <span className="font-medium text-foreground">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Lessons */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Course Content
              </h3>
            </div>
            <div className="divide-y divide-border max-h-[400px] overflow-y-auto scrollbar-custom">
              {lessons.map((l, index) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setCurrentLesson(index);
                    setShowQuiz(false);
                  }}
                  className={cn(
                    'w-full p-4 text-left flex items-start gap-3 hover:bg-muted/50 transition-colors',
                    index === currentLesson && 'bg-primary/5'
                  )}
                >
                  <div className="mt-0.5">
                    {l.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : index === currentLesson ? (
                      <Play className="w-5 h-5 text-primary" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'font-medium truncate',
                      index === currentLesson ? 'text-primary' : 'text-foreground'
                    )}>
                      {l.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{l.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
