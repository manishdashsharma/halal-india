// src/Pages/Client_Portal/DashboardPages/DashboardHome.jsx
import React from 'react'
import { MdOutlineFileDownload, MdContentCopy } from 'react-icons/md'
import toast from 'react-hot-toast'
import certificate from '../assets/certificate.svg'
import report from '../assets/report.svg'
import { certificateData, reportsData } from '../Dashboard.Config'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const DashboardHome = () => {

    const navigate = useNavigate()
 
    return (
        <>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#FFFBF3] to-[#E5DFF4] rounded-lg p-6 mb-6">
                <div className="flex justify-between items-end max-sm:flex-col max-sm:items-start gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">😁</span>
                            <h1 className="text-xl font-semibold">Welcome onboard</h1>
                        </div>
                        <p className="text-gray-600">
                            Complete your company profile details to <br /> initiate the certification process
                        </p>
                    </div>

                    <motion.button
                     whileTap={{scale:0.95}} 
                     onClick={() => navigate('/client-portal/profile')}
                     className="px-6 py-2 border border-black bg-white text-gray-800 rounded-md hover:bg-gray-50 transition-colors">
                        Continue
                    </motion.button>
                </div>
            </div>

            {/* Initiate Certification */}
            <div className="bg-gradient-to-r from-[#E1E5F6] to-[#D4DBF6] rounded-lg p-6 mb-6">
                <div className="flex justify-between items-end max-sm:flex-col max-sm:items-start gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">👍</span>
                            <h1 className="text-xl font-semibold">You’re all set</h1>
                        </div>
                        <p className="text-gray-600">
                            Fill out Halal application form to initiate the <br /> certification process
                        </p>
                    </div>

                    <motion.button 
                     whileTap={{scale:0.95}} 
                     className="px-6 py-2 border border-black bg-white text-gray-800 rounded-md hover:bg-gray-50 transition-colors">
                        Initiate certification
                    </motion.button>
                </div>
            </div>
            {/* View status */}
            <div className="bg-gradient-to-r from-[#F9F2DF] to-[#EBE3D2] rounded-lg p-6 mb-6">
                <div className="flex justify-between items-end max-sm:flex-col max-sm:items-start gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">⏳</span>
                            <h1 className="text-xl font-semibold"> Your application under progress </h1>
                        </div>
                        <p className="text-gray-600">
                            Once your application is approved can start filling the <br /> product details to complete the certification process
                        </p>
                    </div>

                    <motion.button 
                     whileTap={{scale:0.95}} 
                    
                    className="px-6 py-2 border border-black bg-white text-gray-800 rounded-md hover:bg-gray-50 transition-colors">
                        View status
                    </motion.button>
                </div>
            </div>

            {/* Approved */}
            <div className="bg-gradient-to-r from-[#F0F6EE] to-[#D8EBD2] rounded-lg p-6 mb-6">
                <div className="flex justify-between items-end max-sm:flex-col max-sm:items-start gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">✅</span>
                            <h1 className="text-xl font-semibold"> Your application is approved</h1>
                        </div>
                        <p className="text-gray-600">
                            You can start filling the product details to complete <br /> the certification process
                        </p>
                    </div>

                    <motion.button 
                     whileTap={{scale:0.95}} 
                    
                    className="px-6 py-2 border border-black bg-white text-gray-800 rounded-md hover:bg-gray-50 transition-colors">
                        Continue
                    </motion.button>
                </div>
            </div>

            {/* Dashboard Cards */}

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                {/* Certificate Card */}
                {certificateData?.status === 'Active' ? (
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">Certificate</h2>
                                <span className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md">{certificateData.status}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="text-blue-500 hover:underline flex items-center gap-1">
                                    <MdOutlineFileDownload className="text-xl" />
                                    <h1 className=""> Download Certificate</h1>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex  flex-wrap justify-between">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Certificate Number</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{certificateData.certificateNumber}</p>
                                            <button
                                                className="text-gray-400 hover:text-gray-600"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(certificateData.certificateNumber)
                                                    toast.success('Certificate number copied to clipboard!')
                                                }}>
                                                <MdContentCopy size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Date of Expiry</p>
                                        <p className="font-medium">{certificateData.expiryDate}</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Certificate for</p>
                                        <p className="font-medium">{certificateData.companyName}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col  items-center">
                                    <div className="w-28 h-28">
                                        <img
                                            src={certificateData.qrCode}
                                            alt="Certificate QR Code"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <button className="text-blue-500 hover:underline flex items-center gap-1">
                                        <MdOutlineFileDownload className="text-xl" />
                                        Download QR
                                    </button>
                                </div>
                            </div>
                            <div className="w-full flex justify-end">
                                <button className="bg-custom-primary text-white px-8 py-2.5 rounded-md hover:bg-opacity-90 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">Certificate</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center h-64">
                            <img
                                src={certificate}
                                alt="Certificate"
                                className="w-32 h-32 mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2"> You aren't certified Yet</h3>
                        </div>
                    </div>
                )}

                {/* Reports Card */}
                {reportsData.length > 0 ? (
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">Reports</h2>
                            <button className="text-blue-500 flex items-center gap-1 hover:underline">
                                <MdOutlineFileDownload className="text-xl" />
                                Download all
                            </button>
                        </div>

                        <div className="space-y-5">
                            {reportsData.map((report) => (
                                <div
                                    key={report.id}
                                    className="flex items-center justify-between py-1">
                                    <span className="text-gray-700">{report.title}</span>
                                    <button className="text-blue-500 hover:text-blue-600">
                                        <MdOutlineFileDownload size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold">Reports</h2>

                        <div className="flex flex-col items-center justify-center h-64">
                            <img
                                src={report}
                                alt="Reports"
                                className="w-32 h-32 mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DashboardHome
