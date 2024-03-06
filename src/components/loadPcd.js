import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const PointCloudLoader = (pointCloudUrl, mountRef, rendererRef) => {
  const [elements, setElements] = useState({ renderer: null, scene: null, camera: null });

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => renderer.render(scene, camera));

    const loader = new PLYLoader();
    loader.load(pointCloudUrl, (geometry) => {
      geometry.computeVertexNormals();
      const material = new THREE.PointsMaterial({ size: 0.005, vertexColors: true });
      const pointCloud = new THREE.Points(geometry, material);
      scene.add(pointCloud);

      // point at the center, will omit later.  
      const center = new THREE.Vector3();
      geometry.computeBoundingBox();
      geometry.boundingBox.getCenter(center);
      camera.lookAt(center);
      renderer.render(scene, camera);
    }, undefined, (error) => console.error('An error occurred:', error));

    rendererRef.camera = camera;
    rendererRef.scene = scene;
    rendererRef.renderer = renderer;
    // setElements({ renderer, scene, camera });

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [pointCloudUrl]);

  return elements;
};
