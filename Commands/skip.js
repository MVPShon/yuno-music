const Discord = require("discord.js");

exports.run = async (musicbot, message, args, prefix, server) => {

    if(!server.dispatcher) return message.channel.send("Error!");
    
    message.channel.send(":no_entry_sign: Skipped the current song!");

    server.dispatcher.end();

}
