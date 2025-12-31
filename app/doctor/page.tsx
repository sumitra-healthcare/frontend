"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Doctor Portal Landing Page - Exact Figma Implementation
 * Node ID: 221-1169
 * Matching the design pixel-for-pixel
 */

export default function DoctorPortalPage() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden font-['Inter',sans-serif]">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Video Feature Section */}
      <VideoFeatureSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Doctor Quote Section */}
      <DoctorQuoteSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ============================================
   NAVIGATION - Exact Figma Match
   ============================================ */
function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-[136px] py-[12px] bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[8px]">
          <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#155dfc] to-[#1447e6] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="text-[18px] font-semibold text-[#155dfc]">AlphaCare</span>
        </Link>

        {/* Nav Links - Center */}
        <div className="flex items-center gap-[32px]">
          <Link href="#features" className="text-[14px] text-[#4a5565] hover:text-[#155dfc] transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-[14px] text-[#4a5565] hover:text-[#155dfc] transition-colors">
            Pricing
          </Link>
          <Link href="#demo" className="text-[14px] text-[#4a5565] hover:text-[#155dfc] transition-colors">
            Demo
          </Link>
          <Link href="#support" className="text-[14px] text-[#4a5565] hover:text-[#155dfc] transition-colors">
            Support
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-[16px]">
          <Link 
            href="/doctor/login" 
            className="text-[14px] text-[#4a5565] hover:text-[#155dfc] transition-colors"
          >
            Doctor Login
          </Link>
          <Link 
            href="/doctor/register" 
            className="px-[20px] py-[8px] bg-gradient-to-r from-[#155dfc] to-[#1447e6] text-white text-[14px] font-medium rounded-[14px] hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ============================================
   HERO SECTION - Exact Figma Match
   ============================================ */
