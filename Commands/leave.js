const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytsearch = require('youtube-search');
    exports.run = async (musicbot, message, args, prefix, server) => {
        if(!message.guild.me.voiceChannel) return message.channel.send("I am not in a voice channel!")
        
message.guild.me.voiceChannel.leave();

    message.channel.send("Left the voice channel!");
    }
