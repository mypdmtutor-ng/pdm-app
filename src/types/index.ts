// User and Auth Types
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  coins: number;
  level: MascotLevel;
  joinedAt: string;
}

// Mascot System
export type MascotLevel = 'novice' | 'practitioner' | 'expert';

export interface MascotInfo {
  level: MascotLevel;
  name: string;
  description: string;
  minCoins: number;
  maxCoins: number;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  lessonsCount: number;
  price: number; // in coins
  isLocked: boolean;
  isEnrolled: boolean;
  progress: number; // 0-100
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  isCompleted: boolean;
  quizId?: string;
}

// Quiz Types
export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  coinReward: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  passed: boolean;
  completedAt: string;
}

// Wallet & Transactions
export interface Transaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'purchased';
  amount: number;
  description: string;
  createdAt: string;
  reference?: string;
}

export interface CoinPackage {
  id: string;
  coins: number;
  price: number; // in currency
  bonus: number;
  popular?: boolean;
}

// Certificate
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  issuedAt: string;
  certificateUrl: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Navigation
export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}
