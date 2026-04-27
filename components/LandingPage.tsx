import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, ArrowRight, Users, Zap, Mail, MapPin, Github, Linkedin, Twitter, Sun, Moon, Menu, X, Play, Pause } from 'lucide-react';

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
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleMusic = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>

      {/* Navbar */}
      <nav className={`${isDark ? 'bg-slate-800' : 'bg-white'} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-8 h-8" />
            <span className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>OptimusCV</span>
          </div>

          <div className="flex gap-4 items-center">
            <button onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun /> : <Moon />}
            </button>

            <button onClick={onGetStarted} className="bg-indigo-600 text-white px-4 py-2 rounded">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6">
          Improve Your <span className="text-indigo-600">ATS Score</span>
        </h1>

        <p className="text-lg mb-4 max-w-2xl mx-auto">
          A rule-based resume analyzer that evaluates formatting, keywords, and structure to improve ATS compatibility.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          *This system uses predefined rules and does not rely on external APIs or machine learning models.
        </p>

        <button onClick={onGetStarted} className="bg-indigo-600 text-white px-6 py-3 rounded-lg">
          Analyze Resume
        </button>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl text-center font-bold mb-12">Features</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="p-6 border rounded-lg">
            <Zap className="text-indigo-600 mb-3" />
            <h3 className="font-bold mb-2">Keyword-Based Analysis</h3>
            <p>
              Checks resume content using predefined keyword matching and scoring techniques.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <Users className="text-indigo-600 mb-3" />
            <h3 className="font-bold mb-2">ATS Rule Simulation</h3>
            <p>
              Applies common ATS rules like formatting validation, section detection, and keyword density.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-bold mb-2">Resume Suggestions</h3>
            <p>
              Provides improvement suggestions based on missing sections and keyword gaps.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <h2 className="text-3xl text-center font-bold mb-12">User Feedback</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1,2,3].map((i) => (
            <div key={i} className="p-6 border rounded-lg bg-white">
              <p className="italic mb-4">
                "This tool helped me understand ATS resume structure and improve my formatting."
              </p>
              <p className="font-bold">Student User</p>
              <p className="text-sm text-gray-500">Final Year Student</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl text-center font-bold mb-12">Contact</h2>

        <div className="max-w-4xl mx-auto">
          <p>Email: optimuscv@proton.me</p>
          <p>Location: Mandsaur, MP, India</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white text-center py-6">
        <p>A rule-based resume analysis system for ATS compatibility.</p>
        <p className="text-sm mt-2">© 2026 3Dumb Developers</p>
      </footer>

      {/* MUSIC */}
      <button onClick={toggleMusic} className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow">
        {isPlaying ? <Pause /> : <Play />}
      </button>

      <audio ref={audioRef} src="/music.mp3" loop />
    </div>
  );
};

export default LandingPage;
