import { mockCareerTwinAnswer } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const careerTwinService = {
  askQuestion: async (question) => {
    await delay(1800);
    // const response = await api.post('/career-twin/ask', { question });
    // return response.data;
    return {
      ...mockCareerTwinAnswer,
      question
    };
  }
};
