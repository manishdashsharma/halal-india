import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BiDownload, BiEdit, BiTrash, BiPlus, BiSave, BiXCircle } from 'react-icons/bi';

// Dummy data - replace with props later, include isDefault flag
const initialHotelServicesData = [
    {
        id: 1,
        slNo: 1,
        serviceName: 'Concierge Services',
        description: 'Assistance with travel arrangements, restaurant reservations, and other guest requests.',
        status: 'Provided by hotel administration',
        managerName: 'Mohammed Akhlaq',
        managerNumber: '9876543210',
        isDefault: true // Flag for default rows
    },
    {
        id: 2,
        slNo: 2,
        serviceName: 'Front Desk Services',
        description: 'Efficient check-in and check-out services, as well as information about the hotels facilities and local attractions.',
        status: 'Provided by hotel administration',
        managerName: 'Mohammed Akhlaq',
        managerNumber: '9876543210',
        isDefault: true
    },
    {
        id: 3,
        slNo: 3,
        serviceName: 'Room Service',
        description: '24/7 room service offering a diverse menu for in-room dining.',
        status: '', // Example where status needs input
        managerName: '',
        managerNumber: '',
        isDefault: true
    },
    {
        id: 4,
        slNo: 4,
        serviceName: 'Luxurious Accommodations',
        description: 'Well-appointed rooms and suites with high-quality furnishings, bedding, and amenities.',
        status: '',
        managerName: '',
        managerNumber: '',
        isDefault: true
    }
];


