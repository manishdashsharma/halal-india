import React, { useState, useEffect } from 'react';
import { BiDownload, BiEditAlt, BiSave, BiXCircle, BiPlus } from 'react-icons/bi'; // Added Save, XCircle icons
import { motion } from 'motion/react'; // Ensure motion is imported

// Dummy data for demonstration - Replace with actual data passed via props
const dummyProductList = [
  { id: 'p1', productName: 'Protein bar', category: 'Meat, seafood, and poultry' },
  { id: 'p2', productName: 'Sprinkles', category: 'Confectionery' },
  { id: 'p3', productName: 'Chicken Chips', category: 'Snacks' },
  { id: 'p4', productName: 'Protein chocolate', category: 'Health Foods' },
];

const dummyProductSpecifications = {
  p1: {
    productName: 'Protein bar',
    brandName: 'SavoryBites',
    productCategory: 'Eggs and egg products', // Note: Image shows 'Eggs and egg products', list shows 'Meat...'
    description: 'Eggs Introducing our high-quality protein bar made with beef, specially crafted to enhance your health and endurance. Packed with essential nutrients, this protein bar is a convenient snack option for those looking to fuel their active lifestyle.',
    application: 'Our protein bar is made from premium quality beef, which is an excellent source of protein',
    appearance: '/images/product-appearance-placeholder.png', // Placeholder image path
    rawMaterials: ['Oats', 'Eggs', 'Whole wheat', 'Beef steak', 'Milk', 'Curd'],
    additives: ['Lactose', 'Spray dried lactose', 'dextrose', 'sucrose'],
    processingAids: ['Processing aid sodium sterol lactylate', 'antimicrobial agents'],
    otherIngredients: [], // Image shows 'None'
    _appearanceFile: null // To hold the actual file object in edit mode if changed
  },
  // Add specifications for other dummy products if needed
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } } // subtle stagger
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 ,}
};
// -

