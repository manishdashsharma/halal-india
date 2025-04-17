// Create a new file: client/src/Pages/RND_pre_audit/RNDLeadCenter.jsx

import React, { useState, useEffect } from 'react'
// import { useQuery } from '@tanstack/react-query'; // Assuming react-query v4+ (@tanstack/react-query) - Keep commented for now
import { FaSearch, FaFilter, FaExternalLinkAlt, FaBuilding, FaUtensils, FaCapsules, FaUserCircle } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi' 
import noleads from '../../assets/noleads.svg' 
import { userApprovalDashboardState } from '@/state/leadsCenterState'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import ApprovalDashboard from '@/components/ApprovalDashboard/ApprovalDashboard'

const tabBaseClass = 'py-2  text-sm font-medium text-center cursor-pointer'
const tabActiveClass = 'text-teal-600 border-b-2 border-teal-600'
const tabInactiveClass = 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
const buttonBaseClass = 'py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 hover:border-gray-400 transition duration-150 whitespace-nowrap inline-flex items-center'
const tableCellBaseClass = 'text-left py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap'
const tableHeaderBaseClass = 'bg-gray-50 font-semibold text-gray-600 text-xs uppercase tracking-wider'
const paginationButtonClass = 'p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'

// --- Helper Function for Placeholder Data Fetching ---
// Simulates fetching data with pagination and search
const simulateFetch = (allData, page, searchTerm, itemsPerPage = 9) => {
    // Simple filtering based on searchTerm (case-insensitive)
    const filteredData = searchTerm
        ? allData.filter((app) => Object.values(app).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())))
        : allData

    // Simple pagination
    const totalItems = filteredData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (page - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    return {
        data: paginatedData,
        pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
            itemsPerPage: itemsPerPage
        }
    }
}

// --- Placeholder API function for Approved Applications (Leads Tab) ---
const fetchApprovedApplications = async ({ queryKey }) => {
     
    const [_key, { page, searchTerm }] = queryKey
    console.log(`Fetching Approved page: ${page}, search: ${searchTerm}`)
    await new Promise((resolve) => setTimeout(resolve, 100)) // Short delay simulation

    // Placeholder data for Approved Applications
    const allApprovedData = [
        {
            id: 1,
            logo: null,
            companyName: 'Savorybites ',
            applicationNumber: 'L01234',
            date: '24/01/24',
            industry: 'Fitness',
            mobile: '+966563912928',
            status: 'Safe'
        },
        {
            id: 2,
            logo: 'https://via.placeholder.com/32/FFA500/FFFFFF?text=BA',
            companyName: 'Bab assalam ',
            applicationNumber: 'L01235',
            date: '24/01/24',
            industry: 'Food',
            mobile: '+966563912928',
            status: 'Doubtful'
        },
        {
            id: 3,
            logo: 'https://via.placeholder.com/32/FF0000/FFFFFF?text=4',
            companyName: 'Fourr ',
            applicationNumber: 'L01236',
            date: '24/01/24',
            industry: 'Cosmeceutical',
            mobile: '+966563912928',
            status: 'Critical'
        },
        {
            id: 4,
            logo: 'https://via.placeholder.com/32/0000FF/FFFFFF?text=RD',
            companyName: 'Restaurant Depot ',
            applicationNumber: 'L01237',
            date: '24/01/24',
            industry: 'Cosmeceutical',
            mobile: '+966558441499',
            status: 'Safe'
        },
        {
            id: 5,
            logo: 'https://via.placeholder.com/32/008000/FFFFFF?text=F52',
            companyName: 'Food 52 ',
            applicationNumber: 'L01238',
            date: '24/01/24',
            industry: 'Non Food',
            mobile: '+966558441500',
            status: 'Safe'
        }
        // // Add more to test pagination
        // { id: 10, logo: null, companyName: 'Test Lead 10', applicationNumber: 'L11111', date: '25/01/24', industry: 'Food', mobile: '+966111111110', status: 'Safe' },
        // { id: 11, logo: null, companyName: 'Test Lead 11', applicationNumber: 'L11112', date: '25/01/24', industry: 'Fitness', mobile: '+966111111111', status: 'Doubtful' },
    ]

    return simulateFetch(allApprovedData, page, searchTerm)
}

