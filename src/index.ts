import * as PIXI from 'pixi.js';

import { SimulatorApp } from 'app';
import { Renderer } from 'renderer';
import { BoardBuilder } from 'board/builder';

// the simulator, which will be initialized once resources have loaded
let sim:SimulatorApp;

// dynamically resize the app to track the size of the browser window
const container = document.getElementById('container');
container.style.overflow = 'hidden';
const resizeApp = () => {
  const r = container.getBoundingClientRect();
  Renderer.instance.resize(r.width, r.height);
  if (sim) {
    sim.width = r.width;
    sim.height = r.height;
  }
}
resizeApp();
window.addEventListener('resize', resizeApp);

// load sprites
const loader = PIXI.loader;
loader.add('images/parts.json').load(() => {
  sim = new SimulatorApp(
    PIXI.loader.resources["images/parts.json"].textures);
  sim.width = Renderer.instance.width;
  sim.height = Renderer.instance.height;
  Renderer.stage.addChild(sim);
  // set up the standard board
  BoardBuilder.initStandardBoard(sim.board);
  sim.actionbar.zoomToFit();
  // remove the loading animation
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.opacity = '0';
    setTimeout(() => loading.style.display = 'none', 2000);
  }
  // attach the stage to the document and fade it in
  container.appendChild(Renderer.instance.view);
  container.style.opacity = '1';
  // start the game loop
  PIXI.ticker.shared.add(sim.update, sim);
});