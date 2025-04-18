import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { leadStatsState, newLeadsListState, approvedApplicationsState } from '../state/leadState' // Import state atoms
import {FaUserPlus,FaFileAlt,FaCheckCircle,FaUsers,FaArrowUp,FaArrowDown,FaBuilding,FaUtensils,FaCapsules,FaEllipsisH,FaExternalLinkAlt,FaKey} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { allocatedViewSubTabState, leadCenterMainTabState, leadsViewSubTabState, userApprovalDashboardState } from '@/state/leadsCenterState'
import noleads from '../assets/noleads.svg'
import GenerateCredentialsModal from './layout/GenerateCredentialsModal'
import ApprovalDashboard from './ApprovalDashboard/ApprovalDashboard'
import { activeSidebarItemState } from '@/state/atom'

const cardBaseClass ='bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200'
const iconBaseClass = 'text-xl p-3 rounded-full w-11 h-11 flex justify-center items-center text-white'
const buttonBaseClass = 'py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-xs ml-2 hover:bg-gray-50 hover:border-gray-400 transition duration-150 whitespace-nowrap'
const tableCellBaseClass = 'text-left py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap'
const tableHeaderBaseClass = 'bg-gray-50 font-semibold text-gray-600 text-xs uppercase tracking-wider'

const StatCard = ({ icon, title, value, change, trend, iconBgClass, onClick }) => {
    const TrendIcon = trend === 'up' ? FaArrowUp : trend === 'down' ? FaArrowDown : null
    const trendClass = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : ''

    return (
        <div
            className={cardBaseClass}
            onClick={onClick}>
            <div className={`${iconBaseClass} ${iconBgClass}`}>{icon}</div>
            <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">{title}</span>
                <span className="text-2xl font-semibold text-gray-800">{value ?? 'N/A'}</span>
                {change !== null && change !== undefined && TrendIcon && (
                    <span className={`text-xs mt-0.5 flex items-center gap-1 ${trendClass}`}>
                        {change}% <TrendIcon size="0.7em" />
                    </span>
                )}
            </div>
        </div>
    )
}

