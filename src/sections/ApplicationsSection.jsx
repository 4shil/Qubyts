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
                <div className="mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[8vw] md:text-[6rem] font-bold tracking-tighter leading-none block text-transparent bg-clip-text bg-gradient-to-br ${isDark
                                ? 'from-white via-rose-200/50 to-rose-500/10'
                                : 'from-slate-900 via-rose-700 to-rose-200'
                            }`}
                    >
                        IMPACT
                    </SplitTextReveal>
                    <SplitTextReveal
                        type="words"
                        delay={0.2}
                        className={`text-2xl mt-4 block ${isDark ? 'text-rose-200/60' : 'text-rose-900/60'}`}
                    >
                        Designing life molecule by molecule.
                    </SplitTextReveal>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TiltCard className={isDark ? 'bg-rose-900/10' : 'bg-rose-50/80'} colSpan={2}>
                        <div className="flex flex-col justify-center h-full min-h-[300px]">
                            <Microscope className="text-rose-400 mb-8 transition-transform duration-500" size={48} />
                            <h3 className={`text-5xl font-medium mb-4 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Material Science
                            </h3>
                            <p className={`text-xl max-w-md ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                Simulating superconductors and batteries to invent the next element.
                            </p>
                        </div>
                    </TiltCard>
                    <TiltCard className="bg-rose-900/5">
                        <div className="flex flex-col h-full justify-between">
                            <Leaf className="text-rose-400 transition-transform duration-500" size={32} />
                            <div>
                                <h3 className="text-3xl text-white font-medium mb-2">Synthesis</h3>
                                <p className="text-white/50 text-sm">Catalyst design.</p>
                            </div>
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default ApplicationsSection;
