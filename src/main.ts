import html from './htmlComponents';
import { PlayerModule } from './playerModule';
import { Ship } from './navalYard';
import { hitmarkApplication } from './eventListeners';
import { wakas } from './svgs';



//html.splash();
//html.placementBoard();
//html.hotswap();
html.mainGame();

PlayerModule.player1.gameboard.placeShip(new Ship(4), "A1", "A2", "A3", "A4");
PlayerModule.player1.gameboard.placeShip(new Ship(2), "G6", "G7");
PlayerModule.player1.gameboard.placeShip(new Ship(3), "C2", "D2", "E2");
//console.log(PlayerModule.player1.gameboard);

PlayerModule.player2.gameboard.placeShip(new Ship(5), "B1", "B2", "B3", "B4", "B5");
PlayerModule.player2.gameboard.placeShip(new Ship(3), "C6", "C7", "C8");
PlayerModule.player2.gameboard.placeShip(new Ship(2), "E5", "E6");
//console.log(PlayerModule.player2.gameboard);

const shipPlacer = (player) => {
    // Add visual representation of the ship to the tile
    // Ship placement positions need to already exist in the Player's gameboard
    // I.E - this isn't the click-to-place function, just the 'displayer'

    // call with shipPlacer(PlayerModule.player1);
    const playerShips = player.getShips();

    playerShips.forEach(ship => {
        ship.positions.forEach(position => {
            let parent = document.getElementById(player.getName());
            let childTile = parent.querySelector(`[data-position='${position}']`);
            
            if (childTile) {
                // Add visual representation of the ship to the tile
                childTile.classList.add('ship');
                // childTile.innerHTML = wakas[ship.length];
            }
        });
    });
};

shipPlacer(PlayerModule.player1);
shipPlacer(PlayerModule.player2);
hitmarkApplication()