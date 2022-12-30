import 'dotenv/config'
import { createLogger, transports, format } from 'winston'
import TransportStream from 'winston-transport'


const { timestamp, combine, printf } = format

const customFormat = combine(
	timestamp(),
	printf(({ timestamp, level, message }) => `${timestamp} - [${level.toUpperCase().padEnd(5)}] ${message}`)
)

const setLogger = (level: string, filename?: string) => {
	const customLevel = process.env.LOG_LEVEL || level
	
	let t: TransportStream[] = [ new transports.Console({ level: customLevel }) ]

	if (filename && filename !== '')
		t.push(new transports.File({ filename }))

	return createLogger({
		level,
		transports: t,
		format: customFormat
	})
}

const infoLogger = setLogger('info')
const errorLogger = setLogger('error')
const verboseLogger = setLogger('verbose')

export const logger = {
	info: (log: string) => infoLogger.info(log),
	error: (log: string) => errorLogger.error(log),
	verbose: (log: string) => verboseLogger.verbose(log),
}