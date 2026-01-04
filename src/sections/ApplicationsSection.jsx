import { useTheme } from '../context/ThemeContext';
import { Microscope, Leaf } from 'lucide-react';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const ApplicationsSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="applications" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                {/* Header */}
                <div className="mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        IMPACT
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-rose-500' : 'bg-rose-600'}`} />
                    <SplitTextReveal
                        type="words"
                        delay={0.2}
                        className={`text-xl mt-6 block font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}
                    >
                        Designing life molecule by molecule.
                    </SplitTextReveal>
                </div>

                {/* Cards */}
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TiltCard className={`md:col-span-2 brutalist-border min-h-[350px] ${isDark ? 'bg-black border-rose-500/50' : 'bg-white border-rose-300'}`}>
                        <div className="flex flex-col justify-center h-full p-8">
                            <Microscope className="text-rose-400 mb-8" size={40} />
                            <h3 className={`text-5xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Material Science
                            </h3>
                            <p className={`text-xl max-w-md ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                Simulating superconductors and batteries to invent the next element.
                            </p>
                        </div>
                    </TiltCard>
                    <TiltCard className={`brutalist-border ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
                        <div className="flex flex-col h-full justify-between p-8">
                            <Leaf className="text-rose-400" size={28} />
                            <div>
                                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Synthesis</h3>
                                <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Catalyst design.</p>
                            </div>
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default ApplicationsSection;
