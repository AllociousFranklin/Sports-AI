import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getSportConfig } from '@/constants/sports';
import { SportType } from '@/types/performance';

interface SportCardProps {
  sportType: SportType;
  onPress: () => void;
  disabled?: boolean;
}

export function SportCard({ sportType, onPress, disabled = false }: SportCardProps) {
  const config = getSportConfig(sportType);
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || config.comingSoon}
      activeOpacity={0.7}
    >
      <Card variant="elevated" style={[
        styles.card,
        { borderLeftColor: config.color },
        (disabled || config.comingSoon) && styles.disabledCard
      ]}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${config.color}20` }]}>
            <Text style={[styles.icon, { color: config.color }]}>🏃</Text>
          </View>
          {config.comingSoon && (
            <Badge text="Coming Soon" variant="warning" size="small" />
          )}
        </View>
        
        <Text style={styles.title}>{config.name}</Text>
        <Text style={styles.description}>{config.description}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.estimatedTime}>⏱️ {config.estimatedTime}</Text>
          <Text style={[styles.unit, { color: config.color }]}>
            Measured in {config.unit}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    marginBottom: 16,
  },
  disabledCard: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimatedTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unit: {
    fontSize: 12,
    fontWeight: '600',
  },
});