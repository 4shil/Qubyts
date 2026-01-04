// Shape generator functions for 3D particle system

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

export const generateGrid = (c) => {
    const p = new Float32Array(c * 3);
    const s = Math.sqrt(c);
    const g = 1.5;
    let x = 0;
    for (let i = 0; i < s; i++) {
        for (let j = 0; j < s; j++) {
            if (x < c * 3) {
                p[x] = (i - s / 2) * g;
                p[x + 1] = (Math.random() - 0.5) * 2;
                p[x + 2] = (j - s / 2) * g;
                x += 3;
            }
        }
    }
    return p;
};

export const generateTorus = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 16, r = 6;
        p[i] = (R + r * Math.cos(v)) * Math.cos(u);
        p[i + 1] = r * Math.sin(v);
        p[i + 2] = (R + r * Math.cos(v)) * Math.sin(u);
    }
    return p;
};

export const generateHelix = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        const t = (Math.random() - 0.5) * 60;
        const r = 9;
        const a = t * 0.3;
        const s = Math.random() > 0.5 ? 0 : Math.PI;
        p[i] = r * Math.cos(a + s) + (Math.random() - 0.5) * 1.5;
        p[i + 1] = t;
        p[i + 2] = r * Math.sin(a + s) + (Math.random() - 0.5) * 1.5;
    }
    return p;
};

export const generateNetwork = (c) => {
    const p = new Float32Array(c * 3);
    const n = 15;
    const l = [];
    for (let i = 0; i < n; i++) {
        l.push({
            x: (Math.random() - 0.5) * 35,
            y: (Math.random() - 0.5) * 35,
            z: (Math.random() - 0.5) * 35
        });
    }
    for (let i = 0; i < c * 3; i += 3) {
        const k = l[Math.floor(Math.random() * n)];
        const r = Math.random() * 7;
        const t = Math.random() * 2 * Math.PI;
        const f = Math.random() * Math.PI;
        p[i] = k.x + r * Math.sin(f) * Math.cos(t);
        p[i + 1] = k.y + r * Math.sin(f) * Math.sin(t);
        p[i + 2] = k.z + r * Math.cos(f);
    }
    return p;
};

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

export const generateNebula = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        p[i] = (Math.random() - 0.5) * 70;
        p[i + 1] = (Math.random() - 0.5) * 20;
        p[i + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
};

export const generatePyramid = (c) => {
    const p = new Float32Array(c * 3);
    const s = 25, h = 30;
    for (let i = 0; i < c * 3; i += 3) {
        const t = Math.random();
        const y = (1 - t) * h - 12;
        const k = t * s;
        p[i] = (Math.random() - 0.5) * 2 * k;
        p[i + 1] = -y;
        p[i + 2] = (Math.random() - 0.5) * 2 * k;
    }
    return p;
};

export const generateRing = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        const a = Math.random() * Math.PI * 2;
        const r = 18 + Math.random() * 12;
        p[i] = Math.cos(a) * r;
        p[i + 1] = (Math.random() - 0.5) * 2;
        p[i + 2] = Math.sin(a) * r;
    }
    return p;
};

export const generateTunnel = (c) => {
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c * 3; i += 3) {
        const a = Math.random() * Math.PI * 2;
        const r = 12 + Math.random() * 3;
        const z = (Math.random() - 0.5) * 120;
        p[i] = Math.cos(a) * r;
        p[i + 1] = Math.sin(a) * r;
        p[i + 2] = z;
    }
    return p;
};

export const generateCube = (c) => {
    const p = new Float32Array(c * 3);
    const s = 28;
    for (let i = 0; i < c * 3; i += 3) {
        p[i] = (Math.random() - 0.5) * s;
        p[i + 1] = (Math.random() - 0.5) * s;
        p[i + 2] = (Math.random() - 0.5) * s;
    }
    return p;
};
