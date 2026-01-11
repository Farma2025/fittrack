'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dumbbell,
  TrendingUp,
  Target,
  BarChart3,
  Calendar,
  Award,
  Check,
  ArrowRight,
  Menu,
  X,
  Star,
  ChevronDown,
  Globe,
} from 'lucide-react';

type Lang = 'en' | 'ar' | 'fr';

export default function LandingPage() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const langs = { en: 'English', ar: 'العربية', fr: 'Français' };

  const t = {
    en: {
      nav: { features: 'Features', reviews: 'Reviews', faq: 'FAQ', login: 'Login', start: 'Get Started Free' },
      hero: {
        badge: '💪 Transform Your Fitness Journey',
        title: 'Track. Progress. Achieve.',
        subtitle: 'Your personal fitness companion. Log workouts, monitor progress, and crush your goals.',
        start: 'Start Free Today',
        learn: 'Learn More',
        footer: 'No credit card • Free forever • Join 50,000+ users',
      },
      stats: { users: 'Active Users', workouts: 'Workouts', exercises: 'Exercises', rating: 'Rating' },
    },
    fr: {
      nav: { features: 'Fonctionnalités', reviews: 'Avis', faq: 'FAQ', login: 'Connexion', start: 'Commencer' },
      hero: {
        badge: '💪 Transformez Votre Fitness',
        title: 'Suivez. Progressez. Réussissez.',
        subtitle: 'Votre compagnon fitness personnel.',
        start: 'Commencer',
        learn: 'En Savoir Plus',
        footer: 'Gratuit pour toujours',
      },
      stats: { users: 'Utilisateurs', workouts: 'Entraînements', exercises: 'Exercices', rating: 'Note' },
    },
    ar: {
      nav: { features: 'الميزات', reviews: 'التقييمات', faq: 'الأسئلة', login: 'تسجيل الدخول', start: 'ابدأ مجاناً' },
      hero: {
        badge: '💪 حوّل رحلتك',
        title: 'تتبع. تقدم. حقق.',
        subtitle: 'رفيقك الشخصي للياقة.',
        start: 'ابدأ',
        learn: 'اعرف المزيد',
        footer: 'مجاني للأبد',
      },
      stats: { users: 'مستخدم', workouts: 'تمرين', exercises: 'تمرين', rating: 'تقييم' },
    },
  }[lang];

  const features = ['Track Every Rep', 'Visualize Progress', 'Set Smart Goals', 'Advanced Analytics', 'Complete History', 'Track PRs'];
  const icons = [Dumbbell, TrendingUp, Target, BarChart3, Calendar, Award];
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      text: 'FitTrack transformed my training. Gained 15 pounds on my bench!',
    },
    {
      name: 'Mike Chen',
      role: 'Personal Trainer',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      text: 'I recommend FitTrack to all my clients. Great progress tracking!',
    },
    {
      name: 'Emma Rodriguez',
      role: 'CrossFit Athlete',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      text: 'Best fitness app. Clean interface and powerful features!',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLogin(false);
    router.push('/dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignup(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Login Modal */}
      {showLogin && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Sign in to continue to FitTrack</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSignup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-600 mb-6">Start your fitness journey today</p>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <label className="flex items-start text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="text-gray-700">
                  I agree to the{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </button>
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <button
                onClick={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur border-b z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold">FitTrack</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">
                {t.nav.features}
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">
                {t.nav.reviews}
              </a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">
                {t.nav.faq}
              </a>

              <button onClick={() => setShowLogin(true)} className="text-gray-600 hover:text-gray-900 transition">
                {t.nav.login}
              </button>

              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                >
                  <Globe className="w-5 h-5" />
                  {langs[lang]}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2">
                    {(Object.entries(langs) as [Lang, string][]).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLang(code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                          lang === code ? 'bg-blue-50 text-blue-600 font-semibold' : ''
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowSignup(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition shadow-sm"
              >
                {t.nav.start}
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 transition">
                  {t.nav.features}
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-blue-600 transition"
                >
                  {t.nav.reviews}
                </a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 transition">
                  {t.nav.faq}
                </a>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left hover:text-blue-600 transition"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => {
                    setShowSignup(true);
                    setMobileMenuOpen(false);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {t.nav.start}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-500/30 rounded-full text-sm mb-6 backdrop-blur">
                {t.hero.badge}
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">{t.hero.title}</h1>
              <p className="text-2xl text-blue-100 mb-8">{t.hero.subtitle}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 flex items-center justify-center gap-2 text-lg shadow-lg transition"
                >
                  {t.hero.start}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#features"
                  className="px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 text-lg border-2 border-blue-500 text-center transition"
                >
                  {t.hero.learn}
                </a>
              </div>

              <p className="text-blue-200 text-sm">{t.hero.footer}</p>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop"
                alt="Workout"
                className="rounded-3xl w-full h-80 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-8 left-6 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Workout Complete!</p>
                  <p className="text-xs text-gray-600">2,400 kg total volume</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: '50K+', l: t.stats.users },
              { v: '2M+', l: t.stats.workouts },
              { v: '5M+', l: t.stats.exercises },
              { v: '4.9★', l: t.stats.rating },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-5xl font-bold text-blue-600 mb-2">{s.v}</p>
                <p className="text-gray-600 font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600">Powerful features designed to help you reach your fitness goals faster</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = icons[i];
              return (
                <div key={i} className="group p-8 bg-white border rounded-2xl hover:shadow-xl hover:border-blue-300 transition-all">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{f}</h3>
                  <p className="text-gray-600">Track your progress and achieve your goals with ease.</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Loved by Fitness Enthusiasts</h2>
            <p className="text-xl text-gray-600">Join thousands who are crushing their goals with FitTrack</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((tm, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{tm.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <img src={tm.img} alt={tm.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold">{tm.name}</p>
                    <p className="text-sm text-gray-600">{tm.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about FitTrack</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Is FitTrack really free?', a: 'Yes! FitTrack is completely free with no hidden costs.' },
              { q: 'Do I need equipment?', a: 'No! FitTrack works for gym workouts and bodyweight exercises.' },
              { q: 'Can I track multiple workouts?', a: 'Absolutely! FitTrack supports all types of exercises.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white border rounded-xl overflow-hidden hover:border-blue-300 transition">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-left">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Fitness?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 50,000+ users crushing their goals. Start tracking today—it&apos;s free!
          </p>
          <button
            onClick={() => setShowSignup(true)}
            className="px-10 py-5 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 text-lg shadow-2xl transition"
          >
            Get Started Free →
          </button>
          <p className="text-blue-200 text-sm mt-6">No credit card required • Takes 30 seconds</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">FitTrack</span>
              </div>
              <p className="text-sm">Your personal fitness companion.</p>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'FAQ'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
            ].map((col, i) => (
              <div key={i}>
                <h3 className="text-white font-semibold mb-4">{col.title}</h3>
                <ul className="space-y-2 text-sm">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="hover:text-white transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 FitTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}