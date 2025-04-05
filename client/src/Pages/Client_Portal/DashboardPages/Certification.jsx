import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BiDownload, BiTrash, BiPlus } from 'react-icons/bi'
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer'
import { useNavigate } from 'react-router-dom'
import { FaCalendarAlt } from 'react-icons/fa'
import { Country, State, City } from 'country-state-city'
// Import the configuration
import { declarationContent } from './Certification.config'

// Create styles for PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 12,
        marginBottom: 10,
        lineHeight: 1.5,
        textAlign: 'justify'
    },
    section: {
        marginBottom: 20
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#3B82F6'
    }
})

// Create PDF Document
const HalalLogoMarkAgreementPDF = () => (
    <Document>
        <Page
            size="A4"
            style={styles.page}>
            <Text style={styles.header}>Halal Standard Logo Mark Agreement</Text>

            <View style={styles.section}>
                <Text style={styles.subtitle}>1. Grant of License</Text>
                <Text style={styles.text}>
                    Subject to the terms of this Agreement, Halal India grants to the Company a non-exclusive, non-transferable license to use the
                    Halal Logo Mark solely in connection with products that have been certified by Halal India as compliant with Halal standards.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>2. Use of the Logo</Text>
                <Text style={styles.text}>
                    The Company shall use the Halal Logo Mark only in the form and manner prescribed by Halal India. The Company shall not alter,
                    modify, or change the Halal Logo Mark in any way. The Company shall display the Halal Logo Mark prominently on the certified
                    products and in related marketing materials.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>3. Quality Control</Text>
                <Text style={styles.text}>
                    The Company shall maintain the quality of the products bearing the Halal Logo Mark at a level that meets or exceeds the standards
                    set by Halal India. Halal India reserves the right to inspect the Company's facilities and products at any time to ensure
                    compliance.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>4. Term and Termination</Text>
                <Text style={styles.text}>
                    This Agreement shall remain in effect as long as the Company maintains its Halal certification. Halal India may terminate this
                    Agreement immediately if the Company violates any provision of this Agreement or if the Company's Halal certification is revoked.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>5. Fees</Text>
                <Text style={styles.text}>
                    The Company shall pay Halal India the annual license fee as specified in the certification application. Failure to pay the license
                    fee shall be grounds for termination of this Agreement.
                </Text>
            </View>
        </Page>
    </Document>
)

