//go inside #main

export const splash: string = `
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
						<button class="btnShadow" type="submit" form="modeSelect">Confirm</button>
					</div>
					</form>

          </div>
`;

const components = {
  splash,
};

export default components;
