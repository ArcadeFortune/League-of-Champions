module.exports = (client) => {
    const data = {
        name: "Champion Checker",
    };
    client.on("messageCreate", (message) => {
        //////////////////////      CODE      ////////////////////////////
        const everyChampion = fetchEveryChampion(); //fetch every champion
        const firstWord = firstWordOf(message); //is first word of message
        if (isCommand(firstWord, everyChampion)) { //if message is command
            const jsonScrape = scrapeWebsite(firstWord); //scrape lol site
            const sortedScrape = sortJsonScrape(jsonScrape); //sort scrape
            const finalAnswer = beautifyJson(sortedScrape); //makes answer
            message.reply(finalAnswer); //reply with the final json answer
        }
    });










    function fetchEveryChampion() {
        var everyChampionArray = [];
        //TODO////////////////////////////////////////////////////////////

        everyChampionArray.push("aatrox", "ahri");
        
        //TODO////////////////////////////////////////////////////////////
        return everyChampionArray;
    }

    function firstWordOf(message) {
        return message.content.split(" ")[0]
    }

    function isCommand(firstWordOfMessage, everyChampion) {
        return everyChampion.includes(firstWordOfMessage) //true or false
    }

    function scrapeWebsite(champion) {
        return {}
    }

    function sortJsonScrape(jsonScrape) {
        return {} //perhaps useless
    }

    function beautifyJson(scrape) {
        return `pong`
    }

    
    return data;
};
