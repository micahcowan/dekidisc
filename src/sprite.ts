import * as ion from "ionsible";
import * as art from "./art";
import * as deki from "./behavior";

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

export class Player extends ion.Sprite implements ion.ISpriteContainer {
    size : number;
    hitPoints = 3;
    rotation = Math.PI * 3/2;
    bullet = new Bullet(this.game, this);

    /** Tracks bullet sprites. */
    subsprites : ion.ISprite[] = [ this.bullet ];

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
      , ion.b.OnKey({
            keyUp: 'Space'
          , fire: fireOrRecallBullet
      })
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
}

enum BulletState {
    BulletAtRest
  , BulletFired
  , BulletReturning
}
export class Bullet extends ion.Sprite {
    autoRotate = false; // rotating a circle does no one any good.
    speed = 300; // px/s^2
    firedTime : ion.Duration;
    firedRadius = 4;
    recallRadius = 7;
    firingTime : ion.Duration = new ion.Duration( 1/3 * 1000 ); // ms

    drawer = new art.Bullet(this);

    constructor(game : ion.Game, public player : ion.Sprite) {
        super(game);
    }

    private state : BulletState = BulletState.BulletAtRest;
    get isAtRest() : boolean {
        return this.state == BulletState.BulletAtRest;
    }
    get isFired() : boolean {
        return this.state == BulletState.BulletFired;
    }
    get isReturning() : boolean {
        return this.state == BulletState.BulletReturning;
    }

    behaviors : ion.IBehaviorFactory[] = [
        ion.b.Momentum
      , ion.b.Bounded(
            ion.util.gameRect
          , bullet => (<Bullet>bullet).recall()
        )
      , deki.BulletHoming
    ];

    fire() : void {
        let p = this.player;
        this.pos = p.pos;
        let rot = this.rotation = p.rotation;
        this.vel = ion.veloc(
            this.speed * Math.cos(rot)
          , this.speed * Math.sin(rot)
        );
        this.state = BulletState.BulletFired;
        this.firedTime = this.game.elapsed;
    }

    recall() : void {
        if (this.isFired) {
            this.firedTime = this.game.elapsed;
            this.state = BulletState.BulletReturning;
        }
    }

    rest() : void {
        this.state = BulletState.BulletAtRest;
    }
}

function fireOrRecallBullet(player : Player) {
    let bullet = player.bullet;

    if (bullet.isAtRest) {
        // Fire bullet (it figures out how to register with the player).
        bullet.fire();
    }
    else if (!bullet.isReturning) {
        bullet.recall();
    }
    // else there's a bullet, and it's already recalling. Do nothing.
}
