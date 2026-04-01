import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  Truck,
  Headphones,
  ArrowRight 
} from 'lucide-react';

const PartnerDocs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#07477D] to-[#3ABEF9] text-white py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-8">
            Become a Swift Bazaar Partner
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed">
            Start your digital shop in minutes. Reach thousands of buyers with our powerful seller platform.
          </p>
          <Link 
            to="/seller/signup"
            className="inline-flex items-center bg-white text-[#07477D] px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-wider hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 group"
          >
            Start Your Shop Now
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#07477D] mb-6">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join 500+ sellers growing their business on Swift Bazaar. No technical skills required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <ShieldCheck className="w-20 h-20 text-[#3ABEF9] mx-auto mb-6" />
              <h3 className="text-2xl font-black uppercase tracking-wider text-gray-900 mb-4">Verified Trust</h3>
              <p className="text-gray-600 leading-relaxed">All partners verified. Build customer confidence with our secure platform.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <BarChart3 className="w-20 h-20 text-[#3ABEF9] mx-auto mb-6" />
              <h3 className="text-2xl font-black uppercase tracking-wider text-gray-900 mb-4">Analytics Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">Real-time sales, traffic & customer insights. Make data-driven decisions.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <Truck className="w-20 h-20 text-[#3ABEF9] mx-auto mb-6" />
              <h3 className="text-2xl font-black uppercase tracking-wider text-gray-900 mb-4">Logistics Included</h3>
              <p className="text-gray-600 leading-relaxed">Integrated shipping & tracking. Focus on sales, we handle delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="bg-[#07477D] py-24 px-6 md:px-12 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-12 text-center">
            Get Started in 4 Steps
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-[#3ABEF9] rounded-2xl flex items-center justify-center font-black text-xl mr-6 mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-3">Create Account</h3>
                  <p className="text-lg opacity-90 leading-relaxed">Sign up as seller with shop name, documents. Takes 2 minutes.</p>
                </div>
              </div>
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-[#3ABEF9] rounded-2xl flex items-center justify-center font-black text-xl mr-6 mt-1">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-3">Add Products</h3>
                  <p className="text-lg opacity-90 leading-relaxed">Upload high-quality images, descriptions, pricing. Bulk import available.</p>
                </div>
              </div>
              <div className="flex items-start mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-[#3ABEF9] rounded-2xl flex items-center justify-center font-black text-xl mr-6 mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-3">Go Live</h3>
                  <p className="text-lg opacity-90 leading-relaxed">Products automatically listed. Start receiving orders immediately.</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link 
                to="/seller/signup"
                className="bg-white text-[#07477D] px-12 py-6 rounded-3xl font-black text-2xl uppercase tracking-wider hover:shadow-2xl transition-all inline-flex items-center mx-auto"
              >
                Start Step 1 Now →
              </Link>
              <p className="text-lg mt-8 opacity-90">Demo credentials available: seller@example.com / sellerpass123</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#07477D] mb-6">
              Seller Dashboard Features
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: LayoutDashboard, title: 'Dashboard', desc: 'Overview of sales, orders & performance' },
              { icon: ShoppingBag, title: 'Products', desc: 'Unlimited products with inventory management' },
              { icon: Users, title: 'Orders', desc: 'Real-time order tracking & fulfillment' },
              { icon: BarChart3, title: 'Analytics', desc: 'Customer insights & sales trends' },
              { icon: Headphones, title: 'Support', desc: '24/7 dedicated partner support' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl hover:shadow-xl transition-all border border-blue-100">
                <feature.icon className="w-16 h-16 text-[#3ABEF9] mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-wider text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black uppercase tracking-tight text-[#07477D] mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">What are the fees?</h3>
              <p className="text-gray-600">2.9% + $0.30 per transaction. No setup or monthly fees.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">Do I need approval?</h3>
              <p className="text-gray-600">Quick verification in 24 hours. Demo accounts instant.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-black uppercase tracking-wider mb-4">What products can I sell?</h3>
              <p className="text-gray-600">Textbooks, educational materials, digital goods. No prohibited items.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#07477D] py-16 px-6 md:px-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
            Ready to Start Selling?
          </h2>
          <p className="text-xl mb-8 opacity-90">Join Swift Bazaar partners growing 3x faster than traditional retail.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/seller/signup" className="bg-[#3ABEF9] px-10 py-4 rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-blue-400 transition-all">
              Create Seller Account
            </Link>
            <Link to="/seller/login" className="border-2 border-white px-10 py-4 rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-white hover:text-[#07477D] transition-all">
              Seller Login
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-75">Demo: seller@example.com / sellerpass123</p>
        </div>
      </section>
    </div>
  );
};

export default PartnerDocs;

