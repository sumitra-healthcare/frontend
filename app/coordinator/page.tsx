"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Coordinator Portal Landing Page - Exact Figma Implementation
 * Node ID: 221-1914
 * Green Theme (#00a63e, #008236)
 */

export default function CoordinatorPortalPage() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden font-['Inter',sans-serif]">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ============================================
   NAVIGATION - Green Theme
   ============================================ */
function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-[136px] py-[12px] bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[8px]">
          <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#00a63e] to-[#008236] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="text-[18px] font-semibold text-[#00a63e]">Alpha Care</span>
        </Link>

        {/* Nav Links - Center */}
        <div className="flex items-center gap-[32px]">
          <Link href="#features" className="text-[14px] text-[#4a5565] hover:text-[#00a63e] transition-colors">
            Features
          </Link>
          <Link href="#demo" className="text-[14px] text-[#4a5565] hover:text-[#00a63e] transition-colors">
            Demo
          </Link>
          <Link href="#support" className="text-[14px] text-[#4a5565] hover:text-[#00a63e] transition-colors">
            Support
          </Link>
          <Link href="#services" className="text-[14px] text-[#4a5565] hover:text-[#00a63e] transition-colors">
            Services
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-[16px]">
          <Link 
            href="/coordinator/login" 
            className="text-[14px] text-[#4a5565] hover:text-[#00a63e] transition-colors"
          >
            Coordinator Login
          </Link>
          <Link 
            href="/coordinator/register" 
            className="px-[20px] py-[8px] bg-gradient-to-r from-[#00a63e] to-[#008236] text-white text-[14px] font-medium rounded-[14px] hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ============================================
   HERO SECTION - Green Theme
   ============================================ */
function HeroSection() {
  return (
    <section className="relative w-full pt-[64px]" style={{ background: 'linear-gradient(180deg, #e6f7ed 0%, #ffffff 100%)' }}>
      <div className="max-w-[1488px] mx-auto px-[136px] py-[80px]">
        <div className="flex items-center justify-between gap-[60px]">
          {/* Left Content */}
          <div className="max-w-[450px]">
            <p className="text-[14px] font-medium text-[#00a63e] mb-[12px] tracking-wide flex items-center gap-[8px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a63e" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Healthcare Operations Excellence
            </p>
            <h1 className="text-[36px] font-bold leading-[1.2] text-[#101828] mb-[20px]">
              Streamline Healthcare Coordination
            </h1>
            <p className="text-[16px] leading-[1.6] text-[#4a5565] mb-[32px]">
              Empower your team with tools to manage appointments, coordinate patient care, and optimize healthcare delivery across your facility.
            </p>
            
            {/* Buttons */}
            <div className="flex items-center gap-[16px]">
              <Link 
                href="/coordinator/register"
                className="px-[24px] py-[12px] bg-gradient-to-r from-[#00a63e] to-[#008236] text-white text-[16px] font-medium rounded-[8px] hover:opacity-90 transition-opacity flex items-center gap-[8px]"
              >
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link 
                href="#demo"
                className="px-[24px] py-[12px] bg-white text-[#4a5565] text-[16px] font-medium rounded-[8px] border border-[#e5e7eb] hover:border-[#00a63e] hover:text-[#00a63e] transition-colors flex items-center gap-[8px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-[500px] h-[400px] rounded-[24px] flex-shrink-0 overflow-hidden shadow-2xl">
            <Image
              src="/images/coordinator/hero.png"
              alt="Healthcare coordinator at work"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FEATURES SECTION - Green Theme
   ============================================ */
function FeaturesSection() {
  const features = [
    {
      icon: "/images/coordinator/icon-appointment.svg",
      title: "Appointment Management",
      description: "Efficiently manage and schedule appointments across multiple doctors",
    },
    {
      icon: "/images/coordinator/icon-patient.svg",
      title: "Patient Coordination",
      description: "Streamline patient flow and reduce wait times",
    },
    {
      icon: "/images/coordinator/icon-analytics.svg",
      title: "OPD Analytics",
      description: "Track performance metrics and optimize operations",
    },
    {
      icon: "/images/coordinator/icon-access.svg",
      title: "Access Control",
      description: "Manage permissions and delegate tasks effectively",
    },
    {
      icon: "/images/coordinator/icon-security.svg",
      title: "Secure Platform",
      description: "Enterprise-grade security for all operations",
    },
    {
      icon: "/images/coordinator/icon-updates.svg",
      title: "Real-Time Updates",
      description: "Stay informed with live status updates",
    },
  ];

  return (
    <section id="features" className="py-[80px] bg-white">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        {/* Section Header */}
        <div className="text-center mb-[64px]">
          <h2 className="text-[24px] font-semibold text-[#101828] mb-[12px]">
            Powerful Coordination Tools
          </h2>
          <p className="text-[16px] text-[#4a5565]">
            Everything you need to run efficient healthcare operations
          </p>
        </div>

        {/* Features Grid - 3 columns, 2 rows */}
        <div className="grid grid-cols-3 gap-[24px]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-[#d1fae5] rounded-[16px] p-[25px] hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="w-[48px] h-[48px] rounded-[12px] bg-[#d1fae5] flex items-center justify-center mb-[20px]">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={24}
                  height={24}
                  style={{ filter: 'invert(38%) sepia(93%) saturate(1352%) hue-rotate(131deg) brightness(95%) contrast(101%)' }}
                />
              </div>
              
              <h3 className="text-[16px] font-semibold text-[#101828] mb-[8px]">
                {feature.title}
              </h3>
              <p className="text-[14px] text-[#4a5565] leading-[1.5]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION - Green Gradient Theme
   ============================================ */
function CTASection() {
  return (
    <section className="py-[100px]" style={{ background: 'linear-gradient(180deg, #e6f7ed 0%, #d1fae5 100%)' }}>
      <div className="max-w-[800px] mx-auto px-[136px] text-center">
        <h2 className="text-[28px] font-semibold text-[#101828] mb-[16px]">
          Ready to Optimize Your Operations?
        </h2>
        <p className="text-[16px] text-[#4a5565] mb-[32px]">
          Join healthcare facilities transforming their coordination with Alpha Care
        </p>

        <Link
          href="/coordinator/register"
          className="inline-flex items-center gap-[8px] px-[24px] py-[12px] bg-white text-[#00a63e] text-[16px] font-medium rounded-[8px] border border-[#00a63e] hover:bg-[#f0fdf4] transition-colors"
        >
          Get Started Free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}

/* ============================================
   FOOTER - Dark Theme
   ============================================ */
function Footer() {
  return (
    <footer className="bg-[#101828] text-white pt-[60px] pb-[40px]">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        <div className="grid grid-cols-4 gap-[48px] mb-[48px]">
          {/* Logo & Description */}
          <div className="col-span-1">
            <p className="text-[14px] text-white/60 leading-[1.6] mb-[20px]">
              Comprehensive healthcare management platform for doctors, patients, and coordinators.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-[12px]">
              <a href="#" className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.6">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.6">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.6">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" fillOpacity="0.6">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[14px] font-semibold mb-[16px]">Product</h4>
            <ul className="space-y-[10px]">
              <li><Link href="#features" className="text-[14px] text-white/60 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-[14px] text-white/60 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#security" className="text-[14px] text-white/60 hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#integrations" className="text-[14px] text-white/60 hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#api" className="text-[14px] text-white/60 hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[14px] font-semibold mb-[16px]">Company</h4>
            <ul className="space-y-[10px]">
              <li><Link href="/about" className="text-[14px] text-white/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-[14px] text-white/60 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[14px] font-semibold mb-[16px]">Contact</h4>
            <ul className="space-y-[10px]">
              <li className="flex items-center gap-[8px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-[14px] text-white/60">support@alphacare.com</span>
              </li>
              <li className="flex items-center gap-[8px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="text-[14px] text-white/60">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-[8px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-[14px] text-white/60">123 Healthcare Ave,<br/>New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-[24px] flex items-center justify-between">
          <p className="text-[12px] text-white/40">
            © 2024 Alpha Care. All rights reserved.
          </p>
          <div className="flex gap-[24px]">
            <Link href="/privacy" className="text-[12px] text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[12px] text-white/40 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-[12px] text-white/40 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
