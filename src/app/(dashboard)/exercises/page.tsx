'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, Filter, Dumbbell, Plus, ChevronRight, X, ArrowLeft,
  Home, TrendingUp, Activity, User, LogOut, Menu as MenuIcon, History
} from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  instructions: string[];
  image?: string;
}

export default function ExercisesPage() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const userName = "";

  // Sample exercise data with image placeholders
  const exercises: Exercise[] = [
    {
      id: 1,
      name: 'Bench Press',
      category: 'Chest',
      muscleGroup: 'Pectorals',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      description: 'A compound upper body exercise that primarily targets the chest muscles.',
      instructions: [
        'Lie flat on a bench with your feet firmly on the ground',
        'Grip the barbell slightly wider than shoulder-width',
        'Lower the bar to your mid-chest in a controlled manner',
        'Press the bar back up to the starting position',
        'Keep your shoulder blades retracted throughout the movement'
      ],
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Squat',
      category: 'Legs',
      muscleGroup: 'Quadriceps',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      description: 'The king of leg exercises, targeting quads, glutes, and hamstrings.',
      instructions: [
        'Position the barbell on your upper back',
        'Stand with feet shoulder-width apart',
        'Lower your body by bending your knees and hips',
        'Descend until thighs are parallel to the ground',
        'Drive through your heels to return to standing'
      ],
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Deadlift',
      category: 'Back',
      muscleGroup: 'Lower Back',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      description: 'A fundamental compound movement that works the entire posterior chain.',
      instructions: [
        'Stand with feet hip-width apart, bar over mid-foot',
        'Grip the bar just outside your legs',
        'Keep your back straight and chest up',
        'Drive through your heels to lift the bar',
        'Stand up fully, then lower the bar with control'
      ],
      image: 'https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Overhead Press',
      category: 'Shoulders',
      muscleGroup: 'Deltoids',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      description: 'A fundamental shoulder exercise for building strength and size.',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Hold the bar at shoulder level',
        'Press the bar overhead until arms are fully extended',
        'Lower the bar back to shoulder level with control',
        'Keep your core tight throughout the movement'
      ],
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Pull-ups',
      category: 'Back',
      muscleGroup: 'Lats',
      equipment: 'Pull-up Bar',
      difficulty: 'Intermediate',
      description: 'A bodyweight exercise that builds back width and arm strength.',
      instructions: [
        'Hang from a pull-up bar with an overhand grip',
        'Pull your body up until your chin is over the bar',
        'Lower yourself back down with control',
        'Keep your core engaged throughout',
        'Avoid swinging or using momentum'
      ],
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Dumbbell Curl',
      category: 'Arms',
      muscleGroup: 'Biceps',
      equipment: 'Dumbbells',
      difficulty: 'Beginner',
      description: 'An isolation exercise targeting the biceps.',
      instructions: [
        'Stand with a dumbbell in each hand',
        'Keep your elbows close to your torso',
        'Curl the weights up while contracting your biceps',
        'Lower the weights back down with control',
        'Avoid swinging or using momentum'
      ],
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Leg Press',
      category: 'Legs',
      muscleGroup: 'Quadriceps',
      equipment: 'Machine',
      difficulty: 'Beginner',
      description: 'A machine-based exercise for building leg strength safely.',
      instructions: [
        'Sit in the leg press machine with back against the pad',
        'Place feet shoulder-width apart on the platform',
        'Lower the weight by bending your knees',
        'Press through your heels to return to start',
        'Keep your back flat against the pad'
      ],
      image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Lat Pulldown',
      category: 'Back',
      muscleGroup: 'Lats',
      equipment: 'Cable Machine',
      difficulty: 'Beginner',
      description: 'A great alternative to pull-ups for building back width.',
      instructions: [
        'Sit at the lat pulldown machine',
        'Grip the bar wider than shoulder-width',
        'Pull the bar down to your upper chest',
        'Squeeze your shoulder blades together',
        'Return to the starting position with control'
      ],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      name: 'Romanian Deadlift',
      category: 'Legs',
      muscleGroup: 'Hamstrings',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      description: 'An excellent exercise for targeting the hamstrings and glutes.',
      instructions: [
        'Hold a barbell with an overhand grip',
        'Stand with feet hip-width apart',
        'Hinge at the hips, lowering the bar down your legs',
        'Keep a slight bend in your knees',
        'Return to standing by squeezing your glutes'
      ],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      name: 'Tricep Dips',
      category: 'Arms',
      muscleGroup: 'Triceps',
      equipment: 'Parallel Bars',
      difficulty: 'Intermediate',
      description: 'A bodyweight exercise for building tricep strength and size.',
      instructions: [
        'Grip parallel bars and lift yourself up',
        'Lower your body by bending your elbows',
        'Descend until your upper arms are parallel to the ground',
        'Push back up to the starting position',
        'Keep your core engaged and avoid swinging'
      ],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
  ];

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Dumbbell className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">FitTrack</span>
            </Link>

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

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">{userName}</span>
              </div>
              <Link href="/" className="hidden md:flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </Link>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>

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
                <Link href="/progress" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  <TrendingUp className="w-4 h-4" />Progress
                </Link>
                <Link href="/exercises" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                  <Activity className="w-4 h-4" />Exercises
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Exercise Library</h1>
          <p className="text-gray-600 text-lg">Browse and learn proper form for all exercises</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-2.5 border rounded-lg flex items-center space-x-2 justify-center md:justify-start transition ${
                showFilters ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredExercises.length}</span> of <span className="font-semibold text-gray-900">{exercises.length}</span> exercises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div 
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {exercise.image ? (
                  <img 
                    src={exercise.image} 
                    alt={exercise.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                    <Dumbbell className="w-16 h-16 text-blue-600" />
                  </div>
                )}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">{exercise.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-semibold mr-2 w-24">Category:</span>
                    <span className="text-gray-900">{exercise.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-semibold mr-2 w-24">Muscle:</span>
                    <span className="text-gray-900">{exercise.muscleGroup}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-semibold mr-2 w-24">Equipment:</span>
                    <span className="text-gray-900">{exercise.equipment}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{exercise.description}</p>

                <button className="w-full py-2.5 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold flex items-center justify-center gap-2 transition border border-transparent hover:border-blue-200">
                  View Details
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Dumbbell className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No exercises found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative h-64 bg-gray-200 overflow-hidden">
              {selectedExercise.image ? (
                <img 
                  src={selectedExercise.image} 
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                  <Dumbbell className="w-24 h-24 text-blue-600" />
                </div>
              )}
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 p-2.5 bg-white hover:bg-gray-100 rounded-full shadow-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedExercise.name}</h2>
                  <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${getDifficultyColor(selectedExercise.difficulty)}`}>
                    {selectedExercise.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Category</p>
                      <p className="font-semibold text-gray-900">{selectedExercise.category}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Muscle Group</p>
                      <p className="font-semibold text-gray-900">{selectedExercise.muscleGroup}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 col-span-2">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Equipment</p>
                      <p className="font-semibold text-gray-900">{selectedExercise.equipment}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedExercise.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">How to Perform</h3>
                  <ol className="space-y-3">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 leading-relaxed pt-0.5">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Link
                    href="/add-workout"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-semibold shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                    Add to Workout
                  </Link>
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}