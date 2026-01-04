import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useVoidScene } from '../VoidScene/context';

const MagneticButton = ({ children, className = "", onClick, voidEffect }) => {
    const ref = useRef(null);
    const { triggerEffect } = useVoidScene();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        if (!ref.current || !e) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.4);
        y.set((clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    const handleClick = (e) => {
        if (voidEffect) {
            triggerEffect(voidEffect);
        }
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <motion.button
            ref={ref}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`relative cursor-scale will-animate glow-hover focus-ring ${className}`}
            whileTap={{ scale: 0.97 }}
        >
            {children}
        </motion.button>
    );
};

export default MagneticButton;
