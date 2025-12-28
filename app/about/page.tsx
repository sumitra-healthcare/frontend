"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * About Page - Exact Figma Implementation
 * Node ID: 253-607
 * Design System Colors:
 * - Light Blue: #E6F6FE
 * - Dark Blue: #011632
 * - Mid Blue: #1376F8
 * - Sky Blue: #25B4F8
 * - Body Text: #3C4959
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* About Content Section */}
      <AboutContentSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ============================================
   NAVIGATION
   ============================================ */
function Navigation() {
  const [servicesOpen, setServicesOpen] = React.useState(false);

  return (
    <nav className="absolute top-[40px] left-[80px] right-[80px] z-50">
      <div className="bg-[#E6F6FE] rounded-[10px] px-[40px] py-[20px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[10px]">
          <div className="w-[40px] h-[40px] rounded-lg bg-gradient-to-br from-[#1376F8] to-[#25B4F8] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="text-[28px] font-bold">
            <span className="text-[#1376F8]">Alpha</span>
            <span className="text-[#25B4F8]">Care</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-[40px]">
          <Link href="/" className="text-[16px] text-[#3C4959] hover:text-[#1376F8] transition-colors">
            Home
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-[8px] text-[16px] text-[#3C4959] hover:text-[#1376F8] transition-colors"
            >
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 mt-[8px] w-[140px] bg-white rounded-[10px] shadow-xl border border-gray-100 py-[8px]">
                <Link href="/doctor" className="block px-[16px] py-[10px] text-[14px] text-[#1376F8] hover:bg-[#E6F6FE] font-medium"
                  onClick={() => setServicesOpen(false)}>Doctor</Link>
                <Link href="/patient" className="block px-[16px] py-[10px] text-[14px] text-[#EC942C] hover:bg-[#E6F6FE] font-medium"
                  onClick={() => setServicesOpen(false)}>Patient</Link>
                <Link href="/coordinator" className="block px-[16px] py-[10px] text-[14px] text-[#34C759] hover:bg-[#E6F6FE] font-medium"
                  onClick={() => setServicesOpen(false)}>Coordinator</Link>
              </div>
            )}
          </div>

          <Link href="/about" className="text-[16px] font-medium text-[#011632] hover:text-[#1376F8] transition-colors">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-[24px]">
          <Link href="/login" className="text-[16px] text-[#3C4959] hover:text-[#1376F8] transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-[28px] py-[12px] bg-[#1376F8] text-white text-[16px] font-medium rounded-[8px] hover:bg-[#0d5bc7] transition-colors shadow-md">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection() {
  return (
    <section className="relative min-h-[500px] bg-[#E6F6FE] pt-[180px] pb-[100px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-[140px] text-center">
        <h1 className="text-[56px] font-bold text-[#011632] mb-[24px] leading-[1.2]">
          About <span className="text-[#1376F8]">Alpha Care</span>
        </h1>
        <p className="text-[20px] text-[#3C4959] max-w-[700px] mx-auto leading-[1.6]">
          We are committed to revolutionizing healthcare through technology, making quality 
          medical services accessible to everyone, everywhere.
        </p>
      </div>
    </section>
  );
}

/* ============================================
   STATS SECTION
   ============================================ */
function StatsSection() {
  const stats = [
    { value: "10K+", label: "Patients Served" },
    { value: "500+", label: "Expert Doctors" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <section className="py-[80px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[140px]">
        <div className="grid grid-cols-4 gap-[40px]">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-[32px] bg-[#F8FCFF] rounded-[16px] border border-[#E6F6FE]">
              <p className="text-[48px] font-bold text-[#1376F8] mb-[8px]">{stat.value}</p>
              <p className="text-[18px] text-[#3C4959]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ABOUT CONTENT SECTION
   ============================================ */
function AboutContentSection() {
  return (
    <section className="py-[100px] bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-[140px]">
        <div className="flex items-center gap-[80px]">
          {/* Left Image */}
          <div className="relative w-[550px] h-[450px] rounded-[24px] overflow-hidden shadow-2xl">
            <Image
              src="/images/about/container.png"
              alt="Healthcare team"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-[#1376F8] mb-[12px] uppercase tracking-wide">
              Our Story
            </p>
            <h2 className="text-[40px] font-bold text-[#011632] mb-[24px] leading-[1.2]">
              Transforming Healthcare Through Innovation
            </h2>
            <p className="text-[18px] text-[#3C4959] mb-[24px] leading-[1.7]">
              Alpha Care was founded with a simple yet powerful vision: to make quality healthcare 
              accessible to everyone. We believe that technology can bridge the gap between patients 
              and healthcare providers, making medical services more efficient and personalized.
            </p>
            <p className="text-[18px] text-[#3C4959] leading-[1.7]">
              Our platform connects patients with experienced doctors, streamlines health record 
              management, and provides a seamless healthcare experience from the comfort of your home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   VALUES SECTION
   ============================================ */
function ValuesSection() {
  const values = [
    {
      title: "Patient-Centered",
      description: "Every decision we make puts patients first, ensuring their health and well-being.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1376F8" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
    {
      title: "Innovation",
      description: "We continuously improve our technology to provide better healthcare solutions.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1376F8" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
    },
    {
      title: "Trust & Security",
      description: "Your health data is protected with the highest security standards.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1376F8" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
    },
    {
      title: "Accessibility",
      description: "Healthcare should be available to everyone, regardless of location.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1376F8" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[140px]">
        <div className="text-center mb-[60px]">
          <h2 className="text-[40px] font-bold text-[#011632] mb-[16px]">
            Our Core <span className="text-[#1376F8]">Values</span>
          </h2>
          <p className="text-[18px] text-[#3C4959] max-w-[600px] mx-auto">
            The principles that guide us in our mission to transform healthcare
          </p>
        </div>

        <div className="grid grid-cols-4 gap-[32px]">
          {values.map((value, index) => (
            <div key={index} className="text-center p-[32px] bg-[#F8FCFF] rounded-[20px] border border-[#E6F6FE] hover:shadow-lg transition-shadow">
              <div className="w-[72px] h-[72px] rounded-[16px] bg-[#E6F6FE] flex items-center justify-center mx-auto mb-[20px]">
                {value.icon}
              </div>
              <h3 className="text-[20px] font-bold text-[#011632] mb-[12px]">{value.title}</h3>
              <p className="text-[16px] text-[#3C4959] leading-[1.6]">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   TEAM SECTION - Exact Figma Match
   ============================================ */
function TeamSection() {
  const team = [
    { 
      name: "Anmol Jaiswal", 
      role: "Alphacare Founder", 
      subtitle: "Internal Medicine & Healthcare Innovation",
      image: "/images/about/team-1.png",
      borderColor: "from-[#FFD700] via-[#FFA500] to-[#9B59B6]" // Yellow to purple gradient
    },
    { 
      name: "Gaurangi Jain", 
      role: "UX/UI Designer", 
      subtitle: "Internal Medicine & Healthcare Innovation",
      image: "/images/about/team-2.png",
      borderColor: "from-[#4A90E2] via-[#5B9FE3] to-[#6BB3F4]" // Blue gradient
    },
    { 
      name: "Deepika Saini", 
      role: "UX/UI Designer", 
      subtitle: "Internal Medicine & Healthcare Innovation",
      image: "/images/about/team-3.png",
      borderColor: "from-[#4A90E2] via-[#5B9FE3] to-[#6BB3F4]" // Blue gradient
    },
  ];

  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[140px]">
        {/* Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-[40px] font-bold text-[#011632] mb-[16px]">
            Meet Our Leadership Team
          </h2>
          <p className="text-[18px] text-[#3C4959] max-w-[700px] mx-auto">
            Our team combines decades of healthcare expertise with world-class technology leadership
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-3 gap-[60px]">
          {team.map((member, index) => (
            <div key={index} className="text-left">
              {/* Image with gradient border */}
              <div className="relative mb-[24px]">
                {/* Gradient border frame */}
                <div className={`absolute -inset-[4px] bg-gradient-to-br ${member.borderColor} rounded-[20px]`} />
                
                {/* Image container */}
                <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden bg-white">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-[22px] font-bold text-[#011632] mb-[8px]">
                {member.name}
              </h3>
              
              {/* Role - Blue text */}
              <p className="text-[16px] text-[#1376F8] font-medium mb-[6px]">
                {member.role}
              </p>
              
              {/* Subtitle - Gray text */}
              <p className="text-[14px] text-[#6B7280]">
                {member.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION - Exact Figma Match (node 255-1020)
   ============================================ */
function CTASection() {
  const features = [
    "Free to get started",
    "No credit card required",
    "Setup in 2 minutes",
  ];

  return (
    <section className="py-[60px] px-[140px]">
      <div className="relative bg-[#155DFC] rounded-[48px] py-[80px] px-[100px] overflow-hidden">
        {/* Blurred background circles */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[100px]" />
        <div className="absolute top-[100px] right-[100px] w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px]" />
        
        {/* Teal glow overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[90%] h-[80%] bg-[#73FFEE]/20 rounded-[48px] blur-sm" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Title */}
          <h2 className="text-[24px] font-normal text-white mb-[24px]">
            Ready to Transform Your Healthcare Experience?
          </h2>

          {/* Subtitle */}
          <p className="text-[20px] text-white/90 max-w-[800px] mx-auto mb-[40px] leading-[1.6]">
            Join thousands of healthcare professionals and patients who trust Alpha Care for 
            their health management needs.
          </p>

          {/* Feature Checkmarks */}
          <div className="flex justify-center gap-[40px] mb-[40px]">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-[10px]">
                {/* Checkmark icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span className="text-[16px] text-white">{feature}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-[16px] mb-[40px]">
            {/* Get Started Now - White button */}
            <Link 
              href="/register" 
              className="flex items-center gap-[8px] px-[32px] py-[16px] bg-white text-[#1376F8] text-[16px] font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Get Started Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>

            {/* Schedule a Demo - Green button */}
            <Link 
              href="/demo" 
              className="px-[32px] py-[16px] bg-[#22C55E] text-white text-[16px] font-medium rounded-[8px] hover:bg-[#16a34a] transition-colors"
            >
              Schedule a Demo
            </Link>
          </div>

          {/* Contact Info */}
          <p className="text-[16px] text-white/70">
            Questions? Contact us at{" "}
            <a href="mailto:support@alphacare.com" className="text-white underline hover:text-white/90">
              support@alphacare.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FOOTER
   ============================================ */
function Footer() {
  return (
    <footer className="bg-[#011632] text-white pt-[80px] pb-[40px]">
      <div className="max-w-[1440px] mx-auto px-[140px]">
        <div className="grid grid-cols-4 gap-[60px] mb-[60px]">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-[10px] mb-[20px]">
              <div className="w-[40px] h-[40px] rounded-lg bg-gradient-to-br from-[#1376F8] to-[#25B4F8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <span className="text-[24px] font-bold">
                <span className="text-white">Alpha</span>
                <span className="text-[#25B4F8]">Care</span>
              </span>
            </div>
            <p className="text-[14px] text-white/70 leading-[1.6]">
              Your trusted partner in digital healthcare.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[20px]">About</h4>
            <ul className="space-y-[12px]">
              <li><Link href="/about" className="text-[14px] text-white/70 hover:text-white">Our Story</Link></li>
              <li><Link href="/about#team" className="text-[14px] text-white/70 hover:text-white">Team</Link></li>
              <li><Link href="/careers" className="text-[14px] text-white/70 hover:text-white">Careers</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[20px]">Services</h4>
            <ul className="space-y-[12px]">
              <li><Link href="/patient" className="text-[14px] text-white/70 hover:text-white">For Patients</Link></li>
              <li><Link href="/doctor" className="text-[14px] text-white/70 hover:text-white">For Doctors</Link></li>
              <li><Link href="/coordinator" className="text-[14px] text-white/70 hover:text-white">For Coordinators</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[20px]">Contact</h4>
            <ul className="space-y-[12px]">
              <li><Link href="/help" className="text-[14px] text-white/70 hover:text-white">Help Center</Link></li>
              <li><Link href="/contact" className="text-[14px] text-white/70 hover:text-white">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-[14px] text-white/70 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-[24px] text-center">
          <p className="text-[14px] text-white/50">© 2024 Alpha Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
