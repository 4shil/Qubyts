import { useTheme } from '../context/ThemeContext';
import { Lock, Shield } from 'lucide-react';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import TiltCard from '../components/animations/TiltCard';
import ZoomContainer from '../components/animations/ZoomContainer';

const SecuritySection = () => {
    const { isDark } = useTheme();

    return (
        <section id="security" className="section-snap relative min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col items-end mb-24">
                    <SplitTextReveal
                        type="chars"
                        className={`text-[12vw] md:text-[8rem] font-bold tracking-brutal-tight leading-none text-right block ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        FORTRESS
                    </SplitTextReveal>
                    <div className={`w-24 h-[3px] mt-4 ${isDark ? 'bg-orange-500' : 'bg-orange-600'}`} />
                    <div className="max-w-xl text-right mt-6">
                        <p className={`text-xl leading-tight font-light ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                            The end of codebreaking. Securing secrets against quantum decryption.
                        </p>
                    </div>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TiltCard className="min-h-[300px]">
                        <div className="p-8 h-full flex flex-col justify-between">
                            <Lock className="text-orange-400" size={40} />
                            <div>
                                <h3 className={`text-4xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>Lattice Crypto</h3>
                                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    Mathematical puzzles unsolvable by qubits.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                    <TiltCard className="min-h-[300px]">
                        <div className="p-8 h-full flex flex-col justify-between">
                            <Shield className="text-orange-400" size={40} />
                            <div>
                                <h3 className={`text-4xl font-bold mb-4 tracking-brutal ${isDark ? 'text-white' : 'text-slate-900'}`}>QRNG</h3>
                                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    True entropy derived from quantum fluctuations.
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default SecuritySection;
