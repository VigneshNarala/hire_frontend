import axiosClient from './axiosClient';

export const studentApi = {
  getDashboardStats: () => axiosClient.get('/student/dashboard').then(res => res.data),
  uploadResume: (formData) => axiosClient.post('/student/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  syncGithub: (githubUsername) => axiosClient.post('/student/github', { githubUsername }).then(res => res.data),
  syncCodingProfiles: (data) => axiosClient.post('/student/coding-profiles', data).then(res => res.data),
  syncLinkedIn: (linkedinUrl) => axiosClient.post('/student/linkedin', { linkedinUrl }).then(res => res.data),
  syncCredly: (credlyUrl) => axiosClient.post('/student/credly', { credlyUrl }).then(res => res.data),
  getRankings: (domain) => axiosClient.get(`/student/rankings?domain=${domain}`).then(res => res.data),
  getProfile: () => axiosClient.get('/student/profile').then(res => res.data),
  updateProfile: (data) => axiosClient.put('/student/profile', data).then(res => res.data),
  getLearningProgress: () => axiosClient.get('/student/learning-progress').then(res => res.data)
};
