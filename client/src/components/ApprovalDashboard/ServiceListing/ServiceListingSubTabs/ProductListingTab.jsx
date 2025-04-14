import React, { useState } from 'react'
import { motion } from 'motion/react'
import { BiDownload, BiEdit, BiTrash, BiPlus, BiSave, BiXCircle } from 'react-icons/bi' // Added BiEdit

// Dummy data - replace with props later
const initialProductData = [
    { id: 1, slNo: 1, productName: 'Beef bar', category: 'Meat, seafood, and poultry', usage: 'Ready to eat products' },
    { id: 2, slNo: 2, productName: 'Oat meal', category: 'Eggs and egg products', usage: 'Ready to eat products' },
    { id: 3, slNo: 3, productName: 'Chicken snacks', category: 'Flavor Enhancers', usage: 'Ready to eat products' },
    { id: 4, slNo: 4, productName: 'Protein bar', category: 'Antifoaming agents', usage: 'Ready to eat products' }
]

const ProductListingTab = ({
    productData = initialProductData,
    onPrevious, // <-- Expect main onBack here
    onNext, // <-- Expect goToNextSubTab here
    isFirstTab, // <-- To determine button labels/actions
    isLastTab
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [productList, setProductList] = useState(productData.map((p) => ({ ...p }))) // Use state for potential edits

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        // Optionally reset changes if needed
        // setProductList(productData.map(p => ({...p})));
    }

    const handleSave = () => {
        // TODO: Implement save logic (e.g., API call)
        console.log('Saving product list:', productList)
        setIsEditing(false)
    }

    // --- Handlers for Edit Form (similar to Certification.jsx) ---
    const handleAddProduct = () => {
        setProductList([
            ...productList,
            {
                id: productList.length ? Math.max(...productList.map((p) => p.id)) + 1 : 1, // Basic ID generation
                slNo: productList.length + 1, // Adjust SL No based on current length
                productName: '',
                category: '',
                usage: ''
            }
        ])
    }

    const handleRemoveProduct = (id) => {
        setProductList(productList.filter((product) => product.id !== id).map((p, index) => ({ ...p, slNo: index + 1 }))) // Recalculate slNo
    }

    const handleProductChange = (id, field, value) => {
        setProductList(productList.map((product) => (product.id === id ? { ...product, [field]: value } : product)))
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    // --- DISPLAY VIEW ---
    return (
        <motion.div
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            {/* Header with Title and Actions */}
            <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Product Listing</h3>

                <div className="flex items-center space-x-3">
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
                                <BiXCircle   className="mr-1.5 h-4 w-4" /> Cancel
                            </motion.button>
                        </>
                    ) : (
                        <>
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
            {isEditing ? (
                <div className="space-y-6">
                    {productList.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="relative border border-gray-200 rounded-lg p-4 bg-gray-50/50"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible">
                            <h4 className="text-md font-medium text-gray-700 mb-4">Product {String(product.slNo).padStart(2, '0')}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        value={product.productName}
                                        onChange={(e) => handleProductChange(product.id, 'productName', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        placeholder="Enter product name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                                    <select
                                        value={product.category}
                                        onChange={(e) => handleProductChange(product.id, 'category', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white">
                                        <option value="">Select category</option>
                                        {/* Consider fetching categories dynamically or passing them as props */}
                                        <option value="Meat, seafood, and poultry">Meat, seafood, and poultry</option>
                                        <option value="Eggs and egg products">Eggs and egg products</option>
                                        <option value="Flavor Enhancers">Flavor Enhancers</option>
                                        <option value="Antifoaming agents">Antifoaming agents</option>
                                        <option value="Dairy products">Dairy products</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Usage</label>
                                    <select
                                        value={product.usage}
                                        onChange={(e) => handleProductChange(product.id, 'usage', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white">
                                        <option value="">Select usage</option>
                                        <option value="Ready to eat products">Ready to eat products</option>
                                        <option value="Cooking required">Cooking required</option>
                                        <option value="Ingredient">Ingredient</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveProduct(product.id)}
                                className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                                title="Remove Product">
                                <BiTrash size={18} />
                            </button>
                        </motion.div>
                    ))}

                    <button
                        onClick={handleAddProduct}
                        className="flex items-center text-teal-600 hover:text-teal-800 text-sm font-medium px-3 py-1 rounded hover:bg-teal-50 transition-colors">
                        <BiPlus
                            size={18}
                            className="mr-1"
                        />{' '}
                        Add Product Row
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                                    SL No.
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Usage
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {productList.map((product) => (
                                <motion.tr
                                    key={product.id}
                                    variants={itemVariants}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {String(product.slNo).padStart(2, '0')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.productName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.usage}</td>
                                </motion.tr>
                            ))}
                            {productList.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-6 text-sm text-gray-500">
                                        No products listed.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- Action Buttons for Display Mode --- */}
            {!isEditing && (
                <div className="flex justify-end space-x-3 mt-8 border-t border-gray-200 pt-6">
                    <motion.button
                        onClick={onPrevious}
                        className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-gray-400"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}>
                        Back
                    </motion.button>
                    <motion.button
                        onClick={onNext}
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

export default ProductListingTab
