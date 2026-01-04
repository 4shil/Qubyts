import { useTheme } from '../context/ThemeContext';
import { Atom } from 'lucide-react';

const Footer = () => {
    const { isDark } = useTheme();

    return (
        <footer className={`w-full py-16 border-t text-center relative z-10 section-snap ${isDark ? 'border-white/10 bg-black' : 'border-black/10 bg-white'}`}>
            <div className="flex flex-col items-center justify-center gap-6">
                <Atom size={32} className={isDark ? 'text-white/20' : 'text-black/20'} />
                <div className={`w-16 h-[2px] ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`} />
                <p className={`text-[10px] font-mono uppercase tracking-[0.4em] ${isDark ? 'text-white/30' : 'text-black/30'}`}>
                    © 2026 Q-Systems Inc.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
