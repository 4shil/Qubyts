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
                <div className="flex gap-4 justify-center mt-12">
                    <MagneticButton
                        voidEffect="explode"
                        className={`px-8 py-4 brutalist-border text-xs font-bold uppercase tracking-widest ${isDark
                                ? 'border-white text-white hover:bg-white hover:text-black'
                                : 'border-black text-black hover:bg-black hover:text-white'
                            }`}
                    >
                        Contact Sales
                    </MagneticButton>
                    <MagneticButton
                        voidEffect="pulse"
                        className={`px-8 py-4 text-xs font-bold uppercase tracking-widest ${isDark
                                ? 'bg-white text-black hover:bg-cyan-400'
                                : 'bg-black text-white hover:bg-cyan-600'
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
