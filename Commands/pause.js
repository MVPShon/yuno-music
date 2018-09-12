const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytsearch = require('youtube-search');
    exports.run = async (musicbot, message, args, prefix, server) => {

   if(!server.dispatcher) return message.channel.send("Error.");

    server.dispatcher.pause();

    message.channel.send(":pause_button: Paused the current song.");

    }
