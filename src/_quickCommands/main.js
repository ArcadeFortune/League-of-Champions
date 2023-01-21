module.exports = (client) => {
    const data = {
        name: "Champion Checker",
    };
    client.on("messageCreate", (message) => {
        if (message.author.bot) return;

        //////////////////////      CODE      ////////////////////////////
        const everyChampion = fetchEveryChampion(); //array
        const everyAbilites = fetchEveryAbilities(); //array
        const currentChampion = firstWordOf(message); //string
        const currentAbility = restOf(message, currentChampion); //string

        if (isCommand(currentChampion,everyChampion,currentAbility,everyAbilites)) {
            const jsonScrape = scrapeWebsite(currentChampion, currentAbility);
            const sortedScrape = sortJsonScrape(jsonScrape);
            const finalAnswer = beautifyJson(jsonScrape);
            message.reply(finalAnswer);
        }
    });


    function fetchEveryChampion() {
        return everyChampionFetched;
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
            (everyChampion.includes(firstWordOfMessage.toLowerCase()) && !restOfMessage) ||
            (everyChampion.includes(firstWordOfMessage.toLowerCase()) &&
                everyAbilites.includes(restOfMessage.toLowerCase()))
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

//get every champion each time the bot restarts.
const https = require("https");
const cheerio = require("cheerio");
var everyChampionFetched = [];

https.get("https://www.leagueoflegends.com/en-us/champions/", (res) => {
    const data = [];

    res.on("data", (_) => data.push(_));
    res.on("end", () => {
        const $ = cheerio.load(data.join());
        const championSpans = $("span.style__Text-n3ovyt-3.gMLOLF");
        championSpans.each(function (i, elem) {
            everyChampionFetched.push($(this).text().toLowerCase());
        });
        // console.log(everyChampionFetched);
    });
});
