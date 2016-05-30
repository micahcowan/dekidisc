import * as ion from "ionsible";
import * as sprite from "./sprite"

function shadow(c : CanvasRenderingContext2D) {
    c.shadowColor = 'rgba(0,0,0,0.3)';
    c.shadowOffsetX = 5;
    c.shadowOffsetY = 5;
    c.shadowBlur = 4.2;
}

export class Background implements ion.IDrawable {
    fillStyle : string = '#EEE';
    gridSize  : number = 42;
    lineWidth : number = 1;
    moveSpeed : number = 1/4
    strokeStyle : string  = '#C0C0D0';
    start : ion.Timestamp = new ion.Timestamp;

    draw(c : CanvasRenderingContext2D) {
        let width = c.canvas.width;
        let height = c.canvas.height;

        c.fillStyle = this.fillStyle;
        c.fillRect(0, 0, width, height);

        // Draw grid.
        c.lineWidth = this.lineWidth;
        c.strokeStyle = this.strokeStyle;

        let now = new ion.Timestamp;
        let offset = now.sub(this.start).s
            * (this.moveSpeed * this.gridSize) % this.gridSize;

        for (let x = offset; x < width; x += this.gridSize) {
            c.beginPath();
            c.moveTo(x,0);
            c.lineTo(x,height);
            c.stroke();
        }
        for (let y = offset; y < height; y += this.gridSize) {
            c.beginPath();
            c.moveTo(0,y);
            c.lineTo(width,y);
            c.stroke();
        }
    }
}

export class Player implements ion.IDrawable {
    draw(c : CanvasRenderingContext2D) {
        //let p = this.sprite as sprite.Player; // XXX is this how I want to do this?
        let r = this.size;

        /* XXX
        if (!p.bullet.isAtRest)
            p.bullet.draw(s);
        */

        // The code below draws as if rotation 0 is straight upright,
        // but it's actually to the right. So we rotate 90 degrees to
        // correct that.
        c.rotate( Math.PI/2 );

        c.beginPath();
        let x0 = 0;
        let y0 = - r * 4/3;
        let x1 = + r * Math.sin(2/3 * Math.PI);
        let y1 = - r * Math.cos(2/3 * Math.PI);
        let x2 = + r * Math.sin(4/3 * Math.PI);
        let y2 = - r * Math.cos(4/3 * Math.PI);
        c.moveTo(x0, y0);
        c.bezierCurveTo(x0, y0, x1, y1-r*3/4, x1, y1+r/3);
        c.bezierCurveTo(x1, y1, x2, y2, x2, y2+r/3);
        c.bezierCurveTo(x2, y2-r*3/4, x0, y0, x0, y0);
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.lineJoin = "miter";
        c.fillStyle = "red";
        if (false /* p.hitPoints == 0 */) {
            /*
            var percent = (GG.state.gameTime - p.killedTime) /
                                GA.BADDIE_DEATH_TIME;
            var alpha = 1 - percent;
            c.fillStyle = 'rgba(128,0,0,' + alpha + ')';
            c.save();
            c.fill();
            c.restore();
            */
        }
        /*
        else if (p.bullet.isAtRest) {
        */
        else {
            c.save();
            shadow(c);
            c.fill();
            c.restore();
            c.stroke();
        }
    }

    constructor(private sprite : ion.Sprite, private size : number) {
    }
}
