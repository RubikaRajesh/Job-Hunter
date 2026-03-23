import { apiCall } from './apiBase';

export const companyService = {
  postNewJob,
  getAllJobListings,
  // ... others as needed
};

async function postNewJob(data) {
  return apiCall('post', '/jobs', data);
}

async function getAllJobListings() {
  // Assuming we want jobs posted by the logged-in employer
  return apiCall('get', '/jobs?employer=me'); // we need to implement this filter on backend
}

// Add other functions only if backend supports them