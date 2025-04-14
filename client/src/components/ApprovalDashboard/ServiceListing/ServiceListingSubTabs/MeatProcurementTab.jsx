import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BiDownload, BiEdit, BiTrash, BiPlus, BiSave, BiXCircle } from 'react-icons/bi';

// Dummy data - replace with props later
const initialMeatProcurementData = [
    {
        id: 1,
        slNo: 1,
        particular: 'Marinated or Prepared Meats',
        category: 'Deli Meats (e.g., ham, turkey, roast...)',
        subCategory: 'Fresh farm',
        quantity: '30', // Storing as string to match input, convert if needed
        supplierName: 'Aslam Khan',
        pocName: 'Aslam Khan',
        pocContact: '9876543210'
    },
     {
        id: 2,
        slNo: 2,
        particular: 'Whole Chicken',
        category: 'Poultry',
        subCategory: 'Local',
        quantity: '100',
        supplierName: 'Fresh Farms Ltd.',
        pocName: 'Mr. Sharma',
        pocContact: '9123456789'
    },
];


const MeatProcurementTab = ({
  meatProcurementData = initialMeatProcurementData, // Use prop or dummy data
  onPrevious,
  onNext,
  isFirstTab,
  isLastTab,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [meatProcurementList, setMeatProcurementList] = useState([]);

  // Effect to synchronize state with props when not editing
  useEffect(() => {
    if (!isEditing) {
      const processedData = meatProcurementData.map((item, index) => ({
        ...item,
        id: item.id || `meat-${index}-${Date.now()}`,
        slNo: index + 1,
      }));
      setMeatProcurementList(processedData);
    }
  }, [meatProcurementData, isEditing]);

  const handleEditClick = () => {
    setMeatProcurementList(currentList => currentList.map(item => ({ ...item }))); // Deep copy for editing
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Re-sync with original prop data (handled by useEffect)
  };

  const handleSave = () => {
    // TODO: Implement save logic (e.g., API call with updated meatProcurementList)
    console.log('Saving meat procurement list:', meatProcurementList);
    setMeatProcurementList(currentList => currentList.map(item => ({ ...item }))); // Optimistic update
    setIsEditing(false);
  };

  // --- Handlers for Edit Form ---
  const handleAddMeatProcurementRow = () => {
    setMeatProcurementList(currentList => [
      ...currentList,
      {
        id: `new-meat-${Date.now()}`,
        slNo: currentList.length + 1,
        particular: '',
        category: '',
        subCategory: '',
        quantity: '',
        supplierName: '',
        pocName: '',
        pocContact: ''
      }
    ]);
  };

  const handleRemoveMeatProcurementRow = (idToRemove) => {
    setMeatProcurementList(currentList =>
      currentList
        .filter((item) => item.id !== idToRemove)
        .map((item, index) => ({ ...item, slNo: index + 1 })) // Recalculate slNo
    );
  };

  const handleMeatProcurementChange = (id, field, value) => {
    setMeatProcurementList(currentList =>
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

  // Consistent styling classes
  const inputClass = 'w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';
  const selectClass = `${inputClass} bg-white`; // Base input class + bg-white for select


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
            <h3 className="text-lg font-semibold text-gray-800">Edit Meat Procurement List</h3>
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
        <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible"> {/* Increased space-y */}
          {meatProcurementList.map((item) => (
            <motion.div
              key={item.id}
              className="relative border border-gray-200 rounded-lg p-4 pt-6 bg-gray-50/50" // Added pt-6 for SL No. positioning
              variants={itemVariants}
              layout
            >
              {/* SL No. positioned absolutely */}
               <span className="absolute top-2 left-4 text-sm font-medium text-gray-500">SL No {String(item.slNo).padStart(2, '0')}</span>

              {/* Grid for form fields - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {/* Column 1 */}
                    <div className="space-y-3">
                        <div>
                            <label className={labelClass}>Particular</label>
                            <input
                                type="text"
                                value={item.particular}
                                onChange={(e) => handleMeatProcurementChange(item.id, 'particular', e.target.value)}
                                className={inputClass}
                                placeholder="e.g., Marinated Meats"
                            />
                        </div>
                         <div>
                            <label className={labelClass}>Qty (kgs/per day)</label>
                            <input
                                type="number" // Use number input
                                value={item.quantity}
                                onChange={(e) => handleMeatProcurementChange(item.id, 'quantity', e.target.value)}
                                className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                placeholder="e.g., 30"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>POC Contact Number</label>
                            <input
                                type="text" // Use 'tel' if strict phone format needed
                                value={item.pocContact}
                                onChange={(e) => handleMeatProcurementChange(item.id, 'pocContact', e.target.value)}
                                className={inputClass}
                                placeholder="Enter contact number"
                            />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-3">
                         <div>
                            <label className={labelClass}>Category</label>
                            <select
                                value={item.category}
                                onChange={(e) => handleMeatProcurementChange(item.id, 'category', e.target.value)}
                                className={selectClass}>
                                <option value="">Select category</option>
                                <option value="Deli Meats (e.g., ham, turkey, roast...)">Deli Meats (e.g., ham, turkey, roast...)</option>
                                <option value="Poultry">Poultry</option>
                                <option value="Beef">Beef</option>
                                <option value="Lamb/Mutton">Lamb/Mutton</option>
                                <option value="Seafood">Seafood</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Supplier Name</label>
                            <input
                                type="text"
                                value={item.supplierName}
                                onChange={(e) => handleMeatProcurementChange(item.id, 'supplierName', e.target.value)}
                                className={inputClass}
                                placeholder="Enter supplier name"
                            />
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-3">
                        <div>
                            <label className={labelClass}>Sub-Category</label>
                            <select
                                value={item.subCategory}
                                onChange={(e) => handleMeatProcurementChange(item.id, 'subCategory', e.target.value)}
                                className={selectClass}>
                                <option value="">Select sub-category</option>
                                <option value="Fresh farm">Fresh farm</option>
                                <option value="Frozen">Frozen</option>
                                <option value="Imported">Imported</option>
                                <option value="Local">Local</option>
                                {/* Add more sub-categories as needed */}
                            </select>
                        </div>
                         <div>
                            <label className={labelClass}>POC Name</label>
                            <input
                                type="text"
                                value={item.pocName}
                                onChange={(e) => handleMeatProcurementChange(item.id, 'pocName', e.target.value)}
                                className={inputClass}
                                placeholder="Enter POC name"
                            />
                        </div>
                    </div>
                </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveMeatProcurementRow(item.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                title="Remove Item"
              >
                <BiTrash size={18} />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Row Button */}
        <div className="mt-5">
            <button
                onClick={handleAddMeatProcurementRow}
                className="flex items-center text-teal-600 hover:text-teal-800 text-sm font-medium px-3 py-1 rounded hover:bg-teal-50 transition-colors"
            >
                <BiPlus size={18} className="mr-1" /> Add Procurement Item
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
        <h3 className="text-lg font-semibold text-gray-800">Meat Procurement List</h3>
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
            //  disabled={meatProcurementList.length === 0 && !meatProcurementData.length}
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
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particular</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Category</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub-Category</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty (kgs/per day)</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">POC Name</th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">POC Contact Number</th>
            </tr>
          </thead>
          <motion.tbody  variants={containerVariants} initial='hidden' whileInView='visible' className="bg-white divide-y divide-gray-200">
            {meatProcurementList.map((item) => (
              <motion.tr key={item.id} variants={itemVariants}>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{String(item.slNo).padStart(2, '0')}</td>
                <td className="px-5 py-4  text-sm text-gray-700">{item.particular || '-'}</td>
                <td className="px-5 py-4  text-sm text-gray-700 ">{item.category || '-'}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{item.subCategory || '-'}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity || '-'}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{item.supplierName || '-'}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{item.pocName || '-'}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{item.pocContact || '-'}</td>
              </motion.tr>
            ))}
             {meatProcurementList.length === 0 && (
                <tr>
                    <td colSpan="8" className="text-center px-5 py-6 text-sm text-gray-500 italic">
                        No meat procurement items listed. Click 'Edit' to add items.
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

export default MeatProcurementTab; 