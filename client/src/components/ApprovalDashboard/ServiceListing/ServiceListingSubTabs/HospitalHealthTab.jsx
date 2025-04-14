import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BiDownload, BiEdit, BiTrash, BiPlus, BiSave, BiXCircle } from 'react-icons/bi';

// Dummy data - replace with props later, include isDefault flag
const initialHealthServicesData = [
    {
        id: 1,
        slNo: 1,
        serviceName: 'Patient Welcome Services',
        description: 'Greeting patients upon arrival and assisting with the check-in process.',
        status: 'Provided by hospital administration',
        isDefault: true
    },
    {
        id: 2,
        slNo: 2,
        serviceName: 'Patient Accommodation Services',
        description: 'Efficient check-in and check-out services, as well as information about the hospital\'s facilities.',
        status: 'Provided by hospital administration',
        isDefault: true
    },
    {
        id: 3,
        slNo: 3,
        serviceName: 'Patient Transport Services',
        description: 'Providing assistance with patient transportation within the healthcare facility.',
        status: '', // Example needs input
        isDefault: true
    },
    {
        id: 4,
        slNo: 4,
        serviceName: 'Room Amenities',
        description: 'Offering amenities such as TV, Wi-Fi, reading materials, and other comforts.',
        status: '', // Example needs input
        isDefault: true
    },
    {
        id: 5,
        slNo: 5,
        serviceName: 'Cafeteria and Dining Services',
        description: 'Providing meals and refreshments for patients and visitors.',
        status: '', // Example needs input
        isDefault: true
    }
];


const HospitalHealthTab = ({
  hospitalHealthData = initialHealthServicesData, // Use prop or dummy data
  onPrevious,
  onNext,
  isFirstTab,
  isLastTab,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [healthServices, setHealthServices] = useState([]);

  // Effect to synchronize state with props when not editing
  useEffect(() => {
    if (!isEditing) {
      const processedData = hospitalHealthData.map((item, index) => ({
        ...item,
        id: item.id || `health-${index}-${Date.now()}`,
        slNo: index + 1,
        isDefault: item.isDefault !== undefined ? item.isDefault : false, // Ensure isDefault exists
      }));
      setHealthServices(processedData);
    }
  }, [hospitalHealthData, isEditing]);

  const handleEditClick = () => {
    setHealthServices(currentList => currentList.map(item => ({ ...item }))); // Deep copy for editing
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Re-sync with original prop data (handled by useEffect)
  };

  const handleSave = () => {
    // TODO: Implement save logic (e.g., API call with updated healthServices)
    console.log('Saving health services:', healthServices);
    setHealthServices(currentList => currentList.map(item => ({ ...item }))); // Optimistic update
    setIsEditing(false);
  };

  // --- Handlers for Edit Form ---
  const handleAddHealthServiceRow = () => {
    setHealthServices(currentList => [
      ...currentList,
      {
        id: `new-health-${Date.now()}`,
        slNo: currentList.length + 1,
        serviceName: '',
        description: '',
        status: '',
        isDefault: false // New rows are not default
      }
    ]);
  };

  const handleRemoveHealthServiceRow = (idToRemove) => {
    setHealthServices(currentList =>
      currentList
        .filter((item) => item.id !== idToRemove)
        .map((item, index) => ({ ...item, slNo: index + 1 })) // Recalculate slNo
    );
  };

  const handleHealthServiceChange = (id, field, value) => {
    setHealthServices(currentList =>
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
  const displayFieldClass = 'text-sm text-gray-700 min-h-[40px] flex items-center py-2'; // For read-only fields


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
            <h3 className="text-lg font-semibold text-gray-800">Edit Hospital & Health Care Service List</h3>
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
          {healthServices.map((service) => (
            <motion.div
              key={service.id}
              className="relative border border-gray-200 rounded-lg p-4 bg-gray-50/50"
              variants={itemVariants}
              layout
            >
              {/* Grid for form fields */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3 items-start"> {/* Use items-start */}
                    {/* Service Name & Description Column (Span 2) */}
                    <div className="md:col-span-2 space-y-3">
                        <div>
                            <label className={labelClass}>Service Name</label>
                            {service.isDefault ? (
                                <p className={`${displayFieldClass} font-medium text-gray-800`}>{service.serviceName}</p>
                            ) : (
                                <input
                                    type="text"
                                    value={service.serviceName}
                                    onChange={(e) => handleHealthServiceChange(service.id, 'serviceName', e.target.value)}
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
                                    onChange={(e) => handleHealthServiceChange(service.id, 'description', e.target.value)}
                                    className={`${inputClass} min-h-[40px]`}
                                    rows={1}
                                    placeholder="Enter service description"
                                />
                            )}
                        </div>
                    </div>

                    {/* Status Column */}
                    <div>
                        <label className={labelClass}>Status</label>
                        <select
                            value={service.status}
                            onChange={(e) => handleHealthServiceChange(service.id, 'status', e.target.value)}
                            className={`${inputClass} bg-white`}
                        >
                            <option value="">Select Status</option>
                            <option value="Provided by hospital administration">Provided by hospital administration</option>
                            <option value="Provided by third party">Provided by third party</option>
                            <option value="Not Applicable">Not Applicable</option>
                            {/* Add other relevant status options */}
                        </select>
                    </div>
                </div>


              {/* Conditional Remove Button */}
              {!service.isDefault && (
                <button
                  onClick={() => handleRemoveHealthServiceRow(service.id)}
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
                onClick={handleAddHealthServiceRow}
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
        <h3 className="text-lg font-semibold text-gray-800">Hospital and Health Care Service List</h3>
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
            //  disabled={healthServices.length === 0 && !hospitalHealthData.length}
          >
            <BiEdit className="mr-1.5" size={16} />
            Edit
          </motion.button>
        </div>
      </div>

      {/* Display Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">SL No.</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th> {/* Combined Name & Desc */}
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <motion.tbody variants={containerVariants} initial='hidden' whileInView="visible" className="bg-white divide-y divide-gray-200">
            {healthServices.map((service) => (
              <motion.tr key={service.id} variants={itemVariants}>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{String(service.slNo).padStart(2, '0')}</td>
                <td className="px-5 py-4 whitespace-normal text-sm text-gray-700"> {/* Allow wrapping */}
                    <span className="font-medium">{service.serviceName}</span>
                    {service.description && <p className="text-xs text-gray-500 mt-1">{service.description}</p>}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{service.status || '-'}</td>
              </motion.tr>
            ))}
             {healthServices.length === 0 && (
                <tr>
                    <td colSpan="3" className="text-center px-5 py-6 text-sm text-gray-500 italic">
                        No health services listed. Click 'Edit' to add services.
                    </td>
                </tr>
            )}
          </motion.tbody>
        </table>
      </div>

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

export default HospitalHealthTab; 