# Cat API Backend

A functional-based backend for managing cat breeds and user authentication, built with Node.js and TypeScript.

## 🚀 Features

- **Breed Management**: Fetch, search, and retrieve detailed information about cat breeds.
- **Image Gallery**: Retrieve cat images by breed ID.
- **User Authentication**: Secure user registration and login using JWT and password hashing.
- **Pure Functional Design**: Implemented using a functional programming paradigm with factory functions and manual dependency injection.
- **Clean Architecture**: Decoupled layers (Domain, Application, Infrastructure, Presentation) for high maintainability.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Security**: JWT & BcryptJS
- **API Client**: Axios
- **Testing**: Jest & ts-jest

## ⚙️ Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   THE_CAT_API_URL=https://api.thecatapi.com/v1
   THE_CAT_API_KEY=your_api_key
   ```

## 📜 Available Scripts

- `npm run dev`: Start the development server with live reload.
- `npm start`: Run the production build.
- `npm test`: Execute unit tests.

## 🧪 Testing

The repository includes a comprehensive unit test suite for all application use cases using Jest.