const ProductSpecificationTab = ({
  productList = dummyProductList,
  productSpecData = dummyProductSpecifications,
  onPrevious, // <-- Expect goToPreviousSubTab here
  onNext,     // <-- Expect goToNextSubTab or onConfirm here
  isFirstTab,
  isLastTab,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(productList[0]?.id || null);
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the locally managed version of specifications
  const [localProductSpecData, setLocalProductSpecData] = useState(productSpecData);
  // State to hold the specification currently being edited
  const [currentSpecifications, setCurrentSpecifications] = useState({});
  const [otherIngredientsInput, setOtherIngredientsInput] = useState('');

  // Effect 1: Update local data if external prop changes (and not editing)
  useEffect(() => {
    // If not editing, sync local state with incoming props.
    // This ensures the component reflects external updates when read-only.
     if (!isEditing) {
        setLocalProductSpecData(productSpecData);
     }
  }, [productSpecData, isEditing]); // Re-run if props change or edit mode toggles

  // Effect 2: Update the displayed/editing state when selection changes or edit mode ends
  useEffect(() => {
    // If a product is selected, load its data from the *local* store
    if (selectedProductId && localProductSpecData[selectedProductId]) {
        const specs = localProductSpecData[selectedProductId];
      // If not editing, `currentSpecifications` should mirror the local saved state
      // If editing, this effect shouldn't overwrite the user's ongoing changes
      // (The editing state `currentSpecifications` is set explicitly in `handleEdit`)
      // When exiting edit mode (`isEditing` becomes false), reset `currentSpecifications`
      if (!isEditing) {
        setCurrentSpecifications({ ...specs });
        setOtherIngredientsInput((specs.otherIngredients || []).join(', '));
      }
    } else {
      // No product selected or no data for the selected product
         setCurrentSpecifications({});
         setOtherIngredientsInput('');
     }
    // Reset editing form fields only when selection changes OR when exiting edit mode
    // Resetting based on `localProductSpecData` ensures we revert to the last saved state.
  }, [selectedProductId, isEditing, localProductSpecData]); // Rerun if selection, edit mode, or local data changes


  const handleSelectProduct = (productId) => {
    if (isEditing) {
      // Consider adding a confirmation dialog here
      // e.g., if (confirm("Discard unsaved changes?")) { ... }
      console.warn('Switching product while editing will discard unsaved changes.');
      setIsEditing(false); // Exit edit mode if switching
    }
    setSelectedProductId(productId);
    // The useEffect hook will handle updating `currentSpecifications` based on the new selection
  };

  const handleEdit = () => {
    if (selectedProductId && localProductSpecData[selectedProductId]) {
      // Initialize the editing state from the current local data
      setCurrentSpecifications({ ...localProductSpecData[selectedProductId] });
      setOtherIngredientsInput((localProductSpecData[selectedProductId]?.otherIngredients || []).join(', '));
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // The useEffect hook will automatically reset `currentSpecifications`
    // back to the `localProductSpecData` for the selected product
    // because `isEditing` becomes false.
  };

  const handleSave = () => {
    if (!selectedProductId) return; // Should not happen if edit button is disabled correctly

    console.log('Internal Save: Updating local specifications for:', selectedProductId, currentSpecifications);

    // Update the internal local state with the edited data
    setLocalProductSpecData(prev => ({
        ...prev,
        [selectedProductId]: { ...currentSpecifications }
    }));

    setIsEditing(false); // Exit edit mode
    // The useEffect will ensure the view updates correctly after save
  };

  const handleDownload = () => console.log('Download Specifications');

  // --- CHANGE: Use derived state for clarity ---
  // Data for display mode (comes from the locally saved state)
  const specForDisplay = localProductSpecData[selectedProductId] || {};
  // Data for edit mode (comes from the temporary editing state)
  const specForEdit = currentSpecifications;
  // --- END CHANGE ---

  // Handlers for form changes in edit mode
  const handleSpecChange = (field, value) => {
    // Update the temporary editing state
    setCurrentSpecifications(prev => ({ ...prev, [field]: value }));
  };

 const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // --- CHANGE: Check if the file exists before creating URL ---
      if (file) {
      const objectURL = URL.createObjectURL(file);
      setCurrentSpecifications(prev => ({
        ...prev,
          appearance: objectURL, // Show preview in temporary state
          _appearanceFile: file // Store the actual file in temporary state
        }));
         // --- CHANGE: Cleanup function should revoke the correct objectURL ---
         // It's better practice to handle cleanup within a useEffect return function
         // associated with the `appearance` state if it's an object URL.
         // For simplicity here, we rely on component unmount or subsequent changes.
         // A more robust solution might track the object URL and revoke it specifically.
         // Example cleanup pattern (would need state changes):
         // useEffect(() => {
         //   let currentObjectURL = specForEdit.appearance;
         //   let isObjectURL = typeof currentObjectURL === 'string' && currentObjectURL.startsWith('blob:');
         //   return () => {
         //     if (isObjectURL) {
         //        URL.revokeObjectURL(currentObjectURL);
         //      }
         //   }
         // }, [specForEdit.appearance]);
      }
      // --- END CHANGE ---
    }
  };


  const handleIngredientToggle = (section, ingredient) => {
    // Update the temporary editing state
    setCurrentSpecifications((prev) => {
      const currentIngredients = prev[section] || [];
      const exists = currentIngredients.includes(ingredient);
      return {
        ...prev,
        [section]: exists
          ? currentIngredients.filter((i) => i !== ingredient)
          : [...currentIngredients, ingredient],
      };
    });
  };

  const handleOtherIngredientsChange = (e) => {
    const value = e.target.value;
    setOtherIngredientsInput(value); // Update the controlled input state

    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    // Update the temporary editing state for 'otherIngredients'
    handleSpecChange('otherIngredients', tags);
  };

  // Use derived state for rendering display values
  // const selectedSpecForDisplay = localProductSpecData[selectedProductId]; // Replaced by specForDisplay
  // Use temporary editing state for rendering editable fields
  // const selectedSpecForEdit = currentSpecifications; // Replaced by specForEdit


  const renderDisplayValue = (label, value, isLongText = false, isList = false) => (
    <motion.div className="mb-6" variants={itemVariants}>
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    {isList ? (
      <p className="text-sm text-gray-800">
        {Array.isArray(value) && value.length > 0 ? value.join(', ') : value || 'None'}
      </p>
    ) : (
      <p className={`text-sm text-gray-800 ${isLongText ? 'whitespace-pre-wrap' : ''}`}>{value || '-'}</p>
    )}
  </motion.div>
  );

  const renderEditableField = (label, field, type = 'text', options = null) => {
     // --- CHANGE: Use derived state specForEdit ---
    const valueToEdit = specForEdit[field];

    if (type === 'textarea') {
      return (
        <motion.div variants={itemVariants}>
          <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
          <textarea
            value={valueToEdit || ''}
            onChange={(e) => handleSpecChange(field, e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm border-gray-300" // Added border color
            rows={field === 'description' ? 3 : 2}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </motion.div>
      );
    }
     if (type === 'ingredient-select') {
         // ... (ingredient options logic - keep existing)
          const ingredientOptions = {
             rawMaterials: ['Oats', 'Eggs', 'Whole wheat', 'Beef steak', 'Milk', 'Curd'],
             additives: ['Lactose', 'Spray dried lactose', 'Dextrose', 'Sucrose'],
             processingAids: ['Processing aid Sodium sterol lactylate', 'antimicrobial agents']
         };
        const colors = { rawMaterials: 'blue', additives: 'yellow', processingAids: 'purple' };
        const color = colors[field] || 'gray';
        const currentSelectedIngredients = valueToEdit || [];

        return (
            <motion.div variants={itemVariants}>
                <label className="block text-xs font-medium text-gray-700 mb-2">{label}</label>
                <div className="flex flex-wrap gap-2"> {/* Changed to flex-wrap */}
                    {ingredientOptions[field]?.map((ing) => (
                        <button
                            key={ing}
                            type="button" // Important for forms
                            onClick={() => handleIngredientToggle(field, ing)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                                currentSelectedIngredients.includes(ing)
                                ? `bg-${color}-100 text-${color}-800 border-${color}-300`
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {ing}
                        </button>
                    ))}
                </div>
            </motion.div>
        );
    }
     if (type === 'other-ingredients') {
         return (
             <motion.div variants={itemVariants}>
                 <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                 <input
                     type="text"
                     value={otherIngredientsInput}
                     onChange={handleOtherIngredientsChange}
                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm border-gray-300" // Added border color
                     placeholder="Enter ingredients, separated by commas"
                 />
                 {/* Optional: Display tags */}
                 <div className="flex flex-wrap gap-1 mt-2">
                     {(specForEdit.otherIngredients || []).map((tag) => (
                         <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                             {tag}
                         </span>
                     ))}
                 </div>
             </motion.div>
         );
     }


    // Default input field
    return (
      <motion.div variants={itemVariants} >
         {/* --- CHANGE: Label size to text-xs --- */}
        <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
        <input
          type={type}
          value={valueToEdit || ''}
          onChange={(e) => handleSpecChange(field, e.target.value)}
           // --- CHANGE: Add text-sm ---
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          placeholder={`Enter ${label.toLowerCase()}`}
           // --- CHANGE: productName and productCategory should probably not be editable ---
          disabled={field === 'productName' || field === 'productCategory'}
          readOnly={field === 'productName' || field === 'productCategory'}
        />
      </motion.div>
    );
  };

  // Rename internal handleSave to avoid conflict with prop name if needed, or just use different name
  const handleInternalSave = () => {
      if (!selectedProductId) return;
      console.log('Internal Save: Updating local specifications for:', selectedProductId, currentSpecifications);
      setLocalProductSpecData(prev => ({
          ...prev,
          [selectedProductId]: { ...currentSpecifications }
      }));
      setIsEditing(false);
  };

  return (
    // --- CHANGE: Add consistent wrapper styling ---
    <motion.div
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
      variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      {/* Header Section */}
       {/* --- CHANGE: Update header structure and styling --- */}
       <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Product Specification</h3>
         <div className="flex items-center space-x-3"> {/* Use space-x-3 */}
            {isEditing ? (
             <>
                <motion.button
                    onClick={handleInternalSave}
                    // --- Apply classes directly (green version) ---
                    className= "flex  items-center px-3 py-1.5 rounded-md text-sm font-medium shadow-sm  text-white bg-teal-600 hover:bg-teal-700  border border-transparent" // Adjusted padding to match prev. edit buttons
                    aria-label="Save Changes" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                 <BiSave className="mr-1.5 h-4 w-4" /> Save
                </motion.button>
                <motion.button
                    onClick={handleCancel}
                    // --- Apply classes directly ---
                    className="flex  items-center px-3 py-1.5 rounded-md text-sm font-medium shadow-sm  text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 " // Adjusted padding
                    aria-label="Cancel Edit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                 <BiXCircle className="mr-1.5 h-4 w-4" /> Cancel
                </motion.button>
             </>
            ) : (
             <>
                <motion.button
                    onClick={handleDownload}
                    className="flex items-center text-sm text-gray-600 hover:text-teal-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    aria-label="Download Specification"
                >
                 <BiDownload className="mr-1.5" size={16} />
                  Download
                </motion.button>
                <motion.button
                    onClick={handleEdit}
                    className="flex items-center text-sm text-teal-600 hover:text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-md shadow-sm hover:bg-teal-100 transition-colors" // Adjusted Edit style for consistency
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    aria-label="Edit Specification" disabled={!selectedProductId}
                >
                 <BiEditAlt className="mr-1.5" size={16} />
                  Edit
                </motion.button>
             </>
            )}
        </div>
      </div>

      {/* Main Content Grid */}
      {/* --- CHANGE: Remove redundant border/padding from grid, add padding here --- */}
      <motion.div  className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 sm:p-6">
        {/* Sidebar: Product List */}
        {/* --- CHANGE: Remove border-r from sidebar --- */}
        <div className="md:col-span-1 md:pr-4">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Products</h4>
          <motion.div variants={containerVariants} className="space-y-1">
            {productList.map((product) => (
              <motion.button
                key={product.id}
                variants={itemVariants}
                onClick={() => handleSelectProduct(product.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  selectedProductId === product.id
                    ? 'bg-teal-50 border border-teal-200 text-teal-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                disabled={isEditing && selectedProductId !== product.id} // Disable switching while editing
              >
                {product.productName || `Product ${product.id}`}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Content Area: Specification Details */}
        <div className="md:col-span-3">
          {!selectedProductId ? (
            <div className="text-center text-gray-500 py-10">Select a product to view its specification.</div>
          ) : !localProductSpecData[selectedProductId] && !isEditing ? ( // Check if data exists in local store
             <div className="text-center text-gray-500 py-10">No specification data available for this product.</div>
          ) : (
             // --- CHANGE: Adjust vertical spacing in edit mode ---
            <div>
              {isEditing ? (
                 // --- Render editable fields using specForEdit ---
                 <motion.div variants={itemVariants} className={`space-y-5`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderEditableField('Product Name', 'productName', 'text')}
                    {renderEditableField('Brand Name', 'brandName', 'text')}
                  </div>
                   {renderEditableField('Product Category', 'productCategory', 'text')}
                  {renderEditableField('Product Description', 'description', 'textarea')}
                  {renderEditableField('Product Application', 'application', 'textarea')}

                   {/* --- UPDATED Image Upload Section --- */}
                   <div >
                       <label className="block text-xs font-medium text-gray-700 mb-1">Product Appearance</label>
                       <div className="mt-1">
                           {/* Hidden file input remains the same */}
                           <input
                               type="file"
                               id="product-image-upload"
                               className="hidden"
                               accept="image/*"
                               onChange={handleImageChange}
                           />
                           {/* Dashed border container */}
                           <label
                               htmlFor="product-image-upload" // Make the whole area clickable
                               className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-teal-400 transition-colors min-h-[120px]" // Added min-height
                           >
                               {specForEdit.appearance ? (
                                   // Display image preview if it exists (using specForEdit)
                                   <img
                                       src={specForEdit.appearance}
                                       alt="Product Appearance Preview"
                                       className="max-h-40 mx-auto object-contain rounded" // Adjusted styling
                                   />
                               ) : (
                                   // Display placeholder/instructions if no image
                                   <div className="text-gray-500">
                                       <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                           <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       <span className="mt-2 block text-sm font-medium">Click to upload product image</span>
                                       <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                                   </div>
                               )}
                           </label>
                       </div>
                       {/* Optional: Show file name if _appearanceFile exists */}
                       {specForEdit._appearanceFile && (
                           <p className="text-xs text-gray-600 mt-1">
                               Selected file: {specForEdit._appearanceFile.name}
                           </p>
                       )}
                   </div>
                   {/* --- END UPDATED Image Upload Section --- */}

                  {/* Ingredients */}
                  {renderEditableField('Raw Material', 'rawMaterials', 'ingredient-select')}
                  {renderEditableField('Additive & Excipients', 'additives', 'ingredient-select')}
                  {renderEditableField('Processing Aids & Solvents', 'processingAids', 'ingredient-select')}
                  {renderEditableField('Other Miscellaneous Ingredients', 'otherIngredients', 'other-ingredients')}
                </motion.div>
              ) : (
                 // --- Render display values using specForDisplay ---
                 // No changes needed here, just ensuring edit mode matches this
                <div  >
                  <div  className="grid grid-cols-1 md:grid-cols-2 ">
                    {renderDisplayValue('Product Name', specForDisplay?.productName)}
                    {renderDisplayValue('Brand Name', specForDisplay?.brandName)}
                  </div>
                  {renderDisplayValue('Product Category', specForDisplay?.productCategory)}
                  {renderDisplayValue('Product Description', specForDisplay?.description, true)}
                  {renderDisplayValue('Product Application', specForDisplay?.application, true)}

                  {/* Product Appearance */}
                  <div className="mb-5">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Product Appearance</label>
                     {/* --- CHANGE: Use derived state specForDisplay --- */}
                    {specForDisplay?.appearance ? (
                        <img src={specForDisplay.appearance} alt="Product Appearance" className="max-h-32 rounded border border-gray-200" />
                    ) : (
                        <p className="text-sm text-gray-500">No image provided.</p>
                    )}
                   </div>

                   {/* --- CHANGE: Use derived state specForDisplay --- */}
                  {renderDisplayValue('Raw Material', specForDisplay?.rawMaterials, false, true)}
                  {renderDisplayValue('Additive & Excipients', specForDisplay?.additives, false, true)}
                  {renderDisplayValue('Processing Aids & Solvents', specForDisplay?.processingAids, false, true)}
                  {renderDisplayValue('Other Miscellaneous Ingredients', specForDisplay?.otherIngredients, false, true)}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

       {/* Action Buttons for Navigating Tabs */}
       {!isEditing && (
           <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6 px-4 sm:px-6 pb-4">
               <motion.button
                   onClick={onPrevious}
                   // --- Apply classes directly ---
                   className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-gray-400"
                   whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                   disabled={isFirstTab}
               >
                   Previous
               </motion.button>
               <motion.button
                   onClick={onNext}
                   // --- Apply classes directly ---
                   className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 border border-transparent"
                   whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
               >
                   {isLastTab ? 'Approve & Continue' : 'Next'}
               </motion.button>
           </div>
       )}
    </motion.div>
  );
};

export default ProductSpecificationTab;
