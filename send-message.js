require("dotenv").config();
const { ButtonBuilder } = require("@discordjs/builders");
const {
  Client,
  IntentsBitField,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1186301107132174428",
    label: "Red",
  },
  {
    id: "1186301180041777192",
    label: "Green",
  },
  {
    id: "1186301184743579760",
    label: "Blue",
  },
];

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1177895596271620146");
    if (!channel) return;

    const row = new ActionRowBuilder();
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "Claim or remove a role",
      components: [row],
    });
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.DISCORD_TOKEN);
