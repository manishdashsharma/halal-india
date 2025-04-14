import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiCheckCircle, FiX } from 'react-icons/fi'; // *** Use react-icons/fi ***
import certificate from '../../../assets/certificate.svg'

const StatusConfirmationModal = ({ isOpen, onClose, onConfirmStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(null); // 'Safe', 'Doubtful', 'Critical'

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirmStatus(selectedStatus);
      // Optional: Reset status after confirm if modal might reopen
      // setSelectedStatus(null);
    } else {
      // Handle case where no status is selected, maybe show a message
      console.warn('Please select a status before confirming.');
    }
  };

  const handleClose = () => {
      setSelectedStatus(null); // Reset status on close
      onClose();
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000027] p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleClose} // Close on backdrop click
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <div className='flex  items-center justify-between mt-[-10px] mb-6'>

            <h3 className="text-md font-semibold text-gray-800 ">Select status and continue</h3>

            <motion.button
              onClick={handleClose}
              className="  text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX className="h-6 w-6" />
            </motion.button>
            </div>

            <div className="text-center">
              {/* Illustration/Icon */}
              <div className="mx-auto mb-4 flex h-[100px] w-[100px] items-center justify-center ">
                {/* <FiCheckCircle className="h-10 w-10" /> */}
                 <img src={certificate} className="h-[100px] w-auto" />
                 {/* Or use an <img> tag if you have an image file */}
              </div>

              <p className="text-sm text-gray-500 mb-6">
                You have completed and approved all the steps. Forward application to the next department to complete the certification process
              </p>

              {/* Status Selection */}
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-700 mb-3">Select Status</p>
                <div className="flex justify-center space-x-3">
                  {['Safe', 'Doubtful', 'Critical'].map((status) => (
                    <motion.button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      whileHover={{ scale: 1.05, }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-150 ease-in-out focus:outline-none
                        ${selectedStatus === status
                          ? status === 'Safe' ? 'bg-green-500 border-green-500 text-white shadow-md'
                          : status === 'Doubtful' ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                          : 'bg-red-600 border-red-600 text-white shadow-md'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                        }`}
                     
                    >
                      {status}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-3 space-y-2 sm:space-y-0">
                <motion.button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-md text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none shadow-sm w-full sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Review back
                </motion.button>
                <motion.button
                  onClick={handleConfirm}
                  disabled={!selectedStatus}
                  className={`px-6 py-2.5 rounded-md text-sm font-medium text-white shadow-sm focus:outline-none w-full sm:w-auto transition-colors duration-200
                    ${!selectedStatus ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}
                  whileHover={{ scale: selectedStatus ? 1.03 : 1 }}
                  whileTap={{ scale: selectedStatus ? 0.97 : 1 }}
                >
                  Move to RND
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatusConfirmationModal;
