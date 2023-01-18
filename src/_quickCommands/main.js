module.exports = (client) => {
    const data = {
        name: "SDJK:FJ:DSF'",
    };
    client.on("messageCreate", (message) => {
        if (message.content === "ping") {
            message.reply("pong");
        }
    });

    return data;
};
