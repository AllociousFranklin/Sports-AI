import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-1
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({ 
  progress, 
  color = '#1E40AF', 
  backgroundColor = '#E5E7EB',
  height = 8,
  showLabel = false,
  label
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={styles.label}>
          {label || `${Math.round(clampedProgress * 100)}%`}
        </Text>
      )}
      <View style={[
        styles.track,
        { backgroundColor, height, borderRadius: height / 2 }
      ]}>
        <View style={[
          styles.fill,
          { 
            backgroundColor: color, 
            width: `${clampedProgress * 100}%`,
            height,
            borderRadius: height / 2
          }
        ]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  track: {
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});