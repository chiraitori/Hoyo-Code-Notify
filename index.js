const { Client, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const gameOptions = {
  genshin: 'Genshin Impact',
  hsr: 'Honkai: Star Rail',
  zzz: 'Zenless Zone Zero'
};

const linkOptions = {
  genshin: 'https://genshin.hoyoverse.com/vi/gift?code=',
  hsr: 'https://hsr.hoyoverse.com/gift?code=',
  zzz: 'https://zenless.hoyoverse.com/redemption?code='
};

const roleOptions = {
    genshin: '<@&1261506690675769517>',
    hsr: '<@&1260561520040083567>',
    zzz: '<@&1260562053178069023>',
};

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  const command = new SlashCommandBuilder()
    .setName('redeemcode')
    .setDescription('Opens a modal to redeem up to three game codes');
  
  client.application.commands.create(command);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'redeemcode') {
    const modal = new ModalBuilder()
      .setCustomId('codeRedemptionModal')
      .setTitle('Redeem Game Codes');

    const gameInput = new TextInputBuilder()
      .setCustomId('gameInput')
      .setLabel("Enter game (genshin, hsr or zzz)")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("e.g. genshin")
      .setMinLength(3)
      .setMaxLength(9)
      .setRequired(true);

    const codeInput1 = new TextInputBuilder()
      .setCustomId('codeInput1')
      .setLabel("Enter your first game code")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("e.g. GENSHINGIFT123")
      .setMinLength(1)
      .setMaxLength(20)
      .setRequired(true);

    const codeInput2 = new TextInputBuilder()
      .setCustomId('codeInput2')
      .setLabel("Enter your second game code (optional)")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("e.g. GENSHINGIFT456")
      .setMinLength(1)
      .setMaxLength(20)
      .setRequired(false);

    const codeInput3 = new TextInputBuilder()
      .setCustomId('codeInput3')
      .setLabel("Enter your third game code (optional)")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("e.g. GENSHINGIFT789")
      .setMinLength(1)
      .setMaxLength(20)
      .setRequired(false);

    modal.addComponents(
      new ActionRowBuilder().addComponents(gameInput),
      new ActionRowBuilder().addComponents(codeInput1),
      new ActionRowBuilder().addComponents(codeInput2),
      new ActionRowBuilder().addComponents(codeInput3),
    );

    await interaction.showModal(modal);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'codeRedemptionModal') {
    const gameChoice = interaction.fields.getTextInputValue('gameInput').toLowerCase();
    const codes = [
      interaction.fields.getTextInputValue('codeInput1'),
      interaction.fields.getTextInputValue('codeInput2'),
      interaction.fields.getTextInputValue('codeInput3')
    ].filter(code => code !== '');

    if (!gameOptions[gameChoice]) {
      await interaction.reply({ content: 'Invalid game choice. Please use genshin, hsr, or zzz.', ephemeral: true });
      return;
    }

    const role = roleOptions[gameChoice];
    const game = gameOptions[gameChoice];
    const link = linkOptions[gameChoice];

    await interaction.reply({ content: `Received ${codes.length} code(s) for ${game}. Processing...`, ephemeral: true });

    setTimeout(async () => {
      const channelId = process.env.CHANNEL;
      const channel = client.channels.cache.get(channelId);

      if (channel) {
        let message = `${role}\nGame: ${game}\n`;
        codes.forEach((code, index) => {
          message += `Code ${index + 1}: [${code}](${link}${code})\n${message}`;
        });
        await channel.send(message);
        await interaction.followUp({ content: `Your code(s) for ${game} have been successfully send!`, ephemeral: true });
      } else {
        console.log("Couldn't find the specified channel.");
        await interaction.followUp({ content: "Couldn't find the specified channel.", ephemeral: true });
      }
    }, 2000);
  }
});

client.login(process.env.TOKEN);