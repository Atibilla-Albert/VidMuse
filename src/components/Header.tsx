import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showRecent?: boolean;
  showAction?: boolean;
  actionText?: string;
  onActionPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showRecent = false,
  showAction = false,
  actionText,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Logo + Title */}
      <View style={styles.left}>
        <View style={styles.logoContainer}>
          <Ionicons name="film" size={20} color="#6d5dfc" />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {showRecent && (
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#6d5dfc"
            />
          </TouchableOpacity>
        )}

        {showAction && actionText && onActionPress && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onActionPress}
          >
            <Text style={styles.actionText}>
              {actionText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0f0f1a',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(109,93,252,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  titleContainer: {
    flexShrink: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f0f0f0',
  },
  subtitle: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(109,93,252,0.12)',
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#6d5dfc',
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
