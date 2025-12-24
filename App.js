import React from 'react';
import { StyleSheet, StatusBar as RNStatusBar, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

/* ---------------- SCREENS ---------------- */
import CreateScreen from './src/screens/CreateScreen';
import ScenesScreen from './src/screens/ScenesScreen';
import ExportScreen from './src/screens/ExportScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignIn';
import SettingsScreen from './src/screens/Settings';
import PreferencesScreen from './src/screens/preferenceScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS = {
  Create: { focused: 'add-circle', unfocused: 'add-circle-outline' },
  Scenes: { focused: 'layers', unfocused: 'layers-outline' },
  Export: { focused: 'share-social', unfocused: 'share-social-outline' },
  Library: { focused: 'library', unfocused: 'library-outline' },
  Profile: { focused: 'person', unfocused: 'person-outline' },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#6d5dfc',
        tabBarInactiveTintColor: '#888',
        headerTitleAlign: 'center',
        headerStyle: styles.header,
        headerTitle: () => (
          <Image
            source={require('./assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          const icon = TAB_ICONS[route.name];
          if (!icon) return null;
          return <Ionicons name={focused ? icon.focused : icon.unfocused} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Scenes" component={ScenesScreen} />
      <Tab.Screen name="Export" component={ExportScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      {/* Set translucent to false to prevent layout overlap issues */}
      <RNStatusBar barStyle="light-content" backgroundColor="#0f0f1a" translucent={false} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: styles.header,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Preferences" component={PreferencesScreen} />
          {/* Note: Ensure these routes are handled within your SettingsScreen logic */}
          <Stack.Screen name="EditProfile" component={SettingsScreen} />
          <Stack.Screen name="ChangePassword" component={SettingsScreen} />
          <Stack.Screen name="Subscription" component={SettingsScreen} />
          <Stack.Screen name="PrivacySecurity" component={SettingsScreen} />
          <Stack.Screen name="HelpSupport" component={SettingsScreen} />
          <Stack.Screen name="About" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  tabBar: {
    backgroundColor: '#1a1a2e',
    borderTopColor: '#2a2a3e',
    height: 70,
    paddingBottom: 10,
    paddingTop: 8,
  },
  header: {
    backgroundColor: '#1a1a2e',
    borderBottomColor: '#2a2a3e',
    borderBottomWidth: 1,
  },
  logo: {
    width: 120,
    height: 30,
  },
});