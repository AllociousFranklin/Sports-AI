import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SPORTS_CONFIG } from '@/constants/sports';
import { SportType } from '@/types/performance';
import { LeaderboardEntry } from '@/types/performance';

export default function LeaderboardScreen() {
  const [selectedSport, setSelectedSport] = useState<SportType>('vertical_jump');
  const [selectedScope, setSelectedScope] = useState<'district' | 'state' | 'national'>('district');

  // Mock data - would come from API
  const mockLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      user: { name: 'Rahul Sharma', avatar: '🥇' },
      score: 78,
      district: 'Mumbai',
      state: 'Maharashtra',
    },
    {
      rank: 2,
      user: { name: 'Priya Patel', avatar: '🥈' },
      score: 75,
      district: 'Ahmedabad',
      state: 'Gujarat',
    },
    {
      rank: 3,
      user: { name: 'Amit Kumar', avatar: '🥉' },
      score: 73,
      district: 'Delhi',
      state: 'Delhi',
    },
    {
      rank: 4,
      user: { name: 'Sneha Reddy', avatar: '👤' },
      score: 71,
      district: 'Hyderabad',
      state: 'Telangana',
    },
    {
      rank: 5,
      user: { name: 'Vikram Singh', avatar: '👤' },
      score: 70,
      district: 'Jaipur',
      state: 'Rajasthan',
    },
  ];

  const currentUserRank = {
    rank: 12,
    score: 65,
    improvement: '+3 positions',
  };

  const sportOptions = Object.entries(SPORTS_CONFIG).filter(([_, config]) => !config.comingSoon);
  const scopeOptions = [
    { key: 'district' as const, label: 'District', icon: '🏘️' },
    { key: 'state' as const, label: 'State', icon: '🏛️' },
    { key: 'national' as const, label: 'National', icon: '🇮🇳' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '👤';
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#6B7280';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard 🏆</Text>
          <Text style={styles.subtitle}>
            See how you rank against other athletes
          </Text>
        </View>

        {/* Your Rank Card */}
        <Card variant="elevated" style={[styles.yourRankCard, { borderColor: '#1E40AF' }]}>
          <View style={styles.yourRankHeader}>
            <Text style={styles.yourRankTitle}>Your Current Position</Text>
            <Badge text={currentUserRank.improvement} variant="success" />
          </View>
          <View style={styles.yourRankContent}>
            <View style={styles.yourRankInfo}>
              <Text style={styles.yourRankNumber}>#{currentUserRank.rank}</Text>
              <Text style={styles.yourRankLabel}>Rank</Text>
            </View>
            <View style={styles.yourRankInfo}>
              <Text style={styles.yourRankScore}>{currentUserRank.score}</Text>
              <Text style={styles.yourRankLabel}>{SPORTS_CONFIG[selectedSport].unit}</Text>
            </View>
          </View>
        </Card>

        {/* Sport Selector */}
        <Card variant="elevated" style={styles.selectorCard}>
          <Text style={styles.selectorTitle}>Select Sport</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportSelector}>
            {sportOptions.map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.sportButton,
                  selectedSport === key && { backgroundColor: config.color }
                ]}
                onPress={() => setSelectedSport(key as SportType)}
              >
                <Text style={[
                  styles.sportButtonText,
                  selectedSport === key && { color: '#FFFFFF' }
                ]}>
                  {config.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card>

        {/* Scope Selector */}
        <Card variant="elevated" style={styles.selectorCard}>
          <Text style={styles.selectorTitle}>Leaderboard Scope</Text>
          <View style={styles.scopeSelector}>
            {scopeOptions.map((scope) => (
              <TouchableOpacity
                key={scope.key}
                style={[
                  styles.scopeButton,
                  selectedScope === scope.key && styles.activeScopeButton
                ]}
                onPress={() => setSelectedScope(scope.key)}
              >
                <Text style={styles.scopeIcon}>{scope.icon}</Text>
                <Text style={[
                  styles.scopeText,
                  selectedScope === scope.key && styles.activeScopeText
                ]}>
                  {scope.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Top 3 Podium */}
        <Card variant="elevated" style={styles.podiumCard}>
          <Text style={styles.podiumTitle}>Top Performers 🏅</Text>
          <View style={styles.podium}>
            {mockLeaderboard.slice(0, 3).map((entry, index) => (
              <View
                key={entry.rank}
                style={[
                  styles.podiumPosition,
                  index === 0 && styles.firstPlace,
                  index === 1 && styles.secondPlace,
                  index === 2 && styles.thirdPlace,
                ]}
              >
                <Text style={[styles.podiumRank, { color: getRankColor(entry.rank) }]}>
                  {getRankIcon(entry.rank)}
                </Text>
                <Text style={styles.podiumName}>{entry.user.name.split(' ')[0]}</Text>
                <Text style={styles.podiumScore}>
                  {entry.score} {SPORTS_CONFIG[selectedSport].unit}
                </Text>
                <Text style={styles.podiumLocation}>{entry.district}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Full Leaderboard */}
        <Card variant="elevated" style={styles.leaderboardCard}>
          <View style={styles.leaderboardHeader}>
            <Text style={styles.leaderboardTitle}>Full Rankings</Text>
            <Button
              title="Refresh"
              variant="outline"
              size="small"
              onPress={() => console.log('Refresh leaderboard')}
            />
          </View>

          <View style={styles.leaderboardList}>
            {mockLeaderboard.map((entry) => (
              <View key={entry.rank} style={styles.leaderboardRow}>
                <View style={styles.leaderboardRank}>
                  <Text style={[styles.rankNumber, { color: getRankColor(entry.rank) }]}>
                    {entry.rank}
                  </Text>
                </View>
                
                <View style={styles.leaderboardUser}>
                  <Text style={styles.leaderboardUserIcon}>{getRankIcon(entry.rank)}</Text>
                  <View style={styles.leaderboardUserInfo}>
                    <Text style={styles.leaderboardUserName}>{entry.user.name}</Text>
                    <Text style={styles.leaderboardUserLocation}>
                      {entry.district}, {entry.state}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.leaderboardScore}>
                  <Text style={styles.scoreValue}>{entry.score}</Text>
                  <Text style={styles.scoreUnit}>{SPORTS_CONFIG[selectedSport].unit}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Competition Info */}
        <Card variant="outlined" style={styles.competitionCard}>
          <Text style={styles.competitionTitle}>🏟️ Upcoming Competitions</Text>
          <View style={styles.competitionList}>
            <View style={styles.competitionItem}>
              <Text style={styles.competitionIcon}>🏆</Text>
              <View style={styles.competitionInfo}>
                <Text style={styles.competitionName}>State Championship</Text>
                <Text style={styles.competitionDate}>March 15-17, 2025</Text>
              </View>
            </View>
            <View style={styles.competitionItem}>
              <Text style={styles.competitionIcon}>🥇</Text>
              <View style={styles.competitionInfo}>
                <Text style={styles.competitionName}>District Meet</Text>
                <Text style={styles.competitionDate}>February 20, 2025</Text>
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
  yourRankCard: {
    borderWidth: 2,
    marginBottom: 24,
  },
  yourRankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yourRankTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  yourRankContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  yourRankInfo: {
    alignItems: 'center',
  },
  yourRankNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E40AF',
  },
  yourRankScore: {
    fontSize: 32,
    fontWeight: '800',
    color: '#059669',
  },
  yourRankLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  selectorCard: {
    marginBottom: 16,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  sportSelector: {
    flexDirection: 'row',
  },
  sportButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  sportButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  scopeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  scopeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  activeScopeButton: {
    backgroundColor: '#1E40AF',
  },
  scopeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  scopeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  activeScopeText: {
    color: '#FFFFFF',
  },
  podiumCard: {
    marginBottom: 24,
  },
  podiumTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 180,
  },
  podiumPosition: {
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 12,
    minWidth: 80,
  },
  firstPlace: {
    backgroundColor: '#FFF7ED',
    height: 140,
  },
  secondPlace: {
    backgroundColor: '#F0F9FF',
    height: 120,
  },
  thirdPlace: {
    backgroundColor: '#FEF3C7',
    height: 100,
  },
  podiumRank: {
    fontSize: 32,
    marginBottom: 8,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  podiumScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  podiumLocation: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  leaderboardCard: {
    marginBottom: 24,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  leaderboardList: {
    gap: 12,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  leaderboardRank: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  leaderboardUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  leaderboardUserIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  leaderboardUserInfo: {
    flex: 1,
  },
  leaderboardUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  leaderboardUserLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  leaderboardScore: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  scoreUnit: {
    fontSize: 12,
    color: '#6B7280',
  },
  competitionCard: {
    marginBottom: 24,
  },
  competitionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  competitionList: {
    gap: 12,
  },
  competitionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  competitionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  competitionDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});