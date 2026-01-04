import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const TiltCard = ({ children, className = "", colSpan = 1, rowSpan = 1 }) => {
    const { isDark } = useTheme();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const background = useMotionTemplate`radial-gradient(500px circle at ${x}px ${y}px, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}, transparent 80%)`;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };
    const baseStyle = isDark ? 'border-white/10 bg-black/40 hover:border-white/20' : 'border-black/5 bg-white/60 hover:border-black/10 shadow-lg shadow-black/5';

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden rounded-3xl border backdrop-blur-md transition-colors duration-500 cursor-scale will-animate ${baseStyle} ${colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'} ${rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1'} ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                style={{ background }}
            />
            <div className="relative h-full p-8 flex flex-col z-10" style={{ transform: "translateZ(20px)" }}>{children}</div>
        </motion.div>
    );
};

export default TiltCard;
