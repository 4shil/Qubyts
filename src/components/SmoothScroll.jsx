import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        if (typeof Lenis === 'undefined') return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true
        });
        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
        }
    }, []);

    return <div className="w-full relative z-10 overflow-x-hidden">{children}</div>;
};

export default SmoothScroll;
