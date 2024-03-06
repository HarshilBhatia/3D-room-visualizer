import open3d as o3d

# Path to your PLY file
ply_path = 'Axle shaft.ply'

# Load the PLY file
point_cloud = o3d.io.read_point_cloud(ply_path)

# Visualize the point cloud
# o3d.visualization.draw_geometries([point_cloud])
import numpy as np

# Generate random colors
num_points = np.asarray(point_cloud.points).shape[0]
blue_color = [0, 0, 1]  # RGB for blue
colors = np.array([blue_color] * num_points) 
# colors = np.random.rand(num_points, 3)  # Random colors in RGB format

# Assign the colors to the point cloud
point_cloud.colors = o3d.utility.Vector3dVector(colors)
o3d.io.write_point_cloud("colored_point_cloud.ply", point_cloud)
