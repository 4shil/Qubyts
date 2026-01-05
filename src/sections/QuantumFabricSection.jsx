import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const QuantumFabricSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="quantum-fabric" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24 text-center">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        ENTANGLED
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 mx-auto ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
                    <p className={`text-xl mt-6 max-w-2xl mx-auto font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                        Weaving reality through quantum correlations that transcend spacetime.
                    </p>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TiltCard className={`h-64 flex flex-col justify-center items-center brutalist-border ${isDark ? 'bg-black border-cyan-500/50' : 'bg-white border-cyan-300'}`}>
                        <h3 className={`text-5xl font-bold mb-2 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>∞</h3>
                        <p className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-cyan-400/60' : 'text-cyan-600'}`}>Entanglement</p>
                    </TiltCard>
                    <TiltCard className={`h-64 flex flex-col justify-center items-center brutalist-border ${isDark ? 'bg-black border-cyan-500/50' : 'bg-white border-cyan-300'}`}>
                        <h3 className={`text-5xl font-bold mb-2 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>10⁹</h3>
                        <p className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-cyan-400/60' : 'text-cyan-600'}`}>Qubits Linked</p>
                    </TiltCard>
                    <TiltCard className={`h-64 flex flex-col justify-center items-center brutalist-border ${isDark ? 'bg-black border-cyan-500/50' : 'bg-white border-cyan-300'}`}>
                        <h3 className={`text-5xl font-bold mb-2 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>0</h3>
                        <p className={`text-sm font-mono uppercase tracking-widest ${isDark ? 'text-cyan-400/60' : 'text-cyan-600'}`}>Latency</p>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default QuantumFabricSection;
