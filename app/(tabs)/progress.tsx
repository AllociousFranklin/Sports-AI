import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { ResultCard } from '@/components/performance/ResultCard';
import { PerformanceResult } from '@/types/performance';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProgressScreen() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Mock data - would come from API/state management
  const mockResults: PerformanceResult[] = [
    {
      id: '1',
      userId: 'user1',
      sportType: 'vertical_jump',
      score: 65,
      unit: 'cm',
      timestamp: '2025-01-08T10:00:00Z',
      videoAnalysis: {
        cheatDetected: false,
        confidence: 0.92,
        technique_score: 88,
      },
      benchmarkComparison: {
        ageGroup: '18-25',
        genderCategory: 'male',
        percentile: 75,
        rating: 'good',
      },
      achievementsEarned: [
        {
          id: 'ach1',
          title: 'High Jumper',
          description: 'Jumped over 60cm',
          icon: '⬆️',
          category: 'performance',
          earnedAt: '2025-01-08T10:00:00Z',
        },
      ],
    },
    {
      id: '2',
      userId: 'user1',
      sportType: 'shuttle_run',
      score: 12.5,
      unit: 'seconds',
      timestamp: '2025-01-07T14:30:00Z',
      videoAnalysis: {
        cheatDetected: false,
        confidence: 0.89,
        technique_score: 92,
      },
      benchmarkComparison: {
        ageGroup: '18-25',
        genderCategory: 'male',
        percentile: 85,
        rating: 'excellent',
      },
      achievementsEarned: [],
    },
  ];

  const overallStats = {
    totalTests: 24,
    averageScore: 82,
    improvementRate: 15,
    bestStreak: 12,
    currentStreak: 7,
  };

  const periods = [
    { key: 'week' as const, label: 'This Week' },
    { key: 'month' as const, label: 'This Month' },
    { key: 'year' as const, label: 'This Year' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress Tracking</Text>
          <Text style={styles.subtitle}>
            Monitor your athletic development and achievements
          </Text>
        </View>

        {/* Period Selector */}
        <Card variant="elevated" style={styles.periodCard}>
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.key && styles.activePeriodButton
                ]}
                onPress={() => setSelectedPeriod(period.key)}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period.key && styles.activePeriodText
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Overall Statistics */}
        <Card variant="elevated" style={styles.statsCard}>
          <Text style={styles.cardTitle}>Overall Performance 📊</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{overallStats.totalTests}</Text>
              <Text style={styles.statLabel}>Total Tests</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{overallStats.averageScore}%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#059669' }]}>+{overallStats.improvementRate}%</Text>
              <Text style={styles.statLabel}>Improvement</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#EA580C' }]}>{overallStats.currentStreak}</Text>
              <Text style={styles.statLabel}>Current Streak</Text>
            </View>
          </View>
        </Card>

        {/* Progress Chart Placeholder */}
        <Card variant="elevated" style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.cardTitle}>Performance Trend</Text>
            <Badge text="↗️ Improving" variant="success" />
          </View>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>📈</Text>
            <Text style={styles.chartDescription}>
              Performance chart would be implemented with a charting library like Victory or Recharts
            </Text>
          </View>
        </Card>

        {/* Sport-wise Progress */}
        <Card variant="elevated" style={styles.sportsProgressCard}>
          <Text style={styles.cardTitle}>Progress by Sport</Text>
          <View style={styles.sportsProgress}>
            <View style={styles.sportProgress}>
              <View style={styles.sportProgressHeader}>
                <Text style={styles.sportName}>🏃 Vertical Jump</Text>
                <Text style={styles.sportScore}>65cm</Text>
              </View>
              <ProgressBar progress={0.75} color="#1E40AF" showLabel={true} label="75th percentile" />
            </View>
            
            <View style={styles.sportProgress}>
              <View style={styles.sportProgressHeader}>
                <Text style={styles.sportName}>⚡ Shuttle Run</Text>
                <Text style={styles.sportScore}>12.5s</Text>
              </View>
              <ProgressBar progress={0.85} color="#059669" showLabel={true} label="85th percentile" />
            </View>
            
            <View style={styles.sportProgress}>
              <View style={styles.sportProgressHeader}>
                <Text style={styles.sportName}>💪 Sit-ups</Text>
                <Text style={styles.sportScore}>-</Text>
              </View>
              <ProgressBar progress={0} color="#E5E7EB" showLabel={true} label="No data yet" />
            </View>
          </View>
        </Card>

        {/* Recent Results */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>Recent Results</Text>
            <Button
              title="View All"
              variant="outline"
              size="small"
              onPress={() => console.log('View all results')}
            />
          </View>
          
          {mockResults.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </View>

        {/* Goals Section */}
        <Card variant="outlined" style={styles.goalsCard}>
          <Text style={styles.cardTitle}>Goals & Targets 🎯</Text>
          <View style={styles.goalsList}>
            <View style={styles.goalItem}>
              <Text style={styles.goalIcon}>🏃‍♂️</Text>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Improve Vertical Jump to 70cm</Text>
                <ProgressBar progress={0.65} color="#1E40AF" showLabel={true} label="65/70 cm" />
              </View>
            </View>
            
            <View style={styles.goalItem}>
              <Text style={styles.goalIcon}>🔥</Text>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Maintain 10-day streak</Text>
                <ProgressBar progress={0.7} color="#EA580C" showLabel={true} label="7/10 days" />
              </View>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  periodCard: {
    marginBottom: 24,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  periodText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activePeriodText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  statsCard: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  chartCard: {
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  chartText: {
    fontSize: 48,
    marginBottom: 8,
  },
  chartDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  sportsProgressCard: {
    marginBottom: 24,
  },
  sportsProgress: {
    gap: 20,
  },
  sportProgress: {
    gap: 8,
  },
  sportProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sportName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  sportScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  resultsSection: {
    marginBottom: 24,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  goalsCard: {
    marginBottom: 24,
  },
  goalsList: {
    gap: 16,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  goalIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  goalInfo: {
    flex: 1,
    gap: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
});