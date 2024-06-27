import { Ship } from "./navalYard";
import { PlayerModule } from "./playerModule";

export class Gameboard {
  [key: string]: { hitMark: boolean | null, ship: Ship | null };

  constructor() {
    const board: { [key: string]: { hitMark: boolean | null, ship: Ship | null } } = {};
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (const letter of letters) {
      for (let number = 1; number <= 10; number++) {
        const key = `${letter}${number}`;
        board[key] = { hitMark: null, ship: null };
      }
    }
    Object.assign(this, board);
  }

  receiveAttack(position: string) {
    this[position].hitMark = true;
    this[position].ship?.hit();
  }

  receiveMiss(position: string) {
    this[position].hitMark = false;
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
        continue;
      } else if (!ship.isSunk()) {
        allSunk = false;
        break;
      }
    }
    return allSunk;
  }

  // Other methods can be added here
}
