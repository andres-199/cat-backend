import { Request, Response } from 'express'

export const createUserController = (
	loginUserUseCase: { execute: (u: string, p: string) => Promise<any> },
	registerUserUseCase: { execute: (data: any) => Promise<any> }
) => ({
	login: async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body
			const result = await loginUserUseCase.execute(username, password)
			if (!result) return res.status(401).json({ message: 'Invalid credentials' })
			res.json(result)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	register: async (req: Request, res: Response) => {
		try {
			const userData = req.body
			const user = await registerUserUseCase.execute(userData)
			res.status(201).json(user)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	getMe: async (req: Request, res: Response) => {
		res.json((req as any).user)
	}
})
