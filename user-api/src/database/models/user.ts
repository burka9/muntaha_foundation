import bcrypt from 'bcrypt'
import { Sequelize, DataTypes, ModelStatic, ENUM } from 'sequelize'
import { logger } from '../../logger'

const { STRING, INTEGER } = DataTypes

let User: ModelStatic<any> | null = null


export function createUser(user: any): Promise<void> {
	if (User === null) throw new Error('user is not defined')
	return User.create(user)
}

export function fetchUser(): Promise<any> {
	if (User === null) throw new Error('user is not defined')
	return User.findAll()
}

// export function editUser({ id, name, username, password }: {
// 	id: int,
// 	name: string,
// 	username: string,
// 	password: string
// }): Promise<void> {
// 	if (User === null) throw new Error('user is not defined')
// 	return User.update()
// }

export function deleteUser(id: number): Promise<number> {
	if (User === null) throw new Error('user is not defined')
	return User.destroy({
		where: { id }
	})
}

export const initUser = (sequelize: Sequelize) => {
	logger.info('creating user table')
	
	User = sequelize.define('user', {
		id: {
			type: INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: STRING
		},
		username: {
			type: STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: STRING,
			allowNull: false
		},
		user_type: {
			type: ENUM,
			allowNull: false,
			values: ['ADMINISTRATOR', 'REGISTRATION_OFFICER', 'ATTENDANCE_OFFICER', 'DATA_ENCODER']
		}
	}, {
		hooks: {
			beforeCreate: (user: any) => {
				user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
			}
		}
	})
}