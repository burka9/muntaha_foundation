import bcrypt from 'bcrypt'
import { Request, Response } from "express";
import { UserLog } from '../../database/log';
import { User } from "../../database/user";
import { logger } from "../../logger";
import { LoginRequest, LoginResponse } from '../../types/session';
import commonReponseError from "../../util/commonReponseError";

export async function login(req: Request, res: Response) {
	const { username, password }: LoginRequest = req.body
	logger.info(`login called by ${username}`)

	try {
		let user = (await User.fetchByUsername(username || '', true))[0]
		if (!user) throw new Error('no user found')

		if (bcrypt.compareSync(password, (user.password || ''))) {
			let userLog = await UserLog.create({ username,
				active: true
			})

			let response: LoginResponse = {
				username,
				type: user.user_type || '',
				token: userLog.token
			}
			
			return res.status(200).json(response)
		}

		throw new Error('invalid credentials')
	} catch(err: any) {
		commonReponseError(err, res)
	}
}