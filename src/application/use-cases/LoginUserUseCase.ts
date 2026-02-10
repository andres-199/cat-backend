import { IUserRepository } from '../../domain/repositories/IUserRepository.js'
import { User } from '../../domain/entities/User.js'
import { IHashService } from '../ports/IHashService.js'
import { IAuthService } from '../ports/IAuthService.js'

export const createLoginUserUseCase = (
	userRepository: IUserRepository,
	hashService: IHashService,
	authService: IAuthService
) => ({
	execute: async (username: string, password: string): Promise<{ user: User, token: string } | null> => {
		const user = await userRepository.findByUsername(username)
		if (!user || !user.password) return null

		const isPasswordValid = await hashService.compare(password, user.password)
		if (!isPasswordValid) return null

		const token = authService.generateToken({ id: user.id, username: user.username })

		const { password: _, ...userWithoutPassword } = user
		return { user: userWithoutPassword, token }
	}
})
