import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CustomCursor = () => {
    const { isDark } = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [hoverType, setHoverType] = useState('default');
    const [isVisible, setIsVisible] = useState(false);

    // Precise position (for the dot)
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth position (for the ring) - Tightened for real-time response
    const smoothX = useSpring(mouseX, { stiffness: 600, damping: 40, mass: 0.2 });
    const smoothY = useSpring(mouseY, { stiffness: 600, damping: 40, mass: 0.2 });

    useEffect(() => {
        // Hide if touch device
        if (window.matchMedia('(hover: none)').matches) return;

        const onMouseMove = (e) => {
            // ALWAYS update state
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            const target = e.target;
            if (!target) return;

            const interactive = target.closest('button') ||
                target.closest('a') ||
                target.closest('.cursor-scale') ||
                target.closest('.group');

            const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

            setIsHovering(!!interactive || isInput);
            setHoverType(isInput ? 'text' : (interactive ? 'pointer' : 'default'));
        };

        const onMouseDown = () => setIsMouseDown(true);
        const onMouseUp = () => setIsMouseDown(false);
        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
        return null;
    }

    return (
        <>
            {/* The Dot (Instant Follow) */}
            <motion.div
                className={`fixed top-0 left-0 rounded-full pointer-events-none z-[10000] ${isDark ? 'bg-white' : 'bg-black'
                    }`}
                style={{
                    x: mouseX,
                    y: mouseY,
                    xPercent: -50,
                    yPercent: -50,
                    width: hoverType === 'text' ? '2px' : '6px',
                    height: hoverType === 'text' ? '20px' : '6px',
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isMouseDown ? 0.8 : (isHovering && hoverType !== 'text' ? 0 : 1),
                }}
                transition={{ opacity: { duration: 0.2 } }}
            />

            {/* The Ring (Spring Follow) */}
            <motion.div
                className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] ${isDark ? 'border-white/50' : 'border-black/50'
                    }`}
                style={{
                    x: smoothX,
                    y: smoothY,
                    xPercent: -50,
                    yPercent: -50,
                    width: '40px',
                    height: '40px'
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? (hoverType === 'text' ? 0.4 : 1.5) : 0.8,
                    borderWidth: isMouseDown ? '2px' : '1px',
                    borderColor: isMouseDown ? (isDark ? '#fff' : '#000') : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
                    backgroundColor: isHovering && hoverType !== 'text'
                        ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
                        : 'rgba(0,0,0,0)',
                }}
                transition={{
                    opacity: { duration: 0.2 },
                    scale: { type: 'spring', stiffness: 300, damping: 20 }
                }}
            />

            {/* Click Ripple effect */}
            <AnimatePresence>
                {isMouseDown && (
                    <motion.div
                        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border-2 ${isDark ? 'border-cyan-400' : 'border-cyan-600'
                            }`}
                        initial={{
                            x: mouseX.get(),
                            y: mouseY.get(),
                            xPercent: -50,
                            yPercent: -50,
                            scale: 0.5,
                            opacity: 0.8,
                            width: 40,
                            height: 40
                        }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default CustomCursor;
