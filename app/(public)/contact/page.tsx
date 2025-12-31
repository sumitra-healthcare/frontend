'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * Contact Page - Exact Figma Design Match (node 130-1847)
 * Two-column layout: Map + Contact Info | Appointment Form
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: 'US',
    selectDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Appointment request submitted!');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-[140px] pb-[80px]">
        {/* Page Title */}
        <div className="text-center mb-[60px]">
          <h1 className="font-['Yeseva_One'] text-[48px] text-[#011632]">
            Get In Touch
          </h1>
        </div>

        {/* Contact Section - Two Column Layout */}
        <div className="max-w-[1200px] mx-auto px-[40px]">
          <div className="flex gap-[40px]">
            {/* Left Column - Map & Contact Info */}
            <div className="w-[380px] flex-shrink-0 space-y-[16px]">
              {/* Map Section with Office Address */}
              <div className="relative rounded-[16px] overflow-hidden border border-[#E5E7EB] shadow-sm">
                {/* Map Image */}
                <div className="w-full h-[220px] bg-[#f0f4f8] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.2810881!3d40.6923344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b36c5f168f9d%3A0x6c7fa8b69c14b0c5!2s1441%20Morris%20Ave%2C%20Union%2C%20NJ%2007083!5e0!3m2!1sen!2sus!4v1703951200000!5m2!1sen!2sus"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                  {/* Office Address Overlay */}
                  <div className="absolute bottom-[16px] left-[16px] right-[16px] bg-white rounded-[12px] px-[16px] py-[12px] shadow-lg flex items-center gap-[12px]">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#1376F8] flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#011632]">Office Address</p>
                      <p className="text-[12px] text-[#3C4959]">1441 Morris Ave, Union, NJ 07083</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Timings Card */}
              <ContactInfoCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1376F8" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                }
                title="Office Timings"
                lines={["Monday - Saturday (9:00am to 5pm)", "Sunday (Closed)"]}
              />

              {/* Email Address Card */}
              <ContactInfoCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1376F8" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                }
                title="Email Address"
                lines={["Smile01@gmail.com"]}
              />

              {/* Phone Number Card */}
              <ContactInfoCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1376F8" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                }
                title="Phone Number"
                lines={["0900-78601"]}
              />

              {/* Live Chat Card */}
              <ContactInfoCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1376F8" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                }
                title="Live chat"
                lines={["+1-2064512559"]}
              />
            </div>

            {/* Right Column - Appointment Form */}
            <div className="flex-1 border border-[#E5E7EB] rounded-[16px] p-[32px]">
              <form onSubmit={handleSubmit} className="space-y-[20px]">
                {/* First Name & Last Name - Side by Side */}
                <div className="flex gap-[20px]">
                  <div className="flex-1">
                    <label className="block text-[14px] font-medium text-[#3C4959] mb-[8px]">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full px-[16px] py-[12px] border border-[#D0D5DD] rounded-[8px] text-[14px] text-[#011632] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#1376F8] focus:ring-1 focus:ring-[#1376F8] transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[14px] font-medium text-[#3C4959] mb-[8px]">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full px-[16px] py-[12px] border border-[#D0D5DD] rounded-[8px] text-[14px] text-[#011632] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#1376F8] focus:ring-1 focus:ring-[#1376F8] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[14px] font-medium text-[#3C4959] mb-[8px]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full px-[16px] py-[12px] border border-[#D0D5DD] rounded-[8px] text-[14px] text-[#011632] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#1376F8] focus:ring-1 focus:ring-[#1376F8] transition-colors"
                  />
                </div>

                {/* Phone Number with Country Code */}
                <div>
                  <label className="block text-[14px] font-medium text-[#3C4959] mb-[8px]">
                    Phone number
                  </label>
                  <div className="flex">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="px-[12px] py-[12px] border border-[#D0D5DD] rounded-l-[8px] border-r-0 text-[14px] text-[#011632] bg-white focus:outline-none focus:border-[#1376F8] focus:ring-1 focus:ring-[#1376F8]"
                    >
                      <option value="US">US</option>
                      <option value="IN">IN</option>
                      <option value="UK">UK</option>
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="flex-1 px-[16px] py-[12px] border border-[#D0D5DD] rounded-r-[8px] text-[14px] text-[#011632] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#1376F8] focus:ring-1 focus:ring-[#1376F8] transition-colors"
                    />
                  </div>
                </div>

                {/* Select Date */}
                <div>
                  <label className="block text-[14px] font-medium text-[#3C4959] mb-[8px]">
                    Select date
                  </label>
                  <input
                    type="date"
                    name="selectDate"
                    value={formData.selectDate}
                    onChange={handleChange}
                    className="w-full px-[16px] py-[12px] border border-[#D0D5DD] rounded-[8px] text-[14px] text-[#011632] focus:outline-none focus:border-[#1376F8] focus:ring-1 focus:ring-[#1376F8] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[14px] font-medium text-[#3C4959] mb-[8px]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder=""
                    className="w-full px-[16px] py-[12px] border border-[#D0D5DD] rounded-[8px] text-[14px] text-[#011632] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#1376F8] focus:ring-1 focus:ring-[#1376F8] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-[8px]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-[32px] py-[14px] bg-[#1376F8] text-white text-[14px] font-semibold rounded-[8px] hover:bg-[#0d5bc7] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book an appointment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ============================================
   CONTACT INFO CARD COMPONENT
   ============================================ */
interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}

