import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  ChevronRight, 
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  Award
} from 'lucide-react';
import { UserProfile } from '../App';

export function Profile({ user }: { user: UserProfile }) {
  const sections = [
    {
      title: 'Preferences',
      items: [
        { label: 'Notifications', icon: <Bell size={18} />, color: 'bg-blue-500/10 text-blue-500' },
        { label: 'Equipment', icon: <Settings size={18} />, color: 'bg-emerald-500/10 text-emerald-500' },
        { label: 'Units (kg/cm)', icon: <User size={18} />, color: 'bg-orange-500/10 text-orange-500' },
      ]
    },
    {
      title: 'Security',
      items: [
        { label: 'Privacy Policy', icon: <Shield size={18} />, color: 'bg-purple-500/10 text-purple-500' },
        { label: 'Data Sharing', icon: <Shield size={18} />, color: 'bg-slate-500/10 text-slate-500' },
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: <HelpCircle size={18} />, color: 'bg-yellow-500/10 text-yellow-500' },
        { label: 'Submit Feedback', icon: <HelpCircle size={18} />, color: 'bg-blue-500/10 text-blue-500' },
      ]
    }
  ];

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto">
      {/* Header */}
      <header className="flex flex-col items-center py-6 space-y-4">
        <div className="relative">
          <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center text-4xl font-bold shadow-2xl shadow-blue-600/30">
            {user.displayName[0]}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
            <Award className="text-yellow-500" size={20} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          <p className="text-slate-500 text-sm font-medium tracking-wide">LEVEL: {user.experienceLevel.toUpperCase()}</p>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl text-center space-y-1">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Goal</p>
          <p className="font-bold text-blue-400 capitalize">{user.fitnessGoal}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl text-center space-y-1">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Streak</p>
          <p className="font-bold text-orange-500">{user.metrics.streak} Days</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-8">
        {sections.map(section => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] px-2">{section.title}</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden">
              {section.items.map((item, idx) => (
                <button 
                  key={item.label}
                  className={`w-full flex items-center justify-between p-4 px-5 hover:bg-slate-800/50 transition-colors ${
                    idx !== section.items.length - 1 ? 'border-b border-slate-800/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`${item.color} p-2 rounded-xl`}>
                      {item.icon}
                    </div>
                    <span className="font-semibold text-slate-200">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-700" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sign Out */}
      <button 
        onClick={() => { localStorage.removeItem('joni_user'); window.location.reload(); }}
        className="w-full flex items-center justify-center gap-3 p-5 bg-red-500/10 text-red-500 rounded-3xl font-bold border border-red-500/20 hover:bg-red-500/20 transition-all"
      >
        <LogOut size={20} /> Sign Out
      </button>

      <div className="py-10 text-center space-y-1">
        <p className="text-[10px] text-slate-600 font-bold tracking-[0.3em] uppercase">Joni AI v1.0.0</p>
        <p className="text-[8px] text-slate-700">Built for champions • 2026</p>
      </div>
    </div>
  );
}
