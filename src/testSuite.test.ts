import { describe, it, expect, beforeAll, beforeEach, assert } from "vitest";

import { Ship } from "./navalYard";
import { Gameboard } from "./gameboardModule";
import { PlayerModule } from "./playerModule";

//
//Query: return something/change nothing
//Command: change something/return nothing
//	-- Do not conflate the two!
//
//Test incoming Q msgs by making assertions about what they send back
//Test incoming C msgs by making assertions about direct public side effects
//
//Do not test private methods
//
//Receiver of a msg is responsible for making assertions
//
//Do not test outgoing Q msgs
//Test or expect 'to send' outgoing C msgs
//  -- Mocking

let ship = new Ship(5);

beforeEach(() => {
  ship = new Ship(5);
});

describe("Ship", () => {
  it("It should have a length", () => {
    expect(ship.length).toBe(5);
  });
  it("It should be able to take a hit", () => {
    //note - incoming C msg - no direct public side effects - superfluous test
    ship.hit();
    expect(ship.hits).toBe(1);
  });
  it("It should be able to be sunk", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
  it("It shouldnt take more hits than its length", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(5);
  });
});

describe("Gameboard", () => {
  let board = new Gameboard();

  it("Should initialy be an object", () => {
    expect(board).toBeTypeOf("object");
  });
  it("Should have empty/false hitmarkers initially", () => {
    expect(board["B3"].hitMark).toBe(false);
  });

  it("Should reflect a hit on the board", () => {
    board.receiveAttack("A3");
    expect(board["A3"].hitMark).toBe(true);
  });

  it("Should send hit to correct ship", () => {
    const ship = new Ship(4); // Creating a ship instance
    board["A3"].ship = ship; // Placing the ship on the "A3" tile
    const initialHits = ship.hits; // Storing the initial hits of the ship

    board.receiveAttack("A3"); // Attacking the "A3" tile

    // If there's a ship on the tile, expect its hits to increase by 1
    if (board["A3"].ship) {
      expect(board["A3"].ship.hits).toBe(initialHits + 1);
    } else {
      // If there's no ship, the test should fail
      assert.fail("error message on failure");
    }
  });

  it("Should be able to place ships at specific co-ordinates", () => {
    let placementTiles = ["A3", "B3", "C3", "D3", "E3"];
    let ship = new Ship(5);
    board.placeShip(ship, ...placementTiles);
    expect(board["A3"].ship).toBe(ship);
    expect(board["B3"].ship).toBe(ship);
    expect(board["C3"].ship).toBe(ship);
    expect(board["D3"].ship).toBe(ship);
    expect(board["E3"].ship).toBe(ship);
  });

  it("Should update ship object with the placement position", () => {
    let placementTiles = ["A3", "B3", "C3", "D3", "E3"];
    let ship = new Ship(5);
    board.placeShip(ship, ...placementTiles);
    expect(ship.positions).toEqual(placementTiles);
  });

  it("Should be able to report whether or not all of their ships have been sunk", () => {
    let newShip = new Ship(2);
    board.placeShip(newShip, "A1", "A2");
    board.receiveAttack("A1");
    board.receiveAttack("A2");
    expect(board.checkAllSunk()).toBe(true);
});
});

describe("Player", () => {
  it("Should have its own gameboard", () => {
    let player1 = PlayerModule.createPlayer("Fuckface")
    let player2 = PlayerModule.activePlayer
    expect(player1.gameboard).toBeInstanceOf(Gameboard);
    expect(player2.gameboard).toBeInstanceOf(Gameboard);
  });
});




