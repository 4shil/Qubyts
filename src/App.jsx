import { useState, useEffect, useCallback, useRef, lazy, Suspense, useMemo } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NOISE_SVG } from './components/VoidScene/config';
import useAppStore from './store/useAppStore';

// Lazy load heavy components
const VoidScene = lazy(() => import('./components/VoidScene'));
const LiquidEther = lazy(() => import('./components/LiquidEther'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const GeminiTerminal = lazy(() => import('./components/GeminiTerminal'));

// Immediate load for critical UI
import CustomCursor from './components/CustomCursor';
import MicroNav from './components/MicroNav';
import ScrollProgress from './components/ScrollProgress';

// Lazy load sections for code splitting
const HomeSection = lazy(() => import('./sections/HomeSection'));
const PhilosophySection = lazy(() => import('./sections/PhilosophySection'));
const HardwareSection = lazy(() => import('./sections/HardwareSection'));
const QOSSection = lazy(() => import('./sections/QOSSection'));
const DeveloperSection = lazy(() => import('./sections/DeveloperSection'));
const CloudSection = lazy(() => import('./sections/CloudSection'));
const SecuritySection = lazy(() => import('./sections/SecuritySection'));
const ResearchSection = lazy(() => import('./sections/ResearchSection'));
const ApplicationsSection = lazy(() => import('./sections/ApplicationsSection'));
const RoadmapSection = lazy(() => import('./sections/RoadmapSection'));
const CommunitySection = lazy(() => import('./sections/CommunitySection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const Footer = lazy(() => import('./sections/Footer'));

// Minimal loading fallback
const SectionLoader = () => <div className="section-snap" />;

const AppContent = () => {
    console.log("[App v2.0] Mounting with performance optimizations...");
    const containerRef = useRef(null);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const { isDark } = useTheme();
    const [isSceneReady, setIsSceneReady] = useState(false);

    const {
        currentSection,
        setCurrentSection,
        navigateNext,
        navigatePrev,
        isScrollLocked,
        sections
    } = useAppStore();

    const handleSceneReady = useCallback(() => {
        console.log("[App v2.0] Scene ready");
        setIsSceneReady(true);
    }, []);

    // Safety timeout
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            if (!isSceneReady) {
                console.warn("[App v2.0] Scene timeout, forcing ready.");
                handleSceneReady();
            }
        }, 3000);
        return () => clearTimeout(safetyTimer);
    }, [isSceneReady, handleSceneReady]);

    // Hide loader
    useEffect(() => {
        if (isSceneReady) {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => { loader.style.display = 'none'; }, 500);
            }
        }
    }, [isSceneReady]);

    // Keyboard navigation - memoized handler
    const handleKeyDown = useCallback((e) => {
        if (isScrollLocked) return;
        if (useAppStore.getState().commandPaletteOpen) return;

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
            case ' ':
                e.preventDefault();
                navigateNext();
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                navigatePrev();
                break;
            default:
                break;
        }
    }, [navigateNext, navigatePrev, isScrollLocked]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Wheel navigation - throttled
    useEffect(() => {
        let wheelTimeout = null;
        let lastWheelTime = 0;

        const handleWheel = (e) => {
            const now = performance.now();
            if (now - lastWheelTime < 600) return;

            if (isScrollLocked) {
                e.preventDefault();
                return;
            }

            if (e.deltaY > 30) {
                lastWheelTime = now;
                navigateNext();
            } else if (e.deltaY < -30) {
                lastWheelTime = now;
                navigatePrev();
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [navigateNext, navigatePrev, isScrollLocked]);

    // Intersection observer - memoized
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        const index = sections.findIndex(s => s.id === sectionId);
                        if (index !== -1 && index !== currentSection) {
                            setCurrentSection(index);
                        }
                    }
                });
            },
            { threshold: 0.5, root: container }
        );

        sections.forEach(section => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections, currentSection, setCurrentSection]);

    // Memoized LiquidEther config
    const liquidEtherConfig = useMemo(() => ({
        colors: ['#5227FF', '#FF9FFC', '#B19EEF'],
        mouseForce: 43,
        cursorSize: 65,
        viscous: 26,
        iterationsPoisson: 6,
        resolution: 0.3,
        isBounce: true,
        autoSpeed: 0.25,
        autoIntensity: 3
    }), []);

    return (
        <div className={`grain-overlay ${isDark ? 'bg-[#020202] text-white' : 'bg-[#FAFAFA] text-slate-900'}`}>
            {/* LiquidEther Fluid Background */}
            <div className="fixed inset-0 z-0">
                <Suspense fallback={null}>
                    <LiquidEther {...liquidEtherConfig} />
                </Suspense>
            </div>

            {/* 3D Particle System */}
            <Suspense fallback={null}>
                <VoidScene currentSection={currentSection} onReady={handleSceneReady} />
            </Suspense>

            {/* Noise overlay */}
            <div
                className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-15"
                style={{ backgroundImage: `url("${NOISE_SVG}")` }}
            />

            {/* Navigation - Critical, not lazy */}
            <MicroNav />
            <ScrollProgress />

            {/* Command Palette - Lazy */}
            <Suspense fallback={null}>
                <CommandPalette />
            </Suspense>

            {/* Custom cursor */}
            <CustomCursor />

            {/* Terminal Modal - Lazy */}
            <Suspense fallback={null}>
                <GeminiTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
            </Suspense>

            {/* Main Content - All sections lazy loaded */}
            <div ref={containerRef} className="snap-container">
                <Suspense fallback={<SectionLoader />}>
                    <HomeSection />
                    <PhilosophySection />
                    <HardwareSection />
                    <QOSSection />
                    <DeveloperSection />
                    <CloudSection />
                    <SecuritySection />
                    <ResearchSection />
                    <ApplicationsSection />
                    <RoadmapSection />
                    <CommunitySection />
                    <ContactSection />
                    <Footer />
                </Suspense>
            </div>
        </div>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
