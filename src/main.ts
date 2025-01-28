import 'jsr:@std/dotenv/load';
import { Client, GatewayIntentBits } from 'npm:discord.js';
import {getBook, searchBook} from "./searchResultBook.ts";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!')) {
    return;
  }
  if (message.author.bot) {
    return;
  }

  if (message.content.startsWith('!book')) {
    let parts = message.content.split(' ').slice(1).join(' ');
    let result = await searchBook(parts);
    let b = await getBook(result.docs[0].key);

    await message.reply('```' + b.description + '```');
  }
});

client.login(Deno.env.get('DISCORD_TOKEN'));

