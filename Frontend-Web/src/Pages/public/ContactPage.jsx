import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Send, Clock, User, 
  MessageSquare, Facebook, Instagram, Twitter, 
  Youtube, Linkedin, Globe, ShieldCheck, Headphones
} from 'lucide-react';
import Footer from '../../components/shared/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitStatus('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mimicking API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactCards = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Expert Support',
      detail: '+1 (800) SWIFT-BZR',
      subDetail: 'Mon-Fri, 9am - 6pm EST',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Inquiries',
      detail: 'support@swiftbazaar.com',
      subDetail: 'Average response: 2 hours',
      color: 'bg-cyan-50 text-cyan-600'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Flagship Store',
      detail: '507 Union Trade Center',
      subDetail: 'New York, NY 10001',
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      
      {/* --- TECH HERO SECTION --- */}
      <section className="relative bg-[#07477D] pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-400/20 backdrop-blur-md px-4 py-2 rounded-full text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-8 border border-white/10">
            <Headphones size={14} /> Global Assistance
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            How Can We <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400">Help You?</span>
          </h1>
          <p className="text-blue-100/70 text-xl max-w-2xl mx-auto font-medium">
            Whether you're troubleshooting a device or tracking a high-end delivery, our tech experts are standing by.
          </p>
        </div>
      </section>

      {/* --- QUICK CONTACT CARDS --- */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactCards.map((card, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-2xl shadow-blue-900/10 border border-slate-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
              <div className={`${card.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tighter">{card.title}</h3>
              <p className="text-lg font-bold text-blue-600 mb-1">{card.detail}</p>
              <p className="text-slate-400 text-sm font-medium">{card.subDetail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FORM & MAP SECTION --- */}
      <section className="container mx-auto px-6 py-32">
        <div className="bg-slate-50 rounded-[60px] overflow-hidden flex flex-col lg:flex-row shadow-inner border border-slate-100">
          
          {/* Left Side: Form */}
          <div className="lg:w-1/2 p-8 lg:p-20 bg-white">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Send a Transmission</h2>
            <p className="text-slate-500 mb-12 font-medium">Our encrypted system ensures your message reaches the right department instantly.</p>
            
            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-[30px] flex items-center gap-4 text-emerald-700 font-bold">
                <ShieldCheck className="text-emerald-500" />
                Message deployed successfully! Expect a reply within 24h.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Full Identity</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full bg-slate-50 border-none rounded-[24px] py-5 pl-14 pr-6 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-slate-700" 
                      placeholder="Ghost Operator"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full bg-slate-50 border-none rounded-[24px] py-5 pl-14 pr-6 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-slate-700" 
                      placeholder="user@network.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Inquiry Subject</label>
                <input 
                  type="text" name="subject" value={formData.subject} onChange={handleChange} required
                  className="w-full bg-slate-50 border-none rounded-[24px] py-5 px-8 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-slate-700" 
                  placeholder="Hardware Support / Order Status"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Transmission Content</label>
                <textarea 
                  rows="5" name="message" value={formData.message} onChange={handleChange} required
                  className="w-full bg-slate-50 border-none rounded-[30px] py-6 px-8 focus:ring-2 focus:ring-blue-500 transition-all font-bold text-slate-700" 
                  placeholder="Type your message here..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#07477D] text-white py-6 rounded-[30px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : (
                  <>Initialise Send <Send size={20} /></>
                )}
              </button>
            </form>
          </div>

          {/* Right Side: Visual & Social */}
          <div className="lg:w-1/2 bg-slate-900 relative p-12 lg:p-20 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">Follow Our <br /> <span className="text-blue-400">Digital Pulse</span></h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Instagram', icon: <Instagram />, color: 'hover:bg-pink-600' },
                  { name: 'Twitter', icon: <Twitter />, color: 'hover:bg-blue-400' },
                  { name: 'LinkedIn', icon: <Linkedin />, color: 'hover:bg-blue-700' },
                  { name: 'Youtube', icon: <Youtube />, color: 'hover:bg-red-600' }
                ].map((social, i) => (
                  <button key={i} className={`flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl text-white transition-all ${social.color}`}>
                    {social.icon} <span className="font-bold text-sm uppercase tracking-widest">{social.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-12 bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-sm">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-emerald-500 font-black uppercase text-xs tracking-widest">Global Network Status: Active</span>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed font-medium">
                 SwiftBazaar utilizes a decentralized support network to ensure zero downtime for all customer inquiries.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOCATION MAP --- */}
      <section className="container mx-auto px-6 pb-32">
        <div className="rounded-[60px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl border-8 border-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1679905010000!5m2!1sen!2s"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="SwiftBazaar Headquarters"
          />
        </div>
      </section>

      <Footer/>

    </div>
  );
};

export default ContactPage;

// import React, { useState } from 'react';
// import { 
//   MapPin, Phone, Mail, Send, Clock, MessageCircle, 
//   User, Mail as MailIcon, MessageSquare, ArrowRight,
//   Facebook, Instagram, Twitter, Youtube, Linkedin
// } from 'lucide-react';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setSubmitStatus('');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitStatus('Message sent successfully! We\'ll get back to you soon.');
//       setFormData({ name: '', email: '', subject: '', message: '' });
//     }, 1500);
//   };

//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: 'Visit Our Store',
//       detail: '507-Union Trade Center, USA Business District, NY 10001',
//       link: 'https://maps.google.com/?q=40.7128,-74.0060'
//     },
//     {
//       icon: Phone,
//       title: 'Call Us',
//       detail: '(+91) 9876-543-210',
//       link: 'tel:+919876543210'
//     },
//     {
//       icon: Mail,
//       title: 'Email Us',
//       detail: 'support@swiftbazaar.com',
//       link: 'mailto:support@swiftbazaar.com'
//     },
//     {
//       icon: Clock,
//       title: 'Business Hours',
//       detail: 'Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero */}
//       <section className="bg-gradient-to-r from-[#07477D] via-blue-900 to-[#3ABEF9] text-white pt-32 pb-24">
//         <div className="container mx-auto px-6 text-center">
//           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Get In Touch</h1>
//           <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
//             Have questions? We're here to help. Reach out via form, email, phone, or visit our store.
//           </p>
//         </div>
//       </section>

//       {/* Contact Info & Form */}
//       <section className="py-24">
//         <div className="container mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          
//           {/* Contact Info */}
//           <div className="space-y-8 mb-16 lg:mb-0">
//             <h2 className="text-4xl font-black uppercase tracking-tighter text-[#07477D]">Contact Information</h2>
//             <div className="space-y-6">
//               {contactInfo.map((item, idx) => (
//                 <div key={idx} className="group flex items-start gap-4 p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
//                   <div className="w-16 h-16 bg-gradient-to-br from-[#3ABEF9] to-[#07477D] rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
//                     <item.icon className="w-7 h-7 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-black text-[#07477D] mb-2 group-hover:text-[#3ABEF9] transition-colors">{item.title}</h3>
//                     <a href={item.link} className="block text-gray-600 hover:text-[#3ABEF9] font-bold transition-colors text-lg">
//                       {item.detail}
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Social Links */}
//             <div>
//               <h3 className="text-2xl font-black uppercase tracking-wider text-[#07477D] mb-6">Follow Us</h3>
//               <div className="flex gap-4">
//                 <a href="#" className="w-14 h-14 bg-[#3ABEF9] rounded-2xl flex items-center justify-center text-white hover:bg-[#07477D] transition-all shadow-lg hover:scale-110">
//                   <Facebook size={20} />
//                 </a>
//                 <a href="#" className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-white hover:shadow-2xl transition-all hover:scale-110">
//                   <Instagram size={20} />
//                 </a>
//                 <a href="#" className="w-14 h-14 bg-[#1DA1F2] rounded-2xl flex items-center justify-center text-white hover:shadow-2xl transition-all hover:scale-110">
//                   <Twitter size={20} />
//                 </a>
//                 <a href="#" className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white hover:shadow-2xl transition-all hover:scale-110">
//                   <Youtube size={20} />
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white p-12 rounded-3xl shadow-2xl">
//             <h2 className="text-3xl font-black uppercase tracking-tighter text-[#07477D] mb-8">Send Message</h2>
//             {submitStatus && (
//               <div className={`p-6 rounded-2xl mb-8 font-bold text-lg ${submitStatus.includes('success') ? 'bg-green-50 border-2 border-green-200 text-green-800' : 'bg-red-50 border-2 border-red-200 text-red-800'}`}>
//                 {submitStatus}
//               </div>
//             )}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 mb-2">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#3ABEF9] focus:outline-none transition-all text-lg font-bold"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 mb-2">Email</label>
//                 <div className="relative">
//                   <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#3ABEF9] focus:outline-none transition-all text-lg font-bold"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 mb-2">Subject</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#3ABEF9] focus:outline-none transition-all text-lg font-bold"
//                   placeholder="Order Issue / General Inquiry"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold uppercase tracking-wider text-gray-600 mb-2">Message</label>
//                 <textarea
//                   name="message"
//                   rows="5"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#3ABEF9] focus:outline-none transition-all text-lg font-bold resize-vertical"
//                   placeholder="Tell us about your inquiry..."
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r from-[#07477D] to-[#3ABEF9] text-white py-6 rounded-3xl font-black uppercase text-xl tracking-wider shadow-2xl hover:shadow-[#3ABEF9]/25 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-3"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     Send Message
//                     <Send className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Map */}
//       <section className="py-24 bg-gray-900">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-black uppercase tracking-tighter text-white text-center mb-12">Find Us</h2>
//           <div className="rounded-3xl overflow-hidden shadow-2xl">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1460578684997!2d-73.98731968459349!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a8c7a6e5b7%3A0x8b8c8b8c8b8c8b8c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
//               width="100%"
//               height="500"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="SwiftBazaar Location"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ContactPage;

