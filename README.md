# G-Drive Clone

This project is a simple Google Drive clone that allows users to upload, download, view, and delete their files. The application is built using Node.js, Express, Firebase, and MongoDB, with authentication and file management capabilities.

## Features

- **User Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **File Upload**: Upload files to Firebase Storage with multer for handling file uploads.
- **File Download**: Generate signed URLs for secure file downloads.
- **File Deletion**: Delete files from Firebase Storage and the database.
- **Home Page**: Display uploaded files with user-specific filtering.
- **Logout Functionality**: Secure logout by clearing cookies.

## Project Structure

```plaintext
├── config
│   ├── db.connection.js          # MongoDB connection configuration
│   ├── firebase.config.js        # Firebase configuration
│   ├── multer.config.js          # Multer configuration for file uploads
├── middlewares
│   ├── auth.js                   # Middleware for authentication
├── models
│   ├── files.models.js           # File schema for MongoDB
│   ├── userModel.js              # User schema for MongoDB
├── routes
│   ├── indexRoute.js             # Default route file
│   ├── userRoute.js              # User-related routes
├── views
│   ├── public
│   │   ├── favicon.svg
│   │   ├── home.ejs              # Home page
│   │   ├── login.ejs             # Login page
│   │   ├── register.ejs          # Registration page
│   │   ├── terms.ejs             # Terms and conditions page
├── .env                           # Environment variables
├── .gitignore                     # Git ignore file
├── app.js                         # Main application entry point
├── package.json                   # Project dependencies and scripts
```

## API Endpoints

### Home Page
**GET /home**
- Description: Displays user-specific files.
- Middleware: `authMidddleWare`

### Upload File
**POST /upload**
- Description: Upload a file to Firebase Storage and save its reference in the database.
- Middleware: `authMidddleWare`, `upload.single('file')`

### Download File
**GET /download/:path**
- Description: Generate a signed URL for secure file downloads.
- Middleware: `authMidddleWare`

### Delete File
**DELETE /delete/:path**
- Description: Deletes a file from Firebase Storage and removes its reference from the database.
- Middleware: `authMidddleWare`

### Logout
**GET /logout**
- Description: Clears the authentication token and redirects to the home page.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/priyanshuk6395/g-drive.git
   ```

2. Navigate to the project directory:
   ```bash
   cd g-drive
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables in the `.env` file:
   ```env
   PORT=3000
   MONGO_URI=<Your MongoDB URI>
   FIREBASE_CONFIG=<Your Firebase Configuration>
   JWT_SECRET=<Your JWT Secret>
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.

## Dependencies

- **bcrypt**: For hashing passwords.
- **cookie-parser**: To parse cookies.
- **dotenv**: For managing environment variables.
- **ejs**: For server-side rendering.
- **express**: Web framework for Node.js.
- **express-validator**: For validating request data.
- **firebase-admin**: For interacting with Firebase Storage.
- **jsonwebtoken**: For secure user authentication.
- **mongoose**: MongoDB ODM for managing the database.
- **multer**: Middleware for handling file uploads.
- **multer-firebase-storage**: To store files in Firebase Storage.

## Contribution

Feel free to contribute to this project by submitting issues or pull requests. For major changes, please discuss them first by opening an issue.

## License

This project is licensed under the MIT License.

## Author

Priyanshu Kumar

## GitHub Repository

[https://github.com/priyanshuk6395/g-drive](https://github.com/priyanshuk6395/g-drive)

