import React from 'react';

/**
 * Public pages layout - Clean wrapper without old design components
 * Individual pages (home, contact, about) have their own Navigation and Footer
 * matching the new AlphaCare Figma design
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <main className="relative">
        {children}
      </main>
    </div>
  );
}
