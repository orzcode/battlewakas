import { Gameboard } from "./gameboardModule";

export class Ship {
  private _length: number;
  private _hits: number;
  private _sunk: boolean;
  private _positions: [];
  constructor(length: number) {
    this._length = length;
    this._hits = 0;
    this._sunk = false;
    this._positions = [];
  }
  hit() {
    if (this._hits === this._length) {
      return;
    } else this._hits++;
  }
  isSunk() {
    if (this._hits === this._length) {
      this._sunk = true;
    }
    console.log(this._sunk);
    return this._sunk;
  }

  get length() {
    return this._length;
  }

  get hits() {
    return this._hits;
  }

  get positions() {
    return this._positions;
  }
  set positions(positions: []) {
    this._positions = positions;
  }
}


