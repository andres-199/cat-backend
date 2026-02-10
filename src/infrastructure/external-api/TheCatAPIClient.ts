import axios from 'axios'
import { Breed, CatImage } from '../../domain/entities/Breed.js'

export type ICatAPIClient = {
	getBreeds: () => Promise<Breed[]>
	getBreedById: (id: string) => Promise<Breed>
	searchBreeds: (query: string) => Promise<Breed[]>
	getImagesByBreedId: (breedId: string) => Promise<CatImage[]>
}

export const createTheCatAPIClient = (baseUrl: string, apiKey: string): ICatAPIClient => {
	return {
		getBreeds: async (): Promise<Breed[]> => {
			const response = await axios.get(`${baseUrl}/breeds`, {
				headers: { 'x-api-key': apiKey }
			})
			return response.data
		},
		getBreedById: async (id: string): Promise<Breed> => {
			const response = await axios.get(`${baseUrl}/breeds/${id}`, {
				headers: { 'x-api-key': apiKey }
			})
			return response.data
		},
		searchBreeds: async (query: string): Promise<Breed[]> => {
			const response = await axios.get(`${baseUrl}/breeds/search?q=${query}`, {
				headers: { 'x-api-key': apiKey }
			})
			return response.data
		},
		getImagesByBreedId: async (breedId: string): Promise<CatImage[]> => {
			const response = await axios.get(`${baseUrl}/images/search?breed_ids=${breedId}&limit=10`, {
				headers: { 'x-api-key': apiKey }
			})
			return response.data
		}
	}
}
