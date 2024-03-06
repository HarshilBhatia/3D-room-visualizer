import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import NavigationControls from './NavigationControls'; // Import the NavigationControls component

import {PointCloudLoader} from './loadPcd'
import './pointcloud.css'; // Import the CSS file
import {AnimationControls} from './animatePcd.js'

// TODO: 
// implement rotation and viewing direction. That is left.
// implement a 2D image to appear.

const PointCloudViewer = ({ pointCloudUrl }) => {
  
  // references
  const mountRef = useRef(null); //renderer DOM element
  const rendererRef = useRef(); //  accessing renderer elements

  // hooks
  const [iteration, setIteration] = useState(0); // Manage iteration state 
  const [showImage, setShowImage] = useState(false); // Manage showing image

  PointCloudLoader(pointCloudUrl, mountRef, rendererRef);
  // TODO initial position. 

  
  const handleAnimationStart = (newIterationValue) => {
    setIteration(iteration + newIterationValue);
  };
  
  AnimationControls({ iteration, rendererRef, setShowImage});

  useEffect(() => {
    document.addEventListener('click', stopShowImage);
    return () => {
      document.removeEventListener('click', stopShowImage);
    };
  }, []);

  // event handlers
  const stopShowImage = () => setShowImage(false);
  const handlePrevClick = () => {handleAnimationStart(-1); };
  const handleNextClick = () => {handleAnimationStart(1);};
  
  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%'}}> 
      {showImage && <img src='im1.png' style={{ position: 'absolute', top: 0, left: 0 }} alt="Overlay" />}
      </div>
      <NavigationControls onPrevClick={handlePrevClick} onNextClick={handleNextClick} />
    </Box>
  );
};

export default PointCloudViewer;
