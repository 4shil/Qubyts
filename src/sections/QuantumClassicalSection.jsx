import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const QuantumClassicalSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="quantum-classical" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24 text-center">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        DUALITY
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 mx-auto ${isDark ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <TiltCard className={`p-12 ${isDark ? 'bg-black border-indigo-500/30' : 'bg-white border-indigo-300'}`}>
                        <h3 className={`text-3xl font-bold mb-4 tracking-brutal ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Classical</h3>
                        <ul className={`space-y-3 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                            <li className="flex items-center gap-3"><span className="text-2xl">0</span> or <span className="text-2xl">1</span></li>
                            <li>Deterministic operations</li>
                            <li>Sequential processing</li>
                            <li>Error-free at scale</li>
                        </ul>
                    </TiltCard>
                    <TiltCard className={`p-12 ${isDark ? 'bg-black border-indigo-500/30' : 'bg-white border-indigo-300'}`}>
                        <h3 className={`text-3xl font-bold mb-4 tracking-brutal ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Quantum</h3>
                        <ul className={`space-y-3 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                            <li className="flex items-center gap-3"><span className="text-2xl">|0⟩</span> + <span className="text-2xl">|1⟩</span></li>
                            <li>Probabilistic amplitudes</li>
                            <li>Parallel superposition</li>
                            <li>Error correction required</li>
                        </ul>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default QuantumClassicalSection;
