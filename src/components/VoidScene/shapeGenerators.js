// Shape generator functions for 3D particle system - v2.0 OPTIMIZED
// Pre-computed shapes for maximum performance

// Cache for pre-computed shapes
const shapeCache = new Map();

// Generic generator with caching
const cachedGenerator = (name, count, generator) => {
    const key = `${name}_${count}`;
    if (shapeCache.has(key)) return shapeCache.get(key);
    const shape = generator(count);
    shapeCache.set(key, shape);
    return shape;
};

// 0: Hero - Sphere (scaled up for fullscreen)
export const generateSphere = (c) => cachedGenerator('sphere', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const r = 25 * Math.cbrt(Math.random());
        const t = Math.random() * 6.283;
        const f = Math.acos(2 * Math.random() - 1);
        p[i] = r * Math.sin(f) * Math.cos(t);
        p[i + 1] = r * Math.sin(f) * Math.sin(t);
        p[i + 2] = r * Math.cos(f);
    }
    return p;
});

// 1: Philosophy - Wave Plane (scaled up)
export const generateWavePlane = (c) => cachedGenerator('wave', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const x = (Math.random() - 0.5) * 55;
        const z = (Math.random() - 0.5) * 55;
        p[i] = x;
        p[i + 1] = Math.sin(x * 0.25) * 4 + Math.cos(z * 0.25) * 4;
        p[i + 2] = z;
    }
    return p;
});

// 2: Hardware - Cylinder (scaled up)
export const generateCylinder = (c) => cachedGenerator('cylinder', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const angle = Math.random() * 6.283;
        const y = (Math.random() - 0.5) * 45;
        p[i] = Math.cos(angle) * 16;
        p[i + 1] = y;
        p[i + 2] = Math.sin(angle) * 16;
    }
    return p;
});

// 3: Q-OS - Grid Lattice (scaled up)
export const generateLattice = (c) => cachedGenerator('lattice', c, (count) => {
    const p = new Float32Array(count * 3);
    const gridSize = Math.ceil(Math.cbrt(count));
    const spacing = 3.2;
    let idx = 0;
    for (let x = 0; x < gridSize && idx < count * 3; x++) {
        for (let y = 0; y < gridSize && idx < count * 3; y++) {
            for (let z = 0; z < gridSize && idx < count * 3; z++) {
                p[idx++] = (x - gridSize / 2) * spacing;
                p[idx++] = (y - gridSize / 2) * spacing;
                p[idx++] = (z - gridSize / 2) * spacing;
            }
        }
    }
    return p;
});

// 4: Developer - Stacked Panels (scaled up)
export const generateQubitGrid = (c) => cachedGenerator('qubit', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const layer = Math.floor(Math.random() * 10);
        p[i] = (Math.random() - 0.5) * (40 - layer * 2);
        p[i + 1] = (layer - 5) * 5;
        p[i + 2] = (Math.random() - 0.5) * (40 - layer * 2);
    }
    return p;
});

// 5: Cloud - Globe with arcs (scaled up)
export const generateGlobe = (c) => cachedGenerator('globe', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const t = Math.random() * 6.283;
        const f = Math.acos(2 * Math.random() - 1);
        const R = 24;
        p[i] = R * Math.sin(f) * Math.cos(t);
        p[i + 1] = R * Math.sin(f) * Math.sin(t);
        p[i + 2] = R * Math.cos(f);
    }
    return p;
});

// 6: Security - Shield Dome (scaled up)
export const generateShield = (c) => cachedGenerator('shield', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const t = Math.random() * 6.283;
        const f = Math.acos(Math.random());
        p[i] = 26 * Math.sin(f) * Math.cos(t);
        p[i + 1] = 26 * Math.cos(f) - 6;
        p[i + 2] = 26 * Math.sin(f) * Math.sin(t);
    }
    return p;
});

// 7: Research - Book/Pages (scaled up)
export const generateBook = (c) => cachedGenerator('book', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const page = Math.floor(Math.random() * 14);
        const x = (Math.random() - 0.5) * 35;
        p[i] = x * Math.cos(page * 0.07);
        p[i + 1] = (Math.random() - 0.5) * 22;
        p[i + 2] = page * 1.0 - 6 + x * Math.sin(page * 0.07);
    }
    return p;
});

// 8: Applications - Molecule Cluster (scaled up)
export const generateMolecule = (c) => cachedGenerator('molecule', c, (count) => {
    const p = new Float32Array(count * 3);
    const atoms = 10;
    for (let i = 0; i < count * 3; i += 3) {
        const a = Math.floor(Math.random() * atoms);
        const cx = Math.sin(a * 0.628) * 16;
        const cy = Math.cos(a * 0.628) * 16;
        const r = Math.random() * 7;
        const t = Math.random() * 6.283;
        const f = Math.random() * 3.14;
        p[i] = cx + r * Math.sin(f) * Math.cos(t);
        p[i + 1] = cy + r * Math.sin(f) * Math.sin(t);
        p[i + 2] = (Math.random() - 0.5) * 12 + r * Math.cos(f);
    }
    return p;
});

