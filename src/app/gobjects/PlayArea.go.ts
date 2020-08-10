import { GObject } from 'gamedeck/lib/GObject';
import { Vector2 } from 'gamedeck/lib/Utils';
import { Game } from 'gamedeck/lib';

export class PlayArea extends GObject {
  constructor(props: { dimensions: Vector2; children: GObject[]; id: string }) {
    super(props);
  }

  build(game: Game) {
    this.position = new Vector2(
      (game.width - this.dimensions.x) / 2,
      (game.height - this.dimensions.y) / 2
    );
    return this.children!;
  }
}
