/**
 * Escuta quando um novo membro é adicionado ao servidor
 */
module.exports = (client, member) => {
    member.send(
        `Bem vindo porra!`
    )
}
