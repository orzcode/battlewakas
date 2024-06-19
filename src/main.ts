import html from './htmlComponents';
import { PlayerModule } from './playerModule';
import { Ship } from './navalYard';

//html.splash();
//html.placementBoard();
//html.hotswap();
html.mainGame();

PlayerModule.player1.gameboard.placeShip(new Ship(4), "A1", "A2", "A3", "A4");
PlayerModule.player1.gameboard.placeShip(new Ship(2), "B1", "B2");
PlayerModule.player1.gameboard.placeShip(new Ship(3), "G4", "G5", "G6");
console.log(PlayerModule.player1.gameboard);

//module to get all ships for each player
const player1Ships = PlayerModule.player1.getShips();

console.log(player1Ships);
