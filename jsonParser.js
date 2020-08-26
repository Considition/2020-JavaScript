//Helper module for the gameLayer.

/**
 * @param gameStateResponse
 * @returns {gameState}
 */
function toGameState(gameStateResponse) {
    return {
        turn: gameStateResponse['turn'],
        residenceBuildings: residenceBuildingResponse(gameStateResponse['residenceBuildings']),
        utilityBuildings: utilityBuildingResponse(gameStateResponse['utilityBuildings']),
        funds: gameStateResponse['funds'],
        totalCo2: gameStateResponse['totalCo2'],
        totalHappiness: gameStateResponse['totalHappiness'],
        currentTemp: gameStateResponse['currentTemp'],
        housingQueue: gameStateResponse['housingQueue'],
        queueHappiness: gameStateResponse['queueHappiness'],
        errors: gameStateResponse['errors'],
        messages: gameStateResponse['messages']
    };
}

/**
 * @returns {gameInfo}
 */
function toGameInfo(gameInfoResponse) {
    return {
        gameId: gameInfoResponse["gameId"],
        mapName: gameInfoResponse["mapName"],
        map: gameInfoResponse['map'],
        energyLevels: energyLevels(gameInfoResponse['energyLevels']),
        effects: allEffects(gameInfoResponse['effects']),
        availableUpgrades: upgrades(gameInfoResponse['availableUpgrades']),
        maxTurns: gameInfoResponse['maxTurns'],
        maxTemp: gameInfoResponse['maxTemp'],
        minTemp: gameInfoResponse['minTemp'],
        availableResidenceBuildings: blueprintResidenceBuilding(gameInfoResponse['availableResidenceBuildings']),
        availableUtilityBuildings: blueprintUtilityBuilding(gameInfoResponse['availableUtilityBuildings']),
    };
}

function upgrades(upgrades) {
    let upgradesList = []
    upgrades.forEach(upgrade => {
        let upgradeToAdd = {
            name: upgrade['name'],
            effect: upgrade['effect'],
            cost: upgrade['cost'],
        }
        upgradesList.push(upgradeToAdd)
    });
    return upgradesList
}

function allEffects(effects) {
    let effectList = []
    effects.forEach(effect => {
        let effectToAdd = {
            name: effect['name'],
            radius: effect['radius'],
            emissivityMultiplier: effect['emissivityMultiplier'],
            decayMultiplier: effect['decayMultiplier'],
            buildingIncomeIncrease: effect['buildingIncomeIncrease'],
            maxHappinessIncrease: effect['maxHappinessIncrease'],
            mwhProduction: effect['mwhProduction'],
            baseEnergyMwhIncrease: effect['baseEnergyMwhIncrease'],
            co2PerPopIncrease: effect['co2PerPopIncrease'],
            decayIncrease: effect['decayIncrease']
        }
        effectList.push(effectToAdd)
    });
    return effectList
}

function residenceBuildingResponse(buildings) {
    let buildingResponseList = []
    for (let i = 0; i < buildings.length; i++) {
        let building = {
            buildingName: buildings[i]['buildingName'],
            x: buildings[i]['position']['x'],
            y: buildings[i]['position']['y'],
            currentPop: buildings[i]['currentPop'],
            temperature: buildings[i]['temperature'],
            effectiveEnergyIn: buildings[i]['effectiveEnergyIn'],
            requestedEnergyIn: buildings[i]['requestedEnergyIn'],
            happinessPerTickPerPop: buildings[i]['happinessPerTickPerPop'],
            buildProgress: buildings[i]['buildProgress'],
            health: buildings[i]['health'],
            effects: buildings[i]['effects'],
            canBeDemolished: buildings[i]['canBeDemolished'],
        }
        buildingResponseList.push(building);
    }
    return buildingResponseList;
}

function utilityBuildingResponse(buildings) {
    let buildingResponseList = []
    for (let i = 0; i < buildings.length; i++) {
        let building = {
            buildingName: buildings[i]['buildingName'],
            x: buildings[i]['position']['x'],
            y: buildings[i]['position']['y'],
            effectiveEnergyIn: buildings[i]['effectiveEnergyIn'],
            buildProgress: buildings[i]['buildProgress'],
            canBeDemolished: buildings[i]['canBeDemolished'],
            effects: buildings[i]['effects'],
        }
        buildingResponseList.push(building);
    }
    return buildingResponseList;
}


