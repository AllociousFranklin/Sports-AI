import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTranslation } from '@/hooks/useTranslation';
import { UserRole } from '@/types/user';

export default function AuthScreen() {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select your role first');
      return;
    }
    
    // Mock authentication - in real app would handle proper auth
    console.log('Authenticating as:', selectedRole);
    router.replace('/(tabs)');
  };

  const handleGoogleAuth = () => {
    console.log('Google authentication');
    router.replace('/(tabs)');
  };

  const handlePhoneAuth = () => {
    console.log('Phone authentication');
    router.replace('/(tabs)');
  };

  const roleOptions = [
    { 
      key: 'athlete' as UserRole, 
      title: t('athlete'), 
      description: 'Track your performance and improve your skills',
      icon: '🏃‍♂️',
      color: '#1E40AF' 
    },
    { 
      key: 'coach' as UserRole, 
      title: t('coach'), 
      description: 'Monitor and guide multiple athletes',
      icon: '👨‍🏫',
      color: '#059669' 
    },
    { 
      key: 'official' as UserRole, 
      title: t('official'), 
      description: 'Oversee assessments and manage competitions',
      icon: '👩‍⚖️',
      color: '#EA580C' 
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🏃‍♂️ Sports AI</Text>
          <Text style={styles.subtitle}>{t('welcome')}</Text>
        </View>

        <Card variant="elevated" style={styles.authCard}>
          <Text style={styles.sectionTitle}>{t('selectRole')}</Text>
          
          {roleOptions.map((role) => (
            <Button
              key={role.key}
              title={role.title}
              onPress={() => setSelectedRole(role.key)}
              variant={selectedRole === role.key ? 'primary' : 'outline'}
              style={[
                styles.roleButton,
                selectedRole === role.key && { backgroundColor: role.color }
              ]}
              icon={<Text style={styles.roleIcon}>{role.icon}</Text>}
            />
          ))}

          <View style={styles.authButtons}>
            <Button
              title="🔐 Continue with Google"
              onPress={handleGoogleAuth}
              variant="outline"
              style={styles.authButton}
            />
            
            <Button
              title="📱 Continue with Phone"
              onPress={handlePhoneAuth}
              variant="outline"
              style={styles.authButton}
            />
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title={isSignUp ? t('signUp') : t('signIn')}
            onPress={handleAuth}
            disabled={!selectedRole}
            style={styles.submitButton}
          />

          <Button
            title={isSignUp ? 'Already have an account? Sign In' : 'New user? Sign Up'}
            onPress={() => setIsSignUp(!isSignUp)}
            variant="outline"
            style={styles.toggleButton}
          />
        </Card>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Why Sports AI?</Text>
          <View style={styles.featuresList}>
            <Text style={styles.feature}>🎯 AI-powered performance analysis</Text>
            <Text style={styles.feature}>📊 Real-time progress tracking</Text>
            <Text style={styles.feature}>🏆 Gamified achievement system</Text>
            <Text style={styles.feature}>🌐 Multi-language support</Text>
            <Text style={styles.feature}>📱 Works offline</Text>
          </View>
        </View>
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
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E40AF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
  authCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  roleButton: {
    marginBottom: 12,
    justifyContent: 'flex-start',
  },
  roleIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  authButtons: {
    marginTop: 20,
    gap: 12,
  },
  authButton: {
    borderColor: '#E5E7EB',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
  },
  submitButton: {
    marginBottom: 12,
  },
  toggleButton: {
    borderColor: '#E5E7EB',
  },
  features: {
    marginTop: 32,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresList: {
    gap: 8,
  },
  feature: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
  },
});