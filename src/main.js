import { gfx3Manager } from './lib/gfx3/gfx3_manager';
import { gfx3MeshRenderer } from './lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3MeshShadowRenderer } from './lib/gfx3_mesh/gfx3_mesh_shadow_renderer';
import { gfx3SkyboxRenderer } from './lib/gfx3_skybox/gfx3_skybox_renderer';
import { gfx3ParticlesRenderer } from './lib/gfx3_particules/gfx3_particles_renderer';   
import { screenManager } from './lib/screen/screen_manager';
import { uiManager } from './lib/ui/ui_manager';
// ---------------------------------------------------------------------------------------
import { GameScreen } from './game_screen';
// ---------------------------------------------------------------------------------------

class GameManager {
  constructor() {
    this.then = 0;
  }

  startup() {
    this.run(0);
  }

  run(timeStamp) {
    const ts = timeStamp - this.then;
    this.then = timeStamp;

    // update phase
    uiManager.update(ts);
    screenManager.update(ts);

    // draw phase
    gfx3Manager.beginDrawing();
    screenManager.draw();
    gfx3Manager.endDrawing();

    // render phase
    gfx3Manager.beginRender();
    gfx3MeshShadowRenderer.render();
    gfx3Manager.beginPassRender(0);
    gfx3SkyboxRenderer.render();
    gfx3MeshRenderer.render();
    gfx3ParticlesRenderer.render();
    gfx3Manager.endPassRender();
    gfx3Manager.endRender();

    document.getElementById('fps').innerHTML = (1000 / ts).toFixed(2);
    document.getElementById('rt').innerHTML = (1000 / gfx3Manager.getLastRenderTime()).toFixed(2);

    requestAnimationFrame(timeStamp => this.run(timeStamp));
  }
}

export const gameManager = new GameManager();
gameManager.startup();
screenManager.requestSetScreen(new GameScreen());