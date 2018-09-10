const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytsearch = require('youtube-search');
let musicbot = new Discord.Client();
let prefix = ".";
let queue = {};
musicbot.on("ready", async () => {
    console.log("Ready!")
    })
    musicbot.on("message", message => {
        if(!queue[message.guild.id]) queue[message.guild.id] = {
            queue: []
        }
        let server = queue[message.guild.id];
        let args = message.content.slice(prefix.length).trim().split(" ");
        let cmd = args.shift().toLowerCase();
    
        if(message.author.musicbot) return;     
        if(!message.content.startsWith(prefix)) return;
    
        try {
            let commandFile = require(`./Commands/${cmd}.js`);
            commandFile.run(musicbot, message, args, prefix, server);        } catch (e) {
            return;
        }
})
musicbot.login(process.env.BOT_TOKEN);
