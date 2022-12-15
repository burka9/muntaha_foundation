import 'dotenv/config'
import http from 'http'
import express from 'express'
import { logger } from './logger'
import routes from './routes'
import { initDatabase } from './database/config'


// get console arguments
const host = process.env.SERVER_HOST || '127.0.0.1'
const port = parseInt(process.env.SERVER_PORT || '4000')
let retry = 0


// init routes
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v0', routes)

if (process.env.NODE_ENV === 'development')
	app.get('/ping', (req: express.Request, res: express.Response) => res.send('pong'))


// init database
initDatabase()


// init server
const server = http.createServer(app)
server
	.listen(port, host, () => logger.info(`server started: ${host}:${port + retry}`))
	.on('error', (error: any) => {
		if (error.code === 'EADDRINUSE') {
			logger.info(`Address in use. Retrying... ${retry}`)
			setTimeout(() => {
				server.close()
				retry ++
				server.listen((port + retry), host)
			}, 1000)
		}
	})