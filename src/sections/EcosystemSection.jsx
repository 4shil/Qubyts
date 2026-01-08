import { useTheme } from '../context/ThemeContext';
import { Terminal, Command, Network, Layers } from 'lucide-react';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const EcosystemSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="ecosystem" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        STACK
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'}`} />
                    <p className={`text-xl mt-6 font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                        Native quantum languages.
                    </p>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <TiltCard className="col-span-2 row-span-2 min-h-[400px]">
                        <div className="flex flex-col justify-between h-full p-8">
                            <Terminal className="text-indigo-400" size={40} />
                            <div>
                                <h3 className={`text-4xl font-bold mb-2 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>Q-OS</h3>
                                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    Operating system built for entanglement natively.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard className="p-6">
                        <Command className="text-indigo-400 mb-4" size={24} />
                        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Orbital</h3>
                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Hardware drivers.</p>
                    </TiltCard>
                    <TiltCard className="p-6">
                        <Network className="text-indigo-400 mb-4" size={24} />
                        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Kernels</h3>
                        <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Virtualization.</p>
                    </TiltCard>
                    <TiltCard colSpan={2} className="p-6">
                        <div className="flex items-center justify-between">
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>App Store</h3>
                            <Layers className="text-indigo-400" size={24} />
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default EcosystemSection;
