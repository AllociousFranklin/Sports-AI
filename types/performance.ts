export type SportType = 'vertical_jump' | 'shuttle_run' | 'situps' | 'endurance_run' | 'shotput';

export interface PerformanceResult {
  id: string;
  userId: string;
  sportType: SportType;
  score: number;
  unit: string;
  timestamp: string;
  videoAnalysis: {
    cheatDetected: boolean;
    confidence: number;
    technique_score: number;
  };
  benchmarkComparison: {
    ageGroup: string;
    genderCategory: string;
    percentile: number;
    rating: 'excellent' | 'good' | 'average' | 'needs_improvement';
  };
  achievementsEarned: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'performance' | 'consistency' | 'improvement' | 'milestone';
  earnedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar?: string;
  };
  score: number;
  district: string;
  state: string;
}