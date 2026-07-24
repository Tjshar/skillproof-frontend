import { mockCandidates } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const recruiterService = {
  searchCandidates: async (skills, minScore, location) => {
    await delay(1000);
    // const response = await api.get('/recruiter/candidates', { 
    //   params: { skills, min_score: minScore, location } 
    // });
    // return response.data;
    
    return mockCandidates.filter(candidate => {
      if (minScore > 0 && candidate.overallScore < minScore) return false;
      if (skills) {
        const query = skills.toLowerCase();
        const matchesSkill = candidate.topSkills.some(skill => skill.toLowerCase().includes(query));
        const matchesName = candidate.name.toLowerCase().includes(query);
        if (!matchesSkill && !matchesName) return false;
      }
      if (location && !candidate.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
      return true;
    });
  }
};
