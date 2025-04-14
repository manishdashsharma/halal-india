import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FiDownload, FiEdit, FiSave, FiXCircle } from 'react-icons/fi';
import { Country, State, City } from 'country-state-city';

// Define options for the radio groups
const plantTypeOptions = ['Trader/Exporter', 'Self Manufacture', 'Contract Manufacturer', 'Other'];
const industryNameOptions = ['Food', 'Non Food', 'Pharmaceutical', 'Cosmeceutical', 'Nutraceutical', 'Other'];

// Dummy data based on the image - replace with props or state management later
const initialFormData = {
  companyProfile: {
    name: 'SavoryBite',
    applicationDate: '2024-01-24',
    registeredOfficeAddress: 'P Block, Anna Nagar, Chennai, Tamil',
    lineAddress: 'P Block, Anna Nagar, Chennai, Tamil',
    country: 'IN',
    state: 'TN',
    city: 'Chennai',
    zipCode: '600001',
    websiteURL: 'http://SavoryBite.com',
    contactNumber: '(+91) 9876-054598',
  },
  manufacturingPlantProfile: {
    plantName: 'Protein manufacturing plant',
    plantAddress: '7, Twenty Star Complex, 2nd line, Beach Rd',
    plantLineAddress: '7, Twenty Star Complex, 2nd line, Beach Rd',
    country: 'IN',
    state: 'TN',
    city: 'Chennai',
    zipCode: '600004',
    type: 'Trader/Exporter',
    typeOtherSpecify: '',
    nameOfIndustry: 'Other',
    nameOfIndustryOtherSpecify: 'Fitness food',
    certificationStandards: 'Enter here',
  },
  correspondencePerson: {
    name: 'Atif khan',
    designation: 'Manager',
    contactNumberPhone: '(+91) 9876-054598',
    contactNumberLandline: '0755-6121781',
    email: 'Atifkhan@gmail.com',
  },
  productInformation: {
    halalCertified: 4,
    totalProduced: 10,
    productGroups: 2,
    brands: 4,
    productVarieties: 12,
  },
};


const Section = ({ title, children, id }) => (
  <motion.div
    id={id}
    className="mb-10 pt-2" // Added padding-top for scroll offset
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-semibold text-gray-700 mb-5 border-b pb-2">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
      {children}
    </div>
  </motion.div>
);

const InfoItem = ({ label, value, isEditing, onChange, type = 'text', placeholder = '' }) => (
  <div className="mb-2">
    <span className="block text-xs text-gray-500 mb-0.5">{label}</span>
    {isEditing ? (
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder || label}
        className="font-medium text-gray-800 border border-gray-300 rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
      />
    ) : (
      <span className="font-medium text-gray-800">{value || '-'}</span>
    )}
  </div>
);

