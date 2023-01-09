import 'dotenv/config'
import { createServer } from 'http'
import express from 'express'
import { logger } from './logger'
import routes from './routes'
import { initDatabase } from './database/config'
import { mkdirSync } from 'fs'
import { initSocket } from './socket'
import { resolve } from 'path'


// get console arguments
const host = process.env.SERVER_HOST || '127.0.0.1'
const port = parseInt(process.env.SERVER_PORT || '4000')
let retry = 0


// init routes
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v0', routes)

// static files url
app.use('/api/v0/attendance/assets', express.static(process.env.STATIC_ASSETS_PATH || 'public'))
app.use('/api/v0/attendance/assets', express.static(process.env.VISITED_USER_UPLOAD_PATH || 'uploads'))
app.use('/api/v0/attendance/assets', express.static(process.env.BENEFICIARY_UPLOAD_PATH || 'uploads/beneficiary'))

if (process.env.NODE_ENV === 'development')
	app.get('/ping', (req: express.Request, res: express.Response) => res.send('pong'))


// init database
initDatabase()

// create directories
mkdirSync(process.env.STATIC_ASSETS_PATH || 'public', { recursive: true })
mkdirSync(process.env.VISITED_USER_UPLOAD_PATH || 'uploads', { recursive: true })
mkdirSync(process.env.BENEFICIARY_UPLOAD_PATH || 'uploads/beneficiary', { recursive: true })


// init server
const server = createServer(app)
server
	.listen(port, host, () => {
		initSocket(server)
		logger.info(`server started: ${host}:${port + retry}`)
	})
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