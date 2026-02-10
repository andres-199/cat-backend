import jwt from 'jsonwebtoken'
import { IAuthService } from '../../application/ports/IAuthService.js'

export const createJwtAuthService = (secret: string, expiresIn: string = '1h'): IAuthService => {
	return {
		generateToken: (payload: object): string => {
			return jwt.sign(payload, secret as jwt.Secret, { expiresIn: expiresIn as any })
		},
		verifyToken: (token: string): any => {
			return jwt.verify(token, secret)
		}
	}
}
