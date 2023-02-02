module.exports = (client) => {
    const data = {
        name: "Champion Checker",
    };
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;

        //////////////////////      CODE      ////////////////////////////
        const everyChampion = fetchEveryChampion(); //array
        const everyAbilites = fetchEveryAbilities(); //array
        const currentChampion = firstWordOf(message, everyChampion); //string
        const currentAbility = restOf(message, currentChampion); //string

        if (
            isCommand(
                currentChampion,
                everyChampion,
                currentAbility,
                everyAbilites
            )
        ) {
            //the main scrape
            const jsonScrape = await scrapeWebsite(
                currentChampion,
                currentAbility
            );
            const finalAnswer = beautifyJson(jsonScrape);
            message.reply(finalAnswer);
            console.log(message.author.username, "searched up", currentChampion, currentAbility);
        }
    });

    function fetchEveryChampion() {
        return everyChampionFetched;
    }

    function fetchEveryAbilities() {
        return ["p", "q", "w", "e", "r"];
    }

    function firstWordOf(message, everyChampion) {
        var everyChampionDoubleName = [] //list of all champions with more than one name
        for (var champName of everyChampion) {
            if (champName.includes(" ")) {
                everyChampionDoubleName.push(champName)
            }
        }
        console.log(everyChampionDoubleName)
        console.log(message.content)
        // console.log(everyChampion)
        // console.log(everyChampion.find(function(str) {return str == "pyk"}))
        // for (var indx in everyChampion) {
        //     if (everyChampion[indx].match(/aa/)) console.log(indx)
        // }
        return message.content.split(" ")[0].toLowerCase();
    }

    function restOf(message, firstWordOfMessage) {
        return message.content.substring(firstWordOfMessage.length + 1).toLowerCase();
    }

    function isCommand(
        firstWordOfMessage,
        everyChampion,
        restOfMessage,
        everyAbilites
    ) {
        return (
            (everyChampion.includes(firstWordOfMessage.toLowerCase()) &&
                !restOfMessage) ||
            (everyChampion.includes(firstWordOfMessage.toLowerCase()) &&
                everyAbilites.includes(restOfMessage.toLowerCase()))
        ); //true or false
    }

    async function scrapeWebsite(champion, ability) {
        const url = `https://leagueoflegends.fandom.com/wiki/${champion}/LoL`;
        const search = `#mw-content-text > div.mw-parser-output > div.skill.skill_${ability} > div > div > div.champion-ability__header > aside > section`;

        let res = await axios.get(url);
        let $ = cheerio.load(res.data);
        const fetched = $(search).text();
        return fetched.replace(/\s{2,}/g, "\n");
    }

    function beautifyJson(scrape) {
        return `${scrape}`;
    }

    return data;
};

const cheerio = require("cheerio");
const axios = require("axios");
const https = require("https");
const { measureMemory } = require("vm");
const CronJob = require("cron").CronJob;
const fetch = new CronJob("1 0 1 * *", fetchAllChampions);
//get every champion each time the bot restarts. And every month
fetch.start();

var everyChampionFetched = [];

fetchAllChampions();
function fetchAllChampions() {
    https.get("https://www.leagueoflegends.com/en-us/champions/", (res) => {
        const data = [];

        res.on("data", (_) => data.push(_));
        res.on("end", () => {
            const $ = cheerio.load(data.join());
            const championSpans = $("span.style__Text-n3ovyt-3.gMLOLF");
            everyChampionFetched = []; //reset the list
            championSpans.each(function () {
                everyChampionFetched.push($(this).text().toLowerCase());
            });
        });
    });
}
