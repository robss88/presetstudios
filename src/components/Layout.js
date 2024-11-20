// Layout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { Menu, X } from 'lucide-react';

function Layout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-primary-background">
      <Header onMenuClick={() => setIsMobileNavOpen(!isMobileNavOpen)} />
      <div className="flex flex-1 relative">
        {/* Mobile Navigation Overlay */}
        <div 
          className={`
            fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200
            ${isMobileNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsMobileNavOpen(false)}
        />
        
        {/* Responsive Navigation */}
        <div
          className={`
            fixed lg:static inset-y-0 left-0 w-64 bg-primary-background z-50
            transform lg:transform-none transition-transform duration-200
            ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <Navigation onItemClick={() => setIsMobileNavOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full">
          <div className="bg-gradient-to-r from-[rgba(253,144,0,1)] to-[rgba(254,227,130,1)] p-[1px] rounded-xl">
            <div className="bg-secondary-background rounded-xl p-4 md:p-6 h-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;