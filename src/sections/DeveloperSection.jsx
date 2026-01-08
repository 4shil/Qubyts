import { useTheme } from '../context/ThemeContext';
import { Code2, Terminal, Package } from 'lucide-react';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';
import MagneticButton from '../components/animations/MagneticButton';

const DeveloperSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="developer" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none text-parallax block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        BUILD
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'}`} />
                    <p className={`text-xl mt-6 font-light max-w-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                        SDKs, kernels, and APIs for the quantum-native developer.
                    </p>
                </div>

                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TiltCard colSpan={2} className={`min-h-[350px] ${isDark ? 'border-indigo-500/50' : 'border-indigo-300'}`}>
                        <div className="flex flex-col justify-between h-full p-8">
                            <Terminal className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={40} />
                            <div>
                                <h3 className={`text-4xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Q-SDK
                                </h3>
                                <p className={`text-lg mb-6 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    Write quantum algorithms in Python, Rust, or our native Q-Lang.
                                </p>
                                <pre className={`text-sm font-mono p-4 rounded-none ${isDark ? 'bg-white/5 text-cyan-400' : 'bg-black/5 text-indigo-600'}`}>
                                    {`from qsystems import Qubit\n\nq = Qubit.entangle(n=1000)\nq.hadamard().measure()`}
                                </pre>
                            </div>
                        </div>
                    </TiltCard>

                    <TiltCard className={`${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <div className="flex flex-col justify-between h-full p-8">
                            <Code2 className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={32} />
                            <div>
                                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Kernels
                                </h3>
                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                                    Low-level gate operations for hardware access.
                                </p>
                            </div>
                        </div>
                    </TiltCard>

                    <TiltCard colSpan={2} className={`${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <div className="flex items-center justify-between p-8">
                            <div>
                                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>REST API</h3>
                                <p className={`text-sm mt-2 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Submit jobs from any language</p>
                            </div>
                            <MagneticButton
                                voidEffect="pulse"
                                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest ${isDark ? 'border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10' : 'border-indigo-600 text-indigo-700 hover:bg-indigo-50'}`}
                            >
                                Docs
                            </MagneticButton>
                        </div>
                    </TiltCard>

                    <TiltCard className={`${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <div className="flex flex-col justify-center h-full p-8 text-center">
                            <Package className={`mx-auto mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} size={32} />
                            <h3 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>2.4k</h3>
                            <p className={`text-xs font-mono uppercase tracking-widest mt-2 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                                NPM Downloads/week
                            </p>
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default DeveloperSection;
