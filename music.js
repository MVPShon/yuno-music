const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytsearch = require('youtube-search');
let musicbot = new Discord.Client();
let prefix = ".";
let queue = {};
let songNames = {};
musicbot.on("ready", async () => {
    console.log("Ready!")
    })
    musicbot.on("message", message => {
        if(!queue[message.guild.id]) queue[message.guild.id] = {
            queue: []
        }
        if(!songNames[message.guild.id]) songNames[message.guild.id] = {
        names: []
        }

    let names = songNames[message.guild.id];
        let server = queue[message.guild.id];
        let args = message.content.slice(prefix.length).trim().split(" ");
        let cmd = args.shift().toLowerCase();
    
        if(message.author.musicbot) return;     
        if(!message.content.startsWith(prefix)) return;
    
        try {
            let commandFile = require(`./Commands/${cmd}.js`);
            commandFile.run(musicbot, message, args, prefix, server, names);        
            } catch (e) {
            return;
        }
})
musicbot.login(process.env.BOT_TOKEN);
