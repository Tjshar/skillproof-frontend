import { mockInterviewQuestions } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const interviewService = {
  startSession: async (roleHint) => {
    await delay(1000);
    // const response = await api.post('/interview/start', { role_hint: roleHint });
    // return response.data;
    return {
      sessionId: 'session_mock_123',
      questions: mockInterviewQuestions
    };
  },
  submitAnswer: async (sessionId, questionId, answer) => {
    await delay(800);
    // const response = await api.post(`/interview/${sessionId}/answer`, { questionId, answer });
    // return response.data;
    return {
      score: Math.floor(Math.random() * 30) + 70,
      feedback: 'Good understanding demonstrated. Consider providing more specific examples.'
    };
  }
};
