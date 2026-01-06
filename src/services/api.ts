// src/services/api.ts

// 1. SAFE URL CONFIGURATION
// Avoid using 'localhost' on physical devices. 
// 10.0.2.2 is the alias for your computer's localhost in the Android Emulator.
const API_BASE_URL = 'http://10.0.2.2:3000/api'; 

export interface CreateProjectResponse {
  projectId: string;
}

export interface GenerateScenesResponse {
  scenes: Array<{ id?: string; text: string }>;
}

const api = {
  post: async <T = any>(endpoint: string, data: any): Promise<{ data: T }> => {
    console.log(`[DEMO MODE] POST Request to: ${endpoint}`, data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Logic for /projects/create
      if (endpoint === '/projects/create') {
        return {
          data: {
            projectId: `project-${Date.now()}`,
          } as unknown as T,
        };
      }
      
      // Logic for /story/generate
      if (endpoint === '/story/generate') {
        const prompt = data.prompt || '';
        const sceneCount = prompt.length > 200 ? 5 : 4;
        
        return {
          data: {
            scenes: Array.from({ length: sceneCount }, (_, i) => ({
              id: String(i + 1),
              text: `Scene ${i + 1}: ${prompt.substring(0, 50)}... (Demo scene ${i + 1})`,
            })),
          } as unknown as T,
        };
      }
      
      return { data: {} as T };
    } catch (error) {
      console.warn('[DEMO] API Mock Error:', error);
      return { data: {} as T };
    }
  },
  
  get: async (endpoint: string) => {
    console.log(`[DEMO MODE] GET Request to: ${endpoint}`);
    return { data: {} };
  },
};

export default api;