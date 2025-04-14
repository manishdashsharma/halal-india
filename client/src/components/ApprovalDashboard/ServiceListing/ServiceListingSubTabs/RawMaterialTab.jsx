import React, { useState } from 'react'
import { motion } from 'motion/react'
import { BiDownload, BiEdit, BiTrash, BiPlus, BiLink, BiX, BiSave, BiXCircle } from 'react-icons/bi' // Added BiLink, BiX

// Dummy data - replace with props later
const initialRawMaterialData = [
    {
        id: 1,
        slNo: 1,
        rawMaterialName: 'Baking Soda',
        category: 'Acid regulators',
        usage: 'Cooking essential',
        brandName: 'Super Baking Soda',
        manufacturerName: 'ITC',
        billFile: { name: 'bill_soda_batch1.pdf' }
    },
    {
        id: 2,
        slNo: 2,
        rawMaterialName: 'Soy Lecithin',
        category: 'Emulsifiers',
        usage: 'Ingredient',
        brandName: 'LecithinPro',
        manufacturerName: 'Global Ingredients',
        billFile: { name: 'lecithin_invoice_q3.docx' }
    },
    {
        id: 3,
        slNo: 3,
        rawMaterialName: 'Citric Acid',
        category: 'Acid regulators',
        usage: 'Preservative',
        brandName: 'CitroPure',
        manufacturerName: 'ChemSource',
        billFile: null
    }
]

// Helper function to get file icon (example)
const getFileIcon = (fileName) => {
    if (!fileName) return null
    const extension = fileName.split('.').pop()?.toLowerCase()
    if (extension === 'pdf') return <span className="text-red-500 font-bold text-xs mr-1">PDF</span>
    if (['doc', 'docx'].includes(extension)) return <span className="text-blue-500 font-bold text-xs mr-1">DOC</span>
    // Add more icons as needed
    return <BiLink className="mr-1 text-gray-500" />
}

