//go inside #main
import { PlayerModule } from "./playerModule";
const main = document.getElementById("main");

const splash: string = `
          <div id="splash" class="splashModal">
          <p><em>
            The year is 1642, the first known occasion when Māori encountered Europeans. As Māori approached the Dutch ships in canoes, one canoe rammed a ship's boat that was passing between two vessels, killing four Dutchmen. One Māori was hit by a shot from Tasman's men in response to the attack.
              This sets the waters for...
          </em>
          </p>
          <h1>Battlewakas</h1>

          <form id="modeSelect" method="dialog" required>
						
						<fieldset form="modeSelect" name="modeSelect">
							<legend hidden>Mode Select:</legend>
						<div class="splashRadios">
							<input type="radio" id="cpu" value="cpu" name="modeSelect" checked>
							<label for="cpu">vs CPU</label>
						</div>
						<div class="splashRadios">
							<input type="radio" id="human" value="human" name="modeSelect">
							<label for="human">vs Human</label>
						</div>
						</fieldset>

          <div id="startButtonsDiv">
						<button c
            lass="btnShadow" type="submit" form="modeSelect">Confirm</button>
					</div>
					</form>

          </div>
`;
/////////////////////////////////////////////////////////////
const infoDisplay = (screenType: string) => {
  const infoDisplay = document.createElement("div");
  infoDisplay.id = "infoDisplay";

  switch (screenType) {
    case "placementScreen":
      infoDisplay.innerHTML = `<h2>${PlayerModule.activePlayer.getName()}, place your ships!</h2>`;
      break;
    case "mainGameScreen":
      infoDisplay.innerHTML = `<h2>Fire a shot!</h2>`;
      break;
  }

  main?.insertBefore(infoDisplay, main.firstChild);
  //inserts the infoDisplay BEFORE the firstchild

  //return infoDisplay;
};

/////////////////////////////////////////////////////////////
const tileMarkersX = () => {
  const xAx = document.createElement("div");
  xAx.id = "xAx";
  xAx.innerHTML = `
          <div class="xAx">1</div>
          <div class="xAx">2</div>
          <div class="xAx">3</div>
          <div class="xAx">4</div>
          <div class="xAx">5</div>
          <div class="xAx">6</div>
          <div class="xAx">7</div>
          <div class="xAx">8</div>
          <div class="xAx">9</div>
          <div class="xAx">10</div>`;
  return xAx;
};
const tileMarkersY = () => {
  const yAx = document.createElement("div");
  yAx.id = "yAx";
  yAx.innerHTML = `
          <div class="yAx">A</div>
          <div class="yAx">B</div>
          <div class="yAx">C</div>
          <div class="yAx">D</div>
          <div class="yAx">E</div>
          <div class="yAx">F</div>
          <div class="yAx">G</div>
          <div class="yAx">H</div>
          <div class="yAx">I</div>
          <div class="yAx">J</div>`;
  return yAx;
};

// const placementBoard = () => {
//   infoDisplay("placementScreen");

//   boardDisplay("mainGameScreen");

//   //inserts the infoDisplay
// };

const boardDisplay = (screenType: string): void => {
  const parentBox = document.createElement("div");
  parentBox.id = "boardParentBox";
  main?.appendChild(parentBox);

  infoDisplay(screenType);
  //inserts the infoDisplay, which comes with both board screens

  switch (screenType) {
    case "placementScreen":
      boardMaker().id = PlayerModule.activePlayer.getName();
      break;
    case "mainGameScreen":
      boardMaker().id = PlayerModule.activePlayer.getName();
      boardMaker().id = PlayerModule.inactivePlayer.getName();
      break;
  }
}

const boardMaker = () => {
  //called by 'boardDisplay' helper function

  const board = document.createElement("div");
  board.classList.add("placementBoard");
  //creates a board, gives it generic class

  for (const key in PlayerModule.activePlayer.gameboard) {
    //a generic gameboard would do, or even a loop with static keys, but this is less code
    const tile = document.createElement("div");
    tile.classList.add("placementBoardTile");
    tile.classList.add(key);

    // Append tiles to the placementBoard
    // append tile markers
    board.appendChild(tile);
  }
  board.appendChild(tileMarkersX());
  board.appendChild(tileMarkersY());

  document.querySelector("#boardParentBox")?.appendChild(board);  
  return board
  //creates tiles for THE board just created
  //creates tile markers
  //appends all
  //also returns board, so it can be given a player id
};
/////////////////////////////////////////////////////////////
const hotswap: string = `
          <div id="hotswap" class="splashModal">
          <h1>Swap players!</h1>
          <h2>(no peeking!)</h2>`;
/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////
const html = {
  splash: () => (main.innerHTML = splash),
  placementBoard: () => boardDisplay("placementScreen"),
  hotswap: () => (main.innerHTML = hotswap),
  mainGame: () => boardDisplay("mainGameScreen"),
};

export default html;
