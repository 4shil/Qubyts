// VoidScene Configuration - v2.0 (17 scenes)
// RGB colors for Three.js (0-1 range)
export const CONFIG = {
    particleSize: 0.22,
    // 17 sections with semantic colors
    themes: [
        { color: { r: 0, g: 0.95, b: 1 }, id: 'hero' },           // Cyan
        { color: { r: 0.6, g: 0.2, b: 1 }, id: 'philosophy' },    // Purple
        { color: { r: 0.5, g: 0.3, b: 1 }, id: 'hardware' },      // Violet
        { color: { r: 0.2, g: 1, b: 0.6 }, id: 'qos' },           // Green
        { color: { r: 0.3, g: 0.4, b: 1 }, id: 'developer' },     // Indigo
        { color: { r: 0.2, g: 0.8, b: 1 }, id: 'cloud' },         // Sky
        { color: { r: 1, g: 0.6, b: 0.2 }, id: 'security' },      // Orange
        { color: { r: 0.2, g: 0.9, b: 0.6 }, id: 'research' },    // Emerald
        { color: { r: 1, g: 0.3, b: 0.4 }, id: 'applications' },  // Rose
        { color: { r: 0.9, g: 0.2, b: 0.9 }, id: 'roadmap' },     // Fuchsia
        { color: { r: 0.2, g: 0.9, b: 0.8 }, id: 'community' },   // Teal
        { color: { r: 0.9, g: 0.9, b: 0.95 }, id: 'contact' },    // Soft White
        { color: { r: 0.4, g: 0.8, b: 1 }, id: 'quantum-fabric' },// Light Cyan
        { color: { r: 0.7, g: 0.3, b: 0.5 }, id: 'decoherence' }, // Muted Magenta
        { color: { r: 0.5, g: 0.5, b: 0.9 }, id: 'quantum-classical' }, // Lavender
        { color: { r: 1, g: 0.9, b: 0.7 }, id: 'ethics' },        // Warm White
        { color: { r: 0.1, g: 0.1, b: 0.2 }, id: 'shutdown' },    // Deep Void
    ]
};

// Helper: Convert RGB (0-1) to hex string
export const rgbToHex = (r, g, b) => {
    const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Helper: Get hex colors array for a section (primary, lighter, darker)
export const getSectionColors = (sectionIndex) => {
    const theme = CONFIG.themes[Math.min(sectionIndex, CONFIG.themes.length - 1)];
    const { r, g, b } = theme.color;

    // Primary color
    const primary = rgbToHex(r, g, b);

    // Lighter variant (mix with white)
    const lighter = rgbToHex(
        Math.min(1, r * 0.5 + 0.5),
        Math.min(1, g * 0.5 + 0.5),
        Math.min(1, b * 0.5 + 0.5)
    );

    // Darker variant (reduce brightness)
    const darker = rgbToHex(r * 0.3, g * 0.3, b * 0.3);

    return [darker, primary, lighter];
};

export const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E`;
