import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SceneCardProps {
  title: string;
  sceneNumber: number;
  description: string;
  status: 'ready' | 'processing' | 'pending';
  progress?: number;
  showProgress?: boolean;
  onPress: () => void;
  onRegenerate?: () => void | Promise<void>;
}

const SceneCard: React.FC<SceneCardProps> = ({
  title,
  sceneNumber,
  description,
  status,
  progress = 0,
  showProgress = false,
  onPress,
  onRegenerate,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'ready':
        return '#4caf50';
      case 'processing':
        return '#ff9800';
      case 'pending':
        return '#9e9e9e';
      default:
        return '#9e9e9e';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'ready':
        return 'checkmark-circle';
      case 'processing':
        return 'time';
      case 'pending':
        return 'hourglass-outline';
      default:
        return 'ellipse-outline';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.sceneNumberBadge}>
            <Text style={styles.sceneNumberText}>{sceneNumber}</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
          <Ionicons name={getStatusIcon()} size={14} color={getStatusColor()} />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      
      {showProgress && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progress, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      )}
      
      <View style={styles.footer}>
        {onRegenerate && (
          <TouchableOpacity
            style={styles.regenerateButton}
            onPress={onRegenerate}
          >
            <Ionicons name="refresh" size={16} color="#6d5dfc" />
            <Text style={styles.regenerateText}>Regenerate</Text>
          </TouchableOpacity>
        )}
        <Ionicons name="chevron-forward" size={20} color="#6d5dfc" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(26, 26, 46, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(109, 93, 252, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  sceneNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6d5dfc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sceneNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f0f0f0',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 13,
    color: '#aaa',
    lineHeight: 18,
    marginBottom: 10,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2a2a3e',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6d5dfc',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(109, 93, 252, 0.1)',
  },
  regenerateText: {
    color: '#6d5dfc',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default SceneCard;

