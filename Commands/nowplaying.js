const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var search = require('youtube-search');

exports.run = async (musicbot, message, args, prefix, server, names) => {
  if (names.names == "undefined") return message.channel.send("No song is currently playing!")
          let songInfo = await ytdl.getInfo(server.queue[0]);
          let embed = new Discord.RichEmbed()
          .setTitle(songInfo.title)
          .setDescription((songInfo.description).slice(0,100))
          .setThumbnail(songInfo.thumbnail_url)
          .setFooter("Published by: " + songInfo.author.user)
          message.channel.send(embed);
}
