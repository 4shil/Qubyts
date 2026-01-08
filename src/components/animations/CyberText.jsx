import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';

/**
 * CyberText - A GSAP-animated text component with cyberpunk/Japanese styling.
 * Features character-by-character reveal and optional glitch effect.
 */
const CyberText = ({
    children,
    className = '',
    as: Tag = 'span',
    delay = 0,
    stagger = 0.03,
    glitch = false,
    vertical = false,
    japanese = null // Optional Japanese translation text
}) => {
    const { isDark } = useTheme();
    const textRef = useRef(null);
    const japaneseRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        const chars = textRef.current.querySelectorAll('.cyber-char');

        gsap.fromTo(chars,
            {
                opacity: 0,
                y: 20,
                rotateX: -90,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: 'blur(0px)',
                duration: 0.6,
                stagger: stagger,
                delay: delay,
                ease: 'power3.out'
            }
        );

        // Japanese text animation
        if (japaneseRef.current) {
            const jpChars = japaneseRef.current.querySelectorAll('.jp-char');
            gsap.fromTo(jpChars,
                { opacity: 0, x: -10 },
                {
                    opacity: 0.4,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    delay: delay + 0.3,
                    ease: 'power2.out'
                }
            );
        }
    }, [delay, stagger]);

    // Split text into characters
    const text = typeof children === 'string' ? children : '';
    const chars = text.split('');

    return (
        <Tag
            ref={textRef}
            className={`inline-block ${vertical ? 'text-vertical' : ''} ${className}`}
            style={{ perspective: '1000px' }}
        >
            {chars.map((char, i) => (
                <span
                    key={i}
                    className={`cyber-char inline-block ${glitch ? 'hover:text-chromatic' : ''}`}
                    data-text={char}
                    style={{
                        transformStyle: 'preserve-3d',
                        display: char === ' ' ? 'inline' : 'inline-block',
                        minWidth: char === ' ' ? '0.3em' : 'auto'
                    }}
                >
                    {char}
                </span>
            ))}
            {japanese && (
                <span
                    ref={japaneseRef}
                    className={`block text-jp text-sm mt-2 ${isDark ? 'text-cyan-500/40' : 'text-indigo-500/40'}`}
                >
                    {japanese.split('').map((char, i) => (
                        <span key={i} className="jp-char inline-block">
                            {char}
                        </span>
                    ))}
                </span>
            )}
        </Tag>
    );
};

export default CyberText;
