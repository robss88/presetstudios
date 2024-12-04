import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const AvatarCustomizer = () => {
  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Customization states
  const [skinColor, setSkinColor] = useState('#ffdbac');
  const [hairColor, setHairColor] = useState('#4a2f24');
  const [shirtColor, setShirtColor] = useState('#2196f3');
  const [pantsColor, setPantsColor] = useState('#212121');

  useEffect(() => {
    if (!containerRef.current) return;

    // Get initial container dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup with correct initial aspect ratio
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 3);
    camera.lookAt(0, 1, 0);

    // Renderer setup with initial size
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Rest of your existing code...
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 2, 4);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 2, -4);
    scene.add(backLight);

    // Load and set up the avatar model
    const loader = new GLTFLoader();
    loader.load(
      '/models/avatar.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        scene.add(model);
        modelRef.current = model;
        setLoading(false);

        // Set up materials mapping
        model.traverse((object) => {
          if (object.isMesh) {
            if (object.name.toLowerCase().includes('hair')) {
              object.userData.type = 'hair';
            } else if (object.name.toLowerCase().includes('skin') || 
                      object.name.toLowerCase().includes('head') || 
                      object.name.toLowerCase().includes('face')) {
              object.userData.type = 'skin';
            } else if (object.name.toLowerCase().includes('shirt') || 
                      object.name.toLowerCase().includes('top')) {
              object.userData.type = 'shirt';
            } else if (object.name.toLowerCase().includes('pants') || 
                      object.name.toLowerCase().includes('bottom')) {
              object.userData.type = 'pants';
            }
            object.material = object.material.clone();
          }
        });

        // Initial material update
        updateMaterials();
      },
      (progress) => {
        console.log('Loading model...', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoading(false);
      }
    );

    const updateMaterials = () => {
      if (!modelRef.current) return;

      modelRef.current.traverse((object) => {
        if (object.isMesh && object.userData.type) {
          let color;
          switch (object.userData.type) {
            case 'hair':
              color = new THREE.Color(hairColor);
              break;
            case 'skin':
              color = new THREE.Color(skinColor);
              break;
            case 'shirt':
              color = new THREE.Color(shirtColor);
              break;
            case 'pants':
              color = new THREE.Color(pantsColor);
              break;
            default:
              return;
          }
          object.material.color = color;
        }
      });
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

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

    // Call handleResize once to ensure initial size is correct
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update materials when colors change
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((object) => {
        if (object.isMesh && object.userData.type) {
          let color;
          switch (object.userData.type) {
            case 'hair':
              color = new THREE.Color(hairColor);
              break;
            case 'skin':
              color = new THREE.Color(skinColor);
              break;
            case 'shirt':
              color = new THREE.Color(shirtColor);
              break;
            case 'pants':
              color = new THREE.Color(pantsColor);
              break;
            default:
              return;
          }
          object.material.color = color;
        }
      });
    }
  }, [skinColor, hairColor, shirtColor, pantsColor]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-96 rounded-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            Loading...
          </div>
        )}
      </div>
      
      {/* Customization UI */}
      <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Skin Color</label>
            <input
              type="color"
              value={skinColor}
              onChange={(e) => setSkinColor(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hair Color</label>
            <input
              type="color"
              value={hairColor}
              onChange={(e) => setHairColor(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shirt Color</label>
            <input
              type="color"
              value={shirtColor}
              onChange={(e) => setShirtColor(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pants Color</label>
            <input
              type="color"
              value={pantsColor}
              onChange={(e) => setPantsColor(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizer;