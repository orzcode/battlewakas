import { describe, it, expect } from 'vitest';

import { Ship } from "./navalYard";

describe('Ship', () => {
	it("It should have a length", () => {
		const ship = new Ship(5);
		expect(ship.length).toBe(5);
	});
	it("It should be able to be hit", () => {
		const ship = new Ship(5);
		ship.hit();
		expect(ship.hits).toBe(1);
	});
	it("It should be able to be sunk", () => {
		const ship = new Ship(5);
		ship.hit();
		ship.hit();
		ship.hit();
		ship.hit();
		ship.hit();
		expect(ship.isSunk()).toBe(true);
	});
})