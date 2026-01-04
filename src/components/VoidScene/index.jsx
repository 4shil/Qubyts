import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
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

gsap.registerPlugin(ScrollTrigger);

const VoidScene = ({ onReady }) => {
    const containerRef = useRef(null);
    const { isDark } = useTheme();
    const particleCountRef = useRef(3500);
    const currentShapeRef = useRef(0);
    const targetShapeRef = useRef(0);
    const transitionProgressRef = useRef(1);
    const colorRef = useRef({ r: 0, g: 0.95, b: 1 });

    useEffect(() => {
        if (!containerRef.current) return;

        // Update particle count based on screen size
        if (window && window.innerWidth) {
            particleCountRef.current = window.innerWidth < 768 ? 1200 : 3500;
        }

        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

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

        // Create scroll triggers for each section
        const sections = gsap.utils.toArray('.section-snap');

        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    morphToShape(i);
                },
                onEnterBack: () => {
                    morphToShape(i);
                },
            });
        });

        const morphToShape = (index) => {
            if (index === targetShapeRef.current) return;

            const validIndex = Math.min(index, shapes.length - 1);
            targetShapeRef.current = validIndex;

            // Animate transition progress
            gsap.to(transitionProgressRef, {
                current: 0,
                duration: 0.1,
                onComplete: () => {
                    currentShapeRef.current = validIndex;
                    gsap.to(transitionProgressRef, {
                        current: 1,
                        duration: 1.2,
                        ease: 'power2.out',
                    });
                }
            });

            // Animate color
            const targetColor = CONFIG.themes[validIndex].color;
            gsap.to(colorRef.current, {
                r: targetColor.r,
                g: targetColor.g,
                b: targetColor.b,
                duration: 1.5,
                ease: 'power2.out',
            });
        };

        const clock = new THREE.Clock();
        let mouseX = 0, mouseY = 0;

        const onMouseMove = (e) => {
            if (window) {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            }
        };
        window.addEventListener('mousemove', onMouseMove);

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

        let animationFrameId;
        const animate = () => {
            const time = clock.getElapsedTime();
            const positions = particles.geometry.attributes.position.array;
            const targetShape = shapes[currentShapeRef.current];
            const progress = transitionProgressRef.current;

            // Smooth morphing with eased interpolation
            const morphSpeed = 0.06 + (1 - progress) * 0.04;

            for (let i = 0; i < particleCountRef.current * 3; i++) {
                positions[i] += (targetShape[i] - positions[i]) * morphSpeed;
            }

            // Add subtle wave animation
            for (let i = 0; i < particleCountRef.current * 3; i += 3) {
                positions[i + 1] += Math.sin(positions[i] * 0.1 + time * 1.5) * 0.015;
                positions[i] += Math.cos(positions[i + 2] * 0.1 + time * 1.2) * 0.01;
            }

            particles.geometry.attributes.position.needsUpdate = true;

            // Update color smoothly
            material.color.r = colorRef.current.r;
            material.color.g = colorRef.current.g;
            material.color.b = colorRef.current.b;

            // Rotation with mouse interaction
            particles.rotation.y += 0.0008;
            particles.rotation.x = lerp(particles.rotation.x, mouseY * 0.25, 0.03);
            particles.rotation.z = lerp(particles.rotation.z, mouseX * 0.25, 0.03);

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);

        const handleResize = () => {
            if (window) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        if (onReady) {
            onReady();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouch);
            if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [isDark, onReady]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        />
    );
};

export default VoidScene;
