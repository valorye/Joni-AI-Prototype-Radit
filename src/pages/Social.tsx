import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Plus, 
  TrendingUp, 
  Award, 
  ChevronRight,
  Flame,
  Dumbbell
} from 'lucide-react';
import { UserProfile } from '../App';

export function Social({ user }: { user: UserProfile }) {
  const friends = [
    { name: 'Andi Raditya Adhipratama', weight: 88, height: 182, strength: 1450, level: 'Elite', streak: 45, avatar: 'A' },
    { name: 'Johnson Zhang', weight: 75, height: 175, strength: 920, level: 'Advanced', streak: 12, avatar: 'J' },
    { name: 'Marcus Miller', weight: 95, height: 192, strength: 1120, level: 'Advanced', streak: 26, avatar: 'M' }
  ];

  const rankings = [...friends, { name: user.displayName, weight: user.weight, height: user.height, strength: 650, level: user.experienceLevel, streak: user.metrics.streak, avatar: user.displayName[0] }]
    .sort((a, b) => b.strength - a.strength);

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto">
      <header className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-slate-500 text-sm">Compare and compete</p>
        </div>
        <button className="bg-blue-600 p-3 rounded-2xl">
          <Plus size={24} />
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <div className="flex items-center gap-2 text-blue-400">
            <TrendingUp size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Global Rank</span>
          </div>
          <p className="text-2xl font-bold font-serif italic">#1,240</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Award size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Power Score</span>
          </div>
          <p className="text-2xl font-bold font-serif italic">650</p>
        </div>
      </div>

      {/* Friends List */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold">Training Partners</h2>
          <button className="text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
            <Search size={14} /> Find
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {friends.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-14 h-14 bg-slate-800 border-2 border-slate-700 rounded-2xl flex items-center justify-center text-xl font-bold relative">
                {f.avatar}
                <div className="absolute -bottom-1 -right-1 bg-orange-500 w-5 h-5 rounded-lg flex items-center justify-center border-2 border-slate-950">
                  <Flame size={10} className="text-white" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 text-center">{f.name.split(' ')[0]}</span>
            </div>
          ))}
          <button className="flex flex-col items-center gap-2 min-w-[70px]">
            <div className="w-14 h-14 bg-slate-900 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-slate-600">
              <Plus size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-500">Invite</span>
          </button>
        </div>
      </section>

      {/* Rankings */}
      <section className="space-y-4 pb-10">
        <h2 className="text-xl font-bold">Strength Ranking</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden">
          {rankings.map((r, i) => (
            <div 
              key={i} 
              className={`p-5 flex items-center justify-between transition-colors ${
                r.name === user.displayName ? 'bg-blue-600/10' : ''
              } ${i !== rankings.length - 1 ? 'border-b border-slate-800/50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-lg font-serif italic font-bold w-6 ${
                  i === 0 ? 'text-yellow-500' : 
                  i === 1 ? 'text-slate-400' : 
                  i === 2 ? 'text-orange-500' : 'text-slate-600'
                }`}>
                  #{i + 1}
                </span>
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-bold">
                  {r.avatar}
                </div>
                <div>
                  <p className={`font-bold text-sm tracking-tight ${r.name === user.displayName ? 'text-blue-400' : ''}`}>
                    {r.name} {r.name === user.displayName && '(You)'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {r.strength} Power • {r.weight}kg / {r.height}cm
                  </p>
                </div>
              </div>
              {i === 0 && <Award size={20} className="text-yellow-500" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
