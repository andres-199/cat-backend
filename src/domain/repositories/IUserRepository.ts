import { User } from '../entities/User.js'

export interface IUserRepository {
	findByUsername(username: string): Promise<User | null>
	create(user: User): Promise<User>
}
