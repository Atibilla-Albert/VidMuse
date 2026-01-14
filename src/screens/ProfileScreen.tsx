import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import CustomStatusBar from '../components/StatusBar';
import Header from '../components/Header';
import api from '../services/api';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: 'VidMuse Creator',
    email: 'creator@vidmuse.ai',
  });
  const [stats, setStats] = useState({
    videos: 0,
    scenes: 0,
    views: 0,
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await api.user.getProfile();
      if (response.success && response.data) {
        setUserData({
          name: response.data.user.name || 'VidMuse Creator',
          email: response.data.user.email || 'creator@vidmuse.ai',
        });
        setStats({
          videos: response.data.stats?.videos || 0,
          scenes: response.data.stats?.scenes || 0,
          views: response.data.stats?.views || 0,
        });
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      // Keep default values on error
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.auth.signOut();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' as never }],
            });
          } catch (error) {
            console.error('Logout error:', error);
            // Navigate anyway
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' as never }],
            });
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Profile"
          subtitle="Manage your account settings"
        />

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>

          {loading ? (
            <ActivityIndicator color="#6d5dfc" style={{ marginTop: 10 }} />
          ) : (
            <>
              <Text style={styles.name}>{userData.name}</Text>
              <Text style={styles.email}>{userData.email}</Text>
            </>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.videos}</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.scenes}</Text>
            <Text style={styles.statLabel}>Scenes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {stats.views >= 1000 ? `${(stats.views / 1000).toFixed(1)}k` : stats.views}
            </Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <ProfileItem
            icon="settings"
            label="Preferences"
            onPress={() => navigation.navigate('Preferences' as never)}
          />
          <ProfileItem
            icon="shield-checkmark"
            label="Privacy & Security"
            onPress={() => navigation.navigate('PrivacySecurity' as never)}
          />
          <ProfileItem
            icon="help-circle"
            label="Help & Support"
            onPress={() => navigation.navigate('HelpSupport' as never)}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const ProfileItem = ({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={20} color="#6d5dfc" />
      <Text style={styles.itemText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#aaa" />
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  profileCard: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6d5dfc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 12,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 40,
    backgroundColor: '#ff4d4f',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
