const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: []})
    .write()


var bot = new Discord.Client();
var prefix = ("§");
var randnum = 0;

var storynumber = db.get('histoires').map('story_value').value();

bot.on('ready' , () => {
    bot.user.setPresence({ game: { name: '[§help] Dev Par Eclipse' , type: 0}})
     console.log("bot pret !");
});

bot.login(process.env.TOKEN);

bot.on('message',message => {
    if (message.content === "ping"){
        message.reply("pong");
        console.log('pong');
}

if (!message.content.startsWith(prefix)) return;
var args = message.content.substring(prefix.length).split(" ");

switch (args[0].toLowerCase()){

       case "idees":
       var value = message.content.substr(10);
       var author = message.author.tag.toString();
       var number = db.get("histoires").map('id').value();
       
       console.log(value);
       message.reply("Ajout de l'idée dans la base de données")

       db.get('histoires')
        .push({story_value: value, story_author: author})
        .write();

        break;
             
}

    if (message.content === prefix + "help"){
       var help_embed = new Discord.RichEmbed()
           .setColor('#FE0C0C')
           .addField("Commande Du Bot :" ,  "    -§help pour afficher les commandes        \n-§histoire pour ajouter une idée pour le serveur dans la base de données , tout les lundis , les idées seront examinées et utilisées (si possible)")
           .addField("Interaction :" ,  "     -Ping pour faire dire pong au bot")
           .setFooter("C'est tout pour ce embed !")
       message.channel.sendEmbed(help_embed);
      // message.channel.sendMessage("Voici les commandes :\n - §help pour afficher les commandes");
         console.log("help");
     }

     if (message.content === "Salut !"){
         random();
            
         if (randnum == 1){
             message.reply("Salut ^^")
         }

         if (randnum == 2){
             message.reply("ptdr t ki ?")
         }

         if (randnum == 3){
             message.reply("Yo !")
         }

}})

function story_random(min, max) {
    min = Math.ceil(1);
    max = Math.floor(storynumber);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
};


function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(3);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
};
