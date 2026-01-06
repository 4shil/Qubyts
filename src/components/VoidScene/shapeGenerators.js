// Shape generator functions for 3D particle system - v3.0 ENHANCED
// Complex geometry for "Real-Time" high-fidelity rendering

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

// Helper: Random point in sphere
const randomInSphere = (r) => {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const rad = r * Math.cbrt(Math.random());
    return [rad * Math.sin(phi) * Math.cos(theta), rad * Math.sin(phi) * Math.sin(theta), rad * Math.cos(phi)];
};

// 0: Hero - DNA Double Helix (Quantum Entanglement)
export const generateSphere = (c) => cachedGenerator('dna', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const t = Math.random() * Math.PI * 8; // 4 turns
        const strand = Math.random() > 0.5 ? 0 : Math.PI;
        const r = 10;
        const h = 40;
        const y = (t / (Math.PI * 8)) * h - h / 2;
        // Add some noise/thickness
        const noise = (Math.random() - 0.5) * 2;
        p[i] = (r + noise) * Math.cos(t + strand);
        p[i + 1] = y;
        p[i + 2] = (r + noise) * Math.sin(t + strand);
    }
    return p;
});

// 1: Philosophy - Möbius Strip (Infinite Continuity)
export const generateWavePlane = (c) => cachedGenerator('mobius', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const u = Math.random() * Math.PI * 2;
        const v = (Math.random() - 0.5) * 2; // Width
        const r = 20;
        // Parametric Mobius
        const x = (1 + v / 2 * Math.cos(u / 2)) * Math.cos(u) * r;
        const y = (1 + v / 2 * Math.cos(u / 2)) * Math.sin(u) * r;
        const z = v / 2 * Math.sin(u / 2) * r;
        p[i] = x;
        p[i + 1] = z; // Swapped y/z for better face-on view
        p[i + 2] = y * 0.5;
    }
    return p;
});

// 2: Hardware - Dilution Refrigerator (Cryostat Stack)
export const generateCylinder = (c) => cachedGenerator('cryostat', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // 3 Distinct stages
        const stage = Math.random();
        let r, h_start, h_end;

        if (stage < 0.4) { // Top flange (wide)
            r = 15; h_start = 10; h_end = 15;
        } else if (stage < 0.7) { // Mixing chamber (mid)
            r = 10; h_start = -5; h_end = 10;
        } else { // Cold finger (narrow bottom)
            r = 5; h_start = -20; h_end = -5;
        }

        const angle = Math.random() * Math.PI * 2;
        const h = h_start + Math.random() * (h_end - h_start);
        const rad = r + (Math.random() - 0.5) * 1;

        p[i] = Math.cos(angle) * rad;
        p[i + 1] = h;
        p[i + 2] = Math.sin(angle) * rad;
    }
    return p;
});

// 3: Q-OS - Quantum Circuit Grid (Interconnected Qubits)
export const generateLattice = (c) => cachedGenerator('circuit', c, (count) => {
    const p = new Float32Array(count * 3);
    const size = 30;
    const lines = 6;
    for (let i = 0; i < count * 3; i += 3) {
        if (Math.random() > 0.3) {
            // Horizontal lines (Qubit rails)
            const line = Math.floor(Math.random() * lines);
            const x = (Math.random() - 0.5) * size * 2;
            const y = (line - lines / 2) * 5;
            p[i] = x;
            p[i + 1] = y;
            p[i + 2] = (Math.random() - 0.5) * 2;
        } else {
            // Vertical gates (entanglement)
            const x = (Math.floor(Math.random() * 10) - 5) * 5; // Key points
            const y = (Math.random() - 0.5) * size;
            p[i] = x;
            p[i + 1] = y;
            p[i + 2] = (Math.random() - 0.5) * 2;
        }
    }
    return p;
});

// 4: Developer - The Matrix (Cascading Code)
export const generateQubitGrid = (c) => cachedGenerator('matrix', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const col = Math.floor(Math.random() * 20) - 10;
        const row = Math.floor(Math.random() * 20) - 10;
        const x = col * 3;
        const z = row * 3; // Depth layers
        const y = (Math.random() - 0.5) * 60;

        p[i] = x + (Math.random() - 0.5);
        p[i + 1] = y;
        p[i + 2] = z + (Math.random() - 0.5);
    }
    return p;
});

// 5: Cloud - Orbital Cloud (Satellite Network)
export const generateGlobe = (c) => cachedGenerator('orbital', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        if (Math.random() > 0.3) {
            // Central Data Core
            const pt = randomInSphere(12);
            p[i] = pt[0]; p[i + 1] = pt[1]; p[i + 2] = pt[2];
        } else {
            // Orbital Ring
            const angle = Math.random() * Math.PI * 2;
            const r = 25 + (Math.random() - 0.5) * 4;
            // Tilted ring
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            p[i] = x;
            p[i + 1] = x * 0.5; // Tilt
            p[i + 2] = z;
        }
    }
    return p;
});

