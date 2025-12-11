import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar as RNStatusBar, View, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';

import CreateScreen from './src/screens/CreateScreen';
import ScenesScreen from './src/screens/ScenesScreen';
import ExportScreen from './src/screens/ExportScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => {
            const iconMap = {
              Create: { focused: 'add-circle', unfocused: 'add-circle-outline' },
              Scenes: { focused: 'layers', unfocused: 'layers-outline' },
              Export: { focused: 'share', unfocused: 'share-outline' },
              Library: { focused: 'library', unfocused: 'library-outline' },
              Profile: { focused: 'person', unfocused: 'person-outline' },
            };

            return {
              tabBarIcon: ({ focused, color, size }) => {
                const icons = iconMap[route.name];
                const iconName = icons ? (focused ? icons.focused : icons.unfocused) : 'help-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#6d5dfc',
              tabBarInactiveTintColor: '#888',
              tabBarStyle: {
                backgroundColor: '#1a1a2e',
                borderTopColor: '#2a2a3e',
                paddingBottom: 5,
                paddingTop: 5,
                height: 60,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                marginBottom: 5,
              },
              headerShown: true,
              headerStyle: {
                backgroundColor: '#1a1a2e',
                borderBottomWidth: 1,
                borderBottomColor: '#2a2a3e',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTitle: () => (
                <View style={styles.headerContainer}>
                  <ExpoImage
                    source={require('./assets/images/vidmuse-logo.svg')}
                    style={styles.headerLogo}
                    contentFit="contain"
                  />
                </View>
              ),
              headerTitleAlign: 'center',
            };
          }}
        >
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Scenes" component={ScenesScreen} />
          <Tab.Screen name="Export" component={ExportScreen} />
          <Tab.Screen name="Library" component={LibraryScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  headerLogo: {
    width: 120,
    height: 40,
  },
});

// Register the app with AppRegistry
AppRegistry.registerComponent('main', () => App);

export default App;

