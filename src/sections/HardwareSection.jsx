import { useTheme } from '../context/ThemeContext';
import { Cpu as Chip, Thermometer } from 'lucide-react';
import MaskText from '../components/animations/MaskText';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const HardwareSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="hardware" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
                    <div>
                        <SplitTextReveal
                            type="chars"
                            className={`text-[10vw] md:text-[7rem] font-bold tracking-tighter leading-none block text-transparent bg-clip-text bg-gradient-to-br ${isDark
                                    ? 'from-white via-purple-200/50 to-purple-500/10'
                                    : 'from-slate-900 via-purple-700 to-purple-200'
                                }`}
                        >
                            HARDWARE
                        </SplitTextReveal>
                    </div>
                    <div className="pb-4">
                        <SplitTextReveal
                            type="words"
                            delay={0.2}
                            className={`text-2xl leading-tight block ${isDark ? 'text-purple-200/60' : 'text-purple-900/60'}`}
                        >
                            Frozen in time to move at light speed. Absolute zero is our baseline.
                        </SplitTextReveal>
                    </div>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    <TiltCard className={`${isDark ? 'bg-purple-900/10' : 'bg-purple-50/80'} md:col-span-2`}>
                        <div className="h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Environment</span>
                                <Thermometer size={24} className="text-purple-400" />
                            </div>
                            <div>
                                <MaskText delay={0.2}>
                                    <h3 className={`text-7xl md:text-9xl font-medium tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        12<span className="text-4xl opacity-40">mK</span>
                                    </h3>
                                </MaskText>
                                <p className={`mt-4 font-mono text-sm ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                                    Coldest core on Earth.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard className={isDark ? 'bg-purple-900/5' : 'bg-purple-50/50'}>
                        <Chip className="text-purple-400 mb-6" size={40} />
                        <h3 className={`text-3xl font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Superconductors
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                            Niobium-Titanium circuits enabling zero resistance.
                        </p>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default HardwareSection;
