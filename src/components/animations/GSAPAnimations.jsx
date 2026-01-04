import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// GSAP Text Reveal - Characters split and animate in
export const GSAPTextReveal = ({ children, className = "", delay = 0, stagger = 0.03 }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        const text = textRef.current.innerText;
        const chars = text.split('');

        // Clear and rebuild with spans
        textRef.current.innerHTML = '';
        chars.forEach((char) => {
            const span = document.createElement('span');
            span.className = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100px) rotateX(90deg)';
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            textRef.current.appendChild(span);
        });

        const charElements = textRef.current.querySelectorAll('span');

        gsap.to(charElements, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: stagger,
            delay: delay,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [delay, stagger]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={textRef} className="inline-block" style={{ perspective: '1000px' }}>
                {children}
            </div>
        </div>
    );
};

// GSAP Word Reveal - Words animate in with blur
export const GSAPWordReveal = ({ children, className = "", delay = 0 }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        const text = textRef.current.innerText;
        const words = text.split(' ');

        // Clear and rebuild with spans
        textRef.current.innerHTML = '';
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.className = 'inline-block mr-[0.25em]';
            span.style.opacity = '0';
            span.style.transform = 'translateY(40px)';
            span.style.filter = 'blur(10px)';
            span.innerText = word;
            textRef.current.appendChild(span);
        });

        const wordElements = textRef.current.querySelectorAll('span');

        gsap.to(wordElements, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            stagger: 0.05,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [delay]);

    return (
        <div ref={containerRef} className={className}>
            <div ref={textRef} className="flex flex-wrap">
                {children}
            </div>
        </div>
    );
};

// GSAP Line Reveal - Lines slide up with mask
export const GSAPLineReveal = ({ children, className = "", delay = 0 }) => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        if (!lineRef.current) return;

        gsap.fromTo(lineRef.current,
            {
                y: '100%',
                opacity: 0,
            },
            {
                y: '0%',
                opacity: 1,
                duration: 1,
                delay: delay,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [delay]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={lineRef}>
                {children}
            </div>
        </div>
    );
};

// GSAP Scale Reveal - Elements scale in with fade
export const GSAPScaleReveal = ({ children, className = "", delay = 0 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.fromTo(containerRef.current,
            {
                scale: 0.8,
                opacity: 0,
                filter: 'blur(20px)',
            },
            {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                delay: delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [delay]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

// GSAP Stagger Cards - Cards animate in with stagger
export const GSAPStaggerCards = ({ children, className = "", stagger = 0.1 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const cards = containerRef.current.children;

        gsap.fromTo(cards,
            {
                y: 80,
                opacity: 0,
                scale: 0.9,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: stagger,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [stagger]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

// GSAP Parallax - Element moves at different speed
export const GSAPParallax = ({ children, className = "", speed = 0.5 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.to(containerRef.current, {
            y: () => -100 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [speed]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};