// 6: Security - Encryption Lattice (Icosahedron)
export const generateShield = (c) => cachedGenerator('encryption', c, (count) => {
    const p = new Float32Array(count * 3);
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count * 3; i += 3) {
        // Generate points on sphere but clamp to geometric faces
        // Using approximate dome shape
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi_ang = Math.acos(2 * v - 1);

        // Snap to grid for "lattice" look
        let r = 25;
        // Add "layers"
        if (Math.random() > 0.8) r = 20;

        const x = r * Math.sin(phi_ang) * Math.cos(theta);
        const y = r * Math.sin(phi_ang) * Math.sin(theta);
        const z = r * Math.cos(phi_ang);

        // Quantize positions
        p[i] = Math.round(x / 4) * 4;
        p[i + 1] = Math.round(y / 4) * 4;
        p[i + 2] = Math.round(z / 4) * 4;
    }
    return p;
});

// 7: Research - Spiral Knowledge Tower
export const generateBook = (c) => cachedGenerator('tower', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const h = (Math.random() - 0.5) * 60; // Height
        // Radius gets smaller as it goes up
        const t = (h + 30) * 0.2; // Angle based on height
        const r_base = 20 * (1 - (h + 30) / 70);
        const r = Math.max(2, r_base) + (Math.random() - 0.5) * 4;

        p[i] = Math.cos(t * 2) * r;
        p[i + 1] = h;
        p[i + 2] = Math.sin(t * 2) * r;
    }
    return p;
});

// 8: Applications - Benzene Ring Cluster
export const generateMolecule = (c) => cachedGenerator('benzene', c, (count) => {
    const p = new Float32Array(count * 3);
    const rings = 8;
    for (let i = 0; i < count * 3; i += 3) {
        const ringIdx = Math.floor(Math.random() * rings);
        // Position of ring center
        const cx = (Math.random() - 0.5) * 40;
        const cy = (Math.random() - 0.5) * 40;
        const cz = (Math.random() - 0.5) * 20;

        // Point in hexagon
        const edge = Math.floor(Math.random() * 6);
        const angle = (edge / 6) * Math.PI * 2;
        const r = 4;

        // Add some noise to fill the bond
        const bondPos = Math.random();

        p[i] = cx + Math.cos(angle) * r;
        p[i + 1] = cy + Math.sin(angle) * r;
        p[i + 2] = cz;
    }
    return p;
});

// 9: Roadmap - Winding Path (The Journey)
export const generateTimeline = (c) => cachedGenerator('path', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const t = (Math.random() - 0.5) * 60; // Length
        // Siny/Cosy path
        const x = Math.sin(t * 0.15) * 15;
        const y = Math.cos(t * 0.1) * 10;

        // Add volume around the path
        const r = 4 * Math.random();
        const theta = Math.random() * Math.PI * 2;

        p[i] = t;
        p[i + 1] = y + Math.cos(theta) * r;
        p[i + 2] = x + Math.sin(theta) * r;
    }
    return p;
});

// 10: Community - Neural Network
export const generateNeuralWeb = (c) => cachedGenerator('network', c, (count) => {
    const p = new Float32Array(count * 3);
    // define cluster centers
    const clusters = 6;
    const centers = [];
    for (let k = 0; k < clusters; k++) centers.push(randomInSphere(35));

    for (let i = 0; i < count * 3; i += 3) {
        // Pick two clusters
        const c1 = centers[Math.floor(Math.random() * clusters)];
        const c2 = centers[Math.floor(Math.random() * clusters)];

        // Lerp between them
        const t = Math.random();

        // Add noise for "cloud" effect around connection
        const noise = 2; //(Math.random()-0.5) * 2;

        p[i] = c1[0] + (c2[0] - c1[0]) * t + (Math.random() - 0.5) * noise;
        p[i + 1] = c1[1] + (c2[1] - c1[1]) * t + (Math.random() - 0.5) * noise;
        p[i + 2] = c1[2] + (c2[2] - c1[2]) * t + (Math.random() - 0.5) * noise;
    }
    return p;
});

// 11: Contact - Pulsing Core
export const generateCalmSphere = (c) => cachedGenerator('core', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        if (Math.random() > 0.4) {
            // Inner dense core
            const pt = randomInSphere(10);
            p[i] = pt[0]; p[i + 1] = pt[1]; p[i + 2] = pt[2];
        } else {
            // Outer electron shell
            const r = 22;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            p[i] = r * Math.sin(phi) * Math.cos(theta);
            p[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i + 2] = r * Math.cos(phi);
        }
    }
    return p;
});

