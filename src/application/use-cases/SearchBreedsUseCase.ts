import { ICatRepository } from '../../domain/repositories/ICatRepository.js'
import { Breed } from '../../domain/entities/Breed.js'

export const createSearchBreedsUseCase = (catRepository: ICatRepository) => ({
	execute: async (query: string): Promise<Breed[]> => {
		return await catRepository.searchBreeds(query)
	}
})
