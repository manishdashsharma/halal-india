import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Client_Portal/Dashboard';
import Profile from './Pages/Client_Portal/DashboardPages/Profile';
import DashboardHome from './Pages/Client_Portal/DashboardPages/DashboardHomepage';
import Certification from './Pages/Client_Portal/DashboardPages/Certification';

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Client-Portal" element={<Dashboard />} >
        <Route path='dashboard' element={<DashboardHome/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='notification' element={''}/>
        <Route path='inbox' element={''}/>
        <Route path='certification' element={<Certification/>}/>
      </Route>

    </Routes>
  );
};

export default App;