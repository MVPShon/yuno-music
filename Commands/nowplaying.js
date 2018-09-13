const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var search = require('youtube-search');

exports.run = async (musicbot, message, args, prefix, server, names) => {
message.channel.send(`Now Playing: ${names.names[0]}`);
}
