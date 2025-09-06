import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { useTranslation } from '@/hooks/useTranslation';

export default function DashboardScreen() {
  const { t } = useTranslation();

  // Mock data - would come from API/state management
  const userStats = {
    testsThisWeek: 3,
    currentStreak: 7,
    totalTests: 24,
    averageScore: 82,
    recentAchievements: [
      { id: '1', title: 'Speed Demon', icon: '⚡', earnedAt: '2025-01-08' },
      { id: '2', title: 'Consistency Master', icon: '🎯', earnedAt: '2025-01-07' },
    ]
  };

  const quickStats = [
    { label: 'Tests This Week', value: userStats.testsThisWeek, icon: '📊', color: '#1E40AF' },
    { label: 'Current Streak', value: `${userStats.currentStreak} days`, icon: '🔥', color: '#EA580C' },
    { label: 'Personal Best', value: '95%', icon: '🏆', color: '#059669' },
    { label: 'Global Rank', value: '#342', icon: '🌍', color: '#7C3AED' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning! 👋</Text>
            <Text style={styles.username}>Ready for your next challenge?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Action */}
        <Card variant="elevated" style={[styles.quickActionCard, { backgroundColor: '#1E40AF' }]}>
          <View style={styles.quickActionContent}>
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>Take a Performance Test</Text>
              <Text style={styles.quickActionSubtitle}>
                Choose from 5 different sports assessments
              </Text>
            </View>
            <Button
              title="Start Now"
              onPress={() => router.push('/assessment')}
              variant="secondary"
              style={styles.quickActionButton}
            />
          </View>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <Card key={index} variant="elevated" style={styles.statCard}>
              <Text style={[styles.statIcon, { color: stat.color }]}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Progress Overview */}
        <Card variant="elevated" style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.cardTitle}>Weekly Progress</Text>
            <Badge text="83%" variant="success" />
          </View>
          <ProgressBar 
            progress={0.83}
            color="#059669"
            height={12}
            showLabel={false}
          />
          <Text style={styles.progressText}>
            You've completed 3 out of 5 planned assessments this week
          </Text>
        </Card>

        {/* Recent Achievements */}
        <Card variant="elevated" style={styles.achievementsCard}>
          <Text style={styles.cardTitle}>Recent Achievements 🏆</Text>
          <View style={styles.achievementsList}>
            {userStats.recentAchievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDate}>
                    {new Date(achievement.earnedAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <Button
            title="View All Achievements"
            variant="outline"
            onPress={() => router.push('/profile')}
            style={styles.viewAllButton}
          />
        </Card>

        {/* Upcoming Features */}
        <Card variant="outlined" style={styles.upcomingCard}>
          <Text style={styles.cardTitle}>Coming Soon 🚀</Text>
          <View style={styles.upcomingList}>
            <Text style={styles.upcomingItem}>🥇 Shot Put Assessment</Text>
            <Text style={styles.upcomingItem}>👥 Team Challenges</Text>
            <Text style={styles.upcomingItem}>📹 Technique Analysis</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  username: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationIcon: {
    fontSize: 20,
  },
  quickActionCard: {
    marginBottom: 24,
    padding: 20,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickActionText: {
    flex: 1,
    marginRight: 16,
  },
  quickActionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#BFDBFE',
    lineHeight: 20,
  },
  quickActionButton: {
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  progressCard: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
  achievementsCard: {
    marginBottom: 24,
  },
  achievementsList: {
    marginTop: 16,
    marginBottom: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  achievementDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  viewAllButton: {
    borderColor: '#E5E7EB',
  },
  upcomingCard: {
    marginBottom: 24,
  },
  upcomingList: {
    marginTop: 12,
    gap: 8,
  },
  upcomingItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});