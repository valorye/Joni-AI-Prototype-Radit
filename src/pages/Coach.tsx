import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Camera, 
  Image as ImageIcon, 
  Sparkles,
  User,
  Bot,
  Loader2,
  X
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { UserProfile } from '../App';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

export function Coach({ user }: { user: UserProfile }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: `Hello ${user.displayName}! I'm Joni, your AI Fitness Coach. How can I help you today? You can ask me about diet, specific exercises, or upload a physique photo for analysis.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      imageUrl: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const history = messages.concat(userMessage).map(m => ({
        role: m.role,
        content: m.content,
        imageUrl: m.imageUrl
      }));
      
      const response = await geminiService.chatWithCoach(history);
      
      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-4 max-w-2xl mx-auto pt-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-white/5">
        <div className="bg-blue-500 p-2 rounded-2xl">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg">Joni AI Coach</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-slate-400 font-medium tracking-wider">ACTIVE NOW</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 py-6 px-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] space-y-2`}>
              <div className={`p-4 rounded-3xl ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
              }`}>
                {m.imageUrl && (
                  <img src={m.imageUrl} alt="Uploaded" className="rounded-2xl mb-3 max-h-64 object-cover" />
                )}
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{m.content}</p>
              </div>
              <p className="text-[10px] text-slate-500 px-1 font-mono">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-blue-500" />
              <span className="text-sm text-slate-400 font-medium">Joni is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="space-y-3 pb-4">
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="relative w-20 h-20 group"
            >
              <img src={selectedImage} className="w-full h-full object-cover rounded-2xl border-2 border-blue-500" alt="Preview" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-2 flex items-center gap-2 focus-within:border-blue-500/50 shadow-2xl">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Camera size={22} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            className="hidden" 
            accept="image/*" 
          />
          <input 
            type="text" 
            placeholder="Ask about diet, workout, or physique..."
            className="flex-1 bg-transparent border-none outline-none text-sm p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={(!input.trim() && !selectedImage) || isTyping}
            className={`p-3 rounded-2xl transition-all ${
              (!input.trim() && !selectedImage) || isTyping 
                ? 'text-slate-600 bg-slate-800' 
                : 'text-white bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
