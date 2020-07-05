var info = require('package-info');
 const discord = require('discord.js')
 const npmGetPackageInfo = require('npm-get-package-info')


module.exports.run =async(bot,message,args)=>{
  let g = await info(args.join(' '))
  let embed = new discord.MessageEmbed()
  .setAuthor('NPM package 정보','https://cdn.glitch.com/486dc4db-f05c-428c-959e-9a9a8a80bf23%2Fnpm.png?v=1590561362450')
  .setThumbnail('https://cdn.glitch.com/486dc4db-f05c-428c-959e-9a9a8a80bf23%2Fnpm.png?v=1590561362450')
  .setTitle(g.description)
  .addField('Package Name',g.name)
  .setColor('#ff0000')
  .addField('Version',g.version)
  .addField('License',g.license)
  .addField('Homepage',g.homepage)
  .addField('Author',g.author)
message.channel.send(embed)

}
exports.config = {
  name: "npm",
  aliases: ["NPM", "npm"],
  category: ["INFO"],
  des: ["NPM 정보를 보여줍니다."],
  use: ["ㄲ npm"]
};