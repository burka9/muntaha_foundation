import 'dotenv/config'
import { copyFileSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import multer from 'multer'

const uniquePrefix = (): string => Date.now() + '-' + Math.round(Math.random() * 1E9)

const storage = (destination = 'uploads') => multer.diskStorage({
	destination(req, file, callback) {
		callback(null, destination)
	},
	filename(req, file, callback) {
    callback(null, `${uniquePrefix()}-${file.originalname}`)
	},
})


export const visitUploadHandler = multer({ storage: storage(process.env.VISITED_USER_UPLOAD_PATH) })
	.fields([
		{ name: 'image', maxCount: 1},
		{ name: 'recording', maxCount: 1}
	])

export const beneficiaryUploadHandler = multer({ storage: storage(process.env.BENEFICIARY_UPLOAD_PATH) })
	.fields([
		{ name: 'image', maxCount: 1}
	])

export function deleteFile(filepath: string): void {
	unlinkSync(resolve(filepath))
}

export function copyFile(originalPath: string, newPath: string): void {
	try {
		copyFileSync(resolve(originalPath), resolve(newPath))
	} catch(err) {}
}
