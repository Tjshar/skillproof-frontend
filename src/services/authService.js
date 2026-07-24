import { mockStudentData } from '../data/mockData';

// Simulates API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (role = 'student') => {
    await delay(800); // Simulate network request
    // In the future, this will be an API call like:
    // const response = await api.get('/auth/github/login');
    // return response.data;
    
    return {
      ...mockStudentData,
      role: role
    };
  },
  logout: async () => {
    await delay(300);
    // await api.post('/auth/logout');
    return true;
  },
  getCurrentUser: async () => {
    await delay(400);
    // const response = await api.get('/me');
    // return response.data;
    return mockStudentData;
  }
};
