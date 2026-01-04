import { useTheme } from '../context/ThemeContext';
import { useScroll, useTransform, motion } from 'framer-motion';
import MaskText from '../components/animations/MaskText';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import StaggeredText from '../components/animations/StaggeredText';
import MagneticButton from '../components/animations/MagneticButton';

const HomeSection = () => {
    const { isDark } = useTheme();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <section id="home" className="section-snap relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
            <motion.div style={{ y, opacity }} className="z-10 w-full max-w-[90vw]">
                {/* Status Line */}
                <div className="mb-8 flex items-center gap-4">
                    <span className={`w-16 h-[2px] ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`}></span>
                    <MaskText delay={0.2}>
                        <span className={`text-[10px] font-mono tracking-[0.5em] uppercase ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                            System Online
                        </span>
                    </MaskText>
                </div>

                {/* Main Title - Brutalist Typography */}
                <h1 className={`font-bold tracking-brutal-tight leading-[0.85] mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <SplitTextReveal
                        type="words"
                        className={`text-[14vw] md:text-[10rem] block ${isDark ? 'text-white' : 'text-slate-900'}`}
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
                    <div className="max-w-md">
                        <StaggeredText
                            text="Silicon is obsolete. Entanglement is the new connection. We compute the impossible."
                            className={`text-lg md:text-xl font-light leading-relaxed block ${isDark ? 'text-white/60' : 'text-slate-600'}`}
                            delay={0.8}
                        />
                    </div>

                    {/* CTA Buttons with 3D Effects */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 }}
                        className="flex gap-4"
                    >
                        <MagneticButton
                            voidEffect="explode"
                            className={`px-8 py-4 brutalist-border brutalist-shadow text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${isDark
                                    ? 'border-white text-white hover:bg-white hover:text-black hover:shadow-cyan-500'
                                    : 'border-black text-black hover:bg-black hover:text-white'
                                }`}
                        >
                            Initialize Cluster
                        </MagneticButton>
                        <MagneticButton
                            voidEffect="pulse"
                            className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${isDark
                                    ? 'bg-white text-black hover:bg-cyan-400'
                                    : 'bg-black text-white hover:bg-cyan-600'
                                }`}
                        >
                            Learn More
                        </MagneticButton>
                    </motion.div>
                </div>
            </motion.div>

            {/* Geometric Accent */}
            <div className={`absolute bottom-12 left-6 md:left-12 flex items-center gap-4 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-[1px] h-8 bg-current"
                />
            </div>
        </section>
    );
};

export default HomeSection;