const SelectInput = ({ label, value, onChange, options, isEditing, disabled = false, valueKey = 'isoCode', labelKey = 'name', placeholder = 'Select...' }) => (
    <div className="mb-2">
      <span className="block text-xs text-gray-500 mb-0.5">{label}</span>
      {isEditing ? (
        <select
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          className={`font-medium text-gray-800 border border-gray-300 rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
            </option>
          ))}
        </select>
      ) : (
        <span className="font-medium text-gray-800">
          {/* Find the label corresponding to the value for display */}
          {options.find(opt => opt[valueKey] === value)?.[labelKey] || value || '-'}
        </span>
      )}
    </div>
  );

// New component for Radio Button Group
const RadioGroupInput = ({ label, name, options, selectedValue, otherSpecifyValue, onChange, onOtherChange, isEditing }) => {
  const showOtherInput = selectedValue === 'Other';

  return (
    <div className="mb-4 md:col-span-2">
      <span className="block text-xs text-gray-500 mb-1.5">{label}</span>
      {isEditing ? (
        <div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name={name}
                  value={option}
                  checked={selectedValue === option}
                  onChange={onChange}
                  className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span>{option === 'Other' ? 'Other (Specify)' : option}</span>
              </label>
            ))}
          </div>
          {showOtherInput && (
            <div className="mt-2">
              <input
                type="text"
                value={otherSpecifyValue || ''}
                onChange={onOtherChange}
                placeholder="Please specify"
                className="font-medium text-gray-800 border border-gray-300 rounded px-2 py-1 w-full md:w-1/2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          )}
        </div>
      ) : (
        <span className="font-medium text-gray-800">
          {selectedValue === 'Other' ? `Other (${otherSpecifyValue || 'Not specified'})` : selectedValue || '-'}
        </span>
      )}
    </div>
  );
};


function HalalCertificationApplicationForm({ onBack, onApprove }) {
  const sections = {
    companyProfile: 'Company Profile',
    manufacturingPlant: 'Manufacturing Plant Profile',
    correspondencePerson: 'Correspondence Person',
    productInformation: 'Product Information',
  };
  const sectionRefs = useRef({});
  const [activeSubTab, setActiveSubTab] = useState('companyProfile');
  const [isEditing, setIsEditing] = useState(false);
  const [currentFormData, setCurrentFormData] = useState(initialFormData);

  // Location Data State
  const [countries, setCountries] = useState([]);
  const [companyStates, setCompanyStates] = useState([]);
  const [companyCities, setCompanyCities] = useState([]);
  const [plantStates, setPlantStates] = useState([]);
  const [plantCities, setPlantCities] = useState([]);

  // Load countries on mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load company states when company country changes
  useEffect(() => {
    const companyCountryCode = currentFormData.companyProfile.country;
    if (companyCountryCode) {
      setCompanyStates(State.getStatesOfCountry(companyCountryCode));
    } else {
      setCompanyStates([]);
      setCompanyCities([]); // Reset cities if country is cleared
    }
    // Reset state/city if country changes *during* editing
    if (isEditing && companyCountryCode !== initialFormData.companyProfile.country) {
        setCurrentFormData(prev => ({
            ...prev,
            companyProfile: { ...prev.companyProfile, state: '', city: '' }
        }));
    }
  }, [currentFormData.companyProfile.country, isEditing]); // Add isEditing dependency

  // Load company cities when company state changes
  useEffect(() => {
    const companyCountryCode = currentFormData.companyProfile.country;
    const companyStateCode = currentFormData.companyProfile.state;
    if (companyCountryCode && companyStateCode) {
      setCompanyCities(City.getCitiesOfState(companyCountryCode, companyStateCode));
    } else {
      setCompanyCities([]);
    }
     // Reset city if state changes *during* editing
    if (isEditing && companyStateCode !== initialFormData.companyProfile.state) {
        setCurrentFormData(prev => ({
            ...prev,
            companyProfile: { ...prev.companyProfile, city: '' }
        }));
    }
  }, [currentFormData.companyProfile.country, currentFormData.companyProfile.state, isEditing]); // Add isEditing

   // Load plant states when plant country changes
  useEffect(() => {
    const plantCountryCode = currentFormData.manufacturingPlantProfile.country;
    if (plantCountryCode) {
      setPlantStates(State.getStatesOfCountry(plantCountryCode));
    } else {
      setPlantStates([]);
      setPlantCities([]); // Reset cities if country is cleared
    }
     // Reset state/city if country changes *during* editing
    if (isEditing && plantCountryCode !== initialFormData.manufacturingPlantProfile.country) {
        setCurrentFormData(prev => ({
            ...prev,
            manufacturingPlantProfile: { ...prev.manufacturingPlantProfile, state: '', city: '' }
        }));
    }
  }, [currentFormData.manufacturingPlantProfile.country, isEditing]); // Add isEditing

  // Load plant cities when plant state changes
  useEffect(() => {
    const plantCountryCode = currentFormData.manufacturingPlantProfile.country;
    const plantStateCode = currentFormData.manufacturingPlantProfile.state;
    if (plantCountryCode && plantStateCode) {
      setPlantCities(City.getCitiesOfState(plantCountryCode, plantStateCode));
    } else {
      setPlantCities([]);
    }
     // Reset city if state changes *during* editing
    if (isEditing && plantStateCode !== initialFormData.manufacturingPlantProfile.state) {
        setCurrentFormData(prev => ({
            ...prev,
            manufacturingPlantProfile: { ...prev.manufacturingPlantProfile, city: '' }
        }));
    }
  }, [currentFormData.manufacturingPlantProfile.country, currentFormData.manufacturingPlantProfile.state, isEditing]); // Add isEditing


  // Updated handler for general inputs and selects
  const handleInputChange = (section, field) => (event) => {
    const { value } = event.target;
    setCurrentFormData(prevData => {
        const updatedSection = { ...prevData[section], [field]: value };

        // Reset dependent fields when a higher-level field changes
        if (field === 'country') {
            updatedSection.state = '';
            updatedSection.city = '';
        } else if (field === 'state') {
            updatedSection.city = '';
        }

        return {
            ...prevData,
            [section]: updatedSection
        };
    });
};

  // Specific handler for radio buttons
  const handleRadioChange = (section, field) => (event) => {
     const { value } = event.target;
     setCurrentFormData(prevData => ({
       ...prevData,
       [section]: {
         ...prevData[section],
         [field]: value,
         // Clear other specify field if a non-other option is chosen
         [`${field}OtherSpecify`]: value !== 'Other' ? '' : prevData[section][`${field}OtherSpecify`],
       }
     }));
   };

  // Specific handler for the "Other Specify" text inputs
  const handleOtherSpecifyChange = (section, field) => (event) => {
     setCurrentFormData(prevData => ({
       ...prevData,
       [section]: {
         ...prevData[section],
         [`${field}OtherSpecify`]: event.target.value,
       }
     }));
   };

   const handleSave = () => {
     console.log('Saving data:', currentFormData);
     setIsEditing(false);
   };

   const handleCancelEdit = () => {
       setCurrentFormData(initialFormData);
       setIsEditing(false);
   }

  const scrollToSection = (id) => {
    setActiveSubTab(id);
    const element = document.getElementById(id);
    if (element) {
        // Calculate position, considering potential fixed headers
        const offset = 80; // Adjust this value based on your header height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
  };


  return (
    <div className="">
       <div className="flex justify-between items-center  mb-6">
            {/* Sub Navigation Tabs */}
            <div className="flex space-x-6">
                {Object.entries(sections).map(([id, title]) => (
                <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    disabled={isEditing}
                    className={`py-2 px-1 text-sm font-medium focus:outline-none border-b-2 ${
                    activeSubTab === id
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } ${isEditing ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {title}
                </button>
                ))}
            </div>
             {/* Action Buttons - Top Right */}
             <div className="flex space-x-3">
                 {!isEditing && (
                     <button className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center text-gray-700 shadow-sm">
                       <FiDownload className="h-3.5 w-3.5 mr-1.5" />
                        Download
                     </button>
                 )}
                 <button
                    onClick={isEditing ? handleCancelEdit : () => setIsEditing(true)}
                    className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 flex items-center text-gray-700 shadow-sm"
                 >
                    {isEditing ? (
                        <> <FiXCircle className="h-3.5 w-3.5 mr-1.5 text-red-500" /> Cancel </>
                     ) : (
                        <> <FiEdit className="h-3.5 w-3.5 mr-1.5" /> Edit </>
                     )}
                 </button>
                 {isEditing && (
                     <button
                         onClick={handleSave}
                         className="text-xs px-3 py-1.5 border border-transparent rounded shadow-sm flex items-center text-white bg-teal-600 hover:bg-teal-700"
                     >
                         <FiSave className="h-3.5 w-3.5 mr-1.5" />
                         Save Changes
                     </button>
                 )}
            </div>
        </div>


      {/* Company Profile Section */}
      <Section title="Company Profile" id="companyProfile" ref={(el) => (sectionRefs.current.companyProfile = el)}>
        <InfoItem label="Company/Business Name" value={currentFormData.companyProfile.name} isEditing={isEditing} onChange={handleInputChange('companyProfile', 'name')} />
        <InfoItem label="Application Date" value={currentFormData.companyProfile.applicationDate} isEditing={isEditing} onChange={handleInputChange('companyProfile', 'applicationDate')} type="date" />
        <InfoItem label="Registered Office Address" value={currentFormData.companyProfile.registeredOfficeAddress} isEditing={isEditing} onChange={handleInputChange('companyProfile', 'registeredOfficeAddress')} />
        <InfoItem label="Line Address (Optional)" value={currentFormData.companyProfile.lineAddress} isEditing={isEditing} onChange={handleInputChange('companyProfile', 'lineAddress')} />

        {/* Country Select */}
        <SelectInput
             label="Country"
             value={currentFormData.companyProfile.country}
             options={countries}
             onChange={handleInputChange('companyProfile', 'country')}
             isEditing={isEditing}
             placeholder="Select Country"
         />
         {/* State Select */}
        <SelectInput
             label="State"
             value={currentFormData.companyProfile.state}
             options={companyStates}
             onChange={handleInputChange('companyProfile', 'state')}
             isEditing={isEditing}
             disabled={!currentFormData.companyProfile.country || !isEditing}
             placeholder="Select State"
         />
         {/* City Select */}
         <SelectInput
             label="City"
             value={currentFormData.companyProfile.city}
             options={companyCities}
             valueKey="name"
             labelKey="name"
             onChange={handleInputChange('companyProfile', 'city')}
             isEditing={isEditing}
             disabled={!currentFormData.companyProfile.state || !isEditing}
             placeholder="Select City"
         />

        <InfoItem label="Zip Code" value={currentFormData.companyProfile.zipCode} isEditing={isEditing} onChange={handleInputChange('companyProfile', 'zipCode')} />
        <InfoItem label="Website URL" value={currentFormData.companyProfile.websiteURL} isEditing={isEditing} onChange={handleInputChange('companyProfile', 'websiteURL')} type="url" />
        <InfoItem label="Contact Number" value={currentFormData.companyProfile.contactNumber} isEditing={isEditing} onChange={handleInputChange('companyProfile', 'contactNumber')} type="tel"/>
      </Section>

      {/* Manufacturing Plant Profile Section */}
      <Section title="Manufacturing Plant Profile" id="manufacturingPlant" ref={(el) => (sectionRefs.current.manufacturingPlant = el)}>
        <InfoItem label="Plant Name" value={currentFormData.manufacturingPlantProfile.plantName} isEditing={isEditing} onChange={handleInputChange('manufacturingPlantProfile', 'plantName')} />
        <InfoItem label="Plant Address" value={currentFormData.manufacturingPlantProfile.plantAddress} isEditing={isEditing} onChange={handleInputChange('manufacturingPlantProfile', 'plantAddress')} />
        <InfoItem label="Plant Line Address" value={currentFormData.manufacturingPlantProfile.plantLineAddress} isEditing={isEditing} onChange={handleInputChange('manufacturingPlantProfile', 'plantLineAddress')} />

         {/* Plant Country Select */}
        <SelectInput
             label="Country"
             value={currentFormData.manufacturingPlantProfile.country}
             options={countries}
             onChange={handleInputChange('manufacturingPlantProfile', 'country')}
             isEditing={isEditing}
             placeholder="Select Country"
         />
         {/* Plant State Select */}
        <SelectInput
             label="State"
             value={currentFormData.manufacturingPlantProfile.state}
             options={plantStates}
             onChange={handleInputChange('manufacturingPlantProfile', 'state')}
             isEditing={isEditing}
             disabled={!currentFormData.manufacturingPlantProfile.country || !isEditing}
             placeholder="Select State"
         />
         {/* Plant City Select */}
         <SelectInput
             label="City"
             value={currentFormData.manufacturingPlantProfile.city}
             options={plantCities}
             valueKey="name"
             labelKey="name"
             onChange={handleInputChange('manufacturingPlantProfile', 'city')}
             isEditing={isEditing}
             disabled={!currentFormData.manufacturingPlantProfile.state || !isEditing}
             placeholder="Select City"
         />

        <InfoItem label="Zip Code" value={currentFormData.manufacturingPlantProfile.zipCode} isEditing={isEditing} onChange={handleInputChange('manufacturingPlantProfile', 'zipCode')} />

        {/* Radio Group for Type */}
        <RadioGroupInput
            label="Type"
            name="plantType"
            options={plantTypeOptions}
            selectedValue={currentFormData.manufacturingPlantProfile.type}
            otherSpecifyValue={currentFormData.manufacturingPlantProfile.typeOtherSpecify}
            onChange={handleRadioChange('manufacturingPlantProfile', 'type')}
            onOtherChange={handleOtherSpecifyChange('manufacturingPlantProfile', 'type')}
            isEditing={isEditing}
        />

        {/* Radio Group for Name of Industry */}
         <RadioGroupInput
            label="Name of Industry"
            name="industryName"
            options={industryNameOptions}
            selectedValue={currentFormData.manufacturingPlantProfile.nameOfIndustry}
            otherSpecifyValue={currentFormData.manufacturingPlantProfile.nameOfIndustryOtherSpecify}
            onChange={handleRadioChange('manufacturingPlantProfile', 'nameOfIndustry')}
            onOtherChange={handleOtherSpecifyChange('manufacturingPlantProfile', 'nameOfIndustry')}
            isEditing={isEditing}
        />

        <InfoItem label="Certification & Standards of the plant" value={currentFormData.manufacturingPlantProfile.certificationStandards} isEditing={isEditing} onChange={handleInputChange('manufacturingPlantProfile', 'certificationStandards')} />
      </Section>

      {/* Correspondence Person Section */}
      <Section title="Correspondence Person" id="correspondencePerson" ref={(el) => (sectionRefs.current.correspondencePerson = el)}>
        <InfoItem label="Name" value={currentFormData.correspondencePerson.name} isEditing={isEditing} onChange={handleInputChange('correspondencePerson', 'name')} />
        <InfoItem label="Designation" value={currentFormData.correspondencePerson.designation} isEditing={isEditing} onChange={handleInputChange('correspondencePerson', 'designation')} />
        <InfoItem label="Contact Number (Phone)" value={currentFormData.correspondencePerson.contactNumberPhone} isEditing={isEditing} onChange={handleInputChange('correspondencePerson', 'contactNumberPhone')} type="tel"/>
        <InfoItem label="Contact Number (Landline)" value={currentFormData.correspondencePerson.contactNumberLandline} isEditing={isEditing} onChange={handleInputChange('correspondencePerson', 'contactNumberLandline')} type="tel"/>
        <InfoItem label="Email" value={currentFormData.correspondencePerson.email} isEditing={isEditing} onChange={handleInputChange('correspondencePerson', 'email')} type="email"/>
      </Section>

      {/* Product Information Section */}
      <Section title="Product Information" id="productInformation" ref={(el) => (sectionRefs.current.productInformation = el)}>
        <InfoItem label="No. of Products to be Halal Certified" value={currentFormData.productInformation.halalCertified} isEditing={isEditing} onChange={handleInputChange('productInformation', 'halalCertified')} type="number" />
        <InfoItem label="Total No. of Products Produced in the Plant" value={currentFormData.productInformation.totalProduced} isEditing={isEditing} onChange={handleInputChange('productInformation', 'totalProduced')} type="number" />
        <InfoItem label="Product Groups" value={currentFormData.productInformation.productGroups} isEditing={isEditing} onChange={handleInputChange('productInformation', 'productGroups')} />
        <InfoItem label="Brands of Products" value={currentFormData.productInformation.brands} isEditing={isEditing} onChange={handleInputChange('productInformation', 'brands')} />
        <InfoItem label="Product Varieties" value={currentFormData.productInformation.productVarieties} isEditing={isEditing} onChange={handleInputChange('productInformation', 'productVarieties')} />
      </Section>

       {/* Bottom Action Buttons */}
       <div className="flex justify-end space-x-3 mt-8 border-t pt-6">
         {isEditing ? (
            <>
              <button
                 onClick={handleCancelEdit}
                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
                  Cancel
              </button>
              <button
                  onClick={handleSave}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                  Save Changes
              </button>
            </>
         ) : (
            <>
               <button
                 onClick={onBack}
                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
                  Back
               </button>
               <button
                   onClick={onApprove}
                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                   Approve
               </button>
            </>
         )}
      </div>
    </div>
  );
}

export default HalalCertificationApplicationForm;
