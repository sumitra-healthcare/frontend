"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Patient Portal Landing Page - Exact Figma Implementation
 * Node ID: 221-1590
 * Purple/Lavender Theme
 */

export default function PatientPortalPage() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden font-['Inter',sans-serif]">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Video Feature Section */}
      <VideoFeatureSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Our Services Section */}
      <ServicesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ============================================
   NAVIGATION - Purple Theme
   ============================================ */
function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-[136px] py-[12px] bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[8px]">
          <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#9810fa] to-[#8200db] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="text-[18px] font-semibold text-[#9810fa]">AlphaCare</span>
        </Link>

        {/* Nav Links - Center */}
        <div className="flex items-center gap-[32px]">
          <Link href="#features" className="text-[14px] text-[#4a5565] hover:text-[#9810fa] transition-colors">
            Features
          </Link>
          <Link href="#demo" className="text-[14px] text-[#4a5565] hover:text-[#9810fa] transition-colors">
            Demo
          </Link>
          <Link href="#support" className="text-[14px] text-[#4a5565] hover:text-[#9810fa] transition-colors">
            Support
          </Link>
          <Link href="#services" className="text-[14px] text-[#4a5565] hover:text-[#9810fa] transition-colors">
            Services
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-[16px]">
          <Link 
            href="/patient/login" 
            className="text-[14px] text-[#4a5565] hover:text-[#9810fa] transition-colors"
          >
            Patient Login
          </Link>
          <Link 
            href="/patient/register" 
            className="px-[20px] py-[8px] bg-gradient-to-r from-[#9810fa] to-[#8200db] text-white text-[14px] font-medium rounded-[14px] hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ============================================
   HERO SECTION - Purple/Lavender Theme
   ============================================ */
