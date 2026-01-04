import { useTheme } from '../context/ThemeContext';
import { Atom } from 'lucide-react';

const Footer = () => {
    const { isDark } = useTheme();

    return (
        <footer className={`w-full py-12 border-t backdrop-blur-xl text-center relative z-10 section-snap ${isDark ? 'border-white/5 bg-black/80' : 'border-black/5 bg-white/80'
            }`}>
            <div className="flex flex-col items-center justify-center gap-4">
                <Atom size={24} className={isDark ? 'text-white/20' : 'text-black/20'} />
                <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/30'}`}>
                    © 2026 Q-Systems Inc.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
