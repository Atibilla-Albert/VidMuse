import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import CustomStatusBar from '../components/StatusBar';
import Header from '../components/Header';
import api from '../services/api';

// Defined types strictly to match Tab Navigator expectations
type RootTabParamList = {
  Create: undefined;
  Scenes: { projectId: string; prompt: string };
  Export: { projectId: string };
  Library: undefined;
  Profile: undefined;
};

type Props = BottomTabScreenProps<RootTabParamList, 'Create'>;

export default function CreateScreen({ navigation }: Props) {
  const [storyText, setStoryText] = useState('In a futuristic city, a young inventor discovers a mysterious device...');
  const [videoStyle] = useState('Cinematic Sci-Fi');
  const [videoLength] = useState('60 seconds');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!storyText.trim()) {
      Alert.alert('Error', 'Please enter a story');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/projects/create', {
        prompt: storyText,
        style: videoStyle,
        duration: videoLength,
      });

      const projectId = res?.data?.projectId || `demo-${Date.now()}`;
      // Use navigate with proper typing
      navigation.navigate('Scenes', { projectId, prompt: storyText });
    } catch (err) {
      console.error('API Error:', err);
      // Fallback for development/demo mode
      navigation.navigate('Scenes', { projectId: `demo-${Date.now()}`, prompt: storyText });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <CustomStatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Create Video" subtitle="Turn stories into AI videos" />
        <View style={styles.card}>
          <Text style={styles.title}>Your Story</Text>
          <TextInput
            style={styles.input}
            multiline
            value={storyText}
            onChangeText={setStoryText}
            placeholder="Describe your story..."
            placeholderTextColor="#777"
          />
          <View style={styles.row}>
            <View style={styles.selector}>
              <Text style={styles.label}>STYLE</Text>
              <Text style={styles.value}>{videoStyle}</Text>
            </View>
            <View style={styles.selector}>
              <Text style={styles.label}>LENGTH</Text>
              <Text style={styles.value}>{videoLength}</Text>
            </View>
          </View>
          <View style={styles.tip}>
            <MaterialIcons name="lightbulb" size={18} color="#6d5dfc" />
            <Text style={styles.tipText}>Add emotions, camera angles, or environment details.</Text>
          </View>
          <TouchableOpacity 
            style={[styles.button, loading && { opacity: 0.6 }]} 
            onPress={handleGenerate} 
            disabled={loading}
          >
            <FontAwesome name="film" size={18} color="#fff" />
            <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate Scenes'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  card: { backgroundColor: '#1a1a2e', borderRadius: 16, padding: 20, margin: 16 },
  title: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: { backgroundColor: '#2a2a3e', borderRadius: 12, padding: 14, color: '#fff', minHeight: 120, marginBottom: 15 },
  row: { flexDirection: 'row', gap: 10 },
  selector: { flex: 1, backgroundColor: '#2a2a3e', borderRadius: 12, padding: 12 },
  label: { fontSize: 12, color: '#aaa' },
  value: { color: '#fff', fontWeight: '500', marginTop: 4 },
  tip: { flexDirection: 'row', alignItems: 'center', marginVertical: 15, backgroundColor: 'rgba(109,93,252,0.15)', padding: 10, borderRadius: 8 },
  tipText: { color: '#eee', marginLeft: 8, fontSize: 13, flex: 1 },
  button: { backgroundColor: '#6d5dfc', padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 8 },
});