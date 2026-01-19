import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, ArrowRight, Users, Award, Zap, Mail, Phone, MapPin, Github, Linkedin, Twitter, Sun, Moon, Menu, X, Play, Pause } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isDark, setIsDark] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Navbar */}
      <nav className={`border-b backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 ${
        isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="OptimusCV Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold leading-none transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>OptimusCV</span>
              <span className="text-[10px] text-indigo-600 font-bold tracking-tighter uppercase">ATS OPTIMIZER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className={`font-medium transition-colors ${
                isDark ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'
              }`}>Features</a>
              <a href="#testimonials" className={`font-medium transition-colors ${
                isDark ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'
              }`}>Reviews</a>
              <a href="/team" className={`font-medium transition-colors ${
                isDark ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'
              }`}>Our Team</a>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl transition-all ${
                isDark ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={onGetStarted}
              className="hidden md:block px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-all ${
                isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t transition-colors ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className={`block font-medium transition-colors ${
                isDark ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'
              }`} onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#testimonials" className={`block font-medium transition-colors ${
                isDark ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'
              }`} onClick={() => setMobileMenuOpen(false)}>Reviews</a>
              <a href="/team" className={`block font-medium transition-colors ${
                isDark ? 'text-slate-300 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'
              }`} onClick={() => setMobileMenuOpen(false)}>Our Team</a>
              <button 
                onClick={() => { onGetStarted(); setMobileMenuOpen(false); }}
                className="w-full px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Beat the <span className="text-indigo-600">ATS System</span>
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto transition-colors ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Enterprise-grade resume optimization powered by AI. Get past applicant tracking systems and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              Analyze Resume Now <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setShowVideo(true)}
              className={`px-8 py-4 border-2 rounded-2xl font-bold text-lg transition-all ${
              isDark 
                ? 'border-slate-600 text-slate-300 hover:border-indigo-400 hover:text-indigo-400' 
                : 'border-slate-300 text-slate-700 hover:border-indigo-300'
            }`}>
              Watch Demo
            </button>
          </div>
          <div className={`flex items-center justify-center gap-8 text-sm transition-colors ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span>Free Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -ml-32 -mb-32" />
      </section>

      {/* Features */}
      <section id="features" className={`py-20 transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Why Choose OptimusCV?</h2>
            <p className={`text-lg transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Advanced features that give you the competitive edge</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-2xl border hover:shadow-lg transition-all ${
              isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-100'
            }`}>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-indigo-600" size={24} />
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>AI-Powered Analysis</h3>
              <p className={`transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Advanced Gemini AI analyzes your resume against real ATS systems used by top companies.</p>
            </div>
            <div className={`p-8 rounded-2xl border hover:shadow-lg transition-all ${
              isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-100'
            }`}>
              
              <h3 className={`text-xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Enterprise Grade</h3>
              <p className={`transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Simulates screening processes from Google, Amazon, Microsoft, and other Fortune 500 companies.</p>
            </div>
            <div className={`p-8 rounded-2xl border hover:shadow-lg transition-all ${
              isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-100'
            }`}>
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-rose-600" size={24} />
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Instant Optimization</h3>
              <p className={`transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Get actionable recommendations to improve your resume score and increase interview chances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className={`py-20 transition-colors ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Success Stories</h2>
            <p className={`text-lg transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Join thousands who landed their dream jobs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Software Engineer at Google",
                content: "OptimusCV helped me optimize my resume and I got 3 FAANG interviews within a week!",
                rating: 5
              },
              {
                name: "Michael Rodriguez",
                role: "Data Scientist at Amazon",
                content: "The AI recommendations were spot-on. My ATS score went from 65% to 94%.",
                rating: 5
              },
              {
                name: "Priya Sharma",
                role: "Product Manager at Microsoft",
                content: "Finally understood what recruiters were looking for. Got my dream job in 2 months!",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className={`p-8 rounded-2xl shadow-sm border transition-all ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
              }`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-current" size={16} />
                  ))}
                </div>
                <p className={`mb-6 italic transition-colors ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>"{testimonial.content}"</p>
                <div>
                  <p className={`font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{testimonial.name}</p>
                  <p className={`text-sm transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
<section
  id="contact"
  className={`py-20 transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'}`}
>
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

      {/* Left Column - Contact Info */}
      <div className="space-y-6">
        <h2
          className={`text-4xl font-bold mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Get in Touch
        </h2>
        <p
          className={`text-lg mb-8 transition-colors ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Have questions? We're here to help you succeed.
        </p>

        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Mail className="text-indigo-600" size={20} />
          </div>
          <div>
            <p
              className={`font-bold transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Email
            </p>
            <p
              className={`transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              optimuscv@proton.me
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <MapPin className="text-emerald-600" size={20} />
          </div>
          <div>
            <p
              className={`font-bold transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Address
            </p>
            <p
              className={`transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Mandsaur, Madhya Pradesh, India
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Contact Form */}
      <div
        className={`p-8 rounded-2xl transition-colors ${
          isDark ? 'bg-slate-700' : 'bg-slate-50'
        }`}
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              className={`px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 transition-all outline-none ${
                isDark
                  ? 'border-slate-600 bg-slate-800 text-white placeholder-slate-400'
                  : 'border-slate-200 bg-white'
              }`}
            />
            <input
              type="text"
              placeholder="Last Name"
              className={`px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 transition-all outline-none ${
                isDark
                  ? 'border-slate-600 bg-slate-800 text-white placeholder-slate-400'
                  : 'border-slate-200 bg-white'
              }`}
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 transition-all outline-none ${
              isDark
                ? 'border-slate-600 bg-slate-800 text-white placeholder-slate-400'
                : 'border-slate-200 bg-white'
            }`}
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none ${
              isDark
                ? 'border-slate-600 bg-slate-800 text-white placeholder-slate-400'
                : 'border-slate-200 bg-white'
            }`}
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
                  <img src="/logo.png" alt="OptimusCV Logo" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white leading-none">OptimusCV</span>
                  <span className="text-[10px] text-indigo-400 font-bold tracking-tighter uppercase">ATS OPTIMIZER</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                AI-powered resume optimization to help you land your dream job.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Resume Analyzer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ATS Checker</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/team" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/team" className="hover:text-white transition-colors">Team</a></li>
                <li><a href="/team" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="https://optimuscv.github.io" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/team" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2026 3Dumb Developers. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="https://github.com/optimuscv" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Github size={18} />
              </a>
              <a href="https://in.linkedin.com/company/optimuscv" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://x.com/optimuscv" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Music Player */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className={`p-3 rounded-full shadow-lg transition-all hover:scale-105 ${
            isDark ? 'bg-slate-800 text-white border border-slate-600' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <audio
          ref={audioRef}
          src="/music.mp3"
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold"
            >
              ✕ Close
            </button>
            <iframe
              src="https://www.youtube.com/embed/m_8D5kUbUFY?si=rzUKtnO1Q_LyQA_W"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
