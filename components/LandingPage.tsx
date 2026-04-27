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
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>

      {/* HERO */}
      <section className="relative py-20 overflow-hidden text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Beat the <span className="text-indigo-600">ATS System</span>
        </h1>

        {/* ❌ removed AI wording */}
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Resume optimization using structured analysis. Improve your resume based on standard ATS rules and formatting checks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg flex items-center gap-2"
          >
            Analyze Resume Now <ArrowRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-8 text-sm">
          <span className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} /> Free Analysis
          </span>

          {/* ❌ AI-Powered replaced */}
          <span className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} /> Rule-Based System
          </span>

          <span className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} /> Instant Results
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-10">Why Choose OptimusCV?</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* ❌ AI replaced */}
          <div className="p-8 border rounded-xl">
            <Zap className="mb-4 text-indigo-600" />
            <h3 className="text-xl font-bold mb-2">Keyword-Based Analysis</h3>
            <p>
              Our system analyzes resumes using predefined keyword matching and scoring techniques.
            </p>
          </div>

          {/* ❌ FAANG claim removed */}
          <div className="p-8 border rounded-xl">
            <Award className="mb-4 text-indigo-600" />
            <h3 className="text-xl font-bold mb-2">Standard ATS Checks</h3>
            <p>
              Applies common ATS rules such as formatting validation, section detection, and keyword density.
            </p>
          </div>

          <div className="p-8 border rounded-xl">
            <Users className="mb-4 text-indigo-600" />
            <h3 className="text-xl font-bold mb-2">Resume Suggestions</h3>
            <p>
              Get actionable suggestions to improve your resume score and overall structure.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-100">
        <h2 className="text-4xl text-center font-bold mb-10">User Feedback</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            {
              name: "Student User",
              role: "Final Year Student",
              content: "This tool helped me understand ATS resume structure and improve formatting.",
              rating: 5
            },
            {
              name: "Engineering Student",
              role: "Placement Preparation",
              content: "The scoring system made it easy to identify missing keywords.",
              rating: 5
            },
            {
              name: "Fresher",
              role: "Job Seeker",
              content: "Simple and useful for improving resume quality.",
              rating: 5
            }
          ].map((t, i) => (
            <div key={i} className="p-6 bg-white border rounded-xl">
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={14} className="text-yellow-500" />
                ))}
              </div>
              <p className="italic mb-4">"{t.content}"</p>
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white text-center py-6">
        {/* ❌ AI removed */}
        <p>Rule-based resume analysis system for ATS compatibility.</p>
        <p className="text-sm mt-2">© 2026 3Dumb Developers</p>
      </footer>

      {/* MUSIC */}
      <button onClick={toggleMusic} className="fixed bottom-4 right-4 p-3 bg-white rounded-full shadow">
        {isPlaying ? <Pause /> : <Play />}
      </button>

      <audio ref={audioRef} src="/music.mp3" loop />

    </div>
  );
};

export default LandingPage;
