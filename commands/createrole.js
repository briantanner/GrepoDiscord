"use strict";

const util = require('util');

module.exports = {
  name: "createrole",
  description: "Add user to role.",
  usage: "createrole <role>",
  permissions: "manageServer",
  callback: function (msg, command, args) {
    let bot = this.bot;

    if (!args.length) {
      let msgArray = [];
      msgArray.push("```\n");
      msgArray.push(module.exports.description);
      msgArray.push(util.format("Usage: %s", module.exports.usage));
      msgArray.push("```");
      return bot.sendMessage(msg.channel, msgArray);
    }

    if (!msg.channel.server) {
      return bot.sendMessage(msg.author, "I can't do that in DM");
    }

    if (!msg.channel.permissionsOf(bot.user).hasPermission("manageRoles")) {
      return bot.sendMessage(msg.channel, "I don't have permission to do that on this server.");
    }

    console.log(args[0]);

    var role = {
      name: args[0],
      color: 0x3498db,
      hoist: true
    };

    bot.createRole(msg.channel.server, role, () => {
      bot.sendMessage(msg.channel, util.format("Created role %s", args[0]));
    });
  }
};