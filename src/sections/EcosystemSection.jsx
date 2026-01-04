import { useTheme } from '../context/ThemeContext';
import { Terminal, Command, Network, Layers } from 'lucide-react';
import { GSAPTextReveal, GSAPStaggerCards } from '../components/animations/GSAPAnimations';
import TiltCard from '../components/animations/TiltCard';

const EcosystemSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="ecosystem" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24">
                    <GSAPTextReveal
                        className={`text-[8vw] md:text-[6rem] font-bold tracking-tighter leading-none block bg-clip-text text-transparent bg-gradient-to-br ${isDark
                                ? 'from-white via-indigo-200/50 to-indigo-500/10'
                                : 'from-slate-900 via-indigo-700 to-indigo-200'
                            }`}
                        stagger={0.05}
                    >
                        STACK
                    </GSAPTextReveal>
                    <p className={`text-2xl mt-4 ${isDark ? 'text-indigo-200/60' : 'text-indigo-900/60'}`}>
                        Native quantum languages.
                    </p>
                </div>
                <GSAPStaggerCards className="grid grid-cols-1 md:grid-cols-4 gap-6" stagger={0.1}>
                    <TiltCard className={`${isDark ? 'bg-indigo-900/10' : 'bg-indigo-50/80'} col-span-2 row-span-2 min-h-[400px]`}>
                        <div className="flex flex-col justify-between h-full">
                            <Terminal className="text-indigo-400 mb-4 transition-transform duration-500" size={48} />
                            <div>
                                <h3 className={`text-4xl font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Q-OS</h3>
                                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    Operating system built for entanglement natively.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard className={isDark ? 'bg-indigo-900/5' : 'bg-indigo-50/50'}>
                        <Command className="text-indigo-400 mb-4" />
                        <h3 className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Orbital</h3>
                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Hardware drivers.</p>
                    </TiltCard>
                    <TiltCard className={isDark ? 'bg-indigo-900/5' : 'bg-indigo-50/50'}>
                        <Network className="text-indigo-400 mb-4" />
                        <h3 className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Kernels</h3>
                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Virtualization.</p>
                    </TiltCard>
                    <TiltCard colSpan={2} className={isDark ? 'bg-indigo-900/5' : 'bg-indigo-50/50'}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>App Store</h3>
                            </div>
                            <Layers className="text-indigo-400" size={32} />
                        </div>
                    </TiltCard>
                </GSAPStaggerCards>
            </div>
        </section>
    );
};

export default EcosystemSection;
