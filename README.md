# Healthcare Management System

A Node.js-based REST API for managing healthcare data including patients, doctors, and their mappings. This system allows healthcare administrators to efficiently manage patient-doctor relationships.

## Reference

This project takes reference code from a past mentorship project as both systems share similar architecture and functionality patterns. You can find the original reference at: [Mentorship Server](https://github.com/ujjwaljha1/Mentorship-server)

## Features

- User authentication (Register/Login)
- Patient management (CRUD operations)
- Doctor management (CRUD operations)
- Patient-Doctor mapping system
- JWT-based authorization
- PostgreSQL database integration

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone https://github.com/ujjwaljha1/HealthCare-Server
cd Test
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables
   - Copy the `.env` file and update with your database credentials
   - Update `POSTGRES_URI` with your PostgreSQL connection string
   - Set a secure `JWT_SECRET`

4. Start your PostgreSQL server and ensure the database exists

5. Run the application
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Patients (Protected Routes)
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors (Protected Routes)
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Mappings (Protected Routes)
- `GET /api/mappings` - Get all patient-doctor mappings
- `GET /api/mappings/:patientId` - Get mappings by patient ID
- `POST /api/mappings` - Create new mapping
- `DELETE /api/mappings/:id` - Delete mapping

## Usage Instructions

### 1. Register a User
```bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```
Save the returned JWT token for authenticated requests.

### 3. Create a Patient
```bash
POST /api/patients
Authorization: Bearer <your-jwt-token>
{
  "firstName": "Jane",
  "lastName": "Smith",
  "dateOfBirth": "1990-01-01",
  "phone": "+1234567890",
  "email": "jane@example.com",
  "address": "123 Main St",
  "medicalHistory": "No known allergies"
}
```

### 4. Create a Doctor
```bash
POST /api/doctors
Authorization: Bearer <your-jwt-token>
{
  "firstName": "Dr. John",
  "lastName": "Wilson",
  "specialization": "Cardiology",
  "licenseNumber": "DOC123456",
  "phone": "+1234567890",
  "email": "dr.wilson@hospital.com",
  "yearsOfExperience": 10
}
```

### 5. Create Patient-Doctor Mapping
```bash
POST /api/mappings
Authorization: Bearer <your-jwt-token>
{
  "patientId": 1,
  "doctorId": 1,
  "notes": "Regular checkup appointment"
}
```

## Authentication

All routes except registration and login require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

The system uses PostgreSQL with the following main tables:
- **Users**: System users (healthcare administrators)
- **Patients**: Patient information
- **Doctors**: Doctor information
- **Mappings**: Patient-doctor relationships

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## Development

The application uses:
- **Express.js** for the web framework
- **Sequelize** as the ORM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## Notes

- The database will automatically sync and create tables on first run
- Passwords are automatically hashed before storage
- Each user can only access their own patients
- Doctors are shared across users
- Patient-doctor mappings ensure no duplicate assignments