import React, { useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { activeSidebarItemState } from '../../state/atom'
import { crmConfig } from '../../configs/sidebar.Config'

const CRMDashboard = () => {
    const location = useLocation()
    const setActiveItem = useSetRecoilState(activeSidebarItemState)

    // Update activeItem when location changes
    useEffect(() => {
        if (location.state && location.state.activeMenu) {
            setActiveItem(location.state.activeMenu)
        } else {
            // Set according to current path
            const currentPath = window.location.pathname
            const matchingItem = crmConfig.menuItems.find((item) => 
                currentPath.endsWith(item.path)
            )
            if (matchingItem) {
                setActiveItem(matchingItem.path)
            } else {
                // Default to dashboard if no match
                setActiveItem('/dashboard')
            }
        }
    }, [location, setActiveItem])

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <Sidebar 
                menuItems={crmConfig.menuItems}
                basePath={crmConfig.basePath}
            />
            <div className="ml-[250px] max-lg:ml-0 pt-20 p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default CRMDashboard 