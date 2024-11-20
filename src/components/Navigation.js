// Navigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, BarChart3 } from 'lucide-react';

function Navigation() {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  ];

  return (
    <nav className="w-64 bg-primary-background border-r border-gray-800 p-6">
      <div className="space-y-6">
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
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-secondary text-primary-background'
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
