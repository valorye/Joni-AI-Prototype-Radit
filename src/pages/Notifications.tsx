import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  MessageCircle, 
  Settings, 
  Bell, 
  Users, 
  Trophy, 
  Info,
  Clock
} from 'lucide-react';
import { UserProfile } from '../App';

export function Notifications({ user, onBack }: { user: UserProfile, onBack: () => void }) {
  return (
    <div className="p-6 space-y-8 max-w-md mx-auto">
      <header className="flex items-center justify-between mt-4">
        <button onClick={onBack} className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold font-serif italic">Messages</h1>
        <button className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl">
          <Settings size={20} className="text-slate-400" />
        </button>
      </header>

      {/* Categories */}
      <div className="flex gap-4 border-b border-white/5 pb-2">
        <button className="text-blue-400 font-bold text-xs uppercase tracking-widest border-b-2 border-blue-400 pb-2">All</button>
        <button className="text-slate-500 font-bold text-xs uppercase tracking-widest pb-2">Social</button>
        <button className="text-slate-500 font-bold text-xs uppercase tracking-widest pb-2">System</button>
      </div>

      {/* Notifications List */}
      <section className="space-y-4">
        {user.notifications.length === 0 ? (
          <div className="py-20 text-center space-y-4">
             <div className="bg-slate-900 w-20 h-20 rounded-full mx-auto flex items-center justify-center text-slate-800">
               <Bell size={32} />
             </div>
             <p className="text-slate-500 text-sm font-medium">All caught up!</p>
          </div>
        ) : (
          user.notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-5 rounded-3xl border flex gap-4 items-start transition-all ${
                notif.read ? 'bg-slate-950 border-slate-900' : 'bg-slate-900 border-slate-800 shadow-xl border-l-4 border-l-blue-500'
              }`}
            >
              <div className={`p-3 rounded-2xl ${
                notif.type === 'system' ? 'bg-blue-500/10 text-blue-400' : 
                notif.type === 'social' ? 'bg-emerald-500/10 text-emerald-400' : 
                'bg-yellow-500/10 text-yellow-400'
              }`}>
                {notif.type === 'system' && <Info size={20} />}
                {notif.type === 'social' && <Users size={20} />}
                {notif.type === 'achievement' && <Trophy size={20} />}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm tracking-tight">{notif.title}</h3>
                  <div className="flex items-center gap-1 text-[9px] text-slate-600 font-mono uppercase">
                    <Clock size={10} />
                    Just now
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{notif.message}</p>
              </div>
            </div>
          ))
        )}

        {/* Mock Direct Messages */}
        <div className="pt-4 space-y-4">
           <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-2">Recent Chats</h2>
           <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden">
             <div className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors cursor-pointer border-b border-slate-800/50">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">M</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-bold text-sm">Marcus Miller</p>
                    <span className="text-[9px] text-slate-600 font-mono">10:42 AM</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">Yo! You crushed that deadlift set today 💪</p>
                </div>
             </div>
             <div className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">A</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-bold text-sm">Alex Rivera</p>
                    <span className="text-[9px] text-slate-600 font-mono">Yesterday</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">Are we training legs at 6pm?</p>
                </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
