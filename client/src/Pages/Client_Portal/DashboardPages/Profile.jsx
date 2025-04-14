import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Card } from '../../../components/ui/card'
import { FiPlus, FiX, FiEdit, FiTrash2, FiUsers, FiFile } from 'react-icons/fi'
import { AiOutlineFileImage, AiOutlineFilePdf, AiOutlineFileJpg } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import toast from 'react-hot-toast'

const Profile = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('company')

    // Animation variants
    const tabContentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0} }
    };

    const [formData, setFormData] = useState({
        name: '',
        position: '',
        companyName: '',
        officialNumber: '',
        email: '',
        websiteUrl: '',
        address: '',
        pan: '',
        logo: null,
        incorporation: null,
        moa: null,
        signatory: null,
        seal: null,
        fssai: null,
        // Director's details
        directorName: '',
        directorPhone: '',
        directorPan: '',
        directorEmail: '',
        directorPanCard: null,
        directorIdProof: null,
        directorSignature: null
    })

    const [directors, setDirectors] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target
        if (files && files[0]) {
            const file = files[0]
            const isPdf = file.type === 'application/pdf'

            setFormData((prev) => ({
                ...prev,
                [name]: {
                    file: file,
                    fileName: file.name,
                    isPdf: isPdf,
                    preview: isPdf ? null : URL.createObjectURL(file)
                }
            }))
        }
    }

    const removeDocument = (docName) => {
        setFormData((prev) => ({
            ...prev,
            [docName]: null
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Check if all required company fields are filled
        const requiredCompanyFields = [
            'name', 'position', 'companyName', 'officialNumber', 
            'email', 'websiteUrl', 'address', 'pan'
        ]
        
        const requiredFiles = [
            'logo', 'incorporation', 'moa', 'signatory', 'seal', 'fssai'
        ]
        
        // Check required text fields
        for (const field of requiredCompanyFields) {
            if (!formData[field]) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`)
                setActiveTab('company')
                return
            }
        }
        
        // Check required files
        for (const file of requiredFiles) {
            if (!formData[file]) {
                toast.error(`${file.charAt(0).toUpperCase() + file.slice(1)} file is required`)
                setActiveTab('company')
                return
            }
        }
        
        // Check if at least one director is added
        if (directors.length === 0) {
            toast.error('At least one director is required')
            setActiveTab('director')
            return
        }
        
        // Create a complete data object with company details and all directors
        const completeData = {
            companyDetails: {
                // Company details from formData
                name: formData.name,
                position: formData.position,
                companyName: formData.companyName,
                officialNumber: formData.officialNumber,
                email: formData.email,
                websiteUrl: formData.websiteUrl,
                address: formData.address,
                pan: formData.pan,
                logo: formData.logo.file,
                incorporation: formData.incorporation.file,
                moa: formData.moa.file,
                signatory: formData.signatory.file,
                seal: formData.seal.file,
                fssai: formData.fssai.file
            },
            directors: directors // The array of all added directors
        }

        // Now you can send completeData to your API
        toast.success('Profile saved successfully')
        navigate('/client-portal/certification')
    }

    const addDirector = () => {
        // Basic validation
        if (!formData.directorName || !formData.directorEmail || !formData.directorPhone || !formData.directorPan || !formData.directorPanCard || !formData.directorIdProof || !formData.directorSignature) {
            toast.error('All director fields are required')
            return
        }

        // Create new director object from form data
        const newDirector = {
            id: Date.now(), // unique id for each director
            name: formData.directorName,
            phone: formData.directorPhone,
            pan: formData.directorPan,
            email: formData.directorEmail,
            panCard: formData.directorPanCard,
            idProof: formData.directorIdProof,
            signature: formData.directorSignature
        }

        // Add to directors array
        setDirectors([...directors, newDirector])

        // Clear director form fields
        setFormData({
            ...formData,
            directorName: '',
            directorPhone: '',
            directorPan: '',
            directorEmail: '',
            directorPanCard: null,
            directorIdProof: null,
            directorSignature: null
        })
    }

    const removeDirector = (directorId) => {
        setDirectors(directors.filter((director) => director.id !== directorId))
    }

    const editDirector = (director) => {
        // First remove this director from the array
        setDirectors(directors.filter((d) => d.id !== director.id))

        // Then set form data to edit this director
        setFormData({
            ...formData,
            directorName: director.name,
            directorPhone: director.phone,
            directorPan: director.pan,
            directorEmail: director.email,
            directorPanCard: director.panCard,
            directorIdProof: director.idProof,
            directorSignature: director.signature
        })
    }

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

    return (
        <div className="container mx-auto p-4">
            <Tabs
                defaultValue="company"
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full">
                <TabsList className="mb-4 border-b relative">
                    {/* <motion.div 
                        className="absolute bottom-0 h-0.5 bg-blue-500"
                        layoutId="tabIndicator"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        style={{ 
                            left: activeTab === 'company' ? '0%' : '50%', 
                            right: activeTab === 'company' ? '50%' : '0%'
                        }}
                    /> */}
                    <TabsTrigger
                        value="company"
                        className="px-4 py-2"
                        asChild>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}>
                            Company Details
                        </motion.button>
                    </TabsTrigger>
                    <TabsTrigger
                        value="director"
                        className="px-4 py-2"
                        asChild>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}>
                            Director's Details
                        </motion.button>
                    </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                    {activeTab === 'company' && (
                        <motion.div
                            key="company-tab"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <TabsContent value="company">
                                <Card className="p-6">
                                    <h2 className="text-xl font-semibold ">Company details</h2>

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Atif khan"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                                <input
                                                    type="text"
                                                    name="position"
                                                    value={formData.position}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Manager"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Savorybites"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Official Number</label>
                                                <input
                                                    type="text"
                                                    name="officialNumber"
                                                    value={formData.officialNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="(+91) 9876-054598"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Atifkhan@gmail.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Website URL</label>
                                                <input
                                                    type="text"
                                                    name="websiteUrl"
                                                    value={formData.websiteUrl}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="savorybites.in"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                                                <textarea
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="7, Twenty Star Complex, 2nd line, Beach Rd"
                                                    rows="3"></textarea>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company PAN</label>
                                                <input
                                                    type="text"
                                                    name="pan"
                                                    value={formData.pan}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="EKGP8181M"
                                                />
                                            </div>

                                            <div className="flex flex-col justify-between">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                                                <div className="border-2  h-full flex flex-col justify-center items-center border-dashed rounded-md p-4 text-center ">
                                                    {formData.logo ? (
                                                        <div className="relative">
                                                            <img
                                                                src={formData.logo.preview}
                                                                alt="Company Logo"
                                                                className="h-32 mx-auto object-contain"
                                                            />
                                                            <motion.button
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => removeDocument('logo')}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                type="button">
                                                                <FiX className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-center mb-2">
                                                                <AiOutlineFileImage className="w-12 h-12 text-green-500" />
                                                            </div>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="file"
                                                                    name="logo"
                                                                    className="hidden"
                                                                    id="companyLogo"
                                                                    onChange={handleFileChange}
                                                                    accept="image/*"
                                                                />
                                                                <label
                                                                    htmlFor="companyLogo"
                                                                    className="cursor-pointer text-sm text-blue-600">
                                                                    Upload logo
                                                                </label>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Company Incorporation / establishment Certificate
                                                </label>
                                                <div className="border-2  h-full flex flex-col justify-center items-center  border-dashed rounded-md p-4 text-center">
                                                    {formData.incorporation ? (
                                                        <div className="relative">
                                                            {formData.incorporation.isPdf ? (
                                                                <div className="flex flex-col items-center">
                                                                    <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                                    <p className="text-sm mt-2 text-gray-700 truncate max-w-[150px]">
                                                                        {formData.incorporation.fileName}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <img
                                                                    src={formData.incorporation.preview}
                                                                    alt="Incorporation Certificate"
                                                                    className="h-32 mx-auto object-contain"
                                                                />
                                                            )}
                                                            <motion.button
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => removeDocument('incorporation')}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                type="button">
                                                                <FiX className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-center mb-2">
                                                                <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                            </div>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="file"
                                                                    name="incorporation"
                                                                    className="hidden"
                                                                    id="companyIncorporation"
                                                                    onChange={handleFileChange}
                                                                    accept="image/*,.pdf"
                                                                />
                                                                <label
                                                                    htmlFor="companyIncorporation"
                                                                    className="cursor-pointer text-sm text-blue-600">
                                                                    Upload Certificate
                                                                </label>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company MOA / Memorandum</label>
                                                <div className="border-2  h-full flex flex-col justify-center items-center  border-dashed rounded-md p-4 text-center">
                                                    {formData.moa ? (
                                                        <div className="relative">
                                                            {formData.moa.isPdf ? (
                                                                <div className="flex flex-col items-center">
                                                                    <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                                    <p className="text-sm mt-2 text-gray-700 truncate max-w-[150px]">{formData.moa.fileName}</p>
                                                                </div>
                                                            ) : (
                                                                <img
                                                                    src={formData.moa.preview}
                                                                    alt="MOA Document"
                                                                    className="h-32 mx-auto object-contain"
                                                                />
                                                            )}
                                                            <motion.button
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => removeDocument('moa')}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                type="button">
                                                                <FiX className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-center mb-2">
                                                                <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                            </div>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="file"
                                                                    name="moa"
                                                                    className="hidden"
                                                                    id="companyMOA"
                                                                    onChange={handleFileChange}
                                                                    accept="image/*,.pdf"
                                                                />
                                                                <label
                                                                    htmlFor="companyMOA"
                                                                    className="cursor-pointer text-sm text-blue-600">
                                                                    Upload Memorandum
                                                                </label>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Company Authorised signatory sign with 'for' seal
                                                </label>
                                                <div className="border-2 h-full flex flex-col justify-center items-center  border-dashed rounded-md p-4 text-center">
                                                    {formData.signatory ? (
                                                        <div className="relative">
                                                            <img
                                                                src={formData.signatory.preview}
                                                                alt="Signatory Document"
                                                                className="h-32 mx-auto object-contain"
                                                            />
                                                            <motion.button
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => removeDocument('signatory')}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                type="button">
                                                                <FiX className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-center mb-2">
                                                                <AiOutlineFileImage className="w-12 h-12 text-green-500" />
                                                            </div>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="file"
                                                                    name="signatory"
                                                                    className="hidden"
                                                                    id="companySignatory"
                                                                    onChange={handleFileChange}
                                                                    accept="image/*"
                                                                />
                                                                <label
                                                                    htmlFor="companySignatory"
                                                                    className="cursor-pointer text-sm text-blue-600">
                                                                    Upload Signatory
                                                                </label>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Round Seal</label>
                                                <div className="border-2  h-full flex flex-col justify-center items-center border-dashed rounded-md p-4 text-center">
                                                    {formData.seal ? (
                                                        <div className="relative">
                                                            <img
                                                                src={formData.seal.preview}
                                                                alt="Company Seal"
                                                                className="h-32 mx-auto object-contain"
                                                            />
                                                            <motion.button
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => removeDocument('seal')}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                type="button">
                                                                <FiX className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-center mb-2">
                                                                <AiOutlineFileImage className="w-12 h-12 text-green-500" />
                                                            </div>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="file"
                                                                    name="seal"
                                                                    className="hidden"
                                                                    id="companyRoundSeal"
                                                                    onChange={handleFileChange}
                                                                    accept="image/*"
                                                                />
                                                                <label
                                                                    htmlFor="companyRoundSeal"
                                                                    className="cursor-pointer text-sm text-blue-600">
                                                                    Upload Seal
                                                                </label>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Fssai Certificate</label>
                                                <div className="border-2 h-full flex flex-col justify-center items-center  border-dashed rounded-md p-4 text-center">
                                                    {formData.fssai ? (
                                                        <div className="relative">
                                                            {formData.fssai.isPdf ? (
                                                                <div className="flex flex-col items-center">
                                                                    <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                                    <p className="text-sm mt-2 text-gray-700 truncate max-w-[150px]">{formData.fssai.fileName}</p>
                                                                </div>
                                                            ) : (
                                                                <img
                                                                    src={formData.fssai.preview}
                                                                    alt="FSSAI Certificate"
                                                                    className="h-32 mx-auto object-contain"
                                                                />
                                                            )}
                                                            <motion.button
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => removeDocument('fssai')}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                type="button">
                                                                <FiX className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-center mb-2">
                                                                <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                            </div>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="file"
                                                                    name="fssai"
                                                                    className="hidden"
                                                                    id="fssaiCertificate"
                                                                    onChange={handleFileChange}
                                                                    accept="image/*,.pdf"
                                                                />
                                                                <label
                                                                    htmlFor="fssaiCertificate"
                                                                    className="cursor-pointer text-sm text-blue-600">
                                                                    Upload Certificate
                                                                </label>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex justify-end gap-4">
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                type="button"
                                                onClick={() => navigate('/client-portal/dashboard')}
                                                className="px-6 py-2 border rounded-md">
                                                Cancel
                                            </motion.button>
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                type="button"
                                                className="px-6 py-2 bg-custom-primary text-white rounded-md"
                                                onClick={() => handleTabChange('director')}>
                                                Next
                                            </motion.button>
                                        </div>
                                    </form>
                                </Card>
                            </TabsContent>
                        </motion.div>
                    )}

                    {activeTab === 'director' && (
                        <motion.div
                            key="director-tab"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <TabsContent value="director">
                                <Card className="p-6">
                                    <h2 className="text-xl font-semibold">Director's Details</h2>

                                    <div className="mt-6">
                                        <form className="director-form mb-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Director's Name</label>
                                                    <input
                                                        type="text"
                                                        name="directorName"
                                                        value={formData.directorName}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border rounded-md"
                                                        placeholder="Abdullah Ahmed"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Director's Phone Number</label>
                                                    <input
                                                        type="text"
                                                        name="directorPhone"
                                                        value={formData.directorPhone}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border rounded-md"
                                                        placeholder="(+91) 9876-054598"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Director's PAN</label>
                                                    <input
                                                        type="text"
                                                        name="directorPan"
                                                        value={formData.directorPan}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border rounded-md"
                                                        placeholder="EKGP871B"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Director's Email</label>
                                                    <input
                                                        type="email"
                                                        name="directorEmail"
                                                        value={formData.directorEmail}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border rounded-md"
                                                        placeholder="Abdullahahmed21@gmail.com"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Director's PAN Card upload</label>
                                                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                                                        {formData.directorPanCard ? (
                                                            <div className="relative">
                                                                {formData.directorPanCard.isPdf ? (
                                                                    <div className="flex flex-col items-center">
                                                                        <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                                        <p className="text-sm mt-2 text-gray-700 truncate max-w-[150px]">
                                                                            {formData.directorPanCard.fileName}
                                                                        </p>
                                                                    </div>
                                                                ) : (
                                                                    <img
                                                                        src={formData.directorPanCard.preview}
                                                                        alt="Director PAN Card"
                                                                        className="h-32 mx-auto object-contain"
                                                                    />
                                                                )}
                                                                <motion.button
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => removeDocument('directorPanCard')}
                                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                    type="button">
                                                                    <FiX className="w-4 h-4" />
                                                                </motion.button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="flex justify-center mb-2">
                                                                    <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                                </div>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="file"
                                                                        name="directorPanCard"
                                                                        className="hidden"
                                                                        id="directorPanCard"
                                                                        onChange={handleFileChange}
                                                                        accept="image/*,.pdf"
                                                                    />
                                                                    <label
                                                                        htmlFor="directorPanCard"
                                                                        className="cursor-pointer text-sm text-blue-600">
                                                                        Upload PAN Card
                                                                    </label>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Director's ID proof</label>
                                                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                                                        {formData.directorIdProof ? (
                                                            <div className="relative">
                                                                {formData.directorIdProof.isPdf ? (
                                                                    <div className="flex flex-col items-center">
                                                                        <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                                        <p className="text-sm mt-2 text-gray-700 truncate max-w-[150px]">
                                                                            {formData.directorIdProof.fileName}
                                                                        </p>
                                                                    </div>
                                                                ) : (
                                                                    <img
                                                                        src={formData.directorIdProof.preview}
                                                                        alt="Director ID Proof"
                                                                        className="h-32 mx-auto object-contain"
                                                                    />
                                                                )}
                                                                <motion.button
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => removeDocument('directorIdProof')}
                                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                    type="button">
                                                                    <FiX className="w-4 h-4" />
                                                                </motion.button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="flex justify-center mb-2">
                                                                    <AiOutlineFilePdf className="w-12 h-12 text-red-500" />
                                                                </div>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="file"
                                                                        name="directorIdProof"
                                                                        className="hidden"
                                                                        id="directorIdProof"
                                                                        onChange={handleFileChange}
                                                                        accept="image/*,.pdf"
                                                                    />
                                                                    <label
                                                                        htmlFor="directorIdProof"
                                                                        className="cursor-pointer text-sm text-blue-600">
                                                                        Upload ID Proof
                                                                    </label>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Director's Signature (For seal)</label>
                                                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                                                        {formData.directorSignature ? (
                                                            <div className="relative">
                                                                <img
                                                                    src={formData.directorSignature.preview}
                                                                    alt="Director Signature"
                                                                    className="h-32 mx-auto object-contain"
                                                                />
                                                                <motion.button
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => removeDocument('directorSignature')}
                                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                                                                    type="button">
                                                                    <FiX className="w-4 h-4" />
                                                                </motion.button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="flex justify-center mb-2">
                                                                    <div className="flex justify-center mb-2">
                                                                        <AiOutlineFileImage className="w-12 h-12 text-green-500" />
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="file"
                                                                        name="directorSignature"
                                                                        className="hidden"
                                                                        id="directorSignature"
                                                                        onChange={handleFileChange}
                                                                        accept="image/*"
                                                                    />
                                                                    <label
                                                                        htmlFor="directorSignature"
                                                                        className="cursor-pointer text-sm text-blue-600">
                                                                        Upload Signature
                                                                    </label>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    type="button"
                                                    onClick={addDirector}
                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                                    <FiPlus className="w-4 h-4" />
                                                    Add Director
                                                </motion.button>
                                            </div>
                                        </form>

                                        {/* Directors List */}
                                        <div className="mt-8">
                                            <h3 className="text-lg font-medium mb-4 flex items-center">
                                                <span>Directors List</span>
                                                {directors.length > 0 && (
                                                    <span className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                                        {directors.length}
                                                    </span>
                                                )}
                                            </h3>

                                            {directors.length === 0 ? (
                                                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
                                                    <div className="text-gray-400 mb-2">
                                                        <FiUsers className="h-12 w-12 mx-auto" />
                                                    </div>
                                                    <p className="text-gray-500">No directors added yet</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {directors.map((director) => (
                                                        <div
                                                            key={director.id}
                                                            className="relative bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                                            <div className="absolute top-2 right-2 flex space-x-1">
                                                                <motion.button
                                                                    whileTap={{ scale: 0.95 }}
                                                                    type="button"
                                                                    onClick={() => editDirector(director)}
                                                                    className="bg-blue-50 hover:bg-blue-100 p-1 rounded text-blue-600 flex items-center justify-center"
                                                                    title="Edit Director">
                                                                    <FiEdit className="h-4 w-4" />
                                                                </motion.button>
                                                                <motion.button
                                                                    whileTap={{ scale: 0.95 }}
                                                                    type="button"
                                                                    onClick={() => removeDirector(director.id)}
                                                                    className="bg-red-50 hover:bg-red-100 p-1 rounded text-red-600 flex items-center justify-center"
                                                                    title="Remove Director">
                                                                    <FiTrash2 className="h-4 w-4" />
                                                                </motion.button>
                                                            </div>

                                                            <div className="p-4">
                                                                <div className="flex items-center mb-4">
                                                                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-lg mr-3">
                                                                        {director.name.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium text-gray-900">{director.name}</h4>
                                                                        <p className="text-sm text-gray-500">{director.email}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                                                    <div>
                                                                        <span className="text-gray-500">Phone:</span>
                                                                        <span className="ml-1 font-medium">{director.phone || 'N/A'}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-gray-500">PAN:</span>
                                                                        <span className="ml-1 font-medium">{director.pan || 'N/A'}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="bg-gray-50 p-2 rounded-md">
                                                                    <p className="text-xs text-gray-500 mb-2">Uploaded Documents</p>
                                                                    <div className="flex flex-wrap justify-start gap-2">
                                                                        {director.panCard && (
                                                                            <div className="relative group w-16 h-16">
                                                                                <img
                                                                                    src={director.panCard.preview}
                                                                                    alt="PAN Card"
                                                                                    className="w-full h-full object-cover rounded border"
                                                                                />
                                                                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                                    <span className="text-white text-xs">PAN Card</span>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        {director.idProof && (
                                                                            <div className="relative group w-16 h-16">
                                                                                <img
                                                                                    src={director.idProof.preview}
                                                                                    alt="ID Proof"
                                                                                    className="w-full h-full object-cover rounded border"
                                                                                />
                                                                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                                    <span className="text-white text-xs">ID Proof</span>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        {director.signature && (
                                                                            <div className="relative group w-16 h-16">
                                                                                <img
                                                                                    src={director.signature.preview}
                                                                                    alt="Signature"
                                                                                    className="w-full h-full object-cover rounded border"
                                                                                />
                                                                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                                    <span className="text-white text-xs">Signature</span>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        {!director.panCard && !director.idProof && !director.signature && (
                                                                            <span className="text-gray-400 text-xs">No documents uploaded</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end gap-4">
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            onClick={() => handleTabChange('company')}
                                            className="px-6 py-2 border rounded-md">
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            className="px-6 py-2 bg-custom-primary text-white rounded-md"
                                            onClick={handleSubmit}>
                                            Save
                                        </motion.button>
                                    </div>
                                </Card>
                            </TabsContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Tabs>
        </div>
    )
}

export default Profile

