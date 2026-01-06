// Shape generator functions for 3D particle system - v4.0 AESTHETIC
// "Cool" & Complex Geometry for Maximum Visual Impact

const shapeCache = new Map();
const cachedGenerator = (name, count, generator) => {
    const key = `${name}_${count}`;
    if (shapeCache.has(key)) return shapeCache.get(key);
    const shape = generator(count);
    shapeCache.set(key, shape);
    return shape;
};

// Helper: Enhanced random sphere
const randomInSphere = (r) => {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const rad = r * Math.cbrt(Math.random());
    return [rad * Math.sin(phi) * Math.cos(theta), rad * Math.sin(phi) * Math.sin(theta), rad * Math.cos(phi)];
};

// 0: Hero - Fractured Chromosome (Exploding Helix)
export const generateSphere = (c) => cachedGenerator('hero_helix', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // Double Helix Core
        const t = (Math.random() - 0.5) * 40;
        const strand = Math.random() > 0.5 ? 0 : Math.PI;
        const radiusBase = 12;

        let x = Math.cos(t * 0.4 + strand) * radiusBase;
        let z = Math.sin(t * 0.4 + strand) * radiusBase;
        let y = t * 1.5;

        // "Explosion" factor - particles drifting away
        const drift = Math.pow(Math.random(), 3) * 25; // Weighted drift
        const driftDir = Math.random() * Math.PI * 2;

        if (Math.random() > 0.6) {
            x += Math.cos(driftDir) * drift;
            z += Math.sin(driftDir) * drift;
            y += (Math.random() - 0.5) * drift;
        }

        p[i] = x;
        p[i + 1] = y;
        p[i + 2] = z;
    }
    return p;
});

// 1: Philosophy - Infinity Flow (Twisted Torus Knot)
export const generateWavePlane = (c) => cachedGenerator('infinity_flow', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        // Trefoil knot parameters
        const r = 2 + Math.cos(3 * u);
        const x = r * Math.cos(2 * u);
        const y = r * Math.sin(2 * u);
        const z = Math.sin(3 * u);

        // Volumetric tube
        const tubeR = 4 + Math.random() * 2; // Varying thickness

        p[i] = (x + tubeR * Math.cos(v) * Math.cos(2 * u)) * 4.5;
        p[i + 1] = (y + tubeR * Math.cos(v) * Math.sin(2 * u)) * 4.5;
        p[i + 2] = (z + tubeR * Math.sin(v)) * 4.5;
    }
    return p;
});

// 2: Hardware - Cyber-Core (Reactive Reactor)
export const generateCylinder = (c) => cachedGenerator('cyber_core', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const h = (Math.random() - 0.5) * 50;
        let r = 10;

        // Structured "ribs" for the machine look
        if (Math.random() > 0.5) {
            r = 15 + Math.sin(h * 0.5) * 5;
        } else {
            r = 8; // Inner core
        }

        const angle = Math.random() * Math.PI * 2;

        // "Energy particles" escaping
        if (Math.random() > 0.9) {
            r += Math.random() * 20;
        }

        p[i] = Math.cos(angle) * r;
        p[i + 1] = h;
        p[i + 2] = Math.sin(angle) * r;
    }
    return p;
});

// 3: Q-OS - Holographic Data Cloud
export const generateLattice = (c) => cachedGenerator('holo_cloud', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // Volumetric cube with density variations
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 40;

        // Density filter: Keep if near center OR near strict grid lines
        const isGrid = (Math.abs(x) < 2 || Math.abs(y) < 2 || Math.abs(z) < 2);
        const isCore = (x * x + y * y + z * z) < 400;

        if (isGrid || isCore || Math.random() > 0.7) {
            p[i] = x;
            p[i + 1] = y;
            p[i + 2] = z;
        } else {
            // Respawn closer to center
            const pt = randomInSphere(20);
            p[i] = pt[0]; p[i + 1] = pt[1]; p[i + 2] = pt[2];
        }
    }
    return p;
});

// 4: Developer - Digital Rain Vortex
export const generateQubitGrid = (c) => cachedGenerator('digital_vortex', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // Spiral Vortex
        const t = Math.random() * Math.PI * 4;
        const y = (Math.random() - 0.5) * 60;

        // Radius increases with height (funnel)
        const r = 5 + ((y + 30) / 60) * 25;

        // Add "Rain" verticality
        const x = Math.cos(t) * r;
        const z = Math.sin(t) * r;

        // Random glitch offset
        const glitch = Math.random() > 0.95 ? 5 : 0;

        p[i] = x + glitch;
        p[i + 1] = y;
        p[i + 2] = z + glitch;
    }
    return p;
});

