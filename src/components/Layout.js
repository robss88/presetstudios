// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-background">
      <Header />
      <div className="flex flex-1">
        <Navigation />
        <main className="flex-1 p-8">
          <div className="bg-gradient-to-r from-[rgba(253,144,0,1)] to-[rgba(254,227,130,1)] p-[1px] rounded-xl">
            <div className="bg-secondary-background rounded-xl p-6 h-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;