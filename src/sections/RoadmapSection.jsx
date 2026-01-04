import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import ZoomContainer from '../components/animations/ZoomContainer';

const RoadmapSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="roadmap" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24 text-center">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[8vw] md:text-[6rem] font-bold tracking-tighter leading-none block text-transparent bg-clip-text bg-gradient-to-br ${isDark
                                ? 'from-white via-fuchsia-200/50 to-fuchsia-500/10'
                                : 'from-slate-900 via-fuchsia-700 to-fuchsia-200'
                            }`}
                    >
                        EVOLUTION
                    </SplitTextReveal>
                </div>
                <div className="space-y-4 max-w-4xl mx-auto">
                    {[
                        { year: '2026', title: 'Quantum Cloud', desc: 'First globally distributed QPU network.' },
                        { year: '2027', title: 'Logical Qubits', desc: 'Perfect error correction achieved.' },
                        { year: '2029', title: 'Universal Solver', desc: 'Solving optimization problems instantly.' },
                        { year: '2032', title: 'Singularity', desc: 'General purpose quantum AI.' }
                    ].map((item, i) => (
                        <ZoomContainer key={item.year} className={`flex items-center gap-8 p-8 border backdrop-blur-sm rounded-2xl transition-colors ${isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-black/5 bg-white/60 hover:bg-white/80'}`}>
                            <span className={`text-5xl font-bold text-fuchsia-500 font-mono w-32`}>{item.year}</span>
                            <div className="flex-1">
                                <h4 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                                <p className={`text-lg ${isDark ? 'text-white/50' : 'text-slate-600'}`}>{item.desc}</p>
                            </div>
                        </ZoomContainer>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoadmapSection;
