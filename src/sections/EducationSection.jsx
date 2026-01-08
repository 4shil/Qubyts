import { useTheme } from '../context/ThemeContext';
import { Activity, Menu } from 'lucide-react';
import MaskText from '../components/animations/MaskText';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import StaggeredText from '../components/animations/StaggeredText';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';
import MagneticButton from '../components/animations/MagneticButton';

const EducationSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="education" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24 md:w-2/3">
                    <MaskText>
                        <span className={`font-mono text-[10px] tracking-[0.4em] uppercase ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                            Knowledge Base
                        </span>
                    </MaskText>
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        ACADEMY
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-amber-500' : 'bg-amber-600'}`} />
                    <div className="mt-8 max-w-xl">
                        <StaggeredText text="Mastering the multi-verse." className={`text-xl leading-relaxed font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`} delay={0.2} />
                    </div>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TiltCard className="min-h-[400px]">
                        <div className="flex flex-col h-full justify-between p-8">
                            <Activity size={32} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                            <div>
                                <h3 className={`text-4xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>Sandbox</h3>
                                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>Interactive quantum simulations.</p>
                                <MagneticButton
                                    voidEffect="pulse"
                                    className={`mt-6 px-6 py-3 glass-dark rounded-full text-xs font-bold uppercase tracking-widest ${isDark ? 'text-amber-400 hover:bg-amber-500/10' : 'text-amber-700 hover:bg-amber-50'}`}
                                >
                                    Launch
                                </MagneticButton>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard className="min-h-[400px]">
                        <div className="flex flex-col h-full justify-between p-8">
                            <Menu size={32} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                            <div>
                                <h3 className={`text-4xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>Certification</h3>
                                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>Industry-recognized credentials.</p>
                                <MagneticButton
                                    voidEffect="explode"
                                    className={`mt-6 px-6 py-3 glass-dark rounded-full text-xs font-bold uppercase tracking-widest ${isDark ? 'text-amber-400 hover:bg-amber-500/10' : 'text-amber-700 hover:bg-amber-50'}`}
                                >
                                    Enroll
                                </MagneticButton>
                            </div>
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default EducationSection;
