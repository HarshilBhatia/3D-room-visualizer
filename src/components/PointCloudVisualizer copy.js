import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import TWEEN from '@tweenjs/tween.js';
import Box from '@mui/material/Box';
import NavigationControls from './NavigationControls'; // Import the NavigationControls component
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import poses from './poses.json';
// import { createDistances } from './PointCloudVisualizerUtils.js';

import './pointcloud.css'; // Import the CSS file


// TODO: 
// implement rotation and viewing direction. That is left.
// implement a 2D image to appear.


const PointCloudViewer = ({ pointCloudUrl }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(); // Ref for accessing renderer elements


  const [loaded, setLoaded] = useState(false); // State to track if the PLY is loaded
  const [showPointCloud, setShowPointCloud] = useState(true);

  // console.log(showPointCloud)
  // type in js
  // const type = (obj) => {
  
  const transformedPoses = poses.poses.map(pose => ({
    x: pose[0][3],
    y: pose[1][3],
    z: pose[2][3], 
  }));

  const rotationMatrices = poses.poses.map(pose => {
    const matrix4 = new THREE.Matrix4();
    // Flatten the 3x3 matrix to a single array and add the identity component for a 4x4 matrix
    const matrixArray = [
      pose[0][0], pose[0][1], pose[0][2], 0,
      pose[1][0], pose[1][1], pose[1][2], 0,
      pose[2][0], pose[2][1], pose[2][2], 0,
      0, 0, 0, 1
    ];
    matrix4.set(...matrixArray);
    return matrix4;
  });

  const positionList = transformedPoses
  const dist_list = createDistances(positionList)


  var position_iterator = 0;
  const listLength = positionList.length;

  const interpolate_views = (next_iterator) => {
    // setShowPointCloud(true)
    if (next_iterator < 0) next_iterator += listLength;
    if (!rendererRef.renderer) return; 
    next_iterator %= listLength;

    var startPosition = {...rendererRef.camera.position}
    var endPosition = { ...positionList[next_iterator] };
    // Create a tween for the camera position

    new TWEEN.Tween(startPosition)
    .to(endPosition, 4000 * dist_list[position_iterator]) 
    .easing(TWEEN.Easing.Quadratic.Out) 
    .onUpdate(({x, y, z}) => {
        rendererRef.camera.position.set(x,y,z);
        // rendererRef.camera.rotation.setFromRotationMatrix(rotationMatrices[next_iterator])

        rendererRef.camera.lookAt(rendererRef.scene.position); 
    })
    .start()
    .onComplete(()=>{ setShowPointCloud(false);}); // Start the tween animation

    position_iterator = next_iterator; 
    if (position_iterator >= listLength){
      position_iterator = 0;
    }
    rendererRef.camera.position.set(endPosition)
  };

  // Animation loop to update tweens
  const animate_positions = () => {
    if (!rendererRef.renderer) return;
    requestAnimationFrame(animate_positions);
    TWEEN.update(); // Update all tweens
    rendererRef.renderer.render(rendererRef.scene, rendererRef.camera);
  };

  if (rendererRef.renderer) animate_positions();

  useEffect(() => {

    if (!showPointCloud) {
      return; // Skip setup if we're showing the image or the canvas isn't ready
    }
    // Scene setup
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.x = positionList[0].x;
    camera.position.y = positionList[0].y;
    camera.position.z = positionList[0].z;

    // console.log(camera.rotation)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => renderer.render(scene, camera)); // Re-render on control change


    // camera.rotation.setFromRotationMatrix(rotationMatrices[0])


    // Point Cloud Loading
    const loader = new PLYLoader();
    loader.load(
        pointCloudUrl,
      (geometry) => {

        // error handling the loading of ply file.
        if (geometry.attributes.position) {
            if (geometry.attributes.position.array.byteLength > 0) {
            console.log('Non empty point cloud vertices')
            }
        } else {
            console.error('Position attribute not found in geometry');
        }

        geometry.computeVertexNormals();

        const material = new THREE.PointsMaterial({
            size: 0.001,
            vertexColors: true // Enable the use of vertex colors
          });

        // const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
        const pointCloud = new THREE.Points(geometry, material);
        pointCloud.name = 'pointCloud';
        scene.add(pointCloud);

        // Make the camera look at the center of the point cloud
        geometry.computeBoundingBox()
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center); // need to pass in an empty vector.
        camera.lookAt(center);
        setLoaded(true);
      },
      undefined,
      (error) => {
        console.error('An error happened:', error);
      }
    );

    // if (loaded){
    rendererRef.camera = camera;
    rendererRef.scene = scene;
    rendererRef.renderer = renderer;

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [pointCloudUrl, showPointCloud]); // Re-run this effect if the pointCloudPath changes


  
  const handlePrevClick = () => {
    console.log('handle prev click')
    interpolate_views(position_iterator - 1);
    
  };

  const handleNextClick = () => {
      console.log('handle enxt click')
      interpolate_views(position_iterator + 1);
      // setShowPointCloud(false);
  };

  return (
    // <div>
    <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
      
      {/* <div ref={mountRef} style={{ width: '100%', height: '100%' }} /> */}

      <div ref={mountRef} style={{ width: '100%', height: '100%'}}> 
              {/* {showOverlayImage && <img src='im1.png' style={{ position: 'absolute', top: 0, left: 0 }} alt="Overlay" />} */}

        {showPointCloud && <img src= 'im1.png'  style={{ position: 'absolute', top: 0, left: 0 }} alt="2D" />}
      </div>
      <NavigationControls onPrevClick={handlePrevClick} onNextClick={handleNextClick} />
    </Box>
    // {/* </div> */}
  );
  // return (
  //   <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
  //     <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
  //     <NavigationControls onPrevClick={handlePrevClick} onNextClick={handleNextClick} />
  //   </Box>
  // );

};

export default PointCloudViewer;
