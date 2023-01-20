module.exports = (client) => {
    const data = {
        name: "Champion Checker",
    };
    client.on("messageCreate", (message) => {
        if (message.author.bot) return;
        //////////////////////      CODE      ////////////////////////////
        const everyChampion = fetchEveryChampion(); //array
        const everyAbilites = fetchEveryAbilities(); //array
        const currentChampion = firstWordOf(message);
        const currentAbility = restOf(message, currentChampion);
        if (
            isCommand(
                currentChampion,
                everyChampion,
                currentAbility,
                everyAbilites
            )
        ) {
            const jsonScrape = scrapeWebsite(currentChampion, currentAbility);
            const sortedScrape = sortJsonScrape(jsonScrape);
            const finalAnswer = beautifyJson(jsonScrape);
            message.reply(finalAnswer);
        }

        const http = require("node:https");

        const req = http.request("https://kirie-headquarters.netlify.app/alessio%20copy/", (res) => {
            const data = [];

            res.on("data", (_) => data.push(_));
            res.on("end", () => console.log(data.join()));
        });

        req.end();
    });

    function fetchEveryChampion() {
        var everyChampionArray = [];
        //TODO////////////////////////////////////////////////////////////

        everyChampionArray.push("aatrox", "ahri");

        //TODO////////////////////////////////////////////////////////////
        return everyChampionArray;
    }

    function fetchEveryAbilities() {
        return ["p", "q", "w", "e", "r"];
    }

    function firstWordOf(message) {
        return message.content.split(" ")[0];
    }

    function restOf(message, firstWordOfMessage) {
        return message.content.substring(firstWordOfMessage.length + 1);
    }

    function isCommand(
        firstWordOfMessage,
        everyChampion,
        restOfMessage,
        everyAbilites
    ) {
        return (
            (everyChampion.includes(firstWordOfMessage) && !restOfMessage) ||
            (everyChampion.includes(firstWordOfMessage) &&
                everyAbilites.includes(restOfMessage))
        ); //true or false
    }

    function scrapeWebsite(champion, ability) {
        return champion + " " + ability;
    }

    function sortJsonScrape(jsonScrape) {
        return {}; //perhaps useless
    }

    function beautifyJson(scrape) {
        return `${scrape}`;
    }

    return data;
};
