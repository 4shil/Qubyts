import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import StaggeredText from '../components/animations/StaggeredText';

const PhilosophySection = () => {
    const { isDark } = useTheme();

    return (
        <section id="philosophy" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1400px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Statement */}
                    <div>
                        <span className={`text-[10px] font-mono tracking-[0.4em] uppercase mb-8 block ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                            WHY BITS DIE HERE
                        </span>
                        <SplitTextReveal
                            type="chars"
                            className={`text-[10vw] md:text-[6rem] font-bold tracking-brutal-tight leading-[0.9] text-parallax block ${isDark ? 'text-white' : 'text-slate-900'
                                }`}
                        >
                            BEYOND
                        </SplitTextReveal>
                        <SplitTextReveal
                            type="chars"
                            delay={0.1}
                            className={`text-[10vw] md:text-[6rem] font-bold tracking-brutal-tight leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r block ${isDark ? 'from-purple-400 to-cyan-400' : 'from-purple-600 to-cyan-600'
                                }`}
                        >
                            CLASSICAL
                        </SplitTextReveal>
                        <div className={`w-24 h-[2px] mt-8 ${isDark ? 'bg-purple-500' : 'bg-purple-600'}`} />
                    </div>

                    {/* Right: Manifesto */}
                    <div className={`space-y-8 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                        <StaggeredText
                            text="Classical computing has reached its fundamental limits. Moore's Law is dead. The transistor shrinks no further."
                            className="text-xl md:text-2xl font-light leading-relaxed block"
                            delay={0.4}
                        />
                        <p className="text-lg leading-relaxed animate-fade-in animate-delay-500">
                            We don't compute with bits. We compute with <span className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>superposition</span>—where every qubit exists in infinite states simultaneously.
                        </p>
                        <p className="text-lg leading-relaxed animate-fade-in animate-delay-600">
                            The future isn't faster silicon. It's <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>entanglement</span>—particles connected across spacetime, sharing information instantaneously.
                        </p>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div>
                                <span className={`text-4xl font-bold tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>10<sup>18</sup></span>
                                <p className="text-xs font-mono uppercase tracking-widest mt-2 opacity-50">Classical ops/sec limit</p>
                            </div>
                            <div>
                                <span className={`text-4xl font-bold tracking-brutal text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-purple-400 to-cyan-400' : 'from-purple-600 to-cyan-600'}`}>∞</span>
                                <p className="text-xs font-mono uppercase tracking-widest mt-2 opacity-50">Quantum parallelism</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
