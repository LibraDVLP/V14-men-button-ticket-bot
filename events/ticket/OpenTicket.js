const { ActionRowBuilder, ChannelType, Colors, ButtonBuilder, ButtonStyle, PermissionFlagsBits, } = require('discord.js')
const config = require('../../settings/config');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if(!interaction.isStringSelectMenu()) return;

        let support_team = config.support_team;

        let AlreadyChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);
        if (AlreadyChannel) return interaction.reply({
            content: ":x: | Zaten Açık bir biletiniz var!",
            ephemeral: true
        });

        if(interaction.values[0] === 'report') {
            interaction.channel.delete();
            let ticket = interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                topic: interaction.user.id,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: support_team,
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
                        description: `Biletinize hoşgeldiniz. ${interaction.user} !\nLütfen ne konuda destek almak istiyorsanız belirtin aktif  yetkililerimiz gelib ilgilenecektir!`,
                        color: Colors.Blurple,
                        footer: {
                            text: "Sqmax Ticket"
                        },
                        timestamp: new Date()
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder() .setCustomId('close') .setLabel('Close') .setStyle(ButtonStyle.Danger)
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user} <@${config.support_team}>`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
        } 
        else if (interaction.values[0] === "question") {
            interaction.channel.delete();
            let ticket = interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                topic: interaction.user.id,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: support_team,
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
                        description: `Biletinize hoşgeldiniz. ${interaction.user} !\nLütfen partner textinizi atın ve bekleyin, aktif *Partner Staff* gelib sizinle ilginecektir!`,
                        color: Colors.Blurple,
                        footer: {
                            text: "Sqmax Ticket"
                        },
                        timestamp: new Date()
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder() .setCustomId('close') .setLabel('Close') .setStyle(ButtonStyle.Danger)
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user} <@${config.support_team}>`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
        }
        else if (interaction.values[0] === "other") {
            interaction.channel.delete();
            let ticket = interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                topic: interaction.user.id,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: support_team,
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
                        description: `Biletinize hoşgeldiniz.${interaction.user} !\nLütfen ne sebeple destek açtığınızı belirtin!`,
                        color: Colors.Blurple,
                        footer: {
                            text: "Sqmax Ticket"
                        },
                        timestamp: new Date()
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder() .setCustomId('close') .setLabel('Close') .setStyle(ButtonStyle.Danger)
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user} <@${config.support_team}>`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
        }
    }
}
