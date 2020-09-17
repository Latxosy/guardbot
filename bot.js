const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', member => {

    if(member.user.bot !==true) {
    } else {
   member.ban(member) 
  }  
  });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



client.on('guildMemberRemove', async (member) => {

let kanal = client.channels.get("kanalID")

let logs = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'});
if(logs.entries.first().executor.bot) return;
let kişi = member.guild.members.get(logs.entries.first().executor.id)
kişi.kick()

const emb = new Discord.RichEmbed()
.setTimestamp()
 .setColor("000000")

kanal.send(emb.addField(`• Sunucu Kick!`,`${kişi} İsimli Kişi Bir Üyeyi Sunucudan Atmaya Çalıştıgı İçin Sunucudan Atıldı`))
})



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




client.on('roleDelete', async (member) => {

let kanal = client.channels.get("752142808717983785")

let logs = await member.guild.fetchAuditLogs({type: 'roleDelete'});
if(logs.entries.first().executor.bot) return;
let kişi = member.guild.members.get(logs.entries.first().executor.id)
kişi.kick()

const emb = new Discord.RichEmbed()

.setTimestamp()
 .setColor("000000")

kanal.send(emb.addField(`• Rol Silindi!`,`${kişi} İsimli Kişi Bir Rolü Sildiği İçin Sunucudan Atıldı`))
  
})




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on('channelDelete', async (member) => {

let kanal = client.channels.get("752142808717983785")

let logs = await member.guild.fetchAuditLogs({type: 'channelDelete'});
if(logs.entries.first().executor.bot) return;
let kişi = member.guild.members.get(logs.entries.first().executor.id)
kişi.kick()

const emb = new Discord.RichEmbed()

.setTimestamp()
 .setColor("000000")

kanal.send(emb.addField(`• Kanal Silindi!`,`${kişi} İsimli Kişi Bir Kanalı Sildiği İçin Sunucudan Atıldı`))
})



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on("guildBanAdd", async function(guild, user) {
    let logs = await guild.fetchAuditLogs();
    if(logs.entries.first().executor.bot) return;
        guild.member(logs.entries.first().executor).kick()
   const embed = new Discord.RichEmbed()
   .addField(`• Uye Banlandı` , guild.member(logs.entries.first().executor) + `Sağ click ban attığı için sunucudan atıldı!`)
   .setTimestamp()
   .setColor("000000")
      let kanal = guild.channels.find(c => c.id == "667297420144803840" && c.type == "text");
    kanal.send(embed);
 
}) 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////