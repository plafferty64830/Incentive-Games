// We import the object from the data file. Inside that object there is a function to get players data
const data = require("./data");

//NB: test number is appended to the end of the players defination so tests can be treated seperately without "identifier has already been declared"

/**
 * Test 1
 * Write a function to log in the console the players data with this format:
 * PLAYER 1
 * NAME: Zinedine
 * LASTNAME: Zidane
 * POSITION: Midfielder
 * PLAYER 2...
 */

// Your code

//define player list
const players1 = data.getPlayers()

//loop through player data and output the player data in the requested format
players1.forEach((player, playerNumber) => {
    //construct result in the correct format
    const result =
        "PLAYER " + (playerNumber + 1) + "\n" +
        "NAME: " + player.name + "\n" +
        "LASTNAME: " + player.lastname + "\n" +
        "POSITION: " + player.position[0].toUpperCase() + player.position.substring(1, player.position.length) + "\n\n";

    //console log the result
    console.log(result)

});



/**
 * Test 2
 * Write a function to log in the console an array with only the names of the players, ordered by name length descending
 */

// Your code

//define player list
const players2 = data.getPlayers()

var unsortedArray = [];

//loop through player data and add the name data to the unsortedArray
players2.forEach((player) => {
    unsortedArray.push(player.name)
});

//sort the array by name length ascending using the built in JavaScript sorting algorithm
const sortedResult = unsortedArray.sort((a, b) => a.length - b.length);

console.log(sortedResult)




/**
 * Test 3
 * Write a function to log in the console the average number of goals there will be in a match if all the players in the data play on it
 * scoringChance means how many goals per 100 matches the player will score
 * Example: 10 players play in a match, each of them has a 0.11 scoringChance, the total number of goals will be 1.1 average 
 * Output example -> Goals per match: 2.19
 */

// Your code

//define player list
const players3 = data.getPlayers();

var avgTeamGoals = 0;

//loop through player data and add the name data to the unsortedArray
players3.forEach((player) => {
    //get the scoring change in a single match
    const goalChPerMatch = player.scoringChance / 100;

    avgTeamGoals = avgTeamGoals + goalChPerMatch;

});

console.log("Goals per match: " + avgTeamGoals.toFixed(2));




/**
 * Test 4
 * Write a function that accepts a name, and logs the position of the player with that name (by position it means striker, goalkeeper...)
 */

// Your code

//define player list
const players4 = data.getPlayers();

const findPosition = (playerName) => {

    //ensure the first letter of the player name is capitalised as the player will not be found if the string is not a perfect match
    const nameFormatted = playerName[0].toUpperCase() + playerName.substring(1, playerName.length)

    //attempt to find a player with the firstname supplied
    const playerWithNm = players4.find(element => element.name === nameFormatted);

    //if player with name does not exist, inform the end user
    if (playerWithNm === undefined) {
        console.log("Player with first name " + playerName + " cannot be found. Please try again.")
        //otherwise, log out the postion by capitalising the first letter
    } else {
        const posOut = playerWithNm.position[0].toUpperCase() + playerWithNm.position.substring(1, playerWithNm.position.length)
        console.log(posOut)
    }

}

//run function with a valid player name
findPosition("timo");

//run functon with an invalid player name
findPosition("Patrick");





/**
 * Test 5
 * Write a function that splits all the players randomly into 2 teams, Team A and Team B. Both teams should have same number of players.
 * The function should log the match score, using the average number of goals like the Test 3 and rounding to the closest integer
 * Example:
 *      Team A has 4 players, 2 with 50 scoringChance and 2 with 70 scoringChance.
 *      The average score for the team would be 2.4 (50+50+70+70 / 100), and the closest integer is 2, so the Team A score is 2
 */

// Your code

//define player list
const players5 = data.getPlayers();

//helper functions
//capitise first letter of string
const capsFirst = (inputStr) => {
    return inputStr[0].toUpperCase() + inputStr.substring(1, inputStr.length)
}


//function to get match score
const getMatchScore = (team) => {
    var avgTeamGoals = 0;
    team.forEach((player) => {
        //get the scoring change in a single match
        const goalChPerMatch = player.scoringChance / 100;

        avgTeamGoals = avgTeamGoals + goalChPerMatch;

    });

    return Math.round(avgTeamGoals);
}

const processTeamPlayers = (playerA, playerB) => {
    const output =
        "NAME: " + capsFirst(playerA.name) + "\t\t\t" + "NAME: " + capsFirst(playerB.name) + "\n" +
        "LASTNAME: " + playerA.lastname + "\t\t" + "LASTNAME: " + capsFirst(playerB.lastname) + "\n" +
        "POSITION: " + capsFirst(playerA.position) + "\t\t" + "POSITION: " + capsFirst(playerB.position) + "\n\n";

    return output
}


const splitTeamGetScore = () => {
    //shuffle the players
    players5.sort(() => {
        const randomTrueOrFalse = Math.random() > 0.5;
        return randomTrueOrFalse ? 1 : -1
    });

    //split the team into 2
    const middleIndex = Math.ceil(players5.length / 2);
    const teamA = players5.splice(0, middleIndex);
    const teamB = players5.splice(-middleIndex);

    //get score for each team
    const teamAScore = getMatchScore(teamA);
    const teamBScore = getMatchScore(teamB);

    //log out the data requested
    console.log("TEAM A\tvs\tTEAM B\n")
    for (var i = 0; i < 5; i++) {
        const playersOut = processTeamPlayers(teamA[i], teamB[i])
        console.log(playersOut)
    }

    console.log("\nScore:\nTEAM A   " + teamAScore + "  -  " + teamBScore + "   TEAM B")
}

splitTeamGetScore()






