const os = require("os");
module.exports.run = async (bot, message, args) => {
  message.channel.send(
    `\`\`\`SERVER INFO-->\nCPU INFO -->\nCPU MODEL = ${os.cpus.model}\nCPU CLOCK SPEED = ${os.cpus.speed} MHz\nCPU IDLE TIME = ${os.cpus.idle} ms\n----------------------------------------\nMEMORY INFO -->\nTOTAL MEMORY = ${os.totalmem} MB\nFREE MEMORY = ${os.freemem} MB\`\`\``
  );
};
exports.config = {
  name: "시스템정보",
  aliases: ["help", "bothelp"],
  category: ["ADMIN"],
  des: ["도움말에 대한 설명"],
  use: ["ㄲ 시스템정보"]
};
