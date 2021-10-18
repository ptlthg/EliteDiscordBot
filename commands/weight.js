const Discord = require('discord.js');
const { PlayerHandler } = require('../calc.js');
const { DataHandler } = require('../database.js');

module.exports = {
	name: 'weight',
	aliases: [ 'w' ],
	description: 'Calculate a players farming weight',
	usage: '[username] (profile name)',
	guildOnly: false,
	dmOnly: false,
	async execute(interaction) {
		const options = interaction?.options?._hoistedOptions;

		const playerName = options[0]?.value.trim();
		const profileName = options[1]?.value.trim();

		await interaction.deferReply();
		if (playerName) {
			PlayerHandler.getWeight(interaction, playerName, profileName ?? null);
		} else {
			let user = await DataHandler.getPlayer(null, { discordid: interaction.user.id });
			if (user.dataValues?.ign) {
				PlayerHandler.getWeight(interaction, user.dataValues.ign, profileName ?? null);
			} else {
				const embed = new Discord.MessageEmbed()
					.setColor('#03fc7b')
					.setTitle('Error: Specify a Username!')
					.setDescription('Checking for yourself? You must use \`/verify (account name)\` before using this shortcut!')
					.setFooter('Created by Kaeso#5346');
				interaction.editReply({ embeds: [embed] })
			}
		}
	}
};

