require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder, Embed } = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
client.on("ready", (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "hey") {
    interaction.reply("hey!");
  }
  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`The sum is ${num1 + num2}`);
  }
  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This  is an embed description")
      .setColor("Random")
      .addFields(
        {
          name: "Field Title",
          value: " Some random Value",
          inline: true,
        },
        {
          name: "2Field Title",
          value: " Some random Value",
          inline: true,
        }
      );

    interaction.reply({
      embeds: [embed],
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });
    const role = interaction.guild.roles.cache.get(interaction.customId);

    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }
    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added`);
  } catch (error) {
    console.log(error);
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This  is an embed description")
      .setColor("Random")
      .addFields(
        {
          name: "Field Title",
          value: " Some random Value",
          inline: true,
        },
        {
          name: "2Field Title",
          value: " Some random Value",
          inline: true,
        }
      );
    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
