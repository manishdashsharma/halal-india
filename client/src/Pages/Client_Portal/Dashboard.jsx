import React, { useState, useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { FaRegUser } from 'react-icons/fa'
import { FiFile } from 'react-icons/fi'
import { BiMessageSquareDots } from 'react-icons/bi'
import { IoNotificationsOutline } from 'react-icons/io5'
import { motion } from 'motion/react'


const Dashboard = () => {
    
    const AnimatedLink = motion(Link)
 
    const [activeItem, setActiveItem] = useState('/dashboard')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()

    // Update activeItem when location state changes
    useEffect(() => {
        if (location.state && location.state.activeMenu) {
            setActiveItem(location.state.activeMenu)
        } else {
            // Set according to current path
            const currentPath = window.location.pathname
            const matchingItem = menuItems.find((item) => currentPath.includes(item.path))
            if (matchingItem) {
                setActiveItem(matchingItem.path)
            }
        }
    }, [location])

    const menuItems = [
        { icon: <FiHome />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FaRegUser />, label: 'Profile', path: '/profile' },
        { icon: <IoNotificationsOutline />, label: 'Notification', path: '/notification' },
        { icon: <BiMessageSquareDots />, label: 'Inbox', path: '/inbox' },
        { icon: <FiFile />, label: 'Certification', path: '/certification' }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onMenuToggle={(isOpen) => setIsMobileMenuOpen(isOpen)} />
            <div
                className={`fixed z-49 left-0 top-0 h-screen w-[250px] bg-white border-r border-gray-200 pt-20 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'max-lg:translate-x-[-100%]'}`}>
                <div className="flex flex-col p-4 text-neutral4">
                    {menuItems.map((item, index) => (
                        <AnimatedLink
                            whileTap={{scale:0.95 }}                            
                            key={index}
                            to={`/Client-Portal${item.path}`}
                            onClick={() => setActiveItem(item.path)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-md mb-1 ${window.location.pathname.includes(item.path) ? 'bg-custom-primary text-white' : ' hover:bg-gray-50'}`}>
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </AnimatedLink>
                    ))}
                </div>
            </div>

            <div className="ml-[250px]  max-lg:ml-0 pt-20 p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard

