# Chattrix

Chattrix is a real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) that leverages Socket.io for instant, bidirectional communication. It enables users to exchange messages and share images seamlessly, providing a smooth and interactive chatting experience.

## Live Demo

You can try Chattrix live here:  
**[Live App Link](https://your-live-app-link.com)**

## Screenshots

### Login Page
![Login Page](./screenshots/login.png)

### Chat Interface
![Chat Interface](./screenshots/chat.png)

### Profile Page
![Profile Page](./screenshots/profile.png)

## Features

- **User Authentication:** Sign up, log in, and secure sessions with JWT.
- **Profile Management:** Update your name, bio, and profile picture.
- **Real-Time Chat:** Send and receive messages instantly using Socket.IO.
- **Media Sharing:** Share images in chat.
- **Online Status:** See which users are online.
- **Responsive UI:** Modern design with Tailwind CSS.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router, React Hot Toast
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO, Cloudinary (for image uploads)
- **Authentication:** JWT
- **State Management:** React Context API

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### Environment Variables

- Create a `.env` file in the `Server` directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

- Create a `.env` file in the `Client` directory:

```
VITE_BACKEND_URL="http://localhost:5000"
```

### Installation

#### Backend

```bash
cd Server
npm install
npm run server
```

#### Frontend

```bash
cd Client
npm install
npm run dev
```

The client will run on [http://localhost:5173](http://localhost:5173) by default.

## Usage

1. Register a new account or log in.
2. Update your profile if desired.
3. Start chatting with other users in real time.
4. Share images and see online status.

## Scripts

**Backend:**

- `npm run server` — Start backend with nodemon
- `npm start` — Start backend with node

**Frontend:**

- `npm run dev` — Start frontend in development mode
- `npm run build` — Build frontend for production

## Contribution

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Push to your fork and submit a pull request.

Please open an issue first if you want to discuss a major change.

## License

This project is for educational purposes.