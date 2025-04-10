import React, { useState } from 'react';
import { X, Edit, Eye, RefreshCw } from 'lucide-react'; // Assuming you use lucide-react for icons

const GenerateCredentialsModal = ({ isOpen, onClose, userData, onConfirmAndSend }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // You might want to manage the email state here as well if it's editable
    const [email, setEmail] = useState(userData?.email || '');
    const [isEditingEmail, setIsEditingEmail] = useState(false);


    if (!isOpen) return null;

    const handleGeneratePassword = () => {
        // Add your password generation logic here
        const generatedPassword = Math.random().toString(36).slice(-8); // Example generator
        setPassword(generatedPassword);
    };

    const handleConfirm = () => {
        // Pass the potentially edited email and generated password
        onConfirmAndSend({ email, password });
        onClose(); // Close modal on confirm
    }

    return (
        <div className="fixed  inset-0 bg-[#00000027]  flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-2">Generate Credentials</h2>
                <p className="text-sm text-gray-600 mb-4">Generating credentials for</p>

                {/* User Details */}
                <div className="mb-4 border-b pb-4">
                    <p className="font-medium">{userData?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-600">{userData?.phone || 'N/A'}</p>
                    <p className="text-sm text-gray-600">{userData?.service || 'N/A'}</p>
                </div>

                {/* Email Section */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly={!isEditingEmail}
                            className={`flex-grow p-2 border rounded-md ${!isEditingEmail ? 'bg-gray-100' : 'border-blue-300'}`}
                        />
                         <button
                            onClick={() => setIsEditingEmail(!isEditingEmail)}
                            className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <Edit size={16} className="mr-1" />
                            {isEditingEmail ? 'Save' : 'Edit'}
                        </button>
                    </div>
                     <p className="text-xs text-gray-500 mt-1">
                       Confirm email address with the client before generating password
                    </p>
                </div>

                {/* Password Section */}
                <div className="mb-6">
                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                       Password
                    </label>
                    <div className="flex items-center space-x-2">
                       <div className="relative flex-grow">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Generate or type password"
                                className="w-full p-2 border rounded-md pr-10" // Added padding right for the icon
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                <Eye size={18} />
                            </button>
                        </div>
                        <button
                             onClick={handleGeneratePassword}
                             className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <RefreshCw size={16} className="mr-1" />
                            Generate
                        </button>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleConfirm}
                    disabled={!password || !email} // Disable if no password or email
                    className="w-full bg-custom-primary hover:bg-custom-tertiary text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                     Confirm and send
                 </button>
            </div>
        </div>
    );
};

export default GenerateCredentialsModal;