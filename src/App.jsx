import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NOISE_SVG, getSectionColors } from './components/VoidScene/config';
import useAppStore from './store/useAppStore';
import Lenis from '@studio-freight/lenis';

// EAGER LOAD ALL COMPONENTS - No lazy loading
import VoidScene from './components/VoidScene';
import LiquidEther from './components/LiquidEther';
import CommandPalette from './components/CommandPalette';
import GeminiTerminal from './components/GeminiTerminal';
import CustomCursor from './components/CustomCursor';
import MicroNav from './components/MicroNav';
import ScrollProgress from './components/ScrollProgress';

// PRELOAD all sections
import HomeSection from './sections/HomeSection';
import PhilosophySection from './sections/PhilosophySection';
import HardwareSection from './sections/HardwareSection';
import QOSSection from './sections/QOSSection';
import DeveloperSection from './sections/DeveloperSection';
import CloudSection from './sections/CloudSection';
import SecuritySection from './sections/SecuritySection';
import ResearchSection from './sections/ResearchSection';
import ApplicationsSection from './sections/ApplicationsSection';
import RoadmapSection from './sections/RoadmapSection';
import CommunitySection from './sections/CommunitySection';
import ContactSection from './sections/ContactSection';
import QuantumFabricSection from './sections/QuantumFabricSection';
import DecoherenceSection from './sections/DecoherenceSection';
import QuantumClassicalSection from './sections/QuantumClassicalSection';
import EthicsSection from './sections/EthicsSection';
import ShutdownSection from './sections/ShutdownSection';
import Footer from './sections/Footer';

const AppContent = () => {
    console.log("[App v2.0] All components eagerly loaded...");
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

    // Keyboard navigation
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

    // Wheel navigation - smooth scroll
    useEffect(() => {
        let isScrolling = false;

        const handleWheel = (e) => {
            if (isScrollLocked || isScrolling) {
                e.preventDefault();
                return;
            }

            const threshold = 50;
            if (Math.abs(e.deltaY) < threshold) return;

            isScrolling = true;
            e.preventDefault();

            let targetIndex = currentSection;
            if (e.deltaY > 0 && currentSection < sections.length - 1) {
                targetIndex = currentSection + 1;
            } else if (e.deltaY < 0 && currentSection > 0) {
                targetIndex = currentSection - 1;
            }

            if (targetIndex !== currentSection) {
                const targetEl = document.getElementById(sections[targetIndex].id);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setCurrentSection(targetIndex);
                }
            }

            setTimeout(() => {
                isScrolling = false;
            }, 800);
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
    }, [isScrollLocked, currentSection, sections, setCurrentSection]);

    // Intersection observer
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

    // Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            wrapper: containerRef.current,
            content: containerRef.current,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    // LiquidEther colors - direct from currentSection (lerping happens inside LiquidEther)
    const liquidEtherColors = useMemo(() => {
        return getSectionColors(currentSection);
    }, [currentSection]);

    return (
        <div className={`grain-overlay ${isDark ? 'bg-[#020202] text-white' : 'bg-[#FAFAFA] text-slate-900'}`}>
            {/* LiquidEther Fluid Background */}
            <div className="fixed inset-0 z-0">
                <LiquidEther
                    colors={liquidEtherColors}
                    mouseForce={30}
                    cursorSize={50}
                    viscous={20}
                    iterationsPoisson={4}
                    resolution={0.2}
                    isBounce
                    autoSpeed={0.2}
                    autoIntensity={2}
                />
            </div>

            {/* 3D Particle System */}
            <VoidScene currentSection={currentSection} onReady={handleSceneReady} />

            {/* Noise overlay */}
            <div
                className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-15"
                style={{ backgroundImage: `url("${NOISE_SVG}")` }}
            />

            {/* Navigation */}
            <MicroNav />
            <ScrollProgress />
            <CommandPalette />

            {/* Custom cursor */}
            <CustomCursor />

            {/* Terminal Modal */}
            <GeminiTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

            {/* Main Content - All sections preloaded */}
            <div ref={containerRef} className="snap-container">
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
                <QuantumFabricSection />
                <DecoherenceSection />
                <QuantumClassicalSection />
                <EthicsSection />
                <ShutdownSection />
                <Footer />
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
