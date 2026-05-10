import axiosClient from './axiosClient';

export const placementApi = {
  getTopCandidates: (domain) => axiosClient.get(`/placement/top-candidates${domain && domain !== 'All Domains' ? `?domain=${domain}` : ''}`).then(res => res.data),
  getStats: () => axiosClient.get('/placement/stats').then(res => res.data)
};
