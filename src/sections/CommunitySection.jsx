import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const CommunitySection = () => {
    const { isDark } = useTheme();

    return (
        <section id="community" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col items-end mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[8vw] md:text-[6rem] font-bold tracking-tighter leading-none text-right block text-transparent bg-clip-text bg-gradient-to-br ${isDark
                                ? 'from-white via-teal-200/50 to-teal-500/10'
                                : 'from-slate-900 via-teal-700 to-teal-200'
                            }`}
                    >
                        COLLECTIVE
                    </SplitTextReveal>
                    <div className="max-w-xl text-right mt-6">
                        <p className={`text-2xl leading-tight ${isDark ? 'text-teal-200/60' : 'text-teal-900/60'}`}>
                            Join 100,000+ architects building the future.
                        </p>
                    </div>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TiltCard className={`${isDark ? 'bg-teal-900/10' : 'bg-teal-50/80'} h-64 flex flex-col justify-center items-center`}>
                        <h3 className={`text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>100k+</h3>
                        <p className={isDark ? 'text-white/50' : 'text-slate-500'}>Architects</p>
                    </TiltCard>
                    <TiltCard className={`${isDark ? 'bg-teal-900/10' : 'bg-teal-50/80'} h-64 flex flex-col justify-center items-center`}>
                        <h3 className={`text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>3.5k</h3>
                        <p className={isDark ? 'text-white/50' : 'text-slate-500'}>Repositories</p>
                    </TiltCard>
                    <TiltCard className={`${isDark ? 'bg-teal-900/10' : 'bg-teal-50/80'} h-64 flex flex-col justify-center items-center`}>
                        <h3 className={`text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>250</h3>
                        <p className={isDark ? 'text-white/50' : 'text-slate-500'}>Partners</p>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default CommunitySection;
