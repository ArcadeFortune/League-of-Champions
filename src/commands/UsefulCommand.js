const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("much_useful_command")
        .setDescription(
            "I will think about any compliments to give you (impossible)"
        ),
    async execute(interaction, client) {
        await interaction.deferReply();
    },
};
