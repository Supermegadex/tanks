import { Scene } from 'gamedeck/lib/Scene';
import { Game } from 'gamedeck/lib/Game';
import { Rectangle } from 'gamedeck/lib/GObjects';
import { Vector2 } from 'gamedeck/lib/Utils';
import { PlayArea } from "./gobjects/PlayArea.go";
import { Tank } from "./gobjects/Tank.go";

export class Main extends Scene {
  playDim = new Vector2(1000, 600);
  player1Pos = new Vector2(40, this.playDim.y - 80);
  player2Pos = new Vector2(this.playDim.x - 80, this.playDim.y - 80);
  tankDims = new Vector2(40, 40);
  velocity = 2;

  build(game: Game) {
    return new Rectangle({
      color: 'black',
      x: 0,
      y: 0,
      width: game.width,
      height: game.height,
      children: [
        new PlayArea({
          dimensions: this.playDim,
          children: [
            new Rectangle({
              color: 'white',
              x: 0,
              y: 0,
              width: this.playDim.x,
              height: this.playDim.y,
              children: [
                new Rectangle({
                  width: this.playDim.x,
                  height: 50,
                  x: 0,
                  y: this.playDim.y - 40,
                  color: 'gray',
                  id: 'floor',
                  className: 'solid',
                }),
                new Tank({
                  color: 'blue',
                  position: this.player1Pos,
                  dimensions: this.tankDims,
                  barrelRotation: 0
                }),
                new Tank({
                  color: 'red',
                  position: this.player2Pos,
                  dimensions: this.tankDims,
                  barrelRotation: 0
                })
              ]
            })
          ]
        })
      ]
    });
  }

  update(game: Game) {
    if (game.input.isPressed('1l')) {
      this.player1Pos.x -= this.velocity;
    }
    if (game.input.isPressed('1r')) {
      this.player1Pos.x += this.velocity;
    }
    if (game.input.isPressed('2l')) {
      this.player2Pos.x -= this.velocity;
    }
    if (game.input.isPressed('2r')) {
      this.player2Pos.x += this.velocity;
    }
  }
}
