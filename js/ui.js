import GUI from "lil-gui";

export function createUI(world) {
  const gui = new GUI();

  gui.add(world.size, "width", 8, 128, 1).name("Width");
  gui.add(world.size, "height", 8, 64, 1).name("height");

  const tarraiFolder = gui.addFolder("Terrain");
  tarraiFolder.add(world.params, "seed", 0, 10000).name("Seed");
  tarraiFolder.add(world.params.terrain, "scale", 10, 100).name("Scale");
  tarraiFolder.add(world.params.terrain, "magnitude", 0, 10).name("Magnitude");
  tarraiFolder.add(world.params.terrain, "offset", 0, 1).name("Offset");

  gui.onChange(() => {
    world.generate();
  });
}
