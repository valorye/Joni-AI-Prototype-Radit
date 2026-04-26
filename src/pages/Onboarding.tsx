import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Dumbbell, 
  Heart, 
  Zap, 
  Target, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../App';
import { Logo } from '../components/Logo';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    displayName: '',
    fitnessGoal: '',
    experienceLevel: '',
    height: 175,
    weight: 70,
    availableEquipment: [],
    workoutFrequency: 3,
    preferredSplit: 'PPL',
    metrics: {
      calories: 450,
      caloriesTarget: 2200,
      activeMinutes: 35,
      activeMinutesTarget: 60,
      steps: 8420,
      stepsTarget: 10000,
      streak: 5
    },
    history: [
      { id: '1', date: '2024-04-24', duration: 45, type: 'Upper Body', intensity: 'medium' },
      { id: '2', date: '2024-04-22', duration: 60, type: 'Legs', intensity: 'high' },
      { id: '3', date: '2024-04-20', duration: 30, type: 'Cardio', intensity: 'low' }
    ],
    achievements: [
      { id: '1', title: 'First Workout', description: 'Completed your first routine', icon: 'Trophy', unlocked: true, date: '2024-04-20' },
      { id: '2', title: 'Bench Master', description: 'Benched 100kgs', icon: 'Dumbbell', unlocked: false },
      { id: '3', title: 'Aero King', description: '30 min non-stop cardio', icon: 'Zap', unlocked: true, date: '2024-04-22' }
    ],
    notifications: [
      { id: '1', title: 'Welcome!', message: 'Start your first workout today.', type: 'system', read: false, timestamp: new Date().toISOString() }
    ]
  });

  const goals = [
    { id: 'bodybuilding', label: 'Bodybuilding Aesthetic', description: 'Focus on muscle hypertrophy and definition', icon: <Dumbbell size={24} /> },
    { id: 'health', label: 'To be healthy', description: 'General fitness, longevity, and well-being', icon: <Heart size={24} /> },
    { id: 'endurance', label: 'To have high endurance', description: 'Stamina, cardio performance, and long duration', icon: <Zap size={24} /> },
    { id: 'powerlifting', label: 'Powerlifting', description: 'Focus on maximal strength in squat, bench, deadlift', icon: <Target size={24} /> },
    { id: 'recovery', label: 'Physical Therapy / Recovery', description: 'Tailored routines for rehab and mobility', icon: <Activity size={24} /> },
  ];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleGoalSelect = (goalId: string) => {
    setProfile(p => ({ ...p, fitnessGoal: goalId }));
    nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 pt-10">
            <div className="flex flex-col items-center justify-center space-y-4 mb-4">
              <Logo size={96} showText={true} className="flex-col" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">First, what's your name?</h1>
              <p className="text-slate-400">We'll use this to personalize your coaching.</p>
            </div>
            <input 
              type="text" 
              placeholder="Enter your name"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xl outline-none focus:border-blue-500 transition-colors"
              value={profile.displayName}
              onChange={(e) => setProfile(p => ({ ...p, displayName: e.target.value }))}
            />
            {profile.displayName && (
              <button 
                onClick={nextStep}
                className="w-full bg-blue-500 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                Continue <ChevronRight size={20} />
              </button>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 pt-10 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Your Body Metrics</h1>
              <p className="text-slate-400">Essential for tailoring your intensity.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2 text-left">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Height (cm)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center font-bold text-2xl outline-none focus:border-blue-500"
                  value={profile.height}
                  onChange={(e) => setProfile(p => ({ ...p, height: parseInt(e.target.value) }))}
                />
              </div>
              <div className="flex-1 space-y-2 text-left">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Weight (kg)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center font-bold text-2xl outline-none focus:border-blue-500"
                  value={profile.weight}
                  onChange={(e) => setProfile(p => ({ ...p, weight: parseInt(e.target.value) }))}
                />
              </div>
            </div>
            <button 
              onClick={nextStep}
              className="w-full bg-blue-500 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 mt-4"
            >
              Continue <ChevronRight size={20} />
            </button>
            <button onClick={prevStep} className="text-slate-500 font-medium">Back</button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 pt-10">
            <div className="space-y-2">
              <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Step 1 of 5</span>
              <h1 className="text-3xl font-bold leading-tight">What is your primary fitness goal?</h1>
              <p className="text-slate-400">Select the path that best describes your objective.</p>
            </div>
            <div className="space-y-3">
              {goals.map((g) => (
                <button 
                  key={g.id}
                  onClick={() => handleGoalSelect(g.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 ${
                    profile.fitnessGoal === g.id 
                      ? 'bg-blue-600/20 border-blue-500' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${profile.fitnessGoal === g.id ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {g.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{g.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{g.description}</p>
                  </div>
                  {profile.fitnessGoal === g.id && <CheckCircle2 className="text-blue-500" size={20} />}
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="text-slate-500 font-medium">Back</button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 pt-10">
             <div className="space-y-2">
              <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Step 2 of 4</span>
              <h1 className="text-3xl font-bold leading-tight">What's your experience level?</h1>
              <p className="text-slate-400">This helps us scale the difficulty of your routines.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                <button 
                  key={lvl}
                  onClick={() => { setProfile(p => ({ ...p, experienceLevel: lvl })); nextStep(); }}
                  className={`w-full p-6 bg-slate-900 border border-slate-800 rounded-3xl text-left hover:border-blue-500 transition-all ${
                    profile.experienceLevel === lvl ? 'border-blue-500 bg-blue-500/10' : ''
                  }`}
                >
                  <p className="text-xl font-bold capitalize">{lvl}</p>
                  <p className="text-sm text-slate-500">
                    {lvl === 'beginner' && 'Just starting out, focusing on form.'}
                    {lvl === 'intermediate' && 'Consistent training for 6-12 months.'}
                    {lvl === 'advanced' && 'Years of experience, looking for peak performance.'}
                  </p>
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-medium">
              <ChevronLeft size={20} /> Back
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 pt-10">
            <div className="space-y-2">
              <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Step 3 of 4</span>
              <h1 className="text-3xl font-bold leading-tight">How many days a week?</h1>
              <p className="text-slate-400">We'll build a split that fits your schedule.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <button 
                  onClick={() => setProfile(p => ({ ...p, workoutFrequency: Math.max(1, (p.workoutFrequency || 3) - 1) }))}
                  className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl font-bold"
                >
                  -
                </button>
                <div className="text-center">
                  <span className="text-6xl font-bold font-mono">{profile.workoutFrequency}</span>
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Days / Week</p>
                </div>
                <button 
                  onClick={() => setProfile(p => ({ ...p, workoutFrequency: Math.min(7, (p.workoutFrequency || 3) + 1) }))}
                  className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl font-bold"
                >
                  +
                </button>
              </div>
              <button 
                onClick={nextStep}
                className="w-full bg-blue-500 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                Continue <ChevronRight size={20} />
              </button>
            </div>
            <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-medium">
              <ChevronLeft size={20} /> Back
            </button>
          </div>
        );
      case 6:
        const splits = [
          { id: 'PPL', label: 'Push Pull Legs', description: 'Classic hypertrophy split' },
          { id: 'Upper Lower', label: 'Upper / Lower', description: 'Great for 4-day frequency' },
          { id: 'Arnold', label: 'Arnold Split', description: 'Chest/Back, Shoulders/Arms, Legs' },
          { id: 'Anterior Posterior', label: 'Anterior / Posterior', description: 'Front vs Back of body focus' },
          { id: 'Mix', label: 'Hybrid Mix', description: 'AI optimized variety' }
        ];
        return (
          <div className="space-y-6 pt-10">
            <div className="space-y-2">
              <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Step 4 of 4</span>
              <h1 className="text-3xl font-bold leading-tight">Pick your workout split</h1>
              <p className="text-slate-400">Science-based programming for your style.</p>
            </div>
            <div className="space-y-3">
              {splits.map((s) => (
                <button 
                  key={s.id}
                  onClick={() => { setProfile(p => ({ ...p, preferredSplit: s.id })); nextStep(); }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between ${
                    profile.preferredSplit === s.id 
                      ? 'bg-blue-600/20 border-blue-500' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-bold">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.description}</p>
                  </div>
                  {profile.preferredSplit === s.id && <CheckCircle2 className="text-blue-500" size={20} />}
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-medium">
              <ChevronLeft size={20} /> Back
            </button>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6 pt-10">
            <div className="space-y-2">
              <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Last Step</span>
              <h1 className="text-3xl font-bold leading-tight">Setting up your profile...</h1>
              <p className="text-slate-400">Joni is customizing your AI coach based on your data.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-12 space-y-6">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="text-blue-500 animate-pulse" size={32} />
                </div>
              </div>
              <p className="text-blue-400 font-semibold animate-pulse tracking-widest uppercase text-xs">Calibrating AI...</p>
            </div>
            <button 
              onClick={() => onComplete(profile as UserProfile)}
              className="w-full bg-blue-500 text-white p-5 rounded-2xl font-bold"
            >
              Ready to start?
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto h-full flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
