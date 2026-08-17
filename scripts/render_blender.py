"""Still render from .blend — frame the entire ship, not a close-up."""
import math
import sys

import bpy
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1 :]
blend_path, out_path = args

bpy.ops.wm.open_mainfile(filepath=blend_path)

scene = bpy.context.scene
scene.render.engine = "BLENDER_WORKBENCH"
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = out_path
scene.render.resolution_x = 1600
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.film_transparent = False

# Frame all visible mesh objects, ignoring tiny helper cubes far from the hull.
meshes = [obj for obj in scene.objects if obj.type == "MESH" and obj.visible_get()]
if not meshes:
    meshes = [obj for obj in scene.objects if obj.type == "MESH"]

# Hide empties / gizmos that appear as floating icons in Workbench.
for obj in scene.objects:
    if obj.type in {"EMPTY", "LIGHT", "ARMATURE", "LATTICE", "FONT"}:
        obj.hide_render = True
        obj.hide_viewport = True

def world_center(obj):
    corners = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    return sum(corners, Vector()) / 8

main_center = sum((world_center(o) for o in meshes), Vector()) / max(len(meshes), 1)
filtered = []
for obj in meshes:
    c = world_center(obj)
    dims = Vector(obj.dimensions)
    volume = abs(dims.x * dims.y * dims.z)
    far_above = c.z - main_center.z > 4
    if far_above:
        obj.hide_render = True
        continue
    filtered.append(obj)
if filtered:
    meshes = filtered

min_c = Vector((float("inf"), float("inf"), float("inf")))
max_c = Vector((float("-inf"), float("-inf"), float("-inf")))
for obj in meshes:
    for corner in obj.bound_box:
        world = obj.matrix_world @ Vector(corner)
        min_c.x = min(min_c.x, world.x)
        min_c.y = min(min_c.y, world.y)
        min_c.z = min(min_c.z, world.z)
        max_c.x = max(max_c.x, world.x)
        max_c.y = max(max_c.y, world.y)
        max_c.z = max(max_c.z, world.z)

center = (min_c + max_c) / 2
size = max_c - min_c
span = max(size.x, size.y, size.z, 1.0)
distance = span * 2.2

# 3/4 elevated view so hull, cabin, and deck all show.
cam_location = center + Vector((distance * 0.68, -distance * 1.18, distance * 0.55))

cam = scene.camera
if cam is None:
    bpy.ops.object.camera_add(location=cam_location)
    cam = bpy.context.active_object
    scene.camera = cam

cam.location = cam_location
direction = center - cam.location
cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
if cam.data:
    cam.data.lens = 40
    cam.data.clip_end = max(span * 20, 1000)

# Neutral background
world = scene.world
if world is None:
    world = bpy.data.worlds.new("World")
    scene.world = world
if hasattr(world, "color"):
    world.color = (0.12, 0.13, 0.15)

bpy.ops.render.render(write_still=True)
print(f"RENDER_OK {out_path}")
print(f"BOUNDS {tuple(min_c)} {tuple(max_c)} SPAN {span:.2f}")
