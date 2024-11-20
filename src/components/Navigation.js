// Navigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, BarChart3, X } from 'lucide-react';

function Navigation({ onItemClick }) {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  ];

  return (
    <nav className="h-full w-64 bg-primary-background border-r border-gray-800 p-4 md:p-6">
      {/* Close button for mobile */}
      <button
        onClick={onItemClick}
        className="p-2 hover:bg-secondary-background rounded-lg lg:hidden absolute right-4 top-4"
      >
        <X size={24} className="text-text-primary" />
      </button>

      <div className="space-y-6 mt-12 lg:mt-0">
        <div className="px-3">
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Main Menu
          </h2>
        </div>
        <ul className="space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <Link
                  to={path}
                  onClick={onItemClick}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-[rgba(253,144,0,1)] to-[rgba(254,227,130,1)] text-primary-background'
                      : 'text-text-primary hover:bg-secondary-background'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;