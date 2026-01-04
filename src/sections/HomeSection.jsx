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
                <div className="mb-8 flex items-center gap-4">
                    <span className={`w-12 h-px ${isDark ? 'bg-cyan-500/50' : 'bg-cyan-600/50'}`}></span>
                    <MaskText delay={0.2}>
                        <span className={`text-xs font-mono tracking-[0.4em] uppercase ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                            System Online
                        </span>
                    </MaskText>
                </div>
                <h1 className={`font-bold tracking-tighter leading-[0.85] mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <SplitTextReveal
                        type="words"
                        className={`text-[12vw] md:text-[9rem] block ${isDark ? 'text-white/90' : 'text-slate-900/90'}`}
                    >
                        BEYOND BINARY
                    </SplitTextReveal>
                </h1>
                <div className="flex flex-col md:flex-row gap-8 md:items-end">
                    <div className="max-w-md">
                        <StaggeredText
                            text="Silicon is obsolete. Entanglement is the new connection. We compute the impossible."
                            className={`text-lg md:text-xl font-light leading-relaxed block ${isDark ? 'text-white/60' : 'text-slate-600'}`}
                            delay={0.8}
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 }}
                        className="flex gap-4"
                    >
                        <MagneticButton
                            className={`px-8 py-4 border rounded-full text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer backdrop-blur-md ${isDark
                                    ? 'border-white/20 text-white hover:bg-white hover:text-black'
                                    : 'border-black/10 text-black hover:bg-black hover:text-white'
                                }`}
                        >
                            Initialize Cluster
                        </MagneticButton>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HomeSection;
