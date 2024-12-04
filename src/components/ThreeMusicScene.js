import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeMusicScene = () => {
  const containerRef = useRef(null);
  const mixerRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 3);
    camera.lookAt(0, 1, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add some colored spotlights for dance floor effect
    const createSpotlight = (color, position) => {
      const light = new THREE.SpotLight(color, 2);
      light.position.set(...position);
      light.angle = Math.PI / 4;
      light.penumbra = 0.1;
      light.decay = 2;
      light.distance = 200;
      scene.add(light);
      return light;
    };

    const spotlights = [
      createSpotlight(0xff0000, [-4, 4, 2]),
      createSpotlight(0x00ff00, [4, 4, 2]),
      createSpotlight(0x0000ff, [0, 4, -2])
    ];

    // Load character model
    const loader = new GLTFLoader();
    
    loader.load(
      '/models/avatar.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        scene.add(model);
        modelRef.current = model;

        // Find important bones if they exist
        const bones = {};
        model.traverse((object) => {
          if (object.isBone) {
            bones[object.name] = object;
          }
        });

        // Animation loop with dance moves
        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);
          const time = clock.getElapsedTime();

          // Basic dance movements for the whole model
          if (modelRef.current) {
            // Bouncing movement
            modelRef.current.position.y = Math.sin(time * 4) * 0.1;
            
            // Swaying movement
            modelRef.current.rotation.y = Math.sin(time * 2) * 0.3;
            
            // Slight tilting
            modelRef.current.rotation.z = Math.sin(time * 4) * 0.05;

            // Move arms if bones exist
            if (bones['LeftArm']) {
              bones['LeftArm'].rotation.z = Math.sin(time * 4) * 0.5;
              bones['LeftArm'].rotation.x = Math.cos(time * 2) * 0.5;
            }
            if (bones['RightArm']) {
              bones['RightArm'].rotation.z = -Math.sin(time * 4) * 0.5;
              bones['RightArm'].rotation.x = Math.cos(time * 2 + Math.PI) * 0.5;
            }

            // Move legs if bones exist
            if (bones['LeftLeg']) {
              bones['LeftLeg'].rotation.x = Math.sin(time * 4) * 0.2;
            }
            if (bones['RightLeg']) {
              bones['RightLeg'].rotation.x = -Math.sin(time * 4) * 0.2;
            }
          }

          // Animate spotlights
          spotlights.forEach((light, index) => {
            light.position.x = Math.sin(time * 0.7 + index * Math.PI / 2) * 4;
            light.position.z = Math.cos(time * 0.7 + index * Math.PI / 2) * 4;
          });

          renderer.render(scene, camera);
        };

        animate();
      },
      (progress) => {
        console.log('Loading model...', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-96 rounded-lg overflow-hidden">
    </div>
  );
};

export default ThreeMusicScene;