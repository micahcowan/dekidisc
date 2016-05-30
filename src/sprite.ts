import * as ion from "ionsible";
import * as art from "./art";

export class Background extends ion.Sprite {
    drawer : ion.IDrawable = new art.Background;
}

function getPlayerBody(p : Player, r : number) : ion.IBody {
    let pi = Math.PI;
    let s = Math.sin.bind(Math);
    let c = Math.cos.bind(Math);
    return new ion.body.Polygon(p,
        // Specify the points in terms of what they are in art.ts,
        // Which assume a rotation of 0 is straight up. Then rotate it
        // 90 degrees to the right, to match the reality.
        [
            ion.point(0, -r * 4/3)
          , ion.point(r * s(2/3 * pi), -r * c(2/3 * pi) + r/3)
          , ion.point(r * s(4/3 * pi), -r * c(4/3 * pi) + r/3)
        ].map(p => p.rotated(pi/2))
    );
}

export class Player extends ion.Sprite {
    size;
    hitPoints = 3;
    rotation = Math.PI * 3/2;

    constructor(g : ion.Game) {
        super(g);
        this.pos = g.center;
        this.size = 12;

        this.body = getPlayerBody(this, this.size);
        this.drawer = new art.Player(this, this.size);
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
};
