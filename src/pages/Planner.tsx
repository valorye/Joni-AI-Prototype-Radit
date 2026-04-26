import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Dumbbell, 
  ChevronRight, 
  Sparkles, 
  Loader2,
  CheckCircle2,
  Clock,
  Layout,
  Play,
  HelpCircle,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { UserProfile } from '../App';
import { Logo } from '../components/Logo';
import { geminiService, WeeklyPlan, WorkoutDay } from '../services/geminiService';

export function Planner({ user }: { user: UserProfile }) {
  const [plans, setPlans] = useState<WeeklyPlan[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WeeklyPlan | null>(null);
  const [activeDay, setActiveDay] = useState<WorkoutDay | null>(null);

  const generatePlan = async () => {
    setIsGenerating(true);
    try {
      const plan = await geminiService.generateWorkoutPlan(user);
      setPlans(prev => [plan, ...prev]);
      setSelectedPlan(plan);
      setShowGenerator(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (activeDay) {
    return (
      <div className="p-6 space-y-6 max-w-md mx-auto h-full overflow-y-auto pb-32">
        <button onClick={() => setActiveDay(null)} className="text-slate-500 flex items-center gap-2 text-sm font-medium">
          <ChevronRight className="rotate-180" size={16} /> Back to Week
        </button>
        
        <header className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="bg-blue-500 p-2 rounded-xl">
              <Dumbbell className="text-white" size={24} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{activeDay.dayName} • {selectedPlan?.splitType}</span>
              <h1 className="text-2xl font-bold">{activeDay.workoutTitle}</h1>
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center justify-between">
            Exercises
            <span className="text-xs text-slate-500 font-normal">{activeDay.exercises?.length || 0} total</span>
          </h2>
          
          <div className="space-y-3">
            {activeDay.exercises?.map((ex, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-4 relative group">
                <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{ex.name}</p>
                    <div className="relative group/tooltip">
                      <button className="bg-slate-800 p-1.5 rounded-full text-slate-500 hover:text-blue-400 transition-colors">
                        <HelpCircle size={14} />
                      </button>
                      <div className="absolute bottom-full right-0 mb-2 w-48 bg-blue-600 text-white text-[10px] p-2 rounded-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl font-medium leading-relaxed">
                        Joni AI recommends this for peak {ex.targetMuscle} activation based on your {user.experienceLevel} level and '{user.fitnessGoal}' goal.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">{ex.sets} sets x {ex.reps}</span>
                    <span>Rest: {ex.rest}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold ">{ex.targetMuscle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!activeDay.isRestDay && (
          <button className="w-full bg-blue-500 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl">
             <Play fill="white" size={20} /> Start Workout
          </button>
        )}
      </div>
    );
  }

  if (selectedPlan) {
    return (
      <div className="p-6 space-y-6 max-w-md mx-auto h-full overflow-y-auto pb-32">
        <button onClick={() => setSelectedPlan(null)} className="text-slate-500 flex items-center gap-2 text-sm font-medium">
          <ChevronRight className="rotate-180" size={16} /> All Plans
        </button>

        <header className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600/10 p-2 rounded-xl">
               <Calendar className="text-blue-400" size={20} />
             </div>
             <h1 className="text-2xl font-bold">{selectedPlan.name}</h1>
          </div>
          <p className="text-slate-400 text-sm">{selectedPlan.description}</p>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-2xl inline-block">
             <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Split: {selectedPlan.splitType}</p>
          </div>
        </header>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Weekly Schedule</h2>
          <div className="space-y-3">
            {selectedPlan.days.map((day, i) => (
              <button 
                key={i}
                onClick={() => !day.isRestDay && setActiveDay(day)}
                className={`w-full text-left p-5 rounded-3xl border transition-all flex items-center justify-between ${
                  day.isRestDay 
                    ? 'bg-slate-950 border-slate-900 opacity-60 cursor-default' 
                    : 'bg-slate-900 border-slate-800 hover:border-blue-500'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${day.isRestDay ? 'bg-slate-800 text-slate-600' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'}`}>
                    {day.dayName.substring(0, 3)}
                  </div>
                  <div>
                    <p className={`font-bold ${day.isRestDay ? 'text-slate-500' : 'text-white'}`}>{day.dayName}</p>
                    <p className="text-xs text-slate-400">{day.isRestDay ? 'Rest & Recovery' : day.workoutTitle}</p>
                  </div>
                </div>
                {!day.isRestDay && <ChevronRight size={18} className="text-slate-700" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-md mx-auto">
      <header className="flex justify-between items-center mt-4">
        <Logo showText={true} />
        <button 
          onClick={() => setShowGenerator(true)}
          className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/20"
        >
          <Plus size={24} />
        </button>
      </header>

      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center">
            <Layout size={48} className="text-slate-800" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold italic font-serif">No routines yet</h3>
            <p className="text-slate-500 text-sm max-w-[200px]">Let Joni generate your first science-based {user.preferredSplit} split.</p>
          </div>
          <button 
            onClick={() => setShowGenerator(true)}
            className="bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
          >
            Create Routine <Plus size={18} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((p, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedPlan(p)}
              className="w-full bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center justify-between group hover:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-slate-800 p-3 rounded-2xl group-hover:bg-blue-500 transition-colors">
                  <Dumbbell size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.splitType} • {p.days.filter(d => !d.isRestDay).length} workouts</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-700" />
            </button>
          ))}
        </div>
      )}

      {/* Generator Modal */}
      <AnimatePresence>
        {showGenerator && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-[32px] p-8 space-y-6 shadow-2xl"
            >
              <div className="space-y-2 text-center">
                 <div className="bg-blue-500 w-16 h-16 rounded-3xl mx-auto flex items-center justify-center mb-4">
                  <Sparkles size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Generate New Plan?</h2>
                <p className="text-slate-400 text-sm">Joni will create an optimized {user.preferredSplit} split for {user.workoutFrequency} days/week.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  <span>Science-based sets & reps</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  <span>Weekly periodicity focus</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  <span>Rest optimization focus</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="w-full bg-blue-500 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> Generate Plan</>}
                </button>
                <button 
                  onClick={() => setShowGenerator(false)}
                  className="w-full bg-slate-800 text-slate-300 p-4 rounded-2xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
