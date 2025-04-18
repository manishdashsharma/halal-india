import React, { useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { activeSidebarItemState } from '../../state/atom'
import { rndPreAuditConfig } from '@/configs/sidebar.config'

const RNDPreAuditDashboard = () => {
    const location = useLocation()
    const setActiveItem = useSetRecoilState(activeSidebarItemState)
    const navigate = useNavigate()
    // Update activeItem when location changes
    useEffect(() => {
        if(location.state && location.state.activeMenu) {
            setActiveItem(location.state.activeMenu)
        } else {
            // Set according to current path
            const currentPath = window.location.pathname
            if (currentPath.toLowerCase() ==='/rnd-pre-audit/' || currentPath.toLowerCase() ==='/rnd-pre-audit') {
                navigate('/rnd-pre-audit/dashboard')
            }
            
            const matchingItem = rndPreAuditConfig.menuItems.find((item) => 
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
                menuItems={rndPreAuditConfig.menuItems}
                basePath={rndPreAuditConfig.basePath}
            />
            <div className="ml-[250px] max-lg:ml-0 pt-20 p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default RNDPreAuditDashboard 