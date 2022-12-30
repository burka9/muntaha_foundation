import { Server as httpServer } from "http";
import { Server } from "socket.io";
import { logger } from "../logger";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from '../types/socket'

let io

export const initSocket = (server: httpServer) => {
	io = new Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>(server)
	
	io.on('connection', socket => {
		logger.info(`socket ${socket.id} connected`)

		socket.on('disconnect', () => {
			logger.info(`socket ${socket.id} disconnected`)
		})
	})
	
	logger.info('web socket listening...')
}