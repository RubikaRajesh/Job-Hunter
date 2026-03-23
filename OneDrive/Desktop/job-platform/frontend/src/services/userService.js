import { apiCall } from './apiBase';

export const userService = {
  login,
  signup,
  logout,
  getCurrentUser,
  updateUserProfile,
  updateResume,
  saveJob,
  removeSavedJob,
  getPublicProfile,
};

async function login(data) {
  return apiCall('post', '/auth/login', data);
}

async function signup(data) {
  return apiCall('post', '/auth/register', data);
}

async function logout() {
  return apiCall('post', '/auth/logout');
}

async function getCurrentUser() {
  return apiCall('get', '/auth/me');
}

async function updateUserProfile(data) {
  return apiCall('put', '/users/profile/me', data);
}

async function updateResume(file) {
  const formData = new FormData();
  formData.append('resume', file);
  return apiCall('post', '/users/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

async function saveJob(jobId) {
  return apiCall('post', `/jobs/saved/${jobId}`);
}

async function removeSavedJob(jobId) {
  return apiCall('delete', `/jobs/saved/${jobId}`);
}

async function getPublicProfile(id) {
  return apiCall('get', `/users/profile/public/${id}`);
}