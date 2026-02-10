import { Breed, CatImage } from '../entities/Breed.js'

export interface ICatRepository {
	getBreeds(): Promise<Breed[]>
	getBreedById(id: string): Promise<Breed>
	searchBreeds(query: string): Promise<Breed[]>
	getImagesByBreedId(breedId: string): Promise<CatImage[]>
}
