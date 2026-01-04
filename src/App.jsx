import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { GSAPScrollProvider } from './context/GSAPScrollProvider';
import { NOISE_SVG } from './components/VoidScene/config';

// Components
import VoidScene from './components/VoidScene';
import CustomCursor from './components/CustomCursor';
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
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isSceneReady, setIsSceneReady] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    const handleSceneReady = useCallback(() => {
        setIsSceneReady(true);
    }, []);

    // Safety timeout in case Three.js fails
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            if (!isSceneReady) {
                console.warn("[App] Scene failed to initialize, forcing ready.");
                handleSceneReady();
            }
        }, 3000);
        return () => clearTimeout(safetyTimer);
    }, [isSceneReady, handleSceneReady]);

    // Hide loader when scene is ready
    useEffect(() => {
        if (isSceneReady) {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
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

            {/* Custom cursor (desktop only) */}
            <div
                className="cursor-dot"
                style={{ display: typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches ? 'none' : 'block' }}
            >
                <CustomCursor />
            </div>

            {/* 3D Background */}
            <VoidScene onReady={handleSceneReady} />

            {/* Floating Controls */}
            <FloatingControls
                onOpenTerminal={() => setIsTerminalOpen(true)}
                toggleTheme={toggleTheme}
                isDark={isDark}
            />

            {/* Terminal Modal */}
            <GeminiTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

            {/* Main Content with GSAP Scroll */}
            <GSAPScrollProvider>
                <div className="w-full relative z-10 overflow-x-hidden">
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
                </div>
            </GSAPScrollProvider>
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
