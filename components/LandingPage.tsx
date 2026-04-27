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
    if (saved === 'dark') setIsDark(true);
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

      {/* HERO */}
      <section className="relative py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Beat the <span className="text-indigo-600">ATS System</span>
        </h1>

        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Resume optimization using structured analysis. Improve your resume and increase ATS compatibility.
        </p>

        <div className="flex justify-center gap-4 mb-10">
          <button onClick={onGetStarted} className="px-6 py-3 bg-indigo-600 text-white rounded-xl">
            Analyze Resume
          </button>
        </div>

        <div className="flex justify-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" /> Free Analysis
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" /> Rule-Based
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" /> Instant Results
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <h2 className="text-3xl text-center font-bold mb-10">Features</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="p-6 border rounded-lg">
            <Zap className="mb-3 text-indigo-600" />
            <h3 className="font-bold mb-2">Keyword-Based Analysis</h3>
            <p>
              Our system analyzes resumes using predefined keyword matching and scoring logic.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <Award className="mb-3 text-indigo-600" />
            <h3 className="font-bold mb-2">Standard ATS Checks</h3>
            <p>
              Applies common ATS rules like formatting validation and keyword density.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <Users className="mb-3 text-indigo-600" />
            <h3 className="font-bold mb-2">Resume Suggestions</h3>
            <p>
              Get actionable suggestions to improve resume structure and content quality.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-100">
        <h2 className="text-3xl text-center font-bold mb-10">User Feedback</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {[
            {
              name: "Student User",
              role: "Final Year Student",
              content: "This tool helped me improve my resume format and understand ATS requirements.",
              rating: 5
            },
            {
              name: "Engineering Student",
              role: "Placement Preparation",
              content: "The scoring system made it easy to identify missing keywords.",
              rating: 5
            },
            {
              name: "College User",
              role: "Fresher",
              content: "Simple and useful tool for resume improvement.",
              rating: 5
            }
          ].map((t, i) => (
            <div key={i} className="p-6 bg-white border rounded-lg">
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
