import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Client_Portal/Dashboard';
import CRMDashboard from './Pages/CRM/Dashboard';
import Profile from './Pages/Client_Portal/DashboardPages/Profile';
import DashboardHome from './Pages/Client_Portal/DashboardPages/DashboardHomepage';
import Certification from './Pages/Client_Portal/DashboardPages/Certification';
import LeadsDashboard from './components/LeadsDashboard';
import LeadCenter from './components/leads_Center/LeadsCenter';

// CRM Pages (placeholder components)
const CRMHome = () => <div>CRM Dashboard</div>;
const Leads = () => <div>Leads Management</div>;


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Client Portal Routes */}
      <Route path="Client-Portal" element={<Dashboard />}>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notification" element={<div>Notifications</div>} />
        <Route path="inbox" element={<div>Inbox</div>} />
        <Route path="certification" element={<Certification />} />
      </Route>
      
      {/* CRM Routes */}
      <Route path="crm" element={<CRMDashboard />}>
        <Route path="dashboard" element={<LeadsDashboard departmentId={1} />} />
        <Route path="notification" element={<div>Notifications</div>} />
        <Route path="inbox" element={<div>Inbox</div>} />
        <Route path="leads" element={<LeadCenter/>}/>
       
      </Route>
    </Routes>
  );
};

export default App;