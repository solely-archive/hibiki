const Command = require('../../Structures/Command');
const { stripIndents } = require('common-tags');
const Tag = require('../../Models/Tag');

module.exports = class TagListCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tag-list',
      aliases: ['tags', 'list-tag', 'ahh'],
      group: 'tags',
      memberName: 'list',
      description: 'Lists all server tags.',
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3,
      },
    });
  }

  async run(msg) {
    const tags = await Tag.findAll({ where: { guildID: msg.guild.id } });
    if (!tags) return msg.say(`${msg.guild.name} doesn't have any tags, ${msg.author}. Why not add one?`);

    const usertags = tags
      .filter((tag) => !tag.type)
      .filter((tag) => tag.userID === msg.author.id)
      .map((tag) => tag.name)
      .sort()
      .join(', ');

    return msg.say(stripIndents`**❯ Tags:**
			${tags
        .filter((tag) => tag.type)
        .filter((tag) => !tag.example)
        .map((tag) => tag.name)
        .sort()
        .join(', ')}

			${
        usertags
          ? `**❯ ${msg.member.displayName}'s tags:**
				${usertags}`
          : `${msg.member.displayName} has no tags.`
      }
        `);
  }
};
