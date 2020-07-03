const fetch = require('node-fetch')
const BASEURL = 'https://api.koreanbots.dev'
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMjg1NzAxNjUzOTg3MzM3MiIsImlhdCI6MTU5MTQ1MTIyMywiZXhwIjoxNjIzMDA4ODIzfQ.LkpQAoAuAOA_wrBlKhuRQ7Jp2yMg3bLU6M3vR6u-hEpXQ56ewP6kZCGf7Vuu9empyLA6CRbENK4r74Yr_PgvDdQNHuvvWWgdkazskR1B0_FiHF0v2c0HgNHUcDYS3MtEIapFOJ6MwJhr3FVpGhGQhBRurJUSl2OoGu--f9SVf6o'
const serverCount = 100 // 서버 수
const userID = '552103947662524416'

fetch(BASEURL + '/bots/servers', { method: 'POST', headers: { token, 'Content-Type': 'application/json' }, body: JSON.stringify({ servers: serverCount }) })
	.then(r=> console.log(r.json())
	.catch(e=> console.error(e))>

fetch(BASEURL + '/bots/voted/' + userID, { headers: { token } })
	.then(r=> r.json()).then(r=> console.log(r))
	.catch(e=> console.error(e))>