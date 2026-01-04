// Shape generator functions for 3D particle system - v2.0 (17 scenes)

export const generateSphere = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        const r = 18 * Math.cbrt(Math.random());
        const t = Math.random() * 2 * Math.PI;
        const f = Math.acos(2 * Math.random() - 1);
        p[i] = r * Math.sin(f) * Math.cos(t);
        p[i + 1] = r * Math.sin(f) * Math.sin(t);
        p[i + 2] = r * Math.cos(f);
    }
    return p;
};

// Philosophy: Probability wave plane with sinusoidal deformation
export const generateWavePlane = (c) => {
    const p = new Float32Array(c * 3);
    const size = 40;
    for (let i = 0; i < c * 3; i += 3) {
        const x = (Math.random() - 0.5) * size;
        const z = (Math.random() - 0.5) * size;
        const wave1 = Math.sin(x * 0.3) * 3;
        const wave2 = Math.cos(z * 0.3) * 3;
        const noise = (Math.random() - 0.5) * 1.5;
        p[i] = x;
        p[i + 1] = wave1 + wave2 + noise;
        p[i + 2] = z;
    }
    return p;
};

// Hardware: Cylindrical refrigerator column with torus rings
export const generateCylinder = (c) => {
    const p = new Float32Array(c * 3);
    const height = 35;
    const radius = 12;
    for (let i = 0; i < c * 3; i += 3) {
        const t = Math.random();
        if (t < 0.7) {
            // Cylinder surface
            const angle = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * height;
            p[i] = Math.cos(angle) * radius;
            p[i + 1] = y;
            p[i + 2] = Math.sin(angle) * radius;
        } else {
            // Torus rings at different levels
            const level = Math.floor(Math.random() * 5) - 2;
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const R = radius + 2;
            const r = 2;
            p[i] = (R + r * Math.cos(v)) * Math.cos(u);
            p[i + 1] = level * 7 + r * Math.sin(v);
            p[i + 2] = (R + r * Math.cos(v)) * Math.sin(u);
        }
    }
    return p;
};

