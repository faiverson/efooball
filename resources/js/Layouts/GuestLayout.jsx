import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ user, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', route: 'home' },
    { name: 'Team Stats', route: 'team-stats' },
    { name: 'Team Versus', route: 'team-versus' },
    { name: 'Player Stats', route: 'players-stats' },
    { name: 'Player Versus', route: 'players-versus' },
    { name: 'Random', route: 'random-teams' },
    { name: 'Libertadores', route: 'libertadores' },
    { name: 'Sudamericana', route: 'sudamericana' },
    { name: 'Torneo Individual', route: 'torneo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-neutral-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <ApplicationLogo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.route}
                  href={route(link.route)}
                  className={`relative group px-3 py-2 transition-all duration-200 whitespace-nowrap
                    ${route().current(link.route)
                      ? 'text-primary-600 font-bold'
                      : 'text-neutral-600 hover:text-primary-600'}`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {route().current(link.route) ? (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></span>
                  ) : (
                    <>
                      <span className="absolute inset-0 bg-primary-50/50 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </>
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Links */}
            <div className="flex items-center space-x-2">
              {user ? (
                <Link
                  href={route('dashboard')}
                  className={`relative group px-4 py-2 transition-all duration-200 whitespace-nowrap
                    ${route().current('dashboard')
                      ? 'text-primary-600 font-bold'
                      : 'text-primary-600 hover:text-primary-700'}`}
                >
                  <span className="relative z-10">Dashboard</span>
                  {route().current('dashboard') ? (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></span>
                  ) : (
                    <>
                      <span className="absolute inset-0 bg-primary-50/50 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </>
                  )}
                </Link>
              ) : null}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-neutral-600 hover:text-primary-600 p-2 rounded-lg hover:bg-neutral-100 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-neutral-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.route}
                  href={route(link.route)}
                  className={`relative group block px-4 py-3 transition-all duration-200 whitespace-nowrap
                    ${route().current(link.route)
                      ? 'text-primary-600 font-bold'
                      : 'text-neutral-600 hover:text-primary-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{link.name}</span>
                  {route().current(link.route) ? (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></span>
                  ) : (
                    <>
                      <span className="absolute inset-0 bg-primary-50/50 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm mt-auto border-t border-neutral-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-neutral-600">
            © {new Date().getFullYear()} - Martes de PES loco! - All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
