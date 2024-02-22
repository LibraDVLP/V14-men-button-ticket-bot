const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js')
const config = require('../../settings/config');
const transcript = require('discord-html-transcripts');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if(!interaction.isButton()) return;

        if(interaction.customId === "close") {
            interaction.reply({
                content: `Biletinizi silmek istediğinizden eminmisiniz?`,
                ephemeral: true,
            });

            interaction.channel.send({
                embeds: [{
                    title: "Sqmax Ticket",
                    description: "Bilet kapatılacaktır transkriptini ister misiniz?",
                    color: Colors.Blurple,
                    footer: {
                        text: "Sqmax Ticket"
                    },
                    timestamp: new Date()
                }],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder() .setCustomId('yes') .setLabel('✅') .setStyle(ButtonStyle.Success),
                        new ButtonBuilder() .setCustomId('no') .setLabel('❌') .setStyle(ButtonStyle.Danger)    
                    )
                ]
            });
        }
        else if (interaction.customId === "yes") {
            let ticket_logs = client.channels.cache.get(config.ticket_logs);

            await ticket_logs.send({
                embeds: [{
                    title: "Sqmax Ticket",
                    description: `Yeni ticket kapatıldı (${interaction.channel.name}) kapatan ${interaction.user}`,
                    color: Colors.Blurple,
                    footer: {
                        text: "Sqmax Ticket"
                    },
                    timestamp: new Date()
                }],
                files: [await transcript.createTranscript(interaction.channel)]
            });

            await interaction.channel.send({
                embeds: [{
                    title: "Sqmax Ticket",
                    description: `Ticket kapatıldı kapatan ${interaction.user}`,
                    color: Colors.Blurple,
                    footer: {
                        text: "Sqmax Ticket"
                    },
                    timestamp: new Date()
                }]
            });

            await interaction.channel.delete();
        }
        else if (interaction.customId === "no") {
            interaction.channel.send({
                embeds: [{
                    title: "Sqmax Ticket",
                    description: `Ticket kapatıldı kapatan ${interaction.user}`,
                    color: Colors.Blurple,
                    footer: {
                        text: "Sqmax Ticket"
                    },
                    timestamp: new Date()
                }]
            });

            await interaction.channel.delete();
        }
    }
}
