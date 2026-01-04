import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wifi } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import useAppStore from '../store/useAppStore';

const MicroNav = () => {
    const { isDark } = useTheme();
    const { sections, currentSection, navigateTo } = useAppStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavigation = (index) => {
        navigateTo(index);
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Fixed Micro-Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between ${isDark ? 'text-white' : 'text-black'
                }`}>
                {/* Logo / System Status */}
                <div className="flex items-center gap-4">
                    <motion.button
                        onClick={() => navigateTo(0)}
                        className={`text-sm font-bold tracking-widest cursor-scale ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Q-SYSTEMS
                    </motion.button>

                    {/* Latency Indicator */}
                    <motion.div
                        className="flex items-center gap-2 opacity-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Wifi size={12} />
                        <motion.span
                            className="text-[10px] font-mono"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            2ms
                        </motion.span>
                    </motion.div>
                </div>

                {/* Current Section */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">
                        {sections[currentSection]?.name || 'LOADING'}
                    </span>
                </div>

                {/* Section Counter */}
                <div className="hidden md:flex items-center gap-2 mr-4">
                    <span className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                        {String(currentSection + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono opacity-30">/</span>
                    <span className="text-xs font-mono opacity-30">
                        {String(sections.length).padStart(2, '0')}
                    </span>
                </div>

                {/* Hamburger Menu */}
                <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 transition-colors glow-hover focus-ring cursor-scale ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                        }`}
                    whileTap={{ scale: 0.95 }}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
            </nav>

            {/* Full-screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`fixed inset-0 z-40 flex items-center justify-center overflow-y-auto py-20 ${isDark ? 'bg-black/95' : 'bg-white/95'
                            } backdrop-blur-md`}
                    >
                        <nav className="flex flex-col items-center gap-2 max-h-full">
                            {sections.map((section, index) => (
                                <motion.button
                                    key={section.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => handleNavigation(index)}
                                    className={`text-lg md:text-2xl font-bold tracking-brutal transition-all cursor-scale py-1 ${currentSection === index
                                            ? isDark ? 'text-cyan-400' : 'text-cyan-600'
                                            : isDark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
                                        }`}
                                >
                                    <span className="text-xs font-mono opacity-30 mr-3">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {section.name}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MicroNav;
