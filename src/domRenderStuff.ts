import { PlayerModule } from "./playerModule";
import { hitmarkApplication } from "./eventListeners";
export const shipPlacer = (player) => {
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

export const hitMarkRenderer = () => {
    let players = [PlayerModule.player1, PlayerModule.player2];
    players.forEach(player => {
        let playerBoard = player.gameboard;
        let boardElement = document.getElementById(player.getName());

        for (let position in playerBoard) {
            let tile = playerBoard[position];
            if (tile.hitMark) {
                let childTile = boardElement.querySelector(`[data-position='${position}']`);
                if (childTile) {
                    childTile.classList.add('hit');
                }
            }
        }
    });

}
