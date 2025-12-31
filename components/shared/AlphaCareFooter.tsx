import React from 'react';
import Link from 'next/link';

/**
 * AlphaCareFooter - Shared footer for public pages
 * Dark blue design with 4-column layout
 */

export interface AlphaCareFooterProps {
  /** Show social media icons */
  showSocialIcons?: boolean;
}

export function AlphaCareFooter({ showSocialIcons = false }: AlphaCareFooterProps) {
  return (
    <footer className="bg-[#011632] text-white pt-[60px] pb-[40px]">
      <div className="max-w-[1200px] mx-auto px-[40px]">
        <div className="grid grid-cols-4 gap-[60px] mb-[40px]">
          {/* Left Column - Description & Social */}
          <div className="col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-[8px] mb-[16px]">
              <div className="w-[32px] h-[32px] rounded-lg bg-gradient-to-br from-[#1376F8] to-[#25B4F8] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <span className="text-[20px] font-bold">
                <span className="text-white">Alpha</span>
                <span className="text-[#25B4F8]">Care</span>
              </span>
            </div>
            
            <p className="text-[14px] text-white/70 leading-[1.7] mb-[24px]">
              Comprehensive healthcare management platform for doctors, patients, and coordinators.
            </p>

            {/* Social Icons - Only show if prop is true */}
            {showSocialIcons && (
              <div className="flex items-center gap-[12px]">
                {/* Facebook */}
                <a href="#" className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* Twitter */}
                <a href="#" className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            )}
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

        {/* Copyright Bar */}
        <div className="border-t border-white/20 pt-[24px] text-center">
          <p className="text-[14px] text-white/50">
            © {new Date().getFullYear()} Alpha Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default AlphaCareFooter;
