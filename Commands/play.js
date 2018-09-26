const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var search = require('youtube-search');

exports.run = async (musicbot, message, args, prefix, server, names) => {

if(!message.member.voiceChannel) return message.channel.send(":x: You're not in a voice channel!");


if(!args[0]) return message.channel.send(":x: I can't search for *nothing*!");

function play(connection, message) {
     
     server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}));
   
    
     server.dispatcher.on("end", function() {
      server.queue.shift();
      names.names.shift();
     if(server.queue[0]) {
       play(connection, message)
 message.channel.send(`Now Playing: ${names.names[0]}`);
       return;
     }
       else connection.disconnect();
       message.channel.send(":x: The queue is empty! Left your voice channel!");
     
     });
   }

   var opts = {
    maxResults: 5,
    key: 'AIzaSyChV72AqgUOWab694WT3zdK6EIbY0EGRuc'
  };
   
  search(args.join(" "), opts, function(err, results) {
    if(err) return console.log(err);
   
    let resOne = results[0];
    let resTwo = results[1];
    let resThree = results[2];
    let resFour = results[3];
    let resFive = results[4];

    let embed = new Discord.RichEmbed()
    .setColor(0xff6464)
    .setDescription(`:one: **${resOne.title}**\n:two: ${resTwo.title}\n:three: ${resThree.title}\n:four: ${resFour.title}\n:five: ${resFive.title}`)
    message.channel.send(embed).then(embeds => {
        embeds.react("1⃣").then(async r => {
            await embeds.react("2⃣");
            await embeds.react("3⃣");
            await embeds.react("4⃣");
            await embeds.react("5⃣");

            const songOne = (reaction, user) => reaction.emoji.name === "1⃣" && user.id === message.author.id;
            const songTwo = (reaction, user) => reaction.emoji.name === "2⃣" && user.id === message.author.id;
            const songThree = (reaction, user) => reaction.emoji.name === "3⃣" && user.id === message.author.id;
            const songFour = (reaction, user) => reaction.emoji.name === "4⃣" && user.id === message.author.id;
            const songFive = (reaction, user) => reaction.emoji.name === "5⃣" && user.id === message.author.id;

            const one = embeds.createReactionCollector(songOne, { time: 60000 });
            const two = embeds.createReactionCollector(songTwo, { time: 60000 });
            const three = embeds.createReactionCollector(songThree, { time: 60000 });
            const four = embeds.createReactionCollector(songFour, { time: 60000 });
            const five = embeds.createReactionCollector(songFive, { time: 60000 });

            one.on('collect', async r => {
                server.queue.push(resOne.link)
                names.names.push(resOne.title);
                embeds.delete();
                let info = await ytdl.getInfo(resOne.link);
                let playEmbed = new Discord.RichEmbed()
                .setColor(0xff6464)
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setDescription((info.description).slice(0,100))
                .setThumbnail(info.thumbnail_url)
                .setFooter("Published by: " + info.author.username)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })
              two.on('collect', async r => {
                server.queue.push(resTwo.link)
                names.names.push(resTwo.title);
                embeds.delete();
                let info = await ytdl.getInfo(resTwo.link);
                let playEmbed = new Discord.RichEmbed()
                .setColor(0xff6464)
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setDescription((info.description).slice(0,100))
                .setThumbnail(info.thumbnail_url)
                .setFooter("Published by: " + info.author.username)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })
              three.on('collect', async r => {
                server.queue.push(resThree.link)
                names.names.push(resThree.title);
                embeds.delete();
                let info = await ytdl.getInfo(resThree.link);
                let playEmbed = new Discord.RichEmbed()
                .setColor(0xff6464)
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setDescription((info.description).slice(0,100))
                .setThumbnail(info.thumbnail_url)
                .setFooter("Published by: " + info.author.username)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })
              four.on('collect', async r => {
                server.queue.push(resFour.link)
                names.names.push(resFour.title);
                embeds.delete();
                let info = await ytdl.getInfo(resFour.link);
                let playEmbed = new Discord.RichEmbed()
                .setColor(0xff6464)
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setDescription((info.description).slice(0,100))
                .setThumbnail(info.thumbnail_url)
                .setFooter("Published by: " + info.author.username)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })
              five.on('collect', async r => {
                server.queue.push(resFive.link)
                names.names.push(resFive.title);
                embeds.delete();
                let info = await ytdl.getInfo(resFive.link);
                let playEmbed = new Discord.RichEmbed()
                .setColor(0xff6464)
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setDescription((info.description).slice(0,100))
                .setThumbnail(info.thumbnail_url)
                .setFooter("Published by: " + info.author.username)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })

        });
    });
  });
}
