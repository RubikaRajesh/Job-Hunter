import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar'; // adjust path if needed
import Home from './Pages/Home';
import JobListing from './Pages/JobListing';
import JobDetails from './Pages/JobDetails';
import CompaniesPage from './Pages/CompaniesPage';
import LoginSignUp from './Pages/LoginSignUp';
import UserProfile from './Pages/UserProfile';
import UserPublicProfile from './Pages/UserPublicProfile';
import SavedJobs from './Pages/SavedJobs';
import CompanyDashboard from './Pages/CompanyDashboard';
import JobPosting from './Pages/JobPosting';
import ApplicantInformation from './Pages/ApplicantInformation';
import UserOnboarding from './Pages/UserOnboarding';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userData } = useSelector((state) => state.auth);
  if (!userData) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(userData.role)) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Navbar appears on every page */}
      <div className="pt-16">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobListing />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/signup" element={<LoginSignUp />} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<UserPublicProfile />} />
        <Route path="/saved-jobs" element={<ProtectedRoute allowedRoles={['seeker']}><SavedJobs /></ProtectedRoute>} />
        <Route path="/dashboard/*" element={<ProtectedRoute allowedRoles={['employer']}><CompanyDashboard /></ProtectedRoute>} />
        <Route path="/post-job" element={<ProtectedRoute allowedRoles={['employer']}><JobPosting /></ProtectedRoute>} />
        <Route path="/applicant-info" element={<ProtectedRoute allowedRoles={['employer']}><ApplicantInformation /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><UserOnboarding /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;