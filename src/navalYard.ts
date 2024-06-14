// Naval Yard factory for ships


export class Ship{
	private _length: number
	private _hits: number
	private _sunk: boolean
	constructor(length: number) {
		this._length = length
		this._hits = 0
		this._sunk = false
	}
	hit() {
		if (this._hits === this._length) {
			return
		}else
		this._hits++
	}
	isSunk() {
		if (this._hits === this._length) {
			this._sunk = true
		}
		console.log(this._sunk)
		return this._sunk
	}

	get length() {
		return this._length
	}

	get hits() {
		return this._hits
	}
}

const fuckship = new Ship(1)

fuckship.hit()

console.log(fuckship.isSunk())