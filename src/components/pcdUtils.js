

// function calculateEuclideanDistance(point1, point2) {
//     let sumOfSquares = 0;
//     for (const key in point1) {
//       if (point2.hasOwnProperty(key)) {
//         const difference = point1[key] - point2[key];
//         sumOfSquares += difference * difference;
//       }
//     }
//     return Math.sqrt(sumOfSquares);
//   }
  
  
// function createDistances(positionList){

//     var dist_list = [];
//     for (let i = 0; i < positionList.length; i++){
//       dist_list.push(calculateEuclideanDistance(positionList[i], positionList[(i+1)%positionList.length]));
//     }
//     // normalize dist_list with max distance 
//     const max_dist = Math.max(...dist_list);
//     for (let i = 0; i < dist_list.length; i++){
//       dist_list[i] = dist_list[i] / max_dist;
//     }
//     return dist_list
//   }


// export const createTranformationAndRotation(poses) => {
//   const transformedPoses = poses.poses.map(pose => ({
//     x: pose[0][3],
//     y: pose[1][3],
//     z: pose[2][3], 
//   }));

//   const rotationMatrices = poses.poses.map(pose => {
//     const matrix4 = new THREE.Matrix4();
//     // Flatten the 3x3 matrix to a single array and add the identity component for a 4x4 matrix
//     const matrixArray = [
//       pose[0][0], pose[0][1], pose[0][2], 0,
//       pose[1][0], pose[1][1], pose[1][2], 0,
//       pose[2][0], pose[2][1], pose[2][2], 0,
//       0, 0, 0, 1
//     ];
//     matrix4.set(...matrixArray);
//     return matrix4;
//   });

//   return {transformedPoses, rotationMatrices}  
// }


// export {createDistances}
