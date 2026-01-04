import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
    const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

    useEffect(() => {
        const onMouseMove = (e) => {
            if (!e) return;
            const target = e.target;
            const isInteractive =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.cursor-scale') ||
                target.closest('.group') ||
                target.tagName === 'INPUT';
            setIsHovering(!!isInteractive);
            if (isInteractive) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <>
            <motion.div
                className="cursor-dot fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] bg-white"
                style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
                animate={{ scale: isHovering ? 0 : 1 }}
            />
            <motion.div
                className="cursor-ring fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[9998] border-white"
                style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: isHovering ? 1.5 : 0.5,
                    opacity: isHovering ? 1 : 0.5,
                    borderWidth: isHovering ? '1px' : '2px',
                    backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
                }}
            />
        </>
    );
};

export default CustomCursor;