function HeroSection() {
  return (
    <section className="relative w-full pt-[64px]" style={{ background: 'linear-gradient(180deg, #EAF2FF 0%, #EAF2FF 100%)' }}>
      <div className="max-w-[1488px] mx-auto px-[136px] py-[80px]">
        <div className="flex items-center justify-between gap-[60px]">
          {/* Left Content */}
          <div className="max-w-[500px]">
            <p className="text-[14px] font-medium text-[#155dfc] mb-[12px] tracking-wide">
              FOR HEALTHCARE PROVIDERS
            </p>
            <h1 className="text-[42px] font-bold leading-[1.2] text-[#101828] mb-[20px]">
              Streamline Your Medical Practice with AlphaCare
            </h1>
            <p className="text-[16px] leading-[1.6] text-[#4a5565] mb-[32px]">
              A complete solution for managing patients, scheduling appointments, and maintaining health records. Focus on what matters most - providing excellent care.
            </p>
            
            {/* Buttons */}
            <div className="flex items-center gap-[16px] mb-[40px]">
              <Link 
                href="/doctor/register"
                className="px-[24px] py-[12px] bg-gradient-to-r from-[#155dfc] to-[#1447e6] text-white text-[16px] font-medium rounded-[8px] hover:opacity-90 transition-opacity"
              >
                Start Free Trial
              </Link>
              <Link 
                href="#demo"
                className="px-[24px] py-[12px] bg-white text-[#155dfc] text-[16px] font-medium rounded-[8px] border border-[#155dfc] hover:bg-[#f0f5ff] transition-colors"
              >
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-[32px]">
              <div>
                <p className="text-[20px] font-bold text-[#101828]">10K+</p>
                <p className="text-[14px] text-[#4a5565]">Active Doctors</p>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#101828]">500K+</p>
                <p className="text-[14px] text-[#4a5565]">Patients Served</p>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#101828]">4.9/5</p>
                <p className="text-[14px] text-[#4a5565]">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-[584px] h-[502px] rounded-[27px] overflow-hidden shadow-2xl flex-shrink-0">
            <Image
              src="/images/doctor/doctor-hero-2.png"
              alt="Healthcare Professional"
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
   FEATURES SECTION - Exact Figma Match
   ============================================ */
function FeaturesSection() {
  const features = [
    {
      icon: "/images/doctor/icon-patient.svg",
      title: "Patient Management",
      description: "Comprehensive patient records and history at your fingertips",
    },
    {
      icon: "/images/doctor/icon-schedule.svg",
      title: "Appointment Scheduling",
      description: "Easy scheduling with automated reminders and sync",
    },
    {
      icon: "/images/doctor/icon-chart.svg",
      title: "Health Analytics",
      description: "Real-time insights into practice performance",
    },
    {
      icon: "/images/doctor/icon-records.svg",
      title: "Medical Records",
      description: "Secure digital records with easy access anytime",
    },
    {
      icon: "/images/doctor/icon-billing.svg",
      title: "Billing & Payments",
      description: "Streamlined billing with integrated payment solutions",
    },
    {
      icon: "/images/doctor/icon-security.svg",
      title: "Save Time",
      description: "Reduce administrative work by up to 40%",
    },
  ];

  return (
    <section id="features" className="py-[80px] bg-white">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        {/* Section Header */}
        <div className="text-center mb-[64px]">
          <h2 className="text-[20px] font-medium text-[#101828] mb-[16px]">
            Powerful Features for Modern Healthcare
          </h2>
          <p className="text-[16px] text-[#4a5565]">
            Everything you need to run an efficient, patient-centered practice
          </p>
        </div>

        {/* Features Grid - 3 columns, 2 rows */}
        <div className="grid grid-cols-3 gap-[24px]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-[#dbeafe] rounded-[16px] p-[25px] hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="w-[48px] h-[48px] rounded-[12px] bg-[#dbeafe] flex items-center justify-center mb-[20px]">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={24}
                  height={24}
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
   PRICING SECTION - Exact Figma Match
   ============================================ */
function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for individual practitioners",
      features: [
        "Up to 100 patients",
        "Basic scheduling",
        "Email support",
        "Standard reports",
        "1 user account",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Best for growing practices",
      features: [
        "Up to 500 patients",
        "Advanced scheduling",
        "Priority support",
        "Custom reports",
        "5 user accounts",
        "Analytics dashboard",
        "API access",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      description: "For large medical facilities",
      features: [
        "Unlimited patients",
        "Full scheduling suite",
        "24/7 phone support",
        "Custom integrations",
        "Unlimited users",
        "White-label option",
        "Dedicated account manager",
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-[80px] bg-[#f9fafb]">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-[28px] font-semibold text-[#101828] mb-[12px]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[16px] text-[#4a5565]">
            Choose the plan that best fits your practice needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-3 gap-[24px]">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-[20px] p-[32px] ${
                plan.highlighted 
                  ? 'bg-gradient-to-br from-[#155dfc] to-[#1447e6] text-white' 
                  : 'bg-white border border-[#e5e7eb]'
              }`}
            >
              <h3 className={`text-[20px] font-semibold mb-[8px] ${plan.highlighted ? 'text-white' : 'text-[#101828]'}`}>
                {plan.name}
              </h3>
              <p className={`text-[14px] mb-[20px] ${plan.highlighted ? 'text-white/80' : 'text-[#4a5565]'}`}>
                {plan.description}
              </p>
              
              <div className="flex items-baseline gap-[4px] mb-[24px]">
                <span className={`text-[40px] font-bold ${plan.highlighted ? 'text-white' : 'text-[#101828]'}`}>
                  {plan.price}
                </span>
                <span className={`text-[14px] ${plan.highlighted ? 'text-white/80' : 'text-[#4a5565]'}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-[12px] mb-[32px]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-[8px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.highlighted ? 'white' : '#155dfc'} strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className={`text-[14px] ${plan.highlighted ? 'text-white' : 'text-[#4a5565]'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-[12px] rounded-[8px] text-[14px] font-medium transition-all ${
                  plan.highlighted 
                    ? 'bg-white text-[#155dfc] hover:bg-gray-100' 
                    : 'bg-[#155dfc] text-white hover:opacity-90'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   VIDEO FEATURE SECTION - Exact Figma Match
   ============================================ */
function VideoFeatureSection() {
  const features = [
    "Complete patient management solution",
    "Real-time appointment scheduling",
    "Comprehensive health analytics",
    "Secure data encryption",
  ];

  return (
    <section className="py-[80px] bg-gradient-to-r from-[#155dfc] to-[#1447e6]">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        <div className="flex items-center gap-[80px]">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <h2 className="text-[28px] font-semibold mb-[16px]">
              Transform How You Practice Medicine
            </h2>
            <p className="text-[16px] text-white/80 mb-[32px]">
              Join thousands of healthcare professionals who've streamlined their practice with AlphaCare.
            </p>

            <ul className="space-y-[16px]">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-[12px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="text-[16px]">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="#demo"
              className="inline-block mt-[32px] px-[24px] py-[12px] bg-white text-[#155dfc] text-[16px] font-medium rounded-[8px] hover:bg-gray-100 transition-colors"
            >
              Watch Demo
            </Link>
          </div>

          {/* Right - Video Player Mockup */}
          <div className="relative w-[500px] h-[320px] bg-[#1447e6] rounded-[20px] flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Play Button */}
            <div className="w-[80px] h-[80px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#155dfc">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white/10" />
            <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   TESTIMONIALS SECTION - Exact Figma Match
   ============================================ */
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "General Practitioner",
      quote: "AlphaCare has completely transformed how I manage my practice. The patient management system is incredibly intuitive.",
      rating: 5,
    },
    {
      name: "Dr. Michael Ross",
      role: "Cardiologist",
      quote: "The scheduling system alone has saved us hours each week. Our patients love the automated reminders.",
      rating: 5,
    },
    {
      name: "Dr. Emily Parker",
      role: "Pediatrician",
      quote: "Finally, a system that actually understands what doctors need. The analytics dashboard is a game-changer.",
      rating: 5,
    },
  ];

  return (
    <section className="py-[80px] bg-white">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-[28px] font-semibold text-[#101828] mb-[12px]">
            What Doctors Are Saying About Us
          </h2>
          <p className="text-[16px] text-[#4a5565]">
            Hear from healthcare professionals who've transformed their practice
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-3 gap-[24px]">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#f9fafb] rounded-[16px] p-[32px]"
            >
              {/* Rating Stars */}
              <div className="flex gap-[4px] mb-[16px]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFC107">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[14px] text-[#4a5565] mb-[24px] leading-[1.6]">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#155dfc] to-[#1447e6] flex items-center justify-center">
                  <span className="text-[14px] font-semibold text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#101828]">{testimonial.name}</p>
                  <p className="text-[12px] text-[#4a5565]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   DOCTOR QUOTE SECTION - Exact Figma Match
   ============================================ */
function DoctorQuoteSection() {
  return (
    <section className="py-[80px] bg-[#f9fafb]">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        <div className="flex items-center gap-[60px]">
          {/* Left - Doctor Image */}
          <div className="relative w-[400px] h-[480px] rounded-[20px] overflow-hidden shadow-xl flex-shrink-0">
            <Image
              src="/images/doctor/doctor-hero-1.png"
              alt="Dr. James Wilson"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Quote */}
          <div className="flex-1">
            <p className="text-[14px] font-medium text-[#155dfc] mb-[16px]">
              FEATURED TESTIMONIAL
            </p>
            <blockquote className="text-[24px] text-[#101828] leading-[1.5] mb-[24px] font-medium">
              &quot;AlphaCare has completely changed how I run my practice. The comprehensive patient management, combined with the intuitive scheduling system, has allowed me to focus more on what really matters - my patients. I couldn&apos;t imagine going back to the old way of doing things.&quot;
            </blockquote>
            <div>
              <p className="text-[18px] font-semibold text-[#101828]">Dr. James Wilson</p>
              <p className="text-[14px] text-[#4a5565]">Chief of Medicine, Metropolitan Hospital</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION - Exact Figma Match
   ============================================ */
function CTASection() {
  return (
    <section className="py-[80px] bg-gradient-to-r from-[#155dfc] to-[#1447e6]">
      <div className="max-w-[800px] mx-auto px-[136px] text-center">
        <h2 className="text-[32px] font-bold text-white mb-[16px]">
          Ready to Transform Your Practice?
        </h2>
        <p className="text-[16px] text-white/80 mb-[32px]">
          Join thousands of healthcare professionals who've streamlined their practice with AlphaCare.
        </p>

        <div className="flex justify-center gap-[16px]">
          <Link
            href="/doctor/register"
            className="px-[24px] py-[12px] bg-white text-[#155dfc] text-[16px] font-medium rounded-[8px] hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </Link>
          <Link
            href="/contact"
            className="px-[24px] py-[12px] bg-transparent text-white text-[16px] font-medium rounded-[8px] border-2 border-white hover:bg-white/10 transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FOOTER - Exact Figma Match
   ============================================ */
function Footer() {
  return (
    <footer className="bg-[#101828] text-white pt-[60px] pb-[40px]">
      <div className="max-w-[1488px] mx-auto px-[136px]">
        <div className="grid grid-cols-4 gap-[48px] mb-[48px]">
          {/* Logo & Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-[8px] mb-[16px]">
              <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-[#155dfc] to-[#1447e6] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <span className="text-[16px] font-semibold">AlphaCare</span>
            </div>
            <p className="text-[14px] text-white/60 leading-[1.6] mb-[20px]">
              Empowering healthcare professionals with modern practice management solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-[12px]">
              <a href="#" className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Image src="/images/doctor/icon-facebook.svg" alt="Facebook" width={16} height={16} className="invert opacity-60" />
              </a>
              <a href="#" className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Image src="/images/doctor/icon-twitter.svg" alt="Twitter" width={16} height={16} className="invert opacity-60" />
              </a>
              <a href="#" className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Image src="/images/doctor/icon-instagram.svg" alt="Instagram" width={16} height={16} className="invert opacity-60" />
              </a>
              <a href="#" className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Image src="/images/doctor/icon-linkedin.svg" alt="LinkedIn" width={16} height={16} className="invert opacity-60" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[14px] font-semibold mb-[16px]">Product</h4>
            <ul className="space-y-[10px]">
              <li><Link href="#features" className="text-[14px] text-white/60 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-[14px] text-white/60 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#integrations" className="text-[14px] text-white/60 hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#updates" className="text-[14px] text-white/60 hover:text-white transition-colors">Updates</Link></li>
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
                <Image src="/images/doctor/icon-email.svg" alt="" width={16} height={16} className="invert opacity-60" />
                <span className="text-[14px] text-white/60">support@alphacare.com</span>
              </li>
              <li className="flex items-center gap-[8px]">
                <Image src="/images/doctor/icon-phone.svg" alt="" width={16} height={16} className="invert opacity-60" />
                <span className="text-[14px] text-white/60">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-[8px]">
                <Image src="/images/doctor/icon-location.svg" alt="" width={16} height={16} className="invert opacity-60" />
                <span className="text-[14px] text-white/60">123 Healthcare Ave, NY 10001</span>
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
