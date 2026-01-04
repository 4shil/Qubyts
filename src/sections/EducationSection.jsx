import { useTheme } from '../context/ThemeContext';
import { Activity, Menu } from 'lucide-react';
import MaskText from '../components/animations/MaskText';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import StaggeredText from '../components/animations/StaggeredText';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const EducationSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="education" className={`section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center ${isDark ? 'bg-amber-950/5' : 'bg-amber-50/50'}`}>
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24 md:w-2/3">
                    <MaskText>
                        <span className={`font-mono text-xs tracking-widest uppercase ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                            Knowledge Base
                        </span>
                    </MaskText>
                    <SplitTextReveal
                        type="chars"
                        className={`text-[8vw] md:text-[6rem] font-bold tracking-tighter leading-none block bg-clip-text text-transparent bg-gradient-to-br ${isDark
                                ? 'from-white via-amber-200/50 to-amber-500/10'
                                : 'from-slate-900 via-amber-600 to-amber-200'
                            }`}
                    >
                        ACADEMY
                    </SplitTextReveal>
                    <div className="mt-8 max-w-xl">
                        <StaggeredText text="Mastering the multi-verse." className={`text-2xl leading-relaxed ${isDark ? 'text-amber-200/60' : 'text-amber-900/60'}`} delay={0.2} />
                    </div>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TiltCard className={`${isDark ? 'bg-gradient-to-br from-amber-900/20 to-black border-amber-500/20' : 'bg-white border-amber-200 shadow-xl'} min-h-[400px] cursor-scale`}>
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <Activity size={32} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                                <h3 className={`text-4xl font-medium mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Sandbox</h3>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard className={`${isDark ? 'bg-gradient-to-bl from-amber-900/20 to-black border-amber-500/20' : 'bg-white border-amber-200 shadow-xl'} min-h-[400px] cursor-scale`}>
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <Menu size={32} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                                <h3 className={`text-4xl font-medium mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Certification</h3>
                            </div>
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default EducationSection;
