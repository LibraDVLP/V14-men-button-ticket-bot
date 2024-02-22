const { ActionRowBuilder, ChannelType, Colors, PermissionFlagsBits, StringSelectMenuBuilder } = require('discord.js')
const config = require('../../settings/config');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if(!interaction.isButton()) return;

        if(interaction.customId == 'ticket') {
            
            let ticket = interaction.guild.channels.create({
                name: `Bir kategori seçin.`,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    embeds: [{
                        title: "Sqmax Ticket",
                        description: "Lütfen biletiniz için bir kategori seçin!",
                        color: Colors.Blurple,
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setCustomId('category')
                            .setPlaceholder('Bir kategori seçin.')
                            .addOptions([
                                {
                                    label: 'Destek',
                                    description: 'Destek almak için bilet aç.',
                                    value: 'report',
                                    emoji: '⚙️'
                                },
                                {
                                    label: 'Partner',
                                    description: 'Partner yapmak için bilet aç.',
                                    value: 'question',
                                    emoji: '🤝'
                                },
                                {
                                    label: 'Diğer',
                                    description: 'Diğer şeyler için bilet aç.',
                                    value: 'other',
                                    emoji: '❓'
                                }
                            ])
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user}`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
            interaction.reply({
                content: `:white_check_mark: | Biletiniz başarıyla açıldı!`,
                ephemeral: true
            })
        }
    }
}