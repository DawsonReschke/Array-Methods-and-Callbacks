const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const worldCup14 = fifaData.filter(val => val['Year'] == 2014 && val['Stage'] == 'Final')[0]
// console.log(worldCup14)
//(a) Home Team name for 2014 world cup final
// console.log(worldCup14['Home Team Name'])
//(b) Away Team name for 2014 world cup final
// console.log(worldCup14['Away Team Name'])
//(c) Home Team goals for 2014 world cup final
// console.log(worldCup14['Home Team Goals'])
//(d) Away Team goals for 2014 world cup final
// console.log(worldCup14['Away Team Goals'])
//(e) Winner of 2014 world cup final */
// console.log(worldCup14['Win conditions'].split(' ')[0])

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   return data.filter(val => val['Stage'] == 'Final')
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array,callback) {
    return callback(array).map(val => val['Year'])
}
// console.log(getYears(fifaData,getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array,callback) {
    const winners = callback(array).map(val => {
        if (val['Win conditions'] != '') return val['Win conditions'].split(' ')[0]
        if(val['Home Team Goals'] > val['Away Team Goals']) return val['Home Team Name']
        return val['Away Team Name']
    })
    return winners
}
// console.log(getWinners(fifaData,getFinals))



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getFinals, getYears,getWinners) {
    let tempArray = []
    let winners = getWinners(array,getFinals); 
    let years = getYears(array,getFinals); 
    for(let i = 0 ; i<winners.length; i++){
        tempArray.push(`In ${years[i]}, ${winners[i]} won the world cup!`)
    }
    return tempArray
}
console.log(getWinnersByYear(fifaData,getFinals,getYears,getWinners))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(data) {
    let homeAvgGoals = data.reduce((acc,item)=>acc+item['Home Team Goals'],0)
    let awayAvgGoals = data.reduce((acc,item)=>acc+item['Away Team Goals'],0)
    return ((homeAvgGoals + awayAvgGoals) / data.length).toFixed(2)
}
// console.log(getAverageGoals(getFinals(fifaData)))




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
    return data.reduce((acc,item)=>{
        // check if the team played,
        if(item['Home Team Initials'] != initials && item['Away Team Initials'] != initials) return acc
        // if the winning team is also the team with initials then add one win
        if(item[`${getWinner(item)} Team Initials`] == initials) return acc + 1
        // if all else fails the team lost so dont add one
        return acc
    },0)
}

function getWinner(gameData){
    // returns `Home` || `Away`
    if(gameData['Home Team Goals'] == gameData['Away Team Goals']){
        if(gameData['Home Team Name'] == gameData['Win conditions'].split(' ')[0]){
            return "Home"
        }else{
            return "Away"
        }
    }
    return gameData['Home Team Goals'] > gameData['Away Team Goals'] ? "Home" : "Away"
}
// console.log(getCountryWins(fifaData,'ARG'))
/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function createGoalFunction(isBest){ // strange function to prevent duplicate code
    if(isBest == true){
        return (homeTeam,awayTeam,isHomeTeam)=>{
            if(isHomeTeam==false) return homeTeam
            return awayTeam
        }
    }else{
        return (homeTeam,awayTeam,isHomeTeam)=>{
            if(isHomeTeam==false) return awayTeam
            return homeTeam
        }
    }
}

function getExtremaData(data,isBest){
    const teams_data = {} // format should be like this "teamName": {totalGoals,totalGames}
    const addingHomeTeam = createGoalFunction(isBest); // this is a really weird method that I am using to avoid writing dup code, there is probably a better way, too lazy to think
    data.forEach((item) =>{
        const homeTeam = item['Home Team Initials']
        const homeTeamGoals = item['Home Team Goals']
        const awayTeam = item['Away Team Initials']
        const awayTeamGoals = item['Away Team Goals']
        // first check if the team has been entered into the map, then do the correct op 
        // depending on if we are looking for the best or worst team the output of the below code will be different, specifically if looking for best(totalGoals should equal the sum of all of the goals scored by a team) when looking for worst(totalGoals is equal to the sum of all goals scored against said team)
        teams_data[homeTeam] ? teams_data[homeTeam] = {totalGoals:teams_data[homeTeam].totalGoals + addingHomeTeam(homeTeamGoals,awayTeamGoals,true),totalAps:teams_data[homeTeam].totalAps + 1} : teams_data[homeTeam] = {totalGoals:addingHomeTeam(homeTeamGoals,awayTeamGoals,true), totalAps:1}
        teams_data[awayTeam] ? teams_data[awayTeam] = {totalGoals:teams_data[awayTeam].totalGoals + addingHomeTeam(homeTeamGoals,awayTeamGoals,false),totalAps:teams_data[awayTeam].totalAps + 1} : teams_data[awayTeam] ={totalGoals:addingHomeTeam(homeTeamGoals,awayTeamGoals,false), totalAps:1}
    })
    let bestTeam = 'null'
    let bestTeamAvgScore = 0
    for(let i in teams_data){
        let avgScore = teams_data[i].totalGoals/teams_data[i].totalAps
        if(avgScore > bestTeamAvgScore) {
            bestTeam = i;
            bestTeamAvgScore = avgScore;
        }
    }
    return {bestTeam,bestTeamAvgScore: bestTeamAvgScore}
}

function getGoals(data) {
    let {bestTeam,bestTeamAvgScore} = getExtremaData(data,true); 
    return `The best team was ${bestTeam} with an average goals scored of ${bestTeamAvgScore}`
}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
     let {bestTeam,bestTeamAvgScore} = getExtremaData(data,false)
    return `The worst team was ${bestTeam} with an average goals scored against them of ${bestTeamAvgScore}`
}

console.log(badDefense(fifaData))
console.log(getGoals(fifaData))

function getBIHData(data){
    let goalsHome = data.reduce((acc,item)=>{
        if(item['Away Team Initials'] == 'BIH'){
            return acc + item['Home Team Goals']
        }else{
            return acc
        }
    },0)
    let goalsAway = data.reduce((acc,item)=>{
        if(item['Home Team Initials'] == 'BIH'){
            return acc + item['Away Team Goals']
        }else{
            return acc
        }
    },0)
    return goalsAway + goalsHome
}
// console.log(getBIHData(fifaData))

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
// the only stretch that would not put me to sleep:
function convertToHtml(data){ // function converts country to <h1> tags 
const countries = {}
data.forEach((val)=>{
    let homeName = val['Home Team Name']
    let awayName = val['Away Team Name']
    if(!countries[homeName]) countries[homeName] = 0
    if(!countries[awayName]) countries[awayName] = 0
})
let Html = []
    for(let i in countries){
        Html.push(`<h1> ${i} </h1>`)
    }
    return Html
}
/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
