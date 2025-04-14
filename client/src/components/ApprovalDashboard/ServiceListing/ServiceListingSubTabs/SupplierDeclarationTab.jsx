import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BiDownload } from 'react-icons/bi';

// Placeholder content (Adjust title, paragraphs for Supplier Declaration)
const placeholderDeclarationContent = {
    supplierDeclaration: {
        title: 'Supplier declaration',
        // paragraphs array can be here if needed for download logic
        paragraphs: [ /* ... Add relevant supplier declaration paragraphs ... */ ],
    },
};

const SupplierDeclarationTab = ({
    // Pass appropriate props
    declarationTitle = placeholderDeclarationContent.supplierDeclaration.title,
    initialStatus = 'Accepted', // 'Pending' or 'Accepted'
    onPrevious,
    onNext,
    isFirstTab,
    isLastTab,
}) => {
    const [status, setStatus] = useState(initialStatus);

    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);

    const handleDownload = () => {
        // TODO: Implement download logic using full declarationData if available
        console.log('Download Declaration:', declarationTitle);
    };

    // Status badge styling (same function)
    const getStatusClass = (currentStatus) => {
        switch (currentStatus?.toLowerCase()) {
            case 'accepted':
                return 'bg-teal-100 text-teal-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
    };

    // --- DISPLAY VIEW ONLY ---
    return (
        <motion.div
            key="supplier-declaration-display" // Unique key
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{declarationTitle}</h3>
                <div className="flex items-center space-x-3">
                    <motion.button
                        onClick={handleDownload}
                        className="flex items-center text-sm text-gray-600 hover:text-teal-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                        <BiDownload className="mr-1.5" size={16} /> Download
                    </motion.button>
                </div>
            </div>

            {/* Content Area: Display Title and Status */}
            <motion.div variants={containerVariants} className="p-6 min-h-[200px] flex items-center justify-center">
                 <div className="w-full  bg-white border border-gray-200 rounded-md p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-800 font-medium">{declarationTitle}</span>
                    </div>
                    <span className={`px-3 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap ${getStatusClass(status)}`}>
                        {status}
                    </span>
                 </div>
            </motion.div>

            {/* Action Buttons (Footer) */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                <motion.button
                    onClick={onPrevious}
                    className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-gray-400 disabled:opacity-50"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    disabled={isFirstTab}
                >
                    Back
                </motion.button>
                <motion.button
                    onClick={onNext}
                    className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 border border-transparent disabled:opacity-50"
                    whileHover={status === 'Accepted' ? { scale: 1.03 } : {}}
                    whileTap={status === 'Accepted' ? { scale: 0.98 } : {}}
                    disabled={status !== 'Accepted'}
                >
                    {isLastTab ? 'Approve & Continue' : 'Next'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default SupplierDeclarationTab; 