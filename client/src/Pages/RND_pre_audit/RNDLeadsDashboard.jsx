import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// TODO: Potentially use RND-specific state atoms later
import { approvedApplicationsState, leadStatsState } from '@/state/leadState';
import { FaCheckCircle, FaUsers, FaFileAlt, FaArrowUp, FaArrowDown, FaBuilding, FaUtensils, FaCapsules, FaExternalLinkAlt, FaPencilAlt, FaArrowRight } from 'react-icons/fa'; // Added FaPencilAlt, FaArrowRight for new icons
import { useNavigate } from 'react-router-dom';
// TODO: Potentially use RND-specific navigation state later
import { allocatedViewSubTabState, leadCenterMainTabState, leadsViewSubTabState } from '@/state/leadsCenterState';
import noleads from '../../assets/noleads.svg'; // Adjusted path relative to Pages/RND_pre_audit

// --- Styling Constants (Copied from LeadsDashboard) ---
const cardBaseClass = 'bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200';
const iconBaseClass = 'text-xl p-3 rounded-full w-11 h-11 flex justify-center items-center text-white';
const buttonBaseClass = 'py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 hover:border-gray-400 transition duration-150 whitespace-nowrap inline-flex items-center'; // Added inline-flex
const tableCellBaseClass = 'text-left py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap';
const tableHeaderBaseClass = 'bg-gray-50 font-semibold text-gray-600 text-xs uppercase tracking-wider';

// --- StatCard Component (Copied and simplified) ---
const StatCard = ({ icon, title, value, change, trend, iconBgClass, onClick }) => {
    const TrendIcon = trend === 'up' ? FaArrowUp : trend === 'down' ? FaArrowDown : null;
    const trendClass = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : '';

    return (
        <div
            className={`${cardBaseClass} ${onClick ? 'cursor-pointer' : ''}`} // Add cursor pointer only if onClick is provided
            onClick={onClick}
        >
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
    );
};

// --- ApprovedApplicationRow Component (Modified for RND) ---
const ApprovedApplicationRow = ({ app, index }) => {
    // Status styling based on image (text color)
    const statusClasses =
        app.status === 'Safe'
            ? 'text-green-600 font-semibold'
            : app.status === 'Doubtful'
              ? 'text-yellow-600 font-semibold'
              : app.status === 'Critical'
                ? 'text-red-600 font-semibold'
                : 'text-gray-700'; // Default fallback

    const handleAllocateApp = (appId) => {
        console.log('Allocate App:', appId);
        // TODO: Add RND-specific allocation logic
    };
    const handleGoToDashboard = (appId) => {
        console.log('Go To RND Dashboard for App:', appId);
        // TODO: Add RND-specific navigation logic
    };

    // Company Logo/Icon - Placeholder or use actual logo if available
    const CompanyIcon = ({ industry, logo }) => {
        if (logo) {
            return <img src={logo} alt="" className="w-8 h-8 mr-3 rounded-full object-cover" />;
        }
        // Fallback icon based on industry
        let IconComponent = FaBuilding; // Default
        if (industry === 'Food') IconComponent = FaUtensils;
        if (industry === 'Cosmeceutical') IconComponent = FaCapsules;
        // TODO: Add more industry checks if needed
        return (
            <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-200 text-gray-600">
                <IconComponent size="0.9em" />
            </span>
        );
    };

    return (
        <tr>
            {/* Added '#' column */}
            <td className={tableCellBaseClass}>
                <div className="flex items-center">
                    {/* TODO: Pass actual logo URL via app.logo if available */}
                    <CompanyIcon industry={app.industry} logo={app.logo} />
                    <span className="font-medium text-gray-800">{app.companyName}</span>
                </div>
            </td>
            <td className={tableCellBaseClass}>{app.applicationNumber}</td>
            <td className={tableCellBaseClass}>{app.date}</td>
            <td className={tableCellBaseClass}>{app.industry}</td>
            <td className={tableCellBaseClass}>{app.mobile}</td>
            <td className={tableCellBaseClass}>
                <span className={`${statusClasses}`}>{app.status}</span>
            </td>
            <td className={`${tableCellBaseClass} text-right `}>
                {/* Updated buttons with icons from image */}
                <button className={buttonBaseClass} onClick={() => handleAllocateApp(app.id)}>
                    <FaExternalLinkAlt className="mr-1.5 h-3 w-3" /> Allocate
                </button>
                <button className={buttonBaseClass} onClick={() => handleGoToDashboard(app.id)}>
                    <FaExternalLinkAlt className="mr-1.5 h-3 w-3" /> Go to dashboard
                </button>
            </td>
        </tr>
    );
};

