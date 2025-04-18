import React, { useState } from 'react'
import AgreementsAndNDAs from './AgreementsAndNDAs/AgreementsAndNDAs' // Corrected import path
import HalalCertificationApplicationForm from './HalalCertificateApplicationForm/HalalCertificateApplicationForm'
import ServiceListing from './ServiceListing/ServiceListing' // Import the new component
import { RiResetLeftFill } from 'react-icons/ri';
import { BiMessageSquareDots } from 'react-icons/bi';
import {motion} from 'motion/react'


// Import other tab components when created
// import ServiceListing from './ServiceListing';
// No CSS import needed for Tailwind if configured globally

function ApprovalDashboard({ lead }) {
    const [activeTab, setActiveTab] = useState('agreements') // 'agreements', 'form', 'listing'

    // Use lead prop data or provide fallbacks
    const companyData = {
        logo: lead?.companyProfile || 'https://via.placeholder.com/80', // Use optional chaining and fallback
        name: lead?.companyName || 'SavoryBites',
        website: 'https://Savorybites.com', // Assuming this is static or comes from elsewhere
        manager: lead?.creatorName || 'Atif Khan',
        mobile: lead?.mobile || '9876543210'
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'agreements':
                // Pass necessary props, e.g., functions to handle Next/Back if logic resides here
                return <AgreementsAndNDAs onNext={() => setActiveTab('form')} />
            case 'form':
                // return <HalalCertificationForm />; // Uncomment when created
                // Pass onNext to navigate to listing, onBack to navigate to agreements
                return (
                    <HalalCertificationApplicationForm
                        lead={lead}
                        onBack={() => setActiveTab('agreements')}
                    />
                )

            case 'listing':
                // Render ServiceListing and pass the handler functions
                return <ServiceListing onBack={() => setActiveTab('form')} />
            default:
                return <AgreementsAndNDAs onNext={() => setActiveTab('form')} />
        }
    }

    return (
        <div className=" min-h-screen">
           
            <h2 className="text-xl font-semibold text-gray-800 mb-5">Company Detail</h2>
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              
                <div className="flex items-center gap-6 space-x-5">
                   
                    <img
                        src={companyData.logo}
                        alt={`${companyData.name} logo`}
                        className="w-22 h-22 rounded-full border border-gray-200 object-cover"
                    />
                    <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{companyData.name}</h3>
                        <a
                            href={companyData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm">
                            {companyData.website}
                        </a>
                    </div>
                    <div>
                        <span className="text-gray-500 block text-xs mb-0.5">Manager</span> 
                        <span className="font-medium text-gray-800">{companyData.manager}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block text-xs mb-0.5">Mobile Number</span> 
                        <span className="font-medium text-gray-800">{companyData.mobile}</span>
                    </div>
                </div>
                <div className="flex flex-col space-y-2  gap-5 items-end   mt-1">
                    
                    <button className="text-xs text-red-600 hover:text-red-700 flex items-center font-medium">
                       <RiResetLeftFill  className='mr-2 '/>
                        Reset Credential
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs flex items-center shadow-sm border border-gray-200 font-medium">
                      
                       <BiMessageSquareDots className='mr-2'/>
                        Message
                    </button>
                </div>
            </div>
            {/* Tabs Section - Styling adjusted */}
            <div className="bg-white p-5 rounded-lg shadow">
                <div className="border-b  border-gray-200 mb-6">
                    {' '}
                    {/* Container with bottom border */}
                    <nav
                        className="-mb-px flex space-x-8"
                        aria-label="Tabs">
                        {' '}
                        {/* Flex container for tabs, negative margin for border overlap */}
                        {/* Tab Button 1: Agreements & NDAs */}
                        <motion.button
                             whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className={`whitespace-nowrap pb-3 pt-1 px-1 border-b-2 font-medium text-sm  ${
                                // Base styles: padding, border, font
                                activeTab === 'agreements'
                                    ? 'border-blue-500 text-blue-600' // Active styles: blue border and text
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' // Inactive styles: transparent border, gray text, hover effect
                            }`}
                            onClick={() => setActiveTab('agreements')}>
                            Agreements & NDAs
                        </motion.button>
                        {/* Tab Button 2: Halal certification application form */}
                        <motion.button
                             whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className={`whitespace-nowrap pb-3 pt-1 px-1 border-b-2 font-medium text-sm  ${
                                activeTab === 'form'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab('form')}>
                            Halal certification application form
                        </motion.button>
                        {/* Tab Button 3: Service Listing */}
                        <motion.button
                             whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className={`whitespace-nowrap pb-3 pt-1 px-1 border-b-2 font-medium text-sm  ${
                                activeTab === 'listing'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab('listing')}>
                            Service Listing
                        </motion.button>
                    </nav>
                </div>

                {/* Tab Content Area - Inner component will now handle padding and buttons */}
                <div className="bg-white rounded-lg ">
                    {' '}
                    {/* Container for tab content */}
                    {renderTabContent()}
                   
                </div>
            </div>
        </div>
    )
}

export default ApprovalDashboard