// --- Placeholder API function for Allocated Applications (Allocated Tab) ---
const fetchAllocatedApplications = async ({ queryKey }) => {
     
    const [_key, { page, searchTerm }] = queryKey
    console.log(`Fetching Allocated page: ${page}, search: ${searchTerm}`)
    await new Promise((resolve) => setTimeout(resolve, 100)) // Short delay simulation

    // Placeholder data for Allocated Applications
    const allAllocatedData = [
        {
            id: 201,
            logo: 'https://via.placeholder.com/32/0000FF/FFFFFF?text=RD',
            companyName: 'Restaurant Depot  ',
            applicationNumber: 'A01237',
            date: '25/01/24',
            industry: 'Cosmeceutical',
            mobile: '+966558441499',
            status: 'Safe',
            allocatedTo: 'Member A'
        },
        {
            id: 202,
            logo: null,
            companyName: 'Savorybites  ',
            applicationNumber: 'A01234',
            date: '26/01/24',
            industry: 'Fitness',
            mobile: '+966563912928',
            status: 'Safe',
            allocatedTo: 'Member B'
        },
        {
            id: 203,
            logo: 'https://via.placeholder.com/32/FFA500/FFFFFF?text=BA',
            companyName: 'Bab assalam  ',
            applicationNumber: 'A01235',
            date: '27/01/24',
            industry: 'Food',
            mobile: '+966563912928',
            status: 'Doubtful',
            allocatedTo: 'Member A'
        }
        // Add more allocated data...
    ]

    // Example: Return empty data if search term is "empty"
    if (searchTerm === 'empty') {
        return { data: [], pagination: { currentPage: 1, totalPages: 0, totalItems: 0, itemsPerPage: 9 } }
    }

    return simulateFetch(allAllocatedData, page, searchTerm)
}

// --- Reusable Application Row ---
// Slightly modified to potentially handle different actions or data later
const ApplicationRow = ({ app, actions }) => {
    const statusClasses =
        app.status === 'Safe'
            ? 'text-green-600 font-semibold'
            : app.status === 'Doubtful'
              ? 'text-yellow-600 font-semibold'
              : app.status === 'Critical'
                ? 'text-red-600 font-semibold'
                : 'text-gray-700'

    const setUserApprovalDashboard = useSetRecoilState(userApprovalDashboardState)

    const handleAllocateApp = (appId) => console.log('Allocate App:', appId)
    const handleGoToDashboard = (appId) => {
        setUserApprovalDashboard({
            open: true,
            lead: appId,
            approvedTab: true
        })
    }
    // Add more handlers if needed for allocated tab actions

    const CompanyIcon = ({ industry, logo }) => {
        if (logo) {
            return (
                <img
                    src={logo}
                    alt=""
                    className="w-8 h-8 mr-3 rounded-full object-cover"
                />
            )
        }
        let IconComponent = FaBuilding
        if (industry === 'Food') IconComponent = FaUtensils
        if (industry === 'Cosmeceutical') IconComponent = FaCapsules
        return (
            <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-200 text-gray-600">
                <IconComponent size="0.9em" />
            </span>
        )
    }

    return (
        <tr>
            <td className={tableCellBaseClass}>
                <div className="flex items-center">
                    <CompanyIcon
                        industry={app.industry}
                        logo={app.logo}
                    />
                    <span className="font-medium text-gray-800">{app.companyName}</span>
                </div>
            </td>
            <td className={tableCellBaseClass}>{app.applicationNumber}</td>
            <td className={tableCellBaseClass}>{app.date}</td>
            <td className={tableCellBaseClass}>{app.industry}</td>
            <td className={tableCellBaseClass}>{app.mobile}</td>
            <td className={tableCellBaseClass}>
                <span className={statusClasses}>{app.status}</span>
            </td>
            <td className={`${tableCellBaseClass} text-right`}>
                {/* Render default actions or specific actions passed via props */}
                {actions ? (
                    actions(app)
                ) : (
                    <>
                        <button
                            className={buttonBaseClass}
                            onClick={() => handleAllocateApp(app.id)}>
                            <FaExternalLinkAlt className="mr-1.5 h-3 w-3" /> Allocate
                        </button>
                        <button
                            className={buttonBaseClass}
                            onClick={() => handleGoToDashboard(app.id)}>
                            <FaExternalLinkAlt className="mr-1.5 h-3 w-3" /> Go to dashboard
                        </button>
                    </>
                )}
            </td>
        </tr>
    )
}

