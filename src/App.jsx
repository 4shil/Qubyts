import { useState, useEffect, useCallback, useRef } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NOISE_SVG } from './components/VoidScene/config';
import useAppStore from './store/useAppStore';

// Components
import VoidScene from './components/VoidScene';
import Squares from './components/Squares';
import CustomCursor from './components/CustomCursor';
import MicroNav from './components/MicroNav';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import GeminiTerminal from './components/GeminiTerminal';

// Sections (v2.0 - 17 sections)
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
import Footer from './sections/Footer';

const AppContent = () => {
    console.log("[App v2.0] Mounting with Squares background...");
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

    // Safety timeout for loader
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            if (!isSceneReady) {
                console.warn("[App v2.0] Scene timeout, forcing ready.");
                handleSceneReady();
            }
        }, 3000);
        return () => clearTimeout(safetyTimer);
    }, [isSceneReady, handleSceneReady]);

    // Hide loader when ready
    useEffect(() => {
        if (isSceneReady) {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => { loader.style.display = 'none'; }, 500);
            }
        }
    }, [isSceneReady]);

    // Keyboard navigation (↑ ↓ PgUp PgDn Space)
    useEffect(() => {
        const handleKeyDown = (e) => {
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
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigateNext, navigatePrev, isScrollLocked]);

    // Wheel navigation (one section per scroll)
    useEffect(() => {
        let wheelTimeout = null;

        const handleWheel = (e) => {
            if (isScrollLocked) {
                e.preventDefault();
                return;
            }

            if (wheelTimeout) return;

            wheelTimeout = setTimeout(() => {
                wheelTimeout = null;
            }, 600);

            if (e.deltaY > 30) {
                navigateNext();
            } else if (e.deltaY < -30) {
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

    // Scroll observer to sync currentSection
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

    return (
        <div className={`grain-overlay ${isDark ? 'bg-[#020202] text-white' : 'bg-[#FAFAFA] text-slate-900'}`}>
            {/* Squares Grid Background */}
            <div className="fixed inset-0 z-0">
                <Squares
                    speed={0.5}
                    squareSize={40}
                    direction="diagonal"
                    borderColor={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}
                    hoverFillColor={isDark ? 'rgba(0,243,255,0.08)' : 'rgba(79,70,229,0.08)'}
                />
            </div>

            {/* 3D Particle System (layered above squares) */}
            <VoidScene currentSection={currentSection} onReady={handleSceneReady} />

            {/* Noise overlay */}
            <div
                className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-30"
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

            {/* Main Content - Snap Container */}
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
