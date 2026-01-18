import React, { useEffect, useState, useRef } from 'react';
import { X, Github, Linkedin, Mail, ExternalLink, Menu, ArrowRight, Code, Zap, Database, TrendingUp, Terminal as TerminalIcon, Trophy, Clock, Users, CheckCircle, Star, Award, BarChart, Cpu, Shield, Target } from 'lucide-react';

// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("04:59:59");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const [h, m, s] = prev.split(':').map(Number);
        if (s > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${(s-1).toString().padStart(2, '0')}`;
        if (m > 0) return `${h.toString().padStart(2, '0')}:${(m-1).toString().padStart(2, '0')}:59`;
        if (h > 0) return `${(h-1).toString().padStart(2, '0')}:59:59`;
        return "00:00:00";
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-blue-400 min-h-screen relative overflow-hidden">
      {/* Animated Background Particles */}
      <ParticleBackground />
      
      {/* Competition Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Glitch Effect */}
      <GlitchEffect />
      
      {/* Competition Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-blue-900/90 via-gray-900/90 to-purple-900/90 backdrop-blur-lg border-b-2 border-blue-500 shadow-lg shadow-blue-500/30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center font-mono text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 animate-pulse">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-white">CODECRAFT_2026</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Users size={14} className="text-green-400" />
              <span>Contestant: SAADAN NAQVI</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded border border-blue-500 animate-pulse">
              <Clock size={14} className="text-red-400" />
              <span className="font-bold text-white">{timeLeft}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="pt-28 relative z-10">
        {activeSection === 'home' && <Home setActiveSection={setActiveSection} />}
        {activeSection === 'projects' && <Projects />}
      </main>

      <Footer />
    </div>
  );
}

// Particle Background Animation
function ParticleBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={i + 20}
            className="absolute rounded-full bg-cyan-500/10"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 15 + 5}s linear infinite`,
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Glitch Effect
function GlitchEffect() {
  const [glitch, setGlitch] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitch(true);
        setPosition({
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10
        });
        setTimeout(() => {
          setGlitch(false);
          setPosition({ x: 0, y: 0 });
        }, 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-20 transition-all duration-100 ${
      glitch ? 'opacity-30' : 'opacity-0'
    }`} style={{
      transform: `translate(${position.x}px, ${position.y}px)`,
    }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 mix-blend-overlay"></div>
    </div>
  );
}

// Navbar Component
function Navbar({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-12 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-lg border-b-2 border-blue-500 shadow-lg shadow-blue-500/50' : 'bg-gray-900/80 backdrop-blur-md border-b border-blue-500/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => setActiveSection('home')}
          className="font-mono font-bold text-lg tracking-tight hover:text-cyan-300 transition-colors group"
        >
          <span className="text-blue-400 group-hover:animate-pulse">~/</span>
          <span className="text-white">contestant</span>
          <span className="text-yellow-400 animate-bounce">@</span>
          <span className="text-green-400">codecraft</span>
          <span className="text-green-400 ml-2">$</span>
          <span className="animate-pulse">_</span>
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm items-center font-mono">
          <button 
            onClick={() => setActiveSection('home')}
            className={`hover:text-cyan-300 transition-all duration-300 flex items-center gap-1 group ${
              activeSection === 'home' ? 'text-cyan-300' : ''
            }`}
          >
            <Code size={16} className="group-hover:animate-spin" />
            <span className="group-hover:animate-bounce">[DASHBOARD]</span>
          </button>
          <button 
            onClick={() => setActiveSection('projects')}
            className={`hover:text-cyan-300 transition-all duration-300 flex items-center gap-1 group ${
              activeSection === 'projects' ? 'text-cyan-300' : ''
            }`}
          >
            <Cpu size={16} className="group-hover:animate-pulse" />
            <span className="group-hover:animate-bounce">[SOLUTIONS]</span>
          </button>
          <a 
            href="https://github.com/SaadanNaqvi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-all duration-300 flex items-center gap-1 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500/20 group hover:scale-105"
          >
            <Github size={16} className="group-hover:animate-bounce" />
            SUBMIT_CODE
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden border border-blue-500 p-2 rounded hover:animate-pulse"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b-2 border-blue-500 animate-in slide-in-from-top font-mono">
          <div className="px-6 py-4 space-y-4">
            <button 
              onClick={() => { setActiveSection('home'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 w-full text-left animate-in slide-in-from-left ${
                activeSection === 'home' ? 'text-cyan-300 bg-blue-500/20 p-2 rounded' : ''
              }`}
            >
              <Code size={16} className="animate-spin" />
              [DASHBOARD]
            </button>
            <button 
              onClick={() => { setActiveSection('projects'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 w-full text-left animate-in slide-in-from-left delay-75 ${
                activeSection === 'projects' ? 'text-cyan-300 bg-blue-500/20 p-2 rounded' : ''
              }`}
            >
              <Cpu size={16} className="animate-pulse" />
              [SOLUTIONS]
            </button>
            <a 
              href="https://github.com/SaadanNaqvi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-blue-500 px-3 py-2 rounded hover:bg-blue-500/20 animate-in slide-in-from-left delay-150"
            >
              <Github size={16} className="animate-bounce" />
              SUBMIT_CODE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// Animated Section Wrapper
function AnimatedSection({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
      }`}
    >
      {children}
    </div>
  );
}

// Typing Effect Component
function TypingEffect({ text, speed = 50 }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}<span className="animate-pulse">_</span></span>;
}

// Floating Code Snippet Animation
function FloatingCodeSnippet() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = () => {
      setPosition({
        x: Math.sin(Date.now() / 2000) * 20,
        y: Math.cos(Date.now() / 2000) * 20
      });
    };
    const interval = setInterval(move, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 font-mono text-xs text-blue-500/30 animate-pulse"
           style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
        <div>int main() {'{'}</div>
        <div>&nbsp;&nbsp;return 0;</div>
        <div>{'}'}</div>
      </div>
      <div className="absolute top-1/3 right-1/4 font-mono text-xs text-cyan-500/30 animate-pulse delay-1000"
           style={{ transform: `translate(${-position.x}px, ${-position.y}px)` }}>
        <div>for(auto& x : arr)</div>
        <div>&nbsp;&nbsp;process(x);</div>
      </div>
    </div>
  );
}

