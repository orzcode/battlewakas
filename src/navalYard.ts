//import { Gameboard } from "./gameboardModule";
import { wakas } from "./svgs";

export class Ship {
  private _length: number;
  private _shipname: string;
  private _image: string;
  private _hits: number;
  private _sunk: boolean;
  private _positions: [];

  private shipNamer(length: number): string {
    switch (length) {
      case 5:
        return "Waka Supreme (5) ";
      case 4:
        return "Waka Taua (4) ";
      case 3:
        return "Waka Hourua (3) ";
      case 2:
        return "Waka Tētē (2) ";
      case 1:
        return "Waka Tīwai (1) ";
      default:
        return "Unknown Ship ";
    }
  }
  // Getter for _image
  getImage(): string {
    return this._image;
  }

  // Setter for _image
  setImage(length: number): string {
    switch (length) {
      case 5:
        return wakas[5]
      case 4:
        return wakas[4]
      case 3:
        return wakas[3]
      case 2:
        return wakas[2]
      case 1:
        return wakas[1]
      default:
        return "Unknown Ship";
    }
  }

  constructor(length: number) {
    this._length = length;
    this._shipname = this.shipNamer(length);
    this._image = this.setImage(length);
    this._hits = 0;
    this._sunk = false;
    this._positions = [];
  }
  hit() {
    if (this._hits === this._length) {
      return;
    } else this._hits++;

    //check if sunk on each hit
    this.isSunk()
  }
  isSunk() {
    if (this._hits === this._length) {
      this._sunk = true;
    }
    console.log(this._shipname + " sunk? " + this._sunk);
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


