'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HistoryPage() {
  const pathname = usePathname();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    setWorkouts(savedWorkouts);
  }, []);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/workouts', label: 'Workouts' },
    { href: '/progress', label: 'Progress' },
    { href: '/exercises', label: 'Exercises' },
  ];

  const filteredWorkouts = filter === 'all' 
    ? workouts 
    : workouts.filter(w => w.type === filter);

  const workoutTypes = [
    { value: 'all', label: 'All Workouts', emoji: '📊' },
    { value: 'strength', label: 'Strength', emoji: '💪' },
    { value: 'cardio', label: 'Cardio', emoji: '🏃' },
    { value: 'yoga', label: 'Yoga', emoji: '🧘' },
    { value: 'sports', label: 'Sports', emoji: '⚽' },
  ];

  const deleteWorkout = (id: number) => {
    const updated = workouts.filter(w => w.id !== id);
    setWorkouts(updated);
    localStorage.setItem('workouts', JSON.stringify(updated));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-900">FitTrack</h1>
            <nav className="flex gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`pb-1 transition-colors ${
                      isActive
                        ? 'text-primary-600 font-medium border-b-2 border-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout History</h1>
            <p className="text-gray-600">
              {filteredWorkouts.length} {filteredWorkouts.length === 1 ? 'workout' : 'workouts'} logged
            </p>
          </div>
          <Link
            href="/add-workout"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            + New Workout
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {workoutTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilter(type.value)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                filter === type.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300'
              }`}
            >
              {type.emoji} {type.label}
            </button>
          ))}
        </div>

        {/* Workouts List */}
        {filteredWorkouts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🏋️‍♀️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No workouts yet</h3>
            <p className="text-gray-600 mb-6">Start logging your workouts to see them here</p>
            <Link
              href="/add-workout"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Log Your First Workout
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-primary-300 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{workout.name}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {workout.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {formatDate(workout.date)}
                    </p>

                    <div className="flex flex-wrap gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⏱️</span>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="font-semibold text-gray-900">{workout.duration} min</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🔥</span>
                        <div>
                          <p className="text-xs text-gray-500">Calories</p>
                          <p className="font-semibold text-gray-900">{workout.calories} cal</p>
                        </div>
                      </div>
                      {workout.exercises && workout.exercises.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💪</span>
                          <div>
                            <p className="text-xs text-gray-500">Exercises</p>
                            <p className="font-semibold text-gray-900">{workout.exercises.length}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {workout.exercises && workout.exercises.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Exercises:</p>
                        <div className="flex flex-wrap gap-2">
                          {workout.exercises.map((ex: any, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                            >
                              {ex.name} {ex.sets && `• ${ex.sets}×${ex.reps}`}
                              {ex.weight && ` @ ${ex.weight}kg`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {workout.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Notes:</span> {workout.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this workout?')) {
                        deleteWorkout(workout.id);
                      }
                    }}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete workout"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}