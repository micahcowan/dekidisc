/**
 * DekiDisc behaviors.
 */

import * as ion from "ionsible";
import * as sprite from "./sprite";

class BulletHomingClass extends ion.b.BehaviorFac implements ion.IUpdatable {
    update(delta : ion.Duration) {
        let b = this.sprite as sprite.Bullet;
        let player = b.player;
        if (!b.isReturning)
            return;
        if (player.pos.distFrom(b.pos) < b.recallRadius) {
            b.rest();
        }
        else {
            let dirMag = ion.veloc(
                player.pos.x - b.pos.x
              , player.pos.y - b.pos.y
            ).asDirMag();
            dirMag.mag = b.speed;
            let xy = ion.xyFromDirMag(dirMag);
            b.vel = ion.veloc(xy.x, xy.y);
        }
    }
}

export let BulletHoming : ion.IBehaviorFactory
    = (game, sprite) => new BulletHomingClass(game, sprite);
