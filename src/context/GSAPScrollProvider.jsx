import { useEffect, useRef, createContext, useContext, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollContext = createContext({
    currentSection: 0,
    totalSections: 11,
    scrollToSection: () => { },
});

export const useScrollContext = () => useContext(ScrollContext);

export const GSAPScrollProvider = ({ children }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const isScrolling = useRef(false);
    const sectionsRef = useRef([]);
    const totalSections = 11;

    useEffect(() => {
        // Get all sections
        const sections = gsap.utils.toArray('.section-snap');
        sectionsRef.current = sections;

        // Create scroll triggers for each section
        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    if (!isScrolling.current) {
                        setCurrentSection(i);
                    }
                },
                onEnterBack: () => {
                    if (!isScrolling.current) {
                        setCurrentSection(i);
                    }
                },
            });
        });

        // Scroll snap behavior
        let lastScrollTime = 0;
        let scrollTimeout;

        const handleWheel = (e) => {
            const now = Date.now();

            // Debounce to prevent rapid firing
            if (now - lastScrollTime < 100) return;
            lastScrollTime = now;

            // Clear existing timeout
            clearTimeout(scrollTimeout);

            // Set a timeout to snap after scroll stops
            scrollTimeout = setTimeout(() => {
                if (isScrolling.current) return;

                const currentScrollY = window.scrollY;
                const windowHeight = window.innerHeight;

                // Find the closest section
                let closestSection = 0;
                let closestDistance = Infinity;

                sections.forEach((section, i) => {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = currentScrollY + rect.top;
                    const distance = Math.abs(currentScrollY - sectionTop);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = i;
                    }
                });

                // Determine direction and snap
                const threshold = windowHeight * 0.2; // 20% of viewport

                if (e.deltaY > 0 && closestDistance > threshold) {
                    // Scrolling down - go to next section
                    snapToSection(Math.min(closestSection + 1, sections.length - 1));
                } else if (e.deltaY < 0 && closestDistance > threshold) {
                    // Scrolling up - go to previous section
                    snapToSection(Math.max(closestSection - 1, 0));
                } else {
                    // Snap to closest
                    snapToSection(closestSection);
                }
            }, 150);
        };

        const snapToSection = (index) => {
            if (isScrolling.current || index < 0 || index >= sections.length) return;

            isScrolling.current = true;
            setCurrentSection(index);

            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: sections[index],
                    autoKill: false,
                },
                ease: 'power3.inOut',
                onComplete: () => {
                    isScrolling.current = false;
                },
            });
        };

        // Touch handling for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe up - next section
                    snapToSection(Math.min(currentSection + 1, sections.length - 1));
                } else {
                    // Swipe down - previous section
                    snapToSection(Math.max(currentSection - 1, 0));
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            clearTimeout(scrollTimeout);
        };
    }, [currentSection]);

    const scrollToSection = (index) => {
        if (isScrolling.current || !sectionsRef.current[index]) return;

        isScrolling.current = true;
        setCurrentSection(index);

        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: sectionsRef.current[index],
                autoKill: false,
            },
            ease: 'power3.inOut',
            onComplete: () => {
                isScrolling.current = false;
            },
        });
    };

    return (
        <ScrollContext.Provider value={{ currentSection, totalSections, scrollToSection }}>
            {children}
        </ScrollContext.Provider>
    );
};

export default GSAPScrollProvider;
