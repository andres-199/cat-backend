import { IUserRepository } from '../../domain/repositories/IUserRepository.js'
import { User } from '../../domain/entities/User.js'

export const createUserRepository = (model: any): IUserRepository => ({
	findByUsername: async (username: string): Promise<User | null> => {
		return await model.findOne({ username }).lean()
	},
	create: async (user: User): Promise<User> => {
		const newUser = new model(user)
		await newUser.save()
		return newUser.toObject()
	}
})
