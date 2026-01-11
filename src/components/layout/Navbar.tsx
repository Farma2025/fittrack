'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-4">
            {/* FitTrack Logo - Links to Landing Page */}
            <Link 
              href="/" 
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
            >
              FitTrack
            </Link>

            {/* Navigation Links */}
            <nav className="flex space-x-6 ml-8">
              <Link 
                href="/dashboard" 
                className={`${
                  isActive('/dashboard')
                    ? 'text-blue-600 font-medium border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                } pb-1 transition-colors`}
              >
                Dashboard
              </Link>
              <Link 
                href="/workouts" 
                className={`${
                  isActive('/workouts')
                    ? 'text-blue-600 font-medium border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                } pb-1 transition-colors`}
              >
                Workouts
              </Link>
              <Link 
                href="/progress" 
                className={`${
                  isActive('/progress')
                    ? 'text-blue-600 font-medium border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                } pb-1 transition-colors`}
              >
                Progress
              </Link>
              <Link 
                href="/exercises" 
                className={`${
                  isActive('/exercises')
                    ? 'text-blue-600 font-medium border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                } pb-1 transition-colors`}
              >
                Exercises
              </Link>
            </nav>
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notifications Button */}
            <button className="p-2 hover:bg-gray-100 rounded-full relative transition">
              <Bell className="w-5 h-5 text-gray-600" />
              {/* Notification Badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
            </button>

            {/* Profile Avatar */}
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium cursor-pointer hover:bg-blue-700 transition">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


