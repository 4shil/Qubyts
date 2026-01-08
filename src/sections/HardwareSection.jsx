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
                {/* Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
                    <div>
                        <SplitTextReveal
                            type="chars"
                            className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'
                                }`}
                        >
                            HARDWARE
                        </SplitTextReveal>
                        <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-purple-500' : 'bg-purple-600'}`} />
                    </div>
                    <div className="pb-4">
                        <SplitTextReveal
                            type="words"
                            delay={0.05}
                            className={`text-xl md:text-2xl leading-tight block font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}
                        >
                            Frozen in time to move at light speed. Absolute zero is our baseline.
                        </SplitTextReveal>
                    </div>
                </div>

                {/* Brutalist Cards Grid */}
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    <TiltCard className="md:col-span-2">
                        <div className="h-full flex flex-col justify-between p-8">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.3em]">Environment</span>
                                <Thermometer size={20} className="text-purple-400" />
                            </div>
                            <div>
                                <MaskText delay={0.05}>
                                    <h3 className={`text-8xl md:text-[10rem] font-bold tracking-brutal-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        12<span className="text-4xl opacity-40">mK</span>
                                    </h3>
                                </MaskText>
                                <p className={`mt-4 font-mono text-xs uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                                    Coldest core on Earth.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard>
                        <div className="p-8 h-full flex flex-col justify-between">
                            <Chip className="text-purple-400" size={32} />
                            <div>
                                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Superconductors
                                </h3>
                                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                                    Niobium-Titanium circuits enabling zero resistance.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default HardwareSection;