// 9: Roadmap - Timeline Pillar
export const generateTimeline = (c) => cachedGenerator('timeline', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const y = (Math.random() - 0.5) * 60;
        const radius = 3 + Math.sin(y * 0.1) * 2;
        const angle = Math.random() * 6.283;
        p[i] = Math.cos(angle) * radius;
        p[i + 1] = y;
        p[i + 2] = Math.sin(angle) * radius;
    }
    return p;
});

// 10: Community - Neural Network (scaled up)
export const generateNeuralWeb = (c) => cachedGenerator('neural', c, (count) => {
    const p = new Float32Array(count * 3);
    const nodes = 25;
    for (let i = 0; i < count * 3; i += 3) {
        const n = Math.floor(Math.random() * nodes);
        const cx = (Math.sin(n * 0.251) * 26);
        const cy = (Math.cos(n * 0.4) * 26);
        const cz = ((n % 6) - 3) * 10;
        const r = Math.random() * 5;
        p[i] = cx + (Math.random() - 0.5) * r * 2;
        p[i + 1] = cy + (Math.random() - 0.5) * r * 2;
        p[i + 2] = cz + (Math.random() - 0.5) * r * 2;
    }
    return p;
});

// 11: Contact - Calm Sphere (scaled up)
export const generateCalmSphere = (c) => cachedGenerator('calm', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const r = 18 * Math.cbrt(Math.random());
        const t = Math.random() * 6.283;
        const f = Math.acos(2 * Math.random() - 1);
        p[i] = r * Math.sin(f) * Math.cos(t);
        p[i + 1] = r * Math.sin(f) * Math.sin(t);
        p[i + 2] = r * Math.cos(f);
    }
    return p;
});

// 12: Quantum Fabric - Fabric Mesh (scaled up)
export const generateFabric = (c) => cachedGenerator('fabric', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const x = (Math.random() - 0.5) * 65;
        const z = (Math.random() - 0.5) * 65;
        const wave = Math.sin(x * 0.15) * Math.cos(z * 0.15) * 7;
        p[i] = x;
        p[i + 1] = wave + Math.sin(x * 0.4 + z * 0.25) * 3;
        p[i + 2] = z;
    }
    return p;
});

// 13: Decoherence - Breaking/Fragmenting (scaled up)
export const generateNebula = (c) => cachedGenerator('nebula', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const u1 = Math.random(), u2 = Math.random();
        const mag = 32 * Math.sqrt(-2.0 * Math.log(u1 + 0.001));
        p[i] = mag * Math.cos(6.283 * u2);
        p[i + 1] = (Math.random() - 0.5) * 20;
        p[i + 2] = mag * Math.sin(6.283 * u2) * 0.7;
    }
    return p;
});

// 14: Quantum vs Classical - Split/Duality (scaled up)
export const generateDuality = (c) => cachedGenerator('duality', c, (count) => {
    const p = new Float32Array(count * 3);
    const half = Math.floor(count / 2);
    for (let i = 0; i < count * 3; i += 3) {
        const idx = Math.floor(i / 3);
        const side = idx < half ? -1 : 1;
        const r = 14 * Math.cbrt(Math.random());
        const t = Math.random() * 6.283;
        const f = Math.acos(2 * Math.random() - 1);
        p[i] = r * Math.sin(f) * Math.cos(t) + side * 16;
        p[i + 1] = r * Math.sin(f) * Math.sin(t);
        p[i + 2] = r * Math.cos(f);
    }
    return p;
});

// 15: Ethics - Halo Rings (scaled up)
export const generateHalo = (c) => cachedGenerator('halo', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const ring = Math.floor(Math.random() * 4);
        const radius = 18 + ring * 6;
        const angle = Math.random() * 6.283;
        p[i] = Math.cos(angle) * radius;
        p[i + 1] = (ring - 1.5) * 4;
        p[i + 2] = Math.sin(angle) * radius;
    }
    return p;
});

// 16: Shutdown - Singularity (scaled up slightly for visibility)
export const generateSingularity = (c) => cachedGenerator('singularity', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const r = Math.random() * 5;
        const t = Math.random() * 6.283;
        const f = Math.acos(2 * Math.random() - 1);
        p[i] = r * Math.sin(f) * Math.cos(t);
        p[i + 1] = r * Math.sin(f) * Math.sin(t);
        p[i + 2] = r * Math.cos(f);
    }
    return p;
});

// Legacy exports
export const generateTorusKnot = generateWavePlane;
export const generateTorus = generateMolecule;
export const generateHelix = generateTimeline;
export const generateRing = generateHalo;
export const generateTunnel = generateTimeline;

// Clear cache (for memory management)
export const clearShapeCache = () => shapeCache.clear();