// Q-OS: Grid lattice with connecting lines pattern
export const generateLattice = (c) => {
    const p = new Float32Array(c * 3);
    const gridSize = Math.ceil(Math.cbrt(c));
    const spacing = 2.5;
    let idx = 0;
    for (let x = 0; x < gridSize && idx < c * 3; x++) {
        for (let y = 0; y < gridSize && idx < c * 3; y++) {
            for (let z = 0; z < gridSize && idx < c * 3; z++) {
                p[idx] = (x - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.2;
                p[idx + 1] = (y - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.2;
                p[idx + 2] = (z - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.2;
                idx += 3;
            }
        }
    }
    return p;
};

// Developer: Stacked panels/cards
export const generateQubitGrid = (c) => {
    const p = new Float32Array(c * 3);
    const layers = 8;
    const layerHeight = 4;
    for (let i = 0; i < c * 3; i += 3) {
        const layer = Math.floor(Math.random() * layers);
        const spread = 15 - layer * 1;
        p[i] = (Math.random() - 0.5) * spread * 2;
        p[i + 1] = (layer - layers / 2) * layerHeight;
        p[i + 2] = (Math.random() - 0.5) * spread * 2;
    }
    return p;
};

// Cloud: Globe with arcs (great circles)
export const generateGlobe = (c) => {
    const p = new Float32Array(c * 3);
    const R = 18;
    for (let i = 0; i < c * 3; i += 3) {
        if (Math.random() < 0.7) {
            // Sphere surface
            const t = Math.random() * Math.PI * 2;
            const f = Math.acos(2 * Math.random() - 1);
            p[i] = R * Math.sin(f) * Math.cos(t);
            p[i + 1] = R * Math.sin(f) * Math.sin(t);
            p[i + 2] = R * Math.cos(f);
        } else {
            // Arc points (great circle segments)
            const arcAngle = Math.random() * Math.PI;
            const arcPhase = Math.random() * Math.PI * 2;
            const height = R + 2 + Math.random() * 3;
            p[i] = height * Math.cos(arcAngle) * Math.cos(arcPhase);
            p[i + 1] = height * Math.sin(arcAngle);
            p[i + 2] = height * Math.cos(arcAngle) * Math.sin(arcPhase);
        }
    }
    return p;
};

// Security: Shield dome
export const generateShield = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        const r = 20;
        const t = Math.random() * 2 * Math.PI;
        const f = Math.acos(Math.random());
        p[i] = r * Math.sin(f) * Math.cos(t);
        p[i + 1] = r * Math.cos(f) - 5;
        p[i + 2] = r * Math.sin(f) * Math.sin(t);
    }
    return p;
};

// Research: Book/stacked sheets
export const generateBook = (c) => {
    const p = new Float32Array(c * 3);
    const pages = 12;
    const width = 25, height = 35;
    for (let i = 0; i < c * 3; i += 3) {
        const page = Math.floor(Math.random() * pages);
        const openAngle = page * 0.08;
        const x = (Math.random() - 0.5) * width;
        const y = (Math.random() - 0.5) * height * 0.5;
        const z = page * 0.8 - pages * 0.4 + Math.sin(x * 0.1) * 2;
        // Apply opening angle
        p[i] = x * Math.cos(openAngle);
        p[i + 1] = y;
        p[i + 2] = z + x * Math.sin(openAngle);
    }
    return p;
};

// Applications: Molecule cluster
export const generateMolecule = (c) => {
    const p = new Float32Array(c * 3);
    const atoms = 8;
    const centers = [];
    for (let a = 0; a < atoms; a++) {
        centers.push({
            x: Math.sin(a * Math.PI / 4) * 12,
            y: Math.cos(a * Math.PI / 4) * 12,
            z: (Math.random() - 0.5) * 8
        });
    }
    for (let i = 0; i < c * 3; i += 3) {
        const atom = centers[Math.floor(Math.random() * atoms)];
        const r = Math.random() * 5;
        const t = Math.random() * Math.PI * 2;
        const f = Math.random() * Math.PI;
        p[i] = atom.x + r * Math.sin(f) * Math.cos(t);
        p[i + 1] = atom.y + r * Math.sin(f) * Math.sin(t);
        p[i + 2] = atom.z + r * Math.cos(f);
    }
    return p;
};

// Roadmap: Vertical timeline pillar
export const generateTimeline = (c) => {
    const p = new Float32Array(c * 3);
    const height = 60;
    const milestones = 10;
    for (let i = 0; i < c * 3; i += 3) {
        const y = (Math.random() - 0.5) * height;
        const milestone = Math.floor((y + height / 2) / (height / milestones));
        const radius = 3 + Math.sin(milestone * 0.5) * 2;
        const angle = Math.random() * Math.PI * 2;
        p[i] = Math.cos(angle) * radius;
        p[i + 1] = y;
        p[i + 2] = Math.sin(angle) * radius;
    }
    return p;
};

// Community: Neural network
export const generateNeuralWeb = (c) => {
    const p = new Float32Array(c * 3);
    const nodes = 25;
    const centers = [];
    for (let i = 0; i < nodes; i++) {
        centers.push({
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40,
            z: (Math.random() - 0.5) * 40
        });
    }
    for (let i = 0; i < c * 3; i += 3) {
        const node = centers[Math.floor(Math.random() * nodes)];
        const r = Math.random() * 5;
        const t = Math.random() * Math.PI * 2;
        const f = Math.random() * Math.PI;
        p[i] = node.x + r * Math.sin(f) * Math.cos(t);
        p[i + 1] = node.y + r * Math.sin(f) * Math.sin(t);
        p[i + 2] = node.z + r * Math.cos(f);
    }
    return p;
};

// Ethics: Halo rings (slow, respectful)
export const generateHalo = (c) => {
    const p = new Float32Array(c * 3);
    const rings = 3;
    for (let i = 0; i < c * 3; i += 3) {
        const ring = Math.floor(Math.random() * rings);
        const radius = 15 + ring * 5;
        const angle = Math.random() * Math.PI * 2;
        const thickness = 0.5;
        p[i] = Math.cos(angle) * radius + (Math.random() - 0.5) * thickness;
        p[i + 1] = (ring - 1) * 3 + (Math.random() - 0.5) * thickness;
        p[i + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * thickness;
    }
    return p;
};

// Shutdown: Singularity (collapse to center)
export const generateSingularity = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        const r = Math.random() * 3;
        const t = Math.random() * Math.PI * 2;
        const f = Math.acos(2 * Math.random() - 1);
        p[i] = r * Math.sin(f) * Math.cos(t);
        p[i + 1] = r * Math.sin(f) * Math.sin(t);
        p[i + 2] = r * Math.cos(f);
    }
    return p;
};

// Legacy compatibility
export const generateTorusKnot = (c) => generateWavePlane(c);
export const generateTorus = (c) => generateMolecule(c);
export const generateHelix = (c) => generateTimeline(c);
export const generateNebula = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        const u1 = Math.random(), u2 = Math.random();
        const mag = 35 * Math.sqrt(-2.0 * Math.log(u1));
        p[i] = mag * Math.cos(2 * Math.PI * u2);
        p[i + 1] = (Math.random() - 0.5) * 15;
        p[i + 2] = mag * Math.sin(2 * Math.PI * u2) * 0.7;
    }
    return p;
};
export const generateRing = (c) => generateHalo(c);
export const generateTunnel = (c) => generateTimeline(c);
