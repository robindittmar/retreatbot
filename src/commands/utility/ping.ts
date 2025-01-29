import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "npm:discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Pong!");
    },
};