const NewLeadRow = ({ lead }) => {
    const handleAllocate = (leadId) => {
        console.log('Allocate lead:', leadId)
        // Add logic here: API call, update state, etc.
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    const handleOpenModal = (lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLead(null);
    };
    const handleConfirmAndSendCredentials = ({ email, password }) => {
        console.log('Sending credentials for:', selectedLead.name);
        console.log('Email:', email);
        console.log('Password:', password);
        // TODO: Implement your API call or logic here to send/save credentials
        // Example: api.sendCredentials(selectedLead.id, email, password);

        // You might want to keep the modal open until the API call succeeds
        // or close it immediately as done by handleCloseModal called within the modal itself.
        // If the modal doesn't close itself on confirm, call handleCloseModal() here.
    };


    return (
     <>
        <tr>
            <td className={`${tableCellBaseClass} w-12`}>
                <span
                    className="inline-block w-9 h-9 rounded-full text-center leading-9 font-medium text-sm uppercase"
                    style={{ backgroundColor: lead.avatarBg, color: lead.avatarColor }} // Keep dynamic style for flexibility
                >
                    {lead.initials}
                </span>
            </td>
            <td className={tableCellBaseClass}>{lead.creatorName}</td>
            <td className={tableCellBaseClass}>{lead.mobile}</td>
            <td className={tableCellBaseClass}>{lead.inquiredFor}</td>
            <td className={`${tableCellBaseClass} text-right`}>
                  <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={()=> handleAllocate()}>
                     <FaExternalLinkAlt   className="mr-1.5"/> Allocate
                 </button>
                 <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={() => handleOpenModal(lead)}>
                      <FaKey  className="mr-1.5 font-extrabold "/> Generate Credentials
                 </button>
               
            </td>
        </tr>
          {selectedLead && (
            <GenerateCredentialsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                userData={{
                    name: selectedLead.creatorName,
                    phone: selectedLead.mobile,
                    service: selectedLead.inquiredFor,
                    email: selectedLead.email
                }}
                onConfirmAndSend={handleConfirmAndSendCredentials}
            />
        )}
     </>
    )
}

const ApprovedApplicationRow = ({ app }) => {
    // Determine status styling with Tailwind classes
    const statusClasses =
        app.status === 'In progress'
            ? 'text-yellow-800 bg-yellow-100'
            : app.status === 'Completed'
              ? 'text-green-800 bg-green-100'
              : 'text-gray-800 bg-gray-100'

    const handleAllocateApp = (appId) => {
        console.log('Allocate App:', appId)
        // Add allocation logic
    }
    const handleGoToDashboard = (appId) => {
        console.log('Go To Dashboard for App:', appId)
        // Add navigation logic
    }

    // Placeholder for company logo/icon based on type
    const CompanyIcon = ({ industry }) => {
        let IconComponent = FaBuilding // Default
        if (industry === 'Food') IconComponent = FaUtensils
        if (industry === 'Cosmeceutical') IconComponent = FaCapsules
        // Add more industry checks
        return (
            <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-200 text-gray-600">
                <IconComponent size="0.9em" />
            </span>
        )
        // Replace above with <img src={app.logo} ... /> if you have actual logos
    }
    const setUserApprovalDashboard = useSetRecoilState(userApprovalDashboardState)
    const setActiveItem = useSetRecoilState(activeSidebarItemState)
    const navigate = useNavigate()

    const handleViewApprovalDashboard = (app) => {
        // setActiveItem("leads")
        setUserApprovalDashboard({
            open: true,
            lead: app,
            approvedTab: true
        })
        navigate('/crm/leads')
    }


    return (
        <tr>
            <td className={tableCellBaseClass}>
                <div className="flex items-center">
                    <CompanyIcon industry={app.industry} />
                    <span>{app.companyName}</span>
                </div>
            </td>
            <td className={tableCellBaseClass}>{app.applicationNumber}</td>
            <td className={tableCellBaseClass}>{app.date}</td>
            <td className={tableCellBaseClass}>{app.industry}</td>
            <td className={tableCellBaseClass}>{app.mobile}</td>
            <td className={tableCellBaseClass}>
                <span className={`font-semibold py-1 px-2 rounded text-xs inline-block ${statusClasses}`}>{app.status}</span>
            </td>
            <td className={`${tableCellBaseClass} text-right `}>
            <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={()=> handleAllocateApp()}>
                     <FaExternalLinkAlt   className="mr-1.5"/> Allocate
                 </button>
                 <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center"   onClick={() => handleViewApprovalDashboard(app)}>
                     <FaExternalLinkAlt   className="mr-1.5"/> Go to Dashboard
                 </button>
               
            </td>
        </tr>
    )
}

// --- Main Leads Dashboard Component ---
const LeadsDashboard = ({ departmentId = null }) => {
    // Accept optional props if needed
    // Read values from Recoil state
    const stats = useRecoilValue(leadStatsState)
    const newLeads = useRecoilValue(newLeadsListState)
    const approvedApps = useRecoilValue(approvedApplicationsState) // Optional

    const navigate = useNavigate()
    const setMainTab = useSetRecoilState(leadCenterMainTabState)
    const setLeadsSubTab = useSetRecoilState(leadsViewSubTabState)
    const setAllocatedSubTab = useSetRecoilState(allocatedViewSubTabState)

    // (Data fetching logic placeholder - same as previous example)
    // useEffect(() => { ... fetch data ... }, [departmentId]);

    const handleLeadsCard = ({ mainTab, leadsSubTab, allocatedSubTab }) => {
        setMainTab(mainTab)
        setLeadsSubTab(leadsSubTab)
        setAllocatedSubTab(allocatedSubTab)
        navigate('/crm/leads')
    }


    return (
        // Main wrapper for the entire component block
        <div className="bg-blue-50  ">
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard
                    icon={<FaUserPlus />}
                    title="New leads"
                    value={stats.newLeads.count}
                    change={stats.newLeads.change}
                    trend={stats.newLeads.trend}
                    iconBgClass="bg-blue-500" // Example Tailwind color
                    onClick={() => handleLeadsCard({ mainTab: 'Leads', leadsSubTab: 'New Leads' })}
                />
                <StatCard
                    icon={<FaFileAlt />}
                    title="Applications"
                    value={stats.applications.count}
                    change={stats.applications.change}
                    trend={stats.applications.trend}
                    iconBgClass="bg-red-500" // Example Tailwind color
                    onClick={() => handleLeadsCard({ mainTab: 'Leads', leadsSubTab: 'Applications' })}
                />
                <StatCard
                    icon={<FaCheckCircle />}
                    title="Approved Applications"
                    value={stats.approved.count}
                    change={stats.approved.change}
                    trend={stats.approved.trend}
                    iconBgClass="bg-green-500" // Example Tailwind color
                    onClick={() => handleLeadsCard({ mainTab: 'Approved' })}
                />
                <StatCard
                    icon={<FaUsers />}
                    title="Allocated to Members"
                    value={stats.allocated.count}
                    onClick={() => handleLeadsCard({ mainTab: 'Allocated', allocatedSubTab: 'Leads' })}
                    iconBgClass="bg-yellow-500" // Example Tailwind color
                />
            </div>

            {/* New Leads Table Section */}
            {/* Optional: Add border and padding separate from the main wrapper if desired */}
            <div className="mt-8 border bg-white border-gray-200 rounded-lg p-5">
                <h2 className="text-xl font-semibold text-gray-700 mb-5">New leads</h2>

                <div className="overflow-x-auto">
                    {newLeads.length > 0 ? (
                        <table className="w-full border-collapse mt-4">
                            <thead>
                                <tr>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass} w-12`}></th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>Name</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>Mobile Number</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>Inquired for</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass} text-right`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newLeads.map((lead) => (
                                    <NewLeadRow
                                        key={lead.id}
                                        lead={lead}
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center w-full h-full flex flex-col py-20 justify-center items-center  text-gray-500">
                            <img
                                className="h-[100px] "
                                src={noleads}
                                alt=""
                            />
                            <h1>No Data found</h1>
                        </div>
                    )}
                </div>
            </div>

            {/* Approved Applications Table Section (Optional) */}
            <div className="mt-8 border bg-white border-gray-200 rounded-lg p-5">
                <h2 className="text-xl font-semibold text-gray-700 mb-5">Approved Applications</h2>
                <div className="overflow-x-auto">
                    {approvedApps.length > 0 ? (
                        <table className="w-full border-collapse mt-4">
                            <thead>
                                <tr>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>Company Name</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>App No.</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>Date</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>Industry</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>Mobile Number</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass}`}>Status</th>
                                    <th className={`${tableCellBaseClass} ${tableHeaderBaseClass} text-right`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedApps.map((app) => (
                                    <ApprovedApplicationRow
                                        key={app.id}
                                        app={app}
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center w-full h-full flex flex-col py-20 justify-center items-center  text-gray-500">
                            <img
                                className="h-[100px] "
                                src={noleads}
                                alt=""
                            />
                            <h1>No Data found</h1>
                        </div>
                    )}
                </div>
            </div>
        </div> // End of main wrapper
    )
}

export default LeadsDashboard
