import { useTheme } from '../context/ThemeContext';
import { Globe, Server } from 'lucide-react';
import { GSAPTextReveal, GSAPStaggerCards } from '../components/animations/GSAPAnimations';
import TiltCard from '../components/animations/TiltCard';

const CloudSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="cloud" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24 text-center">
                    <GSAPTextReveal
                        className={`text-[8vw] md:text-[6rem] font-bold tracking-tighter leading-none block bg-clip-text text-transparent bg-gradient-to-br ${isDark
                                ? 'from-white via-sky-200/50 to-sky-500/10'
                                : 'from-slate-900 via-sky-700 to-sky-200'
                            }`}
                        stagger={0.05}
                    >
                        NEXUS
                    </GSAPTextReveal>
                    <p className={`text-2xl mt-4 ${isDark ? 'text-sky-200/60' : 'text-sky-900/60'}`}>
                        Access anywhere. Qubit-time billing.
                    </p>
                </div>
                <GSAPStaggerCards className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15}>
                    <TiltCard colSpan={2} className={isDark ? 'bg-sky-900/10' : 'bg-sky-50/80'}>
                        <h3 className={`text-4xl font-medium mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Neural Hybrid
                        </h3>
                        <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                            Coupling QPUs directly with neural network accelerators.
                        </p>
                    </TiltCard>
                    <TiltCard className={isDark ? 'bg-sky-900/10' : 'bg-sky-50/80'}>
                        <div className="flex flex-col items-center text-center">
                            <Globe size={64} className="text-sky-400 mb-6" />
                            <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>8 Zones</h3>
                        </div>
                    </TiltCard>
                    <TiltCard colSpan={3} className={`h-48 flex flex-col justify-center items-center ${isDark ? 'bg-sky-900/10' : 'bg-sky-50/80'}`}>
                        <Server size={48} className="text-sky-400 mb-4" />
                        <h3 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>2ms Latency</h3>
                    </TiltCard>
                </GSAPStaggerCards>
            </div>
        </section>
    );
};

export default CloudSection;
