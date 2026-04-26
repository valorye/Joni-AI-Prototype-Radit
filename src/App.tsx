/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Dumbbell, 
  MessageSquare, 
  User, 
  Plus, 
  ChevronRight,
  Flame,
  Clock,
  Footprints,
  Sparkles,
  Users,
  Bell
} from 'lucide-react';

import { Logo } from './components/Logo';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Onboarding } from './pages/Onboarding';
import { Planner } from './pages/Planner';
import { Coach } from './pages/Coach';
import { Profile } from './pages/Profile';
import { Social } from './pages/Social';
import { Achievements } from './pages/Achievements';
import { Notifications } from './pages/Notifications';

export type View = 'dashboard' | 'planner' | 'coach' | 'profile' | 'social' | 'achievements' | 'notifications' | 'onboarding';

export interface WorkoutSession {
  id: string;
  date: string;
  duration: number;
  type: string;
  intensity: 'low' | 'medium' | 'high';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'system' | 'social' | 'achievement';
  read: boolean;
  timestamp: string;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  fitnessGoal: string;
  experienceLevel: string;
  height: number;
  weight: number;
  availableEquipment: string[];
  workoutFrequency: number;
  preferredSplit: string;
  metrics: {
    calories: number;
    caloriesTarget: number;
    activeMinutes: number;
    activeMinutesTarget: number;
    steps: number;
    stepsTarget: number;
    streak: number;
  };
  history: WorkoutSession[];
  achievements: Achievement[];
  notifications: AppNotification[];
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('onboarding');
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load user from local storage or wait for auth
  useEffect(() => {
    const savedUser = localStorage.getItem('joni_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('joni_user', JSON.stringify(profile));
    setCurrentView('dashboard');
  };

  const renderView = () => {
    if (currentView === 'onboarding') return <Onboarding onComplete={handleOnboardingComplete} />;
    
    switch (currentView) {
      case 'dashboard': return <Dashboard user={user!} onViewChange={setCurrentView} />;
      case 'planner': return <Planner user={user!} />;
      case 'coach': return <Coach user={user!} />;
      case 'profile': return <Profile user={user!} />;
      case 'social': return <Social user={user!} />;
      case 'achievements': return <Achievements user={user!} onBack={() => setCurrentView('dashboard')} />;
      case 'notifications': return <Notifications user={user!} onBack={() => setCurrentView('dashboard')} />;
      default: return <Dashboard user={user!} onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <main className="flex-1 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentView !== 'onboarding' && !['achievements', 'notifications'].includes(currentView) && (
        <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 px-6 py-4 rounded-t-3xl z-50">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <NavIcon 
              active={currentView === 'dashboard'} 
              onClick={() => setCurrentView('dashboard')} 
              icon={<Home size={22} />} 
              label="Home" 
            />
            <NavIcon 
              active={currentView === 'planner'} 
              onClick={() => setCurrentView('planner')} 
              icon={<Dumbbell size={22} />} 
              label="Plans" 
            />
            <NavIcon 
              active={currentView === 'social'} 
              onClick={() => setCurrentView('social')} 
              icon={<Users size={22} />} 
              label="Social" 
            />
            <NavIcon 
              active={currentView === 'coach'} 
              onClick={() => setCurrentView('coach')} 
              icon={<Sparkles size={22} />} 
              label="Coach" 
            />
            <NavIcon 
              active={currentView === 'profile'} 
              onClick={() => setCurrentView('profile')} 
              icon={<User size={22} />} 
              label="Profile" 
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavIcon({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  const actualIcon = label === 'Social' ? <Users size={22} /> : icon;

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
    >
      <div className={`p-2 rounded-xl transition-all ${active ? 'bg-blue-400/20' : 'bg-transparent'}`}>
        {label === 'Home' && active ? (
          <Logo size={22} />
        ) : actualIcon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
    </button>
  );
}
