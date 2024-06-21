import QuakeService from "../QuakeService.js";
import QuakeGameMockBuilder from "./QuakeGameMockBuilder.js";

const quakeService = new QuakeService();

describe("QuakeService", () => {
  it("Should transform kills into a descending ranking and add it into current game", () => {
    const currentGame = new QuakeGameMockBuilder().withKills().build();
    const expectedOrder = ["player2", "player3", "player1"];

    quakeService.killsToRanking(currentGame);
    const currentOrder = Object.keys(currentGame.kills);
    expect(currentOrder).toEqual(expectedOrder);
  });

  it("Should add weapon name and kill into current game", () => {
    const currentGame = new QuakeGameMockBuilder().build();

    quakeService.addWeaponsInfos("MOD_ROCKET", currentGame);
    const weapons = Object.keys(currentGame.killsByMeans);
    expect(weapons).toEqual(["MOD_ROCKET"]);
  });

  it("Should add victim and killerName, and also increase killer kills and total kills by 1", () => {
    const currentGame = new QuakeGameMockBuilder().build();

    quakeService.addPlayersInfos("Killer", "Victim", "MOD_ROCKET", currentGame);
    expect(currentGame.totalKills).toBe(1);
    expect(currentGame.kills["Killer"]).toBe(1);
    expect(currentGame.kills["Victim"]).toBe(0);
    expect(currentGame.players).toEqual(["Killer", "Victim"]);
  });

  it("Should not add killer name, decrease victims kill by 1 and increase total kills by 1", () => {
    const currentGame = new QuakeGameMockBuilder().withKills().build();

    quakeService.addPlayersInfos(
      "\u003Cworld\u003E",
      "player3",
      "MOD_TRIGGER_HURT",
      currentGame,
    );
    expect(currentGame.totalKills).toBe(1);
    expect(currentGame.kills["\u003Cworld\u003E"]).toBeFalsy();
    expect(currentGame.kills["player3"]).toBe(8);
    expect(currentGame.players).toEqual(["player1", "player2", "player3"]);
  });

  it("Should not add killer name, not decrease player kill as its already 0 and increase total kills by 1", () => {
    const currentGame = new QuakeGameMockBuilder().withZeroKills().build();

    quakeService.addPlayersInfos(
      "\u003Cworld\u003E",
      "player1",
      "MOD_TRIGGER_HURT",
      currentGame,
    );
    expect(currentGame.totalKills).toBe(1);
    expect(currentGame.kills["\u003Cworld\u003E"]).toBeFalsy();
    expect(currentGame.kills["player1"]).toBe(0);
    expect(currentGame.players).toEqual(["player1"]);
  });

  it("Should correctly return killerName, victimName and weaponName based on a line of the quake game log", () => {
    const line =
      "11:40 Kill: 2 5 7: Isgalamido killed Assasinu Credi by MOD_ROCKET_SPLASH";

    const { killerName, victimName, weaponName } = quakeService.getNames(line);
    expect(killerName).toBe("Isgalamido");
    expect(victimName).toBe("Assasinu Credi");
    expect(weaponName).toBe("MOD_ROCKET_SPLASH");
  });

  it("Should modify currentGame based on the line provided", () => {
    const currentGame = new QuakeGameMockBuilder().build();
    const line =
      "11:40 Kill: 2 5 7: Isgalamido killed Assasinu Credi by MOD_ROCKET_SPLASH";
    quakeService.createGameLog(currentGame, line);

    expect(currentGame.totalKills).toBe(1);
    expect(currentGame.players).toEqual(["Isgalamido", "Assasinu Credi"]);
    expect("MOD_ROCKET_SPLASH" in currentGame.killsByMeans).toBe(true);
    expect(currentGame.kills["Isgalamido"]).toBe(1);
    expect(currentGame.kills["Assasinu Credi"]).toBe(0);
  });

  it("Should create a matches log and return it", async () => {
    const matches = await quakeService.parseLog();
    expect(matches.length).toBe(20);
  });
});
