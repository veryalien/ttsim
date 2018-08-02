import { Body, Bodies } from 'matter-js';

import { Part, Layer } from './part';
import { PartType } from './factory';
import { PART_SIZE } from 'board/constants';

export class Ball extends Part {

  public get canRotate():boolean { return(false); }
  public get canMirror():boolean { return(false); }
  public get canFlip():boolean { return(false); }
  public get type():PartType { return(PartType.BALL); }

  // data used by ball routers
  public lastColumn:number;
  public lastRow:number;

  // the color of the ball
  public get color():number { return(this._color); }
  public set color(v:number) {
    if (v === this.color) return;
    this._color = v;
    this._updateSprites();
  }
  private _color:number = 0x0E63FF;

  // update the given sprite to track the part's state
  protected _updateSprite(layer:Layer):void {
    super._updateSprite(layer);
    // we use the front layer for a specular highlight, so don't tint it
    if (layer !== Layer.FRONT) {
      const sprite = this.getSpriteForLayer(layer);
      if (! sprite) return;
      sprite.tint = this._color;
    }
  }

  public get bodyCanMove():boolean { return(true); }
  public get bodyRestitution():number { return(0.1); }

}