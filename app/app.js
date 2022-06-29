// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
// Require the connexion token
const { token } = require('../config/local_config.json');

// Creating a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// when the client is ready, run this code
client.once('ready', () => {
    console.log('Ready');
});

// Login to Discord with your client's token
client.login(token);