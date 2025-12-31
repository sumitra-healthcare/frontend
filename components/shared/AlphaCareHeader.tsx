'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * AlphaCareHeader - Shared navigation header for public pages
 * 
 * Variants:
 * - 'public': Shows "Contact Us" button (for Home, About, Contact pages)
 * - 'auth': Shows "Sign up" button (for Login, Register pages)
 */

export interface AlphaCareHeaderProps {
  /** Current active page for highlighting */
  activePage?: 'home' | 'about' | 'contact' | 'services';
  
  /** Header variant - determines right-side content */
  variant?: 'public' | 'auth';
}

export function AlphaCareHeader({ 
  activePage, 
  variant = 'public' 
}: AlphaCareHeaderProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  const isActive = (page: string) => activePage === page;

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
          <Link 
            href="/" 
            className={`text-[16px] transition-colors ${
              isActive('home') 
                ? 'font-semibold text-[#011632]' 
                : 'text-[#3C4959] hover:text-[#1376F8]'
            }`}
          >
            Home
          </Link>
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`flex items-center gap-[8px] text-[16px] transition-colors ${
                isActive('services') 
                  ? 'font-semibold text-[#011632]' 
                  : 'text-[#3C4959] hover:text-[#1376F8]'
              }`}
            >
              Services
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {/* Dropdown Menu */}
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-[8px] w-[140px] bg-white rounded-[10px] shadow-xl border border-gray-100 py-[8px] overflow-hidden">
                <Link
                  href="/doctor"
                  className="block px-[16px] py-[10px] text-[14px] text-[#1376F8] hover:bg-[#E6F6FE] transition-colors font-medium"
                  onClick={() => setServicesOpen(false)}
                >
                  Doctor
                </Link>
                <Link
                  href="/patient"
                  className="block px-[16px] py-[10px] text-[14px] text-[#EC942C] hover:bg-[#E6F6FE] transition-colors font-medium"
                  onClick={() => setServicesOpen(false)}
                >
                  Patient
                </Link>
                <Link
                  href="/coordinator"
                  className="block px-[16px] py-[10px] text-[14px] text-[#34C759] hover:bg-[#E6F6FE] transition-colors font-medium"
                  onClick={() => setServicesOpen(false)}
                >
                  Coordinator
                </Link>
              </div>
            )}
          </div>

          <Link 
            href="/about" 
            className={`text-[16px] transition-colors ${
              isActive('about') 
                ? 'font-semibold text-[#011632]' 
                : 'text-[#3C4959] hover:text-[#1376F8]'
            }`}
          >
            About
          </Link>

          <Link 
            href="/contact" 
            className={`text-[16px] transition-colors ${
              isActive('contact') 
                ? 'font-semibold text-[#011632]' 
                : 'text-[#3C4959] hover:text-[#1376F8]'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Right-side Button - Based on variant */}
        {variant === 'public' ? (
          <Link 
            href="/contact" 
            className="px-[28px] py-[12px] bg-[#1376F8] text-white text-[16px] font-medium rounded-[8px] hover:bg-[#0d5bc7] transition-colors shadow-md"
          >
            Contact Us
          </Link>
        ) : (
          <Link 
            href="/register" 
            className="px-[28px] py-[12px] bg-[#1376F8] text-white text-[16px] font-medium rounded-[8px] hover:bg-[#0d5bc7] transition-colors shadow-md"
          >
            Sign up
          </Link>
        )}
      </div>
    </nav>
  );
}

export default AlphaCareHeader;
