import React, { useState, useEffect } from 'react'
import { BiDownload, BiEdit, BiTrash, BiPlus, BiLinkExternal, BiSave, BiXCircle } from 'react-icons/bi'
import { motion } from 'motion/react'

// Dummy data for demonstration - replace with actual props later
const dummyCoaData = [
    {
        id: 1,
        productId: 'beef-bar', // Assuming an ID reference
        productName: 'Beef Bar', // Display name
        provider: 'SK Laboratories',
        managerName: 'Ahmed Maqsood',
        managerContact: '9876543219',
        certificateFileName: 'COAcertificate.pdf',
        certificateFileUrl: '#', // Placeholder URL
        certificateFile: null // Placeholder for File object in edit mode
    },
    {
        id: 2,
        productId: 'chicken-snack',
        productName: 'Chicken snack',
        provider: 'SK Laboratories',
        managerName: 'Ahmed Maqsood',
        managerContact: '9876543219',
        certificateFileName: 'COAcertificate.pdf',
        certificateFileUrl: '#',
        certificateFile: null
    },
    {
        id: 3,
        productId: 'oat-meal',
        productName: 'Oat meal',
        provider: 'SK Laboratories',
        managerName: 'Ahmed Maqsood',
        managerContact: '9876543219',
        certificateFileName: 'COAcertificate.pdf',
        certificateFileUrl: '#',
        certificateFile: null
    }
]

// Dummy product list for the dropdown - replace with actual props if needed
const dummyProductList = [
    { id: 'beef-bar', productName: 'Beef Bar' },
    { id: 'chicken-snack', productName: 'Chicken Snack' },
    { id: 'oat-meal', productName: 'Oat Meal' },
    { id: 'whey-protein', productName: 'Whey Protein' }
]


