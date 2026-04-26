import { motion } from 'motion/react';
import { 
  Trophy, 
  ChevronLeft, 
  Lock, 
  CheckCircle2, 
  Star,
  Award,
  Zap,
  Dumbbell,
  Target
} from 'lucide-react';
import { UserProfile } from '../App';

export function Achievements({ user, onBack }: { user: UserProfile, onBack: () => void }) {
  const categories = [
    { name: 'Strength', icon: <Dumbbell size={16} /> },
    { name: 'Endurance', icon: <Zap size={16} /> },
    { name: 'Consistency', icon: <Target size={16} /> }
  ];

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto">
      <header className="flex items-center justify-between mt-4">
        <button onClick={onBack} className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold font-serif italic">Achievements</h1>
        <div className="w-10 h-10 bg-yellow-500/10 flex items-center justify-center rounded-2xl">
          <Trophy className="text-yellow-500" size={20} />
        </div>
      </header>

      {/* Summary Card */}
      <section className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 text-center space-y-4">
        <div className="relative mx-auto w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 44} strokeDashoffset={2 * Math.PI * 44 * (1 - 0.45)} className="text-yellow-500" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Star className="text-yellow-500" size={32} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Expert Level 4</h2>
          <p className="text-slate-500 text-sm">45% to next milestone</p>
        </div>
      </section>

      {/* Categories */}
      <div className="flex gap-3">
        {categories.map(c => (
          <button key={c.name} className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* Achievement List */}
      <section className="space-y-4 pb-10">
        {user.achievements.map((ach, i) => (
          <div 
            key={ach.id} 
            className={`p-5 rounded-3xl border flex items-center gap-4 transition-all ${
              ach.unlocked 
                ? 'bg-slate-900 border-slate-800 shadow-xl' 
                : 'bg-slate-950 border-slate-900 opacity-60'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative ${
              ach.unlocked ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-900 text-slate-600'
            }`}>
              {ach.icon === 'Trophy' && <Trophy size={24} />}
              {ach.icon === 'Dumbbell' && <Dumbbell size={24} />}
              {ach.icon === 'Zap' && <Zap size={24} />}
              
              {!ach.unlocked && <Lock size={12} className="absolute -top-1 -right-1 text-slate-500" />}
              {ach.unlocked && <CheckCircle2 size={16} className="absolute -bottom-1 -right-1 text-emerald-500 bg-slate-950 rounded-full" />}
            </div>
            
            <div className="flex-1 pr-2">
              <h3 className="font-bold text-[15px] tracking-tight">{ach.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">{ach.description}</p>
            </div>

            {ach.unlocked && ach.date && (
               <div className="text-right">
                  <span className="text-[9px] font-mono text-slate-600 uppercase whitespace-nowrap">{ach.date}</span>
               </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
