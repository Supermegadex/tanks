import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { Rectangle as RAsset } from "gamedeck/lib/assets/Rectangle";
import { TankCannon } from "./TankCannon.go";

export class Tank extends GObject {
  barrelRotation: number;

  constructor(props: {
    position: Vector2,
    barrelRotation: number,
    dimensions: Vector2,
    children?: GObject[],
    color: string
  }) {
    super(props);
    this.barrelRotation = props.barrelRotation;
    this.position = props.position.clone();
    this.sprite = new RAsset(props.dimensions.x, props.dimensions.y, props.color);
  }

  build() {
    return [
      new TankCannon({
        position: new Vector2(this.dimensions.x / 2,
        this.dimensions.y / 2),
        rotation: this.barrelRotation,
        length: this.dimensions.x
      }),
      ...(this.children ? this.children : [])
    ]
  }
}
