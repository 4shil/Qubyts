import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import MagneticButton from '../components/animations/MagneticButton';
import useAppStore from '../store/useAppStore';

const ShutdownSection = () => {
    const { isDark } = useTheme();
    const { navigateTo } = useAppStore();

    return (
        <section id="shutdown" className="section-snap relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 text-center">
            <div className="max-w-3xl mx-auto">
                <SplitTextReveal
                    type="chars"
                    className={`text-[15vw] md:text-[10rem] font-bold tracking-brutal-tight leading-none text-parallax block ${isDark ? 'text-white' : 'text-slate-900'}`}
                >
                    END
                </SplitTextReveal>
                <div className={`w-16 h-[2px] mt-8 mx-auto ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
                <p className={`text-xl mt-8 font-light max-w-lg mx-auto ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                    The singularity awaits. Are you ready to collapse the wave function?
                </p>
                <div className="flex gap-4 justify-center mt-12">
                    <MagneticButton
                        onClick={() => navigateTo(0)}
                        voidEffect="collapse"
                        className={`px-8 py-4 text-xs font-bold uppercase tracking-widest ${isDark
                            ? 'bg-white text-black hover:bg-cyan-400'
                            : 'bg-black text-white hover:bg-cyan-600'
                            }`}
                    >
                        Restart Sequence
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

export default ShutdownSection;
