// VoidScene Configuration
export const CONFIG = {
    particleSize: 0.18,
    themes: [
        { color: { r: 0, g: 0.95, b: 1 }, id: 'home' },
        { color: { r: 0.6, g: 0.2, b: 1 }, id: 'hardware' },
        { color: { r: 0.2, g: 1, b: 0.6 }, id: 'research' },
        { color: { r: 1, g: 0.2, b: 0.4 }, id: 'applications' },
        { color: { r: 0.3, g: 0.4, b: 1 }, id: 'ecosystem' },
        { color: { r: 1, g: 0.6, b: 0.2 }, id: 'security' },
        { color: { r: 0.2, g: 0.8, b: 1 }, id: 'cloud' },
        { color: { r: 1, g: 0.8, b: 0.2 }, id: 'education' },
        { color: { r: 0.2, g: 0.9, b: 0.8 }, id: 'community' },
        { color: { r: 0.9, g: 0.2, b: 0.9 }, id: 'roadmap' },
        { color: { r: 1, g: 1, b: 1 }, id: 'contact' },
    ]
};

export const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E`;