// --- Main RND Leads Dashboard Component ---
const RNDLeadsDashboard = () => {
    // TODO: Replace with RND-specific state fetching/logic
    const stats = useRecoilValue(leadStatsState); // Placeholder using leadStatsState
    // Mock or fetch RND-specific approved apps
    // Using approvedApplicationsState as a placeholder
    const approvedApps = useRecoilValue(approvedApplicationsState);

    // TODO: Update stats data structure or fetch RND specific stats
    const rndStats = {
        // Using placeholder values based on the image
        approved: { count: 72, change: 23, trend: 'up' },
        allocated: { count: 32 },
        assignedFinance: { count: 88 }, // New stat based on image
    };


    // TODO: Implement navigation or remove if not needed for RND dashboard cards
    // const navigate = useNavigate();
    // const setMainTab = useSetRecoilState(leadCenterMainTabState);
    // const setLeadsSubTab = useSetRecoilState(leadsViewSubTabState);
    // const setAllocatedSubTab = useSetRecoilState(allocatedViewSubTabState);
    // const handleLeadsCard = ({ mainTab, leadsSubTab, allocatedSubTab }) => { ... };

    // Placeholder data (replace with actual data fetched for RND)
    const placeholderApprovedApps = [
        { id: 1, logo: null, companyName: 'Savorybites', applicationNumber: '01234', date: '24/01/24', industry: 'Fitness', mobile: '+966563912928', status: 'Doubtful' },
        { id: 2, logo: 'https://via.placeholder.com/32/FFA500/FFFFFF?text=BA', companyName: 'Bab assalam', applicationNumber: '01234', date: '24/01/24', industry: 'Food', mobile: '+966563912928', status: 'Doubtful' },
        { id: 3, logo: 'https://via.placeholder.com/32/FF0000/FFFFFF?text=4', companyName: 'Fourr', applicationNumber: '01234', date: '24/01/24', industry: 'Cosmeceutical', mobile: '+966563912928', status: 'Critical' },
        { id: 4, logo: 'https://via.placeholder.com/32/0000FF/FFFFFF?text=RD', companyName: 'Restaurant Depot', applicationNumber: '01234', date: '24/01/24', industry: 'Cosmeceutical', mobile: '+966558441499', status: 'Safe' },
        { id: 5, logo: 'https://via.placeholder.com/32/0000FF/FFFFFF?text=RD', companyName: 'Restaurant Depot', applicationNumber: '01234', date: '24/01/24', industry: 'Cosmeceutical', mobile: '+966558441499', status: 'Safe' },
        { id: 6, logo: 'https://via.placeholder.com/32/808080/FFFFFF?text=F52', companyName: 'Food 52', applicationNumber: '01234', date: '24/01/24', industry: 'Non Food', mobile: '+966558441500', status: 'Safe' },
         // ... add more mock data based on the image if needed
        ];


    // Use placeholder data for now
    const displayApps = placeholderApprovedApps; // Replace with 'approvedApps' when real data is available

    return (
        // Main wrapper for the entire component block
        <div className=" "> {/* Adjusted background and padding */}
            {/* Stats Section - Modified for RND */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"> {/* Adjusted grid to 3 columns */}
                <StatCard
                    icon={<FaCheckCircle />} // Assuming this icon for Approved Applications
                    title="Approved Applications (Leads)"
                    value={rndStats.approved.count}
                    change={rndStats.approved.change}
                    trend={rndStats.approved.trend}
                    iconBgClass="bg-green-500"
                    // onClick={() => handleLeadsCard(...)} // Add RND-specific onClick if needed
                />
                <StatCard
                    icon={<FaUsers />} // Assuming this icon for Allocated to Members
                    title="Allocated to Members"
                    value={rndStats.allocated.count}
                    iconBgClass="bg-yellow-500"
                     // onClick={() => handleLeadsCard(...)} // Add RND-specific onClick if needed
                />
                <StatCard
                    icon={<FaFileAlt />} // Assuming this icon for Assigned to Finance
                    title="Assigned to Finance"
                    value={rndStats.assignedFinance.count}
                    iconBgClass="bg-purple-500" // Example color for Finance card
                     // onClick={() => handleLeadsCard(...)} // Add RND-specific onClick if needed
                />
            </div>

            {/* Approved Applications Table Section (Only this table is kept) */}
            <div className="mt-8 border bg-white border-gray-200 rounded-lg p-5 shadow-sm"> {/* Added shadow */}
                <h2 className="text-lg font-semibold text-gray-800 mb-5">Approved Applications</h2> {/* Adjusted heading style */}
                <div className="overflow-x-auto">
                    {displayApps.length > 0 ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className={tableHeaderBaseClass}>
                                     {/* Added '#' header */}
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
                                {displayApps.map((app, index) => (
                                    <ApprovedApplicationRow
                                        key={app.id}
                                        app={app}
                                        index={index} // Pass index for '#' column
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center w-full h-full flex flex-col py-20 justify-center items-center text-gray-500">
                            <img
                                className="h-[100px] "
                                src={noleads}
                                alt="No data found"
                            />
                            <h1 className="mt-4 text-lg">No Approved Applications found</h1> {/* Adjusted message */}
                        </div>
                    )}
                </div>
            </div>
        </div> // End of main wrapper
    );
};

export default RNDLeadsDashboard;

