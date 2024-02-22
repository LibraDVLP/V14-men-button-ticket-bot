const colors = require('colors');
const config = require('../../settings/config');
const { ActionRowBuilder, Colors, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ready',
    once: false,
    execute: async (client) => {
        console.log(`[READY] ${client.user.tag} (${client.user.id}) is ready !`.green);

        let channelTicket = client.channels.cache.get(config.ticket_channel);
        await channelTicket.send({ content: "Sqmax Ticket" })
        await channelTicket.bulkDelete(2);

        await channelTicket.send({
            embeds: [{
                title: "Sqmax Ticket",
                description: "Personelle iletişime geçmek için bilet açmak istiyorsanız aşağıdaki butona tıklayın!",
                color: Colors.Blurple,
                footer: {
                    name: "Sqmax Ticket",
                },
                timestamp: new Date(),
            }],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder() .setCustomId('ticket') .setLabel('🎟️ Destek Talebi Oluştur') .setStyle(ButtonStyle.Secondary)
                )
            ]
        })
    }
}
