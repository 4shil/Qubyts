import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import ZoomContainer from '../components/animations/ZoomContainer';
import TiltCard from '../components/animations/TiltCard';

const EthicsSection = () => {
    const { isDark } = useTheme();

    const principles = [
        { title: 'Transparency', desc: 'Open algorithms, auditable decisions.' },
        { title: 'Security', desc: 'Quantum-safe encryption for all.' },
        { title: 'Equity', desc: 'Democratizing computational power.' }
    ];

    return (
        <section id="ethics" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col items-end mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none text-right block ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        ETHICS
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-amber-400' : 'bg-amber-600'}`} />
                    <p className={`text-xl mt-6 max-w-xl text-right font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                        Building tomorrow's technology with today's responsibility.
                    </p>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {principles.map((item) => (
                        <TiltCard
                            key={item.title}
                            className={`p-8 brutalist-border ${isDark ? 'bg-black border-amber-500/30' : 'bg-white border-amber-300'}`}
                        >
                            <h4 className={`text-2xl font-bold mb-3 tracking-brutal ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                                {item.title}
                            </h4>
                            <p className={`text-lg ${isDark ? 'text-white/50' : 'text-slate-600'}`}>
                                {item.desc}
                            </p>
                        </TiltCard>
                    ))}
                </ZoomContainer>
            </div>
        </section>
    );
};

export default EthicsSection;
