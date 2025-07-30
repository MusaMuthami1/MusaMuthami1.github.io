# Portfolio Contact API Backend

This is a Node.js backend server that provides email functionality for the portfolio contact form using SparkPost API.

## Features

- ✅ SparkPost email integration
- ✅ CORS support for frontend integration
- ✅ Rate limiting to prevent spam
- ✅ Input validation and sanitization
- ✅ Error handling and logging
- ✅ Beautiful HTML email templates
- ✅ Fallback to existing frontend behavior

## Prerequisites

1. **SparkPost Account**: Sign up at [SparkPost](https://www.sparkpost.com/)
2. **Verified Domain**: You need a verified domain in SparkPost
3. **API Key**: Generate an API key with transmission permissions
4. **Node.js**: Version 14 or higher

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your SparkPost configuration:

```env
SPARKPOST_API_KEY=your_actual_api_key_here
SPARKPOST_DOMAIN=yourdomain.com
RECIPIENT_EMAIL=your-email@example.com
SENDER_EMAIL=noreply@yourdomain.com
PORT=3001
```

### 3. SparkPost Setup

1. **Sign up** for a SparkPost account
2. **Verify your domain** in the SparkPost dashboard
3. **Create an API key** with transmission permissions
4. **Update your DNS** records as required by SparkPost

### 4. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3001` (or your configured PORT).

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and configuration info.

### Send Contact Email
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Hello! I'd like to connect..."
}
```

## Deployment Options

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the backend directory
3. Add environment variables in Vercel dashboard
4. Update frontend API URL

### Heroku
1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git or GitHub integration
4. Update frontend API URL

### Railway
1. Connect your GitHub repository
2. Deploy the backend folder
3. Set environment variables
4. Update frontend API URL

## Frontend Integration

The frontend will automatically try to use this backend API if available, and fall back to the existing email behavior if the backend is not deployed.

Update the `API_BASE_URL` in your frontend JavaScript to point to your deployed backend:

```javascript
const API_BASE_URL = 'https://your-backend-url.com';
```

## Error Handling

The API includes comprehensive error handling:

- **400**: Invalid input (missing fields, invalid email)
- **429**: Rate limit exceeded
- **500**: Server or SparkPost errors

The frontend will show appropriate error messages and fall back to the mailto link if the API fails.

## Security Features

- CORS protection with allowed origins
- Rate limiting (5 requests per 15 minutes per IP)
- Input validation and sanitization
- Environment variable protection
- Proper error handling without exposing sensitive data

## Email Template

The backend sends beautifully formatted HTML emails that match your portfolio's design, including:

- Branded header with your color scheme
- Contact details and message formatting
- Direct reply button
- Responsive design

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check your SparkPost API key
2. **403 Forbidden**: Verify your domain in SparkPost
3. **422 Unprocessable Entity**: Check sender email domain
4. **CORS Errors**: Ensure your frontend domain is in the allowed origins

### Testing

You can test the API using curl:

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "This is a test message"
  }'
```

## Support

If you encounter any issues:

1. Check the server logs for detailed error messages
2. Verify your SparkPost configuration
3. Ensure your domain is properly verified
4. Check that your API key has the correct permissions

## License

MIT License - feel free to use this for your own projects!