const fs = require('node:fs');
const path = require('node:path');

// Require the necessary classes from discord.js
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { clientID, guildID, token } = require('../config/local_config.json');

const commands = []; // An array used to store the commands that will be deployed
const commandsPath = path.join(__dirname, 'commands'); // path to the commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // fetching the files containing the commands

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token); // create the connexion to the discord API

// deploy the commands to the discord server
rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then(() => console.log('Succesfully registred application commands.'))
    .catch(console.error);