const request = require('request');
const cheerio = require('cheerio');

module.exports = (client, message) => {
    /**
     * Escuta o evento de message
     */
    if (message.content.toLowerCase() === "!margot") {
        message.reply("Sai fora irmão!")
    }

    /**
     * Função que mostra os comandos que o bot pode executar (help)
     */
    if (message.content.toLowerCase() === "!help") {
        message.reply(`\n!margot - diga meu nome \n !hi (user) - Diga oi para alguem`)
    }

    /**
     * Escuta quando um usuário digita uma mensagem e executa uma ação
     */
    if (message.content.startsWith("!hi")) {
        const member = message.mentions.members.first()
        if (!member) {
            return message.reply(
                `Quem você quer comprimentar? Escolha alguem.`
            )
        }
        // if (!member.kickable) {
        //     return message.reply(`Não posso comprimenta-lo. Foi mal!`)
        // }
        return message.reply(`${member.user.username} turu bao?`)

        // (kick a member)
        // return member
        //     .kick()
        //     .then(() => message.reply(`${member.user.tag} was kicked.`))
        //     .catch(error => message.reply(`Sorry, an error occured.`))
    }

    /**
     * Gera um imagem automaticamente
     */
    if (message.content === '!image') {
        randomImage(message);
    }

    if(message.content === 'ta facil?'){
        return message.reply(`Não ta fácil para ninguem!`)
    }
}

/**
 * Função que gera uma imagem aleatorio do google
 */
function randomImage(message) {
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "meme",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }

        const $ = cheerio.load(responseBody);

        const links = $(".image a.link");
        const urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);

        if (!urls.length) {
            return;
        }

        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}
