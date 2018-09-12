const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytsearch = require('youtube-search');
    exports.run = async (musicbot, message, args, prefix, server) => {

   if(!server.dispatcher) return message.channel.send("Error.");

    server.dispatcher.resume();

    message.channel.send(":arrow_forward: Resumed the current song.");

    }
