// API Service for VidMuse Backend
// For Android Emulator use: http://10.0.2.2:5000/api
// For iOS Simulator use: http://localhost:5000/api
// For physical device, use your computer's IP address: http://YOUR_IP:5000/api

const API_BASE_URL = __DEV__ 
  ? 'http://10.0.2.2:5000/api' // Android Emulator default
  : 'https://your-production-api.com/api'; // Production URL

// Token storage key
const TOKEN_KEY = '@vidmuse_token';

// Interfaces
export interface CreateProjectResponse {
  success: boolean;
  data: {
    projectId: string;
  };
}

export interface GenerateScenesResponse {
  success: boolean;
  data: {
    scenes: Array<{ id: string; text: string; title?: string; sceneNumber?: number }>;
  };
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
      subscription: string;
    };
  };
}

export interface UserProfile {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      avatar: string | null;
      subscription: string;
      createdAt: string;
    };
    stats: {
      videos: number;
      scenes: number;
      views: number;
    };
  };
}

export interface VideoExportResponse {
  success: boolean;
  data: {
    videoId: string;
    status: string;
    message: string;
  };
}

// Storage helpers (using in-memory storage - can be enhanced with AsyncStorage)
let authToken: string | null = null;

const getToken = async (): Promise<string | null> => {
  // Try AsyncStorage if available, otherwise use in-memory
  try {
    // @ts-ignore - Optional dependency
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      authToken = token;
    }
    return token || authToken;
  } catch (error) {
    // AsyncStorage not available, use in-memory storage
    return authToken;
  }
};

const setToken = async (token: string | null): Promise<void> => {
  authToken = token;
  // Try AsyncStorage if available
  try {
    // @ts-ignore - Optional dependency
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    if (token) {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } else {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  } catch (error) {
    // AsyncStorage not available, token stored in memory only
    // Note: Token will be lost on app restart. Install @react-native-async-storage/async-storage for persistence.
  }
};

// API Client
const api = {
  // Get authorization header
  getAuthHeaders: async (): Promise<Record<string, string>> => {
    const token = await getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  // POST request
  post: async <T = any>(endpoint: string, data: any): Promise<{ data: T }> => {
    try {
      const headers = await api.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return { data: result.data || result };
    } catch (error: any) {
      console.error(`API POST Error [${endpoint}]:`, error);
      throw error;
    }
  },

  // GET request
  get: async <T = any>(endpoint: string): Promise<{ data: T }> => {
    try {
      const headers = await api.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return { data: result.data || result };
    } catch (error: any) {
      console.error(`API GET Error [${endpoint}]:`, error);
      throw error;
    }
  },

  // PUT request
  put: async <T = any>(endpoint: string, data: any): Promise<{ data: T }> => {
    try {
      const headers = await api.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return { data: result.data || result };
    } catch (error: any) {
      console.error(`API PUT Error [${endpoint}]:`, error);
      throw error;
    }
  },

  // DELETE request
  delete: async <T = any>(endpoint: string): Promise<{ data: T }> => {
    try {
      const headers = await api.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return { data: result.data || result };
    } catch (error: any) {
      console.error(`API DELETE Error [${endpoint}]:`, error);
      throw error;
    }
  },

  // Authentication methods
  auth: {
    signUp: async (email: string, password: string, name?: string): Promise<AuthResponse> => {
      const response = await api.post<AuthResponse['data']>('/auth/signup', {
        email,
        password,
        name,
      });
      if (response.data.token) {
        await setToken(response.data.token);
      }
      return { success: true, data: response.data };
    },

    signIn: async (email: string, password: string): Promise<AuthResponse> => {
      const response = await api.post<AuthResponse['data']>('/auth/signin', {
        email,
        password,
      });
      if (response.data.token) {
        await setToken(response.data.token);
      }
      return { success: true, data: response.data };
    },

    signOut: async (): Promise<void> => {
      await setToken(null);
    },

    getCurrentUser: async (): Promise<UserProfile> => {
      const response = await api.get<UserProfile['data']>('/auth/me');
      return { success: true, data: response.data };
    },
  },

  // Projects
  projects: {
    create: async (prompt: string, style?: string, duration?: string): Promise<CreateProjectResponse> => {
      const response = await api.post<CreateProjectResponse['data']>('/projects/create', {
        prompt,
        style: style || 'Cinematic Sci-Fi',
        duration: duration || '60 seconds',
      });
      return { success: true, data: response.data };
    },

    getAll: async () => {
      return api.get('/projects');
    },

    getById: async (projectId: string) => {
      return api.get(`/projects/${projectId}`);
    },
  },

  // Story/Scenes
  story: {
    generate: async (projectId: string, prompt: string): Promise<GenerateScenesResponse> => {
      const response = await api.post<GenerateScenesResponse['data']>('/story/generate', {
        projectId,
        prompt,
      });
      return { success: true, data: response.data };
    },

    regenerateScene: async (sceneId: string, prompt?: string) => {
      return api.post(`/story/regenerate/${sceneId}`, { prompt });
    },
  },

  // Video
  video: {
    export: async (projectId: string): Promise<VideoExportResponse> => {
      const response = await api.post<VideoExportResponse['data']>('/video/export', {
        projectId,
      });
      return { success: true, data: response.data };
    },

    getStatus: async (videoId: string) => {
      return api.get(`/video/status/${videoId}`);
    },

    getAll: async () => {
      return api.get('/video');
    },
  },

  // User
  user: {
    getProfile: async (): Promise<UserProfile> => {
      const response = await api.get<UserProfile['data']>('/user/profile');
      return { success: true, data: response.data };
    },

    updateProfile: async (name?: string, avatar?: string) => {
      return api.put('/user/profile', { name, avatar });
    },
  },
};

export default api;