function HeroSection() {
  return (
    <section className="relative w-full pt-[64px]" style={{ background: 'linear-gradient(180deg, #f5e6ff 0%, #ffffff 100%)' }}>
      <div className="max-w-[1488px] mx-auto px-[136px] py-[80px]">
        <div className="flex items-center justify-between gap-[60px]">
          {/* Left Content */}
          <div className="max-w-[500px]">
            <p className="text-[14px] font-medium text-[#9810fa] mb-[12px] tracking-wide">
              FOR PATIENTS & FAMILIES
            </p>
            <h1 className="text-[42px] font-bold leading-[1.2] text-[#101828] mb-[20px]">
              All Your Health Needs in One Secure Platform
            </h1>
            <p className="text-[16px] leading-[1.6] text-[#4a5565] mb-[32px]">
              Access your personal health records, book appointments, and stay connected with your healthcare providers - all from one convenient platform.
            </p>
            
            {/* Buttons */}
            <div className="flex items-center gap-[16px] mb-[40px]">
              <Link 
                href="/patient/register"
                className="px-[24px] py-[12px] bg-gradient-to-r from-[#9810fa] to-[#8200db] text-white text-[16px] font-medium rounded-[8px] hover:opacity-90 transition-opacity"
              >
                Start For Free
              </Link>
              <Link 
                href="#demo"
                className="px-[24px] py-[12px] bg-white text-[#9810fa] text-[16px] font-medium rounded-[8px] border border-[#9810fa] hover:bg-[#f9f0ff] transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-[32px]">
              <div>
                <p className="text-[20px] font-bold text-[#101828]">1M+</p>
                <p className="text-[14px] text-[#4a5565]">Users</p>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#101828]">500K+</p>
                <p className="text-[14px] text-[#4a5565]">Appointments</p>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#101828]">4.9/5</p>
                <p className="text-[14px] text-[#4a5565]">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-[450px] h-[400px] rounded-[24px] flex-shrink-0 overflow-hidden shadow-2xl">
            <Image
              src="/images/patient/hero.png"
              alt="Patient using health app"
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
   FEATURES SECTION - Purple Theme
   ============================================ */
function FeaturesSection() {
  const features = [
    {
      icon: "/images/patient/icon-appointment.svg",
      title: "Easy Appointment Booking",
      description: "Schedule appointments with your doctors in just a few clicks, anytime and anywhere.",
    },
    {
      icon: "/images/patient/icon-health.svg",
      title: "Health Records Access",
      description: "Access your complete medical history, lab results, and prescriptions securely.",
    },
    {
      icon: "/images/patient/icon-analytics.svg",
      title: "Track Your Health Metrics",
      description: "Monitor vital signs, medications, and health progress over time.",
    },
    {
      icon: "/images/patient/icon-records.svg",
      title: "Prescription Management",
      description: "Manage your medications and set reminders for timely doses.",
    },
    {
      icon: "/images/patient/icon-family.svg",
      title: "Family Profiles",
      description: "Add and manage health records for your entire family in one place.",
    },
    {
      icon: "/images/patient/icon-reminders.svg",
      title: "Smart Reminders",
      description: "Get notified about upcoming appointments, medications, and health checkups.",
    },
  ];

  return (
    <section id="features" className="py-[80px] bg-white">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        {/* Section Header */}
        <div className="text-center mb-[64px]">
          <h2 className="text-[20px] font-medium text-[#101828] mb-[16px]">
            Everything You Need for Better Health
          </h2>
          <p className="text-[16px] text-[#4a5565]">
            Powerful features designed to make managing your health simple and effective
          </p>
        </div>

        {/* Features Grid - 3 columns, 2 rows */}
        <div className="grid grid-cols-3 gap-[24px]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-[#e9d5ff] rounded-[16px] p-[25px] hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="w-[48px] h-[48px] rounded-[12px] bg-[#f3e8ff] flex items-center justify-center mb-[20px]">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={24}
                  height={24}
                  style={{ filter: 'invert(25%) sepia(94%) saturate(5842%) hue-rotate(270deg) brightness(93%) contrast(108%)' }}
                />
              </div>
              
              <h3 className="text-[16px] font-medium text-[#101828] mb-[8px]">
                {feature.title}
              </h3>
              <p className="text-[16px] text-[#4a5565] leading-[1.5]">
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
   VIDEO FEATURE SECTION - Purple Theme
   ============================================ */
function VideoFeatureSection() {
  const features = [
    "Access your health records anytime",
    "Book appointments instantly",
    "Get medication reminders",
    "Connect with your care team",
  ];

  return (
    <section className="py-[80px] bg-[#f9fafb]">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        <div className="flex items-center gap-[80px]">
          {/* Left - Video Player Mockup (Purple) */}
          <div className="relative w-[500px] h-[320px] bg-gradient-to-br from-[#9810fa] to-[#8200db] rounded-[20px] flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0">
            {/* Play Button */}
            <div className="w-[80px] h-[80px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#9810fa">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white/10" />
            <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/10" />
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <h2 className="text-[28px] font-semibold text-[#101828] mb-[16px]">
              Manage Your Health Effortlessly
            </h2>
            <p className="text-[16px] text-[#4a5565] mb-[32px]">
              Experience a seamless healthcare journey with our patient-centric platform designed for your convenience.
            </p>

            <ul className="space-y-[16px]">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#f3e8ff] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9810fa" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="text-[16px] text-[#101828]">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/patient/register"
              className="inline-block mt-[32px] px-[24px] py-[12px] bg-gradient-to-r from-[#9810fa] to-[#8200db] text-white text-[16px] font-medium rounded-[8px] hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   HOW IT WORKS SECTION
   ============================================ */
function HowItWorksSection() {
  const steps = [
    {
      icon: "/images/patient/icon-user.svg",
      number: "01",
      title: "Create Your Account",
      description: "Sign up in minutes and set up your health profile.",
      color: "bg-[#f3e8ff]",
    },
    {
      icon: "/images/patient/icon-doctor.svg",
      number: "02",
      title: "Find Your Doctor",
      description: "Search and connect with qualified healthcare providers.",
      color: "bg-[#f3e8ff]",
    },
    {
      icon: "/images/patient/icon-heart.svg",
      number: "03",
      title: "Manage Your Health",
      description: "Track, monitor, and improve your health journey.",
      color: "bg-[#f3e8ff]",
    },
  ];

  return (
    <section className="py-[80px] bg-white">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-[28px] font-semibold text-[#101828] mb-[12px]">
            How It Works
          </h2>
          <p className="text-[16px] text-[#4a5565]">
            Getting started with AlphaCare is quick and easy
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-[32px]">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Icon Container */}
              <div className={`w-[80px] h-[80px] mx-auto rounded-[16px] ${step.color} flex items-center justify-center mb-[20px] relative`}>
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={32}
                  height={32}
                  style={{ filter: 'invert(25%) sepia(94%) saturate(5842%) hue-rotate(270deg) brightness(93%) contrast(108%)' }}
                />
                {/* Step Number Badge */}
                <div className="absolute -top-[8px] -right-[8px] w-[28px] h-[28px] rounded-full bg-[#9810fa] text-white text-[12px] font-bold flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-[18px] font-semibold text-[#101828] mb-[8px]">
                {step.title}
              </h3>
              <p className="text-[14px] text-[#4a5565]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SERVICES SECTION
   ============================================ */
function ServicesSection() {
  const services = [
    {
      icon: "/images/patient/icon-book.svg",
      title: "Book Appointments",
      description: "Schedule appointments with top specialists in your area with just a few taps.",
      features: ["Instant confirmation", "Easy rescheduling", "24/7 availability"],
    },
    {
      icon: "/images/patient/icon-records.svg",
      title: "Health Care Tracking",
      description: "Monitor your vital signs, medications, and health progress over time.",
      features: ["Vital signs tracking", "Medication reminders", "Progress reports"],
    },
  ];

  return (
    <section id="services" className="py-[80px] bg-[#f9fafb]">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-[28px] font-semibold text-[#101828] mb-[12px]">
            Our Services
          </h2>
          <p className="text-[16px] text-[#4a5565]">
            Comprehensive healthcare solutions for you and your family
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-[32px]">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-[20px] p-[40px] border border-[#e9d5ff]">
              {/* Icon & Number */}
              <div className="flex items-start gap-[16px] mb-[24px]">
                <div className="w-[56px] h-[56px] rounded-[14px] bg-[#f3e8ff] flex items-center justify-center">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={28}
                    height={28}
                    style={{ filter: 'invert(25%) sepia(94%) saturate(5842%) hue-rotate(270deg) brightness(93%) contrast(108%)' }}
                  />
                </div>
                <div className="text-[48px] font-bold text-[#f3e8ff]">
                  0{index + 1}
                </div>
              </div>

              <h3 className="text-[22px] font-semibold text-[#101828] mb-[12px]">
                {service.title}
              </h3>
              <p className="text-[16px] text-[#4a5565] mb-[20px]">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-[10px]">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-[8px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9810fa" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="text-[14px] text-[#4a5565]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   STATS SECTION
   ============================================ */
function StatsSection() {
  const stats = [
    { value: "1M+", label: "Active Users" },
    { value: "500+", label: "Partner Hospitals" },
    { value: "10K+", label: "Doctors Available" },
    { value: "4.9/5", label: "User Rating" },
  ];

  return (
    <section className="py-[60px] bg-white">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        <div className="flex items-center justify-between">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-[32px] font-bold text-[#9810fa] mb-[4px]">{stat.value}</p>
              <p className="text-[14px] text-[#4a5565]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION - Purple Theme
   ============================================ */
function CTASection() {
  return (
    <section className="py-[80px] bg-gradient-to-r from-[#9810fa] to-[#8200db]">
      <div className="max-w-[800px] mx-auto px-[136px] text-center">
        <h2 className="text-[32px] font-bold text-white mb-[16px]">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-[16px] text-white/80 mb-[32px]">
          Join millions of users who trust AlphaCare for their healthcare needs.
        </p>

        <div className="flex justify-center gap-[16px]">
          <Link
            href="/patient/register"
            className="px-[24px] py-[12px] bg-white text-[#9810fa] text-[16px] font-medium rounded-[8px] hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            href="/contact"
            className="px-[24px] py-[12px] bg-transparent text-white text-[16px] font-medium rounded-[8px] border-2 border-white hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
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
            <div className="flex items-center gap-[8px] mb-[16px]">
              <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-[#9810fa] to-[#8200db] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <span className="text-[16px] font-semibold">AlphaCare</span>
            </div>
            <p className="text-[14px] text-white/60 leading-[1.6] mb-[20px]">
              Your trusted partner for comprehensive healthcare management.
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
              <li><Link href="#faq" className="text-[14px] text-white/60 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[14px] font-semibold mb-[16px]">Company</h4>
            <ul className="space-y-[10px]">
              <li><Link href="/about" className="text-[14px] text-white/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-[14px] text-white/60 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-[14px] text-white/60 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/press" className="text-[14px] text-white/60 hover:text-white transition-colors">Press</Link></li>
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
                <span className="text-[14px] text-white/60">New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-[24px] flex items-center justify-between">
          <p className="text-[12px] text-white/40">
            © 2024 AlphaCare. All rights reserved.
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
