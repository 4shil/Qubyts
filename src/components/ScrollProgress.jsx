import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import useAppStore from '../store/useAppStore';

const ScrollProgress = () => {
    const { isDark } = useTheme();
    const { sections, currentSection, navigateTo } = useAppStore();

    // Calculate progress based on discrete section index
    const progress = (currentSection + 1) / sections.length;

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
            {/* Progress Line */}
            <div className={`relative w-[2px] h-32 ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                <motion.div
                    className={`absolute top-0 left-0 w-full origin-top ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: progress }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ height: '100%' }}
                />
            </div>

            {/* Section Dots */}
            <div className="flex flex-col gap-1.5 mt-4">
                {sections.map((section, index) => (
                    <motion.button
                        key={section.id}
                        onClick={() => navigateTo(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all cursor-scale ${currentSection === index
                                ? isDark ? 'bg-cyan-400 scale-150' : 'bg-cyan-600 scale-150'
                                : isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-black/20 hover:bg-black/40'
                            }`}
                        whileHover={{ scale: currentSection === index ? 1.5 : 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        title={section.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default ScrollProgress;
