// Header.js
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

function Header() {
  return (
    <header className="bg-primary-background border-b border-gray-800 sticky top-0 z-50">
      <div className="h-16 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-text-primary">Preset Studios</h1>
        <div className="flex items-center gap-6">
          {/* Regular icon buttons */}
          <button className="p-2 hover:bg-secondary-background rounded-full transition-colors">
            <Bell size={20} className="text-text-secondary hover:text-text-primary transition-colors" />
          </button>
          <button className="p-2 hover:bg-secondary-background rounded-full transition-colors">
            <Settings size={20} className="text-text-secondary hover:text-text-primary transition-colors" />
          </button>
          {/* Gradient CTA button */}
          <button className="relative group">
            <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[rgba(253,144,0,1)] to-[rgba(254,227,130,1)] group-hover:opacity-100 opacity-75 transition-opacity" />
            <div className="relative flex items-center gap-2 px-4 py-2 bg-primary-background rounded-full">
              <User size={20} className="text-text-primary" />
              <span className="text-sm font-medium text-text-primary">Profile</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;