const Certification = () => {
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('agreements')
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [ndaTermsAccepted, setNdaTermsAccepted] = useState(false)
    const [currentAgreement, setCurrentAgreement] = useState('nda')
    const [applicationSubTab, setApplicationSubTab] = useState('company')
    const [activeServiceSubTab, setActiveServiceSubTab] = useState('productListing')

    // Add state for declaration acceptance
    const [postAuditAccepted, setPostAuditAccepted] = useState(false)
    const [supplierDeclarationAccepted, setSupplierDeclarationAccepted] = useState(false)

    // Location data states
    const [countries, setCountries] = useState([])
    const [companyStates, setCompanyStates] = useState([])
    const [companyCities, setCompanyCities] = useState([])
    const [plantStates, setPlantStates] = useState([])
    const [plantCities, setPlantCities] = useState([])

    // Load countries on component mount
    useEffect(() => {
        setCountries(Country.getAllCountries())
    }, [])

    // Company Profile Form State
    const [companyProfile, setCompanyProfile] = useState({
        companyName: '',
        applicationDate: '',
        registeredAddress: '',
        lineAddress: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        websiteUrl: '',
        contactNumber: ''
    })

    // Manufacturing Plant Profile Form State
    const [plantProfile, setPlantProfile] = useState({
        plantName: '',
        plantAddress: '',
        plantLineAddress: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        manufacturerType: '',
        otherManufacturerType: '',
        industryType: '',
        otherIndustryType: '',
        certifications: ''
    })

    // Load states based on selected country for company profile
    useEffect(() => {
        if (companyProfile.country) {
            const statesData = State.getStatesOfCountry(companyProfile.country)
            setCompanyStates(statesData)

            // Reset state and city when country changes
            if (companyProfile.state) {
                setCompanyProfile((prev) => ({
                    ...prev,
                    state: '',
                    city: ''
                }))
            }
        } else {
            setCompanyStates([])
        }
    }, [companyProfile.country])

    // Load cities based on selected state for company profile
    useEffect(() => {
        if (companyProfile.country && companyProfile.state) {
            const citiesData = City.getCitiesOfState(companyProfile.country, companyProfile.state)
            setCompanyCities(citiesData)

            // Reset city when state changes
            if (companyProfile.city) {
                setCompanyProfile((prev) => ({
                    ...prev,
                    city: ''
                }))
            }
        } else {
            setCompanyCities([])
        }
    }, [companyProfile.country, companyProfile.state])

    // Load states based on selected country for plant profile
    useEffect(() => {
        if (plantProfile.country) {
            const statesData = State.getStatesOfCountry(plantProfile.country)
            setPlantStates(statesData)

            // Reset state and city when country changes
            if (plantProfile.state) {
                setPlantProfile((prev) => ({
                    ...prev,
                    state: '',
                    city: ''
                }))
            }
        } else {
            setPlantStates([])
        }
    }, [plantProfile.country])

    // Load cities based on selected state for plant profile
    useEffect(() => {
        if (plantProfile.country && plantProfile.state) {
            const citiesData = City.getCitiesOfState(plantProfile.country, plantProfile.state)
            setPlantCities(citiesData)

            // Reset city when state changes
            if (plantProfile.city) {
                setPlantProfile((prev) => ({
                    ...prev,
                    city: ''
                }))
            }
        } else {
            setPlantCities([])
        }
    }, [plantProfile.country, plantProfile.state])

    // Correspondence Person Form State
    const [correspondencePerson, setCorrespondencePerson] = useState({
        name: '',
        designation: '',
        phoneNumber: '',
        landlineNumber: '',
        email: ''
    })

    // Product Information Form State
    const [productInfo, setProductInfo] = useState({
        certifiedProductsCount: '4',
        totalProductsCount: '10',
        productGroups: '',
        productBrands: '',
        productVarieties: ''
    })

    // Add these new state variables after other useState declarations
    const [productList, setProductList] = useState([{ id: 1, productName: '', category: '', usage: '' }])

    const [rawMaterialList, setRawMaterialList] = useState([
        {
            id: 1,
            rawMaterialName: '',
            category: '',
            usage: '',
            brandName: '',
            manufacturerName: '',
            billFile: null
        }
    ])

    // Add state for COA list
    const [coaList, setCoaList] = useState([
        {
            id: 1,
            productId: '',
            provider: '',
            managerName: '',
            managerContact: '',
            certificateFile: null
        }
    ])

    // Add state for Menu List
    const [menuListItems, setMenuListItems] = useState([
        { id: 1, name: '', category: '', price: '', priceType: '', label: '' }
    ])

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [productSpecifications, setProductSpecifications] = useState({})

    // Add these new state variables after other useState declarations
    const [otherIngredients, setOtherIngredients] = useState('')

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    const handleAgreementChange = (agreement) => {
        setCurrentAgreement(agreement)
    }

    const handleApplicationSubTabChange = (subTab) => {
        setApplicationSubTab(subTab)
    }

    const handleServiceSubTabChange = (subTab) => {
        setActiveServiceSubTab(subTab)
    }

    const handleCompanyProfileChange = (e) => {
        setCompanyProfile({
            ...companyProfile,
            [e.target.name]: e.target.value
        })
    }

    const handlePlantProfileChange = (e) => {
        const { name, value } = e.target
        setPlantProfile({
            ...plantProfile,
            [name]: value
        })
    }

    const handleCorrespondencePersonChange = (e) => {
        setCorrespondencePerson({
            ...correspondencePerson,
            [e.target.name]: e.target.value
        })
    }

    const handleProductInfoChange = (e) => {
        setProductInfo({
            ...productInfo,
            [e.target.name]: e.target.value
        })
    }

    // Add these new handler functions before the return statement
    const handleAddProduct = () => {
        setProductList([
            ...productList,
            {
                id: productList.length + 1,
                productName: '',
                category: '',
                usage: ''
            }
        ])
    }

    const handleRemoveProduct = (id) => {
        setProductList(productList.filter((product) => product.id !== id))
    }

    const handleProductChange = (id, field, value) => {
        setProductList(productList.map((product) => (product.id === id ? { ...product, [field]: value } : product)))
    }

    const handleAddRawMaterial = () => {
        setRawMaterialList([
            ...rawMaterialList,
            {
                id: rawMaterialList.length + 1,
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
        setRawMaterialList(rawMaterialList.filter((material) => material.id !== id))
    }

    const handleRawMaterialChange = (id, field, value) => {
        setRawMaterialList(rawMaterialList.map((material) => (material.id === id ? { ...material, [field]: value } : material)))
    }

    const handleSpecificationChange = (productId, field, value) => {
        setProductSpecifications((prev) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }))
    }

    const handleIngredientToggle = (productId, section, ingredient) => {
        setProductSpecifications((prev) => {
            const currentIngredients = prev[productId]?.[section] || []
            const exists = currentIngredients.includes(ingredient)

            return {
                ...prev,
                [productId]: {
                    ...prev[productId],
                    [section]: exists ? currentIngredients.filter((i) => i !== ingredient) : [...currentIngredients, ingredient]
                }
            }
        })
    }

    const handleProductSpecificationSubmit = () => {
        console.log(selectedProduct, productSpecifications)
    }

    // Add this new handler function before the return statement
    const handleOtherIngredientsChange = (e, productId) => {
        const value = e.target.value
        setOtherIngredients(value)

        // Convert comma-separated string to array of tags
        const tags = value
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        handleSpecificationChange(productId, 'otherIngredients', tags)
    }

    // Add handlers for COA list
    const handleAddCoaRow = () => {
        setCoaList([
            ...coaList,
            {
                id: coaList.length + 1,
                productId: '',
                provider: '',
                managerName: '',
                managerContact: '',
                certificateFile: null
            }
        ])
    }

    const handleRemoveCoaRow = (id) => {
        setCoaList(coaList.filter((coa) => coa.id !== id))
    }

    const handleCoaChange = (id, field, value) => {
        setCoaList(coaList.map((coa) => (coa.id === id ? { ...coa, [field]: value } : coa)))
    }

    // Add handlers for Menu List
    const handleAddMenuItem = () => {
        setMenuListItems([
            ...menuListItems,
            {
                id: menuListItems.length + 1,
                name: '',
                category: '',
                price: '',
                priceType: '', // Default price type or leave empty
                label: ''
            }
        ]);
    };

    const handleRemoveMenuItem = (id) => {
        setMenuListItems(menuListItems.filter(item => item.id !== id));
    };

    const handleMenuItemChange = (id, field, value) => {
        setMenuListItems(menuListItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    // Animation variants
    const tabContentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0 } }
    }

    const agreementVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.1 } }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-medium">Certification</h1>

            {/* Tabs */}
            <div className="border-b">
                <div className="flex space-x-8 relative">
                    {['agreements', 'application', 'service'].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`pb-2 font-medium relative ${activeTab === tab ? 'text-blue-500' : 'text-gray-600'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}>
                            {tab === 'agreements' && 'Agreements & NDAs'}
                            {tab === 'application' && 'Halal certification application form'}
                            {tab === 'service' && 'Service Listing'}
                            {activeTab === tab && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                    layoutId="tabIndicator"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

       

            {/* Agreement buttons */}
            {activeTab === 'agreements' && (
                <motion.div
                    className="flex space-x-4 mb-6"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}>
                    <motion.button
                        onClick={() => handleAgreementChange('nda')}
                        className={`px-4 py-2 rounded ${currentAgreement === 'nda' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}>
                        Non disclosure agreement
                    </motion.button>
                    <motion.button
                        onClick={() => handleAgreementChange('logomark')}
                        className={`px-4 py-2 rounded ${currentAgreement === 'logomark' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}>
                        Halal standard logo mark agreement
                    </motion.button>
                </motion.div>
            )}

            {/* Sub tabs for Application Form */}
            {activeTab === 'application' && (
                <motion.div
                    className="flex space-x-4 mb-6"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}>
                    <motion.button
                        onClick={() => handleApplicationSubTabChange('company')}
                        className={`px-4 py-2 rounded ${applicationSubTab === 'company' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}>
                        Company profile
                    </motion.button>
                    <motion.button
                        onClick={() => handleApplicationSubTabChange('manufacturing')}
                        className={`px-4 py-2 rounded ${
                            applicationSubTab === 'manufacturing' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}>
                        Manufacturing Plant Profile
                    </motion.button>
                    <motion.button
                        onClick={() => handleApplicationSubTabChange('correspondence')}
                        className={`px-4 py-2 rounded ${
                            applicationSubTab === 'correspondence' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}>
                        Correspondence Person
                    </motion.button>
                    <motion.button
                        onClick={() => handleApplicationSubTabChange('product')}
                        className={`px-4 py-2 rounded ${applicationSubTab === 'product' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}>
                        Product Information
                    </motion.button>
                </motion.div>
            )}

            {/* Sub tabs for Service Listing */}
            {activeTab === 'service' && (
                <motion.div
                    className="flex space-x-2 mb-6 overflow-x-auto pb-2"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}>
                    {[
                        { id: 'productListing', label: 'Product listing' },
                        { id: 'rawMaterial', label: 'Raw material / Ingredient list' },
                        { id: 'productSpecification', label: 'Product specification' },
                        { id: 'coa', label: 'COA (Certificate of analysis)' },
                        { id: 'postAudit', label: 'Post Audit declaration' },
                        { id: 'supplierDeclaration', label: 'Supplier declaration' },
                        { id: 'menuList', label: 'Menu list' },
                        { id: 'hotelService', label: 'Star hotels and hospitality service list' },
                        { id: 'healthService', label: 'Hospital and Health care service list' },
                        { id: 'meatProcurement', label: 'Meat procurement list' }
                    ].map((subTab) => (
                        <motion.button
                            key={subTab.id}
                            onClick={() => handleServiceSubTabChange(subTab.id)}
                            className={`px-3 py-2 rounded text-sm whitespace-nowrap ${
                                activeServiceSubTab === subTab.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}>
                            {subTab.label}
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {/* Company Profile Section */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">
                        {activeTab === 'agreements'
                            ? 'Company Profile'
                            : applicationSubTab === 'company'
                              ? 'Company Profile'
                              : applicationSubTab === 'manufacturing'
                                ? 'Manufacturing Plant Profile'
                                : applicationSubTab === 'correspondence'
                                  ? 'Correspondence Person'
                                  : applicationSubTab === 'product'
                                    ? 'Product Information'
                                    : ''}
                    </h2>
                    {activeTab === 'agreements' && currentAgreement === 'logomark' && (
                        <div className="flex space-x-4">
                            <PDFDownloadLink
                                document={<HalalLogoMarkAgreementPDF />}
                                fileName="halal_logo_mark_agreement.pdf"
                                className="flex items-center text-gray-600 hover:text-blue-500">
                                {({ blob, url, loading, error }) =>
                                    loading ? (
                                        'Loading document...'
                                    ) : (
                                        <span className="flex items-center">
                                            <BiDownload className="mr-1" /> Download
                                        </span>
                                    )
                                }
                            </PDFDownloadLink>
                            <motion.span
                                onClick={() => setTermsAccepted(true)}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}>
                                Accepted
                            </motion.span>
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {/* Non Disclosure Agreement */}
                    {activeTab === 'agreements' && currentAgreement === 'nda' && (
                        <motion.div
                            key="nda-agreement"
                            className="bg-white border rounded-lg p-6"
                            variants={agreementVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-medium">Non Disclosure Agreement</h3>
                                <p className="text-gray-600">Please read and submit below...</p>
                            </div>

                            <div className="border rounded-lg p-6 max-h-[500px] overflow-y-auto mb-4">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-medium">1. Confidential Information</h4>
                                        <p className="text-sm">
                                            "Confidential Information" means any information disclosed by one party (the "Disclosing Party") to the
                                            other party (the "Receiving Party"), either directly or indirectly, in writing, orally or by inspection of
                                            tangible objects, which is designated as "Confidential," "Proprietary" or some similar designation, or
                                            information which a reasonable person would understand to be confidential.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">2. Non-disclosure Obligations</h4>
                                        <p className="text-sm">
                                            The Receiving Party agrees not to use any Confidential Information of the Disclosing Party for any purpose
                                            except to evaluate and engage in discussions concerning a potential business relationship between the
                                            parties. The Receiving Party agrees not to disclose any Confidential Information of the Disclosing Party
                                            to third parties.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">3. Term</h4>
                                        <p className="text-sm">
                                            This Agreement shall remain in effect for a period of 5 years from the date of disclosure of Confidential
                                            Information, or until terminated by either party with written notice.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">4. Remedies</h4>
                                        <p className="text-sm">
                                            The Receiving Party acknowledges that unauthorized disclosure of Confidential Information could cause
                                            substantial harm to the Disclosing Party for which damages alone might not be a sufficient remedy.
                                            Accordingly, the Disclosing Party shall be entitled to seek injunctive relief.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="acceptNdaTerms"
                                    checked={ndaTermsAccepted}
                                    onChange={() => setNdaTermsAccepted(!ndaTermsAccepted)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="acceptTerms"
                                    className="text-sm">
                                    I accept the terms & conditions
                                </label>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/client-portal/dashboard')}
                                    className="px-6 py-2 border border-gray-300 rounded">
                                    Back
                                </motion.button>
                                <motion.button
                                    whileHover={ndaTermsAccepted ? { scale: 1.05 } : {}}
                                    whileTap={ndaTermsAccepted ? { scale: 0.95 } : {}}
                                    disabled={!ndaTermsAccepted}
                                    onClick={() => setCurrentAgreement('logomark')}
                                    className={`px-6 py-2 rounded text-white bg-custom-primary ${ndaTermsAccepted ? '' : ' cursor-not-allowed'}`}>
                                    Accept & Continue
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Halal Standard Logo Mark Agreement */}
                    {activeTab === 'agreements' && currentAgreement === 'logomark' && (
                        <motion.div
                            key="logomark-agreement"
                            className="bg-white border rounded-lg p-6"
                            variants={agreementVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-medium">Halal Standard Logo Mark Agreement</h3>
                                <p className="text-gray-600">Please read and submit below...</p>
                            </div>

                            <div className="border rounded-lg p-6 max-h-[500px] overflow-y-auto mb-4">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-medium">1. Grant of License</h4>
                                        <p className="text-sm">
                                            Subject to the terms of this Agreement, Halal India grants to the Company a non-exclusive,
                                            non-transferable license to use the Halal Logo Mark solely in connection with products that have been
                                            certified by Halal India as compliant with Halal standards.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">2. Use of the Logo</h4>
                                        <p className="text-sm">
                                            The Company shall use the Halal Logo Mark only in the form and manner prescribed by Halal India. The
                                            Company shall not alter, modify, or change the Halal Logo Mark in any way. The Company shall display the
                                            Halal Logo Mark prominently on the certified products and in related marketing materials.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">3. Quality Control</h4>
                                        <p className="text-sm">
                                            The Company shall maintain the quality of the products bearing the Halal Logo Mark at a level that meets
                                            or exceeds the standards set by Halal India. Halal India reserves the right to inspect the Company's
                                            facilities and products at any time to ensure compliance.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">4. Term and Termination</h4>
                                        <p className="text-sm">
                                            This Agreement shall remain in effect as long as the Company maintains its Halal certification. Halal
                                            India may terminate this Agreement immediately if the Company violates any provision of this Agreement or
                                            if the Company's Halal certification is revoked.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium">5. Fees</h4>
                                        <p className="text-sm">
                                            The Company shall pay Halal India the annual license fee as specified in the certification application.
                                            Failure to pay the license fee shall be grounds for termination of this Agreement.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    checked={termsAccepted}
                                    onChange={() => setTermsAccepted(!termsAccepted)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor="acceptTerms"
                                    className="text-sm">
                                    I accept the terms & conditions
                                </label>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentAgreement('nda')}
                                    className="px-6 py-2 border border-gray-300 rounded">
                                    Back
                                </motion.button>
                                <motion.button
                                    whileHover={termsAccepted ? { scale: 1.05 } : {}}
                                    whileTap={termsAccepted ? { scale: 0.95 } : {}}
                                    disabled={!termsAccepted}
                                    className={`px-6 py-2 rounded text-white bg-custom-primary ${termsAccepted ? '' : '  cursor-not-allowed'}`}>
                                    Accept & Continue
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Application Form Tab Content */}
                    {activeTab === 'application' && applicationSubTab === 'company' && (
                        <motion.div
                            key="company-profile-tab"
                            className="bg-white border rounded-lg p-6"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company/Business Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={companyProfile.companyName}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="SavoryBite"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="applicationDate"
                                            value={companyProfile.applicationDate}
                                            onChange={handleCompanyProfileChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="24/01/24"
                                        />
                                        <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Registered Office Address</label>
                                    <input
                                        type="text"
                                        name="registeredAddress"
                                        value={companyProfile.registeredAddress}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="P Block, Anna Nagar, Chennai, Tamil"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Line Address (Optional)</label>
                                    <input
                                        type="text"
                                        name="lineAddress"
                                        value={companyProfile.lineAddress}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <select
                                        name="country"
                                        value={companyProfile.country}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option
                                                key={country.isoCode}
                                                value={country.isoCode}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <select
                                        name="state"
                                        value={companyProfile.state}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!companyProfile.country}>
                                        <option value="">Select State</option>
                                        {companyStates.map((state) => (
                                            <option
                                                key={state.isoCode}
                                                value={state.isoCode}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <select
                                        name="city"
                                        value={companyProfile.city}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!companyProfile.state}>
                                        <option value="">Select City</option>
                                        {companyCities.map((city) => (
                                            <option
                                                key={`${city.name}-${city.stateCode}`}
                                                value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={companyProfile.zipCode}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="600001"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                                    <input
                                        type="text"
                                        name="websiteUrl"
                                        value={companyProfile.websiteUrl}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="http://SavoryBite.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        value={companyProfile.contactNumber}
                                        onChange={handleCompanyProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="(+91) 9876-054598"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 border border-gray-300 rounded">
                                    Back
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleApplicationSubTabChange('manufacturing')}
                                    className="px-6 py-2 rounded text-white bg-custom-primary">
                                    Next
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Manufacturing Plant Profile Tab */}
                    {activeTab === 'application' && applicationSubTab === 'manufacturing' && (
                        <motion.div
                            key="manufacturing-plant-tab"
                            className="bg-white border rounded-lg p-6"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name</label>
                                    <input
                                        type="text"
                                        name="plantName"
                                        value={plantProfile.plantName}
                                        onChange={handlePlantProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Protein manufacturing plant"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plant Line Address</label>
                                    <input
                                        type="text"
                                        name="plantLineAddress"
                                        value={plantProfile.plantLineAddress}
                                        onChange={handlePlantProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter here"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plant Address</label>
                                    <input
                                        type="text"
                                        name="plantAddress"
                                        value={plantProfile.plantAddress}
                                        onChange={handlePlantProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="7 Twenty Star Complex, 2nd line, Beach Rd"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <select
                                        name="country"
                                        value={plantProfile.country}
                                        onChange={handlePlantProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option
                                                key={country.isoCode}
                                                value={country.isoCode}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <select
                                        name="state"
                                        value={plantProfile.state}
                                        onChange={handlePlantProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!plantProfile.country}>
                                        <option value="">Select State</option>
                                        {plantStates.map((state) => (
                                            <option
                                                key={state.isoCode}
                                                value={state.isoCode}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <select
                                        name="city"
                                        value={plantProfile.city}
                                        onChange={handlePlantProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!plantProfile.state}>
                                        <option value="">Select City</option>
                                        {plantCities.map((city) => (
                                            <option
                                                key={`${city.name}-${city.stateCode}`}
                                                value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={plantProfile.zipCode}
                                        onChange={handlePlantProfileChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="600004"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="mb-2 text-sm font-medium text-gray-700">Select Type:</div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="trader"
                                            name="manufacturerType"
                                            value="trader"
                                            checked={plantProfile.manufacturerType === 'trader'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="trader">Trader/Exporter</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="selfManufacture"
                                            name="manufacturerType"
                                            value="selfManufacture"
                                            checked={plantProfile.manufacturerType === 'selfManufacture'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="selfManufacture">Self Manufacture</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="contractManufacturer"
                                            name="manufacturerType"
                                            value="contractManufacturer"
                                            checked={plantProfile.manufacturerType === 'contractManufacturer'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="contractManufacturer">Contract Manufacturer</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="other"
                                            name="manufacturerType"
                                            value="other"
                                            checked={plantProfile.manufacturerType === 'other'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="other">Other</label>
                                    </div>
                                </div>

                                {plantProfile.manufacturerType === 'other' && (
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Other (Please specify)</label>
                                        <input
                                            type="text"
                                            name="otherManufacturerType"
                                            value={plantProfile.otherManufacturerType}
                                            onChange={handlePlantProfileChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter here"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <div className="mb-2 text-sm font-medium text-gray-700">Name of Industry</div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="food"
                                            name="industryType"
                                            value="food"
                                            checked={plantProfile.industryType === 'food'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="food">Food</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="nonFood"
                                            name="industryType"
                                            value="nonFood"
                                            checked={plantProfile.industryType === 'nonFood'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="nonFood">Non Food</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="pharmaceutical"
                                            name="industryType"
                                            value="pharmaceutical"
                                            checked={plantProfile.industryType === 'pharmaceutical'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="pharmaceutical">Pharmaceutical</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="cosmeceutical"
                                            name="industryType"
                                            value="cosmeceutical"
                                            checked={plantProfile.industryType === 'cosmeceutical'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="cosmeceutical">Cosmeceutical</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="nutraceutical"
                                            name="industryType"
                                            value="nutraceutical"
                                            checked={plantProfile.industryType === 'nutraceutical'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="nutraceutical">Nutraceutical</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="otherIndustry"
                                            name="industryType"
                                            value="otherIndustry"
                                            checked={plantProfile.industryType === 'otherIndustry'}
                                            onChange={handlePlantProfileChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="otherIndustry">Other (Specify)</label>
                                    </div>
                                </div>

                                {plantProfile.industryType === 'otherIndustry' && (
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Other (Please specify)</label>
                                        <input
                                            type="text"
                                            name="otherIndustryType"
                                            value={plantProfile.otherIndustryType}
                                            onChange={handlePlantProfileChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter here"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Certification & Standards of the plant</label>
                                <input
                                    type="text"
                                    name="certifications"
                                    value={plantProfile.certifications}
                                    onChange={handlePlantProfileChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter here"
                                />
                            </div>

                            <div className="flex justify-end space-x-4 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleApplicationSubTabChange('company')}
                                    className="px-6 py-2 border border-gray-300 rounded">
                                    Back
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleApplicationSubTabChange('correspondence')}
                                    className="px-6 py-2 rounded text-white bg-custom-primary">
                                    Next
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Correspondence Person Tab */}
                    {activeTab === 'application' && applicationSubTab === 'correspondence' && (
                        <motion.div
                            key="correspondence-person-tab"
                            className="bg-white border rounded-lg p-6"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={correspondencePerson.name}
                                        onChange={handleCorrespondencePersonChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Atif khan"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={correspondencePerson.designation}
                                        onChange={handleCorrespondencePersonChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Manager"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number (Phone)</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={correspondencePerson.phoneNumber}
                                        onChange={handleCorrespondencePersonChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="(+91) 9876-054598"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number (Landline)</label>
                                    <input
                                        type="text"
                                        name="landlineNumber"
                                        value={correspondencePerson.landlineNumber}
                                        onChange={handleCorrespondencePersonChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter here"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={correspondencePerson.email}
                                        onChange={handleCorrespondencePersonChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Atifkhan@gmail.com"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleApplicationSubTabChange('manufacturing')}
                                    className="px-6 py-2 border border-gray-300 rounded">
                                    Back
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleApplicationSubTabChange('product')}
                                    className="px-6 py-2 rounded text-white bg-custom-primary">
                                    Next
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Product Information Tab */}
                    {activeTab === 'application' && applicationSubTab === 'product' && (
                        <motion.div
                            key="product-info-tab"
                            className="bg-white border rounded-lg p-6"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Products to be Halal Certified</label>
                                    <select
                                        name="certifiedProductsCount"
                                        value={productInfo.certifiedProductsCount}
                                        onChange={handleProductInfoChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Total No. of Products Produced in the Plant
                                    </label>
                                    <select
                                        name="totalProductsCount"
                                        value={productInfo.totalProductsCount}
                                        onChange={handleProductInfoChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Groups</label>
                                    <input
                                        type="text"
                                        name="productGroups"
                                        value={productInfo.productGroups}
                                        onChange={handleProductInfoChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter here"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Brands of Products</label>
                                    <input
                                        type="text"
                                        name="productBrands"
                                        value={productInfo.productBrands}
                                        onChange={handleProductInfoChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter here"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Varieties</label>
                                    <input
                                        type="text"
                                        name="productVarieties"
                                        value={productInfo.productVarieties}
                                        onChange={handleProductInfoChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="+"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleApplicationSubTabChange('correspondence')}
                                    className="px-6 py-2 border border-gray-300 rounded">
                                    Back
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 rounded text-white bg-custom-primary">
                                    Submit
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Service Listing Tab Content */}
                    {activeTab === 'service' && (
                        <motion.div
                            key={`service-subtab-${activeServiceSubTab}`}
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            {activeServiceSubTab === 'productListing' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-6">Product Listing</h3>
                                    <div className="space-y-6">
                                        {productList.map((product, index) => (
                                            <div
                                                key={product.id}
                                                className="relative border rounded-lg p-4">
                                                <h4 className="text-lg font-medium mb-4">Product {String(index + 1).padStart(2, '0')}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                                        <input
                                                            type="text"
                                                            value={product.productName}
                                                            onChange={(e) => handleProductChange(product.id, 'productName', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Beef bar"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                        <select
                                                            value={product.category}
                                                            onChange={(e) => handleProductChange(product.id, 'category', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                            <option value="">Select category</option>
                                                            <option value="eggs">Eggs and egg products</option>
                                                            <option value="meat">Meat products</option>
                                                            <option value="dairy">Dairy products</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Usage</label>
                                                        <select
                                                            value={product.usage}
                                                            onChange={(e) => handleProductChange(product.id, 'usage', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                            <option value="">Select usage</option>
                                                            <option value="ready">Ready to eat products</option>
                                                            <option value="cooking">Cooking required</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveProduct(product.id)}
                                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                                                    <BiTrash size={20} />
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            onClick={handleAddProduct}
                                            className="flex items-center text-blue-500 hover:text-blue-700">
                                            <BiPlus
                                                size={20}
                                                className="mr-1"
                                            />{' '}
                                            Add row
                                        </button>
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border border-gray-300 rounded">
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 rounded text-white bg-custom-primary">
                                            Submit & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'rawMaterial' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-6">Raw Material / Ingredient List</h3>
                                    <div className="space-y-6">
                                        {rawMaterialList.map((material, index) => (
                                            <div
                                                key={material.id}
                                                className="relative border rounded-lg p-4">
                                                <h4 className="text-lg font-medium mb-4">SL No {String(index + 1).padStart(2, '0')}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Raw Material Name</label>
                                                        <input
                                                            type="text"
                                                            value={material.rawMaterialName}
                                                            onChange={(e) => handleRawMaterialChange(material.id, 'rawMaterialName', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Baking soda"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                        <select
                                                            value={material.category}
                                                            onChange={(e) => handleRawMaterialChange(material.id, 'category', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                            <option value="">Select category</option>
                                                            <option value="acid">Acid regulators</option>
                                                            <option value="preservatives">Preservatives</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Usage</label>
                                                        <select
                                                            value={material.usage}
                                                            onChange={(e) => handleRawMaterialChange(material.id, 'usage', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                            <option value="">Select usage</option>
                                                            <option value="cooking">Cooking essential</option>
                                                            <option value="flavoring">Flavoring agent</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                                                        <input
                                                            type="text"
                                                            value={material.brandName}
                                                            onChange={(e) => handleRawMaterialChange(material.id, 'brandName', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Super baking soda"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer Name</label>
                                                        <input
                                                            type="text"
                                                            value={material.manufacturerName}
                                                            onChange={(e) => handleRawMaterialChange(material.id, 'manufacturerName', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="ITC"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bill Upload</label>
                                                        <div className="flex items-center  space-x-2 relative border rounded pr-1">
                                                            <input
                                                                type="text"
                                                                value={material.billFile?.name || ''}
                                                                readOnly
                                                                placeholder="choose file"
                                                                className="flex-1 p-2 w-[60%]  rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                                            />
                                                            <button
                                                                onClick={() => handleRawMaterialChange(material.id, 'billFile', null)}
                                                                className="text-red-500 hover:text-red-700 text-3xl">
                                                                <span>×</span>
                                                            </button>
                                                            <input
                                                                type="file"
                                                                id={`bill-file-${material.id}`}
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    if (e.target.files.length > 0) {
                                                                        handleRawMaterialChange(material.id, 'billFile', e.target.files[0])
                                                                    }
                                                                    e.target.value = null // Reset file input
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`bill-file-${material.id}`}
                                                                className=" px-1 py-1 text-sm bg-blue-100 text-blue-500 rounded hover:bg-blue-200 cursor-pointer">
                                                                Choose file
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveRawMaterial(material.id)}
                                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                                                    <BiTrash size={20} />
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            onClick={handleAddRawMaterial}
                                            className="flex items-center text-blue-500 hover:text-blue-700">
                                            <BiPlus
                                                size={20}
                                                className="mr-1"
                                            />{' '}
                                            Add row
                                        </button>
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border border-gray-300 rounded">
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 rounded text-white bg-custom-primary">
                                            Submit & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'productSpecification' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-6">Product Specification</h3>

                                    {/* Product Selection Sidebar */}
                                    <div className="grid grid-cols-4 gap-6">
                                        <div className="col-span-1 border-r pr-4">
                                            <h4 className="text-lg font-medium mb-4 ">Products</h4>
                                            <div className="space-y-2 bg-gray-100 p-2 rounded-md">
                                                {productList.map((product) => (
                                                    <button
                                                        key={product.id}
                                                        onClick={() => {
                                                            setSelectedProduct(product)
                                                            if (!productSpecifications[product.id]) {
                                                                setProductSpecifications((prev) => ({
                                                                    ...prev,
                                                                    [product.id]: {
                                                                        productName: product.productName,
                                                                        brandName: '',
                                                                        productCategory: product.category,
                                                                        description: '',
                                                                        application: '',
                                                                        rawMaterials: [],
                                                                        additives: [],
                                                                        processingAids: [],
                                                                        otherIngredients: []
                                                                    }
                                                                }))
                                                            }
                                                        }}
                                                        className={`w-full text-left px-4 py-2 rounded-md ${
                                                            selectedProduct?.id === product.id
                                                                ? 'border bg-white border-blue-500 text-blue-500'
                                                                : 'hover:bg-gray-100'
                                                        }`}>
                                                        {product.productName || 'Unnamed Product'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Specification Form */}
                                        <div className="col-span-3">
                                            {selectedProduct ? (
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                                            <input
                                                                type="text"
                                                                disabled
                                                                value={productSpecifications[selectedProduct.id]?.productName || ''}
                                                                onChange={(e) =>
                                                                    handleSpecificationChange(selectedProduct.id, 'productName', e.target.value)
                                                                }
                                                                className="w-full bg-gray-100 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                placeholder=""
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                                                            <input
                                                                type="text"
                                                                value={productSpecifications[selectedProduct.id]?.brandName || ''}
                                                                onChange={(e) =>
                                                                    handleSpecificationChange(selectedProduct.id, 'brandName', e.target.value)
                                                                }
                                                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                placeholder="SavoryBites"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                                                        <input
                                                            type="text"
                                                            value={productSpecifications[selectedProduct.id]?.productCategory || ''}
                                                            onChange={(e) =>
                                                                handleSpecificationChange(selectedProduct.id, 'productCategory', e.target.value)
                                                            }
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Eggs and egg products"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                                                        <textarea
                                                            value={productSpecifications[selectedProduct.id]?.description || ''}
                                                            onChange={(e) =>
                                                                handleSpecificationChange(selectedProduct.id, 'description', e.target.value)
                                                            }
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            rows={3}
                                                            placeholder="Introducing our high-quality protein bar made with beef, specially crafted to enhance your health and endurance..."
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Application</label>
                                                        <textarea
                                                            value={productSpecifications[selectedProduct.id]?.application || ''}
                                                            onChange={(e) =>
                                                                handleSpecificationChange(selectedProduct.id, 'application', e.target.value)
                                                            }
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            rows={2}
                                                            placeholder="Our protein bar is made from premium quality beef, which is an excellent source of protein"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Appearance</label>
                                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                                            <input
                                                                type="file"
                                                                id="product-image"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    if (e.target.files?.[0]) {
                                                                        handleSpecificationChange(selectedProduct.id, 'appearance', e.target.files[0])
                                                                    }
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor="product-image"
                                                                className="cursor-pointer">
                                                                {productSpecifications[selectedProduct.id]?.appearance ? (
                                                                    <img
                                                                        src={URL.createObjectURL(
                                                                            productSpecifications[selectedProduct.id].appearance
                                                                        )}
                                                                        alt="Product"
                                                                        className="max-h-40 mx-auto"
                                                                    />
                                                                ) : (
                                                                    <div className="text-gray-500">
                                                                        <span className="block">Click to upload product image</span>
                                                                        <span className="text-sm">or drag and drop</span>
                                                                    </div>
                                                                )}
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Ingredients Sections */}
                                                    <div className="space-y-4">
                                                        {/* Raw Materials */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">Raw Material</label>
                                                            <div className="space-y-2 flex max-lg:flex-col gap-4 ">
                                                                <select
                                                                    className="w-1/2 max-lg:w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    onChange={(e) => {
                                                                        if (e.target.value) {
                                                                            handleIngredientToggle(selectedProduct.id, 'rawMaterials', e.target.value)
                                                                            e.target.value = '' // Reset select after selection
                                                                        }
                                                                    }}>
                                                                    <option value="">Select</option>
                                                                    <option value="Oats">Oats</option>
                                                                    <option value="Eggs">Eggs</option>
                                                                    <option value="Whole wheat">Whole wheat</option>
                                                                    <option value="Beef steak">Beef steak</option>
                                                                    <option value="Milk">Milk</option>
                                                                    <option value="Curd">Curd</option>
                                                                </select>
                                                                <div className="w-1/2 max-lg:w-full  flex flex-wrap gap-2">
                                                                    {productSpecifications[selectedProduct.id]?.rawMaterials?.map(
                                                                        (ingredient, index) => (
                                                                            <span
                                                                                key={index}
                                                                                className="inline-flex h-[30px] items-center px-3  rounded text-sm bg-blue-100 text-blue-700">
                                                                                {ingredient}
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleIngredientToggle(
                                                                                            selectedProduct.id,
                                                                                            'rawMaterials',
                                                                                            ingredient
                                                                                        )
                                                                                    }
                                                                                    className="ml-2 focus:outline-none text-2xl">
                                                                                    ×
                                                                                </button>
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Additives & Excipients */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Additive & Excipients
                                                            </label>
                                                            <div className="space-y-2 flex max-lg:flex-col gap-4">
                                                                <select
                                                                    className="w-1/2 max-lg:w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    onChange={(e) => {
                                                                        if (e.target.value) {
                                                                            handleIngredientToggle(selectedProduct.id, 'additives', e.target.value)
                                                                            e.target.value = '' // Reset select after selection
                                                                        }
                                                                    }}>
                                                                    <option value="">Select</option>
                                                                    <option value="Lactose">Lactose</option>
                                                                    <option value="Spray dried lactose">Spray dried lactose</option>
                                                                    <option value="Dextrose">Dextrose</option>
                                                                    <option value="Sucrose">Sucrose</option>
                                                                </select>
                                                                <div className="w-1/2 max-lg:w-full flex flex-wrap gap-2">
                                                                    {productSpecifications[selectedProduct.id]?.additives?.map(
                                                                        (ingredient, index) => (
                                                                            <span
                                                                                key={index}
                                                                                className="inline-flex h-[30px] whitespace-nowrap items-center px-3  rounded text-sm bg-yellow-50 text-yellow-700">
                                                                                {ingredient}
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleIngredientToggle(
                                                                                            selectedProduct.id,
                                                                                            'additives',
                                                                                            ingredient
                                                                                        )
                                                                                    }
                                                                                    className="ml-2 focus:outline-none text-2xl">
                                                                                    ×
                                                                                </button>
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Processing Aids & Solvents */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Processing Aids & Solvents
                                                            </label>
                                                            <div className="space-y-2 flex max-lg:flex-col gap-4">
                                                                <select
                                                                    className="w-1/2 max-lg:w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    onChange={(e) => {
                                                                        if (e.target.value) {
                                                                            handleIngredientToggle(
                                                                                selectedProduct.id,
                                                                                'processingAids',
                                                                                e.target.value
                                                                            )
                                                                            e.target.value = '' // Reset select after selection
                                                                        }
                                                                    }}>
                                                                    <option value="">Select</option>
                                                                    <option value="Processing aid Sodium sterol lactylate">
                                                                        Processing aid Sodium sterol lactylate
                                                                    </option>
                                                                    <option value="antimicrobial agents">antimicrobial agents</option>
                                                                </select>
                                                                <div className="w-1/2 max-lg:w-full flex flex-wrap gap-2">
                                                                    {productSpecifications[selectedProduct.id]?.processingAids?.map(
                                                                        (ingredient, index) => (
                                                                            <span
                                                                                key={index}
                                                                                className="inline-flex h-[30px] whitespace-nowrap items-center px-3  rounded text-sm bg-purple-100 text-purple-700">
                                                                                {ingredient}
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleIngredientToggle(
                                                                                            selectedProduct.id,
                                                                                            'processingAids',
                                                                                            ingredient
                                                                                        )
                                                                                    }
                                                                                    className="ml-2 focus:outline-none text-2xl">
                                                                                    ×
                                                                                </button>
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Other Miscellaneous Ingredients */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Other Miscellaneous Ingredients
                                                            </label>
                                                            <div className="space-y-2 flex max-lg:flex-col gap-4">
                                                                <div className="w-1/2 max-lg:w-full">
                                                                    <input
                                                                        type="text"
                                                                        value={otherIngredients}
                                                                        onChange={(e) => handleOtherIngredientsChange(e, selectedProduct.id)}
                                                                        className="w-full max-lg:w-full p-2 h-fit border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        placeholder="Enter ingredient and separate by comma (,)"
                                                                    />
                                                                    <h4 className="text-xs font-medium text-gray-700 pt-2">
                                                                        Enter ingredient and separate by comma (,){' '}
                                                                    </h4>
                                                                </div>
                                                                <div className="w-1/2 max-lg:w-full flex  flex-wrap gap-2">
                                                                    {productSpecifications[selectedProduct.id]?.otherIngredients?.map(
                                                                        (ingredient, index) => (
                                                                            <span
                                                                                key={index}
                                                                                className="inline-flex h-[30px] items-center px-3 rounded  text-sm bg-blue-100 text-blue-700">
                                                                                {ingredient}
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleIngredientToggle(
                                                                                            selectedProduct.id,
                                                                                            'otherIngredients',
                                                                                            ingredient
                                                                                        )
                                                                                    }
                                                                                    className="ml-2 focus:outline-none text-2xl">
                                                                                    ×
                                                                                </button>
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-500 py-8">
                                                    Select a product from the list to add specifications
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border border-gray-300 rounded">
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleProductSpecificationSubmit()}
                                            className="px-6 py-2 rounded text-white bg-custom-primary">
                                            Submit & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'coa' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-6">COA (Certificate of analysis)</h3>
                                    <div className="space-y-6">
                                        {coaList.map((coa, index) => (
                                            <div
                                                key={coa.id}
                                                className="relative border rounded-lg p-4">
                                                <h4 className="text-lg font-medium mb-4">SL No {String(index + 1).padStart(2, '0')}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">COA Product Name</label>
                                                        <select
                                                            value={coa.productId}
                                                            onChange={(e) => handleCoaChange(coa.id, 'productId', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            COA certification provider
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={coa.provider}
                                                            onChange={(e) => handleCoaChange(coa.id, 'provider', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="SK Laboratories"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Manager of Laboratory</label>
                                                        <input
                                                            type="text"
                                                            value={coa.managerName}
                                                            onChange={(e) => handleCoaChange(coa.id, 'managerName', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Ahmed Maqsood"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Contact no Manager of Laboratory
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={coa.managerContact}
                                                            onChange={(e) => handleCoaChange(coa.id, 'managerContact', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="9876543210"
                                                        />
                                                    </div>
                                                   
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Upload</label>
                                                            <div className="flex items-center  space-x-2 relative border rounded pr-1">
                                                                <input
                                                                    type="text"
                                                                    value={coa.certificateFile?.name || ''}
                                                                    readOnly
                                                                    placeholder="choose file"
                                                                    className="flex-1 p-2 w-[60%]  rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                                                />
                                                                <button
                                                                    onClick={() => handleCoaChange(coa.id, 'certificateFile', null)}
                                                                    className="text-red-500 hover:text-red-700 text-3xl">
                                                                    <span>×</span>
                                                                </button>
                                                                <input
                                                                    type="file"
                                                                    id={`coa-file-${coa.id}`}
                                                                    className="hidden"
                                                                    onChange={(e) => {
                                                                        if (e.target.files.length > 0) {
                                                                            handleCoaChange(coa.id, 'certificateFile', e.target.files[0])
                                                                        }
                                                                        e.target.value = null // Reset file input
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={`coa-file-${coa.id}`}
                                                                    className=" px-1 py-1 text-sm bg-blue-100 text-blue-500 rounded hover:bg-blue-200 cursor-pointer">
                                                                    Choose file
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                               
                                                <button
                                                    onClick={() => handleRemoveCoaRow(coa.id)}
                                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                                                    <BiTrash size={20} />
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            onClick={handleAddCoaRow}
                                            className="flex items-center text-blue-500 hover:text-blue-700">
                                            <BiPlus
                                                size={20}
                                                className="mr-1"
                                            />{' '}
                                            Add row
                                        </button>
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border border-gray-300 rounded"
                                            // Add onClick handler for Back if needed, e.g., navigate to previous subtab
                                        >
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 rounded text-white bg-custom-primary"
                                            // Add onClick handler for Submit, e.g., navigate to next subtab or submit data
                                        >
                                            Submit & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'postAudit' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-4 text-center">
                                        {declarationContent.postAudit.title}
                                    </h3>
                                    <div className="border rounded-lg p-6 max-h-[500px] overflow-y-auto mb-4">
                                        <div className="space-y-4">
                                            {declarationContent.postAudit.paragraphs.map((item, index) => (
                                                <div key={index}>
                                                    {item.heading && <h4 className="font-semibold mb-1 ">{item.heading}</h4>}
                                                    {item.text && <p className="text-sm whitespace-pre-line">{item.text}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            id="acceptPostAuditTerms"
                                            checked={postAuditAccepted}
                                            onChange={() => setPostAuditAccepted(!postAuditAccepted)}
                                            className="mr-2"
                                        />
                                        <label htmlFor="acceptPostAuditTerms" className="text-sm">
                                            I accept the terms & conditions
                                        </label>
                                    </div>
                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }} 
                                            whileTap={{ scale: 0.95 }} 
                                            className="px-6 py-2 border border-gray-300 rounded"
                                            // Add onClick handler for Back
                                        >
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={postAuditAccepted ? { scale: 1.05 } : {}}
                                            whileTap={postAuditAccepted ? { scale: 0.95 } : {}}
                                            disabled={!postAuditAccepted}
                                            className={`px-6 py-2 rounded text-white bg-custom-primary ${
                                                postAuditAccepted ? '' : 'opacity-50 cursor-not-allowed'
                                            }`}
                                            // Add onClick handler for Accept & Continue
                                        >
                                            Accept & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'supplierDeclaration' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-4 text-center">
                                        {declarationContent.supplierDeclaration.title}
                                    </h3>
                                    <div className="border rounded-lg p-6 max-h-[500px] overflow-y-auto mb-4">
                                        <div className="space-y-4">
                                            {declarationContent.supplierDeclaration.paragraphs.map((item, index) => (
                                                <div key={index}>
                                                    {item.heading && <h4 className="font-semibold mb-1">{item.heading}</h4>}
                                                    {item.text && <p className="text-sm whitespace-pre-line">{item.text}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            id="acceptSupplierTerms"
                                            checked={supplierDeclarationAccepted}
                                            onChange={() => setSupplierDeclarationAccepted(!supplierDeclarationAccepted)}
                                            className="mr-2"
                                        />
                                        <label htmlFor="acceptSupplierTerms" className="text-sm">
                                            I accept the terms & conditions
                                        </label>
                                    </div>
                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }} 
                                            whileTap={{ scale: 0.95 }} 
                                            className="px-6 py-2 border border-gray-300 rounded"
                                            // Add onClick handler for Back
                                        >
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={supplierDeclarationAccepted ? { scale: 1.05 } : {}}
                                            whileTap={supplierDeclarationAccepted ? { scale: 0.95 } : {}}
                                            disabled={!supplierDeclarationAccepted}
                                            className={`px-6 py-2 rounded text-white bg-custom-primary ${
                                                supplierDeclarationAccepted ? '' : 'opacity-50 cursor-not-allowed'
                                            }`}
                                            // Add onClick handler for Accept & Continue
                                        >
                                            Accept & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'menuList' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-6">Menu List</h3>
                                    <div className="space-y-6">
                                        {menuListItems.map((item, index) => (
                                            <div key={item.id} className="relative border rounded-lg p-4">
                                                <h4 className="text-lg font-medium mb-4">SL No {String(index + 1).padStart(2, '0')}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Product name / Name of dish
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(e) => handleMenuItemChange(item.id, 'name', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Malai Chicken Recipe."
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Category
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={item.category}
                                                            onChange={(e) => handleMenuItemChange(item.id, 'category', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="North Indian"
                                                        />
                                                    </div>
                                                    {/* Conditional rendering for Price input OR Label input based on some logic or just show both if needed */}
                                                    {/* Example: Show Price Input */}
                                                     <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Price
                                                        </label>
                                                        <input
                                                            type="text" // Consider using type="number" and formatting
                                                            value={item.price}
                                                            onChange={(e) => handleMenuItemChange(item.id, 'price', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="₹ 499"
                                                        />
                                                    </div>
                                                    {/* Example: Show Label Input (maybe conditionally) */}
                                                    {/* <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Label*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={item.label}
                                                            onChange={(e) => handleMenuItemChange(item.id, 'label', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder="Your text here"
                                                        />
                                                    </div> */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Price (Type/Portion) {/* Adjust label as needed */}
                                                        </label>
                                                        <select
                                                            value={item.priceType}
                                                            onChange={(e) => handleMenuItemChange(item.id, 'priceType', e.target.value)}
                                                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="fixed">Fixed</option>
                                                            <option value="variable">Variable</option>
                                                            <option value="half">Half Plate</option>
                                                            <option value="full">Full Plate</option>
                                                            {/* Add other relevant options */}
                                                        </select>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveMenuItem(item.id)}
                                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                                                    <BiTrash size={20} />
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            onClick={handleAddMenuItem}
                                            className="flex items-center text-blue-500 hover:text-blue-700">
                                            <BiPlus size={20} className="mr-1" /> Add row
                                        </button>
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border border-gray-300 rounded"
                                             // Add onClick handler for Back
                                        >
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 rounded text-white bg-custom-primary"
                                             // Add onClick handler for Submit
                                        >
                                            Submit & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'hotelService' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-4">Star Hotels and Hospitality Service List</h3>
                                    <p>Star Hotels and Hospitality Service List content goes here...</p>
                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border border-gray-300 rounded">
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 rounded text-white bg-custom-primary">
                                            Submit & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'healthService' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-4">Hospital and Health Care Service List</h3>
                                    <p>Hospital and Health Care Service List content goes here...</p>
                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border border-gray-300 rounded">
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 rounded text-white bg-custom-primary">
                                            Submit & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                            {activeServiceSubTab === 'meatProcurement' && (
                                <div className="bg-white border rounded-lg p-6">
                                    <h3 className="text-xl font-medium mb-4">Meat Procurement List</h3>
                                    <p>Meat Procurement List content goes here...</p>
                                    <div className="flex justify-end space-x-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border border-gray-300 rounded">
                                            Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 rounded text-white bg-custom-primary">
                                            Submit & Continue
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Certification

