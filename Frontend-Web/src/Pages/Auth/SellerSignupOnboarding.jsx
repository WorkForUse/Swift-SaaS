import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, User, Store, Phone, Check, AlertCircle,
  Eye, EyeOff, ArrowRight, ShieldCheck, TrendingUp, Briefcase,
  MapPin, ChevronLeft
} from 'lucide-react';
// import apiService from '../../services/apiService'; // Ensure this path is correct

const SellerSignupOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', username: '', phone: '',
    password: '', confirmPassword: '', shopName: '', shopDescription: '',
    shopCategory: '', businessType: 'Individual',
    address: { street: '', city: '', state: '', zipcode: '', country: 'USA' },
    agreedToTerms: false, agreedToSellerPolicy: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNextStep = () => {
    // Basic validation logic
    if (step < 4) setStep(step + 1);
  };

  // Animation Variants
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 w-full max-w-[480px] overflow-hidden border border-slate-100"
      >
        {/* Top Progress Bar */}
        <div className="flex h-1.5 w-full bg-slate-100">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-full transition-all duration-500 ${
                s <= step ? 'bg-amber-500' : 'bg-transparent'
              }`}
              style={{ width: '25%' }}
            />
          ))}
        </div>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 mb-4">
              <Store className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Launch Your Shop</h1>
            <p className="text-slate-500 text-sm mt-1">Complete your profile to start selling</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Mike" />
                    <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Johnson" />
                  </div>
                  <Input label="Username" name="username" icon={User} value={formData.username} onChange={handleInputChange} placeholder="mike_seller" />
                  <Input label="Email Address" name="email" icon={Mail} type="email" value={formData.email} onChange={handleInputChange} placeholder="mike@example.com" />
                  <div className="relative">
                    <Input label="Password" name="password" icon={Lock} type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[38px] text-slate-400 hover:text-amber-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <Input label="Shop Name" name="shopName" icon={Briefcase} value={formData.shopName} onChange={handleInputChange} placeholder="Elite Books" />
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      name="shopDescription"
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none text-slate-700"
                      placeholder="Tell us about your products..."
                      value={formData.shopDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Select label="Category" name="shopCategory" icon={TrendingUp} value={formData.shopCategory} onChange={handleInputChange}>
                    <option value="">Select Category</option>
                    <option value="books">Books & Education</option>
                    <option value="electronics">Electronics</option>
                  </Select>
                </div>
              )}

              {/* Step 3 & 4 follow similar logic... */}
              {step === 4 && (
                <div className="space-y-6 text-center py-4">
                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                    <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                    <h3 className="font-bold text-slate-800">Final Verification</h3>
                    <p className="text-sm text-slate-500 mt-2">By launching, you agree to our professional seller guidelines.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Checkbox label="Agree to Terms" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleInputChange} />
                    <Checkbox label="Agree to Seller Policy" name="agreedToSellerPolicy" checked={formData.agreedToSellerPolicy} onChange={handleInputChange} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="mt-10 flex gap-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-[0.5] py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft size={18} /> Back
              </button>
            )}
            <button
              onClick={step === 4 ? () => {} : handleNextStep}
              className={`flex-1 py-4 rounded-xl text-white font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
                step === 4 ? 'bg-green-600 shadow-green-200' : 'bg-amber-600 shadow-amber-200 hover:bg-amber-700'
              }`}
            >
              {step === 4 ? 'Launch Shop' : 'Continue'} <ArrowRight size={18} />
            </button>
          </div>

          <p className="text-center text-slate-400 text-xs mt-8">
            Need help? <a href="#" className="text-amber-600 font-bold hover:underline">Contact Support</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Reusable Clean UI Components ---
const Input = ({ label, icon: Icon, ...props }) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-11' : 'px-4'} py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none text-slate-700 placeholder:text-slate-300 font-medium`}
      />
    </div>
  </div>
);

const Select = ({ label, icon: Icon, children, ...props }) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />}
      <select
        {...props}
        className={`w-full ${Icon ? 'pl-11' : 'px-4'} py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none text-slate-700 font-medium appearance-none`}
      >
        {children}
      </select>
    </div>
  </div>
);

const Checkbox = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
      checked ? 'bg-amber-500 border-amber-500' : 'border-slate-200 group-hover:border-amber-300'
    }`}>
      {checked && <Check size={14} className="text-white" strokeWidth={4} />}
    </div>
    <input type="checkbox" name={name} className="hidden" checked={checked} onChange={onChange} />
    <span className="text-sm font-medium text-slate-600">{label}</span>
  </label>
);

export default SellerSignupOnboarding;