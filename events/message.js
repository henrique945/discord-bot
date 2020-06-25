const request = require('request');
const cheerio = require('cheerio');

const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(process.env.GIPHYTOKEN);

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
        message.reply(`\n !margot - diga meu nome \n !hi (user) - Diga oi para alguem \n !meme`)
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
    if (message.content === '!meme') {
        randomGif(message);
    }

    if (message.content === 'ta facil?') {
        return message.reply(`Não ta fácil para ninguem!`)
    }
}

/**
 * Função que gera um gif aleatorio
 * Buscando por memes
 */
function randomGif(message) {
    giphy.search("gifs", {q: 'meme'})
        .then(response => {
            var totalResponse = response.data.length;
            var responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponse;
            var responseFinal = response.data[responseIndex];
            message.channel.send(`${message.author} Heres Your Gif! :slight_smile:`, {
                    files: [responseFinal.images.fixed_height.url]
                }
            );
        })
}


/**
 * Função que gera uma imagem aleatorio do google (cheerio)
 */
function randomImageCheerio(message) {
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "food",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function (error, response, responseBody) {
        if (error) {
            return;
        }

        $ = cheerio.load(responseBody);

        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);

        if (!urls.length) {
            return;
        }

        // Send result
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
}
