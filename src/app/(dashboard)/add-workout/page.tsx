'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Plus, X, Save, Clock, Calendar, Dumbbell, Search, Trash2,
  Home, TrendingUp, Activity, User, LogOut, Menu, Settings
} from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  category: string;
  muscleGroup: string;
}

interface WorkoutSet {
  set: number;
  reps: string;
  weight: string;
}

interface WorkoutExercise extends Exercise {
  tempId: number;
  sets: WorkoutSet[];
}

export default function AddWorkoutPage() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [workoutTime, setWorkoutTime] = useState('');
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const userName = "";

  // Sample exercise library
  const exerciseLibrary: Exercise[] = [
    { id: 1, name: 'Bench Press', category: 'Chest', muscleGroup: 'Chest' },
    { id: 2, name: 'Squat', category: 'Legs', muscleGroup: 'Quadriceps' },
    { id: 3, name: 'Deadlift', category: 'Back', muscleGroup: 'Back' },
    { id: 4, name: 'Overhead Press', category: 'Shoulders', muscleGroup: 'Shoulders' },
    { id: 5, name: 'Barbell Row', category: 'Back', muscleGroup: 'Back' },
    { id: 6, name: 'Incline Dumbbell Press', category: 'Chest', muscleGroup: 'Chest' },
    { id: 7, name: 'Leg Press', category: 'Legs', muscleGroup: 'Quadriceps' },
    { id: 8, name: 'Lat Pulldown', category: 'Back', muscleGroup: 'Lats' },
    { id: 9, name: 'Bicep Curl', category: 'Arms', muscleGroup: 'Biceps' },
    { id: 10, name: 'Tricep Dips', category: 'Arms', muscleGroup: 'Triceps' },
  ];

  const filteredExercises = exerciseLibrary.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addExercise = (exercise: Exercise) => {
    const newExercise: WorkoutExercise = {
      ...exercise,
      tempId: Date.now(),
      sets: [{ set: 1, reps: '', weight: '' }]
    };
    setExercises([...exercises, newExercise]);
    setShowExercisePicker(false);
    setSearchTerm('');
  };

  const removeExercise = (tempId: number) => {
    setExercises(exercises.filter(ex => ex.tempId !== tempId));
  };

  const addSet = (tempId: number) => {
    setExercises(exercises.map(ex => {
      if (ex.tempId === tempId) {
        const newSet: WorkoutSet = { set: ex.sets.length + 1, reps: '', weight: '' };
        return { ...ex, sets: [...ex.sets, newSet] };
      }
      return ex;
    }));
  };

  const updateSet = (tempId: number, setIndex: number, field: 'reps' | 'weight', value: string) => {
    setExercises(exercises.map(ex => {
      if (ex.tempId === tempId) {
        const updatedSets = ex.sets.map((s, idx) => {
          if (idx === setIndex) {
            return { ...s, [field]: value };
          }
          return s;
        });
        return { ...ex, sets: updatedSets };
      }
      return ex;
    }));
  };

  const removeSet = (tempId: number, setIndex: number) => {
    setExercises(exercises.map(ex => {
      if (ex.tempId === tempId) {
        const updatedSets = ex.sets.filter((_, idx) => idx !== setIndex)
          .map((s, idx) => ({ ...s, set: idx + 1 }));
        return { ...ex, sets: updatedSets };
      }
      return ex;
    }));
  };

  const calculateTotals = () => {
    let totalVolume = 0;
    let totalSets = 0;

    exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.reps && set.weight) {
          totalVolume += Number(set.reps) * Number(set.weight);
          totalSets++;
        }
      });
    });

    return { totalVolume, totalSets };
  };

  const handleSave = () => {
    const { totalVolume, totalSets } = calculateTotals();
    const workoutData = {
      name: workoutName || 'Workout',
      date: workoutDate,
      time: workoutTime,
      exercises: exercises,
      totalVolume,
      totalSets,
      exerciseCount: exercises.length
    };
    console.log('Saving workout:', workoutData);
    alert('Workout saved! (Check console for data)');
  };

  const { totalVolume, totalSets } = calculateTotals();

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
                <Link href="/add-workout" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                  <Dumbbell className="w-4 h-4" />Workout
                </Link>
                <Link href="/progress" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Log Workout</h2>
            <p className="text-gray-600 mt-1">Add a new workout to your training log</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </Link>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Workout</span>
            </button>
          </div>
        </div>

        {/* Workout Info Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workout Name
              </label>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="e.g., Chest & Triceps"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date
              </label>
              <input
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Time
              </label>
              <input
                type="time"
                value={workoutTime}
                onChange={(e) => setWorkoutTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Volume</p>
            <p className="text-2xl font-bold text-blue-600">{totalVolume} kg</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Sets</p>
            <p className="text-2xl font-bold text-orange-600">{totalSets}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Exercises</p>
            <p className="text-2xl font-bold text-green-600">{exercises.length}</p>
          </div>
        </div>

        {/* Exercises */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Exercises</h3>
            <button
              onClick={() => setShowExercisePicker(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Exercise</span>
            </button>
          </div>

          {exercises.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No exercises added yet</p>
              <p className="text-sm text-gray-400">Click "Add Exercise" to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {exercises.map((exercise) => (
                <div key={exercise.tempId} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                      <p className="text-sm text-gray-500">{exercise.category}</p>
                    </div>
                    <button
                      onClick={() => removeExercise(exercise.tempId)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sets Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Set</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reps</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight (kg)</th>
                          <th className="px-4 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {exercise.sets.map((set, idx) => (
                          <tr key={idx} className="border-t border-gray-100">
                            <td className="px-4 py-2 text-sm text-gray-600 font-medium">{set.set}</td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                value={set.reps}
                                onChange={(e) => updateSet(exercise.tempId, idx, 'reps', e.target.value)}
                                placeholder="0"
                                className="w-20 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                value={set.weight}
                                onChange={(e) => updateSet(exercise.tempId, idx, 'weight', e.target.value)}
                                placeholder="0"
                                step="0.5"
                                className="w-24 px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <button
                                onClick={() => removeSet(exercise.tempId, idx)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    onClick={() => addSet(exercise.tempId)}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Set</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exercise Picker Modal */}
        {showExercisePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowExercisePicker(false)}>
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Select Exercise</h3>
                <button
                  onClick={() => setShowExercisePicker(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search exercises..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="overflow-y-auto flex-1">
                <div className="space-y-2">
                  {filteredExercises.map((exercise) => (
                    <button
                      key={exercise.id}
                      onClick={() => addExercise(exercise)}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <p className="font-medium text-gray-900">{exercise.name}</p>
                      <p className="text-sm text-gray-500">{exercise.category} • {exercise.muscleGroup}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}