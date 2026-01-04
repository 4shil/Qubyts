import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import MagneticButton from '../components/animations/MagneticButton';

const ContactSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="contact" className="section-snap relative min-h-screen py-32 px-6 flex flex-col justify-center items-center">
            <div className="max-w-4xl w-full text-center">
                {/* Brutalist Title */}
                <SplitTextReveal
                    type="chars"
                    className={`text-[18vw] md:text-[12rem] font-bold tracking-brutal-tight mb-8 leading-[0.8] block ${isDark
                            ? 'text-white'
                            : 'text-slate-900'
                        }`}
                >
                    ENGAGE
                </SplitTextReveal>

                {/* Accent Line */}
                <div className={`w-24 h-[3px] mx-auto mb-12 ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />

                {/* CTAs with 3D Effects */}
                <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
                    <MagneticButton
                        voidEffect="explode"
                        className={`px-12 py-6 text-lg font-bold tracking-tight brutalist-shadow ${isDark ? 'bg-white text-black hover:bg-cyan-400' : 'bg-black text-white hover:bg-cyan-600'}`}
                    >
                        Contact Sales
                    </MagneticButton>
                    <MagneticButton
                        voidEffect="pulse"
                        className={`px-12 py-6 text-lg font-bold tracking-tight brutalist-border ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
                    >
                        Join Network
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
