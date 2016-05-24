import * as ion from "ionsible";
import * as art from "./art";

export class Background extends ion.Sprite {
    drawer : ion.IDrawableFactory = art.Background;
}


export class Player extends ion.Sprite {
    size = 12;
    hitPoints = 3;

    constructor(g : ion.Game) {
        super(g);
        this.pos = g.center;
    }

    behaviors : ion.IBehaviorFactory[] = [
        ion.b.Momentum
        /*
      , Bh.rotateKeys(
            {
                clock:   [ 'd', 'ArrowRight' ]
              , counter: [ 'a', 'ArrowLeft' ]
            }
          , U.radians( Math.PI ).per.second
        )
      , Bh.thrustKeys(
            {
                forward: [ 'w', 'ArrowUp' ]
              , back:    [ 's', 'ArrowDown' ]
              , left:    'q'
              , right:   'e'
            }
          , U.pixels( 300 ).per.second.per.second
        )
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
