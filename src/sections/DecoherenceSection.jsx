import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import ZoomContainer from '../components/animations/ZoomContainer';

const DecoherenceSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="decoherence" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col items-start mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        FRAGILE
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-pink-500' : 'bg-pink-600'}`} />
                    <p className={`text-xl mt-6 max-w-xl font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                        Understanding the boundary where quantum meets classical.
                    </p>
                </div>
                <ZoomContainer className="max-w-4xl">
                    <div className={`p-12 brutalist-border ${isDark ? 'bg-black border-pink-500/30' : 'bg-white border-pink-300'}`}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <p className={`text-4xl font-bold font-mono ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>1ms</p>
                                <p className={`text-xs mt-2 font-mono uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-500'}`}>T1 Time</p>
                            </div>
                            <div className="text-center">
                                <p className={`text-4xl font-bold font-mono ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>500μs</p>
                                <p className={`text-xs mt-2 font-mono uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-500'}`}>T2 Time</p>
                            </div>
                            <div className="text-center">
                                <p className={`text-4xl font-bold font-mono ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>15mK</p>
                                <p className={`text-xs mt-2 font-mono uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Operating Temp</p>
                            </div>
                            <div className="text-center">
                                <p className={`text-4xl font-bold font-mono ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>99.9%</p>
                                <p className={`text-xs mt-2 font-mono uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Fidelity</p>
                            </div>
                        </div>
                        <div className={`w-full h-[1px] my-8 ${isDark ? 'bg-pink-500/20' : 'bg-pink-200'}`} />
                        <p className={`text-center text-lg font-light ${isDark ? 'text-white/50' : 'text-slate-600'}`}>
                            Fighting entropy at the edge of physics
                        </p>
                    </div>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default DecoherenceSection;