// --- Tab Content Component (Generic Structure) ---
const TabContent = ({ title, fetchDataFunction, queryKeyPrefix, noDataMessage }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterActive, setFilterActive] = useState(false) // Placeholder
    const [queryResult, setQueryResult] = useState({ data: [], pagination: null }) // State to hold fetched data
    const [isLoading, setIsLoading] = useState(false) // Simple loading state

    // Fetch data using the provided function when page or search term changes
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const result = await fetchDataFunction({
                    queryKey: [queryKeyPrefix, { page: currentPage, searchTerm }]
                })
                setQueryResult(result)
            } catch (err) {
                console.error('Error fetching data:', err)
                setQueryResult({ data: [], pagination: null }) // Reset on error
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [currentPage, searchTerm, fetchDataFunction, queryKeyPrefix])

    const applications = queryResult?.data ?? []
    const pagination = queryResult?.pagination

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1) // Reset to page 1 on new search
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= (pagination?.totalPages ?? 1)) {
            setCurrentPage(newPage)
        }
    }

    const handleFilterClick = () => {
        setFilterActive(!filterActive)
        // TODO: Implement actual filtering logic/UI popup
        console.log('Filter button clicked. Active:', !filterActive)
    }

    return (
        <div className="mt-8  bg-white  rounded-lg ">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <div className="flex items-center">
                    {/* Search Bar */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400 h-4 w-4" />
                        </span>
                        <input
                            type="text"
                            placeholder={`Search ${title.toLowerCase()}`}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 w-64"
                        />
                    </div>
                    {/* Filter Button */}
                    <button
                        onClick={handleFilterClick}
                        className={`${buttonBaseClass} ml-3 ${filterActive ? 'bg-blue-100 border-blue-300' : ''}`}
                        aria-label={`Filter ${title.toLowerCase()}`}>
                        <FaFilter className={`h-4 w-4 ${filterActive ? 'text-blue-600' : 'text-gray-600'}`} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-[300px]">
                {' '}
                {/* Added min-height */}
                {isLoading ? (
                    <div className="text-center py-10 text-gray-500">
                        <FaUserCircle className="animate-spin inline-block mr-2 text-xl" /> Loading data...
                    </div>
                ) : applications.length > 0 ? (
                    <>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className={tableHeaderBaseClass}>
                                    {/* Headers match the image */}
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
                                {applications.map((app) => (
                                    // Pass specific actions if needed for allocated tab later
                                    <ApplicationRow
                                        key={app.id}
                                        app={app}
                                    />
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-end items-center mt-6 space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`${paginationButtonClass} text-gray-600`}
                                    aria-label="Previous page">
                                    <FiChevronLeft size={20} />
                                </button>
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`${paginationButtonClass} px-4 ${
                                            currentPage === pageNumber
                                                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                                : 'text-gray-700 bg-white hover:bg-gray-100'
                                        }`}>
                                        {pageNumber}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === pagination.totalPages}
                                    className={`${paginationButtonClass} text-gray-600`}
                                    aria-label="Next page">
                                    <FiChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center w-full h-full flex flex-col py-20 justify-center items-center text-gray-500">
                        <img
                            className="h-[100px] mb-4" // Added margin bottom
                            src={noleads} // Use the imported image
                            alt="No data found"
                        />
                        <h1 className="text-lg">{noDataMessage}</h1>
                        {searchTerm && <p className="text-sm mt-2">Try adjusting your search or filter.</p>}
                    </div>
                )}
            </div>
        </div>
    )
}

// --- Main RND Lead Center Component ---
const RNDLeadCenter = () => {
    const [activeTab, setActiveTab] = useState('Leads') // Default to 'Leads'

    const { open, lead } = useRecoilValue(userApprovalDashboardState)

    if (open) {
        return (
            <div className=" ">
                <ApprovalDashboard lead={lead} />
            </div>
        )
    }

    return (
        <div className="p-6 rounded-lg shadow-sm bg-white min-h-auto">
            {' '}
            {/* Added basic page padding and background */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">Lead Center</h1>
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
                <nav
                    className="-mb-px flex space-x-6"
                    aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('Leads')}
                        className={`${tabBaseClass} ${activeTab === 'Leads' ? tabActiveClass : tabInactiveClass} `}>
                        Leads
                    </button>
                    <button
                        onClick={() => setActiveTab('Allocated')}
                        className={`${tabBaseClass} ${activeTab === 'Allocated' ? tabActiveClass : tabInactiveClass} `}>
                        Allocated
                    </button>
                </nav>
            </div>
            {/* Tab Content */}
            <div>
                {activeTab === 'Leads' && (
                    <TabContent
                        title="Approved Applications"
                        fetchDataFunction={fetchApprovedApplications}
                        queryKeyPrefix="approvedApplications"
                        noDataMessage="No Approved Applications found"
                    />
                )}
                {activeTab === 'Allocated' && (
                    <TabContent
                        title="Allocated Applications"
                        fetchDataFunction={fetchAllocatedApplications}
                        queryKeyPrefix="allocatedApplications"
                        noDataMessage="No Allocated Applications found"
                    />
                )}
            </div>
        </div>
    )
}

export default RNDLeadCenter
