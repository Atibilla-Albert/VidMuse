import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// --------------------
// Setting Item Props
// --------------------
interface SettingItemProps {
  iconName: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  iconLibrary: 'Ionicons' | 'MaterialIcons';
}

// --------------------
// Reusable Setting Item
// --------------------
const SettingItem: React.FC<SettingItemProps> = ({
  iconName,
  label,
  onPress,
  iconLibrary,
}) => {
  const IconComponent = iconLibrary === 'MaterialIcons' ? MaterialIcons : Ionicons;

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemIconContainer}>
        <IconComponent name={iconName as any} size={22} color="#6d5dfc" />
      </View>
      <Text style={styles.itemText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#aaa" />
    </TouchableOpacity>
  );
};

// --------------------
// Main Settings Screen
// --------------------
const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          console.log('User signed out');
          navigation.navigate('Login' as never);
        },
      },
    ]);
  };

  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={{ padding: 20, paddingTop: 50 }}>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700' }}>Settings</Text>
          <Text style={{ color: '#aaa' }}>Manage your application and account</Text>
        </View>

        {/* ACCOUNT SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.itemCard}>
            <SettingItem
              iconName="person-outline"
              label="Edit Profile"
              onPress={() => navigateTo('EditProfile')}
              iconLibrary="Ionicons"
            />
            <SettingItem
              iconName="lock-closed-outline"
              label="Change Password"
              onPress={() => navigateTo('ChangePassword')}
              iconLibrary="Ionicons"
            />
            <SettingItem
              iconName="card-membership"
              label="Subscription & Billing"
              onPress={() => navigateTo('Subscription')}
              iconLibrary="MaterialIcons"
            />
          </View>
        </View>

        {/* GENERAL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GENERAL</Text>
          <View style={styles.itemCard}>
            <SettingItem
              iconName="color-wand-outline"
              label="Preferences"
              onPress={() => navigateTo('Preferences')}
              iconLibrary="Ionicons"
            />
            <SettingItem
              iconName="security"
              label="Privacy & Security"
              onPress={() => navigateTo('PrivacySecurity')}
              iconLibrary="MaterialIcons"
            />
          </View>
        </View>

        {/* SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          <View style={styles.itemCard}>
            <SettingItem
              iconName="help-circle-outline"
              label="Help & Support"
              onPress={() => navigateTo('HelpSupport')}
              iconLibrary="Ionicons"
            />
            <SettingItem
              iconName="info-outline"
              label="About VidMuse"
              onPress={() => navigateTo('About')}
              iconLibrary="MaterialIcons"
            />
          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  itemIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(109, 93, 252, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 77, 79, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 50,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff4d4f',
    fontSize: 16,
    fontWeight: '600',
  },
});
