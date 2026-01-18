import React, { useEffect, useState } from 'react';
import { X, Github, Linkedin, Mail, ExternalLink, Menu, ArrowRight, Code, Zap, Database, TrendingUp } from 'lucide-react';

// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="pt-16">
        {activeSection === 'home' && <Home setActiveSection={setActiveSection} />}
        {activeSection === 'projects' && <Projects />}
      </main>

      <Footer />
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 shadow-lg' : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => setActiveSection('home')}
          className="font-bold text-lg tracking-tight hover:text-emerald-400 transition-colors"
        >
          Saadan Naqvi
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm items-center">
          <button 
            onClick={() => setActiveSection('home')}
            className={`hover:text-emerald-400 transition-colors ${activeSection === 'home' ? 'text-emerald-400' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveSection('projects')}
            className={`hover:text-emerald-400 transition-colors ${activeSection === 'projects' ? 'text-emerald-400' : ''}`}
          >
            Projects
          </button>
          <a 
            href="https://github.com/SaadanNaqvi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top">
          <div className="px-6 py-4 space-y-4">
            <button 
              onClick={() => { setActiveSection('home'); setMobileMenuOpen(false); }}
              className={`block w-full text-left ${activeSection === 'home' ? 'text-emerald-400' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveSection('projects'); setMobileMenuOpen(false); }}
              className={`block w-full text-left ${activeSection === 'projects' ? 'text-emerald-400' : ''}`}
            >
              Projects
            </button>
            <a 
              href="https://github.com/SaadanNaqvi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              GitHub
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
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

// Home Page
function Home({ setActiveSection }) {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-32 min-h-screen flex flex-col justify-center">
        <div className="space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent leading-tight animate-in slide-in-from-bottom duration-700">
              Building Fast Things That Matter
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            Electrical Engineering & Computer Science student obsessed with performance, correctness, and elegant systems.
          </p>
          <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <a 
              href="https://github.com/SaadanNaqvi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg transition-all hover:scale-105 flex items-center gap-2 group"
            >
              <Github size={20} />
              View GitHub
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => setActiveSection('projects')}
              className="px-6 py-3 border border-slate-700 hover:border-emerald-500 rounded-lg transition-all hover:scale-105"
            >
              See Projects
            </button>
          </div>
        </div>

        {/* Floating Tech Icons */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          <FloatingIcon icon={<Code size={24} />} label="Systems" delay={0} />
          <FloatingIcon icon={<Zap size={24} />} label="Performance" delay={100} />
          <FloatingIcon icon={<Database size={24} />} label="Low-Level" delay={200} />
          <FloatingIcon icon={<TrendingUp size={24} />} label="Quant Finance" delay={300} />
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            My interests sit at the intersection of low-latency systems, quantitative finance, and applied mathematics. 
            I enjoy working close to the metal — writing custom allocators, lock-free data structures, and benchmarking 
            code until intuition aligns with reality.
          </p>
        </section>
      </AnimatedSection>

      {/* Featured Projects Section */}
      <AnimatedSection delay={200}>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <button 
              onClick={() => setActiveSection('projects')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 group"
            >
              View All
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <FeaturedProjectCard 
              title="High-Performance Key-Value Store"
              description="Single-threaded TCP server with custom memory management achieving 9.5% faster insertion than std::unordered_map"
              tech={["C++", "TCP/IP", "Lock-Free"]}
              metric="9.5%"
              metricLabel="Performance Gain"
            />
            <FeaturedProjectCard 
              title="Black-Scholes Option Pricer"
              description="Real-time options pricing engine with Monte Carlo simulation and analytical methods"
              tech={["C++", "RayLib", "Stochastic Calculus"]}
              metric="Real-time"
              metricLabel="Visualization"
            />
          </div>
        </section>
      </AnimatedSection>

      {/* Skills/Focus Section */}
      <AnimatedSection delay={300}>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Why Quant / HFT
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <SkillCard 
              title="Systems Programming"
              description="Lock-free data structures and custom memory allocators"
              icon={<Code size={24} />}
            />
            <SkillCard 
              title="Quantitative Finance"
              description="Statistical modelling & stochastic calculus"
              icon={<TrendingUp size={24} />}
            />
            <SkillCard 
              title="Performance Engineering"
              description="Benchmark-driven optimisation mindset"
              icon={<Zap size={24} />}
            />
            <SkillCard 
              title="Competitive Programming"
              description="ICPC exposure and algorithmic problem solving"
              icon={<Database size={24} />}
            />
          </div>
        </section>
      </AnimatedSection>

      {/* GitHub Stats */}
      <AnimatedSection delay={400}>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            GitHub Activity
          </h2>
          <GitHubStats />
        </section>
      </AnimatedSection>
    </>
  );
}

