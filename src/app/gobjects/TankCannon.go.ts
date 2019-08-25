import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { Line } from "gamedeck/lib/assets/Line";
import { Game } from "gamedeck/lib";

export class TankCannon extends GObject {
  length: number;

  constructor(props: {
    position: Vector2,
    length: number,
    rotation: number
  }) {
    super(props);
    this.length = props.length;
  }

  prepare(game: Game) {
    const x = this.length * Math.cos(this.rotation) + this.position.x;
    const y = this.length * Math.sin(this.rotation) + this.position.y;
    this.sprite = new Line(this.position, new Vector2(x, y), 'grey', 10);
  }

  build(game: Game) {
    return [];
  }
}
