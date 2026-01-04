import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import useAppStore from '../../store/useAppStore';
import { CONFIG } from './config';
import {
    generateSphere,
    generateTorusKnot,
    generateLattice,
    generateNeuralWeb,
    generateQubitGrid,
    generateNebula,
    generateShield,
    generateHelix,
    generateTorus,
    generateTunnel,
    generateRing,
    generateWavePlane,
    generateCylinder,
    generateGlobe,
    generateBook,
    generateTimeline,
    generateMolecule,
    generateHalo,
    generateSingularity,
} from './shapeGenerators';

const VoidScene = ({ currentSection, onReady }) => {
    const containerRef = useRef(null);
    const { isDark } = useTheme();
    const { activeEffect, isReducedMotion } = useAppStore();

    const particleCountRef = useRef(4000);
    const effectStateRef = useRef({ explode: 0, pulse: 0, collapse: 0, freeze: false });
    const breathingRef = useRef(0);
    const prevSectionRef = useRef(0);

    const updateParticleCount = useCallback(() => {
        if (typeof window !== 'undefined' && window.innerWidth) {
            const count = window.innerWidth < 768 ? 1500 : 4000;
            particleCountRef.current = count;
        }
    }, []);

    useEffect(() => {
        console.log("[VoidScene v2.0] Initializing with discrete section transitions...");

        if (!containerRef.current) return;
        while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);

        updateParticleCount();

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(isDark ? 0x020202 : 0xFAFAFA, 0.012);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 35;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Generate all 17 shapes (discrete states)
        const shapes = [
            generateSphere(particleCountRef.current),      // 0: Hero
            generateWavePlane(particleCountRef.current),   // 1: Philosophy
            generateCylinder(particleCountRef.current),    // 2: Hardware
            generateLattice(particleCountRef.current),     // 3: Q-OS
            generateQubitGrid(particleCountRef.current),   // 4: Developer
            generateGlobe(particleCountRef.current),       // 5: Cloud
            generateShield(particleCountRef.current),      // 6: Security
            generateBook(particleCountRef.current),        // 7: Research
            generateMolecule(particleCountRef.current),    // 8: Applications
            generateTimeline(particleCountRef.current),    // 9: Roadmap
            generateNeuralWeb(particleCountRef.current),   // 10: Community
            generateSphere(particleCountRef.current),      // 11: Contact (calm)
            generateWavePlane(particleCountRef.current),   // 12: Quantum Fabric
            generateNebula(particleCountRef.current),      // 13: Decoherence
            generateLattice(particleCountRef.current),     // 14: Quantum vs Classical
            generateHalo(particleCountRef.current),        // 15: Ethics
            generateSingularity(particleCountRef.current), // 16: Shutdown
        ];

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(shapes[0]), 3));

        const material = new THREE.PointsMaterial({
            size: CONFIG.particleSize,
            color: isDark ? 0x00f3ff : 0x4f46e5,
            transparent: true,
            opacity: isDark ? 0.9 : 0.85,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const clock = new THREE.Clock();
        let mouseX = 0, mouseY = 0;
        let currentSectionLocal = 0;

        const onMM = (e) => {
            if (typeof window !== 'undefined') {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            }
        };
        window.addEventListener('mousemove', onMM);

        const lerp = (s, e, t) => s * (1 - t) + e * t;

        const animate = () => {
            const time = clock.getElapsedTime();
            const positions = particles.geometry.attributes.position.array;

            // Get current section from store
            currentSectionLocal = useAppStore.getState().currentSection;
            const targetShape = shapes[Math.min(currentSectionLocal, shapes.length - 1)];

            // Effect handlers
            const effectState = effectStateRef.current;
            effectState.explode *= 0.92;
            effectState.pulse *= 0.94;
            effectState.collapse *= 0.95;

            // Breathing (idle)
            if (!effectState.freeze && !isReducedMotion) {
                breathingRef.current = Math.sin(time * 0.5) * 0.02;
            }

            // Discrete morph (faster transition for section changes)
            const morphSpeed = effectState.freeze ? 0 : 0.12;

            for (let i = 0; i < particleCountRef.current * 3; i++) {
                let target = targetShape[i];

                // Explode effect
                if (effectState.explode > 0.01) {
                    const idx = Math.floor(i / 3);
                    const px = positions[idx * 3];
                    const py = positions[idx * 3 + 1];
                    const pz = positions[idx * 3 + 2];
                    const dist = Math.sqrt(px * px + py * py + pz * pz) || 1;
                    target += (positions[i] / dist) * effectState.explode * 25;
                }

                // Collapse effect
                if (effectState.collapse > 0.01) {
                    target *= (1 - effectState.collapse * 0.6);
                }

                positions[i] += (target - positions[i]) * morphSpeed;
            }

            // Pulse
            if (effectState.pulse > 0.01) {
                particles.scale.setScalar(1 + effectState.pulse * 0.4);
                material.opacity = Math.min(1, (isDark ? 0.9 : 0.85) + effectState.pulse * 0.4);
            } else {
                particles.scale.setScalar(1 + breathingRef.current);
                material.opacity = isDark ? 0.9 : 0.85;
            }

            // Wave animation
            if (!effectState.freeze && !isReducedMotion) {
                for (let i = 0; i < particleCountRef.current * 3; i += 3) {
                    positions[i + 1] += Math.sin(positions[i] * 0.1 + time * 1.2) * 0.012;
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Color interpolation (using section index)
            const themeIndex = Math.min(currentSectionLocal, CONFIG.themes.length - 1);
            const currentTheme = CONFIG.themes[themeIndex];
            material.color.r = lerp(material.color.r, currentTheme.color.r, 0.06);
            material.color.g = lerp(material.color.g, currentTheme.color.g, 0.06);
            material.color.b = lerp(material.color.b, currentTheme.color.b, 0.06);

            // Rotation
            if (!effectState.freeze && !isReducedMotion) {
                particles.rotation.y += 0.0008;
                particles.rotation.x = lerp(particles.rotation.x, mouseY * 0.2, 0.03);
                particles.rotation.z = lerp(particles.rotation.z, mouseX * 0.2, 0.03);
            }

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        const animationFrameId = requestAnimationFrame(animate);

        const handleResize = () => {
            if (typeof window !== 'undefined') {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                updateParticleCount();
            }
        };
        window.addEventListener('resize', handleResize);

        if (onReady) {
            console.log("[VoidScene v2.0] Ready.");
            onReady();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMM);
            if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose(); material.dispose(); renderer.dispose();
        };
    }, [isDark, onReady, updateParticleCount, isReducedMotion]);

    // Effect triggers
    useEffect(() => {
        if (activeEffect === 'explode') {
            effectStateRef.current.explode = 1;
        } else if (activeEffect === 'pulse') {
            effectStateRef.current.pulse = 1;
        } else if (activeEffect === 'collapse') {
            effectStateRef.current.collapse = 1;
        } else if (activeEffect === 'freeze') {
            effectStateRef.current.freeze = !effectStateRef.current.freeze;
        }
    }, [activeEffect]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
    );
};

export default VoidScene;
