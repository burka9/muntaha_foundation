import { createLogger, transports, format } from 'winston'
import TransportStream from 'winston-transport'


const { timestamp, combine, printf } = format

const customFormat = combine(
	timestamp(),
	printf(({ timestamp, level, message }) => `${timestamp} - [${level.toUpperCase().padEnd(5)}] ${message}`)
)

const setLogger = (level: string, filename?: string) => {
	let t: TransportStream[] = [ new transports.Console() ]

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

export const logger = {
	info: (log: string) => infoLogger.info(log),
	error: (log: string) => errorLogger.error(log)
}