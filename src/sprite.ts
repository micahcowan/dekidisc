import * as ion from "ionsible";
import * as art from "./art";

export class Background extends ion.Sprite {
    drawer : ion.IDrawableFactory = art.Background;
}


export class Player extends ion.Sprite {
    size = 12;
    hitPoints = 3;
    rotation = Math.PI * 3/2;

    constructor(g : ion.Game) {
        super(g);
        this.pos = g.center;
    }

    behaviors : ion.IBehaviorFactory[] = [
        ion.b.RotateKeys(
            Math.PI     // rad/s
          , {
                clock:   [ 'd', 'ArrowRight' ]
              , counter: [ 'a', 'ArrowLeft' ]
            }
        )
      , ion.b.ThrustKeys(
            {
                forward: [ 'w', 'ArrowUp' ]
              , back:    [ 's', 'ArrowDown' ]
              , left:    'q'
              , right:   'e'
            }
        )
      , ion.b.SpeedRamp(
            240 // max speed
          , 1.2 // seconds required to reach max speed
          , 2.4 // seconds required to reach full stop under no accel
        )
      , ion.b.Bounded(
            ion.util.gameRect
          , ion.util.spriteBounce
        )
        /*
      , GABh.playerBullet({
            trigger:        'Space'

          , speed:          DEFAULT_BULLET_SPEED
          , color:          'red'
          , onBounce:       [
                GA.maybeLockGate
              , GA.soundPlayer('knock')
            ]
        })
        */
    ];

    drawer : ion.IDrawableFactory = art.Player;
};
