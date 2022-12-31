import 'dotenv/config'
import { Server as httpServer } from "http";
import { Server } from "socket.io";
import { Beneficiary } from "../database/beneficiary";
import { OrderList } from "../database/orderList";
import { logger } from "../logger";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from '../types/socket'

let io: Server<any>

async function getPresentCount(): Promise<number> {
	return (await OrderList.fetchAll()).length
}

async function getMealServed(): Promise<number> {
	return (await OrderList.fetchAll({ active: false })).length
}

async function getBeneficiaryCount(): Promise<number> {
	return (await Beneficiary.fetchAll()).length
}

export async function emitPresentCount(): Promise<void> {
	if (io === undefined) throw new Error('socket not defined')
	io.sockets.emit('presentCount', (await getPresentCount()))
}

export async function emitMealServed(): Promise<void> {
	if (io === undefined) throw new Error('socket not defined')
	io.sockets.emit('mealServed', (await getMealServed()) * 2)
}

export async function emitBeneficiaryCount(): Promise<void> {
	if (io === undefined) throw new Error('socket not defined')
	io.sockets.emit('beneficiaryCount', (await getBeneficiaryCount()))
}

export const initSocket = (server: httpServer) => {
	io = new Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>(server)
	
	// new socket connection
	io.on('connection', socket => {
		logger.info(`socket ${socket.id} connected`)

		socket.on('disconnect', () => {
			logger.info(`socket ${socket.id} disconnected`)
		})

		// get present count
		socket.on('getPresentCount', async () => {
			socket.emit('presentCount', (await getPresentCount()))
		})

		// get meal served
		socket.on('getMealServed', async () => {
			socket.emit('mealServed', (await getMealServed()))
		})

		// get beneficiary count
		socket.on('getBeneficiaryCount', async () => {
			socket.emit('beneficiaryCount', (await getBeneficiaryCount()))
		})
		
		// for development purpose
		if (process.env.NODE_ENV === 'development') {
			socket.on('test_events', () => {
				logger.debug('testing socket events')
				emitPresentCount()
				emitMealServed()
				emitBeneficiaryCount()
			})
		}
	})
	
	logger.info('web socket listening...')
}