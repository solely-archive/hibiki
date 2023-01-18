const Command = require('../../Structures/Command');

module.exports = class Aesthetic extends Command {
  constructor(client) {
    super(client, {
      name: 'aesthetic',
      aliases: ['vaporwave'],
      group: 'text-edit',
      memberName: 'aesthetic',
      description: 'Make your text a e s t h e t i c.',
      args: [
        {
          key: 'text',
          prompt: 'What text would you like to aesthetic-ify?\n',
          type: 'string',
        },
      ],
    });
  }

  vaporwave(input) {
    return input
      .replace(
        /[a-zA-Z0-9!\?\.'";:\]\[}{\)\(@#\$%\^&\*\-_=\+`~><]/g, // eslint-disable-line
        (c) => String.fromCharCode(0xfee0 + c.charCodeAt(0))
      )
      .replace(/ /g, '　');
  }
  run(msg, { text }) {
    return msg.say(this.vaporwave(text));
  }
};
