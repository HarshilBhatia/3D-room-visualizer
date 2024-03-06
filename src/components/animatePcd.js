import TWEEN from '@tweenjs/tween.js';
// import { createDistances, createTranformationAndRotation } from './pcdUtils';
import poses from './poses.json';
import {useEffect} from 'react';


export const AnimationControls = ({ iteration, rendererRef, setShowImage }) => {
  
  // internal global variables
  // TODO : import this and rotation matrix via function from utils. 
  const positionList = poses.poses.map(pose => ({
    x: pose[0][3],
    y: pose[1][3],
    z: pose[2][3], 
  }));

  var next_iterator = 0;
  const listLength = positionList.length;

  useEffect(() => {
    // console.log(iteration)
    setShowImage(false);


    const animate = () => {
      next_iterator = iteration

      // TODO: Fix this to return the hook based on listLength.
      if (next_iterator < 0) next_iterator += 10000*listLength;
      next_iterator %= listLength;


      new TWEEN.Tween(rendererRef.camera.position)
      .to(positionList[next_iterator], 2000 ) // * dist_list[position_iterator]) 
      .easing(TWEEN.Easing.Quadratic.Out) 
      .onUpdate(({x, y, z}) => {
        rendererRef.camera.position.set(x,y,z);
          // camera.rotation.setFromRotationMatrix(rotationMatrices[next_iterator])
          rendererRef.camera.lookAt(rendererRef.scene.position); 
      })
      .start()
      .onComplete(()=>{setShowImage(true);}); 

    };

    const animate_positions = () => {
      requestAnimationFrame(animate_positions);
      TWEEN.update(); // Update all tweens
      rendererRef.renderer.render(rendererRef.scene, rendererRef.camera);
    };

    animate_positions();

    animate(); 

  }, [iteration]);

  return null; 
};
