import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react'; // Combined imports
import ProductListingTab from './ServiceListingSubTabs/ProductListingTab';
import RawMaterialTab from './ServiceListingSubTabs/RawMaterialTab'; // Import the new component
import ProductSpecificationTab from './ServiceListingSubTabs/ProductSpecificationTab'; // Import the Product Specification tab
import CoaTab from './ServiceListingSubTabs/CoaTab'; // Import the COA tab component
import PostAuditDeclarationTab from './ServiceListingSubTabs/PostAuditDeclarationTab';
import SupplierDeclarationTab from './ServiceListingSubTabs/SupplierDeclarationTab'; // <-- Import SupplierDeclarationTab
import StatusConfirmationModal from './StatusConfirmationModal'; // Import the modal
import { useRecoilState, useRecoilValue } from 'recoil';
import { userApprovalDashboardState } from '@/state/leadsCenterState';
import MenuListTab from './ServiceListingSubTabs/MenuListTab';
import StarHotelsTab from './ServiceListingSubTabs/StarHotelsTab';
import HospitalHealthTab from './ServiceListingSubTabs/HospitalHealthTab';
import MeatProcurementTab from './ServiceListingSubTabs/MeatProcurementTab';

const ServiceListing = ({ onBack, onConfirm }) => { // Removed approvedLead from props as we use Recoil
  // State for checkboxes - Initial state based on the "Selected" items in the image
  const [selectedItems, setSelectedItems] = useState({
    productListing: true,
    rawMaterial: true,
    productSpec: false,
    coa: true,
    postAudit: true,
    supplierDeclaration: true,
    menuList: false,
    starHotels: false,
    hospitalHealth: false,
    meatProcurement: false,
  });

  const [activeServiceSubTab, setActiveServiceSubTab] = useState('productListing'); // State for active sub-tab
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // State for modal visibility

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedItems(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleServiceSubTabChange = (subTab) => {
    setActiveServiceSubTab(subTab);
  };

  // Animation properties consistent with HalalCertificateApplicationForm sections
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleRequiredDocument = () => {
    console.log('required documents ');
  };

  // Animation variants for sub-tab content
  const subTabContentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  // Get data from Recoil
  const { approvedTab } = useRecoilValue(userApprovalDashboardState); // Assuming approvedTab holds the data needed

  // Modal handlers
  const handleOpenStatusModal = () => {
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
  };

  const handleConfirmStatus = (status) => {
    console.log('Selected Status:', status);
    onConfirm(status);
    setIsStatusModalOpen(false);
  };

  if (approvedTab) { // Check the Recoil state value
    // Dynamically generate tabs based on approvedTab data structure
    // TODO: Refine this logic based on actual available data in approvedTab
    const availableSubTabs = [
      { id: 'productListing', label: 'Product listing', component: ProductListingTab },
      { id: 'rawMaterial', label: 'Raw material / Ingredient list', component: RawMaterialTab },
      { id: 'productSpecification', label: 'Product specification', component: ProductSpecificationTab },
      { id: 'coa', label: 'COA (Certificate of analysis)', component: CoaTab },
      { id: 'postAudit', label: 'Post Audit declaration', component: PostAuditDeclarationTab },
      { id: 'supplierDeclaration', label: 'Supplier declaration', component: SupplierDeclarationTab }, // <-- Add SupplierDeclarationTab
      { id: 'menuList', label: 'Menu list', component: MenuListTab },
      { id: 'starHotels', label: 'Star hotels and hospitality service list', component: StarHotelsTab },
      { id: 'hospitalHealth', label: 'Hospital and Health care service list', component: HospitalHealthTab },
      { id: 'meatProcurement', label: 'Meat procurement list', component: MeatProcurementTab },
    ];

    const currentTabIndex = availableSubTabs.findIndex(tab => tab.id === activeServiceSubTab);

    const goToNextSubTab = () => {
      if (currentTabIndex < availableSubTabs.length - 1) {
        setActiveServiceSubTab(availableSubTabs[currentTabIndex + 1].id);
      }
    };

    const goToPreviousSubTab = () => {
      if (currentTabIndex > 0) {
        setActiveServiceSubTab(availableSubTabs[currentTabIndex - 1].id);
      }
    };

    // Extract data for tabs (adjust structure as needed based on Recoil state)
    const productListingData = approvedTab?.productListingData || [];
    const rawMaterialData = approvedTab?.rawMaterialData || [];
    const productSpecData = approvedTab?.productSpecData || {};
    const coaData = approvedTab?.coaData || [];
    const postAuditStatus = approvedTab?.postAuditStatus || 'Pending'; // Example: Get status
    const supplierDeclarationStatus = approvedTab?.supplierDeclarationStatus || 'Pending'; // Example: Get status
    const menuListData = approvedTab?.menuListData || []; // Extract menu list data
    const hotelServicesData = approvedTab?.hotelServicesData || []; // Extract menu list data
    const hospitalHealthData = approvedTab?.hospitalHealthData || []; // Extract menu list data
    const meatProcurementData = approvedTab?.meatProcurementData || []; // Extract menu list data

    // Optionally pass declaration titles if they come from API
    // const postAuditTitle = approvedTab?.postAuditTitle || 'Post Audit declaration';
    // const supplierDeclarationTitle = approvedTab?.supplierDeclarationTitle || 'Supplier declaration';

    
    // Combine product list for spec and coa tabs
    const combinedProductList = productListingData; // Assuming productListingData has {id, productName}

    return (
      <motion.div {...animationProps}>
        {/* Sub tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-2 overflow-x-auto overflow-y-hidden pb-2  pr-4">
            {availableSubTabs.map((subTab) => (
              <motion.button
                key={subTab.id}
                onClick={() => handleServiceSubTabChange(subTab.id)}
                className={`px-4 py-3 -mb-px border-b-[1px] text-sm whitespace-nowrap font-medium relative   ${
                  activeServiceSubTab === subTab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {subTab.label}
                {activeServiceSubTab === subTab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-teal-500"
                    layoutId="serviceSubTabIndicator"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-6 min-h-[300px]"> {/* Added min-height */}
          <AnimatePresence mode="wait">
            {availableSubTabs.map((tab, index) => {
              const TabComponent = tab.component;
              const isFirstTab = index === 0;
              const isLastTab = index === availableSubTabs.length - 1;

              const commonProps = {
                key: tab.id,
                variants: subTabContentVariants,
                initial: 'hidden',
                animate: 'visible',
                exit: 'exit',
              };

              const navProps = {
                onPrevious: isFirstTab ? onBack : goToPreviousSubTab, // First tab's previous goes back fully
                onNext: isLastTab ? handleOpenStatusModal : goToNextSubTab, // Last tab's next opens the modal
                isFirstTab: isFirstTab,
                isLastTab: isLastTab,
              };

              // Specific data props for each tab
              let dataProps = {};
              switch (tab.id) {
                case 'productListing':
                  dataProps = { productData: productListingData };
                  break;
                case 'rawMaterial':
                  dataProps = { rawMaterialData: rawMaterialData };
                  break;
                case 'productSpecification':
                  dataProps = { productSpecData: productSpecData, productList: combinedProductList };
                  break;
                case 'coa':
                  dataProps = { coaData: coaData, productList: combinedProductList };
                  break;
                case 'postAudit':
                   // Pass the status from your data source
                  dataProps = { initialStatus: postAuditStatus };
                   // Optionally pass title: declarationTitle: postAuditTitle
                  break;
                case 'supplierDeclaration':
                   // Pass the status from your data source
                   dataProps = { initialStatus: supplierDeclarationStatus };
                   // Optionally pass title: declarationTitle: supplierDeclarationTitle
                  break;
                case 'menuList':
                  dataProps = { menuListData: menuListData };
                  break;
                case 'starHotels':
                  dataProps = { hotelServicesData: hotelServicesData  };
                  break;
                case 'hospitalHealth':
                  dataProps = { hospitalHealthData: hospitalHealthData };
                  break;
                case 'meatProcurement':
                  dataProps = { meatProcurementData: meatProcurementData };
                  break;
                default:
                  break;
              }

              return activeServiceSubTab === tab.id ? (
                <motion.div {...commonProps}>
                  <TabComponent {...navProps} />
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>
        </div>

        {/* Render the modal */}
        <StatusConfirmationModal
            isOpen={isStatusModalOpen}
            onClose={handleCloseStatusModal}
            onConfirmStatus={handleConfirmStatus}
        />
      </motion.div>
    );
  }

  // Original return for when approvedTab is false (checkbox selection view)
  return (
      <motion.div
      className=""
      {...animationProps} // Spread the animation props
    >
      {/* Placeholder for forms/documents */}
      <div className="border border-gray-300 text-sm rounded-md p-3 text-center text-gray-500 mb-8 bg-gray-50">
        Forms and documents will show here once you confirm
      </div>

      {/* Confirm Required Forms and Documents Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Required Forms and Documents</h3>

        {/* Selected Items */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Selected</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {/* Checkbox Item: Product listing */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="productListing"
                checked={selectedItems.productListing}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300" // Added border color for consistency
              />
              <span className="text-sm text-gray-700">Product listing</span>
            </label>
             {/* Checkbox Item: Raw material / Ingredient list */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="rawMaterial"
                
                checked={selectedItems.rawMaterial}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Raw material / Ingredient list</span>
            </label>
             {/* Checkbox Item: Product specification */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="productSpec"
                checked={selectedItems.productSpec}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Product specification</span>
            </label>
             {/* Checkbox Item: COA */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="coa"
                checked={selectedItems.coa}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">COA (Certificate of analysis)</span>
            </label>
             {/* Checkbox Item: Post audit declaration */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="postAudit"
                checked={selectedItems.postAudit}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Post audit declaration</span>
            </label>
             {/* Checkbox Item: Supplier declaration */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="supplierDeclaration"
                checked={selectedItems.supplierDeclaration}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Supplier declaration</span>
            </label>
          </div>
        </div>

        {/* Add More Items */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Add more</p>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
             {/* Checkbox Item: Menu list */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="menuList"
                checked={selectedItems.menuList}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Menu list</span>
            </label>
             {/* Checkbox Item: Star hotels */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="starHotels"
                checked={selectedItems.starHotels}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Star hotels and hospitality service list</span>
            </label>
             {/* Checkbox Item: Hospital and Health care */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="hospitalHealth"
                checked={selectedItems.hospitalHealth}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Hospital and Health care service list</span>
            </label>
             {/* Checkbox Item: Meat procurement */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="meatProcurement"
                checked={selectedItems.meatProcurement}
                onChange={handleCheckboxChange}
                className="rounded text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Meat procurement list</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-8">
        <button
          onClick={handleRequiredDocument}
          className="px-5 py-2 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 border border-transparent"
        >
          Confirm and send
        </button>
      </div>
    </motion.div> // Closing tag for motion.div
  );
};

export default ServiceListing;