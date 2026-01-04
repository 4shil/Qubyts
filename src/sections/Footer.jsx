import { useTheme } from '../context/ThemeContext';
import { Atom } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import MagneticButton from '../components/animations/MagneticButton';

const Footer = () => {
    const { isDark } = useTheme();
    const { navigateTo } = useAppStore();

    return (
        <footer id="contact" className={`section-snap w-full flex flex-col items-center justify-center relative z-10 ${isDark ? 'bg-black' : 'bg-white'}`}>
            <div className="flex flex-col items-center justify-center gap-6">
                <Atom size={32} className={isDark ? 'text-white/20' : 'text-black/20'} />
                <div className={`w-16 h-[2px] ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`} />
                <p className={`text-[10px] font-mono uppercase tracking-[0.4em] ${isDark ? 'text-white/30' : 'text-black/30'}`}>
                    © 2026 Q-Systems Inc.
                </p>
                <MagneticButton
                    onClick={() => navigateTo(0)}
                    className={`mt-8 px-6 py-3 text-xs font-mono uppercase tracking-widest ${isDark ? 'text-white/40 hover:text-cyan-400' : 'text-black/40 hover:text-cyan-600'
                        }`}
                >
                    ↑ Back to Top
                </MagneticButton>
            </div>
        </footer>
    );
};

export default Footer;
