const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ConnectionService } = require("discord.js");
const fs = require("fs");

module.exports = (client) => {
    

    client.handleCommands = async () => {
        const commandFolder = fs.readdirSync(`./src/commands`).filter((file) => file.endsWith(".js"));
        for (const file of commandFolder) {
            const { commands, commandArray } = client;
                const command = require(`../../commands/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Registered command: ${command.data.name}!`)
            
        }

        const clientId = '1064913856465481738';
        const rest = new REST({version: '9'}).setToken(process.env.token);
        try {
            // console.log("Started refreshing application (/) commands.");

            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandArray,
            });

            // console.log("Successfully reloaded application (/) commands!")
        } catch (error) {
            console.error(error)
        }
    }
};
