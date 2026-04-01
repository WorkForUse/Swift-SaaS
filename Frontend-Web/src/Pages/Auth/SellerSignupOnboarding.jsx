import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Lock, User, Store, Phone, Password, Check, AlertCircle,
  Eye, EyeOff, ArrowRight, ShieldCheck, TrendingUp, Briefcase
} from 'lucide-react';
import apiService from '../../services/apiService';

const SellerSignupOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Personal, 2: Shop, 3: Documents, 4: Confirmation
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'seller@example.com',
    username: 'mike_seller',
    phone: '+1-555-123-4567',
    password: 'seller123',
    confirmPassword: 'seller123',
    shopName: 'Books Plus',
    shopDescription: 'Premium textbooks and educational materials',
    shopCategory: 'Books',
    businessType: 'Individual',
    address: {
      street: '789 Commerce Dr',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60601',
      country: 'USA'
    },
    bankAccount: '',
    taxId: '',
    agreedToTerms: true,
    agreedToSellerPolicy: true
  });

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username?.trim()) newErrors.username = 'Username is required';
    if (formData.username?.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password?.trim()) newErrors.password = 'Password is required';
    if (formData.password?.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.shopName?.trim()) newErrors.shopName = 'Shop name is required';
    if (!formData.shopDescription?.trim()) newErrors.shopDescription = 'Shop description is required';
    if (formData.shopDescription?.length < 10) newErrors.shopDescription = 'Description must be at least 10 characters';
    if (!formData.shopCategory) newErrors.shopCategory = 'Shop category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.address?.street?.trim()) newErrors.street = 'Street address is required';
    if (!formData.address?.city?.trim()) newErrors.city = 'City is required';
    if (!formData.address?.state?.trim()) newErrors.state = 'State is required';
    if (!formData.address?.zipcode?.trim()) newErrors.zipcode = 'Zipcode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name] || errors[name?.split('.')[1]]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        [name?.split('.')[1]]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
    }
  };

  const handleSignup = async () => {
    if (!formData.agreedToTerms || !formData.agreedToSellerPolicy) {
      setErrors({ terms: 'You must agree to all terms and conditions' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await apiService.sellerSignup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        phone: formData.phone,
        password: formData.password,
        shopName: formData.shopName,
        shopDescription: formData.shopDescription,
        address: formData.address
      });

      if (response && response.success) {
        const modeLabel = response.source === 'hardcoded' ? '(Demo Mode)' : '(Live)';
        setSuccessMessage(`✅ Seller account created successfully! ${modeLabel} Redirecting...`);
        
        // Store user data in localStorage for authentication
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('userRole', 'seller');
        localStorage.setItem('dataSource', response.source);
        localStorage.setItem('isAuthenticated', 'true');

        setTimeout(() => {
          window.location.href = '/seller/dashboard';
        }, 2000);
      } else {
        setErrors({ submit: response?.message || 'Signup failed. Please try again.' });
        setLoading(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: error.message || 'An error occurred during signup. Please try again.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 rounded-full p-3">
              <Store className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Seller Onboarding</h1>
          <p className="text-gray-600">Step {step} of 4</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-amber-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <Check className="w-5 h-5" />
            {successMessage}
          </div>
        )}

        {/* Error Messages */}
        {Object.values(errors).some(e => e) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {Object.values(errors).find(e => e)}
          </div>
        )}

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Mike"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Johnson"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <User className="w-4 h-4" /> Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="mike_seller"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seller@example.com"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1-555-123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Password className="w-4 h-4" /> Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Shop Information */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Shop Name
              </label>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                placeholder="Books Plus"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.shopName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shop Description</label>
              <textarea
                name="shopDescription"
                value={formData.shopDescription}
                onChange={handleInputChange}
                placeholder="Describe your shop and what you sell..."
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.shopDescription ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Business Category
              </label>
              <select
                name="shopCategory"
                value={formData.shopCategory}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.shopCategory ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                <option value="Books">Books & Textbooks</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Health">Health & Beauty</option>
                <option value="Home">Home & Garden</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Individual">Individual</option>
                <option value="Business">Registered Business</option>
                <option value="Corporation">Corporation</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Address & Documents */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Business Address</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                placeholder="789 Commerce Dr"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  placeholder="Chicago"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  placeholder="IL"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zipcode</label>
                <input
                  type="text"
                  name="address.zipcode"
                  value={formData.address.zipcode}
                  onChange={handleInputChange}
                  placeholder="60601"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.zipcode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  placeholder="USA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> For this demo, document verification is optional. In production, you would need to upload tax ID and bank verification documents.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 space-y-2">
              <h3 className="font-semibold text-gray-800">Review Your Seller Profile</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Shop:</strong> {formData.shopName}</p>
                <p><strong>Category:</strong> {formData.shopCategory}</p>
                <p><strong>Address:</strong> {formData.address.street}, {formData.address.city}, {formData.address.state}</p>
              </div>
            </div>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-amber-600 rounded mt-1"
              />
              <span className="text-sm text-gray-700">I agree to the Terms & Conditions</span>
            </label>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreedToSellerPolicy"
                checked={formData.agreedToSellerPolicy}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-amber-600 rounded mt-1"
              />
              <span className="text-sm text-gray-700">I agree to the Seller Policy and Guidelines</span>
            </label>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="text-sm text-green-700">
                <strong>Seller Ready</strong>
                <p>Your shop will be active after email verification</p>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={handleNextStep}
              className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSignup}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Creating Shop...' : 'Launch Your Shop'}
              {!loading && <Check className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have a seller account?{' '}
          <Link to="/seller-login" className="text-amber-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SellerSignupOnboarding;
