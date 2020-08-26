const api = require('./api');
const jsonParser = require('./jsonParser')
const errorMessage = "WARNING: State returned contains error messages:\n";
const message = "MESSAGE: State returned contains game messages:\n";


/**
 * creates a new game.
 * @param   apiKey
 * @param   options
 * @returns {gameInfo} gameInfo
 */
async function newGame(apiKey, options = "") {
    let jsonOptions = {"MapName": options};
    let gameInfoResponse = await api.newGame(apiKey, jsonOptions);
    return jsonParser.toGameInfo(gameInfoResponse);
}

/**
 * ends a game session, if no gameId added ends the oldest game.
 * @param apiKey
 * @param gameId
 * @returns {Promise<void>}
 */
async function endGame(apiKey, gameId = "") {
    await api.endGame(apiKey, gameId);
}

/**
 * Starts the game session, if no gameId added starts the newest game.
 * @param   apiKey
 * @param   gameId
 * @returns {gameState} gameState
 */
async function startGame(apiKey, gameId = "") {
    let gameStateResponse = await api.startGame(apiKey, gameId);
    return jsonParser.toGameState(gameStateResponse);
}

/**
 * Perfromes the place foundation action, if no gameId added the performs the action on the newest game.
 * @param   {string}  apiKey
 * @param   {string}  gameId
 * @param   {int}     xPos             The X coordinate for where to place the foundation.
 * @param   {int}     yPos             The Y coordinate for where to place the foundation.
 * @param   {string}     buildingName    The building id for the building to be built.
 * @returns {gameState} gameState
 */
async function doPlaceFoundation(apiKey, xPos, yPos, buildingName, gameId = "") {
    let gameStateResponse = await api.placeFoundation(apiKey, gameId, jsonParser.foundationJson(xPos, yPos, buildingName));
    return jsonParser.toGameState(gameStateResponse);
}

/**
 * Performs the build action, if no gameId added performs the action on the newest game.
 * @param   apiKey
 * @param   gameId
 * @param   {int}     xPos             The X coordinate for where to build.
 * @param   {int}     yPos             The Y coordinate for where to build.
 * @returns {gameState} gameState
 */
async function doBuild(apiKey, xPos, yPos, gameId = "") {
    let gameStateResponse = await api.build(apiKey, gameId, jsonParser.buildJson(xPos, yPos));
    return jsonParser.toGameState(gameStateResponse);
}

/**
 * Performs the demolish action, if no gameId added performs the action on the newest game.
 * @param   {string}                apiKey
 * @param   {string}                gameId
 * @param   {int}                   xPos           The X coordinate of the building to be demolished.
 * @param   {int}                   yPos           The Y coordinate of the building to be demolished.
 * @returns {gameState}    gameState
 */
async function doDemolish(apiKey, xPos, yPos, gameId = "") {
    let gameStateResponse = await api.demolish(apiKey, gameId, jsonParser.demolishJson(xPos, yPos));
    return jsonParser.toGameState(gameStateResponse);
}

/**
 * Performs the maintain action, if no gameId added  performs the action on the newest game.
 * @param {string}  apiKey
 * @param {string}  gameId
 * @param {int}     xPos           The X coordinate of the building to be maintained.
 * @param {int}     yPos           The Y coordinate of the building to be maintained.
 * @returns {gameState} gameState
 */
async function doMaintain(apiKey, xPos, yPos, gameId = "") {
    let gameStateResponse = await api.maintenance(apiKey, gameId, jsonParser.maintainJson(xPos, yPos));
    return jsonParser.toGameState(gameStateResponse);
}

/**
 * performs the adjust energy action, if no gameId added performs the action on the newest game.
 * @param {string}      apiKey
 * @param {string}      gameId
 * @param   {int}     xPos             The X coordinate for where to adjust energy.
 * @param   {int}     yPos             The Y coordinate for where to adjust energy.
 * @param {number}       value      The new requested energy in.
 * @returns {gameState} gameState
 */
async function doAdjustEnergyLevels(apiKey, xPos, yPos, value, gameId = "") {
    let gameStateResponse = await api.adjustEnergy(apiKey, gameId, jsonParser.adjustEnergyJson([xPos, yPos], value));
    return jsonParser.toGameState(gameStateResponse);
}

