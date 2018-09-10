const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var search = require('youtube-search');

exports.run = async (bot, message, args, prefix, server) => {

if(!message.member.voiceChannel) return message.channel.send(":x: | Sorry! Please join a Voice Channel.");

if(message.guild.me.voiceChannel) return message.channel.send(":x: | Sorry! I'm already playing in a channel.");

if(!args[0]) return message.channel.send(":x: | Sorry! Please provide a Search String or URL.");

function play(connection, message) {
     
     server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}));
     
     server.queue.shift();
     
     server.dispatcher.on("end", function() {
     if(server.queue[0]) return play(connection, message);
       else connection.disconnect();
       message.channel.send(":dash: | Queue is empty.");
     
     });
   }

   var opts = {
    maxResults: 5,
    key: 'AIzaSyChV72AqgUOWab694WT3zdK6EIbY0EGRuc'
  };
   
  search(args.join(" "), opts, function(err, results) {
    if(err) return console.log(err);
   
    let resOne = results[0];

server.queue.push(resOne.link)

  let info = await ytdl.getInfo(resOne.link);
                let playEmbed = new Discord.RichEmbed()
                .setColor(0xffc07c)
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setThumbnail(info.thumbnail_url)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });

});
     
