import { FiHome, FiFile } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { BiMessageSquareDots } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdDashboard, } from 'react-icons/md';

// Client Portal Sidebar Configuration
export const clientPortalConfig = {
  basePath: '/Client-Portal',
  menuItems: [
    { icon: <FiHome />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaRegUser />, label: 'Profile', path: '/profile' },
    { icon: <IoNotificationsOutline />, label: 'Notification', path: '/notification' },
    { icon: <BiMessageSquareDots />, label: 'Inbox', path: '/inbox' },
    { icon: <FiFile />, label: 'Certification', path: '/certification' }
  ]
};

// CRM Sidebar Configuration
export const crmConfig = {
  basePath: '/crm',
  menuItems: [
    { icon: <MdDashboard />, label: 'Dashboard', path: '/dashboard' },
    { icon: <IoNotificationsOutline />, label: 'Notification', path: '/notification' },
    { icon: <BiMessageSquareDots />, label: 'Inbox', path: '/inbox' },
    { icon: <FiFile />, label: 'Leads', path: '/leads' , action:'crmLeadPage' },

  ]
};

