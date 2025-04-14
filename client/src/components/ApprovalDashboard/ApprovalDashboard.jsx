import React, { useState } from 'react';
import AgreementsAndNDAs from './AgreementsAndNDAs/AgreementsAndNDAs'; // Corrected import path
import HalalCertificationApplicationForm from './HalalCertificateApplicationForm/HalalCertificateApplicationForm';
import ServiceListing from './ServiceListing/ServiceListing'; // Import the new component

// Import other tab components when created
// import ServiceListing from './ServiceListing';
// No CSS import needed for Tailwind if configured globally

function ApprovalDashboard({ lead }) {
  const [activeTab, setActiveTab] = useState('agreements'); // 'agreements', 'form', 'listing'

  // Use lead prop data or provide fallbacks
  const companyData = {
    logo: lead?.companyProfile || 'https://via.placeholder.com/80', // Use optional chaining and fallback
    name: lead?.companyName || 'SavoryBites',
    website: 'https://Savorybites.com', // Assuming this is static or comes from elsewhere
    manager: lead?.creatorName || 'Atif Khan',
    mobile: lead?.mobile || '9876543210',
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'agreements':
        // Pass necessary props, e.g., functions to handle Next/Back if logic resides here
        return <AgreementsAndNDAs onNext={()=> setActiveTab('form')} />
      case 'form':
        // return <HalalCertificationForm />; // Uncomment when created
        // Pass onNext to navigate to listing, onBack to navigate to agreements
        return <HalalCertificationApplicationForm lead={lead}  onBack={() => setActiveTab('agreements')}/>


      case 'listing':
        // Render ServiceListing and pass the handler functions
        return <ServiceListing onBack={()=>setActiveTab('form')}  />;
      default:
        return <AgreementsAndNDAs onNext={()=> setActiveTab('form')} />;
    }
  };

  return (
    <div className=" min-h-screen"> {/* Added padding to match image */}
      {/* Breadcrumbs
      <div className="text-sm text-gray-500 mb-4">
        Lead center &gt; Profile &gt; Applications &gt; Company details
      </div> */}  

      <h2 className="text-xl font-semibold text-gray-800 mb-5">Company Detail</h2> {/* Adjusted margin */}
      {/* Company Header Section - Adjusted padding and spacing */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6 flex justify-between items-start"> {/* Adjusted padding */}
        {/* Left side */}
        <div className="flex items-start space-x-5"> {/* Adjusted spacing */}
          {/* Ensure logo is loaded correctly */}
          <img src={companyData.logo} alt={`${companyData.name} logo`} className="w-16 h-16 rounded-full border border-gray-200 object-cover" />
          <div className="flex-1 mt-1"> {/* Added slight top margin for alignment */}
             {/* Name & Website */}
            <div className="mb-3">
                 <h3 className="text-lg font-semibold text-gray-900">{companyData.name}</h3>
                 <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">{companyData.website}</a>
             </div>
              {/* Contacts */}
             <div className="flex space-x-12 text-sm"> {/* Adjusted spacing */}
                 <div>
                     <span className="text-gray-500 block text-xs mb-0.5">Manager</span> {/* Adjusted size/margin */}
                     <span className="font-medium text-gray-800">{companyData.manager}</span>
                 </div>
                  <div>
                      <span className="text-gray-500 block text-xs mb-0.5">Mobile Number</span> {/* Adjusted size/margin */}
                      <span className="font-medium text-gray-800">{companyData.mobile}</span>
                 </div>
             </div>
          </div>
        </div>
        {/* Right side: Action Buttons */}
        <div className="flex flex-col space-y-2 items-end mt-1"> {/* Added slight top margin */}
           <button className="text-xs text-red-600 hover:text-red-700 flex items-center font-medium">
             {/* Refresh Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0115.357-2m0 0H15" />
             </svg>
             Reset Credential
           </button>
           <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs flex items-center shadow-sm border border-gray-200 font-medium"> {/* Adjusted padding/size/border */}
             {/* Message Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
             </svg>
             Message
           </button>
         </div>
      </div>

      {/* Tabs Section - Styling adjusted */}
      <div className='bg-white p-5 rounded-lg shadow'>

      <div className="border-b  border-gray-200 mb-6"> {/* Container with bottom border */}
        <nav className="-mb-px flex space-x-8" aria-label="Tabs"> {/* Flex container for tabs, negative margin for border overlap */}
          {/* Tab Button 1: Agreements & NDAs */}
          <button
            className={`whitespace-nowrap pb-3 pt-1 px-1 border-b-2 font-medium text-sm focus:outline-none ${ // Base styles: padding, border, font
              activeTab === 'agreements'
                ? 'border-teal-500 text-teal-600' // Active styles: teal border and text
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' // Inactive styles: transparent border, gray text, hover effect
            }`}
            onClick={() => setActiveTab('agreements')}
          >
            Agreements & NDAs
          </button>
          {/* Tab Button 2: Halal certification application form */}
          <button
            className={`whitespace-nowrap pb-3 pt-1 px-1 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'form'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('form')}
          >
            Halal certification application form
          </button>
          {/* Tab Button 3: Service Listing */}
          <button
             className={`whitespace-nowrap pb-3 pt-1 px-1 border-b-2 font-medium text-sm focus:outline-none ${
              activeTab === 'listing'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('listing')}
          >
            Service Listing
          </button>
        </nav>
      </div>

      {/* Tab Content Area - Inner component will now handle padding and buttons */}
      <div className="bg-white rounded-lg "> {/* Container for tab content */}
        {renderTabContent()}
      </div>

      </div>
    </div>
  );
}

export default ApprovalDashboard;

