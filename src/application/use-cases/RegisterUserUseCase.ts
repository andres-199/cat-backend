import { IUserRepository } from '../../domain/repositories/IUserRepository.js'
import { User } from '../../domain/entities/User.js'
import { IHashService } from '../ports/IHashService.js'

export const createRegisterUserUseCase = (
	userRepository: IUserRepository,
	hashService: IHashService
) => ({
	execute: async (userData: User): Promise<User> => {
		if (!userData.password) throw new Error('Password is required')

		const hashedPassword = await hashService.hash(userData.password)
		const newUser = await userRepository.create({
			...userData,
			password: hashedPassword
		})

		const { password: _, ...userWithoutPassword } = newUser
		return userWithoutPassword
	}
})
