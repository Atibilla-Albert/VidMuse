import React from 'react';
import { StatusBar as RNStatusBar, Platform } from 'react-native';

const CustomStatusBar = () => {
  return (
    <RNStatusBar
      barStyle="light-content"
      backgroundColor={Platform.OS === 'android' ? '#0f0f1a' : undefined}
      translucent={Platform.OS === 'android'}
    />
  );
};

export default CustomStatusBar;

