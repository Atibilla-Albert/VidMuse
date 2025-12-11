// API service for making HTTP requests
// This is a placeholder implementation - replace with your actual API configuration

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

interface CreateProjectResponse {
  projectId: string;
}

interface GenerateScenesResponse {
  scenes: Array<{ id?: string; text: string }>;
}

const api = {
  post: async <T = any>(endpoint: string, data: any): Promise<{ data: T }> => {
    // Placeholder implementation - DEMO MODE
    // Replace this with your actual API client (axios, fetch, etc.)
    console.log(`[DEMO] POST ${API_BASE_URL}${endpoint}`, data);
    
    // Simulate network delay for realistic demo
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Mock responses for development based on endpoint
      if (endpoint === '/projects/create') {
        return {
          data: {
            projectId: `project-${Date.now()}`,
          } as T,
        };
      }
      
      if (endpoint === '/story/generate') {
        // Generate demo scenes based on the prompt
        const prompt = data.prompt || '';
        const sceneCount = prompt.length > 200 ? 5 : 4;
        
        return {
          data: {
            scenes: Array.from({ length: sceneCount }, (_, i) => ({
              id: String(i + 1),
              text: `Scene ${i + 1}: ${prompt.substring(0, 50)}... (Demo scene ${i + 1})`,
            })),
          } as T,
        };
      }
      
      // Default response
      return {
        data: {} as T,
      };
    } catch (error) {
      // Fallback to demo data if anything fails
      console.warn('[DEMO] API call failed, using fallback data:', error);
      
      if (endpoint === '/projects/create') {
        return {
          data: {
            projectId: `demo-project-${Date.now()}`,
          } as T,
        };
      }
      
      if (endpoint === '/story/generate') {
        return {
          data: {
            scenes: [
              { id: '1', text: 'Demo Scene 1: Story introduction' },
              { id: '2', text: 'Demo Scene 2: Plot development' },
              { id: '3', text: 'Demo Scene 3: Climax' },
              { id: '4', text: 'Demo Scene 4: Resolution' },
            ],
          } as T,
        };
      }
      
      return {
        data: {} as T,
      };
    }
  },
  
  get: async (endpoint: string) => {
    console.log(`GET ${API_BASE_URL}${endpoint}`);
    return { data: {} };
  },
};

export default api;
export type { CreateProjectResponse, GenerateScenesResponse };

