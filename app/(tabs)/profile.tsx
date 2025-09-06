import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProfileScreen() {
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+91 98765 43210',
    role: 'athlete' as const,
    avatar: '👤',
    dateOfBirth: '1998-05-15',
    gender: 'male' as const,
    district: 'Mumbai',
    state: 'Maharashtra',
    joinedDate: '2024-12-01',
    totalTests: 24,
    achievements: 12,
    currentStreak: 7,
    bestStreak: 15,
  };

  const achievements = [
    { id: '1', title: 'Speed Demon', description: 'Complete shuttle run under 12s', icon: '⚡', earnedAt: '2025-01-08', category: 'performance' },
    { id: '2', title: 'Consistency Master', description: '7-day testing streak', icon: '🎯', earnedAt: '2025-01-07', category: 'consistency' },
    { id: '3', title: 'High Jumper', description: 'Vertical jump over 60cm', icon: '⬆️', earnedAt: '2025-01-06', category: 'performance' },
    { id: '4', title: 'Early Bird', description: 'Complete test before 8 AM', icon: '🌅', earnedAt: '2025-01-05', category: 'milestone' },
  ];

  const settings = [
    { key: 'notifications', label: 'Push Notifications', value: true, type: 'toggle' },
    { key: 'reminders', label: 'Daily Reminders', value: true, type: 'toggle' },
    { key: 'language', label: 'Language', value: currentLanguage === 'en' ? 'English' : 'Hindi', type: 'select' },
    { key: 'units', label: 'Measurement Units', value: 'Metric', type: 'select' },
    { key: 'privacy', label: 'Data Privacy', value: 'Enabled', type: 'navigation' },
  ];

  const handleLanguageChange = () => {
    Alert.alert(
      'Change Language',
      'Select your preferred language',
      [
        { text: 'English', onPress: () => changeLanguage('en') },
        { text: 'हिंदी', onPress: () => changeLanguage('hi') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => router.replace('/auth')
        },
      ]
    );
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'athlete': return '#1E40AF';
      case 'coach': return '#059669';
      case 'official': return '#EA580C';
      default: return '#6B7280';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'athlete': return '🏃‍♂️';
      case 'coach': return '👨‍🏫';
      case 'official': return '👩‍⚖️';
      default: return '👤';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Profile Header */}
        <Card variant="elevated" style={[styles.profileCard, { borderColor: getRoleColor(user.role) }]}>
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>{user.avatar}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
              <View style={styles.roleContainer}>
                <Text style={styles.roleIcon}>{getRoleIcon(user.role)}</Text>
                <Badge 
                  text={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                  variant="info" 
                />
              </View>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Text style={styles.editIcon}>{isEditing ? '✅' : '✏️'}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.totalTests}</Text>
              <Text style={styles.statLabel}>Tests</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.achievements}</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#EA580C' }]}>{user.currentStreak}</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </Card>

        {/* Profile Details */}
        <Card variant="elevated" style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.detailsList}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>{user.phone}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date of Birth</Text>
              <Text style={styles.detailValue}>{new Date(user.dateOfBirth).toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{user.district}, {user.state}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Member Since</Text>
              <Text style={styles.detailValue}>{new Date(user.joinedDate).toLocaleDateString()}</Text>
            </View>
          </View>
        </Card>

        {/* Achievements Section */}
        <Card variant="elevated" style={styles.achievementsCard}>
          <View style={styles.achievementsHeader}>
            <Text style={styles.sectionTitle}>Achievements 🏆</Text>
            <Badge text={`${achievements.length}/50`} variant="info" />
          </View>
          
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  <Text style={styles.achievementDate}>
                    Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          
          <Button
            title="View All Achievements"
            variant="outline"
            onPress={() => console.log('View all achievements')}
            style={styles.viewAllButton}
          />
        </Card>

        {/* Progress Insights */}
        <Card variant="elevated" style={styles.insightsCard}>
          <Text style={styles.sectionTitle}>Progress Insights 📈</Text>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Overall Performance</Text>
              <ProgressBar progress={0.78} color="#059669" showLabel={true} label="78%" />
            </View>
            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Consistency Score</Text>
              <ProgressBar progress={0.85} color="#1E40AF" showLabel={true} label="85%" />
            </View>
            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Achievement Progress</Text>
              <ProgressBar progress={0.24} color="#EA580C" showLabel={true} label="12/50" />
            </View>
          </View>
        </Card>

        {/* Settings */}
        <Card variant="elevated" style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Settings ⚙️</Text>
          <View style={styles.settingsList}>
            {settings.map((setting) => (
              <TouchableOpacity
                key={setting.key}
                style={styles.settingItem}
                onPress={() => {
                  if (setting.key === 'language') {
                    handleLanguageChange();
                  }
                }}
              >
                <Text style={styles.settingLabel}>{setting.label}</Text>
                <View style={styles.settingValue}>
                  <Text style={styles.settingText}>{setting.value}</Text>
                  {setting.type === 'navigation' && (
                    <Text style={styles.settingArrow}>›</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Sign Out */}
        <View style={styles.signOutSection}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            style={styles.signOutButton}
            textStyle={styles.signOutText}
          />
        </View>

        {/* App Info */}
        <Card variant="outlined" style={styles.appInfoCard}>
          <Text style={styles.appInfoTitle}>Sports AI Assessment</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoDescription}>
            Powered by advanced AI technology for athletic performance analysis
          </Text>
          <View style={styles.appInfoLinks}>
            <TouchableOpacity>
              <Text style={styles.appInfoLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.appInfoLink}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.appInfoLink}>Support</Text>
            </TouchableOpacity>
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
  profileCard: {
    borderWidth: 2,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 18,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  detailsCard: {
    marginBottom: 24,
  },
  detailsList: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  achievementsCard: {
    marginBottom: 24,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 16,
    marginBottom: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
    marginTop: 4,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  viewAllButton: {
    borderColor: '#E5E7EB',
  },
  insightsCard: {
    marginBottom: 24,
  },
  insightsList: {
    gap: 16,
  },
  insightItem: {
    gap: 8,
  },
  insightLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  settingsCard: {
    marginBottom: 24,
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingArrow: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  signOutSection: {
    marginBottom: 24,
  },
  signOutButton: {
    borderColor: '#DC2626',
  },
  signOutText: {
    color: '#DC2626',
  },
  appInfoCard: {
    marginBottom: 40,
    alignItems: 'center',
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  appInfoVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appInfoDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  appInfoLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  appInfoLink: {
    fontSize: 12,
    color: '#1E40AF',
    textDecorationLine: 'underline',
  },
});