// 12: Quantum Fabric - Tesseract Projection
export const generateFabric = (c) => cachedGenerator('tesseract', c, (count) => {
    const p = new Float32Array(count * 3);
    // 4D Hypercube edges projected
    // Vertices of 4D cube (+-1, +-1, +-1, +-1)
    const size = 18;
    for (let i = 0; i < count * 3; i += 3) {
        // Pick an edge (randomly interpolate between two close vertices)
        // This is a simplified "cloud" version
        const x = (Math.random() > 0.5 ? 1 : -1) * size;
        const y = (Math.random() > 0.5 ? 1 : -1) * size;
        const z = (Math.random() > 0.5 ? 1 : -1) * size;
        // Inner cube
        const scale = Math.random() > 0.5 ? 0.5 : 1;

        // Random point on volume
        p[i] = x * scale + (Math.random() - 0.5) * 2;
        p[i + 1] = y * scale + (Math.random() - 0.5) * 2;
        p[i + 2] = z * scale + (Math.random() - 0.5) * 2;

        // Connectors
        if (Math.random() > 0.6) {
            p[i] *= Math.random();
            p[i + 1] *= Math.random();
            p[i + 2] *= Math.random();
        }
    }
    return p;
});

// 13: Decoherence - Shattering Crystal
export const generateNebula = (c) => cachedGenerator('shatter', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        // Cube that is exploding
        const r = 15;
        // Original pos
        let x = (Math.random() - 0.5) * r * 2;
        let y = (Math.random() - 0.5) * r * 2;
        let z = (Math.random() - 0.5) * r * 2;

        // Explosion vector (normalize and scale)
        const len = Math.sqrt(x * x + y * y + z * z);
        // Push out
        const push = 1.0 + Math.random() * 2.0; // Explosion factor

        p[i] = x * push;
        p[i + 1] = y * push;
        p[i + 2] = z * push;
    }
    return p;
});

// 14: Quantum vs Classical - Yin Yang
export const generateDuality = (c) => cachedGenerator('yinyang', c, (count) => {
    const p = new Float32Array(count * 3);
    const r = 20;
    for (let i = 0; i < count * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random()) * r;

        // S-curve mask
        const x = Math.cos(theta) * rad;
        const y = Math.sin(theta) * rad; // Actually using z for flat

        // Height variation based on Yin/Yang
        // Simple separation: Top half vs Bottom half with S curve
        let z = (Math.random() - 0.5) * 4;

        // Shift halves
        if (x < Math.sin(y * 0.2) * 5) {
            z += 5; // Yang height
        } else {
            z -= 5; // Yin height
        }

        p[i] = x;
        p[i + 1] = y;
        p[i + 2] = z;
    }
    return p;
});

// 15: Ethics - Balanced Scales
export const generateHalo = (c) => cachedGenerator('scales', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const part = Math.random();
        if (part < 0.2) {
            // Central pillar
            p[i] = (Math.random() - 0.5) * 2;
            p[i + 1] = (Math.random() - 0.5) * 40;
            p[i + 2] = (Math.random() - 0.5) * 2;
        } else if (part < 0.4) {
            // Top beam
            p[i] = (Math.random() - 0.5) * 30;
            p[i + 1] = 18 + (Math.random() - 0.5) * 2;
            p[i + 2] = (Math.random() - 0.5) * 2;
        } else {
            // Pans
            const side = Math.random() > 0.5 ? -1 : 1;
            const r = 8;
            const theta = Math.random() * Math.PI * 2;
            const rad = Math.sqrt(Math.random()) * r;

            p[i] = side * 15 + Math.cos(theta) * rad;
            // Hanging down
            p[i + 1] = 5 + (rad * rad * 0.05); // Bowl shape
            p[i + 2] = Math.sin(theta) * rad;
        }
    }
    return p;
});

// 16: Shutdown - Black Hole
export const generateSingularity = (c) => cachedGenerator('blackhole', c, (count) => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
        const type = Math.random();
        if (type > 0.1) {
            // Accretion disk
            const angle = Math.random() * Math.PI * 2;
            const r = 10 + Math.random() * 25;
            // Spiraling in
            p[i] = Math.cos(angle) * r;
            p[i + 1] = (Math.random() - 0.5) * (r * 0.1); // Thin disk
            p[i + 2] = Math.sin(angle) * r;
        } else {
            // Event horizon (Void sphere)
            // Just faint hints of it
            const pt = randomInSphere(8);
            p[i] = pt[0];
            p[i + 1] = pt[1];
            p[i + 2] = pt[2];
        }
    }
    return p;
});

// Legacy exports mapping to new shapes
export const generateTorusKnot = generateWavePlane;
export const generateTorus = generateMolecule;
export const generateHelix = generateTimeline;
export const generateRing = generateHalo;
export const generateTunnel = generateTimeline;

// Clear cache (for memory management)
export const clearShapeCache = () => shapeCache.clear();
