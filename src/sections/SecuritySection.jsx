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
                        className={`text-[8vw] md:text-[6rem] font-bold tracking-tighter text-white leading-none block text-right bg-clip-text text-transparent bg-gradient-to-br ${isDark
                                ? 'from-white via-orange-200/50 to-orange-500/10'
                                : 'from-slate-900 via-orange-700 to-orange-200'
                            }`}
                    >
                        FORTRESS
                    </SplitTextReveal>
                    <div className="max-w-xl text-right mt-6">
                        <p className={`text-2xl leading-tight ${isDark ? 'text-orange-200/60' : 'text-orange-900/60'}`}>
                            The end of codebreaking. Securing secrets against quantum decryption.
                        </p>
                    </div>
                </div>
                <ZoomContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TiltCard className={isDark ? 'bg-orange-900/10' : 'bg-orange-50/80'}>
                        <Lock className="text-orange-400 mb-6 transition-transform duration-500" size={48} />
                        <h3 className={`text-4xl font-medium mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Lattice Crypto</h3>
                        <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                            Mathematical puzzles unsolvable by qubits.
                        </p>
                    </TiltCard>
                    <TiltCard className={isDark ? 'bg-orange-900/10' : 'bg-orange-50/80'}>
                        <Shield className="text-orange-400 mb-6 transition-transform duration-500" size={48} />
                        <h3 className={`text-4xl font-medium mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>QRNG</h3>
                        <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                            True entropy derived from quantum fluctuations.
                        </p>
                    </TiltCard>
                </ZoomContainer>
            </div>
        </section>
    );
};

export default SecuritySection;
