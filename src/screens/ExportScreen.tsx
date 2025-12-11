import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import CustomStatusBar from '../components/StatusBar';
import Header from '../components/Header';

type RootTabParamList = {
  Create: undefined;
  Scenes: undefined;
  Export: { scenes?: any[] };
  Library: undefined;
  Profile: undefined;
};

type Props = BottomTabScreenProps<RootTabParamList, 'Export'>;

export default function ExportScreen({ route }: Props) {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);

    setTimeout(() => {
      setExporting(false);
      Alert.alert(
        'Export Complete',
        'Your AI-generated video is ready to download.',
      );
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Export Video"
          subtitle="Finalize and render your video"
        />

        {/* Preview Box */}
        <View style={styles.previewBox}>
          <MaterialIcons name="movie" size={48} color="#6d5dfc" />
          <Text style={styles.previewText}>
            Video preview will appear here
          </Text>
        </View>

        {/* Export Settings */}
        <View style={styles.settingsBox}>
          <Setting label="Resolution" value="1080p (Full HD)" />
          <Setting label="Format" value="MP4 (H.264)" />
          <Setting label="Frame Rate" value="30 FPS" />
          <Setting label="Audio" value="AI Voiceover + Music" />
        </View>

        {/* Export Button */}
        <TouchableOpacity
          style={styles.exportButton}
          onPress={handleExport}
          disabled={exporting}
        >
          <Ionicons name="cloud-download" size={20} color="#fff" />
          <Text style={styles.exportText}>
            {exporting ? 'Rendering Video...' : 'Export Video'}
          </Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.feedbackBox}>
          <MaterialIcons name="info" size={20} color="#6d5dfc" />
          <Text style={styles.feedbackText}>
            Rendering may take a few minutes depending on video length.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const Setting = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.settingRow}>
    <Text style={styles.settingLabel}>{label}</Text>
    <Text style={styles.settingValue}>{value}</Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  previewBox: {
    height: 200,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: '#aaa',
    marginTop: 10,
  },
  settingsBox: {
    backgroundColor: 'rgba(26,26,46,0.6)',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  settingLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  settingValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  exportButton: {
    backgroundColor: '#6d5dfc',
    borderRadius: 12,
    padding: 18,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  feedbackBox: {
    backgroundColor: 'rgba(109,93,252,0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#6d5dfc',
    padding: 12,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackText: {
    color: '#f0f0f0',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
});
