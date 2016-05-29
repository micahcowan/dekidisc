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
        ion.b.Momentum
      , ion.b.RotateKeys(
            Math.PI     // rad/s
          , {
                clock:   [ 'd', 'ArrowRight' ]
              , counter: [ 'a', 'ArrowLeft' ]
            }
        )
      , ion.b.ThrustKeys(
            300 // px/s^2
          , {
                forward: [ 'w', 'ArrowUp' ]
              , back:    [ 's', 'ArrowDown' ]
              , left:    'q'
              , right:   'e'
            }
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
      , Bh.friction(  U.pixels( 100 ).per.second.per.second  )
      , Bh.speedLimited( U.pixels( 240 ).per.second )
      , Bh.bouncingBounds(
              U.pixels( 0 ), U.pixels( 0 ),
              GA.game.width, GA.game.height,
              // Play "clink" when we bounce off a wall
              GA.maybeTeleportGate
        )
        */
    ];

    drawer : ion.IDrawableFactory = art.Player;
};
