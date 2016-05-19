import * as ion from "ionsible";
import * as sprite from "./sprite";

let game = new ion.Game({"parent": '#gameContainer'});

game.setScene([
    new sprite.Background(game)
])

game.start();