// Home Page
function Home({ setActiveSection }) {
  return (
    <>
      {/* Leaderboard Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-32 min-h-screen flex flex-col justify-center relative">
        <FloatingCodeSnippet />
        
        <div className="space-y-6 font-mono relative z-10">
          <div className="overflow-hidden">
            <div className="text-sm text-blue-400 mb-4 animate-in fade-in duration-700 flex items-center gap-2">
              <Target size={16} className="text-green-400 animate-bounce" />
              <TypingEffect text="CONTESTANT_PROFILE" speed={100} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight animate-in slide-in-from-bottom duration-700">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
                &gt; SAADAN NAQVI<br/>
              </span>
              <span className="text-2xl md:text-4xl text-blue-300 mt-4 block">
                <span className="text-yellow-400 animate-pulse">@</span>CODECRAFT_2026
              </span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-cyan-300 max-w-3xl animate-in fade-in slide-in-from-bottom duration-700 delay-200 border-l-2 border-blue-500 pl-4">
            // Competitive Programmer & Aspiring Software Engineer<br/>
            // Interested in algorithms and optimisations.
          </p>
          
          {/* Animated Buttons */}
          <div className="flex gap-4 pt-8 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
            <a 
              href="https://github.com/SaadanNaqvi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded transition-all hover:scale-105 flex items-center gap-2 group shadow-lg shadow-blue-500/50 animate-bounce-slow"
            >
              <Github size={20} className="group-hover:animate-spin" />
              VIEW_SUBMISSIONS
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform group-hover:animate-pulse" />
            </a>
            <button 
              onClick={() => setActiveSection('projects')}
              className="px-6 py-3 border-2 border-blue-500 hover:border-cyan-400 hover:text-cyan-400 rounded transition-all hover:scale-105 shadow-lg shadow-blue-500/30 hover:bg-blue-500/10 animate-pulse-slow"
            >
              VIEW_SOLUTIONS
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection>
        <section className="max-w-6xl mx-auto px-6 py-20 font-mono">
          <div className="flex items-center gap-3 mb-8 group">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 group-hover:animate-pulse"></div>
            <h2 className="text-3xl font-bold text-white group-hover:animate-bounce">
              PROFILE.README
            </h2>
            <span className="text-sm text-blue-300 bg-blue-500/20 px-2 py-1 rounded ml-2 animate-pulse">v1.0</span>
          </div>
          <div className="bg-gray-800/50 border-2 border-blue-500 rounded p-6 shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-[1.02]">
            <div className="font-mono text-blue-200 leading-relaxed animate-in slide-in-from-left">
              <span className="text-cyan-400">/**</span><br/>
              &nbsp;* Contestant Name: SAADAN NAQVI<br/>
              &nbsp;* Contestant Description: Aspiring Software Engineer & Student<br/>
              &nbsp;* Studying EE & Math/CompSci<br/>
              &nbsp;* C++ Enthusiast || Problem Solver<br/>
              <span className="text-cyan-400">&nbsp;*/</span>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Education Section */}
      <AnimatedSection delay={200}>
        <section className="max-w-6xl mx-auto px-6 py-20 font-mono">
          <div className="flex items-center gap-3 mb-12 group">
            <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-400 group-hover:animate-pulse"></div>
            <h2 className="text-3xl font-bold text-white group-hover:animate-bounce">
              EDUCATION.LOG
            </h2>
            <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded border border-green-500 animate-pulse">ACTIVE</span>
          </div>
          <div className="bg-gray-800/50 border-2 border-green-500 rounded-lg p-8 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-400/30 group hover:scale-[1.02] duration-500">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse group-hover:animate-bounce"></div>
                  <h3 className="text-xl font-semibold text-green-400 group-hover:animate-pulse">[UNIVERSITY_OF_ADELAIDE]</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-cyan-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                    <span className="text-blue-400 animate-bounce-slow">→</span> Electrical and Electronic Engineering
                  </p>
                  <p className="text-cyan-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform delay-75">
                    <span className="text-blue-400 animate-bounce-slow delay-100">→</span> Mathematics & Computer Science
                  </p>
                </div>
              </div>
              <div className="text-green-300 mt-2 md:mt-0 md:text-right">
                <div className="inline-block bg-green-500/20 border border-green-500 px-3 py-1 rounded hover:animate-pulse">
                  <p className="text-sm">Adelaide, Australia</p>
                  <p className="font-semibold text-cyan-400">Mar. 202 – Present</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-500/30">
              <p className="text-green-300 flex items-center gap-2">
                <span className="text-cyan-400 font-semibold animate-pulse">ACTIVE_COURSES:</span>
                <span className="text-blue-300 bg-blue-500/20 px-2 py-1 rounded text-sm hover:animate-bounce cursor-pointer">MATH1A/1B</span>
                <span className="text-blue-300 bg-blue-500/20 px-2 py-1 rounded text-sm hover:animate-bounce cursor-pointer">OOP</span>
                <span className="text-blue-300 bg-blue-500/20 px-2 py-1 rounded text-sm hover:animate-bounce cursor-pointer">ALGORITHMS</span>
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection delay={300}>
        <section className="max-w-6xl mx-auto px-6 py-20 font-mono">
          <div className="flex items-center gap-3 mb-12 group">
            <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-amber-400 group-hover:animate-pulse"></div>
            <h2 className="text-3xl font-bold text-white group-hover:animate-bounce">
              EXPERIENCE.DAT
            </h2>
            <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded border border-yellow-500 animate-pulse">ACTIVE</span>
          </div>
          <div className="bg-gray-800/50 border-2 border-yellow-500 rounded-lg p-8 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-400/30 group hover:scale-[1.02] duration-500">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse group-hover:animate-bounce"></div>
                  <h3 className="text-xl font-semibold text-yellow-400 group-hover:animate-pulse">[ACADEMIC_TUTOR]</h3>
                </div>
                <p className="text-cyan-300">Pre-Uni New College</p>
              </div>
              <div className="text-yellow-300 mt-2 md:mt-0 md:text-right">
                <div className="inline-block bg-yellow-500/20 border border-yellow-500 px-3 py-1 rounded hover:animate-pulse">
                  <p>Adelaide, Australia</p>
                  <p className="font-semibold text-cyan-400">Feb 202 – Present</p>
                </div>
              </div>
            </div>
            <ul className="space-y-2 mt-4">
              <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform">
                <span className="text-green-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow">✓</span>
                <span>Tutoring competitive math & CS concepts for years 7-12</span>
              </li>
              <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform delay-75">
                <span className="text-green-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow delay-100">✓</span>
                <span>Developing algorithmic thinking and problem-solving skills</span>
              </li>
              <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform delay-150">
                <span className="text-green-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow delay-200">✓</span>
                <span>Teaching optimisation techniques and efficient coding practices</span>
              </li>
            </ul>
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Solutions Section */}
      <AnimatedSection delay={400}>
        <section className="max-w-6xl mx-auto px-6 py-20 font-mono">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3 group">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-400 group-hover:animate-pulse"></div>
              <h2 className="text-3xl font-bold text-white group-hover:animate-bounce">
                FEATURED_SOLUTIONS
              </h2>
            </div>
            <button 
              onClick={() => setActiveSection('projects')}
              className="text-cyan-400 hover:text-green-400 flex items-center gap-2 group border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400/10 animate-bounce-slow"
            >
              VIEW_ALL_SOLUTIONS
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform group-hover:animate-pulse" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <SolutionCard 
              title="KEY_VALUE_STORE"
              description="High performance key value store with custom memory management, 9.5% faster than std::unordered_map"
              difficulty="HARD"
              runtime="15ms"
              memory="2.3MB"
              tech={["C++", "LOCK-FREE", "ATOMIC", "TCP/IP"]}
              date="Nov 2025 – Dec 2025"
            />
            <SolutionCard 
              title="BLACK_SCHOLES_OPTION_PRICER"
              description="Real-time options pricing engine with Monte Carlo simulation and live visualization"
              difficulty="MEDIUM"
              runtime="8ms"
              memory="4.1MB"
              tech={["C++", "RAYLIB", "OOP", "STOCHASTIC"]}
              date="Aug 2025 – Oct 2025"
            />
          </div>
        </section>
      </AnimatedSection>

      {/* Competition History */}
      <AnimatedSection delay={500}>
        <section className="max-w-6xl mx-auto px-6 py-20 font-mono">
          <div className="flex items-center gap-3 mb-12 group">
            <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-orange-400 group-hover:animate-pulse"></div>
            <h2 className="text-3xl font-bold text-white group-hover:animate-bounce">
              COMPETITION_HISTORY
            </h2>
            <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded border border-red-500 animate-pulse">ACTIVE</span>
          </div>
          <div className="space-y-8">
            {/* Adelaide Rover Team */}
            <div className="bg-gray-800/50 border-2 border-blue-500 rounded-lg p-8 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-400/30 group hover:scale-[1.02] duration-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-yellow-400 group-hover:animate-spin" />
                    <h3 className="text-xl font-semibold text-blue-400 group-hover:animate-pulse">[CHASSIS_LIGHTING_TEAM]</h3>
                    <span className="text-sm text-green-400 bg-green-500/20 px-2 py-0.5 rounded group-hover:animate-bounce">ROBOTICS</span>
                  </div>
                  <p className="text-cyan-300">Adelaide Rover Team · Electrical Engineer</p>
                </div>
                <div className="text-blue-300 mt-2 md:mt-0 md:text-right">
                  <div className="inline-block bg-blue-500/20 border border-blue-500 px-3 py-1 rounded group-hover:animate-pulse">
                    <p>Jul 2025 – Oct 2025</p>
                    <p className="font-semibold text-green-400">COMPLETED</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform">
                  <span className="text-cyan-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow"></span>
                  <span>Designed competition-grade rover lighting systems for Rover competitions</span>
                </li>
                <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform delay-75">
                  <span className="text-cyan-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow delay-100"></span>
                  <span>PCB routing and component optimisation for competition constraints</span>
                </li>
              </ul>
            </div>

            {/* Competitive Programming Club */}
            <div className="bg-gray-800/50 border-2 border-green-500 rounded-lg p-8 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-400/30 group hover:scale-[1.02] duration-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy size={16} className="text-yellow-400 group-hover:animate-spin" />
                    <h3 className="text-xl font-semibold text-green-400 group-hover:animate-pulse">[SPONSORSHIPS_MANAGER]</h3>
                    <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded group-hover:animate-bounce">LEADERSHIP</span>
                  </div>
                  <p className="text-cyan-300">Adelaide Competitive Programming Club</p>
                </div>
                <div className="text-green-300 mt-2 md:mt-0 md:text-right">
                  <div className="inline-block bg-green-500/20 border border-green-500 px-3 py-1 rounded group-hover:animate-pulse">
                    <p>Oct 2025 – Present</p>
                    <p className="font-semibold text-yellow-400">ACTIVE</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform">
                  <span className="text-cyan-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow"></span>
                  <span>Managing sponsorships for university-wide programming competitions</span>
                </li>
                <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform delay-75">
                  <span className="text-cyan-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow delay-100"></span>
                  <span>Organizing ICPC and regional competition events</span>
                </li>
              </ul>
            </div>

            {/* Datathon */}
            <div className="bg-gray-800/50 border-2 border-purple-500 rounded-lg p-8 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-400/30 group hover:scale-[1.02] duration-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={16} className="text-yellow-400 group-hover:animate-spin" />
                    <h3 className="text-xl font-semibold text-purple-400 group-hover:animate-pulse">[2025_DATATHON]</h3>
                    <span className="text-sm text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded group-hover:animate-bounce">4TH_PLACE</span>
                  </div>
                  <p className="text-cyan-300">Society of Quantitative Analysis and Data</p>
                </div>
                <div className="text-purple-300 mt-2 md:mt-0 md:text-right">
                  <div className="inline-block bg-purple-500/20 border border-purple-500 px-3 py-1 rounded group-hover:animate-pulse">
                    <p>Apr 2025</p>
                    <p className="font-semibold text-yellow-400">TOP 5</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform">
                  <span className="text-cyan-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow"></span>
                  <span>Placed 4th in 18-hour university-wide Datathon competition</span>
                </li>
                <li className="flex items-start gap-3 text-blue-200 group/item hover:translate-x-2 transition-transform delay-75">
                  <span className="text-cyan-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow delay-100"></span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Terminal Easter Egg */}
      <TerminalEasterEgg />
      
      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}

