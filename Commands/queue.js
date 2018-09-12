const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var search = require('youtube-search');

exports.run = async (musicbot, message, args, prefix, server, names) => {
  
  if(!names.names) return message.channel.send(":x: The queue is empty!")

let embed = new Discord.RichEmbed()
.setColor(0xff6464)
.setTitle(`**${message.guild.name}**'s Song Queue`)
.setDescription(names.names)
message.channel.send(embed)

}
