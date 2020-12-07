const reload = require("self-reload-json")
const guild = new reload("./DB/server.json")
const User = new reload("./DB/event.json")
const Discord = require("discord.js")

exports.run = async (client, msg, args, prefix) => {
    // 무작위숫자 함수
    // User[msg.author.id]가 없을 경우
    if (!User[msg.author.id]) {
        User[msg.author.id] = {
                cheast: 0,
            }
            // User 저장
        User.save()
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    let gamble = new Discord.MessageEmbed()
        .setDescription(`선물 찾기 진행하시겠습니까?`)
        .setColor("7289DA")

    msg.reply(gamble).then(async message => {
        // 반응 추가 (✅, ❎)
        await message.react("✅")
        await message.react("❎")

        // 필터 생성
        let filterYes = (reaction, user) => reaction.emoji.name === '✅' && user.id == msg.author.id

        // 반응 콜랙터 생성
        let collectorYes = message.createReactionCollector(filterYes, { max: 1, time: 60000 }) // max: 1 -> 반응은 한번만, time: 60000 -> 제한시간 60초

        // 위에 콜랙터 이벤트 생성
        collectorYes.on('collect', () => { // 반응을 할 경우
            message.delete()

            // 배율 설정
            let multiplication = getRandomInt(2, 3)

            // 성공하면 받을 금액
            let cheast = 1 * multiplication

            // 성공과 실패를 나눌 숫자
            let boolean = getRandomInt(1, 5)

            // boolean 변수가 1일 경우
            if (boolean == 1) {
                let yourcheast = User[msg.author.id].cheast + cheast
                let success = new Discord.MessageEmbed()
                    .setDescription(`당신은 선물을 ${multiplication}개 만큼 얻으셨습니다.\n\n 보유하고 있는 선물: ${yourcheast}:gift:`)
                    .setColor("7289DA")
                msg.reply(success)

                // user의 cheast는 cheast + cheast <- (위에 선언한 cheast)
                User[msg.author.id].cheast = User[msg.author.id].cheast + cheast

                // user 저장
                User.save()

                // 아닐경우
            } else {
                // 임베드에 표기할 숫자
                let yourcheast = User[msg.author.id].cheast - 0
                let fail = new Discord.MessageEmbed()
                    .setDescription(`당신은 선물 찾기를 실패하였습니다.\n\n 보유하고 있는 선물: ${yourcheast}:gift:`)
                    .setColor("7289DA")
                msg.reply(fail)

                // user의 cheast는 cheast - args[0] (건 금액)
                User[msg.author.id].cheast = User[msg.author.id].cheast - 0

                // user의 json을 저장
                User.save()
            }
        })

        // 위의 콜랙터의 이벤트 생성
        collectorYes.on('end', (_, reason) => { // 이벤트가 끝날 경우
            if (reason === "time") { // 이벤트가 끝난 사유가 time일 경우
                message.delete()
                let timeover = new Discord.MessageEmbed()
                    .setDescription("시간이 초과가 되었으니 다시 시도해주세요.")
                    .setColor("RED")
                msg.reply(timeover)
            }
        })

        // 필터 생성
        let filterNo = (reaction, user) => reaction.emoji.name === '❎' && user.id === msg.author.id

        // 콜랙터 생성
        let collectorNo = message.createReactionCollector(filterNo, { max: 1, time: 60000 })
            // 콜랙터 이벤트 생성
        collectorNo.on('collect', () => { // 반응을 할 경우
            message.delete()
            let cancel = new Discord.MessageEmbed()
                .setDescription("선물 찾기 진행을 취소하였습니다.")
                .setColor("RED")
            msg.reply(cancel)
        })
    })
}

exports.config = {
    name: '찾기',
    aliases: ['ckwrl', 'wkcrl', '찾아'],
    category: ['이벤트'],
    des: ['산타 선물을 찾습니다.'],
    use: ['ㄲ 찾기']
}
