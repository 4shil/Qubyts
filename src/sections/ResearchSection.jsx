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
                {/* Right-aligned Header */}
                <div className="flex flex-col items-end mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none text-right block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        THEORY
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-green-500' : 'bg-green-600'}`} />
                    <div className="max-w-xl text-right mt-6">
                        <SplitTextReveal
                            type="words"
                            delay={0.05}
                            className={`text-xl leading-tight block font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}
                        >
                            Defying probability. Braiding spacetime to create logical qubits.
                        </SplitTextReveal>
                    </div>
                </div>

                {/* Cards Grid */}
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <TiltCard colSpan={2} rowSpan={2} className="min-h-[450px]">
                        <div className="flex flex-col justify-between h-full p-8">
                            <div className={`w-full h-[2px] ${isDark ? 'bg-green-500/30' : 'bg-green-300'}`}></div>
                            <div>
                                <h3 className={`text-5xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Topological
                                </h3>
                                <p className={`text-lg max-w-md ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    Using anyons to store information in global geometry.
                                </p>
                            </div>
                            <div className="flex justify-between items-end mt-8">
                                <span className="text-[10px] font-mono text-green-400 tracking-widest">EXP-094</span>
                                <MagneticButton
                                    voidEffect="pulse"
                                    className="px-6 py-3 glass-dark rounded-full text-green-400 text-xs font-bold hover:bg-green-500/10 uppercase tracking-widest"
                                >
                                    Read Paper
                                </MagneticButton>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard className="p-6">
                        <FileCode className="text-green-400 mb-4" size={24} />
                        <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Q-Gates</h4>
                        <p className={`text-sm mt-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Universal quantum logic.</p>
                    </TiltCard>
                    <TiltCard className="p-6">
                        <Network className="text-green-400 mb-4" size={24} />
                        <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Braiding</h4>
                        <p className={`text-sm mt-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Exchanging worldlines.</p>
                    </TiltCard>
                    <TiltCard colSpan={2} className="p-6">
                        <div className="flex justify-between items-center">
                            <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Error Suppression</h4>
                            <Lock className="text-green-400" size={24} />
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default ResearchSection;
