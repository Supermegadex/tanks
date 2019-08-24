import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { Rectangle } from "gamedeck/lib/gobjects/Rectangle";
import { Rectangle as RAsset } from "gamedeck/lib/assets/Rectangle";

export class Tank extends GObject {
  constructor(props: {
    position: Vector2,
    barrelRotation: number,
    dimensions: Vector2,
    children?: GObject[],
    color: string
  }) {
    super(props);
    this.sprite = new RAsset(props.dimensions.x, props.dimensions.y, props.color);
  }

  // build() {
  //   return [
  //     new Rectangle({
  //       x: this.dimensions.x / 2,
  //       y: this.dimensions.y / 2,
  //       width: this.dimensions.x,
  //       height: this.dimensions.y,
  //       color: 'grey'
  //     }),
  //     ...(this.children ? this.children : [])
  //   ]
  // }
}
