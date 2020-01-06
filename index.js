const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden.");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`)
        console.log(`De file ${f} is geladen.`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});



bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("-help", { type: "PLAYING" });

});

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", "Burger")
    var role1 = member.guild.roles.find("name", "Verified")
    var role2 = member.guild.roles.find("name", "Mention's-Trainingen");

    if (!role) return;

    member.addRole(role);
    member.addRole(role1);
    member.addRole(role2);

      const channel = member.guild.channels.find("name", "logs");

      if(!channel) return;

      channel.send(`${member} is gejoind!`);

      return message.member("Welkom in Paris Roleplay. Paris Rolaplay is de 1e roleplay server van de hoofdstad van Frankrijk Parijs. \n Als u een vraag heeft kunt u gerust een ticket aanmaken. \n Verder wens ik u veel plezier in Paris Roleplay! \n \n Groet. \n Kevin en Myron Owner's van Paris Roleplay.");

});


bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));


    var options = {

        active: active

    }

    if (!message.content.startsWith(prefix)) return;
    if (commands) commands.run(bot, message, arguments, options);
});


bot.login(process.env.token);