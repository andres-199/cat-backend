import { ICatRepository } from '../../domain/repositories/ICatRepository.js'
import { CatImage } from '../../domain/entities/Breed.js'

export const createGetImagesByBreedIdUseCase = (catRepository: ICatRepository) => ({
	execute: async (breedId: string): Promise<CatImage[]> => {
		return await catRepository.getImagesByBreedId(breedId)
	}
})
