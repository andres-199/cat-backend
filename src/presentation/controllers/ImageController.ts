import { Request, Response } from 'express'

export const createImageController = (
	getImagesByBreedIdUseCase: { execute: (id: string) => Promise<any> }
) => ({
	getImagesByBreedId: async (req: Request, res: Response) => {
		try {
			const { breed_id } = req.query
			if (!breed_id) return res.status(400).json({ message: 'breed_id is required' })
			const images = await getImagesByBreedIdUseCase.execute(breed_id as string)
			res.json(images)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	}
})
