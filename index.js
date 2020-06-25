require("dotenv").config()
// importa a API do discord e inicializa ela
const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        // os eventos são os nomes dos arquivos (ex: ready, message and guildMemberAdd)
        client.on(eventName, arg => eventHandler(client, arg))

        // mais de uma argumento
        // client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})

// para finalizar a conexão de volta com o discord é necessário enviar um token de validação
client.login(process.env.BOT_TOKEN)