// Floating Icon Component
function FloatingIcon({ icon, label, delay }) {
  return (
    <div 
      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all hover:scale-105 animate-in fade-in zoom-in duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-emerald-400">
        {icon}
      </div>
      <span className="text-sm text-slate-400">{label}</span>
    </div>
  );
}

// Featured Project Card
function FeaturedProjectCard({ title, description, tech, metric, metricLabel }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">{title}</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400">{metric}</div>
          <div className="text-xs text-slate-500">{metricLabel}</div>
        </div>
      </div>
      
      <p className="text-slate-400 mb-4 text-sm">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t, idx) => (
          <span 
            key={idx} 
            className="px-3 py-1 bg-slate-800 text-emerald-400 text-xs rounded-full border border-slate-700 group-hover:border-emerald-500/50 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>

      <div className={`mt-4 flex items-center gap-2 text-emerald-400 text-sm transition-all ${isHovered ? 'translate-x-2' : ''}`}>
        View Details <ArrowRight size={16} />
      </div>
    </div>
  );
}

// Projects Page
function Projects() {
  const projects = [
    {
      title: "High-Performance Key-Value Store",
      description: "Single-threaded TCP server with custom memory management and lock-free data structures",
      highlights: [
        "Arena allocator (zero mallocs in hot path)",
        "Lock-free SPSC queue implementation",
        "9.5% faster insertion vs std::unordered_map",
        "Custom TCP protocol with binary serialization"
      ],
      tech: ["C++", "TCP/IP", "Lock-Free", "Benchmarking"],
      github: "https://github.com/SaadanNaqvi"
    },
    {
      title: "Black-Scholes Option Pricer",
      description: "Real-time options pricing engine with Monte Carlo simulation and analytical methods",
      highlights: [
        "Monte Carlo & analytical pricing methods",
        "Real-time plotting with RayLib",
        "Portfolio-level PnL simulation",
        "Greeks calculation and visualization"
      ],
      tech: ["C++", "RayLib", "Stochastic Calculus", "Monte Carlo"],
      github: "https://github.com/SaadanNaqvi"
    },
    {
      title: "Trading Strategy Backtester",
      description: "High-performance backtesting framework for quantitative trading strategies",
      highlights: [
        "Event-driven architecture",
        "Vectorized computations for performance",
        "Transaction cost modeling",
        "Multiple asset class support"
      ],
      tech: ["Python", "NumPy", "Pandas", "Vectorization"],
      github: "https://github.com/SaadanNaqvi"
    }
  ];

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-32">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom duration-700">
          Deep-Dive Projects
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          A selection of systems and quantitative finance projects with a focus on performance, 
          correctness, and benchmarking.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32 space-y-16">
        {projects.map((project, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <ProjectCard {...project} />
          </AnimatedSection>
        ))}
      </section>
    </>
  );
}

// Skill Card Component
function SkillCard({ title, description, icon }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:scale-105 group">
      <div className="flex items-start gap-4">
        <div className="text-emerald-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-emerald-400 mb-2">{title}</h3>
          <p className="text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ title, description, highlights, tech, github }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10 group">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold group-hover:text-emerald-400 transition-colors">{title}</h2>
        <a 
          href={github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-emerald-400 transition-all hover:scale-110"
        >
          <ExternalLink size={24} />
        </a>
      </div>
      
      <p className="text-slate-400 mb-6">{description}</p>
      
      <div className="space-y-3 mb-6">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-3 group/item">
            <span className="text-emerald-400 mt-1 group-hover/item:scale-125 transition-transform">✓</span>
            <span className="text-slate-300">{highlight}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {tech.map((t, idx) => (
          <span 
            key={idx} 
            className="px-3 py-1 bg-slate-800 text-emerald-400 text-sm rounded-full border border-slate-700 hover:border-emerald-500 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// GitHub Stats Component
function GitHubStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/SaadanNaqvi")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-pulse">
            <div className="h-8 bg-slate-800 rounded mb-2"></div>
            <div className="h-4 bg-slate-800 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    { label: "Public Repos", value: data.public_repos || 0 },
    { label: "Followers", value: data.followers || 0 },
    { label: "Following", value: data.following || 0 },
    { label: "Total Stars", value: "Live" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-all hover:scale-105 animate-in zoom-in duration-500"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="text-3xl md:text-4xl font-bold text-emerald-400">{stat.value}</div>
          <div className="text-xs uppercase tracking-wider text-slate-400 mt-2">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">
            © 2025 Saadan Naqvi. Built with React & Tailwind.
          </p>
          <div className="flex gap-6">
            <a 
              href="https://github.com/SaadanNaqvi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-all hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-all hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="text-slate-400 hover:text-emerald-400 transition-all hover:scale-110"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}