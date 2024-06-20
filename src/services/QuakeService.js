import fs from "fs";
import readline from "readline";
import path from "path";
import QuakeGame from "../model/QuakeGame.js";

const FILE_PATH = path.resolve(
  new URL("../quakeLog/qgames.log", import.meta.url).pathname,
);

class QuakeService {
  async parseLog() {
    const fileStream = fs.createReadStream(FILE_PATH);
    const lines = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const matches = [];
    let currentGame = null;
    for await (const line of lines) {
      if (line.includes("InitGame:")) {
        if (currentGame) {
          //gambiarra, arrumar dps
          currentGame.players = currentGame.getPlayersAsArray();
          matches.push(currentGame);
        }
        currentGame = new QuakeGame();
      }
      if (line.includes("Kill:")) {
        this.createGameLog(currentGame, line);
      }
    }
    return matches;
  }

  createGameLog(currentGame, line) {
    const { killerName, victimName } = this.getPlayersNames(line);
    this.addCurrentGameInfos(killerName, victimName, currentGame);
  }

  getPlayersNames(line) {
    const indexKilled = line.indexOf("killed");
    const indexBy = line.indexOf("by");
    const startIndex = line.lastIndexOf(":", indexKilled - 2) + 2;
    const killerName = line.substring(startIndex, indexKilled).trim();
    const victimName = line
      .substring(indexKilled + "killed".length, indexBy)
      .trim();
    return { killerName, victimName };
  }

  addCurrentGameInfos(killerName, victimName, currentGame) {
    if (killerName !== "\u003Cworld\u003E") {
      currentGame.addPlayer(killerName);
      currentGame.addPlayer(victimName);
      if (killerName !== victimName) {
        currentGame.increaseKillByOne(killerName);
      }
    }
    if (killerName === "\u003Cworld\u003E") {
      currentGame.addPlayer(victimName);
      currentGame.decreaseKillByOne(victimName);
    }
  }
}

export default QuakeService;
