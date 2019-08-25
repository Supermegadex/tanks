import { Scene } from 'gamedeck/lib/Scene';
import { Game } from 'gamedeck/lib/Game';
import { Rectangle } from 'gamedeck/lib/GObjects';
import { Vector2 } from 'gamedeck/lib/Utils';
import { PlayArea } from "./gobjects/PlayArea.go";
import { Tank } from "./gobjects/Tank.go";
import { Projectile, ProjectileState } from "./gobjects/Projectile.go";

export class Main extends Scene {
  playDim = new Vector2(1000, 600);
  player1BarrelRotation = 0;
  player2BarrelRotation = Math.PI;
  p1FireLock = false;
  p2FireLock = false;
  player1Pos = new Vector2(40, this.playDim.y - 80);
  player2Pos = new Vector2(this.playDim.x - 80, this.playDim.y - 80);
  tankDims = new Vector2(40, 40);
  velocity = 2;
  projectiles: ProjectileState[] = [];

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
                  barrelRotation: this.player1BarrelRotation
                }),
                new Tank({
                  color: 'red',
                  position: this.player2Pos,
                  dimensions: this.tankDims,
                  barrelRotation: this.player2BarrelRotation
                }),
                ...this.projectiles.map(p => new Projectile(p))
              ]
            })
          ]
        })
      ]
    });
  }

  getInitialVelocity(angle: number) {
    const v = 6;
    const x = v * Math.cos(angle);
    const y = v * Math.sin(angle);
    return new Vector2(x, y);
  }

  update(game: Game) {
    if (game.input.isPressed('1l')) {
      this.player1Pos.x -= this.velocity;
    }
    if (game.input.isPressed('1r')) {
      this.player1Pos.x += this.velocity;
    }
    if (game.input.isPressed('1u')) {
      this.player1BarrelRotation -= 0.05;
    }
    if (game.input.isPressed('1d')) {
      this.player1BarrelRotation += 0.05;
    }
    if (game.input.isPressed('2l')) {
      this.player2Pos.x -= this.velocity;
    }
    if (game.input.isPressed('2r')) {
      this.player2Pos.x += this.velocity;
    }
    if (game.input.isPressed('2d')) {
      this.player2BarrelRotation -= 0.05;
    }
    if (game.input.isPressed('2u')) {
      this.player2BarrelRotation += 0.05;
    }
    if (game.input.isPressed('p1Fire')) {
      if (!this.p1FireLock) {
        this.projectiles.push(
          new ProjectileState(
            this.player1Pos.add(this.tankDims.scalar(0.5)),
            this.getInitialVelocity(this.player1BarrelRotation),
            new Vector2(10, 10),
            'p1Projectile'
          )
        );
        this.p1FireLock = true;
      }
    } else {
      this.p1FireLock = false;
    }
    if (game.input.isPressed('p2Fire')) {
      if (!this.p2FireLock) {
        this.projectiles.push(
          new ProjectileState(
            this.player2Pos.add(this.tankDims.scalar(0.5)),
            this.getInitialVelocity(this.player2BarrelRotation),
            new Vector2(10, 10),
            'p1Projectile'
          )
        );
        this.p2FireLock = true;
      }
    } else {
      this.p2FireLock = false;
    }
    this.projectiles.forEach(p => p.position.addM(p.velocity));
    this.projectiles.forEach(p => p.velocity.addM(new Vector2(0, .05)))
  }
}
