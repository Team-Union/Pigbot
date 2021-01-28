const express = require('express');
const app = express();
const http = require('http');
const url = require('url');
const qs = require('querystring');
const axios = require('axios');
const fs = require('fs');
const Discord = require('discord.js');


 module.exports = {
        create: function (client, option) {

            app.get('/api/', function (_req, res) {
                res.send('{ "message" : "Hello World" }');
            });

            app.get('/', function (_req, res) {
                res.send('여기왜 옴?');
            });
            function avatar(user) {
                if (user.avatar) {
                    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=2048`;
                } else {
                    return `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`;
                }
            }
            function componentToHex(c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }
            setInterval(() => {
                axios.get(process.env.WEBSITE).then();
            }, 600000);
            function makeHTML(client) {
                return `<!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="utf-8">
                    <meta name="keywords" content=${client.user.username}>
                    <meta name="description" content="사이트임">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                    body {
                    font-family: '맑은 고딕', 'Malgun Gothic', sans-serif;
                    color: black;
                    }
                    </style>
                    <title>
                    ${client.user.username}
                    </title>
                    <link rel='icon' href=${client.user.displayAvatarURL({
                    dynamic: true
                })}>
                    </head>
                    <body>
                    <h1>${client.user.username}</h1>
                    <h2>봇의 핑</h2>
                    <p>
                    API 지연 시간: ${client.ws.ping}
                    </p>
                    <h2>초대하기</h2>
                    <p>
                    <form action="/login">
                    <input type="submit" value="로그인">
                    </form>
                    </p>
                    <img src=${client.user.displayAvatarURL({
                    dynamic: true
                })}>
                    <p>
                    <iframe src="https://discordapp.com/widget?id=688681923698229294&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
                    </p>
                    </body>
                    </html>
                    `;
            }

            app.listen(5380, () => {
                console.log("Server is Ready!");
            });
        }
};

