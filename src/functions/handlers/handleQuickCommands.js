const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ConnectionService } = require("discord.js");
const fs = require("fs");
const { default: run } = require("../../_quickCommands/main");

module.exports = (client) => {
    client.handleQuickCommands = async () => {
        const quickCommandFolder = fs
            .readdirSync(`./src/_quickCommands`)
            .filter((file) => file.endsWith(".js"));
        for (const file of quickCommandFolder) {          
            console.log(`Registered command: ${require(`../../_quickCommands/${file}`)(client).name}!`);
        }
    };
    // const commandFolder = fs.readdirSync(`./src/_quickCommands`);
    // for (const file of commandFolder) {
    //     const commandFiles = fs
    //         .readdirSync(`./src/_quickCommands/${file}`)
    //         .filter((file) => file.endsWith(".js"));

    //     for (const file of commandFiles) {
    //         require(`../../_quickCommands/${file}`)(client);
    //     }
    // }

    // client.handleCommands = async () => {
    //     const commandFolder = fs.readdirSync(`./src/commands`).filter((file) => file.endsWith(".js"));
    //     for (const file of commandFolder) {
    //         const { commands, commandArray } = client;
    //         console.log(file)
    //             const command = require(`../../commands/${file}`);
    //             commands.set(command.data.name, command);
    //             commandArray.push(command.data.toJSON());
    //             console.log(commandArray)
    //             console.log(`Command: ${command.data.name} has been passed through the handler!`)

    //     }

    //     const clientId = '1064913856465481738';
    //     const rest = new REST({version: '9'}).setToken(process.env.token);
    //     try {
    //         // console.log("Started refreshing application (/) commands.");

    //         await rest.put(Routes.applicationCommands(clientId), {
    //             body: client.commandArray,
    //         });

    //         // console.log("Successfully reloaded application (/) commands!")
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // client.handleCommands = async () => {
    //     const commandFolder = fs.readdirSync(`./src/commands`).filter((file) => file.endsWith(".js"));
    //     for (const file of commandFolder) {
    //         const { commands, commandArray } = client;
    //         console.log(file)
    //             const command = require(`../../commands/${file}`);
    //             commands.set(command.data.name, command);
    //             commandArray.push(command.data.toJSON());
    //             console.log(commandArray)
    //             console.log(`Command: ${command.data.name} has been passed through the handler!`)

    //     }

    //     const clientId = '1064913856465481738';
    //     const rest = new REST({version: '9'}).setToken(process.env.token);
    //     try {
    //         // console.log("Started refreshing application (/) commands.");

    //         await rest.put(Routes.applicationCommands(clientId), {
    //             body: client.commandArray,
    //         });

    //         // console.log("Successfully reloaded application (/) commands!")
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
};
