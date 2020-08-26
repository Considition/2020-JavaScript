let gameLayer = require('./gameLayer');
const { toGameState, toGameInfo } = require('./jsonParser');


const apiKey = ""; //TODO: Your api key here
//The different map names can be found on considition.com/rules
const currentMap = "training1"; //Todo: You map choice here. If left empty, the map "training1" will be selected."


async function main(){
    let gameInfo = await gameLayer.newGame(apiKey,currentMap);
    console.log("Starting game: " + gameInfo.gameId);

    let currentState = await gameLayer.startGame(apiKey);
    while (currentState.turn < gameInfo.maxTurns)
        currentState = await takeTurn(gameInfo, currentState)

    let score = await gameLayer.getScore(apiKey,gameInfo.gameId);
    console.log("Done with game: " + gameInfo.gameId);
    console.log("Final total score was: \n" + score.finalScore + "\n");
}

async function takeTurn(gameInfo, prevstate){
    // TODO All calls to the api as well as help-functions can be founds in the module gameLayer
    // TODO Implement your own artificial intelligence here
    // TODO Take one action per turn until the game ends.
    // TODO The following is a short example of how to use the StarterKit.
    let currentState;

    if(prevstate.residenceBuildings.length === 0) {
        let x = 0;
        let y = 0;
        for (let i=0; i<gameInfo.map.length; i++) {
            for (let j=0; j<gameInfo.map[i].length; j++) {
                if (gameInfo.map[i][j] === 0) {
                    x = i;
                    y = j;
                    break;
                }
            }
        }
        currentState = await gameLayer.doPlaceFoundation(apiKey, x, y,gameInfo.availableResidenceBuildings[0].buildingName, gameInfo.gameId);
    } else {
        const building = prevstate.residenceBuildings[0]
        if (building.buildProgress < 100 ) {
            currentState = await gameLayer.doBuild(apiKey,building.x,building.y, gameInfo.gameId);
        }
        else if (building.health < 50) {
            currentState = await gameLayer.doMaintain(apiKey, building.x, building.y, gameInfo.gameId)
        }
        else if (!building.effects.includes(gameInfo.availableUpgrades[0].name)) {
            currentState = await gameLayer.doUpgrade(apiKey,building.x,building.y, gameInfo.availableUpgrades[0].name);
        }
        else if (building.temperature < 18){
            const bluePrint = gameLayer.getBlueprintResidence(gameInfo, prevstate.residenceBuildings[0].buildingName)
            const energy = bluePrint.baseEnergyNeed + (building.temperature - prevstate.currentTemp)
                * bluePrint.emissivity + 0.5 - building.currentPop * 0.04;
            currentState = await gameLayer.doAdjustEnergyLevels(apiKey,building.x, building.y, energy, gameInfo.gameId)
        }
        else if (building.temperature > 24){
            const bluePrint = gameLayer.getBlueprintResidence(gameInfo, prevstate.residenceBuildings[0].buildingName)
            const energy = bluePrint.baseEnergyNeed + (building.temperature - prevstate.currentTemp)
                * bluePrint.emissivity - 0.5 - building.currentPop * 0.04;
            currentState = await gameLayer.doAdjustEnergyLevels(apiKey,building.x, building.y,energy, gameInfo.gameId)
        }
        else
            currentState = await gameLayer.doWait(apiKey, gameInfo.gameId);
    }
    currentState.messages.forEach(message => console.log(message));
    currentState.errors.forEach(error => console.log("Error: " + error));

    return currentState;
}

main();

