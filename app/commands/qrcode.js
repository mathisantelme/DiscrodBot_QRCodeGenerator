const googleAPI = require('../externalAPI/googleQR');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qrcode')
        .setDescription('Replis with a QR Code generated from the command options')
        .addStringOption(option => option.setName('url')
            .setDescription('The url represented by the QR Code')
            .setRequired(true))
        .addStringOption(option => option.setName('height')
            .setDescription('The height in pixels of the QR Code'))
        .addStringOption(option => option.setName('width')
            .setDescription('The width in pixels of the QR Code')),

    async execute (interaction) {
        const url = interaction.options.getString('url');
        const height = interaction.options.getString('height');
        const width = interaction.options.getString('width');

        await interaction.reply(googleAPI.generateQR(url, height, width));
    }
};