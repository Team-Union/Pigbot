const os = require("os");
module.exports.run = async (bot, message, args) => {
  message.channel.send(
    `\`\`\`SERVER INFO-->\nCPU INFO -->\nCPU MODEL = ${os.cpus.model}\nCPU CLOCK SPEED = ${os.cpus.speed} MHz\nCPU IDLE TIME = ${os.cpus.idle} ms\n----------------------------------------\nMEMORY INFO -->\nTOTAL MEMORY = ${os.totalmem} B\nFREE MEMORY = ${os.freemem} B\`\`\``
  );
};
exports.config = {
  name: "시스템정보",
  aliases: ["system", "osinfo"],
  category: ["관리자"],
  des: ["시스템 상태를 알립니다."],
  use: ["ㄲ 시스템정보"]
};
