let id: number = 5;
let nadme: string = "test";
let isDone: boolean = true;
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let tuple: [number, string] = [1, "test"];


export const test = () => {
	console.log(id, nadme, isDone, list, list2, tuple);
}