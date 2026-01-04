import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { useVoidScene } from './context';
import { CONFIG } from './config';
import {
    generateSphere,
    generateGrid,
    generateTorus,
    generateHelix,
    generateNetwork,
    generateShield,
    generateNebula,
    generatePyramid,
    generateRing,
    generateTunnel,
    generateCube
} from './shapeGenerators';

const VoidScene = ({ scrollYProgress, onReady }) => {
    const containerRef = useRef(null);
    const { isDark } = useTheme();
    const { activeEffect } = useVoidScene();

    const particleCountRef = useRef(3500);
    const effectStateRef = useRef({ explode: 0, pulse: 0 });

    const updateParticleCount = useCallback(() => {
        if (window && window.innerWidth) {
            const count = window.innerWidth < 768 ? 1200 : 3500;
            particleCountRef.current = count;
        }
    }, []);

    useEffect(() => {
        console.log("[VoidScene] Initializing...");

        if (!containerRef.current) return;
        while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);

        updateParticleCount();

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(isDark ? 0x000000 : 0xF0F2F5, 0.015);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 35;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        const shapes = [
            generateSphere(particleCountRef.current),
            generateGrid(particleCountRef.current),
            generateTorus(particleCountRef.current),
            generateHelix(particleCountRef.current),
            generateNetwork(particleCountRef.current),
            generateShield(particleCountRef.current),
            generateNebula(particleCountRef.current),
            generatePyramid(particleCountRef.current),
            generateRing(particleCountRef.current),
            generateTunnel(particleCountRef.current),
            generateCube(particleCountRef.current)
        ];

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(shapes[0]), 3));

        const material = new THREE.PointsMaterial({
            size: CONFIG.particleSize,
            color: isDark ? 0x00f3ff : 0x4f46e5,
            transparent: true,
            opacity: isDark ? 0.85 : 0.9,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const clock = new THREE.Clock();
        let mouseX = 0, mouseY = 0;

        const onMM = (e) => {
            if (window) {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            }
        };
        window.addEventListener('mousemove', onMM);

        const onTouch = (e) => {
            if (window && e.touches.length > 0) {
                const tx = e.touches[0].clientX;
                const ty = e.touches[0].clientY;
                mouseX = (tx / window.innerWidth) * 2 - 1;
                mouseY = -(ty / window.innerHeight) * 2 + 1;
            }
        };
        window.addEventListener('touchmove', onTouch);

        const lerp = (s, e, t) => s * (1 - t) + e * t;

        const animate = () => {
            const time = clock.getElapsedTime();
            const scroll = scrollYProgress.get();
            const totalSections = CONFIG.themes.length;

            const currentSegment = Math.min(Math.floor(scroll * (totalSections - 0.5)), totalSections - 1);
            const targetShape = shapes[currentSegment];
            const positions = particles.geometry.attributes.position.array;

            // === EFFECT HANDLERS ===
            const effectState = effectStateRef.current;

            // Decay effect intensities
            effectState.explode *= 0.92;
            effectState.pulse *= 0.94;

            // Morph particles toward target shape
            for (let i = 0; i < particleCountRef.current * 3; i++) {
                let target = targetShape[i];

                // Explode effect: push particles outward
                if (effectState.explode > 0.01) {
                    const idx = Math.floor(i / 3);
                    const px = positions[idx * 3];
                    const py = positions[idx * 3 + 1];
                    const pz = positions[idx * 3 + 2];
                    const dist = Math.sqrt(px * px + py * py + pz * pz) || 1;
                    target += (positions[i] / dist) * effectState.explode * 15;
                }

                positions[i] += (target - positions[i]) * 0.08;
            }

            // Pulse effect: scale particles
            if (effectState.pulse > 0.01) {
                const pulseScale = 1 + effectState.pulse * 0.3;
                particles.scale.setScalar(pulseScale);
                material.opacity = Math.min(1, (isDark ? 0.85 : 0.9) + effectState.pulse * 0.3);
            } else {
                particles.scale.setScalar(1);
                material.opacity = isDark ? 0.85 : 0.9;
            }

            // Wave animation
            for (let i = 0; i < particleCountRef.current * 3; i += 3) {
                positions[i + 1] += Math.sin(positions[i] * 0.1 + time * 1.5) * 0.02;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Color interpolation
            const currentTheme = CONFIG.themes[currentSegment];
            material.color.r = lerp(material.color.r, currentTheme.color.r, 0.05);
            material.color.g = lerp(material.color.g, currentTheme.color.g, 0.05);
            material.color.b = lerp(material.color.b, currentTheme.color.b, 0.05);

            // Rotation
            particles.rotation.y += 0.001;
            particles.rotation.x = lerp(particles.rotation.x, mouseY * 0.3, 0.05);
            particles.rotation.z = lerp(particles.rotation.z, mouseX * 0.3, 0.05);
            if (currentSegment === 9) particles.rotation.z += 0.002;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        const animationFrameId = requestAnimationFrame(animate);

        const handleResize = () => {
            if (window) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                updateParticleCount();
            }
        };
        window.addEventListener('resize', handleResize);

        if (onReady) {
            console.log("[VoidScene] Scene ready, signalling onReady.");
            onReady();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMM);
            window.removeEventListener('touchmove', onTouch);
            if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose(); material.dispose(); renderer.dispose();
        };
    }, [isDark, scrollYProgress, onReady, updateParticleCount]);

    // Listen for effect triggers from context
    useEffect(() => {
        if (activeEffect === 'explode') {
            effectStateRef.current.explode = 1;
            console.log("[VoidScene] Explode effect triggered");
        } else if (activeEffect === 'pulse') {
            effectStateRef.current.pulse = 1;
            console.log("[VoidScene] Pulse effect triggered");
        }
    }, [activeEffect]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000" />
    );
};

export default VoidScene;
