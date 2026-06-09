import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';

// Citizen Pages
import CitizenDashboard from './pages/citizen/Dashboard';
import ReportIssue from './pages/citizen/ReportIssue';
import TrackComplaints from './pages/citizen/TrackComplaints';
import Emergency from './pages/citizen/Emergency';

// Municipal Pages
import AIDetection from './pages/municipal/AIDetection';
import AssetDashboard from './pages/municipal/AssetDashboard';
import AssetDetails from './pages/municipal/AssetDetails';
import IncidentCenter from './pages/municipal/IncidentCenter';
import IncidentDetails from './pages/municipal/IncidentDetails';
import FloodSafety from './pages/municipal/FloodSafety';
import ResourceDeployment from './pages/municipal/ResourceDeployment';
import ServiceNowIntegration from './pages/municipal/ServiceNowIntegration';
import DigitalTwin from './pages/municipal/DigitalTwin';

// Event Pages
import EventDashboard from './pages/event/EventDashboard';
import CrowdMonitoring from './pages/event/CrowdMonitoring';
import VolunteerManagement from './pages/event/VolunteerManagement';
import LostAndFound from './pages/event/LostAndFound';

// Analytics & Admin Pages
import Analytics from './pages/Analytics';
import AdminPanel from './pages/admin/AdminPanel';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

// Smart dashboard switcher
function DashboardSwitcher() {
  const { user } = useAuth();
  if (user?.role === 'staff') {
    return <Navigate to="/incidents" replace />;
  }
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return <CitizenDashboard />;
}

export default function App() {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Command Center Layout Pages */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboards */}
        <Route path="/dashboard" element={<DashboardSwitcher />} />
        <Route path="/citizen/dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/municipal/incidents" element={<Navigate to="/incidents" replace />} />

        {/* Citizen Portal */}
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/complaints" element={<TrackComplaints />} />
        <Route path="/emergency" element={<Emergency />} />

        {/* Municipal Operations */}
        <Route path="/ai-detection" element={<AIDetection />} />
        <Route path="/assets" element={<AssetDashboard />} />
        <Route path="/assets/:id" element={<AssetDetails />} />
        <Route path="/incidents" element={<IncidentCenter />} />
        <Route path="/incidents/:id" element={<IncidentDetails />} />
        <Route path="/flood-safety" element={<FloodSafety />} />
        <Route path="/resources" element={<ResourceDeployment />} />
        <Route path="/servicenow" element={<ServiceNowIntegration />} />
        <Route path="/digital-twin" element={<DigitalTwin />} />

        {/* Pushkaralu Event Management */}
        <Route path="/events" element={<EventDashboard />} />
        <Route path="/crowd-monitor" element={<CrowdMonitoring />} />
        <Route path="/volunteers" element={<VolunteerManagement />} />
        <Route path="/lost-found" element={<LostAndFound />} />

        {/* Analytics & System Admins */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      {/* Fallback to Landings */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