/**
 * Upgrades a building with a specific upgrade, if no gameId added performs the action on the newest game.
 * @param {string}  apiKey
 * @param {string}  gameId
 * @param {int}     xPos           The X coordinate for the building to add an upgrade to.
 * @param {int}     yPos           The Y coordinate for the building to add an upgrade to.
 * @param {string}  upgrade     The upgrade to be added to the building.
 * @returns {gameState} gameState
 */
async function doUpgrade(apiKey, xPos, yPos, upgrade, gameId = "") {
    let gameStateResponse = await api.upgrade(apiKey, gameId, jsonParser.upgradeJson(xPos, yPos, upgrade));
    return jsonParser.toGameState(gameStateResponse);
}

/**
 * Does the wait operation, if no gameId added performs the action on the newest game.
 * @param {string}  apiKey
 * @param {string}  gameId
 * @returns {gameState} gameState
 */
async function doWait(apiKey, gameId = "") {
    let gameStateResponse = await api.wait(apiKey, gameId);
    return jsonParser.toGameState(gameStateResponse);
}

/**
 * Returns the game info for a specific game.
 * @param {string}  apiKey
 * @param {string}  gameId
 * @returns {gameInfo} gameInfo
 */
async function getNewGameInfo(apiKey, gameId) {
    let gameInfoResponse = await api.getGameInfo(apiKey, gameId);
    return jsonParser.toGameInfo(gameInfoResponse);
}

/**
 * Returns a list of Games.
 * @param   {string}          apiKey
 * @returns {game[]} games
 */
async function getGames(apiKey) {
    let gamesResponse = await api.getGames(apiKey);
    return jsonParser.toGameList(gamesResponse);
}

/**
 * Returns the different scores acquired for a finished game.
 * @param {string}  apiKey
 * @param {string}  gameId
 * @returns {score} score Returns a score object.
 */
async function getScore(apiKey, gameId) {
    let scoreResponse = await api.getScore(apiKey, gameId);
    return jsonParser.toScore(scoreResponse);
}

/**
 * Returns the current state of a game, if no game id is given returns the state of the newest game.
 * @param {string}  apiKey
 * @param {string}  gameId
 * @returns {gameState} gameState
 */
async function getNewGameState(apiKey, gameId) {
    let gameStateResponse = await api.getGameState(apiKey, gameId);
    return jsonParser.toGameState(gameStateResponse);
}

/**
 *
 * @param {gameInfo} gameInfo
 * @param {string} buildingName
 * @returns {blueprintResidence || blueprintUtility || null} blueprint
 */
function getBlueprint(gameInfo, buildingName) {
    let blueprint = null;
    gameInfo.availableResidenceBuildings.forEach(element => {
        if (element.buildingName === buildingName)
            blueprint = element;
    });
    gameInfo.availableUtilityBuildings.forEach(element => {
        if (element.buildingName === buildingName)
            blueprint = element;
    });
    return blueprint;
}

/**
 *
 * @param {gameInfo} gameInfo
 * @param {string} buildingName
 * @returns {blueprintResidence || null} blueprint
 */
function getBlueprintResidence(gameInfo, buildingName) {
    let blueprint = null;
    gameInfo.availableResidenceBuildings.forEach(element => {
        if (element.buildingName === buildingName)
            blueprint = element;
    });
    return blueprint;
}

/**
 *
 * @param {gameInfo} gameInfo
 * @param {string} buildingName
 * @returns {blueprintUtility || null} blueprint
 */
function getBlueprintUtility(gameInfo, buildingName) {
    let blueprint = null;
    gameInfo.availableUtilityBuildings.forEach(element => {
        if (element.buildingName === buildingName)
            blueprint = element;
    });
    return blueprint;
}

/**
 *
 * @param {gameInfo} gameInfo
 * @param {string} effectName
 * @returns {effect || null}
 */
function getEffect(gameInfo, effectName) {
    gameInfo.effects.forEach(element => {
        if (element.name === effectName)
            return element;
    })

    return null;
}

/**
 * @typedef {Object<string,string,int,number,number,energyLevel[],int[][],blueprintResidence[],blueprintUtility[],upgrade[], effect[]>} gameInfo
 * @property {string} gameId
 * @property {string} mapName
 * @property {int} maxTurns
 * @property {number} maxTemp
 * @property {number} minTemp
 * @property {energyLevel[]} energyLevels
 * @property {int[][]} map
 * @property {blueprintResidence[]} availableResidenceBuildings
 * @property {blueprintUtility[]}   availableUtilityBuildings
 * @property {upgrade[]} availableUpgrades
 * @property {effect[]} effects
 */

