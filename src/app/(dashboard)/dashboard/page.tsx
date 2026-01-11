'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Dumbbell,
  Calendar,
  TrendingUp,
  Clock,
  Plus,
  ChevronRight,
  Flame,
  Trophy,
  Activity,
  Home,
  User,
  LogOut,
  Menu,
  X,
  Target,
  Settings,
  UserCircle,
} from 'lucide-react';

// Types
interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color: 'orange' | 'red' | 'purple' | 'green';
  progress?: number;
}

interface Workout {
  name: string;
  date: string;
  time: string;
  duration: string;
  volume: string;
  exercises: string[];
}

interface ProgressDataPoint {
  day: string;
  value: number;
}

interface Achievement {
  icon: string;
  title: string;
  description: string;
}

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  href: string;
}

// Components
const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  const colorClasses = {
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', progress: 'bg-orange-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600', progress: 'bg-red-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', progress: 'bg-purple-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', progress: 'bg-green-600' },
  };

  const colors = colorClasses[stat.color];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center ${colors.text}`}>
          {stat.icon}
        </div>
      </div>

      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{stat.label}</p>
      <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>

      {stat.progress !== undefined ? (
        <div className="space-y-2">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className={`${colors.progress} h-2 rounded-full transition-all duration-500`} style={{ width: `${stat.progress}%` }} />
          </div>
          <p className={`text-sm ${colors.text} font-medium`}>{stat.subtext}</p>
        </div>
      ) : (
        <p className={`text-sm ${colors.text} font-medium`}>{stat.subtext}</p>
      )}
    </div>
  );
};

const WorkoutCard: React.FC<{ workout: Workout }> = ({ workout }) => (
  <div className="border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
          {workout.name}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {workout.date} • {workout.time}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
    </div>

    <div className="flex flex-wrap gap-2 mb-3">
      {workout.exercises.map((exercise, i) => (
        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
          {exercise}
        </span>
      ))}
    </div>

    <div className="flex items-center gap-6 text-sm text-gray-600">
      <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        {workout.duration}
      </span>
      <span className="flex items-center gap-1">
        <Dumbbell className="w-4 h-4" />
        {workout.volume} total
      </span>
    </div>
  </div>
);

const ProgressChart: React.FC<{ data: ProgressDataPoint[] }> = ({ data }) => {
  const maxProgress = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end justify-between h-48 gap-2">
      {data.map((point, index) => (
        <div key={index} className="flex-1 flex flex-col items-center group">
          <div className="w-full flex items-end justify-center mb-2" style={{ height: '140px' }}>
            <div
              className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-xl transition-all duration-500 hover:from-blue-600 hover:to-blue-700 cursor-pointer relative"
              style={{ height: `${(point.value / maxProgress) * 100}%` }}
              title={`${point.value} workouts`}
            >
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {point.value}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-600 font-medium">{point.day}</span>
        </div>
      ))}
    </div>
  );
};

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
    <div className="text-3xl mb-2">{achievement.icon}</div>
    <h4 className="font-bold mb-1">{achievement.title}</h4>
    <p className="text-sm text-blue-100">{achievement.description}</p>
  </div>
);

const QuickActionButton: React.FC<{ action: QuickAction }> = ({ action }) => (
  <Link href={action.href} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group w-full">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {action.icon}
      </div>
      <span className="font-medium text-gray-900">{action.label}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
  </Link>
);

export default function DashboardPage() {
  const pathname = usePathname();
  const [timeRange, setTimeRange] = useState<'7' | '30'>('7');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = '';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
    window.location.href = '/';
  };

  const handleProfile = () => {
    console.log('Going to profile...');
    setProfileDropdownOpen(false);
    // Add navigation: router.push('/profile')
  };

  const handleSettings = () => {
    console.log('Going to settings...');
    setProfileDropdownOpen(false);
    // Add navigation: router.push('/settings')
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const stats: Stat[] = [
    { icon: <Dumbbell className="w-8 h-8" />, label: 'TOTAL WORKOUTS', value: '156', subtext: '+12 this month', color: 'orange' },
    { icon: <Flame className="w-8 h-8" />, label: 'ACTIVE STREAK', value: '12 days', subtext: 'Personal best: 18', color: 'red' },
    { icon: <Target className="w-8 h-8" />, label: 'WEEKLY GOAL', value: '4/5', subtext: '80% complete', progress: 80, color: 'purple' },
    { icon: <TrendingUp className="w-8 h-8" />, label: 'TOTAL VOLUME', value: '1,247 kg', subtext: '+8.5% vs last week', color: 'green' },
  ];

  const recentWorkouts: Workout[] = [
    { name: 'Chest & Triceps', date: 'Today', time: '9:30 AM', duration: '45 min', volume: '2,400 kg', exercises: ['Bench Press', 'Incline Dumbbell Press', 'Cable Flyes'] },
    { name: 'Legs', date: 'Yesterday', time: '6:00 PM', duration: '52 min', volume: '3,200 kg', exercises: ['Squats', 'Leg Press', 'Leg Curls'] },
    { name: 'Back & Biceps', date: 'Jan 8', time: '7:15 AM', duration: '38 min', volume: '2,850 kg', exercises: ['Deadlifts', 'Bent-Over Rows', 'Pull-ups'] },
  ];

  const progressData: ProgressDataPoint[] = [
    { day: 'Mon', value: 1 },
    { day: 'Tue', value: 1.8 },
    { day: 'Wed', value: 1.2 },
    { day: 'Thu', value: 2 },
    { day: 'Fri', value: 1.5 },
    { day: 'Sat', value: 2.1 },
    { day: 'Sun', value: 1.3 },
  ];

  const quickActions: QuickAction[] = [
    { label: 'Start Workout', icon: <Dumbbell className="w-5 h-5" />, href: '/add-workout' },
    { label: 'View Progress', icon: <Trophy className="w-5 h-5" />, href: '/progress' },
    { label: 'Browse Exercises', icon: <Activity className="w-5 h-5" />, href: '/exercises' },
  ];

  const achievements: Achievement[] = [
    { icon: '🔥', title: '12 Day Streak', description: 'Keep it going!' },
    { icon: '💪', title: '50 Workouts', description: 'Milestone reached' },
    { icon: '🏆', title: 'PR This Week', description: '3 new records' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Dumbbell className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">FitTrack</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/dashboard' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>

              <Link
                href="/add-workout"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/add-workout' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                Workout
              </Link>

              <Link
                href="/progress"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/progress' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Progress
              </Link>

              <Link
                href="/exercises"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === '/exercises' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Activity className="w-4 h-4" />
                Exercises
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {/* Profile Dropdown - Desktop */}
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{userName}</span>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
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

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-2">
                {[
                  { href: '/dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
                  { href: '/add-workout', label: 'Workout', icon: <Dumbbell className="w-4 h-4" /> },
                  { href: '/progress', label: 'Progress', icon: <TrendingUp className="w-4 h-4" /> },
                  { href: '/exercises', label: 'Exercises', icon: <Activity className="w-4 h-4" /> },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-2 text-left w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {getGreeting()}, {userName} 👋
            </h1>
            <p className="text-gray-600 flex items-center gap-2">{currentDate} • Keep pushing forward! 💪</p>
          </div>

          <Link
            href="/add-workout"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold shadow-sm whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            New Workout
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                <Link href="/workouts" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentWorkouts.length > 0 ? (
                  recentWorkouts.map((workout, index) => <WorkoutCard key={index} workout={workout} />)
                ) : (
                  <div className="text-center py-12">
                    <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No workouts yet</p>
                    <p className="text-gray-400 text-sm">Start your first workout to see it here</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Recent Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <AchievementCard key={index} achievement={achievement} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Progress</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as '7' | '30')}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                </select>
              </div>

              <ProgressChart data={progressData} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <QuickActionButton key={index} action={action} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}