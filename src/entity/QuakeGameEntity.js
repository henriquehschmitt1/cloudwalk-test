class QuakeGame {
  constructor() {
    this.totalKills = 0;
    this.players = [];
    this.killsByMeans = {};
    this.kills = {};
  }

  addPlayer(playerName) {
    if (!this.players.includes(playerName)) {
      this.players.push(playerName);
      this.kills[playerName] = 0;
    }
  }

  addWeapon(weapon) {
    if (!this.killsByMeans[weapon]) {
      this.killsByMeans[weapon] = 0;
    }
  }

  increaseWeaponKill(weapon) {
    this.killsByMeans[weapon] += 1;
  }

  increaseKillByOne(playerName) {
    this.kills[playerName] += 1;
    this.totalKills += 1;
  }

  decreaseKillByOne(playerName) {
    if (this.kills.hasOwnProperty(playerName)) {
      this.kills[playerName] === 0 ? null : (this.kills[playerName] -= 1);
    }
    this.totalKills += 1;
  }
}

export default QuakeGame;
