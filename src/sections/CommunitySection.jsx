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
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none text-right block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        COLLECTIVE
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-teal-500' : 'bg-teal-600'}`} />
                    <div className="max-w-xl text-right mt-6">
                        <p className={`text-xl leading-tight font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                            Join 100,000+ architects building the future.
                        </p>
                    </div>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TiltCard className={`h-64 flex flex-col justify-center items-center ${isDark ? 'bg-black border-teal-500/50' : 'bg-white border-teal-300'}`}>
                        <h3 className={`text-6xl font-bold mb-2 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>100k+</h3>
                        <p className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Architects</p>
                    </TiltCard>
                    <TiltCard className={`h-64 flex flex-col justify-center items-center ${isDark ? 'bg-black border-teal-500/50' : 'bg-white border-teal-300'}`}>
                        <h3 className={`text-6xl font-bold mb-2 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>3.5k</h3>
                        <p className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Repositories</p>
                    </TiltCard>
                    <TiltCard className={`h-64 flex flex-col justify-center items-center ${isDark ? 'bg-black border-teal-500/50' : 'bg-white border-teal-300'}`}>
                        <h3 className={`text-6xl font-bold mb-2 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>250</h3>
                        <p className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Partners</p>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default CommunitySection;
