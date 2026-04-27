import React, { useState, useEffect, useRef } from 'react';
import {
  Star, CheckCircle, ArrowRight, Users, Award, Zap,
  Mail, Phone, MapPin, Github, Linkedin, Twitter,
  Sun, Moon, Menu, X, Play, Pause
} from 'lucide-react';

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
    if (
      saved === 'dark' ||
      (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>

      {/* Navbar */}
      <nav className={`border-b backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 ${
        isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-8 h-8" />
            <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              OptimusCV
            </span>
          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl ${
                isDark ? 'bg-slate-700 text-yellow-400' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl"
            >
              Get Started
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-20">
        <h1 className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          Beat the <span className="text-indigo-600">ATS System</span>
        </h1>

        <p className="mt-4 text-lg">
          Enterprise-grade resume optimization powered by AI
        </p>

        <button
          onClick={onGetStarted}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl"
        >
          Analyze Resume <ArrowRight size={18} />
        </button>
      </section>

      {/* Music Button */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleMusic}
          className="p-3 bg-white rounded-full shadow"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <audio
          ref={audioRef}
          src="/music.mp3"
          loop
        />
      </div>

      {/* Video */}
      {showVideo && (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <iframe
            src="https://www.youtube.com/embed/m_8D5kUbUFY"
            className="w-[80%] h-[60%]"
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
