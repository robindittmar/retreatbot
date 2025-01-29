import "jsr:@std/dotenv/load";
import {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    MessageFlags,
} from "npm:discord.js";
import { getBook, searchBook } from "./searchResultBook.ts";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        await interaction.reply({
            content: "Pong!",
            flags: MessageFlags.Ephemeral,
        });
    }
});

client.on(Events.MessageCreate, async (message) => {
    if (!message.content.startsWith("!")) {
        return;
    }
    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith("!book")) {
        let parts = message.content.split(" ").slice(1).join(" ");
        let result = await searchBook(parts);
        let b = await getBook(result.docs[0].key);

        let description: string = "";
        if (typeof b.description === "string") {
            description = b.description;
        } else if (b.description.type === "/type/text") {
            description = b.description.value;
        }

        await message.reply("```" + description + "```");
    }
});

client.login(Deno.env.get("DISCORD_TOKEN"));
