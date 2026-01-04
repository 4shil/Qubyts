import { Sparkles, Sun, Moon } from 'lucide-react';
import MagneticButton from './animations/MagneticButton';

const FloatingControls = ({ onOpenTerminal, toggleTheme, isDark }) => (
    <div className="fixed top-6 right-6 z-50 pointer-events-auto flex items-center gap-3">
        <MagneticButton
            onClick={toggleTheme}
            className={`p-3 rounded-full border transition-all shadow-xl group ${isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                    : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'
                }`}
        >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </MagneticButton>
        <MagneticButton
            onClick={onOpenTerminal}
            className={`flex items-center gap-2 px-5 py-2.5 backdrop-blur-xl border rounded-full font-bold text-xs tracking-widest transition-all shadow-2xl group ${isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                    : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'
                }`}
        >
            <Sparkles size={14} className="text-cyan-400 group-hover:animate-spin-slow" />
            <span>Q-AI</span>
        </MagneticButton>
    </div>
);

export default FloatingControls;
