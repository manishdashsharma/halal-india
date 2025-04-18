import React, { useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { activeSidebarItemState } from '../../state/atom'
import { crmConfig } from '../../configs/sidebar.Config'
import { userApprovalDashboardState } from '@/state/leadsCenterState'
import ApprovalDashboard from '@/components/ApprovalDashboard/ApprovalDashboard'

const CRMDashboard = () => {
    const location = useLocation()
    const setActiveItem = useSetRecoilState(activeSidebarItemState)
    const navigate = useNavigate()
    // Update activeItem when location changes
    useEffect(() => {
        if (location.state && location.state.activeMenu) {
            setActiveItem(location.state.activeMenu)
        } else {
            // Set according to current path
            const currentPath = window.location.pathname
            
            if (currentPath.toLowerCase() ==='/crm' || currentPath.toLowerCase() ==='/crm/' ) {
                navigate('/crm/dashboard')
            }

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