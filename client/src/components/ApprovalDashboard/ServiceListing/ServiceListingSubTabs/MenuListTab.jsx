import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BiDownload, BiEdit, BiTrash, BiPlus, BiSave, BiXCircle } from 'react-icons/bi';

// Dummy data - replace with props later
const initialMenuListData = [
  { id: 1, slNo: 1, name: 'Chicken Jalfrezi Recipe (Restaurant Style)', category: 'North Indian', price: '499', availableTime: '10:00 am - 09:00pm' },
  { id: 2, slNo: 2, name: 'Malai Chicken Recipe.', category: 'South Indian', price: '350', availableTime: '10:00 am - 09:00pm' },
  { id: 3, slNo: 3, name: 'Chicken Tikka Masala Recipe.', category: 'Continental', price: '699', availableTime: '10:00 am - 09:00pm' },
  { id: 4, slNo: 4, name: 'Palak Chicken (Chicken Spinach Curry)', category: 'North Indian', price: '400', availableTime: '10:00 am - 09:00pm' },
  { id: 5, slNo: 5, name: 'Chicken Biryani Recipe.', category: 'North Indian', price: '499', availableTime: '10:00 am - 09:00pm' },
];

const MenuListTab = ({
  menuListData = initialMenuListData, // Use prop or dummy data
  onPrevious,
  onNext,
  isFirstTab,
  isLastTab,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [menuList, setMenuList] = useState([]);

  // Effect to synchronize state with props when not editing
  useEffect(() => {
    if (!isEditing) {
      // Ensure data passed has unique IDs and correct slNo if not present
      const processedData = menuListData.map((item, index) => ({
        ...item,
        id: item.id || `item-${index}-${Date.now()}`, // Generate basic unique ID if missing
        slNo: index + 1, // Ensure correct slNo
      }));
      setMenuList(processedData);
    }
  }, [menuListData, isEditing]);


  const handleEditClick = () => {
    // Deep copy the current list for editing to avoid direct mutation
    setMenuList(currentList => currentList.map(item => ({ ...item })));
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Re-sync with original prop data (handled by useEffect)
  };

  const handleSave = () => {
    // TODO: Implement save logic (e.g., API call with the updated menuList)
    console.log('Saving menu list:', menuList);
    // Optimistically update the list shown (or wait for API response)
    setMenuList(currentList => currentList.map(item => ({ ...item })));
    setIsEditing(false);
  };

  // --- Handlers for Edit Form ---
  const handleAddMenuItem = () => {
    setMenuList(currentList => [
      ...currentList,
      {
        id: `new-${Date.now()}`, // Basic unique ID for new items
        slNo: currentList.length + 1,
        name: '',
        category: '',
        price: '',
        availableTime: '', // Add availableTime field
        // Initialize other fields like priceType or label if needed based on final design
        // priceType: '',
        // label: '',
      }
    ]);
  };

  const handleRemoveMenuItem = (idToRemove) => {
    setMenuList(currentList =>
      currentList
        .filter((item) => item.id !== idToRemove)
        .map((item, index) => ({ ...item, slNo: index + 1 })) // Recalculate slNo
    );
  };

  const handleMenuItemChange = (id, field, value) => {
    setMenuList(currentList =>
      currentList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Animation variants (consistent with other tabs)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }, // Faster stagger
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -10 },
  };

  const inputClass = 'w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';


  if (isEditing) {
    // --- EDITING VIEW ---
    return (
      <motion.div
        className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Edit Header */}
         <div className="pb-4 mb-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Edit Menu List</h3>
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
          {menuList.map((item, index) => (
            <motion.div
              key={item.id} // Use stable unique ID
              className="relative border border-gray-200 rounded-lg p-4 bg-gray-50/50"
              variants={itemVariants}
              
            >
              <h4 className="text-md font-medium text-gray-700 mb-3">SL No {String(item.slNo).padStart(2, '0')}</h4>
              {/* Use grid for better alignment */}
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                {/* Product Name */}
                <div className="">
                  <label className={labelClass}>Product name / Name of dish</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleMenuItemChange(item.id, 'name', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Malai Chicken"
                  />
                </div>
                {/* Category */}
                 <div>
                  <label className={labelClass}>Category</label>
                  <input
                    type="text" // Or use select if categories are predefined
                    value={item.category}
                    onChange={(e) => handleMenuItemChange(item.id, 'category', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., North Indian"
                  />
                </div>
                 {/* Price */}
                <div>
                    <label className={labelClass}>Price (₹)</label>
                    <input
                        type="number" // Use number for price
                        value={item.price}
                        onChange={(e) => handleMenuItemChange(item.id, 'price', e.target.value)}
                        className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} // Hide number spinners
                        placeholder="e.g., 499"
                        min="0" // Optional: prevent negative prices
                    />
                </div>
                {/* Available Time */}
                <div>
                    <label className={labelClass}>Available time</label>
                    <input
                        type="text" // Could use time pickers, but text is simpler for ranges
                        value={item.availableTime}
                        onChange={(e) => handleMenuItemChange(item.id, 'availableTime', e.target.value)}
                        className={inputClass}
                        placeholder="e.g., 10:00 am - 09:00 pm"
                    />
                </div>
                 {/* Example for Select (Price Type - based on 2nd image) */}
                 {/* <div>
                    <label className={labelClass}>Price Type</label>
                    <select
                        value={item.priceType || ''} // Handle potential undefined value
                        onChange={(e) => handleMenuItemChange(item.id, 'priceType', e.target.value)}
                        className={`${inputClass} bg-white`}
                    >
                        <option value="">Select</option>
                        <option value="fixed">Fixed</option>
                        <option value="per_plate">Per Plate</option>
                        <option value="half_plate">Half Plate</option>
                    </select>
                </div> */}
                 {/* Example for Label (based on 2nd image) */}
                {/* <div>
                    <label className={labelClass}>Label (Optional)</label>
                    <input
                        type="text"
                        value={item.label || ''} // Handle potential undefined value
                        onChange={(e) => handleMenuItemChange(item.id, 'label', e.target.value)}
                        className={inputClass}
                        placeholder="e.g., Chef's Special"
                    />
                </div> */}
              </div>
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveMenuItem(item.id)}
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
                onClick={handleAddMenuItem}
                className="flex items-center text-teal-600 hover:text-teal-800 text-sm font-medium px-3 py-1 rounded hover:bg-teal-50 transition-colors"
            >
                <BiPlus size={18} className="mr-1" /> Add Menu Item
            </button>
        </div>

        {/* --- Action Buttons for Edit Mode (moved to header) --- */}

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
        <h3 className="text-lg font-semibold text-gray-800">Menu List</h3>
        <div className="flex items-center space-x-3">
          <motion.button
            className="flex items-center text-sm text-gray-600 hover:text-teal-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Download clicked')} // Add download logic
          >
            <BiDownload className="mr-1.5" size={16} />
            Download
          </motion.button>
          <motion.button
            className="flex items-center text-sm text-teal-600 hover:text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-md shadow-sm hover:bg-teal-100 transition-colors"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleEditClick}
            //  disabled={menuList.length === 0 && !menuListData.length} // Disable if no data
          >
            <BiEdit className="mr-1.5" size={16} />
            Edit
          </motion.button>
        </div>
      </div>

      {/* Display Table */}
      <div className="overflow-x-auto p-0"> {/* Remove padding here if added by inner table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                SL No.
              </th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product name / Name of dish
              </th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available time
              </th>
            </tr>
          </thead>
          <motion.tbody variants={containerVariants} initial='hidden' whileInView='visible' className="bg-white divide-y divide-gray-200">
            {menuList.map((item) => (
              <motion.tr key={item.id} variants={itemVariants}>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{String(item.slNo).padStart(2, '0')}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">₹ {item.price}</td>
                 <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{item.availableTime}</td>
              </motion.tr>
            ))}
             {menuList.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center px-5 py-6 text-sm text-gray-500 italic">
                        No menu items listed. Click 'Edit' to add items.
                    </td>
                </tr>
            )}
          </motion.tbody>
        </table>
      </div>

      {/* --- Action Buttons for Display Mode --- */}
      <div className="flex justify-end space-x-3 border-t border-gray-200 p-4 sm:px-6 sm:py-4">
        <motion.button
            onClick={onPrevious}
            className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-gray-400"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
            disabled={isFirstTab} // Disable if it's the first tab
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

export default MenuListTab; 