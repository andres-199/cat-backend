import { ICatRepository } from '../../domain/repositories/ICatRepository.js'
import { Breed } from '../../domain/entities/Breed.js'

export const createGetBreedsUseCase = (catRepository: ICatRepository) => ({
	execute: async (): Promise<Breed[]> => {
		return await catRepository.getBreeds()
	}
})
