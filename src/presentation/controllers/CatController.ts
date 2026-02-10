import { Request, Response } from 'express'

export const createCatController = (
	getBreedsUseCase: { execute: () => Promise<any> },
	getBreedByIdUseCase: { execute: (id: string) => Promise<any> },
	searchBreedsUseCase: { execute: (q: string) => Promise<any> }
) => ({
	getBreeds: async (_req: Request, res: Response) => {
		try {
			const breeds = await getBreedsUseCase.execute()
			res.json(breeds)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	getBreedById: async (req: Request, res: Response) => {
		try {
			const { breed_id } = req.params
			const breed = await getBreedByIdUseCase.execute(breed_id)
			res.json(breed)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	searchBreeds: async (req: Request, res: Response) => {
		try {
			const { q } = req.query
			const breeds = await searchBreedsUseCase.execute(q as string)
			res.json(breeds)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	}
})
