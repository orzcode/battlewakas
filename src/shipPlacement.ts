import { PlayerModule } from "./playerModule";
import { Ship } from "./navalYard"
import { shipPlacer, hitMarkRenderer } from "./domRenderStuff";

export const startShipPlacement = () => {
    const activePlayer = PlayerModule.activePlayer;
    const boardElement = document.getElementById(activePlayer.getName());

    if (!boardElement) return;

    let currentShipIndex = 0;
    const ships = [
        new Ship(5),
        new Ship(4),
        new Ship(3),
        new Ship(3),
        new Ship(2)
    ];

    const handleMouseOver = (event: MouseEvent) => {
        const tile = event.target as HTMLElement;
        if (!tile.classList.contains('placementBoardTile')) return;

        const position = tile.getAttribute('data-position');
        if (position) {
            highlightPotentialShipPlacement(boardElement, position, ships[currentShipIndex]);
        }
    };

    const handleMouseOut = (event: MouseEvent) => {
        const tile = event.target as HTMLElement;
        if (!tile.classList.contains('placementBoardTile')) return;

        clearHighlightedPlacement(boardElement);
    };

    const handleClick = (event: MouseEvent) => {
        const tile = event.target as HTMLElement;
        if (!tile.classList.contains('placementBoardTile')) return;

        const position = tile.getAttribute('data-position');
        if (position && validateShipPlacement(activePlayer.gameboard, position, ships[currentShipIndex])) {
            placeShip(activePlayer, ships[currentShipIndex], position);
            currentShipIndex++;
            if (currentShipIndex >= ships.length) {
                boardElement.removeEventListener('mouseover', handleMouseOver);
                boardElement.removeEventListener('mouseout', handleMouseOut);
                boardElement.removeEventListener('click', handleClick);
                // Move to the next phase of the game, like starting the game
                startGame();
            }
        }
    };

    boardElement.addEventListener('mouseover', handleMouseOver);
    boardElement.addEventListener('mouseout', handleMouseOut);
    boardElement.addEventListener('click', handleClick);
};

const highlightPotentialShipPlacement = (boardElement: HTMLElement, startPosition: string, ship: Ship) => {
    const positions = getPotentialShipPositions(startPosition, ship.length);
    positions.forEach(position => {
        const tile = boardElement.querySelector(`[data-position='${position}']`);
        if (tile) {
            tile.classList.add('tempShip');
        }
    });
};

const clearHighlightedPlacement = (boardElement: HTMLElement) => {
    const tiles = boardElement.querySelectorAll('.tempShip');
    tiles.forEach(tile => tile.classList.remove('tempShip'));
};

const getPotentialShipPositions = (startPosition: string, length: number): string[] => {
    const positions = [];
    const letter = startPosition.charAt(0);
    const number = parseInt(startPosition.slice(1), 10);

    for (let i = 0; i < length; i++) {
        positions.push(`${letter}${number + i}`);
    }

    return positions;
};

const validateShipPlacement = (gameboard: Gameboard, startPosition: string, ship: Ship): boolean => {
    const positions = getPotentialShipPositions(startPosition, ship.length);

    for (const position of positions) {
        if (!gameboard[position] || gameboard[position].ship) {
            return false;
        }
    }

    return true;
};

const placeShip = (player: Player, ship: Ship, startPosition: string) => {
    const positions = getPotentialShipPositions(startPosition, ship.length);
    player.gameboard.placeShip(ship, ...positions);

	    // Add the 'ship' class to the placed ship tiles
		const boardElement = document.getElementById(player.getName());
		if (boardElement) {
			positions.forEach(position => {
				const tile = boardElement.querySelector(`[data-position='${position}']`);
				if (tile) {
					tile.classList.add('ship');
				}
			});
		}
};

const startGame = () => {
    // Transition to the main game phase
};

// Call this function to start the ship placement phase
startShipPlacement();
