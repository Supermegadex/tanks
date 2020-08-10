import { Scene } from 'gamedeck/lib/Scene';
import { Game } from 'gamedeck/lib/Game';
import { Rectangle } from 'gamedeck/lib/GObjects';
import { Vector2 } from 'gamedeck/lib/Utils';
import { PlayArea } from './gobjects/PlayArea.go';
import { Tank } from './gobjects/Tank.go';
import { Projectile, ProjectileState } from './gobjects/Projectile.go';
import { Text } from 'gamedeck/lib/gobjects/Text';

export class Main extends Scene {
  playDim = new Vector2(1000, 600);
  player1BarrelRotation = -Math.PI / 4;
  player2BarrelRotation = -(3 * Math.PI) / 4;
  p1FireLock = false;
  p2FireLock = false;
  player1Pos = new Vector2(40, this.playDim.y - 80);
  player2Pos = new Vector2(this.playDim.x - 80, this.playDim.y - 80);
  tankDims = new Vector2(40, 40);
  velocity = 2;
  projectiles: ProjectileState[] = [];
  p1Score = 0;
  p2Score = 0;

  build(game: Game) {
    return new Rectangle({
      color: 'black',
      x: 0,
      y: 0,
      width: game.width,
      height: game.height,
      children: [
        // new PlayArea({
        //   dimensions: this.playDim,
        //   id: 'play-area',
        //   children: [
        //     new Rectangle({
        //       color: 'white',
        //       x: 0,
        //       y: 0,
        //       width: this.playDim.x,
        //       height: this.playDim.y,
        //       children: [
        //         new Tank({
        //           id: 'player1',
        //           color: 'blue',
        //           position: this.player1Pos,
        //           dimensions: this.tankDims,
        //           barrelRotation: this.player1BarrelRotation
        //         }),
        //         new Tank({
        //           id: 'player2',
        //           color: 'red',
        //           position: this.player2Pos,
        //           dimensions: this.tankDims,
        //           barrelRotation: this.player2BarrelRotation
        //         }),
        //         ...this.projectiles.map(p => new Projectile(p)),
        //         new Rectangle({
        //           width: this.playDim.x,
        //           height: 50,
        //           x: 0,
        //           y: this.playDim.y - 40,
        //           color: 'gray',
        //           id: 'floor',
        //           className: 'solid'
        //         })
        //       ]
        //     })
        //   ]
        // }),
        // ...this.makeWalls(game),
        new Rectangle({
          x: game.width / 2 - this.playDim.x / 2,
          y: 0,
          width: this.playDim.x,
          height: game.height / 2 - this.playDim.y / 2,
          color: 'black',
          children: [
            new Text({
              text: this.p1Score.toString(),
              font: '20px monospace',
              position: new Vector2(0, 10),
              color: 'white',
              positioning: 'middle center'
            })
          ]
        })
      ]
    });
  }

  makeWalls(game: Game) {
    const x1 = game.width / 2 - this.playDim.x / 2;
    const x2 = game.width / 2 + this.playDim.x / 2;
    const y1 = game.height / 2 - this.playDim.y / 2;
    const y2 = game.height / 2 + this.playDim.y / 2;
    return [
      new Rectangle({
        x: 0,
        y: 0,
        width: game.width,
        height: y1,
        color: 'black'
      }),
      new Rectangle({
        x: 0,
        y: 0,
        width: x1,
        height: game.height,
        color: 'black'
      }),
      new Rectangle({
        x: x2,
        y: 0,
        width: x1,
        height: game.height,
        color: 'black'
      }),
      new Rectangle({
        x: 0,
        y: y2,
        width: game.width,
        height: y1,
        color: 'black'
      })
    ];
  }

  getInitialVelocity(angle: number) {
    const v = Math.random() * 5 + 3;
    const x = v * Math.cos(angle);
    const y = v * Math.sin(angle);
    return new Vector2(x, y);
  }

  update(game: Game) {
    if (game.input.isPressed('1l')) {
      if (this.player1Pos.x > 0) {
        this.player1Pos.x -= this.velocity;
      }
    }
    if (game.input.isPressed('1r')) {
      if (this.player1Pos.x < this.playDim.x / 2 - this.tankDims.x) {
        this.player1Pos.x += this.velocity;
      }
    }
    // if (game.input.isPressed('1u')) {
    //   this.player1BarrelRotation -= 0.05;
    // }
    // if (game.input.isPressed('1d')) {
    //   this.player1BarrelRotation += 0.05;
    // }
    if (game.input.isPressed('2l')) {
      if (this.player2Pos.x > this.playDim.x / 2) {
        this.player2Pos.x -= this.velocity;
      }
    }
    if (game.input.isPressed('2r')) {
      if (this.player2Pos.x < this.playDim.x - this.tankDims.x) {
        this.player2Pos.x += this.velocity;
      }
    }
    // if (game.input.isPressed('2d')) {
    //   this.player2BarrelRotation -= 0.05;
    // }
    // if (game.input.isPressed('2u')) {
    //   this.player2BarrelRotation += 0.05;
    // }
    game.setTimer('fire', '10f', () => {
      this.projectiles.push(
        new ProjectileState(
          this.player1Pos.add(this.tankDims.scalar(0.5)),
          this.getInitialVelocity(this.player1BarrelRotation),
          new Vector2(10, 10),
          'p1Projectile',
          'blue',
          Math.floor(Math.random() * 1000000).toString()
        )
      );
      this.projectiles.push(
        new ProjectileState(
          this.player2Pos.add(this.tankDims.scalar(0.5)),
          this.getInitialVelocity(this.player2BarrelRotation),
          new Vector2(10, 10),
          'p2Projectile',
          'red',
          Math.floor(Math.random() * 1000000).toString()
        )
      );
      while (this.projectiles.length > 500) {
        this.projectiles.shift();
      }
    });
    this.projectiles.forEach(p => p.position.addM(p.velocity));
    this.projectiles.forEach(p => p.velocity.addM(new Vector2(0, 0.05)));
    game.registerCollision('player1', '.p2Projectile', collider => {
      this.p1Score++;
      const idx = this.projectiles.findIndex(p => p.id === collider.id);
      this.projectiles.splice(idx, 1);
    });
    game.registerCollision('player2', '.p1Projectile', collider => {
      this.p2Score++;
      const idx = this.projectiles.findIndex(p => p.id === collider.id);
      this.projectiles.splice(idx, 1);
    });
  }
}
