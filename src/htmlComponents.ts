//go inside #main
import { PlayerModule } from "./playerModule";
import { hitmarkApplication } from "./eventListeners";
import { shipPlacer, hitMarkRenderer } from "./domRenderStuff";
import { swapButton, placementSwap } from "./eventListeners";
import { startShipPlacement, ships, currentShipIndex } from "./shipPlacement";

const main = document.getElementById("main");

export const startScreen = () => {
  const splash: string = `
          <div id="splash" class="splashModal">
          <p><em>
            The year is 1642, the first known occasion when Māori encountered Europeans. As Māori approached the Dutch ships in canoes, one canoe rammed a ship's boat that was passing between two vessels, killing four Dutchmen. One Māori was hit by a shot from Tasman's men in response to the attack.
              This sets the waters for...
          </em>
          </p>
          <h1>Battlewakas</h1>

          <form id="modeSelect" method="dialog" required>
						


          <div id="startButtonsDiv">
						<button c
            lass="btnShadow" type="submit" form="modeSelect">To the seas!</button>
					</div>
					</form>

          </div>
`;
//goes right beneath form tag above
//
// <fieldset form="modeSelect" name="modeSelect">
// <legend hidden>Mode Select:</legend>
// <div class="splashRadios">
// <input type="radio" id="cpu" value="cpu" name="modeSelect" checked>
// <label for="cpu">vs CPU</label>
// </div>
// <div class="splashRadios">
// <input type="radio" id="human" value="human" name="modeSelect">
// <label for="human">vs Human</label>
// </div>
// </fieldset>


main.innerHTML = splash;
 

  const start = document.querySelector("#startButtonsDiv");
  start?.addEventListener("click", startHandler);

  function startHandler() {
    html.placementBoard();
    document.querySelector(".splashModal")?.remove(); 
   }
  }

/////////////////////////////////////////////////////////////
export const infoDisplay = (screenType: string) => {
  let infoDisplay = document.getElementById("infoDisplay");

  //create the div if it isn't there already
  if (!infoDisplay) {
    infoDisplay = document.createElement("div");
    infoDisplay.id = "infoDisplay";
    main?.insertBefore(infoDisplay, main.firstChild);
  }

  switch (screenType) {
    case "placementDynamic":
      infoDisplay.innerHTML = `<h2>${PlayerModule.activePlayer.getName()}, place your ${
        ships[currentShipIndex].name}!</h2>`;
      break;
    //this one used as the player places each ship

    //this one used initially
    case "placementScreen":
      infoDisplay.innerHTML = `<h2>${PlayerModule.activePlayer.getName()}, place your Waka Supreme (5)!</h2>`;
      break;
    case "mainGameScreen":
      infoDisplay.innerHTML = `<h2>${PlayerModule.activePlayer.getName()}, fire a shot!</h2>`;
      break;
    case "swapBtn":
      infoDisplay.innerHTML = `<button class="swapBtn">Swap players!</button>`;
      const swap = document.querySelector(".swapBtn");
      swap?.addEventListener("click", swapButton);
      break;
    case "clear":
      infoDisplay.remove();
      break
  }
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

export const boardDisplay = (screenType: string): void => {
  document.querySelector("#boardParentBox")?.remove();

  //removes any previous board
  const parentBox = document.createElement("div");
  parentBox.id = "boardParentBox";
  
  main?.appendChild(parentBox);

  infoDisplay(screenType);
  //inserts the infoDisplay, which comes with both board screens

  switch (screenType) {
    //gives an ID to the board div, based on player ID
    //eg "Player 2"
    case "placementScreen":
      boardMaker().id = PlayerModule.activePlayer.getName();

      startShipPlacement();

      break;

    case "mainGameScreen":
      boardMaker().id = PlayerModule.activePlayer.getName();
      boardMaker().id = PlayerModule.inactivePlayer.getName();

      shipPlacer(PlayerModule.activePlayer);
      //places active player's ships on left board

      hitmarkApplication();
      //should be renamed to event listener adder

      hitMarkRenderer();
      //places both sides' hitmarks
      break;
    //change to data attribute later if needed
  }
};

const boardMaker = () => {
  //called by 'boardDisplay' helper function

  const board = document.createElement("div");
  board.classList.add("placementBoard");
  //creates a board, gives it generic class

  for (const key in PlayerModule.activePlayer.gameboard) {
    //a generic gameboard would do, or even a loop with static keys, but this is less code
    const tile = document.createElement("div");
    tile.classList.add("placementBoardTile");
    tile.setAttribute("data-position", key);

    // Append tiles to the placementBoard
    // append tile markers
    board.appendChild(tile);
  }
  board.appendChild(tileMarkersX());
  board.appendChild(tileMarkersY());

  document.querySelector("#boardParentBox")?.appendChild(board);
  return board;
  //creates tiles for THE board just created
  //creates axis tile markers
  //appends all
  //also returns board, so it can be given a player id
};
/////////////////////////////////////////////////////////////
export const showHotswapModal = () => {
  const hotswap: string = `
      <div id="hotswap" class="splashModal">
          <h1>Swap players!</h1>
          <h2>(no peeking!)</h2>
          <button class="placementSwap">Swap players</button>
      </div>`;

  main.innerHTML = hotswap;
  infoDisplay("clear")

  const swap = document.querySelector(".placementSwap");
  swap?.addEventListener("click", placementSwap);

  PlayerModule.switchActive();
};
/////////////////////////////////////////////////////////////
export const winFunc = (player: Player) => {
  const winsplash: string = `
  <div id="winsplash" class="splashModal">
      <h1>Congratulations!</h1>
      <h2>${player.getName()} has won!</h2>
      <button class="winBtn">Play again?</button>
  </div>`;

main.innerHTML = winsplash;

const btn = document.querySelector(".winBtn");
btn?.addEventListener("click", html.splash);
}
/////////////////////////////////////////////////////////////
const html = {
  splash: () => startScreen(),
  placementBoard: () => boardDisplay("placementScreen"),
  hotswap: () => showHotswapModal(),
  mainGame: () => boardDisplay("mainGameScreen"),
  winner: () => winFunc(PlayerModule.activePlayer),
};

export default html;
