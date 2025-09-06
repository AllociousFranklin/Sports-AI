import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PerformanceResult } from '@/types/performance';
import { getSportConfig } from '@/constants/sports';

interface ResultCardProps {
  result: PerformanceResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const config = getSportConfig(result.sportType);
  const { benchmarkComparison, videoAnalysis } = result;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return '#059669';
      case 'good': return '#1E40AF';
      case 'average': return '#EA580C';
      case 'needs_improvement': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getRatingVariant = (rating: string): 'success' | 'info' | 'warning' | 'error' => {
    switch (rating) {
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'average': return 'warning';
      case 'needs_improvement': return 'error';
      default: return 'info';
    }
  };

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.sportInfo}>
          <Text style={[styles.sportIcon, { color: config.color }]}>🏃</Text>
          <View>
            <Text style={styles.sportName}>{config.name}</Text>
            <Text style={styles.timestamp}>
              {new Date(result.timestamp).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Badge 
          text={benchmarkComparison.rating.replace('_', ' ')} 
          variant={getRatingVariant(benchmarkComparison.rating)}
        />
      </View>

      <View style={styles.scoreSection}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>{result.score}</Text>
          <Text style={styles.scoreUnit}>{config.unit}</Text>
        </View>
        <View style={styles.percentileContainer}>
          <Text style={styles.percentileLabel}>Percentile</Text>
          <Text style={[styles.percentileValue, { color: getRatingColor(benchmarkComparison.rating) }]}>
            {benchmarkComparison.percentile}th
          </Text>
        </View>
      </View>

      <View style={styles.analysisSection}>
        <Text style={styles.sectionTitle}>Performance Analysis</Text>
        <View style={styles.analysisRow}>
          <Text style={styles.analysisLabel}>Technique Score</Text>
          <View style={styles.progressContainer}>
            <ProgressBar 
              progress={videoAnalysis.technique_score / 100}
              color={getRatingColor(benchmarkComparison.rating)}
              showLabel={true}
              label={`${videoAnalysis.technique_score}%`}
            />
          </View>
        </View>
        
        <View style={styles.analysisRow}>
          <Text style={styles.analysisLabel}>AI Confidence</Text>
          <Text style={styles.analysisValue}>{Math.round(videoAnalysis.confidence * 100)}%</Text>
        </View>

        {!videoAnalysis.cheatDetected ? (
          <View style={styles.validationBadge}>
            <Text style={styles.validationText}>✅ Valid Performance</Text>
          </View>
        ) : (
          <View style={[styles.validationBadge, styles.warningBadge]}>
            <Text style={[styles.validationText, styles.warningText]}>⚠️ Technique Issues Detected</Text>
          </View>
        )}
      </View>

      {result.achievementsEarned.length > 0 && (
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements Earned</Text>
          <View style={styles.achievementsList}>
            {result.achievementsEarned.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
  },
  scoreUnit: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  percentileContainer: {
    alignItems: 'center',
  },
  percentileLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  percentileValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  analysisSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  analysisLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  analysisValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressContainer: {
    flex: 1,
    marginLeft: 12,
  },
  validationBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  warningBadge: {
    backgroundColor: '#FEF3C7',
  },
  validationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065F46',
    textAlign: 'center',
  },
  warningText: {
    color: '#92400E',
  },
  achievementsSection: {
    borderTopWidth: 1,
    borderColor: '#F3F4F6',
    paddingTop: 16,
  },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  achievementIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
  },
});