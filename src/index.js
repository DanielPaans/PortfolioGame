import Phaser from "phaser";

const MAP_WIDTH = 1600;

const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;
const ZOOM_FACTOR = 1.5;

const SHARED_CONFIG = {
  mapOffset: {x: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0, y: 200},
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  debug: true,
  leftTopCorner: {
    x: (WIDTH - (WIDTH/ZOOM_FACTOR)) / 2,
    y: (HEIGHT - (HEIGHT/ZOOM_FACTOR)) / 2
  },
  rightTopCorner: {
    x: ((WIDTH / ZOOM_FACTOR) + ((WIDTH - (WIDTH / ZOOM_FACTOR)) / 2)),
    y: (HEIGHT - (HEIGHT/ZOOM_FACTOR)) / 2
  },
  rightBottomCorner: {
    x: ((WIDTH / ZOOM_FACTOR) + ((WIDTH - (WIDTH / ZOOM_FACTOR)) / 2)),
    y: ((HEIGHT / ZOOM_FACTOR) + ((HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2))
  },
  lastLevel: 2
}

const SCENES = [PreloadScene];
const initScenes = () => SCENES.map(Scene => new Scene(SHARED_CONFIG));

const CONFIG = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: SHARED_CONFIG.debug
    }
  },
  scene: initScenes()
}

new Phaser.Game(CONFIG);
