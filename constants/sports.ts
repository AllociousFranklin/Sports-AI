import { SportType } from '@/types/performance';

export const SPORTS_CONFIG = {
  vertical_jump: {
    name: 'Vertical Jump',
    icon: 'trending-up',
    unit: 'cm',
    description: 'Measure your explosive leg power',
    color: '#1E40AF',
    estimatedTime: '2 mins',
  },
  shuttle_run: {
    name: 'Shuttle Run',
    icon: 'zap',
    unit: 'seconds',
    description: 'Test your agility and speed',
    color: '#059669',
    estimatedTime: '3 mins',
  },
  situps: {
    name: 'Sit-ups',
    icon: 'activity',
    unit: 'reps',
    description: 'Core strength assessment',
    color: '#EA580C',
    estimatedTime: '1 min',
  },
  endurance_run: {
    name: 'Endurance Run',
    icon: 'circle',
    unit: 'time',
    description: 'Cardiovascular endurance test',
    color: '#7C3AED',
    estimatedTime: '12 mins',
  },
  shotput: {
    name: 'Shot Put',
    icon: 'target',
    unit: 'meters',
    description: 'Power and technique assessment',
    color: '#DC2626',
    estimatedTime: '5 mins',
    comingSoon: true,
  },
} as const;

export const getSportConfig = (sportType: SportType) => SPORTS_CONFIG[sportType];