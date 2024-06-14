import { Ship } from "./navalYard";
import { Player } from "./playerModule";

export class Gameboard {
	[key: string]: { hitMark: boolean, ship: Ship | null };
	
	constructor() {
	  const board: { [key: string]: { hitMark: boolean, ship: Ship | null } } = {};
	  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	  for (const letter of letters) {
		for (let number = 1; number <= 10; number++) {
		  const key = `${letter}${number}`;
		  board[key] = { hitMark: false, ship: null };
		}
	  }
	  Object.assign(this, board);
	}
  
	receiveAttack(position: string) {
		this[position].hitMark = true;
		this[position].ship?.hit();
	}
	
  placeShip(ship: Ship, ...placementTiles: string[]) {
    placementTiles.forEach(position => {
      if (this[position]) {
        this[position].ship = ship;
      } else {
        console.error(`Invalid position: ${position}`);
      }
    });
    ship.positions = placementTiles;
  }

  checkAllSunk() {
    let allSunk = true;
    for (const tile in this) {
      const ship = this[tile].ship;
      if (ship === null) {
        continue
      } else if (ship.isSunk() === false){
        allSunk = false;
        break
      }
      return allSunk
    }
  }
  // Other methods can be added here
  }