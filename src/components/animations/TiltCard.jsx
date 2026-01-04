import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const TiltCard = ({ children, className = "", colSpan = 1, rowSpan = 1 }) => {
    const { isDark } = useTheme();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const spotlight = useMotionTemplate`radial-gradient(400px circle at ${x}px ${y}px, ${isDark ? 'rgba(0,243,255,0.15)' : 'rgba(79,70,229,0.1)'}, transparent 60%)`;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => { x.set(200); y.set(200); };

    const baseStyle = isDark
        ? 'border-white/10 bg-black/50 hover:border-cyan-500/30'
        : 'border-black/5 bg-white/70 hover:border-cyan-500/40 shadow-lg shadow-black/5';

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative overflow-hidden border backdrop-blur-md transition-all duration-300 cursor-scale will-animate card-hover ${baseStyle} ${colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'} ${rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1'} ${className}`}
        >
            {/* Spotlight effect on hover */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
                style={{ background: spotlight }}
            />
            {/* Content with 3D lift */}
            <div className="relative h-full flex flex-col z-10" style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export default TiltCard;
