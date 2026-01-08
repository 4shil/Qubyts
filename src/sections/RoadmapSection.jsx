import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import ZoomContainer from '../components/animations/ZoomContainer';

const RoadmapSection = () => {
    const { isDark } = useTheme();

    const milestones = [
        { year: '2026', title: 'Quantum Cloud', desc: 'First globally distributed QPU network.' },
        { year: '2027', title: 'Logical Qubits', desc: 'Perfect error correction achieved.' },
        { year: '2029', title: 'Universal Solver', desc: 'Solving optimization problems instantly.' },
        { year: '2032', title: 'Singularity', desc: 'General purpose quantum AI.' }
    ];

    return (
        <section id="roadmap" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24 text-center">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        EVOLUTION
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 mx-auto ${isDark ? 'bg-fuchsia-500' : 'bg-fuchsia-600'}`} />
                </div>
                <div className="space-y-4 max-w-4xl mx-auto">
                    {milestones.map((item, i) => (
                        <ZoomContainer
                            key={item.year}
                            className={`flex items-center gap-8 p-8 transition-colors ${isDark
                                    ? 'border-white/10 bg-black hover:border-fuchsia-500/50'
                                    : 'border-black/10 bg-white hover:border-fuchsia-500'
                                }`}
                        >
                            <span className={`text-5xl font-bold font-mono w-32 tracking-brutal ${isDark ? 'text-fuchsia-500' : 'text-fuchsia-600'}`}>{item.year}</span>
                            <div className="flex-1">
                                <h4 className={`text-2xl font-bold mb-1 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
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