function ContactInfoCard({ icon, title, lines }: ContactInfoCardProps) {
  return (
    <div className="flex items-start gap-[12px] p-[16px] border border-[#E5E7EB] rounded-[12px] bg-white">
      <div className="w-[40px] h-[40px] rounded-full bg-[#E6F6FE] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[14px] font-semibold text-[#011632] mb-[2px]">{title}</p>
        {lines.map((line, index) => (
          <p key={index} className="text-[12px] text-[#3C4959]">{line}</p>
        ))}
      </div>
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
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-[8px] text-[16px] text-[#3C4959] hover:text-[#1376F8] transition-colors"
            >
              Services
              <svg 
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-[8px] w-[140px] bg-white rounded-[10px] shadow-xl border border-gray-100 py-[8px]">
                <Link href="/doctor" className="block px-[16px] py-[10px] text-[14px] text-[#1376F8] hover:bg-[#E6F6FE] font-medium" onClick={() => setServicesOpen(false)}>Doctor</Link>
                <Link href="/patient" className="block px-[16px] py-[10px] text-[14px] text-[#EC942C] hover:bg-[#E6F6FE] font-medium" onClick={() => setServicesOpen(false)}>Patient</Link>
                <Link href="/coordinator" className="block px-[16px] py-[10px] text-[14px] text-[#34C759] hover:bg-[#E6F6FE] font-medium" onClick={() => setServicesOpen(false)}>Coordinator</Link>
              </div>
            )}
          </div>

          <Link href="/about" className="text-[16px] text-[#3C4959] hover:text-[#1376F8] transition-colors">About</Link>
          <Link href="/contact" className="text-[16px] font-medium text-[#011632] hover:text-[#1376F8] transition-colors">Contact</Link>
        </div>

        {/* Contact Button */}
        <Link 
          href="/contact" 
          className="px-[28px] py-[12px] bg-[#1376F8] text-white text-[16px] font-medium rounded-[8px] hover:bg-[#0d5bc7] transition-colors shadow-md"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}

/* ============================================
   FOOTER - Matching Figma Design
   ============================================ */
function Footer() {
  return (
    <footer className="bg-[#011632] text-white pt-[60px] pb-[40px]">
      <div className="max-w-[1200px] mx-auto px-[40px]">
        <div className="grid grid-cols-4 gap-[60px] mb-[40px]">
          {/* Left Column - Description & Social */}
          <div className="col-span-1">
            <p className="text-[14px] text-white/70 leading-[1.7] mb-[24px]">
              Comprehensive healthcare management platform for doctors, patients, and coordinators.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-[12px]">
              <a href="#" className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="#011632"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#011632" strokeWidth="2"/>
                </svg>
              </a>
              <a href="#" className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[20px]">Product</h4>
            <ul className="space-y-[12px]">
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[20px]">Company</h4>
            <ul className="space-y-[12px]">
              <li><Link href="/about" className="text-[14px] text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[16px] font-semibold mb-[20px]">Contact</h4>
            <ul className="space-y-[12px]">
              <li className="flex items-center gap-[8px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-70">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-[14px] text-white/70">support@alphacare.com</span>
              </li>
              <li className="flex items-center gap-[8px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-70">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="text-[14px] text-white/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-[8px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-70 mt-[2px]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-[14px] text-white/70">123 Healthcare Ave,<br/>New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