// 5: Cloud - Planetary Network (Saturn-like)
export const generateGlobe = (c) => cachedGenerator('saturn_net', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const type = Math.random();
        if (type < 0.4) {
            // Dense Core
            const pt = randomInSphere(12);
            p[i] = pt[0]; p[i + 1] = pt[1]; p[i + 2] = pt[2];
        } else if (type < 0.7) {
            // Main Ring
            const angle = Math.random() * Math.PI * 2;
            const r = 25 + (Math.random() - 0.5) * 2;
            p[i] = Math.cos(angle) * r;
            p[i + 1] = (Math.random() - 0.5) * 1; // Thin
            p[i + 2] = Math.sin(angle) * r;
        } else {
            // Secondary Tilted Ring
            const angle = Math.random() * Math.PI * 2;
            const r = 35 + (Math.random() - 0.5) * 4;
            p[i] = Math.cos(angle) * r;
            p[i + 1] = Math.sin(angle) * r * 0.5; // Tilted
            p[i + 2] = Math.sin(angle) * r;
        }
    }
    return p;
});

// 6: Security - Glitch Dome
export const generateShield = (c) => cachedGenerator('glitch_dome', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);

        let r = 25;
        // Glitch spikes
        if (Math.random() > 0.96) r *= 1.4; // Spike out
        if (Math.random() < 0.04) r *= 0.6; // Hole in structure

        p[i] = r * Math.sin(phi) * Math.cos(theta);
        p[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        p[i + 2] = r * Math.cos(phi);
    }
    return p;
});

// 7: Research - Ascension Spire (DNA Tower)
export const generateBook = (c) => cachedGenerator('ascension', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const h = (Math.random() - 0.5) * 70;
        const angle = h * 0.2; // Twist
        const r = 10 + Math.sin(h * 0.1) * 5; // Organic bulging

        // 3 Strands
        const strand = Math.floor(Math.random() * 3) * (Math.PI * 2 / 3);

        p[i] = Math.cos(angle + strand) * r + (Math.random() - 0.5) * 2;
        p[i + 1] = h;
        p[i + 2] = Math.sin(angle + strand) * r + (Math.random() - 0.5) * 2;
    }
    return p;
});

// 8: Applications - Molecular Cloud
export const generateMolecule = (c) => cachedGenerator('molecular_cloud', c, (count) => {
    const p = new Float32Array(count * 3);
    const centers = 12;
    const centerPts = [];
    for (let k = 0; k < centers; k++) centerPts.push(randomInSphere(30));

    for (let i = 0; i < count * 3; i += 3) {
        // Attach to a random center
        const c = centerPts[Math.floor(Math.random() * centers)];
        // Orbit it
        const r = 3 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        p[i] = c[0] + r * Math.sin(phi) * Math.cos(theta);
        p[i + 1] = c[1] + r * Math.sin(phi) * Math.sin(theta);
        p[i + 2] = c[2] + r * Math.cos(phi);
    }
    return p;
});

// 9: Roadmap - The Wormhole
export const generateTimeline = (c) => cachedGenerator('wormhole', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const t = (Math.random() - 0.5) * 80; // Long tube
        const r = 8 + Math.pow(t / 40, 2) * 15; // Funnels at ends
        const angle = Math.random() * Math.PI * 2;

        p[i] = Math.cos(angle) * r;
        p[i + 1] = Math.sin(angle) * r;
        p[i + 2] = t;
    }
    return p;
});

// 10: Community - Synaptic Web
export const generateNeuralWeb = (c) => cachedGenerator('synaptic', c, (count) => {
    const p = new Float32Array(count * 3);
    const nodes = 8;
    const nodePts = [];
    // Create random nodes
    for (let k = 0; k < nodes; k++) nodePts.push(randomInSphere(25));

    for (let i = 0; i < count * 3; i += 3) {
        if (Math.random() > 0.3) {
            // Line between nodes
            const n1 = nodePts[Math.floor(Math.random() * nodes)];
            const n2 = nodePts[Math.floor(Math.random() * nodes)];
            const t = Math.random();
            p[i] = n1[0] + (n2[0] - n1[0]) * t + (Math.random() - 0.5);
            p[i + 1] = n1[1] + (n2[1] - n1[1]) * t + (Math.random() - 0.5);
            p[i + 2] = n1[2] + (n2[2] - n1[2]) * t + (Math.random() - 0.5);
        } else {
            // Node glow
            const n = nodePts[Math.floor(Math.random() * nodes)];
            const pt = randomInSphere(4);
            p[i] = n[0] + pt[0];
            p[i + 1] = n[1] + pt[1];
            p[i + 2] = n[2] + pt[2];
        }
    }
    return p;
});

