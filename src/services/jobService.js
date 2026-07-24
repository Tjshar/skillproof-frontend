import { mockJobs } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const jobService = {
  searchJobs: async (query, location) => {
    await delay(1200);
    // const response = await api.get('/jobs/search', { params: { q: query, location } });
    // return response.data;
    
    // Simulate filtering locally for now
    return mockJobs.filter(job => {
      if (query && !job.role.toLowerCase().includes(query.toLowerCase()) && 
          !job.company.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
      return true;
    });
  }
};
