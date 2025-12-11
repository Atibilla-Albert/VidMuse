import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import CustomStatusBar from '../components/StatusBar';
import Header from '../components/Header';

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Profile"
          subtitle="Manage your VidMuse account"
        />

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>

          <Text style={styles.name}>VidMuse Creator</Text>
          <Text style={styles.email}>creator@vidmuse.ai</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>Scenes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>9.2k</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <ProfileItem icon="settings" label="Preferences" />
          <ProfileItem icon="shield-checkmark" label="Privacy & Security" />
          <ProfileItem icon="help-circle" label="Help & Support" />
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
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) => (
  <TouchableOpacity style={styles.item}>
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
