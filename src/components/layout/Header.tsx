'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, UserCircle } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
    // Example: router.push('/login') or signOut()
  };

  const handleProfile = () => {
    console.log('Going to profile...');
    setIsOpen(false);
    // Add navigation: router.push('/profile')
  };

  const handleSettings = () => {
    console.log('Going to settings...');
    setIsOpen(false);
    // Add navigation: router.push('/settings')
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - You can add title or logo here */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">Fitness Tracker</h1>
        </div>

        {/* Right side - Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <User className="text-blue-600" size={20} />
            <span className="font-medium text-gray-700">Alex</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={handleProfile}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <UserCircle size={18} />
                <span>Profile</span>
              </button>
              
              <button
                onClick={handleSettings}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>

              <hr className="my-1 border-gray-200" />
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Alternative: Keep the separate Logout button if you prefer */}
        {/* Uncomment this section if you want to keep the original style with separate logout */}
        {/*
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            <span className="font-medium text-gray-700">Alex</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
        */}
      </div>
    </header>
  );
}