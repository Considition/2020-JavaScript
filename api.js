const axios = require("axios");
const https = require("https");
const BASE_PATH = "https://game.considition.com/api/game";

let instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: true,
        keepAlive: true
    })
});


async function newGame(apiKey, mapName) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.post(`${BASE_PATH}/new`, mapName, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not create a new game");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}


async function startGame(apiKey, gameId) {

    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.get(`${BASE_PATH}/start?GameId=${gameId}`, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not start a new game");

        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}

async function endGame(apiKey, gameId) {

    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.get(`${BASE_PATH}/end?GameId=${gameId}`, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not end the game");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}

async function placeFoundation(apiKey, gameId, foundation) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.post(`${BASE_PATH}/action/startBuild?GameId=${gameId}`, foundation, config);
        return response.data;

    } catch (err) {
        console.log("Fatal Error: could not place a foundation");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}

async function build(apiKey, gameId, position) {

    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.post(`${BASE_PATH}/action/build?GameId=${gameId}`, position, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not end the game");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}

async function demolish(apiKey, gameId, position) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.post(`${BASE_PATH}/action/demolish?GameId=${gameId}`, position, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not demolish building");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}

async function adjustEnergy(apiKey, gameId, energyLevels) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };
    try {
        let response = await instance.post(`${BASE_PATH}/action/adjustEnergy?GameId=${gameId}`, energyLevels, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not adjust energy in buildings");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}

async function maintenance(apiKey, gameId, position) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.post(`${BASE_PATH}/action/maintenance?GameId=${gameId}`, position, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not perform maintenance on building");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}


async function wait(apiKey, gameId) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.post(`${BASE_PATH}/action/wait?GameId=${gameId}`, {}, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not wait");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}


async function upgrade(apiKey, gameId, upgrade) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.post(`${BASE_PATH}/action/buyUpgrade?GameId=${gameId}`, upgrade, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not upgrade building");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}


async function getScore(apiKey, gameId) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.get(`${BASE_PATH}/score?GameId=${gameId}`, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not get score");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}


async function getGameInfo(apiKey, gameId) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.get(`${BASE_PATH}/getGameInfo?GameId=${gameId}`, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not get game info");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}

async function getGameState(apiKey, gameId) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };
    try {
        let response = await instance.get(`${BASE_PATH}/gameState?GameId=${gameId}`, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not get game state");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }

}

async function getGames(apiKey) {
    let config = {
        headers: {
            "x-api-key": apiKey
        }
    };

    try {
        let response = await instance.get(`${BASE_PATH}/games`, config);
        return response.data;
    } catch (err) {
        console.log("Fatal Error: could not get game list");
        if (err.response) {
            console.log("Error: " + err.response.message + ": " + err.response.data);
        } else {
            console.log("Error: " + err.message);
        }
        return null;
    }
}


module.exports = {
    newGame,
    endGame,
    startGame,
    placeFoundation,
    build,
    wait,
    demolish,
    maintenance,
    adjustEnergy,
    upgrade,
    getScore,
    getGameInfo,
    getGames,
    getGameState
}