const CoaTab = ({
    coaData = dummyCoaData,
    productList = dummyProductList, // Pass actual product list for dropdown
    onSave: onSaveProp, // Rename incoming save prop if needed
    onPrevious, // <-- Expect goToPreviousSubTab here
    onNext, // <-- Expect onConfirm here
    isFirstTab,
    isLastTab // <-- Should be true here
}) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [internalCoaData, setInternalCoaData] = useState([])

    // Sync internal state when initial data changes
    useEffect(() => {
        setInternalCoaData(coaData.map((item) => ({ ...item, certificateFile: null }))) // Initialize internal state, reset file objects
    }, [coaData])

    // Rename internal save handler
    const handleInternalSave = () => {
        console.log('Saving COA data:', internalCoaData)
        // Call the onSave prop if provided (might be for API update)
        if (onSaveProp) {
            onSaveProp(internalCoaData)
        }
        setIsEditMode(false)
    }

    const handleCancelEdit = () => {
        // Reset internal state to original data when cancelling
        setInternalCoaData(coaData.map((item) => ({ ...item, certificateFile: null })))
        setIsEditMode(false)
    }

    const handleInputChange = (id, field, value) => {
        setInternalCoaData(internalCoaData.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    }

    const handleFileChange = (id, file) => {
        setInternalCoaData(
            internalCoaData.map((item) =>
                item.id === id ? { ...item, certificateFile: file, certificateFileName: file?.name || item.certificateFileName } : item
            )
        )
    }

    const handleRemoveFile = (id) => {
        setInternalCoaData(
            internalCoaData.map((item) =>
                item.id === id ? { ...item, certificateFile: null, certificateFileName: null /* Or keep original name? */ } : item
            )
        )
    }

    const handleAddRow = () => {
        const newId = internalCoaData.length ? Math.max(...internalCoaData.map((item) => item.id)) + 1 : 1
        setInternalCoaData([
            ...internalCoaData,
            {
                id: newId,
                productId: '',
                productName: '', // Will be set based on productId selection
                provider: '',
                managerName: '',
                managerContact: '',
                certificateFileName: '',
                certificateFileUrl: null,
                certificateFile: null
            }
        ])
    }

    const handleRemoveRow = (id) => {
        setInternalCoaData(internalCoaData.filter((item) => item.id !== id))
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } } // Adjusted stagger
    }
    
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }
    

    return (
        <motion.div
            // variants={containerVariants}
            // initial="hidden"
            // animate="visible"
            className=" bg-white rounded-lg shadow-xl ">
            <div className="flex justify-between items-center  p-4  border-b border-gray-200 bg-gray-50 ">
                <h3 className="text-lg font-medium text-gray-700">COA (Certificate of analysis)</h3>
                <div className="flex space-x-2">
                    {isEditMode ? (
                        <>
                            <motion.button
                                onClick={handleInternalSave}
                                // --- Apply classes directly (green version) ---
                                className="flex  items-center px-3 py-1.5 rounded-md text-sm font-medium shadow-sm  text-white bg-teal-600 hover:bg-teal-700  border border-transparent" // Adjusted padding to match prev. edit buttons
                                aria-label="Save Changes"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}>
                                <BiSave className="mr-1.5 h-4 w-4" /> Save
                            </motion.button>
                            <motion.button
                                onClick={handleCancelEdit}
                                // --- Apply classes directly ---
                                className="flex  items-center px-3 py-1.5 rounded-md text-sm font-medium shadow-sm  text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 " // Adjusted padding
                                aria-label="Cancel Edit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}>
                                <BiXCircle className="mr-1.5 h-4 w-4" /> Cancel
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center space-x-3">
                                <motion.button
                                    className="flex items-center text-sm text-gray-600 hover:text-teal-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => console.log('Download clicked')} // Add download logic
                                >
                                    <BiDownload
                                        className="mr-1.5"
                                        size={16}
                                    />
                                    Download
                                </motion.button>
                                <motion.button
                                    className="flex items-center text-sm text-teal-600 hover:text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-md shadow-sm hover:bg-teal-100 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditMode(true)}>
                                    <BiEdit
                                        className="mr-1.5"
                                        size={16}
                                    />
                                    Edit
                                </motion.button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Conditional Rendering: Edit Mode vs View Mode */}
            {isEditMode ? (
                // EDIT MODE: Layout similar to Certification.jsx
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6 px-1 pb-2">
                    {internalCoaData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="relative border rounded-lg p-4 pt-8">
                            {' '}
                            {/* Added padding top */}
                            <span className="absolute top-2 left-4 text-sm font-medium text-gray-500">
                                SL No {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* COA Product Name (Select) */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">COA Product Name *</label>
                                    <select
                                        value={item.productId}
                                        onChange={(e) => {
                                            const selectedProdId = e.target.value
                                            const selectedProd = productList.find((p) => p.id === selectedProdId)
                                            handleInputChange(item.id, 'productId', selectedProdId)
                                            handleInputChange(item.id, 'productName', selectedProd?.productName || '') // Update name based on selection
                                        }}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                                        <option value="">Select product</option>
                                        {productList.map((product) => (
                                            <option
                                                key={product.id}
                                                value={product.id}>
                                                {product.productName || `Product ${product.id}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* COA certification provider */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">COA certification provider</label>
                                    <input
                                        type="text"
                                        value={item.provider}
                                        onChange={(e) => handleInputChange(item.id, 'provider', e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                        placeholder="e.g., SK Laboratories"
                                    />
                                </div>
                                {/* Manager of Laboratory */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Manager of Laboratory</label>
                                    <input
                                        type="text"
                                        value={item.managerName}
                                        onChange={(e) => handleInputChange(item.id, 'managerName', e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                        placeholder="e.g., Ahmed Maqsood"
                                    />
                                </div>
                                {/* Contact no Manager of Laboratory */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Contact no Manager of Laboratory</label>
                                    <input
                                        type="text" // Consider type="tel"
                                        value={item.managerContact}
                                        onChange={(e) => handleInputChange(item.id, 'managerContact', e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                        placeholder="e.g., 9876543210"
                                    />
                                </div>
                                {/* Certificate Upload */}
                                <div className="md:col-span-2">
                                    {' '}
                                    {/* Spanning 2 columns for better layout */}
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Certificate Upload</label>
                                    <div className="flex items-center space-x-2 relative border rounded pr-1">
                                        <input
                                            type="text"
                                            value={item.certificateFile?.name || item.certificateFileName || ''} // Show selected file name or existing name
                                            readOnly
                                            placeholder="Choose file to upload"
                                            className="flex-1 p-2 w-[60%] rounded text-sm bg-gray-50 border-none focus:outline-none"
                                        />
                                        {/* Remove File Button */}
                                        {(item.certificateFile || item.certificateFileName) && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(item.id)}
                                                className="text-red-500 hover:text-red-700 text-xl font-bold px-1"
                                                title="Remove File">
                                                &times;
                                            </button>
                                        )}
                                        <input
                                            type="file"
                                            id={`coa-file-edit-${item.id}`}
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg,.png" // Example accepted types
                                            onChange={(e) => {
                                                if (e.target.files.length > 0) {
                                                    handleFileChange(item.id, e.target.files[0])
                                                }
                                                e.target.value = null // Reset file input
                                            }}
                                        />
                                        <label
                                            htmlFor={`coa-file-edit-${item.id}`}
                                            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 cursor-pointer whitespace-nowrap">
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Remove Row Button */}
                            <button
                                onClick={() => handleRemoveRow(item.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                title="Remove Row">
                                <BiTrash size={18} />
                            </button>
                        </motion.div>
                    ))}
                    {/* Add Row Button */}
                    <button
                        onClick={handleAddRow}
                        className="flex items-center text-blue-500 hover:text-blue-700 mt-2">
                        <BiPlus
                            size={20}
                            className="mr-1"
                        />{' '}
                        Add Row
                    </button>
                    {internalCoaData.length === 0 && (
                        <p className="text-center text-sm text-gray-500 py-4">No COA data entered yet. Click "Add Row" to start.</p>
                    )}
                </motion.div>
            ) : (
                // VIEW MODE: Table structure
                <div
                    
                    className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SL No.
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    COA product name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    COA certification provider
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Manager of Laboratory
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact no Manager of Laboratory
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Certification Upload
                                </th>
                                {/* No Actions column in view mode */}
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            className="bg-white divide-y divide-gray-200">
                            {internalCoaData.map((item, index) => (
                                <motion.tr
                                    key={item.id}
                                    variants={itemVariants}
                                    className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {item.productName || <span className="text-gray-400">N/A</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {item.provider || <span className="text-gray-400">N/A</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {item.managerName || <span className="text-gray-400">N/A</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {item.managerContact || <span className="text-gray-400">N/A</span>}
                                    </td>
                                    {/* Certification Upload Link */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {item.certificateFileName ? (
                                            <a
                                                href={item.certificateFileUrl || '#'} // Use actual URL if available
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center ${item.certificateFileUrl ? 'text-blue-600 hover:text-blue-800 hover:underline' : 'text-gray-500 cursor-not-allowed'}`}
                                                title={item.certificateFileUrl ? `View ${item.certificateFileName}` : 'File URL not available'}
                                                onClick={(e) => !item.certificateFileUrl && e.preventDefault()} // Prevent click if no URL
                                            >
                                                {item.certificateFileName}
                                                {item.certificateFileUrl && <BiLinkExternal className="ml-1" />}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">No file</span>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                            {/* Show message if no data */}
                            {internalCoaData.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-4 text-center text-sm text-gray-500">
                                        No COA data available.
                                    </td>
                                </tr>
                            )}
                        </motion.tbody>
                    </table>
                </div>
            )}

            {/* --- Action Buttons for Navigating Tabs --- */}
            {!isEditMode && ( // Only show nav buttons when not editing the COA form
                <div className="flex justify-end space-x-3 mt-8 border-t border-gray-200 pt-6 px-4 sm:px-6 pb-4">
                    <motion.button
                        onClick={onPrevious} // Calls goToPreviousSubTab
                        className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-gray-400"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isFirstTab} // Should be false here
                    >
                        Previous
                    </motion.button>
                    <motion.button
                        onClick={onNext} // Calls onConfirm because isLastTab is true
                        className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 border border-transparent"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}>
                        Approve & Continue {/* // Text changes because isLastTab is true */}
                    </motion.button>
                </div>
            )}
        </motion.div>
    )
}

export default CoaTab
