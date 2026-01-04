import { useState, useEffect, useCallback } from 'react';
import { useScroll } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NOISE_SVG } from './components/VoidScene/config';

// Components
import VoidScene from './components/VoidScene';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import FloatingControls from './components/FloatingControls';
import GeminiTerminal from './components/GeminiTerminal';

// Sections
import HomeSection from './sections/HomeSection';
import HardwareSection from './sections/HardwareSection';
import ResearchSection from './sections/ResearchSection';
import ApplicationsSection from './sections/ApplicationsSection';
import EcosystemSection from './sections/EcosystemSection';
import SecuritySection from './sections/SecuritySection';
import CloudSection from './sections/CloudSection';
import EducationSection from './sections/EducationSection';
import CommunitySection from './sections/CommunitySection';
import RoadmapSection from './sections/RoadmapSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

const AppContent = () => {
    console.log("[App] Component Mounting...");
    const { scrollYProgress } = useScroll();
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const [isSceneReady, setIsSceneReady] = useState(false);

    // FIX: Define handler outside of render loop to prevent infinite re-initialization of VoidScene
    const handleSceneReady = useCallback(() => {
        console.log("[App] handleSceneReady called");
        setIsSceneReady(true);
    }, []);

    // FIX: Safety timeout in case Three.js crashes
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            if (!isSceneReady) {
                console.warn("[App] Scene failed to initialize, forcing ready.");
                handleSceneReady();
            }
        }, 3000); // 3 seconds
        return () => clearTimeout(safetyTimer);
    }, [isSceneReady, handleSceneReady]);

    // Hide loader when scene is ready
    useEffect(() => {
        if (isSceneReady) {
            const loader = document.getElementById('loader');
            if (loader) {
                console.log("[App] Hiding loader...");
                loader.style.opacity = '0';
                // Wait for fade out then display none
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }
    }, [isSceneReady]);

    return (
        <div className={`${isDark ? 'bg-[#030303] text-white selection:bg-cyan-500/30 selection:text-cyan-200' : 'bg-[#F0F2F5] text-slate-900 selection:bg-cyan-200 selection:text-cyan-900'} overflow-hidden transition-colors duration-1000`}>
            {/* Noise overlay */}
            <div
                className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-40"
                style={{ backgroundImage: `url("${NOISE_SVG}")` }}
            />

            {/* Custom cursor */}
            <CustomCursor />

            {/* 3D Background */}
            <VoidScene scrollYProgress={scrollYProgress} onReady={handleSceneReady} />

            {/* Floating Controls */}
            <FloatingControls
                onOpenTerminal={() => setIsTerminalOpen(true)}
                toggleTheme={toggleTheme}
                isDark={isDark}
            />

            {/* Terminal Modal */}
            <GeminiTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

            {/* Main Content */}
            <SmoothScroll>
                <main>
                    <HomeSection />
                    <HardwareSection />
                    <ResearchSection />
                    <ApplicationsSection />
                    <EcosystemSection />
                    <SecuritySection />
                    <CloudSection />
                    <EducationSection />
                    <CommunitySection />
                    <RoadmapSection />
                    <ContactSection />
                </main>
                <Footer />
            </SmoothScroll>
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
