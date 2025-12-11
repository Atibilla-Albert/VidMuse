import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import CustomStatusBar from '../components/StatusBar';
import Header from '../components/Header';

type RootTabParamList = {
  Create: undefined;
  Scenes: { projectId: string; prompt: string };
  Export: { projectId: string };
  Library: undefined;
  Profile: undefined;
};

type Props = BottomTabScreenProps<RootTabParamList, 'Library'>;

interface Project {
  id: string;
  title: string;
  scenes: number;
  duration: string;
  status: 'draft' | 'completed';
}

export default function LibraryScreen({ navigation }: Props) {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Futuristic Time Device',
      scenes: 5,
      duration: '60s',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Cyberpunk City Chase',
      scenes: 4,
      duration: '45s',
      status: 'draft',
    },
  ]);

  return (
    <View style={styles.container}>
      <CustomStatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Library"
          subtitle="Your AI-generated video projects"
        />

        {projects.map(project => (
          <TouchableOpacity
            key={project.id}
            style={styles.projectCard}
            onPress={() =>
              navigation.navigate('Scenes', {
                projectId: project.id,
                prompt: '',
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.projectTitle}>
                {project.title}
              </Text>
              <MaterialIcons
                name={
                  project.status === 'completed'
                    ? 'check-circle'
                    : 'pending'
                }
                size={20}
                color={
                  project.status === 'completed'
                    ? '#4caf50'
                    : '#ff9800'
                }
              />
            </View>

            <Text style={styles.projectMeta}>
              {project.scenes} Scenes • {project.duration}
            </Text>

            <View style={styles.cardFooter}>
              <Text
                style={[
                  styles.statusText,
                  project.status === 'completed'
                    ? styles.completed
                    : styles.draft,
                ]}
              >
                {project.status.toUpperCase()}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {projects.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="video-library"
              size={48}
              color="#6d5dfc"
            />
            <Text style={styles.emptyTitle}>
              No projects yet
            </Text>
            <Text style={styles.emptyText}>
              Create your first AI video from the Create tab
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  projectCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  projectMeta: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  completed: {
    color: '#4caf50',
  },
  draft: {
    color: '#ff9800',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
});
