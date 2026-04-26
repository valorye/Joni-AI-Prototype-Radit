import { motion } from 'motion/react';
import { 
  Flame, 
  Clock, 
  Footprints, 
  ChevronRight, 
  Trophy,
  Play,
  Sparkles,
  MessageCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { UserProfile, View } from '../App';

export function Dashboard({ user, onViewChange }: { user: UserProfile, onViewChange: (view: View) => void }) {
  const metrics = [
    { 
      label: 'Calories', 
      value: user.metrics.calories, 
      target: user.metrics.caloriesTarget, 
      unit: 'kcal', 
      icon: <Flame className="text-orange-500" />,
      color: 'bg-orange-500/10'
    },
    { 
      label: 'Active', 
      value: user.metrics.activeMinutes, 
      target: user.metrics.activeMinutesTarget, 
      unit: 'min', 
      icon: <Clock className="text-blue-500" />,
      color: 'bg-blue-500/10'
    },
  ];

  const unreadNotifications = user.notifications?.filter(n => !n.read).length || 0;

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mt-4">
        <Logo showText={true} />
        <div className="flex gap-2">
          <button 
            onClick={() => onViewChange('notifications')}
            className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl relative"
          >
            <MessageCircle size={20} className="text-slate-400" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 w-3 h-3 rounded-full border-2 border-slate-950" />
            )}
          </button>
          <button 
            onClick={() => onViewChange('achievements')}
            className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl"
          >
            <Trophy size={20} className="text-yellow-500" />
          </button>
        </div>
      </header>

      {/* Progress Insight Summary */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-6 shadow-xl shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp size={120} />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">Weekly Progress</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white tracking-tight">Strength +12%</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              In the past few weeks, you have increased your overall strength by <span className="text-white font-bold">12%</span>! Your consistency is paying off.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className={`${m.color} p-2 rounded-xl`}>
                {m.icon}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {Math.round((m.value / m.target) * 100)}%
              </span>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{m.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight">{m.value}</span>
                <span className="text-slate-500 text-[10px]">{m.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workout History */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold">Workout History</h2>
          <button className="text-blue-400 text-xs font-bold uppercase tracking-widest">History</button>
        </div>
        
        <div className="space-y-3">
          {user.history?.slice(0, 3).map((session, i) => (
            <div key={session.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between group hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  session.intensity === 'high' ? 'bg-red-500/10 text-red-500' : 
                  session.intensity === 'medium' ? 'bg-orange-500/10 text-orange-500' : 
                  'bg-emerald-500/10 text-emerald-500'
                }`}>
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">{session.type}</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{session.date} • {session.duration} min</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                   session.intensity === 'high' ? 'bg-red-500/20 text-red-400' : 
                   session.intensity === 'medium' ? 'bg-orange-500/20 text-orange-400' : 
                   'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {session.intensity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Workout Preview */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold">Today's Workout</h2>
          <button className="text-blue-400 text-xs font-semibold uppercase tracking-widest">See all</button>
        </div>
        
        <div className="relative group overflow-hidden rounded-3xl aspect-[16/9] border border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=80" 
            alt="Workout background"
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">UP NEXT</span>
              <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">45 min • {user.experienceLevel}</span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold tracking-tight">Full Body HIIT</h3>
              <button className="bg-white text-slate-950 p-3 rounded-2xl hover:scale-110 transition-transform shadow-xl">
                <Play fill="currentColor" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
