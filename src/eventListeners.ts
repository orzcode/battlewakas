import { Gameboard } from "./gameboardModule";
import { PlayerModule } from "./playerModule";
import { infoDisplay } from "./htmlComponents";

export const hitmarkApplication = () => {
  const inactivePlayer = PlayerModule.inactivePlayer; // Retrieve the inactive player from PlayerModule
  const enemyBoard = document.getElementById(inactivePlayer.getName());
  // Gameboard has an ID based on player name
  // CAREFUL that you layout the vars in this sequence
  const enemyShips = inactivePlayer.getShips();

  // Create a map to associate positions with their corresponding ship
  const positionToShipMap = new Map();
  enemyShips.forEach((ship) => {
    ship.positions.forEach((position) => {
      positionToShipMap.set(position, ship);
    });
  });

  enemyBoard?.addEventListener("click", (event) => {
    const clickedTile = event.target;
    const position = clickedTile.getAttribute("data-position");
    if (positionToShipMap.has(position)) {
      const ship = positionToShipMap.get(position);
      ship.hit(); // Call the hit method on the corresponding ship
      inactivePlayer.gameboard.receiveAttack(position);
      clickedTile.classList.add("hit");
    } else {
      inactivePlayer.gameboard.receiveMiss(position);
      clickedTile.classList.add("miss");
    }
    infoDisplay("swapBtn");
    //AND REMOVE EVENT LSITERNS / CLICK FUNCITONALITY
  });
};