// 11: Contact - Galactic Core
export const generateCalmSphere = (c) => cachedGenerator('galactic', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // Spiral Arms
        const arm = Math.floor(Math.random() * 3);
        const t = Math.random() * Math.PI * 2;
        // Logarithmic spiral
        const angle = t + (arm * (Math.PI * 2 / 3));
        const r = t * 6; // Radius grows with angle

        // Add thickness
        const spread = (5 - t) * 2; // More spread at center

        p[i] = Math.cos(angle) * r + (Math.random() - 0.5) * spread;
        p[i + 1] = (Math.random() - 0.5) * (spread * 0.5); // Flat-ish
        p[i + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * spread;
    }
    return p;
});

// 12: Quantum Fabric - Hypercube Shadow
export const generateFabric = (c) => cachedGenerator('hypercube', c, (count) => {
    const p = new Float32Array(count * 3);
    // Nested cubes
    for (let i = 0; i < count * 3; i += 3) {
        const size = 15 + Math.floor(Math.random() * 3) * 10; // 15, 25, 35
        // Edges
        const edge = Math.floor(Math.random() * 12);
        // ...Simplified edge scatter
        const axis = Math.floor(edge / 4); // 0=x, 1=y, 2=z

        let x = (Math.random() - 0.5) * 2 * size;
        let y = (Math.random() - 0.5) * 2 * size;
        let z = (Math.random() - 0.5) * 2 * size;

        // Clamp 2 axes to corners to make edges
        if (axis === 0) { y = Math.sign(y) * size; z = Math.sign(z) * size; }
        if (axis === 1) { x = Math.sign(x) * size; z = Math.sign(z) * size; }
        if (axis === 2) { x = Math.sign(x) * size; y = Math.sign(y) * size; }

        p[i] = x + (Math.random() - 0.5);
        p[i + 1] = y + (Math.random() - 0.5);
        p[i + 2] = z + (Math.random() - 0.5);
    }
    return p;
});

// 13: Decoherence - The Big Bang
export const generateNebula = (c) => cachedGenerator('big_bang', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // Fast moving particles from center
        const pt = randomInSphere(1);
        // Normalized direction
        const d = Math.sqrt(pt[0] * pt[0] + pt[1] * pt[1] + pt[2] * pt[2]);
        const nx = pt[0] / d; const ny = pt[1] / d; const nz = pt[2] / d;

        // Distribution: Most far out, some trailing
        const dist = 5 + Math.pow(Math.random(), 0.5) * 45;

        p[i] = nx * dist;
        p[i + 1] = ny * dist;
        p[i + 2] = nz * dist;
    }
    return p;
});

// 14: Quantum vs Classical - Entangled Spheres
export const generateDuality = (c) => cachedGenerator('entangled', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const s = Math.random() > 0.5 ? -1 : 1;
        const center = s * 14;

        // Sphere
        const pt = randomInSphere(10);

        // Distortion stretching towards each other
        let x = pt[0] + center;
        let y = pt[1];
        let z = pt[2];

        // Pull towards center
        if (pt[0] * s < 0) {
            x -= (pt[0] * 0.5); // Stretch
        }

        p[i] = x;
        p[i + 1] = y;
        p[i + 2] = z;
    }
    return p;
});

// 15: Ethics - The Scales (Abstract)
export const generateHalo = (c) => cachedGenerator('abstract_scales', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // Triangle base
        const type = Math.random();

        if (type < 0.6) {
            // Triangle
            const t = Math.random();
            const side = Math.floor(Math.random() * 3);
            // ... barycentric noise
            p[i] = (Math.random() - 0.5) * 30;
            p[i + 1] = (Math.random() - 0.5) * 30;
            p[i + 2] = (Math.random() - 0.5) * 2; // Flat
        } else {
            // Central axis
            p[i] = 0;
            p[i + 1] = (Math.random() - 0.5) * 50;
            p[i + 2] = 0;
        }
    }
    return p;
});

// 16: Shutdown - Event Horizon
export const generateSingularity = (c) => cachedGenerator('event_horizon', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // Flat disk with hole
        const angle = Math.random() * Math.PI * 2;
        const r = 10 + Math.pow(Math.random(), 2) * 30; // Dense near center/10

        p[i] = Math.cos(angle) * r;
        p[i + 1] = Math.sin(angle * 4) * 2; // Waves
        p[i + 2] = Math.sin(angle) * r;
    }
    return p;
});

// Legacy mapping
export const generateTorusKnot = generateWavePlane;
export const generateTorus = generateMolecule;
export const generateHelix = generateTimeline;
export const generateRing = generateHalo;
export const generateTunnel = generateTimeline;

export const clearShapeCache = () => shapeCache.clear();
