import { useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import useAppStore from '../../store/useAppStore';
import { CONFIG } from './config';
import {
    generateSphere,
    generateWavePlane,
    generateCylinder,
    generateLattice,
    generateQubitGrid,
    generateGlobe,
    generateShield,
    generateBook,
    generateMolecule,
    generateTimeline,
    generateNeuralWeb,
    generateCalmSphere,
    generateFabric,
    generateNebula,
    generateDuality,
    generateHalo,
    generateSingularity,
    clearShapeCache,
} from './shapeGenerators';

// Clear shape cache on load to ensure new sizes take effect
clearShapeCache();

const VoidScene = ({ onReady }) => {
    const containerRef = useRef(null);
    const { isDark } = useTheme();
    const { activeEffect, isReducedMotion } = useAppStore();

    // Reduced particle count for smoother performance
    const particleCount = useMemo(() => {
        if (typeof window === 'undefined') return 2000;
        return window.innerWidth < 768 ? 800 : 2000;
    }, []);

    const effectStateRef = useRef({ explode: 0, pulse: 0, collapse: 0, freeze: false });
    const breathingRef = useRef(0);

    // Pre-generate all shapes once
    const shapes = useMemo(() => [
        generateSphere(particleCount),      // 0: Hero
        generateWavePlane(particleCount),   // 1: Philosophy
        generateCylinder(particleCount),    // 2: Hardware
        generateLattice(particleCount),     // 3: Q-OS
        generateQubitGrid(particleCount),   // 4: Developer
        generateGlobe(particleCount),       // 5: Cloud
        generateShield(particleCount),      // 6: Security
        generateBook(particleCount),        // 7: Research
        generateMolecule(particleCount),    // 8: Applications
        generateTimeline(particleCount),    // 9: Roadmap
        generateNeuralWeb(particleCount),   // 10: Community
        generateCalmSphere(particleCount),  // 11: Contact
        generateFabric(particleCount),      // 12: Quantum Fabric
        generateNebula(particleCount),      // 13: Decoherence
        generateDuality(particleCount),     // 14: Quantum vs Classical
        generateHalo(particleCount),        // 15: Ethics
        generateSingularity(particleCount), // 16: Shutdown
    ], [particleCount]);

    useEffect(() => {
        console.log("[VoidScene v2.1] Optimized init...");

        if (!containerRef.current) return;
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(isDark ? 0x020202 : 0xFAFAFA, 0.004);

        // Responsive camera distance to keep objects in view
        const getZPos = () => {
            const width = window.innerWidth;
            // Further back for smaller screens to fit the width
            if (width < 768) return 85;
            if (width < 1200) return 60;
            return 45;
        };

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = getZPos();

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false, // Disable for performance
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        containerRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(shapes[0]), 3));

        const material = new THREE.PointsMaterial({
            size: CONFIG.particleSize,
            color: isDark ? 0x00f3ff : 0x4f46e5,
            transparent: true,
            opacity: isDark ? 0.85 : 0.8,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let mouseX = 0, mouseY = 0;
        let animationId;
        // Native refresh rate (no throttle)
        const onMM = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMM, { passive: true });

        const lerp = (s, e, t) => s + (e - s) * t;

        // Sync local reference for zero-latency access in loop
        const currentSectionRef = { value: useAppStore.getState().currentSection };
        const unsubscribe = useAppStore.subscribe(
            state => (currentSectionRef.value = state.currentSection)
        );

        const animate = (time) => {
            animationId = requestAnimationFrame(animate);

            const positions = particles.geometry.attributes.position.array;
            const currentSectionLocal = currentSectionRef.value;
            const targetShape = shapes[Math.min(currentSectionLocal, shapes.length - 1)];

            // Effect decay
            const effectState = effectStateRef.current;
            effectState.explode *= 0.92;
            effectState.pulse *= 0.94;
            effectState.collapse *= 0.95;

            // Breathing
            if (!effectState.freeze && !isReducedMotion) {
                breathingRef.current = Math.sin(time * 0.0005) * 0.02;
            }

            // Morph (Smooth fluid transition)
            const morphThreshold = 0.001;
            const morphSpeed = effectState.freeze ? 0 : 0.12; // Smooth organic feel
            let hasChanges = false;

            for (let i = 0; i < particleCount * 3; i += 3) {
                const dx = targetShape[i] - positions[i];
                const dy = targetShape[i + 1] - positions[i + 1];
                const dz = targetShape[i + 2] - positions[i + 2];

                if (Math.abs(dx) > morphThreshold || Math.abs(dy) > morphThreshold || Math.abs(dz) > morphThreshold) {
                    positions[i] += dx * morphSpeed;
                    positions[i + 1] += dy * morphSpeed;
                    positions[i + 2] += dz * morphSpeed;
                    hasChanges = true;
                }
            }

            // Only update geometry and pulse scale if there's actual motion
            if (hasChanges || effectState.pulse > 0.01 || Math.abs(breathingRef.current) > 0.001) {
                // Pulse scale
                if (effectState.pulse > 0.01) {
                    particles.scale.setScalar(1 + effectState.pulse * 0.4);
                } else {
                    particles.scale.setScalar(1 + breathingRef.current);
                }
                particles.geometry.attributes.position.needsUpdate = true;
            }

            // Color transition (Smooth fade)
            const themeIndex = Math.min(currentSectionLocal, CONFIG.themes.length - 1);
            const currentTheme = CONFIG.themes[themeIndex];
            material.color.r = lerp(material.color.r, currentTheme.color.r, 0.08);
            material.color.g = lerp(material.color.g, currentTheme.color.g, 0.08);
            material.color.b = lerp(material.color.b, currentTheme.color.b, 0.08);

            // Rotation
            if (!effectState.freeze && !isReducedMotion) {
                particles.rotation.y += 0.0006;
                particles.rotation.x = lerp(particles.rotation.x, mouseY * 0.15, 0.02);
                particles.rotation.z = lerp(particles.rotation.z, mouseX * 0.15, 0.02);
            }

            renderer.render(scene, camera);
        };
        animationId = requestAnimationFrame(animate);

        const handleResize = () => {
            const width = window.innerWidth;
            camera.aspect = width / window.innerHeight;
            camera.updateProjectionMatrix();
            camera.position.z = getZPos();
            renderer.setSize(width, window.innerHeight);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        // Visibility API - pause when not visible
        const handleVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animationId = requestAnimationFrame(animate);
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        if (onReady) {
            console.log("[VoidScene v2.1] Ready.");
            onReady();
        }

        return () => {
            cancelAnimationFrame(animationId);
            unsubscribe();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMM);
            document.removeEventListener('visibilitychange', handleVisibility);
            if (containerRef.current?.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [isDark, onReady, shapes, particleCount, isReducedMotion]);

    // Effect triggers
    useEffect(() => {
        if (activeEffect === 'explode') effectStateRef.current.explode = 1;
        else if (activeEffect === 'pulse') effectStateRef.current.pulse = 1;
        else if (activeEffect === 'collapse') effectStateRef.current.collapse = 1;
        else if (activeEffect === 'freeze') effectStateRef.current.freeze = !effectStateRef.current.freeze;
    }, [activeEffect]);

    return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default VoidScene;
