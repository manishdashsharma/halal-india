import React from 'react';
import { FiDownload, FiFile } from 'react-icons/fi';
import { motion } from 'motion/react';

function AgreementsAndNDAs({ onNext, onBack }) {

  // Placeholder data these data should come form prop
  const agreements = [
    { id: 1, name: 'Non disclosure agreement', status: 'Accepted' },
    { id: 2, name: 'Standard logo mark agreement', status: 'pending' },
  ];

  // Status badge styling - Matches the solid green badge in the image
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        // Using a teal color that's often used for success states in Tailwind,
        // and looks similar to the image's green. Adjust hex code if needed.
        return 'bg-custom-primary text-white';
      case 'pending':return 'bg-red-400 text-white'
      default:
        return 'bg-gray-100 text-gray-800'; // Fallback
    }
  };

  // Download button styling - Subtle button with icon
  const downloadButtonClass = 'text-sm text-gray-600 hover:text-gray-800 flex items-center px-2 py-1 rounded hover:bg-gray-100';
  // Download All button styling - More prominent button
  const downloadAllButtonClass = 'text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200 shadow-sm';

  // Back/Next button classes matching the image
  const backButtonClass = 'px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm focus:outline-none ';
  const nextButtonClass = 'px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-primary hover:bg-teal-700 focus:outline-none  '; // Teal matches image well

  return (
    // Wrap the container with motion.div and add animation props
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Info Text Box - Matches the light grey box */}
      <div className="bg-gray-50 border border-gray-200 p-3 rounded-md mb-5">
         <p className="text-sm  text-gray-600 text-center"> {/* Centered text */}
             Following Agreements and NDAs are required for the certification
         </p>
      </div>


      {/* List Header */}
      <div className="flex justify-between items-center mb-4"> {/* Adjusted margin */}
        <h3 className="text-lg font-semibold text-gray-800">List</h3>
        <button className={downloadAllButtonClass}>
           <FiDownload className="h-4 w-4 mr-1 text-gray-500" />
           Download All
        </button>
      </div>

      {/* Agreement List */}
      <ul className="space-y-2.5"> {/* Adjusted spacing between items */}
        {agreements.map(agreement => (
          <li key={agreement.id} className="bg-white border border-gray-200 rounded-md p-3 flex justify-between items-center">
            {/* Left: Icon and Name */}
            <div className="flex items-center space-x-3">
               <FiFile className="h-5 w-5 text-gray-400" />
               <span className="text-sm text-gray-800 font-medium">{agreement.name}</span> {/* Adjusted font */}
            </div>

            {/* Right: Actions (Download Button and Status Badge) */}
            <div className="flex items-center space-x-4"> {/* Adjusted spacing */}
                <button className={downloadButtonClass}>
                    <FiDownload className="h-4 w-4 mr-1 text-gray-500" />
                    Download
                </button>
                {/* Adjusted badge padding/size and applied style */}
                <span className={`px-3 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(agreement.status)}`}>
                    {agreement.status}
                </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Navigation Buttons SPECIFIC to this tab - Styled as per image */}
      <div className="flex justify-end space-x-3 mt-8"> {/* Adjusted margin */}
         <button
            className={backButtonClass}
            onClick={onBack} // Use passed handler or define inline
         >
            Back
         </button>
         <button
            className={nextButtonClass}
            onClick={onNext} // Use passed handler or define inline
        >
            Next
         </button>
       </div>
    </motion.div>
  );
}

export default AgreementsAndNDAs;

