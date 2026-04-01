import React from 'react';
import { 
  Users, Award, Zap, Clock, MapPin, Phone, Mail, 
  GraduationCap, BookOpen, Target, Star, ArrowRight,
  ShieldCheck, Globe, Rocket, Lightbulb
} from 'lucide-react';
import Footer from '../../components/shared/Footer';

const AboutPage = () => {
  const stats = [
    { num: '10K+', label: 'Happy Customers', icon: <Users size={20} /> },
    { num: '500+', label: 'Premium Products', icon: <Zap size={20} /> },
    { num: '24/7', label: 'Tech Support', icon: <Clock size={20} /> },
    { num: '4.9★', label: 'Average Rating', icon: <Star size={20} /> }
  ];

  const team = [
    { 
      name: 'John Swift', 
      role: 'Founder & CEO', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Visionary leader with 15+ years in tech retail.'
    },
    { 
        name: 'Sarah Tech', 
        role: 'CTO', 
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        bio: 'The brain behind our AI-driven shopping experience.'
    },
    { 
        name: 'Mike Sales', 
        role: 'Head of Operations', 
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        bio: 'Ensuring your gadgets reach you in record time.'
    },
    { 
      name: 'Lisa Support', 
      role: 'Customer Success', 
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Dedicated to making every customer a fan of SwiftBazaar.'
    }
];
// Simple Heart icon for values
const Heart = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
  
  return (
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative bg-[#07477D] text-white pt-40 pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-400/10 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-blue-400/20 backdrop-blur-md border border-blue-400/30 px-4 py-2 rounded-full text-blue-200 text-xs font-black uppercase tracking-widest mb-6">
              Empowering Innovation Since 2014
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              We Build The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">Future Of Tech</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 leading-relaxed max-w-2xl font-medium">
              SwiftBazaar isn't just a marketplace. We are a community of tech enthusiasts dedicated to bringing the world's most advanced hardware to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* --- STATS GRID (FLOATING) --- */}
      <section className="relative z-20 -mt-16 container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-50 flex flex-col items-center text-center group hover:border-blue-500 transition-all duration-500">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-[#07477D] mb-2 tracking-tighter">{stat.num}</div>
              <div className="text-xs uppercase font-black text-slate-400 tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CORE VALUES / MISSION --- */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" 
               alt="Our Culture" 
               className="relative rounded-[60px] shadow-2xl z-10"
             />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-tight">
              Driven by <span className="text-blue-600">Excellence</span>, <br /> Defined by Trust.
            </h2>
            <div className="space-y-8">
              {[
                { title: 'Quality First', desc: 'Every product undergoes a rigorous 50-point quality check before it reaches you.', icon: <ShieldCheck className="text-blue-600"/> },
                { title: 'Innovation Always', desc: 'We don\'t just follow trends; we set them by onboarding the latest tech disruptors.', icon: <Rocket className="text-blue-600"/> },
                { title: 'Customer Obsession', desc: 'Your satisfaction isn\'t a metric; it\'s our mission.', icon: <Heart className="text-blue-600"/> }
              ].map((value, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">{value.title}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE JOURNEY (TIMELINE) --- */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6 mb-20 text-center">
          <h2 className="text-4xl font-black text-[#07477D] uppercase tracking-tighter mb-4">Our Epic Journey</h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {[
              { year: '2014', title: 'The Garage Start', desc: 'Two engineers and a vision to make tech accessible.' },
              { year: '2018', title: 'Going National', desc: 'Opened 5 regional hubs and crossed 1k products.' },
              { year: '2022', title: 'Smart Era', desc: 'Integration of AI & VR shopping experiences.' },
              { year: '2026', title: 'Global Leader', desc: 'Serving tech lovers across 4 continents.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 group">
                <div className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100 group-hover:-translate-y-4 transition-all duration-500">
                  <div className="text-5xl font-black text-blue-100 mb-4 group-hover:text-blue-600 transition-colors">{step.year}</div>
                  <h4 className="text-xl font-black text-slate-800 mb-3 uppercase tracking-tighter">{step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
                </div>
                <div className="w-6 h-6 bg-blue-600 rounded-full mx-auto mt-8 hidden lg:block border-4 border-white shadow-lg shadow-blue-500/50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LEADERSHIP TEAM --- */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#07477D] mb-6">Meet The Visionaries</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium italic">"Great things in business are never done by one person."</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              <div className="relative rounded-[50px] overflow-hidden mb-8 aspect-square shadow-xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07477D] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white text-sm font-medium leading-relaxed">{member.bio}</p>
                </div>
              </div>
              <h3 className="text-2xl font-black text-[#07477D] mb-1 uppercase tracking-tighter">{member.name}</h3>
              <p className="text-blue-500 font-black uppercase tracking-widest text-xs">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="container mx-auto px-6 py-20 mb-20">
        <div className="bg-[#07477D] rounded-[60px] p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#3ABEF9_0%,transparent_70%)] opacity-20" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
              Ready To Upgrade <br /> Your Lifestyle?
            </h2>
            <button className="bg-white text-[#07477D] px-14 py-6 rounded-[30px] font-black uppercase text-lg tracking-widest shadow-2xl hover:bg-blue-400 hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto">
              Start Shopping <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};


export default AboutPage;