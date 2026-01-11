'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  Dumbbell,
  Calendar,
  Award,
  Target,
  BarChart3,
  Clock,
  Home,
  Activity,
  User,
  LogOut,
  Menu,
  X,
  History,
  Settings,
} from 'lucide-react';

export default function ProgressPage() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [timeRange, setTimeRange] = useState('30');

  const userName = "";

  // Generate mock data based on time range
  const data = useMemo(() => {
    const days = parseInt(timeRange);
    
    // Adjust stats based on time range
    const baseMultiplier = days / 30;
    
    return {
      stats: {
        totalWeight: { 
          value: Math.round(1247 * baseMultiplier), 
          unit: 'kg', 
          change: 12, 
          trending: 'up' as const 
        },
        workouts: { 
          value: Math.round(18 * baseMultiplier), 
          change: 8, 
          trending: 'up' as const 
        },
        streak: { 
          value: Math.min(12, days), 
          unit: 'days', 
          change: 0, 
          trending: 'neutral' as const 
        },
        avgRating: { 
          value: 4.5, 
          max: 5, 
          change: 5, 
          trending: 'up' as const 
        },
      },
      
      volumeData: days <= 7 
        ? [
            { week: 'Mon', volume: 450 },
            { week: 'Tue', volume: 520 },
            { week: 'Wed', volume: 0 },
            { week: 'Thu', volume: 580 },
            { week: 'Fri', volume: 490 },
            { week: 'Sat', volume: 630 },
            { week: 'Sun', volume: 0 },
          ]
        : days <= 30
        ? [
            { week: 'Week 1', volume: 2100 },
            { week: 'Week 2', volume: 2350 },
            { week: 'Week 3', volume: 2580 },
            { week: 'Week 4', volume: 2450 },
          ]
        : days <= 90
        ? [
            { week: 'Month 1', volume: 9480 },
            { week: 'Month 2', volume: 10200 },
            { week: 'Month 3', volume: 11150 },
          ]
        : [
            { week: 'Q1', volume: 28500 },
            { week: 'Q2', volume: 31200 },
            { week: 'Q3', volume: 33800 },
            { week: 'Q4', volume: 35100 },
          ],
      
      frequencyData: days <= 7
        ? [
            { day: 'Mon', workouts: 1 },
            { day: 'Tue', workouts: 1 },
            { day: 'Wed', workouts: 0 },
            { day: 'Thu', workouts: 1 },
            { day: 'Fri', workouts: 1 },
            { day: 'Sat', workouts: 1 },
            { day: 'Sun', workouts: 0 },
          ]
        : [
            { day: 'Mon', workouts: Math.round(baseMultiplier * 4) },
            { day: 'Tue', workouts: Math.round(baseMultiplier * 3) },
            { day: 'Wed', workouts: Math.round(baseMultiplier * 4) },
            { day: 'Thu', workouts: Math.round(baseMultiplier * 2) },
            { day: 'Fri', workouts: Math.round(baseMultiplier * 5) },
            { day: 'Sat', workouts: Math.round(baseMultiplier * 4) },
            { day: 'Sun', workouts: Math.round(baseMultiplier * 2) },
          ],
      
      exerciseProgress: [
        { name: 'Bench Press', weight: 70, date: 'Oct 14, 2024', change: 5 },
        { name: 'Squat', weight: 85.5, date: 'Oct 12, 2024', change: 2.5 },
        { name: 'Deadlift', weight: 110, date: 'Oct 10, 2024', change: 5 },
        { name: 'Overhead Press', weight: 45, date: 'Oct 8, 2024', change: 2.5 },
      ],
      
      personalRecords: [
        { exercise: 'Bench Press', weight: 70, date: 'Oct 14, 2024' },
        { exercise: 'Squat', weight: 85.5, date: 'Oct 12, 2024' },
        { exercise: 'Deadlift', weight: 110, date: 'Oct 10, 2024' },
        { exercise: 'Overhead Press', weight: 45, date: 'Oct 8, 2024' },
      ],
      
      monthlySummary: {
        workouts: Math.round(156 * baseMultiplier),
        hours: Math.round(42 * baseMultiplier),
        volume: Math.round(2450 * baseMultiplier),
        avgPerWeek: 5.2,
      },
    };
  }, [timeRange]);

  const maxVolume = Math.max(...data.volumeData.map((d) => d.volume));
  const maxFrequency = Math.max(...data.frequencyData.map((d) => d.workouts));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2">
              <Dumbbell className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">FitTrack</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/dashboard'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/add-workout"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/add-workout'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                Workout
              </Link>
              <Link
                href="/workouts"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/workouts'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <History className="w-4 h-4" />
                History
              </Link>
              <Link
                href="/progress"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/progress'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Progress
              </Link>
              <Link
                href="/exercises"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/exercises'
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Activity className="w-4 h-4" />
                Exercises
              </Link>
            </nav>

            {/* User Section */}
            <div className="flex items-center gap-4">
              {/* Desktop Profile Dropdown */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{userName}</span>
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowProfileDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-2">
                <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  <Home className="w-4 h-4" />Dashboard
                </Link>
                <Link href="/add-workout" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  <Dumbbell className="w-4 h-4" />Workout
                </Link>
                <Link href="/workouts" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  <History className="w-4 h-4" />History
                </Link>
                <Link href="/progress" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                  <TrendingUp className="w-4 h-4" />Progress
                </Link>
                <Link href="/exercises" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  <Activity className="w-4 h-4" />Exercises
                </Link>
                <hr className="my-2 border-gray-200" />
                <Link href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />Profile
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  <Settings className="w-4 h-4" />Settings
                </Link>
                <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-2" onClick={() => setMobileMenuOpen(false)}>
                  <LogOut className="w-4 h-4" />Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress</h1>
            <p className="text-gray-600">Track your fitness journey and achievements</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Weight */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-orange-600" />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{data.stats.totalWeight.change}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Volume</p>
            <p className="text-3xl font-bold text-gray-900">
              {data.stats.totalWeight.value.toLocaleString()} {data.stats.totalWeight.unit}
            </p>
            <p className="text-xs text-gray-500 mt-2">Total weight lifted</p>
          </div>

          {/* Workouts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{data.stats.workouts.change}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Workouts</p>
            <p className="text-3xl font-bold text-gray-900">{data.stats.workouts.value}</p>
            <p className="text-xs text-gray-500 mt-2">Completed sessions</p>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Active</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-gray-900">
              {data.stats.streak.value} {data.stats.streak.unit}
            </p>
            <p className="text-xs text-gray-500 mt-2">Keep it going!</p>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{data.stats.avgRating.change}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Avg. Rating</p>
            <p className="text-3xl font-bold text-gray-900">
              {data.stats.avgRating.value}/{data.stats.avgRating.max}
            </p>
            <p className="text-xs text-gray-500 mt-2">Workout satisfaction</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Volume Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Total Volume Trend</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-4">
              {data.volumeData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{item.week}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.volume.toLocaleString()} kg
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(item.volume / maxVolume) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Workout Frequency</h3>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-end justify-between h-48 gap-2">
              {data.frequencyData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end justify-center mb-2" style={{ height: '160px' }}>
                    {item.workouts > 0 ? (
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all duration-500 flex items-end justify-center pb-2"
                        style={{ height: `${(item.workouts / maxFrequency) * 100}%` }}
                      >
                        <span className="text-xs font-semibold text-white">{item.workouts}</span>
                      </div>
                    ) : (
                      <div className="w-full bg-gray-100 rounded-lg" style={{ height: '20px' }} />
                    )}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress and Records Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Exercise Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Exercise Progress (Max Weight)</h3>
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div className="space-y-4">
              {data.exerciseProgress.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{exercise.name}</p>
                    <p className="text-xs text-gray-500">{exercise.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{exercise.weight} kg</p>
                    <p className="text-xs text-green-600 flex items-center justify-end">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{exercise.change} kg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Records */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Records</h3>
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="space-y-4">
              {data.personalRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{record.exercise}</p>
                    <p className="text-xs text-gray-500">{record.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">{record.weight} kg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-6">
            {timeRange === '7' ? 'Weekly' : timeRange === '30' ? 'Monthly' : timeRange === '90' ? 'Quarterly' : 'Yearly'} Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <BarChart3 className="w-5 h-5 mr-2 opacity-80" />
                <p className="text-sm opacity-90">Total Workouts</p>
              </div>
              <p className="text-4xl font-bold">{data.monthlySummary.workouts}</p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 mr-2 opacity-80" />
                <p className="text-sm opacity-90">Total Hours</p>
              </div>
              <p className="text-4xl font-bold">{data.monthlySummary.hours} hrs</p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Dumbbell className="w-5 h-5 mr-2 opacity-80" />
                <p className="text-sm opacity-90">Total Volume</p>
              </div>
              <p className="text-4xl font-bold">{data.monthlySummary.volume.toLocaleString()} kg</p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 mr-2 opacity-80" />
                <p className="text-sm opacity-90">Avg Workouts/Week</p>
              </div>
              <p className="text-4xl font-bold">{data.monthlySummary.avgPerWeek}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}