// Solution Card Component
function SolutionCard({ title, description, difficulty, runtime, memory, tech, date }) {
  const [isHovered, setIsHovered] = useState(false);
  const difficultyColor = {
    EASY: 'text-green-400 border-green-500',
    MEDIUM: 'text-yellow-400 border-yellow-500',
    HARD: 'text-red-400 border-red-500'
  };

  return (
    <div 
      className="bg-gray-800/50 border-2 border-blue-500 rounded-lg p-6 hover:border-cyan-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/30 group animate-in slide-in-from-bottom"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors font-mono group-hover:animate-pulse">{title}</h3>
            <span className={`text-xs px-2 py-1 rounded border ${difficultyColor[difficulty]} bg-black/50 group-hover:animate-bounce`}>
              {difficulty}
            </span>
          </div>
          {date && <p className="text-xs text-blue-400 mt-1 group-hover:translate-x-2 transition-transform">{date}</p>}
        </div>
        <div className="text-right font-mono">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-sm group-hover:animate-pulse">
              <Zap size={12} className="text-yellow-400 animate-bounce-slow" />
              <span className="text-white">{runtime}</span>
            </div>
            <div className="flex items-center gap-1 text-sm group-hover:animate-pulse delay-100">
              <Database size={12} className="text-blue-400 animate-bounce-slow delay-100" />
              <span className="text-white">{memory}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-blue-200 mb-4 text-sm group-hover:translate-x-2 transition-transform">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t, idx) => (
          <span 
            key={idx} 
            className="px-3 py-1 bg-black text-cyan-400 text-xs rounded border border-blue-500 group-hover:border-cyan-400 transition-colors font-mono hover:animate-bounce cursor-pointer"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className={`mt-4 flex items-center gap-2 text-cyan-400 text-sm transition-all font-mono ${isHovered ? 'translate-x-2' : ''} group-hover:animate-pulse`}>
        &gt; View_Solution_Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

// Projects Page (now Solutions)
function Projects() {
  const solutions = [
    {
      title: "OPTIMIZED_KV_STORE.cpp",
      description: "High-performance key-value store server with custom memory management and lock-free queuing",
      highlights: [
        "Quadratic probing hash table with arena allocator eliminating heap fragmentation",
        "SPSC lock-free queue for thread communication, maximizing throughput",
        "Benchmarked 9.5% faster insertion than std::unordered_map under high concurrency"
      ],
      difficulty: "HARD",
      runtime: "15ms",
      memory: "2.3MB",
      tech: ["C++", "TCP_SOCKETS", "ATOMIC", "LOCK-FREE", "ARENA_ALLOC"],
      github: "https://github.com/SaadanNaqvi",
      date: "Nov 2025 – Dec 2025"
    },
    {
      title: "BLACK-SCHOLES_SOLVER.cpp",
      description: "Real-time options pricing engine with Monte Carlo simulation and analytical methods",
      highlights: [
        "Live graph animations with real-time stock data and portfolio tracking",
        "Object-oriented architecture developed with version control teamwork",
        "Integrated finance, stochastic calculus, and software design"
      ],
      difficulty: "MEDIUM",
      runtime: "8ms",
      memory: "4.1MB",
      tech: ["C++", "RAYLIB", "CLOUD_SAVE", "OOP", "STOCHASTIC_CALC"],
      github: "https://github.com/SaadanNaqvi",
      date: "Aug 2025 – Oct 202"
    }
  ];

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-32 font-mono relative">
        <FloatingCodeSnippet />
        
        <div className="mb-8 relative z-10">
          <div className="text-sm text-blue-400 mb-4 flex items-center gap-2">
            <Code size={16} className="text-green-400 animate-spin" />
            <TypingEffect text="SOLUTION_ARCHIVE" speed={100} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-in slide-in-from-bottom duration-700 text-white">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
              COMPETITION_SOLUTIONS.bin
            </span>
          </h1>
          <p className="text-lg text-cyan-300 max-w-3xl animate-in fade-in slide-in-from-bottom duration-700 delay-200 border-l-2 border-blue-500 pl-4">
            // Archive of optimized solutions for complex problems<br/>
            // Focus on time/space complexity and elegant algorithms.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32 space-y-16">
        {solutions.map((solution, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <SolutionDetailCard {...solution} />
          </AnimatedSection>
        ))}
      </section>
    </>
  );
}

// Solution Detail Card Component
function SolutionDetailCard({ title, description, highlights, difficulty, runtime, memory, tech, github, date }) {
  const difficultyColor = {
    EASY: 'bg-green-500/20 text-green-400 border-green-500',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
    HARD: 'bg-red-500/20 text-red-400 border-red-500'
  };

  return (
    <div className="bg-gray-800/50 border-2 border-blue-500 rounded-lg p-8 hover:border-cyan-400 transition-all hover:shadow-2xl hover:shadow-cyan-400/30 group font-mono hover:scale-[1.02] duration-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl md:text-3xl font-semibold group-hover:text-cyan-400 transition-colors text-blue-400 group-hover:animate-pulse">{title}</h2>
            <span className={`text-sm px-3 py-1 rounded ${difficultyColor[difficulty]} group-hover:animate-bounce`}>
              {difficulty}
            </span>
          </div>
          {date && (
            <div className="flex items-center gap-2 text-sm text-blue-300 group-hover:translate-x-2 transition-transform">
              <Clock size={14} className="animate-pulse-slow" />
              {date}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-cyan-400 transition-all hover:scale-110 flex items-center gap-2 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500/20 group/link animate-bounce-slow"
          >
            <ExternalLink size={16} className="group-hover/link:animate-spin" />
            View Code
          </a>
          <div className="text-right">
            <div className="text-sm group-hover:animate-pulse">
              <span className="text-yellow-400">Runtime: </span>
              <span className="text-white">{runtime}</span>
            </div>
            <div className="text-sm group-hover:animate-pulse delay-100">
              <span className="text-blue-400">Memory: </span>
              <span className="text-white">{memory}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-blue-200 mb-6 group-hover:translate-x-2 transition-transform">{description}</p>
      
      <div className="space-y-3 mb-6">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform"
               style={{ transitionDelay: `${idx * 100}ms` }}>
            <span className="text-green-400 mt-1 group-hover/item:scale-125 transition-transform animate-bounce-slow"
                  style={{ animationDelay: `${idx * 100}ms` }}>✓</span>
            <span className="text-blue-200">{highlight}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {tech.map((t, idx) => (
          <span 
            key={idx} 
            className="px-3 py-1 bg-black text-cyan-400 text-sm rounded border border-blue-500 hover:border-cyan-400 transition-colors hover:animate-bounce cursor-pointer"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t-2 border-blue-500 mt-20 font-mono">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-blue-300 text-sm animate-pulse">
              © 2026 CODECRAFT_CONTESTANT_PORTFOLIO
            </p>
            <p className="text-blue-400/70 text-xs mt-1 animate-pulse-slow">
              Last submission: 02/12/2026 14:32:47 UTC
            </p>
          </div>
          <div className="flex gap-6">
            <a 
              href="https://github.com/SaadanNaqvi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-cyan-400 transition-all hover:scale-110 border border-blue-500 p-2 rounded hover:bg-blue-500/20 animate-bounce-slow"
              title="GitHub Submissions"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-cyan-400 transition-all hover:scale-110 border border-blue-500 p-2 rounded hover:bg-blue-500/20 animate-bounce-slow delay-100"
              title="Connect"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="text-blue-300 hover:text-cyan-400 transition-all hover:scale-110 border border-blue-500 p-2 rounded hover:bg-blue-500/20 animate-bounce-slow delay-200"
              title="Submit Query"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-blue-500/30 text-center">
          <p className="text-xs text-blue-400/70 animate-pulse">
            Competition Status: ACTIVE • Next Contest: ICPC Regionals 2026 • Rank: #42
          </p>
        </div>
      </div>
    </footer>
  );
}

// Terminal Easter Egg Component - Now Debug Console
function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'CodeCraft Debug Console v2.5' },
    { type: 'output', text: 'Type "help" for debugging commands' },
    { type: 'output', text: 'Contestant: SAADAN NAQVI | Rank: #42' }
  ]);
  const inputRef = useRef(null);

  const commands = {
    help: () => [
      'Debug Commands:',
      '  status    - Competition status',
      '  stats     - Performance statistics',
      '  next      - Upcoming contests',
      '  rank      - Current ranking',
      '  solve     - Problem solving tips',
      '  clear     - Clear console',
      '  exit      - Close debug console'
    ],
    status: () => [
      '=== COMPETITION STATUS ===',
      'Active: Yes',
      'Current Streak: 42 days',
      'Problems Today: 3/5',
      'Accuracy: 94.7%',
      'Avg Runtime: 15ms'
    ],
    stats: () => [
      '=== PERFORMANCE STATS ===',
      'Total Solved: 127',
      'Easy: 45/50 (90%)',
      'Medium: 38/45 (84.4%)',
      'Hard: 22/30 (73.3%)',
      'Quant Finance: 22/25 (88%)',
      'Recent: 4th Place - Datathon 202'
    ],
    next: () => [
      '=== UPCOMING CONTESTS ===',
      'ICPC Regionals - Mar 202',
      'Google Code Jam - Apr 202',
      'Facebook Hacker Cup - Jun 202',
      'University Comp - Weekly'
    ],
    rank: () => [
      'Current Global Rank: #42',
      'University Rank: #3',
      'Region: Top 5%',
      'Rating: 1876',
      'Percentile: 96.3%'
    ],
    solve: () => {
      const tips = [
        'Tip: Always analyze time complexity before coding',
        'Tip: Use edge cases in your test suite',
        'Tip: Practice dynamic programming daily',
        'Tip: Review other solutions after solving',
        'Tip: Focus on clean, readable code first'
      ];
      return [tips[Math.floor(Math.random() * tips.length)]];
    },
    clear: () => {
      setHistory([]);
      return null;
    },
    exit: () => {
      setIsOpen(false);
      return null;
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: `debug@codecraft $ ${cmd}` }];

    if (trimmedCmd === '') {
      setHistory(newHistory);
      return;
    }

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      if (output) {
        output.forEach(line => {
          newHistory.push({ type: 'output', text: line });
        });
      }
    } else {
      newHistory.push({ type: 'error', text: `Command '${trimmedCmd}' not found. Type 'help' for commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKonami = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setIsOpen(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full shadow-2xl transition-all hover:scale-110 z-50 group animate-bounce-slow"
        title="Debug Console (Konami code: ↑↑↓↓←→←→BA)"
      >
        <TerminalIcon size={24} className="group-hover:animate-spin" />
        <span className="absolute -top-2 -right-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-gray-900 border-2 border-blue-500 rounded-lg shadow-2xl w-full max-w-3xl h-[600px] flex flex-col animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-blue-500 bg-gray-800/50 font-mono">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-100"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-200"></div>
                </div>
                <span className="text-sm text-blue-400 ml-4 animate-pulse">debug@codecraft ~ $</span>
                <span className="text-sm text-green-400 animate-pulse-slow">contestant_session</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-400 hover:text-cyan-400 transition-colors hover:animate-spin"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              {history.map((item, idx) => (
                <div key={idx} className={`mb-2 animate-in slide-in-from-left ${
                  item.type === 'input' ? 'text-cyan-400' :
                  item.type === 'error' ? 'text-red-400' :
                  'text-blue-300'
                }`} style={{ animationDelay: `${idx * 50}ms` }}>
                  {item.text}
                </div>
              ))}
              <div className="flex items-center gap-2 text-green-400">
                <span>contestant@codecraft $</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent outline-none text-white animate-pulse"
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="px-4 py-2 border-t-2 border-blue-500 bg-gray-800/50 text-xs text-blue-400 font-mono animate-pulse">
              Debug Console | Contestant: SAADAN NAQVI | Type "help" for commands | Konami: ↑↑↓↓←→←→BA
            </div>
          </div>
        </div>
      )}
    </>
  );
}