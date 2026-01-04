import { useTheme } from '../context/ThemeContext';
import { Terminal, Layers, Cpu } from 'lucide-react';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const QOSSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="qos" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col items-end mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none text-right text-parallax block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        Q-OS
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-green-500' : 'bg-green-600'}`} />
                    <p className={`text-xl mt-6 font-light text-right max-w-md ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                        The first operating system built for entanglement natively.
                    </p>
                </div>

                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TiltCard colSpan={2} rowSpan={2} className={`min-h-[450px] brutalist-border ${isDark ? 'border-green-500/50' : 'border-green-300'}`}>
                        <div className="flex flex-col justify-between h-full p-8">
                            <Terminal className={isDark ? 'text-green-400' : 'text-green-600'} size={48} />
                            <div>
                                <h3 className={`text-5xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Quantum Kernel
                                </h3>
                                <p className={`text-xl ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    Real-time qubit orchestration. Error correction at the OS level. Zero latency between thought and execution.
                                </p>
                            </div>
                            <div className={`flex gap-8 pt-8 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                                <div>
                                    <span className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>1μs</span>
                                    <p className="text-xs font-mono uppercase mt-1 opacity-50">Gate latency</p>
                                </div>
                                <div>
                                    <span className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>99.9%</span>
                                    <p className="text-xs font-mono uppercase mt-1 opacity-50">Uptime SLA</p>
                                </div>
                            </div>
                        </div>
                    </TiltCard>

                    <TiltCard className={`brutalist-border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <div className="flex flex-col justify-between h-full p-8">
                            <Layers className={isDark ? 'text-green-400' : 'text-green-600'} size={28} />
                            <div>
                                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Virtualization</h3>
                                <p className={`text-sm mt-2 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                                    Isolated quantum environments per tenant.
                                </p>
                            </div>
                        </div>
                    </TiltCard>

                    <TiltCard className={`brutalist-border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                        <div className="flex flex-col justify-between h-full p-8">
                            <Cpu className={isDark ? 'text-green-400' : 'text-green-600'} size={28} />
                            <div>
                                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Hybrid Mode</h3>
                                <p className={`text-sm mt-2 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                                    Classical + quantum co-processing.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default QOSSection;
