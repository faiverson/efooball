import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ user, children }) {
  return (
    <>
      <div className="relative flex flex-col items-top min-h-screen">
        <header className="flex justify-center pt-4 pb-2 md:pt-8 md:pb-4">
          <ApplicationLogo />
          <div className="fixed top-0 right-0 px-6 py-4  sm:block">
            {!!user
              ? <Link href={route('dashboard')} className="text-sm text-main-violet underline">Dashboard</Link>
              :
              <>
                <Link href={route('login')} className="text-sm text-main-yellow dark:text-alternative-yellow underline">Log in</Link>
                <Link href={route('register')} className="ml-4 text-main-yellow dark:text-alternative-yellow underline">Register</Link>
              </>
            }
          </div>
        </header>
        <div className="container md:mx-auto flex gap-8 md:flex-column">
          <Link href={route('home')} className="text-main-violet dark:text-alternative-violet">Home</Link>
          <Link href={route('team-stats')} className="text-main-violet dark:text-alternative-violet">Team Stats</Link>
          <Link href={route('team-versus')} className="text-main-violet dark:text-alternative-violet">Team Versus</Link>
          <Link href={route('players-stats')} className="text-main-violet dark:text-alternative-violet">Player Stats</Link>
          <Link href={route('players-versus')} className="text-main-violet dark:text-alternative-violet">Player Versus</Link>
          <Link href={route('random-teams')} className="text-main-violet dark:text-alternative-violet">Random</Link>
          <Link href={route('libertadores')} className="text-main-violet dark:text-alternative-violet">Libertadores</Link>
          <Link href={route('sudamericana')} className="text-main-violet dark:text-alternative-violet">Sudamericana</Link>
        </div>
        <div className="container md:mx-auto flex md:flex-row mt-8">
          {children}
        </div>
      </div>
    </>
  );
}
