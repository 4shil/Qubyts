import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
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
// import ScrollProgress from './components/ScrollProgress'; // REMOVED

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

// Memoize sections to prevent total-app re-renders during scroll
const MemoHome = memo(HomeSection);
const MemoPhilosophy = memo(PhilosophySection);
const MemoHardware = memo(HardwareSection);
const MemoQOS = memo(QOSSection);
const MemoDeveloper = memo(DeveloperSection);
const MemoCloud = memo(CloudSection);
const MemoSecurity = memo(SecuritySection);
const MemoResearch = memo(ResearchSection);
const MemoApplications = memo(ApplicationsSection);
const MemoRoadmap = memo(RoadmapSection);
const MemoCommunity = memo(CommunitySection);
const MemoContact = memo(ContactSection);
const MemoQuantumFabric = memo(QuantumFabricSection);
const MemoDecoherence = memo(DecoherenceSection);
const MemoQuantumClassical = memo(QuantumClassicalSection);
const MemoEthics = memo(EthicsSection);
const MemoShutdown = memo(ShutdownSection);

const MemoVoidScene = memo(VoidScene);

const AppContent = () => {
    const containerRef = useRef(null);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isSceneReady, setIsSceneReady] = useState(false);
    const lenisRef = useRef(null);
    const { isDark } = useTheme();

    const currentSection = useAppStore(state => state.currentSection);
    const setCurrentSection = useAppStore(state => state.setCurrentSection);
    const navigateNext = useAppStore(state => state.navigateNext);
    const navigatePrev = useAppStore(state => state.navigatePrev);
    const isScrollLocked = useAppStore(state => state.isScrollLocked);
    const sections = useAppStore(state => state.sections);

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
                setTimeout(() => { loader.style.display = 'none'; }, 50);
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

    // Keydown handling is kept for accessibility
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Lenis smooth scroll - Real-time Synchronized config
    useEffect(() => {
        const lenis = new Lenis({
            wrapper: containerRef.current,
            content: containerRef.current,
            lerp: 0.35, // Direct-tracking sensitivity
            duration: 0.3, // Ultra-responsive
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.35,
            wheelMultiplier: 1.6,
            touchMultiplier: 2.2,
        });

        lenisRef.current = lenis;

        // Synchronous scroll detection for ZERO state lag
        lenis.on('scroll', ({ scroll }) => {
            const vh = window.innerHeight;
            // TRIGGER EARLY: Switch section when 20% of the next one is visible
            const index = Math.floor((scroll + vh * 0.2) / vh);
            const clampedIndex = Math.max(0, Math.min(index, sections.length - 1));

            // Bypass React's batching for immediate state update
            if (clampedIndex !== useAppStore.getState().currentSection) {
                setCurrentSection(clampedIndex);
            }
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [sections, setCurrentSection]);

    // Optimization: Listen for navigation requests and use immediate scroll
    useEffect(() => {
        const handleNavigateReq = (e) => {
            const { index, immediate } = e.detail;
            const sectionId = sections[index]?.id;
            if (sectionId && lenisRef.current) {
                const element = document.getElementById(sectionId);
                if (element) {
                    lenisRef.current.scrollTo(element, {
                        immediate: immediate,
                        force: true
                    });
                }
            }
        };
        window.addEventListener('qubyts-navigate', handleNavigateReq);
        return () => window.removeEventListener('qubyts-navigate', handleNavigateReq);
    }, [sections]);


    return (
        <div className={`grain-overlay ${isDark ? 'bg-[#020202] text-white' : 'bg-[#FAFAFA] text-slate-900'}`}>
            {/* 3D Particle System - Decoupled from Re-renders */}
            <MemoVoidScene onReady={handleSceneReady} />

            {/* Navigation */}
            <MicroNav />
            {/* <ScrollProgress /> */}
            <CommandPalette />

            {/* Custom cursor */}
            <CustomCursor />

            {/* Terminal Modal */}
            <GeminiTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

            {/* Main Content - All sections preloaded and memoized */}
            <div ref={containerRef} className="snap-container">
                <MemoHome />
                <MemoPhilosophy />
                <MemoHardware />
                <MemoQOS />
                <MemoDeveloper />
                <MemoCloud />
                <MemoSecurity />
                <MemoResearch />
                <MemoApplications />
                <MemoRoadmap />
                <MemoCommunity />
                <MemoContact />
                <MemoQuantumFabric />
                <MemoDecoherence />
                <MemoQuantumClassical />
                <MemoEthics />
                <MemoShutdown />
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