/**
 * @typedef {Object<int,number,number,number,int,number,number,residence[],utility[],string[],string[]>} gameState
 * @property {int}     turn
 * @property {number}  funds
 * @property {number}  currentTemp
 * @property {number}  queueHappiness
 * @property {int}  housingQueue
 * @property {number}  totalCo2
 * @property {number}  totalHappiness
 * @property {residence[]}    residenceBuildings
 * @property {utility[]}    utilityBuildings
 * @property {string[]}    messages
 * @property {string[]}    errors
 */

/**
 * @typedef {Object<int,number,number>} energyLevel
 * @property {int} energyThreshold
 * @property {number} costPerMwh
 * @property {number} tonCo2PerMwh
 */


/**
 * @typedef {Object<string,int,int,number,int,string,int,int,number,number,int,number,number>} blueprintResidence
 * @property {string} buildingName
 * @property {int} cost
 * @property {int} co2Cost
 * @property {number} baseEnergyNeed
 * @property {int} buildSpeed
 * @property {string} type
 * @property {int} releaseTick
 * @property {int} maxPop
 * @property {number} incomePerPop
 * @property {number} emissivity
 * @property {int} maintenanceCost
 * @property {number} decayRate
 * @property {number} maxHappiness
 */

/**
 * @typedef {Object <string,int,int,number,int,string,int,effect[],number>} blueprintUtility
 * @property {string} buildingName
 * @property {int} cost
 * @property {int} co2Cost
 * @property {number} baseEnergyNeed
 * @property {int} buildSpeed
 * @property {string} type
 * @property {int} releaseTick
 * @property {effect[]} effects
 * @property {number} queueIncrease
 */

/**
 * @typedef {Object <int,int,int,int,int,int>} effect
 * @property {string} name
 * @property {int} radius
 * @property {number} emissivityMultiplier
 * @property {number} decayMultiplier
 * @property {number} buildingIncomeIncrease
 * @property {number} maxHappinessIncrease
 * @property {number} mwhProduction
 * @property {number} baseEnergyMwhIncrease
 * @property {number} baseEnergyMwhIncrease
 * @property {number} decayIncrease
 */

/**
 * @typedef {Object<string,int,int,int,int,int,int,int,int,int,boolean,boolean,boolean,boolean,boolean>} residence
 * @property {string} buildingName
 * @property {int} x
 * @property {int} y
 * @property {number} effectiveEnergyIn
 * @property {int} buildProgress
 * @property {boolean} canBeDemolished
 * @property {string[]} effects
 * @property {int} currentPop
 * @property {int} temperature
 * @property {int} requestedEnergyIn
 * @property {number} happinessPerTickPerPop
 * @property {int} health
 */

/**
 * @typedef {Object<string,int,int,int,int,int,int,int,int,int,boolean,boolean,boolean,boolean,boolean>} utility
 * @property {string} buildingName
 * @property {int} x
 * @property {int} y
 * @property {number} effectiveEnergyIn
 * @property {int} buildProgress
 * @property {boolean} canBeDemolished
 * @property {string[]} effects
 */

/**
 * @typedef {Object <int,int,int,int,int,int,int>} upgrade
 * @property {string} name
 * @property {string} effect
 * @property {int} cost
 */

/**
 * @typedef {Object<string,int,int,int,int>} score
 * @property {string}   gameId,
 * @property {int}      co2Score
 * @property {int}      happinessScore
 * @property {int}      populationScore
 * @property {int}      finalScore
 */

/**
 * @typedef  {Object<string,boolean,boolean>} game
 * @property {string} gameId
 * @property {boolean} active
 * @property {boolean} started
 * @property {Date} startedAt
 */


module.exports = {
    startGame,
    newGame,
    endGame,
    doMaintain,
    doBuild,
    doAdjustEnergyLevels,
    doDemolish,
    doPlaceFoundation,
    doUpgrade,
    doWait,
    getScore,
    getNewGameInfo,
    getGames,
    getNewGameState,
    getBlueprint,
    getBlueprintResidence,
    getBlueprintUtility,
    getEffect,
}