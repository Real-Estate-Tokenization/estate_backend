# Real Estate Backend with Multiple Roles

A comprehensive Node.js backend application for real estate tokenization platform. This system enables secure management of real estate assets through blockchain technology, featuring multi-role authentication, KYC verification, and advanced real estate management capabilities.

## Key Features

### Authentication & Authorization
- Multi-role user system (Admin, Node Operator, User)
- JWT-based authentication with refresh token mechanism
- Role-based access control (RBAC)
- Signature verification for blockchain transactions
- Session management and token blacklisting

### Security
- Password hashing using bcrypt with salt rounds
- API key validation for sensitive endpoints
- Rate limiting to prevent brute force attacks
- CORS configuration with whitelisted origins
- XSS protection and security headers
- Request data validation and sanitization
- SQL injection prevention
- Secure HTTP-only cookies

### Real Estate Management
- Property tokenization system
- Real estate value assessment
- Percentage-based tokenization
- Property documentation management
- Transaction history tracking
- Asset verification system

### User Management
- Comprehensive KYC verification system
- User profile management
- ETH address validation and verification
- Role-specific permissions
- Activity logging and monitoring

### System Features
- Advanced filtering, sorting, and pagination
- Comprehensive error handling and logging
- Database indexing for optimized queries
- Caching system for improved performance
- Automated backup system
- Request rate limiting
- Input validation and sanitization

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Passport.js
- **Validation**: Express-validator
- **Security**: Helmet.js, CORS, Rate-limit
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Logging**: Winston
- **Development**: Nodemon, ESLint, Prettier

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd estate_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=your_mongodb_connection_string
DATABASE_PASSWORD=your_database_password

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# API Security
API_KEY=your_api_key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Blockchain Configuration
BLOCKCHAIN_NETWORK=ethereum
SMART_CONTRACT_ADDRESS=your_contract_address

# Email Configuration (optional)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=your_username
EMAIL_PASSWORD=your_password
```

## Project Structure

```
estate_backend/
├── controllers/          # Route controllers
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User management
│   └── nodeController.js    # Node operations
├── middleware/          # Custom middleware
│   ├── auth.js            # Authentication middleware
│   └── validator.js       # Input validation
├── models/             # Database models
│   ├── userModel.js       # User schema
│   └── nodeModel.js       # Node schema
├── routes/             # API routes
│   ├── adminRoutes.js     # Admin endpoints
│   ├── nodeRoutes.js      # Node endpoints
│   └── userRoutes.js      # User endpoints
├── utils/             # Utility functions
│   ├── apiFeatures.js     # API utilities
│   └── errorHandler.js    # Error handling
├── config/            # Configuration files
│   └── database.js       # Database configuration
├── tests/             # Test files
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
├── logs/              # Application logs
├── docs/              # Documentation
├── .env               # Environment variables
├── server.js          # Application entry point
└── vercel.json        # Vercel deployment config
```

## API Documentation

### Authentication

#### Admin Authentication
- **POST /api/v1/admin/signup**
  - Create new admin account
  - Required fields: name, email, password, ethAddress
  - Returns: JWT token, admin details

- **POST /api/v1/admin/login**
  - Admin login
  - Required fields: email, password
  - Returns: JWT token, admin details

#### Node Authentication
- **POST /api/v1/node/signup**
  - Register new node operator
  - Required fields: name, email, password, ethAddress, vaultAddress, paymentToken, signature
  - Returns: JWT token, node details

- **POST /api/v1/node/login**
  - Node operator login
  - Required fields: email, password
  - Returns: JWT token, node details

#### User Authentication
- **POST /api/v1/user/register**
  - Register new user
  - Required fields: name, email, password, ethAddress, country, state, address, kycType, kycId
  - Optional fields: realEstateInfo, currentEstateCost, percentageToTokenize
  - Returns: JWT token, user details

### User Management

#### Admin Operations
- **GET /api/v1/admin/users**
  - Get all users
  - Query parameters supported
  - Requires: Admin authentication

- **GET /api/v1/admin/nodes**
  - Get all nodes
  - Query parameters supported
  - Requires: Admin authentication

- **PATCH /api/v1/admin/nodes/:id/approve**
  - Approve node operator
  - Requires: Admin authentication
  - Returns: Updated node details

#### User Operations
- **GET /api/v1/user/profile**
  - Get user profile
  - Requires: User authentication

- **PATCH /api/v1/user/profile**
  - Update user profile
  - Requires: User authentication
  - Returns: Updated user details

### Query Parameters

All list endpoints support these parameters:

#### Filtering
```
GET /api/v1/users?country=USA&state=California
GET /api/v1/users?currentEstateCost[gte]=100000
GET /api/v1/users?createdAt[gte]=2024-01-01
```

#### Sorting
```
GET /api/v1/users?sort=name,-createdAt
GET /api/v1/users?sort=-currentEstateCost
```

#### Pagination
```
GET /api/v1/users?page=2&limit=10
```

#### Field Selection
```
GET /api/v1/users?fields=name,email,country
```

## Error Handling

### Error Response Format
```json
{
  "status": "error",
  "message": "Detailed error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-11T16:31:45.000Z",
  "path": "/api/v1/users",
  "details": {
    "field": "email",
    "issue": "Invalid email format"
  }
}
```

### Common Error Codes
- `AUTH_001`: Authentication failed
- `AUTH_002`: Invalid token
- `AUTH_003`: Token expired
- `VAL_001`: Validation error
- `REQ_001`: Bad request
- `NOT_FOUND`: Resource not found
- `SERVER_ERROR`: Internal server error

## Development

1. Start development server:
```bash
npm run dev
```

2. Run tests:
```bash
npm run test
npm run test:coverage
```

3. Lint code:
```bash
npm run lint
npm run lint:fix
```

4. Generate API documentation:
```bash
npm run docs
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

### Deployment Checklist
- Set NODE_ENV to 'production'
- Configure production database
- Set up proper SSL/TLS certificates
- Configure production logging
- Set up monitoring and alerting
- Configure backup system
- Set up CI/CD pipeline

## Monitoring and Logging

The application uses Winston for logging with different log levels:
- ERROR: Application errors
- WARN: Warning messages
- INFO: General information
- DEBUG: Debugging information

Logs are stored in:
- `logs/error.log`: Error messages
- `logs/combined.log`: All logs
- Console: Development environment logs

## Performance Optimization

- Database indexing for frequently queried fields
- Response caching for static content
- Rate limiting for API endpoints
- Compression for response payload
- Connection pooling for database
- Efficient query optimization

## Security Measures

1. **Authentication**
   - JWT token validation
   - Password hashing
   - Token refresh mechanism
   - Session management

2. **Authorization**
   - Role-based access control
   - API key validation
   - Resource-level permissions

3. **Data Protection**
   - Input sanitization
   - XSS protection
   - CSRF protection
   - SQL injection prevention

4. **Network Security**
   - CORS configuration
   - Rate limiting
   - Security headers
   - HTTPS enforcement

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Coding Standards
- Follow ESLint configuration
- Write unit tests for new features
- Update documentation
- Follow semantic versioning

## Support

For support, email support@example.com or join our Slack channel.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Express.js team
- MongoDB team
- Node.js community
- All contributors
