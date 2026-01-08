import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import MagneticButton from '../components/animations/MagneticButton';

const ContactSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="contact" className="section-snap relative flex flex-col justify-center items-center px-6 md:px-12 text-center">
            <div className="max-w-3xl mx-auto">
                <SplitTextReveal
                    type="chars"
                    className={`text-[12vw] md:text-[7rem] font-bold tracking-brutal-tight leading-none text-parallax block ${isDark ? 'text-white' : 'text-slate-900'
                        }`}
                >
                    CHANNEL OPEN
                </SplitTextReveal>
                <div className={`w-24 h-[2px] mt-8 mx-auto ${isDark ? 'bg-white/30' : 'bg-black/30'}`} />
                <p className={`text-xl mt-8 font-light max-w-lg mx-auto ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                    Ready to enter the quantum realm? Let's architect the future together.
                </p>
                <div className="flex flex-wrap gap-6 justify-center mt-16 scale-110">
                    <MagneticButton
                        voidEffect="explode"
                        className={`px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-full ${isDark
                            ? 'glass-dark text-white hover:bg-white hover:text-black border-white/20'
                            : 'glass-light text-slate-900 hover:bg-black hover:text-white border-black/10'
                            }`}
                    >
                        Contact Sales
                    </MagneticButton>
                    <MagneticButton
                        voidEffect="pulse"
                        className={`px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-full ${isDark
                            ? 'bg-cyan-500 text-black hover:bg-white shadow-[0_0_30px_rgba(6,182,212,0.5)]'
                            : 'bg-cyan-600 text-white hover:bg-black shadow-[0_0_30px_rgba(8,145,178,0.3)]'
                            }`}
                    >
                        Join Waitlist
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
