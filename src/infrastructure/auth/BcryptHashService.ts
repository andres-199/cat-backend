import bcrypt from 'bcryptjs'
import { IHashService } from '../../application/ports/IHashService.js'

export const bcryptHashService: IHashService = {
	hash: async (data: string): Promise<string> => {
		return await bcrypt.hash(data, 10)
	},
	compare: async (data: string, encrypted: string): Promise<boolean> => {
		return await bcrypt.compare(data, encrypted)
	}
}
