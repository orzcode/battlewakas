import { Gameboard } from "./gameboardModule";
import { PlayerModule } from "./playerModule";
import { infoDisplay } from "./htmlComponents";
import { boardDisplay } from "./htmlComponents";
import html from "./htmlComponents";

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

  const tileEventListener = () => {
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

    if(inactivePlayer.gameboard.checkAllSunk()){
      //PROBLEM:
      //INACTIVE PLAYER SEEMINGLY ALWAYS HAS SUNK SHIPS
      html.winner();
    }else {
    infoDisplay("swapBtn");
    enemyBoard?.removeEventListener("click", tileEventListener);
    //removes ability to click on a tile after the first click
    }
  };

  enemyBoard?.addEventListener("click", tileEventListener);
};

//////////////////////////////////////////



export const swapButton = () => {
  html.hotswap()
}

export const placementSwap = () => {
  document.querySelector(".splashModal")?.remove();
  //why not working when moving to main game?
  
  if(PlayerModule.player2.getShips().length === 0){
    //if P2 has no ships, then show placement screen for them instead of maingame
        boardDisplay("placementScreen");
  } else {
    boardDisplay("mainGameScreen");
  }
}