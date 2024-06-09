// Naval Yard factory for ships

interface ShipInterface {

	hit(): void //or string so i can console log 'hit!'?
	isSunk(): boolean
}

export class Ship implements ShipInterface {
	private length: number
	private hits: number
	private sunk: boolean
	constructor(length: number) {
		this.length = length
		this.hits = 0
		this.sunk = false
	}
	hit() {
		this.hits++
	}
	isSunk() {
		if (this.hits === this.length) {
			this.sunk = true
		}
		return this.sunk
	}
}