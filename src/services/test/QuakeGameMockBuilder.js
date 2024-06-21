import QuakeGame from "../../entity/QuakeGameEntity.js";

class QuakeGameMockBuilder extends QuakeGame {
  constructor() {
    super();
  }

  withKills() {
    this.kills = {
      player1: 1,
      player2: 55,
      player3: 9,
    };
    this.players = ["player1", "player2", "player3"];
    return this;
  }

  build() {
    return this;
  }
}

export default QuakeGameMockBuilder;
