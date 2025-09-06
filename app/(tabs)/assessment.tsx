import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SportCard } from '@/components/sports/SportCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SPORTS_CONFIG } from '@/constants/sports';
import { SportType } from '@/types/performance';
import { useTranslation } from '@/hooks/useTranslation';

export default function AssessmentScreen() {
  const { t } = useTranslation();
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);

  const handleSportSelect = (sportType: SportType) => {
    const config = SPORTS_CONFIG[sportType];
    if (config.comingSoon) return;
    
    setSelectedSport(sportType);
  };

  const handleStartAssessment = () => {
    if (!selectedSport) return;
    
    setIsAssessing(true);
    
    // Mock assessment process
    setTimeout(() => {
      setIsAssessing(false);
      setSelectedSport(null);
      // In real app, would navigate to results or handle assessment completion
      console.log('Assessment completed for:', selectedSport);
    }, 3000);
  };

  if (isAssessing) {
    return (
      <View style={styles.assessingContainer}>
        <Card variant="elevated" style={styles.assessingCard}>
          <Text style={styles.assessingIcon}>📹</Text>
          <Text style={styles.assessingTitle}>{t('analyzing')}</Text>
          <Text style={styles.assessingSubtitle}>
            AI is analyzing your performance...
          </Text>
          <View style={styles.assessingSteps}>
            <Text style={styles.assessingStep}>✅ Video captured</Text>
            <Text style={styles.assessingStep}>🔄 Processing movement data</Text>
            <Text style={styles.assessingStep}>⏳ Calculating results</Text>
          </View>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Performance Assessment</Text>
          <Text style={styles.subtitle}>
            Choose a sport to test your performance with AI-powered analysis
          </Text>
        </View>

        {/* Selected Sport Actions */}
        {selectedSport && (
          <Card variant="elevated" style={[styles.selectedCard, { borderColor: SPORTS_CONFIG[selectedSport].color }]}>
            <View style={styles.selectedHeader}>
              <Text style={styles.selectedTitle}>Ready to start?</Text>
              <Text style={styles.selectedSubtitle}>
                {SPORTS_CONFIG[selectedSport].name} Assessment
              </Text>
            </View>
            <View style={styles.selectedActions}>
              <Button
                title="Start Assessment"
                onPress={handleStartAssessment}
                style={[styles.startButton, { backgroundColor: SPORTS_CONFIG[selectedSport].color }]}
              />
              <Button
                title="Change Sport"
                onPress={() => setSelectedSport(null)}
                variant="outline"
                style={styles.changeButton}
              />
            </View>
          </Card>
        )}

        {/* Instructions */}
        <Card variant="outlined" style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>📋 Before You Start</Text>
          <View style={styles.instructionsList}>
            <Text style={styles.instruction}>🎥 Ensure good lighting and clear camera view</Text>
            <Text style={styles.instruction}>👕 Wear appropriate sports attire</Text>
            <Text style={styles.instruction}>📱 Hold your device steady or use a stand</Text>
            <Text style={styles.instruction}>🏃‍♂️ Have enough space for the activity</Text>
          </View>
        </Card>

        {/* Sports Selection */}
        <View style={styles.sportsSection}>
          <Text style={styles.sectionTitle}>{t('selectSport')}</Text>
          {Object.entries(SPORTS_CONFIG).map(([key, config]) => (
            <SportCard
              key={key}
              sportType={key as SportType}
              onPress={() => handleSportSelect(key as SportType)}
              disabled={selectedSport === key as SportType}
            />
          ))}
        </View>

        {/* Assessment Features */}
        <Card variant="elevated" style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>🤖 AI Assessment Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Real-time technique analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Performance benchmarking</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚫</Text>
              <Text style={styles.featureText}>Cheat detection system</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏆</Text>
              <Text style={styles.featureText}>Achievement tracking</Text>
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
  selectedCard: {
    borderWidth: 2,
    marginBottom: 24,
  },
  selectedHeader: {
    marginBottom: 16,
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedActions: {
    gap: 12,
  },
  startButton: {
    marginBottom: 0,
  },
  changeButton: {
    borderColor: '#E5E7EB',
  },
  instructionsCard: {
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionsList: {
    gap: 8,
  },
  instruction: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  sportsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  featuresCard: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  assessingContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    padding: 20,
  },
  assessingCard: {
    padding: 32,
    alignItems: 'center',
  },
  assessingIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  assessingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  assessingSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  assessingSteps: {
    gap: 8,
    alignItems: 'flex-start',
  },
  assessingStep: {
    fontSize: 14,
    color: '#4B5563',
  },
});