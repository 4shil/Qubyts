import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import MaskText from '../components/animations/MaskText';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import StaggeredText from '../components/animations/StaggeredText';
import MagneticButton from '../components/animations/MagneticButton';

const HomeSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="hero" className="section-snap relative flex flex-col justify-center px-6 md:px-12 overflow-hidden">
            <div className="z-10 w-full max-w-[90vw]">
                {/* Status Line */}
                <div className="mb-8 flex items-center gap-4 animate-fade-in">
                    <span className={`w-16 h-[2px] ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`}></span>
                    <MaskText delay={0.2}>
                        <span className={`text-[10px] font-mono tracking-[0.5em] uppercase ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                            System Online
                        </span>
                    </MaskText>
                </div>

                {/* Main Title */}
                <h1 className={`font-bold tracking-brutal-tight leading-[0.85] mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <SplitTextReveal
                        type="words"
                        className={`text-[14vw] md:text-[10rem] block text-parallax ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        BEYOND
                    </SplitTextReveal>
                    <SplitTextReveal
                        type="words"
                        delay={0.1}
                        className={`text-[14vw] md:text-[10rem] block text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'}`}
                    >
                        BINARY
                    </SplitTextReveal>
                </h1>

                {/* Subtitle */}
                <div className="flex flex-col md:flex-row gap-8 md:items-end">
                    <div className="max-w-md animate-fade-in animate-delay-300">
                        <StaggeredText
                            text="Silicon is obsolete. Entanglement is the new connection. We compute the impossible."
                            className={`text-lg md:text-xl font-light leading-relaxed block ${isDark ? 'text-white/60' : 'text-slate-600'}`}
                            delay={0.8}
                        />
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="flex gap-4"
                    >
                        <MagneticButton
                            voidEffect="explode"
                            className={`px-8 py-4 brutalist-border text-xs font-bold uppercase tracking-widest ${isDark
                                    ? 'border-white text-white hover:bg-white hover:text-black'
                                    : 'border-black text-black hover:bg-black hover:text-white'
                                }`}
                        >
                            Initialize Cluster
                        </MagneticButton>
                        <MagneticButton
                            voidEffect="pulse"
                            className={`px-8 py-4 text-xs font-bold uppercase tracking-widest ${isDark
                                    ? 'bg-white text-black hover:bg-cyan-400'
                                    : 'bg-black text-white hover:bg-cyan-600'
                                }`}
                        >
                            Learn More
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className={`absolute bottom-12 left-6 md:left-12 flex items-center gap-4 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                <span className="text-[10px] font-mono tracking-widest">↓ SCROLL</span>
            </div>
        </section>
    );
};

export default HomeSection;