function blueprintResidenceBuilding(building) {
    let blueprintList = [];
    for (let i = 0; i < building.length; i++) {
        let blueprint = {
            buildingName: building[i]['buildingName'],
            cost: building[i]['cost'],
            co2Cost: building[i]['co2Cost'],
            maxPop: building[i]['maxPop'],
            incomePerPop: building[i]['incomePerPop'],
            baseEnergyNeed: building[i]['baseEnergyNeed'],
            emissivity: building[i]['emissivity'],
            buildSpeed: building[i]['buildSpeed'],
            decayRate: building[i]['decayRate'],
            releaseTick: building[i]['releaseTick'],
            type: building[i]['type'],
            maintenanceCost: building[i]['maintenanceCost'],
            maxHappiness: building[i]['maxHappiness']
        }
        blueprintList.push(blueprint);
    }
    return blueprintList;
}

function blueprintUtilityBuilding(building) {
    let blueprintList = [];
    for (let i = 0; i < building.length; i++) {
        let blueprint = {
            buildingName: building[i]['buildingName'],
            cost: building[i]['cost'],
            co2Cost: building[i]['co2Cost'],
            baseEnergyNeed: building[i]['baseEnergyNeed'],
            buildSpeed: building[i]['buildSpeed'],
            releaseTick: building[i]['releaseTick'],
            type: building[i]['type'],
            effects: building[i]['effects'],
            queueIncrease: building[i]['queueIncrease'],
        }
        blueprintList.push(blueprint);
    }
    return blueprintList;
}

function parseEffects(effects) {
    let effectList = []
    for (let i = 0; i < effects.length; i++) {
        let effect = {
            'radius': effects[i]['radius'],
            'happinessPerTick': effects[i]['happinessPerTick'],
            'maxHappiness': effects[i]['maxHappiness'],
            'Co2InfluencePerPop': effects[i]['co2InfluencePerPop'],
            'kwhBonus': effects[i]['kwhBonus'],
        }
        effectList.push(effect)
    }
    return effectList;
}

function energyLevels(energyLevels) {
    let energyLevelList = [];
    for (let i = 0; i < energyLevels.length; i++) {
        let energyLevel = {
            energyThreshold: energyLevels[i]['energyThreshold'],
            costPerMwh: energyLevels[i]['costPerMwh'],
            tonCo2PerMwh: energyLevels[i]['tonCo2PerMwh']
        }
        energyLevelList.push(energyLevel);
    }
    return energyLevelList;
}


function foundationJson(x, y, buildingName) {
    return {'Position': {'X': x, 'Y': y}, 'BuildingName': buildingName}
}

function demolishJson(x, y) {
    return position(x, y)
}

function buildJson(x, y) {
    return position(x, y)
}

function maintainJson(x, y) {
    return position(x, y)
}

function upgradeJson(x, y, upgrade) {
    return {'Position': {'X': x, 'Y': y}, 'UpgradeAction': upgrade};
}

function adjustEnergyJson(position, value) {

    return {'Position': {'x': position[0], 'y': position[1]}, 'Value': value};
}

function position(x, y) {
    return {'Position': {'X': x, 'Y': y}}
}

function toScore(scoreResponse) {
    return {
        'gameId': scoreResponse['gameId'],
        'totalCo2': scoreResponse['totalCo2'],
        'totalHappiness': scoreResponse['totalHappiness'],
        'finalPopulation': scoreResponse['finalPopulation'],
        'finalScore': scoreResponse['finalScore']
    };
}

function toGameList(gameList) {
    let parsedGames = [];
    for (let i = 0; i < gameList.length; i++) {
        parsedGames.push({
            'gameId': gameList[i]['gameId'],
            'active': gameList[i]['active'],
            'started': gameList[i]['started'],
            'startedAt': gameList[i]['startedAt'],
        });
    }
    return parsedGames;
}


module.exports = {
    upgradeJson,
    adjustEnergyJson,
    maintainJson,
    buildJson,
    toGameInfo,
    toGameState,
    foundationJson,
    demolishJson,
    toScore,
    toGameList

}