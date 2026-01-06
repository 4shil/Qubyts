import { create } from 'zustand';

// Listen for reduced motion preference
const getReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const useAppStore = create((set, get) => ({
    // Current section index (0-16 for 17 sections)
    currentSection: 0,
    setCurrentSection: (section) => set({ currentSection: section }),

    // Scroll lock during animation
    isScrollLocked: false,
    lockScroll: () => set({ isScrollLocked: true }),
    unlockScroll: () => set({ isScrollLocked: false }),

    // Navigate to specific section
    navigateTo: (index) => {
        const { sections, isScrollLocked } = get();
        if (isScrollLocked) return;

        const clampedIndex = Math.max(0, Math.min(index, sections.length - 1));
        set({ currentSection: clampedIndex, isScrollLocked: true });

        // Scroll to section
        const sectionId = sections[clampedIndex]?.id;
        if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'auto' });
            }
        }

        // Unlock after animation duration
        setTimeout(() => set({ isScrollLocked: false }), 100);
    },

    // Navigate next/prev
    navigateNext: () => {
        const { currentSection, sections, navigateTo } = get();
        if (currentSection < sections.length - 1) {
            navigateTo(currentSection + 1);
        }
    },
    navigatePrev: () => {
        const { currentSection, navigateTo } = get();
        if (currentSection > 0) {
            navigateTo(currentSection - 1);
        }
    },

    // Accessibility
    isReducedMotion: getReducedMotion(),
    setReducedMotion: (value) => set({ isReducedMotion: value }),

    // High contrast mode
    isHighContrast: false,
    toggleHighContrast: () => set((state) => ({ isHighContrast: !state.isHighContrast })),

    // Command palette
    commandPaletteOpen: false,
    openCommandPalette: () => set({ commandPaletteOpen: true }),
    closeCommandPalette: () => set({ commandPaletteOpen: false }),
    toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

    // 3D effect triggers
    activeEffect: null,
    triggerEffect: (effectType) => {
        set({ activeEffect: effectType });
        setTimeout(() => set({ activeEffect: null }), 800);
    },

    // Section definitions for v2.0 (17 sections)
    sections: [
        { id: 'hero', name: 'Beyond Binary', shape: 'sphere' },
        { id: 'philosophy', name: 'Philosophy', shape: 'wavePlane' },
        { id: 'hardware', name: 'Hardware', shape: 'cylinder' },
        { id: 'qos', name: 'Q-OS', shape: 'gridLattice' },
        { id: 'developer', name: 'Developer', shape: 'stackedPanels' },
        { id: 'cloud', name: 'Cloud', shape: 'globe' },
        { id: 'security', name: 'Security', shape: 'shield' },
        { id: 'research', name: 'Research', shape: 'book' },
        { id: 'applications', name: 'Applications', shape: 'molecule' },
        { id: 'roadmap', name: 'Roadmap', shape: 'timeline' },
        { id: 'community', name: 'Community', shape: 'network' },
        { id: 'contact', name: 'Contact', shape: 'calmSphere' },
        { id: 'quantum-fabric', name: 'Quantum Fabric', shape: 'fabric' },
        { id: 'decoherence', name: 'Decoherence', shape: 'breaking' },
        { id: 'quantum-classical', name: 'Quantum vs Classical', shape: 'split' },
        { id: 'ethics', name: 'Ethics', shape: 'halo' },
        { id: 'shutdown', name: 'Shutdown', shape: 'singularity' },
    ],
}));

export default useAppStore;
