import axiosClient from './axiosClient';

export const studentApi = {
  getDashboardStats: () => axiosClient.get('/student/dashboard').then(res => res.data),
  uploadResume: (formData) => axiosClient.post('/student/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  syncGithub: (githubUsername) => axiosClient.post('/student/github', { githubUsername }).then(res => res.data)
};
