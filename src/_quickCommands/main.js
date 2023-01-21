module.exports = async (client) => {
    const data = {
        name: "Champion Checker",
    };
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        //////////////////////      CODE      ////////////////////////////
        const everyAbilites = fetchEveryAbilities(); //array
        const currentChampion = firstWordOf(message);
        const currentAbility = restOf(message, currentChampion);

        const everyChampion = await fetchEveryChampion(
            currentChampion,
            currentAbility,
            everyAbilites
        ); //array
        // console.log(
        //     currentChampion,
        //     everyChampion,
        //     currentAbility,
        //     everyAbilites
        // );
        // if (
        //     await isCommand(
        //         currentChampion,
        //         everyChampion,
        //         currentAbility,
        //         everyAbilites
        //     )
        // ) {
        //     const jsonScrape = scrapeWebsite(currentChampion, currentAbility);
        //     const sortedScrape = sortJsonScrape(jsonScrape);
        //     const finalAnswer = beautifyJson(jsonScrape);
        //     message.reply(finalAnswer);
        // }
    });

    async function fetchEveryChampion(
        currentChampion,
        currentAbility,
        everyAbilites
    ) {
        //TODO////////////////////////////////////////////////////////////
        const https = require("https");
        const cheerio = require("cheerio");

        function fetchChampions() {
            var champions = [];
            https.get(
                "https://www.leagueoflegends.com/en-us/champions/",
                (res) => {
                    const data = [];

                    res.on("data", (_) => data.push(_));
                    res.on("end", () => {
                        const $ = cheerio.load(data.join());
                        const championSpans = $(
                            "span.style__Text-n3ovyt-3.gMLOLF"
                        );
                        championSpans.each(function (i, elem) {
                            champions.push($(this).text());
                        });
                        //         console.log(currentChampion, currentAbility, everyAbilites);
                        //  console.log(champions);
                        //         console.log(currentChampion, currentAbility, everyAbilites);
                    });
                }
            );
        }

        fetchChampions();
        return ["ahri"];

        //TODO////////////////////////////////////////////////////////////
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

    async function isCommand(
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


//get all champions
const https = require("https");
const cheerio = require("cheerio");

var champions = [];
https.get(
    "https://www.leagueoflegends.com/en-us/champions/",
    (res) => {
        const data = [];

        res.on("data", (_) => data.push(_));
        res.on("end", () => {
            const $ = cheerio.load(data.join());
            const championSpans = $(
                "span.style__Text-n3ovyt-3.gMLOLF"
            );
            championSpans.each(function (i, elem) {
                champions.push($(this).text());
            });
            //         console.log(currentChampion, currentAbility, everyAbilites);
             console.log(champions);
            //         console.log(currentChampion, currentAbility, everyAbilites);
        });
    }
);
