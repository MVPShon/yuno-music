const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var search = require('youtube-search');

exports.run = async (musicbot, message, args, prefix, server) => {

if(!message.member.voiceChannel) return message.channel.send("You have to be in a voice channel!");

if(message.guild.me.voiceChannel) return message.channel.send("I'm already in another voice channel!");

if(!args[0]) return message.channel.send("I can't search for *nothing*!");

function play(connection, message) {
     
     server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}));
     
     server.queue.shift();
     
     server.dispatcher.on("end", function() {
     if(server.queue[0]) return play(connection, message);
       else connection.disconnect();
       message.channel.send("The queue is empty!");
     
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
    .setDescription(`:regional_indicator_a: **${resOne.title}**\n:regional_indicator_b: ${resTwo.title}\n:regional_indicator_c: ${resThree.title}\n:regional_indicator_d: ${resFour.title}\n:regional_indicator_e: ${resFive.title}`)
    message.channel.send(embed).then(embeds => {
        embeds.react(":regional_indicator_a:").then(async r => {
            await embeds.react(":regional_indicator_b:");
            await embeds.react(":regional_indicator_c:");
            await embeds.react(":regional_indicator_d:");
            await embeds.react(":regional_indicator_e:");

            const songOne = (reaction, user) => reaction.emoji.name === ":regional_indicator_a:" && user.id === message.author.id;
            const songTwo = (reaction, user) => reaction.emoji.name === ":regional_indicator_b:" && user.id === message.author.id;
            const songThree = (reaction, user) => reaction.emoji.name === ":regional_indicator_c:" && user.id === message.author.id;
            const songFour = (reaction, user) => reaction.emoji.name === ":regional_indicator_d:" && user.id === message.author.id;
            const songFive = (reaction, user) => reaction.emoji.name === ":regional_indicator_e:" && user.id === message.author.id;

            const one = embeds.createReactionCollector(songOne, { time: 60000 });
            const two = embeds.createReactionCollector(songTwo, { time: 60000 });
            const three = embeds.createReactionCollector(songThree, { time: 60000 });
            const four = embeds.createReactionCollector(songFour, { time: 60000 });
            const five = embeds.createReactionCollector(songFive, { time: 60000 });

            one.on('collect', async r => {
                server.queue.push(resOne.link)
                embeds.delete();
                let info = await ytdl.getInfo(resOne.link);
                let playEmbed = new Discord.RichEmbed()
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setThumbnail(info.thumbnail_url)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })
              two.on('collect', async r => {
                server.queue.push(resTwo.link)
                embeds.delete();
                let info = await ytdl.getInfo(resTwo.link);
                let playEmbed = new Discord.RichEmbed()
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setThumbnail(info.thumbnail_url)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })
              three.on('collect', async r => {
                server.queue.push(resThree.link)
                embeds.delete();
                let info = await ytdl.getInfo(resThree.link);
                let playEmbed = new Discord.RichEmbed()
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setThumbnail(info.thumbnail_url)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })
              four.on('collect', async r => {
                server.queue.push(resFour.link)
                embeds.delete();
                let info = await ytdl.getInfo(resFour.link);
                let playEmbed = new Discord.RichEmbed()
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setThumbnail(info.thumbnail_url)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })
              five.on('collect', async r => {
                server.queue.push(resFive.link)
                embeds.delete();
                let info = await ytdl.getInfo(resFive.link);
                let playEmbed = new Discord.RichEmbed()
                .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
                .setThumbnail(info.thumbnail_url)
                message.channel.send(playEmbed)
                if(!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message);
                  });
              })

        });
    });
  });



}
