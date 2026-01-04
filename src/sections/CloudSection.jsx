import { useTheme } from '../context/ThemeContext';
import { Globe, Server } from 'lucide-react';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const CloudSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="cloud" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24 text-center">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        NEXUS
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 mx-auto ${isDark ? 'bg-sky-500' : 'bg-sky-600'}`} />
                    <p className={`text-xl mt-6 font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                        Access anywhere. Qubit-time billing.
                    </p>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TiltCard colSpan={2} className={`brutalist-border min-h-[200px] ${isDark ? 'bg-black border-sky-500/50' : 'bg-white border-sky-300'}`}>
                        <div className="p-8">
                            <h3 className={`text-4xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>Neural Hybrid</h3>
                            <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                Coupling QPUs directly with neural network accelerators.
                            </p>
                        </div>
                    </TiltCard>
                    <TiltCard className={`brutalist-border ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
                        <div className="flex flex-col items-center text-center p-8">
                            <Globe size={48} className="text-sky-400 mb-6" />
                            <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>8 Zones</h3>
                        </div>
                    </TiltCard>
                    <TiltCard colSpan={3} className={`h-48 flex flex-col justify-center items-center brutalist-border ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
                        <Server size={40} className="text-sky-400 mb-4" />
                        <h3 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>2ms Latency</h3>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default CloudSection;
