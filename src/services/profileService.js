import { mockStudentData } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const profileService = {
  getDashboard: async () => {
    await delay(600);
    // const response = await api.get('/profile/dashboard');
    // return response.data;
    return mockStudentData.profile;
  },
  syncGithub: async () => {
    await delay(1500);
    // const response = await api.post('/profile/github/refresh');
    // return response.data;
    return mockStudentData.github;
  },
  uploadResume: async (file) => {
    await delay(2000);
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await api.post('/profile/resume/upload', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    // return response.data;
    return mockStudentData.resume;
  },
  getProfileData: async () => {
    await delay(400);
    return {
        github: mockStudentData.github,
        resume: mockStudentData.resume
    }
  }
};
