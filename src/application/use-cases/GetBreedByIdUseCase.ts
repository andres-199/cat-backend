import { ICatRepository } from '../../domain/repositories/ICatRepository.js'
import { Breed } from '../../domain/entities/Breed.js'

export const createGetBreedByIdUseCase = (catRepository: ICatRepository) => ({
	execute: async (id: string): Promise<Breed> => {
		return await catRepository.getBreedById(id)
	}
})
