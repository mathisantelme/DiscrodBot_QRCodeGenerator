// Require the necessary discord.js classes and tokens
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config/local_config.json');

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); // a new client instance

client.commands = new Collection(); // a Collection used to store the commands
const commandsPath = path.join(__dirname, 'commands'); // path to the commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // fetching the files containing the commands

// Reading command files present in the commands directory
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file); // generating the command file path
    const command = require(filePath);

    // Setting a new item in the command collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// when the client is ready, run this code
client.once('ready', () => {
    console.log('Ready');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return; // check that the interaction is a command

    const { command } = client.commands.get(interaction.commandName);

    if (!command) return; // check that command is valid

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: `There was an error while executing this command`, ephemeral: true });
    }
});