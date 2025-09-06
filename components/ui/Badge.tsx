import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'small' | 'medium';
}

export function Badge({ text, variant = 'neutral', size = 'medium' }: BadgeProps) {
  return (
    <View style={[
      styles.badge,
      styles[variant],
      styles[size]
    ]}>
      <Text style={[
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`]
      ]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  
  // Variants
  success: {
    backgroundColor: '#D1FAE5',
  },
  warning: {
    backgroundColor: '#FEF3C7',
  },
  error: {
    backgroundColor: '#FEE2E2',
  },
  info: {
    backgroundColor: '#DBEAFE',
  },
  neutral: {
    backgroundColor: '#F3F4F6',
  },
  
  // Sizes
  small: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  
  // Text styles
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  successText: {
    color: '#065F46',
  },
  warningText: {
    color: '#92400E',
  },
  errorText: {
    color: '#991B1B',
  },
  infoText: {
    color: '#1E3A8A',
  },
  neutralText: {
    color: '#374151',
  },
  
  // Size text
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
});