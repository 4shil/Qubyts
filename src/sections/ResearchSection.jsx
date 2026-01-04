import { useTheme } from '../context/ThemeContext';
import { FileCode, Network, Lock } from 'lucide-react';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';
import MagneticButton from '../components/animations/MagneticButton';

const ResearchSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="research" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col items-end mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[10vw] md:text-[7rem] font-bold tracking-tighter leading-none text-right block text-transparent bg-clip-text bg-gradient-to-br ${isDark
                                ? 'from-white via-green-200/50 to-green-500/10'
                                : 'from-slate-900 via-green-700 to-green-200'
                            }`}
                    >
                        THEORY
                    </SplitTextReveal>
                    <div className="max-w-xl text-right mt-6">
                        <SplitTextReveal
                            type="words"
                            delay={0.2}
                            className={`text-2xl leading-tight block ${isDark ? 'text-green-200/60' : 'text-green-900/60'}`}
                        >
                            Defying probability. Braiding spacetime to create logical qubits that never forget.
                        </SplitTextReveal>
                    </div>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <TiltCard colSpan={2} rowSpan={2} className={`${isDark ? 'bg-green-900/20' : 'bg-green-50/80'} min-h-[450px]`}>
                        <div className="flex flex-col justify-between h-full">
                            <div className="w-full h-px bg-green-500/30 mb-8"></div>
                            <div>
                                <h3 className={`text-5xl font-medium mb-4 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Topological
                                </h3>
                                <p className={`text-lg max-w-md ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    Using anyons to store information in global geometry rather than local particles.
                                </p>
                            </div>
                            <div className="flex justify-between items-end mt-8">
                                <span className="text-xs font-mono text-green-400">EXP-094</span>
                                <MagneticButton className="px-6 py-3 rounded-full border border-green-500/50 text-green-400 text-xs font-bold hover:bg-green-500/10 transition-colors uppercase tracking-widest">
                                    Read Paper
                                </MagneticButton>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard className={isDark ? 'bg-black/50' : 'bg-white/80 shadow'}>
                        <FileCode className="text-green-400 mb-4 transition-transform duration-500" />
                        <h4 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Q-Gates</h4>
                        <p className={`text-sm mt-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Universal quantum logic.</p>
                    </TiltCard>
                    <TiltCard className={isDark ? 'bg-black/50' : 'bg-white/80 shadow'}>
                        <Network className="text-green-400 mb-4 transition-transform duration-500" />
                        <h4 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Braiding</h4>
                        <p className={`text-sm mt-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Exchanging worldlines.</p>
                    </TiltCard>
                    <TiltCard colSpan={2} className={isDark ? 'bg-green-900/10' : 'bg-green-50/50'}>
                        <div className="flex justify-between items-center">
                            <h4 className={`text-3xl font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Error Suppression</h4>
                            <Lock className="text-green-400 transition-transform duration-500" size={32} />
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default ResearchSection;
