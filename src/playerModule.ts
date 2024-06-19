import { Gameboard } from "./gameboardModule";
import { Ship } from "./navalYard";

interface Player {
  name: string;
  setName(newName: string): void;
  getName(): string;
  gameboard: Gameboard;
  getShips: any;
}

export const PlayerModule = (() => {
  const createPlayer = (name: string): Player => {
    return {
      name,
      setName: function (newName: string) {
        this.name = newName;
      },
      getName: function () {
        return this.name;
      },
      gameboard: new Gameboard(),
      getShips: function(this) {
        return getShips(this); // Ensure to use `this` to refer to the player object
      },
    };
  };

  function getShips(player: Player) {
    const ships = [];
    const uniqueShips = new Set();
    
    for (const key in player.gameboard) {
      const tile = player.gameboard[key];
      if (tile && tile.ship !== null) {
      if (!uniqueShips.has(tile.ship)) {
        uniqueShips.add(tile.ship);
        ships.push(tile.ship);
      }
      }
    }
    return ships;
    }

  let player1 = createPlayer("Player 1");
  let player2 = createPlayer("Player 2");

  // player1.getShips = getShips(player1); // Assuming getShips function populates ships based on gameboard
  // player2.getShips = getShips(player2);

  let activePlayer = player1;
  let inactivePlayer = player2;

  const resetPlayers = () => {
    player1.setName("Player 1");
    player2.setName("Player 2");
    activePlayer = player1;
    inactivePlayer = player2;
  };

  const switchActive = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    inactivePlayer = inactivePlayer === player2 ? player1 : player2;
  };

  return {
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },

    // activePlayer: {
    //   getName: () => activePlayer.getName(),
    //   switchActive,
    // },
	
	get activePlayer() {
		return activePlayer
	},
  get inactivePlayer() {
    return inactivePlayer
  },
    switchActive,
    resetPlayers,
    createPlayer, // Expose the createPlayer method
  };
})();