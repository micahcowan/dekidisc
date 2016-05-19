import * as ion from "ionsible";

export class BackgroundClass implements ion.IDrawable {
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

    constructor(private game : ion.Game, private sprite : ion.Sprite) {}
}
export let Background : ion.IDrawableFactory
        = (game : ion.Game, sprite : ion.Sprite) => new BackgroundClass(game, sprite);
