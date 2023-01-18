const Command = require('../../Structures/Command');
const { big } = require('../../Assets/json/lund');
const { MessageEmbed } = require('discord.js');
const Random = require('random-js');

module.exports = class Dick extends Command {
  constructor(client) {
    super(client, {
      name: 'dick',
      aliases: ['penis', 'lund'],
      group: 'analyze',
      memberName: 'dick',
      description: "What's your size? 🤔",
      args: [
        {
          key: 'user',
          prompt: 'What user do you want to determine the size of?',
          type: 'user',
          default: (msg) => msg.author,
        },
      ],
    });
  }

  async run(msg, { user }) {
    const embed = new MessageEmbed();
    if (!big[user.id]) {
      const random = new Random(Random.engines.mt19937().seed(user.id));
      await embed.setColor(this.client.color);
      await embed.setDescription(`**${user}**'s size is:\n**${'='.repeat(random.integer(0, 200))}D**!`);
      await embed.setFooter(this.client.version);
    } else {
      await embed.setColor(this.client.color);
      await embed.setDescription(`**${user}**'s size is:\n**${big[user.id]}**!`);
      await embed.setFooter(this.client.version);
    }
    return msg.embed(embed);
  }
};
