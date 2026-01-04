import { useTheme } from '../context/ThemeContext';
import SplitTextReveal from '../components/animations/SplitTextReveal';
import MagneticButton from '../components/animations/MagneticButton';

const ContactSection = () => {
    const { isDark } = useTheme();

    return (
        <section id="contact" className="section-snap relative min-h-screen py-32 px-6 flex flex-col justify-center items-center">
            <div className="max-w-4xl w-full text-center">
                <SplitTextReveal
                    type="chars"
                    className={`text-[15vw] font-bold tracking-tighter mb-8 leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-b ${isDark
                            ? 'from-white via-white/50 to-white/10'
                            : 'from-slate-900 via-slate-600 to-slate-400'
                        }`}
                >
                    ENGAGE
                </SplitTextReveal>
                <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
                    <MagneticButton className={`px-12 py-6 text-lg font-bold tracking-tight rounded-full ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        Contact Sales
                    </MagneticButton>
                    <MagneticButton className={`px-12 py-6 text-lg font-bold tracking-tight rounded-full border ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}>
                        Join Network
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
