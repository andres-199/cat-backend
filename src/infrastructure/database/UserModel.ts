import { Schema, model } from 'mongoose'
import { User } from '../../domain/entities/User.js'

const userSchema = new Schema<User>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

export const UserModel = model<User>('User', userSchema)
