import "jsr:@std/dotenv/load";
import {
    Client,
    Events,
    GatewayIntentBits,
    MessageFlags,
    REST,
    Routes,
    SlashCommandBuilder,
} from "npm:discord.js";
import {AppDataSource} from "./core/database.ts";
import {getBook, searchBook} from "./searchResultBook.ts";

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
    } else if (interaction.commandName === "book") {
        const opt = interaction.options.get("query");
        let result = await searchBook(opt?.value?.toString() || "");
        let b = await getBook(result.docs[0].key);

        let description: string = "";
        if (typeof b.description === "string") {
            description = b.description;
        } else if (b.description.type === "/type/text") {
            description = b.description.value;
        }

        await interaction.reply("```" + description + "```");
    }
});

const token = Deno.env.get("DISCORD_TOKEN") || "";
const clientId = Deno.env.get("DISCORD_CLIENT_ID") || "";

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log("Connecting to database");
        await AppDataSource.initialize();

        console.log("Refreshing commands");

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            {
                body: [
                    new SlashCommandBuilder().setName("ping").setDescription(
                        "Replies with Pong!",
                    ).toJSON(),
                    new SlashCommandBuilder().setName("book").setDescription(
                        "Search for book",
                    ).addStringOption((opt) =>
                        opt
                            .setName("query")
                            .setRequired(true)
                            .setDescription(
                                "Search query to pass to openlibrary.org",
                            )
                    ).toJSON(),
                ],
            },
        );
    } catch (error) {
        console.error(error);
    }
})();

client.login(Deno.env.get("DISCORD_TOKEN"));
