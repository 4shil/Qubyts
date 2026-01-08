import { memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import MaskText from '../components/animations/MaskText';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import StaggeredText from '../components/animations/StaggeredText';
import MagneticButton from '../components/animations/MagneticButton';

const HomeSection = memo(() => {
    const { isDark } = useTheme();

    return (
        <section id="hero" className="section-snap relative flex flex-col justify-center px-6 md:px-12 overflow-hidden">
            <div className="z-10 w-full">
                {/* Top Meta Info */}
                <div className="absolute top-12 left-6 md:left-12 flex flex-col gap-2">
                    <div className="system-tag text-cyan-500">
                        EST. 2026 // NEURAL NET
                    </div>
                    <div className="system-tag text-purple-500" style={{ animationDelay: '0.2s' }}>
                        COORD: 34.0522° N, 118.2437° W
                    </div>
                </div>

                {/* Main Title Container */}
                <div className="relative mt-20">
                    <h1 className={`mb-4 select-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <div className="text-reveal-mask">
                            <SplitTextReveal
                                type="chars"
                                className="text-huge block tracking-tighter"
                            >
                                BEYOND
                            </SplitTextReveal>
                        </div>
                        <div className="text-reveal-mask -mt-[2vw]">
                            <SplitTextReveal
                                type="chars"
                                delay={0.2}
                                className={`text-huge block text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'}`}
                            >
                                BINARY
                            </SplitTextReveal>
                        </div>
                    </h1>

                    {/* Description & Secondary Meta */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-12">
                        <div className="max-w-xl">
                            <StaggeredText
                                text="Quantum-first architecture for the next era of computation. We've moved past silicon limitations to embrace the fluid dynamics of subatomic processing."
                                className={`text-xl md:text-2xl font-light leading-snug ${isDark ? 'text-white/40' : 'text-slate-500'}`}
                                delay={0.4}
                            />
                        </div>

                        <div className="flex flex-col gap-1 items-end text-right font-mono text-[10px] opacity-30 mt-8 md:mt-0">
                            <span>RECURSION_LEVEL: 0x4F</span>
                            <span>STATUS: STABLE_VOID</span>
                            <span>LATENCY: 0.0001ms</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Utility Bar */}
            <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 flex justify-between items-center">
                <div className={`flex items-center gap-4 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                    <span className="text-[10px] font-mono tracking-[0.4em] animate-pulse">↓ SCROLL TO EXPLORE</span>
                </div>

                <div className={`hidden md:block text-[10px] font-mono tracking-widest ${isDark ? 'text-white/10' : 'text-black/10'}`}>
                    QUBYTS QUANTUM SYSTEMS © {new Date().getFullYear()}
                </div>
            </div>
        </section>
    );
});

export default HomeSection;
