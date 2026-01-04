import { useTheme } from '../context/ThemeContext';
import { GSAPTextReveal, GSAPWordReveal, GSAPLineReveal } from '../components/animations/GSAPAnimations';
import MagneticButton from '../components/animations/MagneticButton';

const HomeSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="home" className="section-snap relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
            <div className="z-10 w-full max-w-[90vw]">
                <div className="mb-8 flex items-center gap-4">
                    <span className={`w-12 h-px ${isDark ? 'bg-cyan-500/50' : 'bg-cyan-600/50'}`}></span>
                    <GSAPLineReveal delay={0.2}>
                        <span className={`text-xs font-mono tracking-[0.4em] uppercase ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                            System Online
                        </span>
                    </GSAPLineReveal>
                </div>
                <h1 className={`font-bold tracking-tighter leading-[0.85] mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <GSAPTextReveal
                        className={`text-[12vw] md:text-[9rem] block ${isDark ? 'text-white/90' : 'text-slate-900/90'}`}
                        stagger={0.04}
                    >
                        BEYOND BINARY
                    </GSAPTextReveal>
                </h1>
                <div className="flex flex-col md:flex-row gap-8 md:items-end">
                    <div className="max-w-md">
                        <GSAPWordReveal
                            className={`text-lg md:text-xl font-light leading-relaxed ${isDark ? 'text-white/60' : 'text-slate-600'}`}
                            delay={0.8}
                        >
                            Silicon is obsolete. Entanglement is the new connection. We compute the impossible.
                        </GSAPWordReveal>
                    </div>
                    <GSAPLineReveal delay={1.2}>
                        <div className="flex gap-4">
                            <MagneticButton
                                className={`px-8 py-4 border rounded-full text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer backdrop-blur-md ${isDark
                                        ? 'border-white/20 text-white hover:bg-white hover:text-black'
                                        : 'border-black/10 text-black hover:bg-black hover:text-white'
                                    }`}
                            >
                                Initialize Cluster
                            </MagneticButton>
                        </div>
                    </GSAPLineReveal>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
