import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { Game } from "gamedeck/lib";
import { Rectangle } from "gamedeck/lib/gobjects/Rectangle";

export class ProjectileState {
  constructor(public position: Vector2, public velocity: Vector2, public dimensions: Vector2, public className: string) {}
}

export class Projectile extends GObject {
  constructor(props: ProjectileState) {
    super(props);
  }

  build(game: Game) {
    return [
      new Rectangle({
        x: 0, y: 0, width: this.dimensions.x, height: this.dimensions.y, color: 'green'
      })
    ]
  }
}
