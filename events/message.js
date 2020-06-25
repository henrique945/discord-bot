module.exports = (client, message) => {
    /**
     * Escuta o evento de message
     */
    if (message.content.toLowerCase() === "!margot") {
        message.reply("Eu mesma!")
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
}
