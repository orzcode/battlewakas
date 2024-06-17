//go inside #main
import { PlayerModule } from "./playerModule";
const main = document.getElementById("main");

const splash: string = `
          <!-- <div id="infoDisplay">
            <h2>dynamic</h2>
            <button class="btnShadow" onclick="GameBoard.reset()">Restart?</button>
          </div> -->

          <div id="splash">
          <p><em>
            The year is 1642, the first known occasion when Māori encountered Europeans. As Māori approached the Dutch ships in canoes, one canoe rammed a ship's boat that was passing between two vessels, killing four Dutchmen. One Māori was hit by a shot from Tasman's men in response to the attack.
              This sets the stage for...
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

const infoDisplay = () => {
  const infoDisplay = document.createElement("div");
  infoDisplay.id = "infoDisplay";
  infoDisplay.innerHTML = `<h2>Player 1, place your ships!</h2>`;
  // const info = document.createElement("h2");
  // infoDisplay.appendChild(info);
  // info.textContent
  return infoDisplay
}

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
          <div class="xAx">10</div>`
  return xAx
}
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
          <div class="yAx">J</div>`
  return yAx
}

const placement: string = `<div id="placementBoard"></div>`;
const placementBoard = () => {
  main.innerHTML = placement;
  main?.insertBefore(infoDisplay(), main.firstChild);

  for (const key in PlayerModule.player1.gameboard) {
    const tile = document.createElement("div");
    tile.classList.add("placementBoardTile");
    // tile.innerHTML = key;

    // Append tiles to the placementBoard
    // append tile markers
    document.getElementById("placementBoard")?.appendChild(tile);
    document.getElementById("placementBoard")?.appendChild(tileMarkersX());
    document.getElementById("placementBoard")?.appendChild(tileMarkersY());
  }

};

/////////////////////////////////////////////////////////////

const hotswap: string = ``;

const maingame: string = ``;

const html = {
  splash: () => (main.innerHTML = splash),
  // placement: () => (main.innerHTML = placement),
  placementBoard: placementBoard(),
  hotswap: () => (main.innerHTML = hotswap),
  maingame: () => (main.innerHTML = maingame),
};

export default html;