const StarHotelsTab = ({
  hotelServicesData =  initialHotelServicesData, // Use prop or dummy data
  onPrevious,
  onNext,
  isFirstTab,
  isLastTab,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hotelServices, setHotelServices] = useState([]);

  // Effect to synchronize state with props when not editing
  useEffect(() => {
    if (!isEditing) {
      const processedData = hotelServicesData.map((item, index) => ({
        ...item,
        id: item.id || `hotel-${index}-${Date.now()}`,
        slNo: index + 1,
        isDefault: item.isDefault !== undefined ? item.isDefault : false, // Ensure isDefault exists
      }));
      setHotelServices(processedData);
    }
  }, [hotelServicesData, isEditing]);

  const handleEditClick = () => {
    setHotelServices(currentList => currentList.map(item => ({ ...item }))); // Deep copy for editing
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Re-sync with original prop data (handled by useEffect)
  };

  const handleSave = () => {
    // TODO: Implement save logic (e.g., API call with updated hotelServices)
    console.log('Saving hotel services:', hotelServices);
    setHotelServices(currentList => currentList.map(item => ({ ...item }))); // Optimistic update
    setIsEditing(false);
  };

  // --- Handlers for Edit Form (similar to Certification.jsx) ---
  const handleAddHotelServiceRow = () => {
    setHotelServices(currentList => [
      ...currentList,
      {
        id: `new-hotel-${Date.now()}`,
        slNo: currentList.length + 1,
        serviceName: '',
        description: '',
        status: '',
        managerName: '',
        managerNumber: '',
        isDefault: false // New rows are not default
      }
    ]);
  };

  const handleRemoveHotelServiceRow = (idToRemove) => {
    setHotelServices(currentList =>
      currentList
        .filter((item) => item.id !== idToRemove)
        .map((item, index) => ({ ...item, slNo: index + 1 })) // Recalculate slNo
    );
  };

  const handleHotelServiceChange = (id, field, value) => {
    setHotelServices(currentList =>
      currentList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -10 },
  };

  const inputClass = 'w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';
  const displayFieldClass = 'text-sm text-gray-700 min-h-[40px] flex items-center py-2'; // For read-only fields in edit mode


  if (isEditing) {
    // --- EDITING VIEW ---
    return (
      <motion.div
        className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Edit Header */}
         <div className="pb-4 mb-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Edit Star Hotels & Hospitality Service List</h3>
            <div className="flex items-center space-x-3">
                <motion.button
                    onClick={handleSave}
                    className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium shadow-sm text-white bg-teal-600 hover:bg-teal-700 border border-transparent"
                    aria-label="Save Changes" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <BiSave className="mr-1.5 h-4 w-4" /> Save
                </motion.button>
                <motion.button
                    onClick={handleCancelEdit}
                    className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium shadow-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
                    aria-label="Cancel Edit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <BiXCircle className="mr-1.5 h-4 w-4" /> Cancel
                </motion.button>
            </div>
        </div>

        {/* Edit Form Area */}
        <motion.div className="space-y-5" variants={containerVariants} initial="hidden" animate="visible">
          {hotelServices.map((service) => (
            <motion.div
              key={service.id}
              className="relative border border-gray-200 rounded-lg p-4 bg-gray-50/50"
              variants={itemVariants}
              layout
            >
              {/* Service Name and Description Section */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-3">
                    <div>
                        <label className={labelClass}>Service Name</label>
                        {service.isDefault ? (
                            <p className={`${displayFieldClass} font-medium text-gray-800`}>{service.serviceName}</p>
                        ) : (
                            <input
                                type="text"
                                value={service.serviceName}
                                onChange={(e) => handleHotelServiceChange(service.id, 'serviceName', e.target.value)}
                                className={inputClass}
                                placeholder="Enter service name"
                            />
                        )}
                    </div>
                     <div>
                        <label className={labelClass}>Description</label>
                        {service.isDefault ? (
                             <p className={displayFieldClass}>{service.description}</p>
                        ) : (
                            <textarea
                                value={service.description}
                                onChange={(e) => handleHotelServiceChange(service.id, 'description', e.target.value)}
                                className={`${inputClass} min-h-[40px]`} // Ensure textarea is similar height
                                rows={1}
                                placeholder="Enter service description"
                            />
                        )}
                    </div>
                </div>

                {/* Status, Manager Name, Manager Number Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>Status</label>
                        <select
                            value={service.status}
                            onChange={(e) => handleHotelServiceChange(service.id, 'status', e.target.value)}
                            className={`${inputClass} bg-white`} // Add bg-white for select
                        >
                            <option value="">Select Status</option>
                            <option value="Provided by hotel administration">Provided by hotel administration</option>
                            <option value="Provided by third party">Provided by third party</option>
                            <option value="Not Applicable">Not Applicable</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Manager/Provider/POC Name</label>
                        <input
                            type="text"
                            value={service.managerName}
                            onChange={(e) => handleHotelServiceChange(service.id, 'managerName', e.target.value)}
                            className={inputClass}
                            placeholder="Enter name"
                        />
                    </div>
                     <div>
                        <label className={labelClass}>Manager/Provider/POC Number</label>
                        <input
                             type="text" // Using text allows different formats, use 'tel' if desired
                            value={service.managerNumber}
                            onChange={(e) => handleHotelServiceChange(service.id, 'managerNumber', e.target.value)}
                            className={inputClass}
                            placeholder="Enter number"
                        />
                    </div>
                </div>

              {/* Conditional Remove Button */}
              {!service.isDefault && (
                <button
                  onClick={() => handleRemoveHotelServiceRow(service.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                  title="Remove Service"
                >
                  <BiTrash size={18} />
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Add Row Button */}
        <div className="mt-5">
            <button
                onClick={handleAddHotelServiceRow}
                className="flex items-center text-teal-600 hover:text-teal-800 text-sm font-medium px-3 py-1 rounded hover:bg-teal-50 transition-colors"
            >
                <BiPlus size={18} className="mr-1" /> Add Service Row
            </button>
        </div>
      </motion.div>
    );
  }

  // --- DISPLAY VIEW ---
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Display Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Star Hotels and Hospitality Service List</h3>
        <div className="flex items-center space-x-3">
          <motion.button
            className="flex items-center text-sm text-gray-600 hover:text-teal-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Download clicked')}
          >
            <BiDownload className="mr-1.5" size={16} />
            Download
          </motion.button>
          <motion.button
            className="flex items-center text-sm text-teal-600 hover:text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-md shadow-sm hover:bg-teal-100 transition-colors"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleEditClick}
            //  disabled={hotelServices.length === 0 && !hotelServicesData.length}
          >
            <BiEdit className="mr-1.5" size={16} />
            Edit
          </motion.button>
        </div>
      </div>

      {/* Display Table */}
      <motion.div  className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">SL No.</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service List</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager/Provider/POC Name</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager/Provider/POC Number</th>
            </tr>
          </thead>
          <motion.tbody variants={containerVariants} initial='hidden' whileInView='visible' className="bg-white divide-y divide-gray-200">
            {hotelServices.map((service) => (
              <motion.tr key={service.id} variants={itemVariants}>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{String(service.slNo).padStart(2, '0')}</td>
                <td className="px-5 py-4 whitespace-normal text-sm text-gray-700"> {service.serviceName} </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{service.status || '-'}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{service.managerName || '-'}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{service.managerNumber || '-'}</td>
              </motion.tr>
            ))}
             {hotelServices.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center px-5 py-6 text-sm text-gray-500 italic">
                        No hotel services listed. Click 'Edit' to add services.
                    </td>
                </tr>
            )}
          </motion.tbody>
        </table>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 border-t border-gray-200 p-4 sm:px-6 sm:py-4">
        <motion.button
            onClick={onPrevious}
            className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-gray-400"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
            disabled={isFirstTab}
        >
            Back
        </motion.button>
        <motion.button
            onClick={onNext}
            className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 border border-transparent"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
        >
            {isLastTab ? 'Approve & Continue' : 'Next'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StarHotelsTab; 