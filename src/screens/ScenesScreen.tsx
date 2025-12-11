import React, { useEffect, useState } from 'react';
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
import SceneCard from '../components/SceneCard';
import api, { GenerateScenesResponse } from '../services/api';

type RootTabParamList = {
  Create: undefined;
  Scenes: { projectId: string; prompt: string };
  Export: { projectId: string };
  Library: undefined;
  Profile: undefined;
};

type Props = BottomTabScreenProps<RootTabParamList, 'Scenes'>;

export interface Scene {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'ready';
  progress: number;
}

export default function ScenesScreen({ navigation, route }: Props) {
  const { projectId, prompt } = route.params;

  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const generateScenes = async () => {
    try {
      setLoading(true);
      setOverallProgress(10);

      const res = await api.post<GenerateScenesResponse>('/story/generate', {
        projectId,
        prompt,
      });

      // Ensure we have valid data (demo mode fallback)
      const scenesData = res?.data?.scenes || [
        { id: '1', text: 'Demo Scene 1: Story introduction' },
        { id: '2', text: 'Demo Scene 2: Plot development' },
        { id: '3', text: 'Demo Scene 3: Climax and resolution' },
      ];

      const mapped: Scene[] = scenesData.map(
        (scene: any, index: number) => ({
          id: scene.id ?? String(index + 1),
          title: `Scene ${index + 1}`,
          description: scene.text,
          status: 'ready' as const,
          progress: 100,
        })
      );

      setScenes(mapped);
      setOverallProgress(100);
    } catch (err) {
      console.error('Error generating scenes:', err);
      // Fallback to demo scenes on error
      const demoScenes: Scene[] = [
        {
          id: '1',
          title: 'Scene 1',
          description: 'Demo Scene 1: Story introduction',
          status: 'ready',
          progress: 100,
        },
        {
          id: '2',
          title: 'Scene 2',
          description: 'Demo Scene 2: Plot development',
          status: 'ready',
          progress: 100,
        },
        {
          id: '3',
          title: 'Scene 3',
          description: 'Demo Scene 3: Climax and resolution',
          status: 'ready',
          progress: 100,
        },
      ];
      setScenes(demoScenes);
      setOverallProgress(100);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateScenes();
  }, []);

  const regenerateScene = async (sceneId: string) => {
    setScenes(prev =>
      prev.map(scene =>
        scene.id === sceneId
          ? { ...scene, status: 'processing', progress: 0 }
          : scene
      )
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;

      setScenes(prev =>
        prev.map(scene =>
          scene.id === sceneId
            ? { ...scene, progress: Math.min(progress, 100) }
            : scene
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setScenes(prev =>
          prev.map(scene =>
            scene.id === sceneId
              ? { ...scene, status: 'ready', progress: 100 }
              : scene
          )
        );
      }
    }, 300);
  };

  const previewScene = (scene: Scene) => {
    Alert.alert(scene.title, scene.description);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Scenes"
          subtitle="Review & refine AI-generated scenes"
          showAction
          actionText="Regenerate All"
          onActionPress={generateScenes}
        />

        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Generation Progress</Text>
            <Text style={styles.percent}>{overallProgress}%</Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${overallProgress}%` },
              ]}
            />
          </View>
        </View>

        {/* Scenes */}
        <View style={styles.sceneList}>
          {scenes.map((scene, index) => (
            <SceneCard
              key={scene.id}
              sceneNumber={index + 1}
              title={scene.title}
              description={scene.description}
              status={scene.status}
              progress={scene.progress}
              showProgress={scene.status === 'processing'}
              onPress={() => previewScene(scene)}
              onRegenerate={() => regenerateScene(scene.id)}
            />
          ))}
        </View>

        {/* AI Note */}
        <View style={styles.aiNote}>
          <MaterialIcons name="auto-awesome" size={20} color="#6d5dfc" />
          <Text style={styles.aiText}>
            Scenes are crafted using cinematic AI storytelling models.
          </Text>
        </View>

        {/* Continue */}
        <TouchableOpacity
          style={[
            styles.continueBtn,
            loading && { opacity: 0.6 },
          ]}
          disabled={loading}
          onPress={() =>
            navigation.navigate('Export', { projectId })
          }
        >
          <Text style={styles.continueText}>Continue to Export</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  progressCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginTop: 0,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  percent: {
    color: '#6d5dfc',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2a2a3e',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6d5dfc',
    borderRadius: 4,
  },
  sceneList: {
    paddingHorizontal: 16,
  },
  aiNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(109,93,252,0.15)',
    margin: 16,
    padding: 12,
    borderRadius: 10,
  },
  aiText: {
    color: '#eee',
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
  },
  continueBtn: {
    backgroundColor: '#6d5dfc',
    marginHorizontal: 16,
    marginBottom: 90,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10,
  },
});
