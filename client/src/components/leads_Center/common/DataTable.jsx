// src/components/common/DataTable.jsx
import React, { useState } from 'react';
import { FaUserCircle, FaBuilding, FaUtensils, FaCapsules, FaEnvelope, FaExternalLinkAlt  ,FaRegUser, FaKey } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import noleads from '../../../assets/noleads.svg'
import GenerateCredentialsModal from '../../layout/GenerateCredentialsModal';
import { userApprovalDashboardState } from '../../../state/leadsCenterState';
import { useSetRecoilState } from 'recoil';

const DataTable = ({ columns, data, isLoading, error, RowComponent, EmptyStateComponent }) => {
    

    if (isLoading) { return <div className="text-center py-10 text-gray-500"><FaUserCircle className="animate-spin inline-block mr-2 text-xl" /> Loading data...</div>; }
    if (error) { return <div className="text-center py-10 text-red-600">Error: {error}</div>; }
    if (!data || data.length === 0) { return EmptyStateComponent ? <EmptyStateComponent /> : <div className="text-center w-full h-full flex flex-col py-20 justify-center items-center  text-gray-500">
        <img className='h-[100px] ' src={noleads} alt="" />
        <h1>No Data found</h1>
    </div>; }
    return (
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse">
          <thead><tr className=" bg-gray-50">{columns.map((col)=><th key={col.key} className={`py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200 ${col.headerClassName||''}`} style={col.headerStyle||{}}>{col.header}</th>)}</tr></thead>
          <tbody>{data.map((item, index) => (<RowComponent key={item.id || index} item={item} />))}</tbody>
        </table>

       
      </div>
    );
};


export const LeadDataRow = ({ item }) => {
    const handleAllocate = (id) => console.log('Allocate:', id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    const setUserApprovalDashboard = useSetRecoilState(userApprovalDashboardState);
    
    const handleViewApprovalDashboard = (lead) => {
        setUserApprovalDashboard({
            open: true,
            lead: lead
        });
    };
    

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
        
        <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap w-12">
                 <span
                    className="inline-block w-9 h-9 rounded-full text-center leading-9 font-medium text-sm uppercase"
                    style={{ backgroundColor: item.avatarBg || '#e0e0e0', color: item.avatarColor || '#555' }}
                >
                    {item.initials}
                </span>
            </td>
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.creatorName}</td>
            {
                item.type==='Application' && (
                    <>
                        <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.applicationNumber}</td>
                        <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.date || 'N/A'}</td>
                        <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.industry}</td>
                    </>
                )
            }
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.mobile}</td>
            {
                item.type ==='New Lead' && <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.inquiredFor}</td>
            }
             {/* Conditionally show status for Applications */}
             {item.type === 'Application' && (
                 <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{item.status || 'N/A'}</span>
                 </td>
             )}
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap text-right">
                  <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={() => handleSendMail(item.id)}>
                     <FaExternalLinkAlt   className="mr-1.5"/> Allocate
                 </button>
                { item.type === 'New Lead' ? <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={() => handleOpenModal(item)}>
                      <FaKey   className="mr-1.5"/> Generate Credentials
                 </button> :  <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={()=>handleViewApprovalDashboard(item)} >
                      < FaExternalLinkAlt  className="mr-1.5"/> Go to dashboard
                 </button>

                 }
                
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
    );
};

// Specific Row Component for APPROVED applications
export const ApprovedDataRow = ({ item }) => {
    const handleAllocateApp = (id) => console.log('Allocate App:', id);
    const handleGoToDashboard = (id) => console.log('Go To App Dashboard:', id);

    const setUserApprovalDashboard = useSetRecoilState(userApprovalDashboardState);
    
    const handleViewApprovalDashboard = (lead) => {
        setUserApprovalDashboard({
            open: true,
            lead: lead,
            approvedTab:true
        });
    };

     const statusClasses = 'text-green-800 bg-green-100'; // Approved are usually completed

    return (
         <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">#{item.componyAvatar}</td>
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.companyName}</td>
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.applicationNumber}</td>
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.date}</td>
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.industry}</td>
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.mobile}</td>
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">
                <span className={`font-semibold py-1 px-2 rounded text-sm inline-block ${statusClasses}`}>
                    {item.status}
                </span>
            </td>
            <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap text-right">
                  <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={() => handleSendMail(item.id)}>
                     <FaRegUser   className="mr-1.5"/> Allocated Member
                 </button>
                 <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={()=>handleViewApprovalDashboard(item)} >
                      < FaExternalLinkAlt  className="mr-1.5"/> Go to dashboard
                 </button>
             </td>
        </tr>
    );
};

// --- *** NEW: Specific Row Component for ALLOCATED items *** ---
export const AllocatedDataRow = ({ item }) => {
     const handleSendMail = (id) => console.log('Send Mail for item:', id);
     const handleGoToDashboard = (id) => console.log('Go to Allocated Item Dashboard:', id);

     // Determine status styling
     const statusClasses = item.status === 'In Progress' ? 'text-yellow-800 bg-yellow-100'
                         : item.status === 'Completed' ? 'text-green-800 bg-green-100'
                         : item.status === 'Pending' ? 'text-blue-800 bg-blue-100' // Example for Pending
                         : 'text-gray-800 bg-gray-100';

     // Icon based on type (Lead vs Application/Approved)
     const ItemIcon = ({ item }) => {
         if (item.originalType === 'New Lead') {
            return (
                 <span className="inline-block w-9 h-9 rounded-full text-center leading-9 font-medium text-sm uppercase" style={{ backgroundColor: item.avatarBg || '#e0e0e0', color: item.avatarColor || '#555' }}>
                    {item.initials}
                </span>
            );
         } else { // Application or Approved
             let IconComponent = FaBuilding;
             if (item.industry === 'Food') IconComponent = FaUtensils;
             if (item.industry === 'Cosmeceutical') IconComponent = FaCapsules;
             return (
                <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-200 text-gray-600">
                    <IconComponent size="0.9em"/>
                </span>
             );
         }
     };

    return (
         <tr className="hover:bg-gray-50">
             {/* First column: Icon */}
             <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap w-12">
                <ItemIcon item={item} />
             </td>
             {/* Second column: Name or Company */}
             <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">
                {item.type !== 'Allocated Approved' ? item.creatorName : item.companyName}
             </td>
             {/* Subsequent columns */}
             {
                item.type !== 'Allocated Lead' && (
                    <>
                    <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.applicationNumber || 'N/A'}</td>
                    <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.date || 'N/A'}</td>
                    <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.industry || 'N/A'}</td>
                    
                    </>
                )          
             }
             <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">{item.mobile}</td>
              <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap">
                 <span className={`font-semibold py-1 px-2 rounded text-sm inline-block ${statusClasses}`}>
                     {item.status || 'N/A'}
                 </span>
             </td>
             <td className="py-3 px-4 border-b border-gray-200 align-middle text-sm whitespace-nowrap text-right">
                  <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={() => handleSendMail(item.id)}>
                     <FaRegUser   className="mr-1.5"/> Allocated Member
                 </button>
                 <button className="py-1.5 px-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm ml-2 hover:bg-gray-50 inline-flex items-center" onClick={() => handleGoToDashboard(item.id)}>
                      <FaExternalLinkAlt  className="mr-1.5"/> Go to dashboard
                 </button>
             </td>
         </tr>
    );
}


export default DataTable;