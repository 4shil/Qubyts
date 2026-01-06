import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NOISE_SVG, getSectionColors } from './components/VoidScene/config';
import useAppStore from './store/useAppStore';
import Lenis from '@studio-freight/lenis';

// EAGER LOAD ALL COMPONENTS - No lazy loading
import VoidScene from './components/VoidScene';
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

    // Wheel navigation - REMOVED to prevent conflict with Lenis and fix flickering/zooming issues
    // Native scroll + Lenis provides the smooth transition requested
    /*
    useEffect(() => {
        // [Logic removed]
    }, []);
    */

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

    // Lenis smooth scroll - configured for scroll-snap
    useEffect(() => {
        const lenis = new Lenis({
            wrapper: containerRef.current,
            content: containerRef.current,
            lerp: 0.1,
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.075,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);


    return (
        <div className={`grain-overlay ${isDark ? 'bg-[#020202] text-white' : 'bg-[#FAFAFA] text-slate-900'}`}>
            {/* 3D Particle System - Full screen cinematic */}
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
