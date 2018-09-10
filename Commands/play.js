const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytsearch = require('youtube-search');
exports.run = async (musicbot, message, args, prefix, server) => {
    if (!message.member.voiceChannel) return message.channel.send("You have to be in a voice channel!");
    if (!message.guild.me.voiceChannel) return message.channel.send("I'm not in a voice channel!");
    if (!args[0]) return message.channel.send("Please give me something to search for!")
    //if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with \`${prefix}play\` or \`${prefix}search\``);

    function play(connection, message) {
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {
            filter: 'audioonly'
        }));

        server.queue.shift();
        server.dispatcher.on("end", function() {
            if (server.queue[0]) return play(connection, message);
            else connection.disconnect();
            message.channel.send("Queue is empty.");

        });
    }
    var opts = {
        maxResults: 1,
        key: 'AIzaSyA9BBe0ud_2h_5q9SVBvrXfRGtxwIX5WaM'
    };
    search(args.join(" "), opts, function(err, results) {
        if (err) return console.log(err);

        let resOne = results[0];

        server.queue.push(resOne.link)

        let info = await ytdl.getInfo(resOne.link);
        let playEmbed = new Discord.RichEmbed()
            .setAuthor(`Added ${info.title} to the queue`, info.author.avatar)
            .setThumbnail(info.thumbnail_url)
        message.channel.send(playEmbed)
        if (!message.guild.voiceConnection) await message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);
        });
    });
}