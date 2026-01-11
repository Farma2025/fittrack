'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Calendar,
  Clock,
  Dumbbell,
  Filter,
  History,
  Home,
  LayoutGrid,
  List,
  LogOut,
  Menu,
  Plus,
  Search,
  TrendingUp,
  User,
  X,
} from 'lucide-react';

type ViewMode = 'grid' | 'list';

type WorkoutItem = {
  id: number;
  name: string;
  date: string;
  duration: number;
  exercises: number;
  totalVolume: number;
  calories: number;
  exercises_list: string[];
};

export default function WorkoutsPage() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample workout data - replace with real data later
  const workouts: WorkoutItem[] = [
    {
      id: 1,
      name: 'Chest & Triceps',
      date: 'Today • 9:30 AM',
      duration: 45,
      exercises: 5,
      totalVolume: 2450,
      calories: 320,
      exercises_list: ['Bench Press', 'Incline Dumbbell Press', 'Cable Flyes', 'Tricep Dips', 'Tricep Pushdowns'],
    },
    {
      id: 2,
      name: 'Legs',
      date: 'Yesterday • 6:00 PM',
      duration: 52,
      exercises: 4,
      totalVolume: 3200,
      calories: 380,
      exercises_list: ['Squats', 'Leg Press', 'Leg Curls', 'Leg Extensions'],
    },
    {
      id: 3,
      name: 'Back & Biceps',
      date: 'Jan 8 • 7:15 AM',
      duration: 38,
      exercises: 6,
      totalVolume: 2850,
      calories: 295,
      exercises_list: ['Bent-Over Rows', 'Deadlifts', 'Pull-ups', 'Barbell Curls', 'Hammer Curls', 'Cable Rows'],
    },
  ];

  const filteredWorkouts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return workouts;

    return workouts.filter((w) => {
      const inName = w.name.toLowerCase().includes(q);
      const inExercises = w.exercises_list.some((ex) => ex.toLowerCase().includes(q));
      return inName || inExercises;
    });
  }, [searchTerm, workouts]);

  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);

  const stats = [
    { label: 'Total Workouts', value: workouts.length, color: 'blue' as const },
    { label: 'This Week', value: 2, color: 'blue' as const },
    { label: 'Total Calories', value: totalCalories.toString(), color: 'orange' as const },
    { label: 'Total Minutes', value: totalMinutes, color: 'green' as const },
  ];

  const navLinkClass = (href: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      pathname === href ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
    }`;

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
              <Link href="/dashboard" className={navLinkClass('/dashboard')}>
                <Home className="w-4 h-4" />
                Dashboard
              </Link>

              <Link href="/add-workout" className={navLinkClass('/add-workout')}>
                <Dumbbell className="w-4 h-4" />
                Workout
              </Link>

              <Link href="/workouts" className={navLinkClass('/workouts')}>
                <History className="w-4 h-4" />
                History
              </Link>

              <Link href="/progress" className={navLinkClass('/progress')}>
                <TrendingUp className="w-4 h-4" />
                Progress
              </Link>

              <Link href="/exercises" className={navLinkClass('/exercises')}>
                <Activity className="w-4 h-4" />
                Exercises
              </Link>
            </nav>

            {/* User Section */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">Alex</span>
              </div>

              <Link
                href="/"
                className="hidden md:flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Link>

              {/* Mobile menu button */}
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
                <Link href="/dashboard" className={navLinkClass('/dashboard')} onClick={() => setMobileMenuOpen(false)}>
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>

                <Link href="/add-workout" className={navLinkClass('/add-workout')} onClick={() => setMobileMenuOpen(false)}>
                  <Dumbbell className="w-4 h-4" />
                  Workout
                </Link>

                <Link href="/workouts" className={navLinkClass('/workouts')} onClick={() => setMobileMenuOpen(false)}>
                  <History className="w-4 h-4" />
                  History
                </Link>

                <Link href="/progress" className={navLinkClass('/progress')} onClick={() => setMobileMenuOpen(false)}>
                  <TrendingUp className="w-4 h-4" />
                  Progress
                </Link>

                <Link href="/exercises" className={navLinkClass('/exercises')} onClick={() => setMobileMenuOpen(false)}>
                  <Activity className="w-4 h-4" />
                  Exercises
                </Link>

                <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-2" onClick={() => setMobileMenuOpen(false)}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Workout History</h2>
            <p className="text-gray-600 mt-1">View and manage your past training sessions</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 flex items-center gap-2 ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm font-medium">Grid</span>
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 flex items-center gap-2 border-l border-gray-300 ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">List</span>
              </button>
            </div>

            <Link
              href="/add-workout"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">New Workout</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p
                className={`text-3xl font-bold ${
                  stat.color === 'blue'
                    ? 'text-blue-600'
                    : stat.color === 'orange'
                      ? 'text-orange-600'
                      : 'text-green-600'
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <div className="flex-1 min-w-[260px] relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts (name or exercises)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Workouts Grid/List */}
        {filteredWorkouts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No workouts found</h3>
            <p className="text-gray-600 mb-6">Try a different search or log a new workout.</p>
            <Link
              href="/add-workout"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Log New Workout</span>
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{workout.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {workout.date}
                    </p>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded" aria-label="More">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {workout.duration} min
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Exercises</p>
                    <p className="text-sm font-semibold text-gray-900">{workout.exercises}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Volume</p>
                    <p className="text-sm font-semibold text-gray-900">{workout.totalVolume} kg</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 mb-2">Exercises:</p>
                  <div className="flex flex-wrap gap-1">
                    {workout.exercises_list.slice(0, 3).map((ex, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {ex}
                      </span>
                    ))}
                    {workout.exercises_list.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{workout.exercises_list.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workout</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exercises</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Calories</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredWorkouts.map((workout) => (
                  <tr key={workout.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{workout.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workout.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workout.duration} min</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workout.exercises}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workout.totalVolume} kg</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workout.calories} cal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}