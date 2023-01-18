const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("very_useful_command")
        .setDescription(
            "I will think about any compliments to give you (impossible)"
        ),
    async execute(interaction, client) {
        client.application.commands.set([])
        // // client.application.commands
        // //     .fetch("1065167505179545682") // id of your command
        // //     .then((command) => {
        // //         console.log(`Fetched command ${command.name}`);
        // //         // further delete it like so:
        // //         command.delete();
        // //         console.log(`Deleted command ${command.name}`);
        // //     })
        // //     .catch(console.error);
        // console.log(client.application.commands.cache)
        // // client.application.commands.cache.find(c => c.name === 'useful_command').delete()
        await interaction.deferReply();
    },
};
