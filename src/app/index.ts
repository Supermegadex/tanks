import { Main } from './Main.scene';
import { startGame } from 'gamedeck/lib/Game';

// Get the canvas we want to use.
const canvas = document.querySelector<HTMLCanvasElement>('canvas#game')!;

// Set the canvas width and height to be the full size of the window.
// Remove this if you want it to be smaller.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Start the game!
const game = startGame(new Main(), {
  canvas
});

function a(alias: string, code: string) {
  game.input.setAlias(alias, code);
  return a;
}

a('1l', 'KeyA')
 ('1r', 'KeyD')
 ('1u', 'KeyW')
 ('1d', 'KeyS')
 ('2l', 'ArrowLeft')
 ('2r', 'ArrowRight')
 ('2u', 'ArrowUp')
 ('2d', 'ArrowDown');

console.log(game);
