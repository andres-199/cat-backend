import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'


import { createCatRepository } from './infrastructure/external-api/CatRepository.js'
import { createTheCatAPIClient } from './infrastructure/external-api/TheCatAPIClient.js'
import { createUserRepository } from './infrastructure/database/UserRepository.js'
import { UserModel } from './infrastructure/database/UserModel.js'
import { bcryptHashService } from './infrastructure/auth/BcryptHashService.js'
import { createJwtAuthService } from './infrastructure/auth/JwtAuthService.js'


import { createGetBreedsUseCase } from './application/use-cases/GetBreedsUseCase.js'
import { createGetBreedByIdUseCase } from './application/use-cases/GetBreedByIdUseCase.js'
import { createSearchBreedsUseCase } from './application/use-cases/SearchBreedsUseCase.js'
import { createGetImagesByBreedIdUseCase } from './application/use-cases/GetImagesByBreedIdUseCase.js'
import { createLoginUserUseCase } from './application/use-cases/LoginUserUseCase.js'
import { createRegisterUserUseCase } from './application/use-cases/RegisterUserUseCase.js'


import { createCatController } from './presentation/controllers/CatController.js'
import { createImageController } from './presentation/controllers/ImageController.js'
import { createUserController } from './presentation/controllers/UserController.js'


import { authMiddleware } from './presentation/middlewares/AuthMiddleware.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || ''
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const CAT_API_URL = process.env.THE_CAT_API_URL || ''
const CAT_API_KEY = process.env.THE_CAT_API_KEY || ''


const apiClient = createTheCatAPIClient(CAT_API_URL, CAT_API_KEY)
const catRepo = createCatRepository(apiClient)
const userRepo = createUserRepository(UserModel)
const hashService = bcryptHashService
const authService = createJwtAuthService(JWT_SECRET)

const getBreedsUC = createGetBreedsUseCase(catRepo)
const getBreedByIdUC = createGetBreedByIdUseCase(catRepo)
const searchBreedsUC = createSearchBreedsUseCase(catRepo)
const getImagesUC = createGetImagesByBreedIdUseCase(catRepo)
const loginUC = createLoginUserUseCase(userRepo, hashService, authService)
const registerUC = createRegisterUserUseCase(userRepo, hashService)

const catController = createCatController(getBreedsUC, getBreedByIdUC, searchBreedsUC)
const imageController = createImageController(getImagesUC)
const userController = createUserController(loginUC, registerUC)


const router = express.Router()


router.get('/breeds', (req, res) => catController.getBreeds(req, res))
router.get('/breeds/search', (req, res) => catController.searchBreeds(req, res))
router.get('/breeds/:breed_id', (req, res) => catController.getBreedById(req, res))


router.get('/imagesbybreedid', (req, res) => imageController.getImagesByBreedId(req, res))


router.post('/login', (req, res) => userController.login(req, res))
router.post('/register', (req, res) => userController.register(req, res))
router.get('/me', authMiddleware, (req, res) => userController.getMe(req, res))

app.use('/api', router)

mongoose.connect(MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB')
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`)
		})
	})
	.catch(err => console.error('MongoDB connection error:', err))
