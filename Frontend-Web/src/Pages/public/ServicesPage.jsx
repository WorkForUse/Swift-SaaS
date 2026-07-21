import React from 'react';
import { Zap, ShieldCheck, Database, BarChart3, Cloud, Headphones, Users, BookOpen, Award, Truck, Star, ArrowRight, ChevronRight, ChevronLeft, PlayCircle } from 'lucide-react';
// import logo from '../../../assets/swift-logo.PNG';
import Footer from '../../components/shared/Footer';

const ServicesPage = () => {
  const services = [
    {
      icon: Zap,
      title: 'Digital Textbook Platform',
      desc: 'Comprehensive e-learning platform with thousands of textbooks across all major categories - Mathematics, Physics, Chemistry, Biology and more.',
      image: 'https://images.unsplash.com/photo-1524178232363-933d95a15c23?w=400&h=300&fit=crop',
      stats: '10K+ Textbooks'
    },
    {
      icon: BookOpen,
      title: 'Custom Learning Paths',
      desc: 'Personalized learning journeys tailored for students, educators and institutions with adaptive content delivery.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      stats: '95% Completion Rate'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      desc: 'Real-time learning analytics and progress tracking for students and comprehensive reporting for educators.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      stats: '500K+ Users'
    },
    {
      icon: Database,
      title: 'API Integration',
      desc: 'Seamless API integration for LMS systems, institutional platforms and custom education applications.',
      image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=400&h=300&fit=crop',
      stats: '99.9% Uptime'
    },
    {
      icon: Cloud,
      title: 'Cloud Hosting & Scaling',
      desc: 'Scalable cloud infrastructure that grows with your student base - from 100 to 100K concurrent users.',
      image: 'https://images.unsplash.com/photo-1558494949-ef3e7eb8c1aa?w=400&h=300&fit=crop',
      stats: 'Unlimited Scale'
    },
    {
      icon: ShieldCheck,
      title: '24/7 Premium Support',
      desc: 'Dedicated support teams available around the clock with 15-minute average response time guarantee.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      stats: '15min Response'
    }
  ];

  const stats = [
    { label: 'Active Students', value: '250K+', icon: Users },
    { label: 'Courses Available', value: '5K+', icon: BookOpen },
    { label: 'Partner Institutions', value: '1.2K+', icon: Award },
    { label: 'Satisfaction Rate', value: '98%', icon: Star }
  ];

  const [currentHero, setCurrentHero] = React.useState(0);
  const heroSlides = [
    {
      title: 'Transform Education with Swift SaaS',
      desc: 'Complete digital textbook platform with analytics, scaling and 24/7 support. Trusted by 250K+ students worldwide.'
    },
    {
      title: 'Enterprise Learning Solutions',
      desc: 'Scalable SaaS platform for institutions serving from small classes to universities with 100K+ students.'
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
  {/* Hero Banner */}
  <section className="relative w-full h-[70vh] overflow-hidden bg-gradient-to-br from-[#07477D] to-[#3ABEF9] text-white">       
    {/* Slides */}
    {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex flex-col justify-center items-center text-center px-8 py-12 transition-all duration-1000 ${
              index === currentHero ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 drop-shadow-2xl">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed drop-shadow-lg mb-12">
              {slide.desc}
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#07477D] px-12 py-4 rounded-2xl font-black uppercase text-lg tracking-wider shadow-2xl hover:shadow-white/50 transition-all hover:scale-105">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-12 py-4 rounded-2xl font-black uppercase text-lg tracking-wider hover:bg-white hover:text-[#07477D] transition-all hover:scale-105">
                View Demo
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentHero ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-[#07477D] uppercase tracking-tighter mb-6">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Complete SaaS platform for digital textbooks and e-learning. Everything you need to scale your educational business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-50 overflow-hidden h-full"
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#3ABEF9] to-[#07477D] rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <Icon className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#07477D] mb-4 uppercase tracking-tight group-hover:text-[#3ABEF9] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    {service.desc}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-[#3ABEF9]">{service.stats}</span>
                    <button className="group-hover:translate-x-2 transition-transform flex items-center gap-2 text-[#07477D] font-bold uppercase tracking-wider hover:text-[#3ABEF9]">
                      Learn More <ChevronRight size={20} className="group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#07477D] to-[#3ABEF9] py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-white text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group">
                <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:bg-white/30 transition-all">
                  <Icon className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <div className="text-4xl md:text-5xl font-black mb-4 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-lg font-bold uppercase tracking-wider opacity-90">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#3ABEF9]/10 to-[#07477D]/10 rounded-3xl p-16 backdrop-blur-sm border border-[#3ABEF9]/20">
            <PlayCircle className="w-24 h-24 text-[#3ABEF9] mx-auto mb-8" />
            <h2 className="text-5xl font-black text-[#07477D] uppercase tracking-tighter mb-6">
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 250K+ students and 1.2K institutions already using Swift SaaS platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-[#07477D] text-white px-16 py-6 rounded-3xl font-black uppercase text-xl tracking-wider shadow-2xl hover:shadow-[#07477D]/25 hover:scale-105 transition-all w-full sm:w-auto">
                Start Free Trial
              </button>
              <button className="border-4 border-[#3ABEF9] text-[#3ABEF9] px-16 py-6 rounded-3xl font-black uppercase text-xl tracking-wider hover:bg-[#3ABEF9] hover:text-white transition-all w-full sm:w-auto">
                Schedule Demo <ArrowRight className="inline ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;