const RawMaterialTab = ({
    rawMaterialData = initialRawMaterialData,
    onPrevious, // <-- Expect goToPreviousSubTab here
    onNext, // <-- Expect goToNextSubTab or onConfirm here
    isFirstTab,
    isLastTab
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [materialList, setMaterialList] = useState(rawMaterialData.map((m) => ({ ...m }))) // Use state for potential edits

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        // Optionally reset changes
        // setMaterialList(rawMaterialData.map(m => ({ ...m })));
    }

    const handleSave = () => {
        // TODO: Implement save logic (e.g., API call)
        console.log('Saving raw material list:', materialList)
        setIsEditing(false)
    }

    // --- Handlers for Edit Form (similar to Certification.jsx) ---
    const handleAddRawMaterial = () => {
        setMaterialList([
            ...materialList,
            {
                id: materialList.length ? Math.max(...materialList.map((m) => m.id)) + 1 : 1,
                slNo: materialList.length + 1,
                rawMaterialName: '',
                category: '',
                usage: '',
                brandName: '',
                manufacturerName: '',
                billFile: null
            }
        ])
    }

    const handleRemoveRawMaterial = (id) => {
        setMaterialList(materialList.filter((material) => material.id !== id).map((m, index) => ({ ...m, slNo: index + 1 })))
    }

    const handleRawMaterialChange = (id, field, value) => {
        setMaterialList(materialList.map((material) => (material.id === id ? { ...material, [field]: value } : material)))
    }

    // Animation variants (same as ProductListingTab)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } } // Adjusted stagger
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    // if (isEditing) {
    //     // --- EDITING VIEW ---
    //     return (
    //         <motion.div
    //             className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
    //             initial={{ opacity: 0, scale: 0.98 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             transition={{ duration: 0.3 }}>
    //             <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Raw Material / Ingredient List</h3>
               
    //         </motion.div>
    //     )
    // }

    // --- DISPLAY VIEW ---
    return (
        <motion.div
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Raw Material / Ingredient List</h3>

                <div className="flex justify-end space-x-3">
                    {isEditing ? (
                        <>
                        <motion.button
                            onClick={handleSave}
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
                            <motion.button
                                className="flex items-center text-sm text-gray-600 hover:text-teal-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => console.log('Download Raw Material clicked')} // Add download logic
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
                                onClick={handleEditClick}>
                                <BiEdit
                                    className="mr-1.5"
                                    size={16}
                                />
                                Edit
                            </motion.button>
                        </>
                    )}
                </div>
            </div>

            {/* Table */}

            {isEditing? (
                <>
                     <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    {materialList.map((material, index) => (
                        <motion.div
                            key={material.id}
                            className="relative border border-gray-200 rounded-lg p-4 bg-gray-50/50"
                            variants={itemVariants}>
                            <h4 className="text-md font-medium text-gray-700 mb-4">SL No {String(material.slNo).padStart(2, '0')}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Row 1 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Raw Material Name</label>
                                    <input
                                        type="text"
                                        value={material.rawMaterialName}
                                        onChange={(e) => handleRawMaterialChange(material.id, 'rawMaterialName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        placeholder="Enter material name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                                    <select
                                        value={material.category}
                                        onChange={(e) => handleRawMaterialChange(material.id, 'category', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white">
                                        <option value="">Select category</option>
                                        <option value="Acid regulators">Acid regulators</option>
                                        <option value="Preservatives">Preservatives</option>
                                        <option value="Emulsifiers">Emulsifiers</option>
                                        <option value="Flavoring agent">Flavoring agent</option>
                                        {/* Add more categories */}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Usage</label>
                                    <select
                                        value={material.usage}
                                        onChange={(e) => handleRawMaterialChange(material.id, 'usage', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white">
                                        <option value="">Select usage</option>
                                        <option value="Cooking essential">Cooking essential</option>
                                        <option value="Flavoring agent">Flavoring agent</option>
                                        <option value="Ingredient">Ingredient</option>
                                        <option value="Preservative">Preservative</option>
                                        {/* Add more usages */}
                                    </select>
                                </div>
                                {/* Row 2 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Brand Name</label>
                                    <input
                                        type="text"
                                        value={material.brandName}
                                        onChange={(e) => handleRawMaterialChange(material.id, 'brandName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        placeholder="Enter brand name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Manufacturer Name</label>
                                    <input
                                        type="text"
                                        value={material.manufacturerName}
                                        onChange={(e) => handleRawMaterialChange(material.id, 'manufacturerName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        placeholder="Enter manufacturer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Bill Upload</label>
                                    <div className="flex items-center space-x-2 relative border border-gray-300 rounded bg-white pr-1">
                                        <input
                                            type="text"
                                            value={material.billFile?.name || ''}
                                            readOnly
                                            placeholder="No file chosen"
                                            className="flex-1 p-2 w-full rounded text-sm text-gray-700 focus:outline-none bg-transparent truncate"
                                        />
                                        {material.billFile && (
                                            <button
                                                onClick={() => handleRawMaterialChange(material.id, 'billFile', null)}
                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                title="Remove file">
                                                <BiX size={18} />
                                            </button>
                                        )}
                                        <input
                                            type="file"
                                            id={`bill-file-${material.id}`}
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files?.length) {
                                                    handleRawMaterialChange(material.id, 'billFile', e.target.files[0])
                                                }
                                                // e.target.value = null; // Reset file input visually if needed, though not strictly necessary with controlled component
                                            }}
                                        />
                                        <label
                                            htmlFor={`bill-file-${material.id}`}
                                            className="px-2 py-1.5 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 cursor-pointer border-l border-gray-300 whitespace-nowrap">
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveRawMaterial(material.id)}
                                className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                                title="Remove Row">
                                <BiTrash size={18} />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                <button
                    onClick={handleAddRawMaterial}
                    className="mt-4 flex items-center text-teal-600 hover:text-teal-800 text-sm font-medium px-3 py-1 rounded hover:bg-teal-50 transition-colors">
                    <BiPlus
                        size={18}
                        className="mr-1"
                    />{' '}
                    Add Row
                </button>
                </>
            ):(

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                                SL No.
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Raw Material Name
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usage
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Brand Name
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Manufacturer Name
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bill Uploaded
                            </th>
                        </tr>
                    </thead>
                    <motion.tbody
                        className="bg-white divide-y divide-gray-200"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible">
                        {materialList.map((material) => (
                            <motion.tr
                                key={material.id}
                                variants={itemVariants}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {String(material.slNo).padStart(2, '0')}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{material.rawMaterialName}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{material.category}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{material.usage}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{material.brandName}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{material.manufacturerName}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {material.billFile?.name ? (
                                        <span className="inline-flex items-center text-green-700">
                                            {getFileIcon(material.billFile.name)}
                                            <span className="truncate max-w-[150px]">{material.billFile.name}</span>
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 italic">No file</span>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                        {materialList.length === 0 && (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-6 text-sm text-gray-500 italic">
                                    No raw materials listed.
                                </td>
                            </tr>
                        )}
                    </motion.tbody>
                </table>
            </div>

            )}

            {/* --- Action Buttons for Display Mode --- */}
            {!isEditing && (
            <div className="flex justify-end space-x-3 mt-8 border-t border-gray-200 pt-6">
                <motion.button
                    onClick={onPrevious} // Calls goToPreviousSubTab
                    className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-gray-400"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isFirstTab} // Should not be disabled here, but good practice
                >
                    Previous
                </motion.button>
                <motion.button
                    onClick={onNext} // Calls goToNextSubTab or onConfirm
                    className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 border border-transparent"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}>
                    {isLastTab ? 'Approve & Continue' : 'Next'}
                </motion.button>
            </div>

            )}
        </motion.div>
    )
}

export default RawMaterialTab
