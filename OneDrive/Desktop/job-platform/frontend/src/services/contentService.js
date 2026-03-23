import { apiCall } from './apiBase';

export const contentService = {
  getJobs,
  getSingleJob,
  getCompanies,
  getSavedJobs,
};

async function getJobs(filters) {
  // Convert filters to query params
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.location) params.append('location', filters.location);
  // ... add other filters as needed
  return apiCall('get', '/jobs', { params });
}

async function getSingleJob(id) {
  return apiCall('get', `/jobs/${id}`);
}

async function getCompanies() {
  return apiCall('get', '/companies');
}

async function getSavedJobs() {
  return apiCall('get', '/jobs/saved/me');
}