# Real Estate Backend with Multiple Roles

A Node.js backend application for managing real estate tokenization with multiple user roles (Admin, Node Operator, and User).

## Features

- Multiple user roles (Admin, Node, User)
- User KYC and real estate information management
- ETH address integration
- Authentication using JWT
- API key protection for specific routes
- Advanced filtering, sorting, and pagination

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
```

## API Endpoints

### Admin Routes
Base URL: `/api/v1/admin`

- **POST /signup** - Create admin account
  ```json
  {
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "password123",
    "ethAddress": "0x123..."
  }
  ```

- **POST /login** - Admin login
- **GET /users** - Get all users
- **GET /nodes** - Get all nodes
- **PATCH /nodes/:id/approve** - Approve a node

### Node Routes
Base URL: `/api/v1/node`

- **POST /signup** - Create node account
  ```json
  {
    "name": "Node Name",
    "email": "node@example.com",
    "password": "password123",
    "ethAddress": "0x123...",
    "vaultAddress": "0xvault...",
    "paymentToken": "0xtoken...",
    "signature": "0xsig..."
  }
  ```

- **POST /login** - Node login

### User Routes
Base URL: `/api/v1/user`

- **POST /register** - Register new user
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123",
    "ethAddress": "0x123...",
    "country": "USA",
    "state": "California",
    "address": "123 Main St",
    "kycType": "passport",
    "kycId": "AB123456",
    "realEstateInfo": "2 bedroom apartment",
    "currentEstateCost": 200000,
    "percentageToTokenize": 50,
    "signature": "0xsig..."
  }
  ```

- **GET /all** - Get all users with filtering and sorting
  - Query Parameters:
    - `sort`: Sort by fields (e.g., ?sort=name,-createdAt)
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `fields`: Select specific fields (e.g., ?fields=name,ethAddress)
    - Field filters (e.g., ?country=USA&currentEstateCost[gte]=100000)

- **GET /eth/:ethAddress** - Get user by ETH address
  - Requires API key (123) in x-api-key header

- **GET /profile/:id** - Get user profile
- **PATCH /profile/:id** - Update user profile

## Query Examples

1. Get all users sorted by creation date:
```
GET /api/v1/user/all?sort=-createdAt
```

2. Get users from a specific country with pagination:
```
GET /api/v1/user/all?country=USA&page=1&limit=10
```

3. Get users with estate cost greater than a value:
```
GET /api/v1/user/all?currentEstateCost[gte]=100000
```

4. Get specific user fields:
```
GET /api/v1/user/all?fields=name,ethAddress,country
```

5. Get user by ETH address (requires API key):
```
GET /api/v1/user/eth/0x123...
Header: x-api-key: 123
```

## Error Handling

The API uses standard HTTP response codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Development

To start the development server with auto-reload:
```bash
npm run dev
```

To start the production server:
```bash
npm start
```

## Security Features

- JWT authentication for protected routes
- API key protection for specific endpoints
- Password hashing
- Request rate limiting
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
