import { ICatRepository } from '../../domain/repositories/ICatRepository.js'
import { Breed, CatImage } from '../../domain/entities/Breed.js'
import { ICatAPIClient } from '../external-api/TheCatAPIClient.js'

export const createCatRepository = (apiClient: ICatAPIClient): ICatRepository => {
	return {
		getBreeds: async (): Promise<Breed[]> => {
			return await apiClient.getBreeds()
		},
		getBreedById: async (id: string): Promise<Breed> => {
			return await apiClient.getBreedById(id)
		},
		searchBreeds: async (query: string): Promise<Breed[]> => {
			return await apiClient.searchBreeds(query)
		},
		getImagesByBreedId: async (breedId: string): Promise<CatImage[]> => {
			return await apiClient.getImagesByBreedId(breedId)
		}
	}
}
