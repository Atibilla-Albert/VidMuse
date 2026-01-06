import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Assuming these are custom components available in the project
import CustomStatusBar from '../components/StatusBar';
import Header from '../components/Header'; 
import { useNavigation } from '@react-navigation/native'; // Needed for screen navigation

// Reusable component for a setting item
const SettingRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={preferencesStyles.settingRow}>
    <Text style={preferencesStyles.settingLabel}>{label}</Text>
    {children}
  </View>
);

const PreferencesScreen = () => {
  const navigation = useNavigation();

  // State for preference settings
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [notifications, setNotifications] = useState(true);

  const themeOptions = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' },
    { label: 'System', value: 'system' },
  ];

  const textSizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];
  
  // Reusable component for a segmented choice button
  const ChoiceOption = ({ current, value, label, onSelect }: { current: string; value: string; label: string; onSelect: (val: string) => void }) => (
    <TouchableOpacity
      style={[
        preferencesStyles.choiceButton,
        current === value && preferencesStyles.choiceButtonActive,
      ]}
      onPress={() => onSelect(value)}
    >
      <Text
        style={[
          preferencesStyles.choiceText,
          current === value && preferencesStyles.choiceTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={preferencesStyles.container}>
      <CustomStatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header 
          title="Preferences" 
          subtitle="Customize your app experience" 
        />

        {/* Theme and Text Size Settings */}
        <View style={preferencesStyles.section}>
          <Text style={preferencesStyles.sectionTitle}>Appearance</Text>

          <View style={preferencesStyles.card}>
            {/* Theme Selector */}
            <SettingRow label="App Theme">
              <View style={preferencesStyles.segmentedControl}>
                {themeOptions.map((option) => (
                  <ChoiceOption 
                    key={option.value} 
                    current={theme} 
                    value={option.value} 
                    label={option.label} 
                    onSelect={setTheme as (val: string) => void}
                  />
                ))}
              </View>
            </SettingRow>

            <View style={preferencesStyles.divider} />
            
            {/* Text Size Selector */}
            <SettingRow label="Text Size">
              <View style={preferencesStyles.segmentedControl}>
                {textSizeOptions.map((option) => (
                  <ChoiceOption 
                    key={option.value} 
                    current={textSize} 
                    value={option.value} 
                    label={option.label} 
                    onSelect={setTextSize as (val: string) => void}
                  />
                ))}
              </View>
            </SettingRow>
          </View>
        </View>

        {/* Other Settings */}
        <View style={preferencesStyles.section}>
          <Text style={preferencesStyles.sectionTitle}>Other Settings</Text>

          <View style={preferencesStyles.card}>
            {/* Push Notifications Toggle */}
            <SettingRow label="Push Notifications">
              <Switch
                trackColor={{ false: '#767577', true: '#6d5dfc' }}
                thumbColor={notifications ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setNotifications}
                value={notifications}
              />
            </SettingRow>
            
            <View style={preferencesStyles.divider} />

            {/* Clear Cache Button */}
            <TouchableOpacity style={preferencesStyles.clearCacheButton}>
                <Text style={preferencesStyles.clearCacheText}>Clear Cache</Text>
                <Ionicons name="trash-outline" size={20} color="#ff4d4f" />
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    </View>
  );
};

// --- STYLES ---
const preferencesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a', // Consistent dark background
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#1a1a2e', // Consistent dark card background
    borderRadius: 12,
    padding: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a3e',
    marginVertical: 5,
  },
  // Segmented Control for Theme/Text Size
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
    padding: 3,
  },
  choiceButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  choiceButtonActive: {
    backgroundColor: '#6d5dfc', // Primary color for active selection
  },
  choiceText: {
    color: '#aaa',
    fontWeight: '600',
    fontSize: 13,
  },
  choiceTextActive: {
    color: '#fff',
  },
  clearCacheButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  clearCacheText: {
    color: '#ff4d4f',
    fontSize: 15,
    fontWeight: '500',
  }
});

export default PreferencesScreen;