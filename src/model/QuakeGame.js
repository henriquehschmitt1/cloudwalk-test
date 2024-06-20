class QuakeGame {
  constructor() {
    this.totalKills = 0;
    this.players = new Map();
    this.kills = {};
  }

  addPlayer(playerName) {
    if (!this.players.has(playerName)) {
      this.players.set(playerName, true);
      this.kills[playerName] = 0;
    }
  }

  removePlayer(playerName) {
    if (this.players.has(playerName)) {
      this.players.delete(playerName);
      delete this.kills[playerName];
    }
  }

  increaseKillByOne(playerName) {
    if (!this.kills.hasOwnProperty(playerName)) {
      throw {
        status: 404,
        message: "Player not found",
      };
    }
    this.kills[playerName] += 1;
    this.totalKills += 1;
  }

  decreaseKillByOne(playerName) {
    if (this.kills.hasOwnProperty(playerName)) {
      this.kills[playerName] === 0 ? null : (this.kills[playerName] -= 1);
    }
    this.totalKills += 1;
  }

  resetGame() {
    this.totalKills = 0;
    this.players = new Map();
    this.kills = {};
  }

  getPlayersAsArray() {
    return Array.from(this.players.keys());
  }
}

export default QuakeGame;
