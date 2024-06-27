import html from './htmlComponents';
import { PlayerModule } from './playerModule';
import { Ship } from './navalYard';
import { hitmarkApplication } from './eventListeners';
import { wakas } from './svgs';

PlayerModule.player1.gameboard.placeShip(new Ship(4), "A1", "A2", "A3", "A4");
PlayerModule.player1.gameboard.placeShip(new Ship(2), "G6", "G7");
PlayerModule.player1.gameboard.placeShip(new Ship(3), "C2", "D2", "E2");
//console.log(PlayerModule.player1.gameboard);

PlayerModule.player2.gameboard.placeShip(new Ship(5), "B1", "B2", "B3", "B4", "B5");
PlayerModule.player2.gameboard.placeShip(new Ship(3), "C6", "C7", "C8");
PlayerModule.player2.gameboard.placeShip(new Ship(2), "E5", "E6");
PlayerModule.player1.gameboard.receiveAttack("A1");
PlayerModule.player1.gameboard.receiveAttack("A2");
PlayerModule.player1.gameboard.receiveAttack("A3");
PlayerModule.player2.gameboard.receiveAttack("B1");
PlayerModule.player2.gameboard.receiveAttack("B2");
//console.log(PlayerModule.player2.gameboard);

//html.splash();
//html.placementBoard();
//html.hotswap();
html.mainGame();




