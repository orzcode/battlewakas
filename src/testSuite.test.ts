import { describe, it, expect, beforeAll, beforeEach } from 'vitest';

import { Ship } from "./navalYard";

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
	ship = new Ship(5)
	})

	
describe('Ship', () => {

	
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
})

