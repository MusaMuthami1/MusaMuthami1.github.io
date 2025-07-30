# Portfolio Improvements - Deployment Guide

This guide covers the recent improvements made to the portfolio website, including the new About section font and SparkPost email integration.

## Recent Changes

### 1. About Section Font Update ✨
- **Font**: Updated to use Inter font family for the About section
- **Design**: More modern and distinctive while maintaining visual cohesion
- **Colors**: Maintained the existing color scheme (#00A3FF primary blue)
- **Typography**: Enhanced readability with better font weights and letter spacing

### 2. SparkPost Email Integration 📧
- **Backend**: Complete Node.js server with SparkPost API integration
- **Frontend**: Enhanced contact form with backend connectivity
- **Fallback**: Maintains existing functionality if backend is not deployed
- **Security**: Rate limiting, input validation, and CORS protection

## Deployment Instructions

### Frontend (GitHub Pages)
The frontend improvements are automatically deployed via GitHub Pages when you push to the main branch.

### Backend (SparkPost API Server)

#### Option 1: Vercel (Recommended)
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd backend
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - `SPARKPOST_API_KEY`: Your SparkPost API key
   - `SPARKPOST_DOMAIN`: Your verified domain
   - `RECIPIENT_EMAIL`: musamwange2@gmail.com
   - `SENDER_EMAIL`: noreply@yourdomain.com

4. **Update Frontend**: Change the `API_CONFIG.baseUrl` in `js/main.js` to your Vercel URL

#### Option 2: Heroku
1. **Create Heroku App**:
   ```bash
   heroku create your-portfolio-api
   ```

2. **Set Environment Variables**:
   ```bash
   heroku config:set SPARKPOST_API_KEY=your_key_here
   heroku config:set SPARKPOST_DOMAIN=yourdomain.com
   heroku config:set RECIPIENT_EMAIL=musamwange2@gmail.com
   heroku config:set SENDER_EMAIL=noreply@yourdomain.com
   ```

3. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

#### Option 3: Railway
1. Connect your GitHub repository to Railway
2. Deploy the `backend` folder
3. Set environment variables in Railway dashboard
4. Update frontend API URL

### SparkPost Setup
1. **Sign up** at [SparkPost](https://www.sparkpost.com/)
2. **Verify your domain** in the SparkPost dashboard
3. **Create API key** with transmission permissions
4. **Update DNS records** as required by SparkPost

## Configuration

### Environment Variables Required
```env
SPARKPOST_API_KEY=your_sparkpost_api_key_here
SPARKPOST_DOMAIN=yourdomain.com
RECIPIENT_EMAIL=musamwange2@gmail.com
SENDER_EMAIL=noreply@yourdomain.com
PORT=3001
```

### Frontend Configuration
Update the API URL in `js/main.js`:
```javascript
const API_CONFIG = {
    baseUrl: 'https://your-deployed-backend.vercel.app', // Your backend URL
    fallbackEnabled: true
};
```

## Features

### Enhanced About Section
- ✅ Modern Inter font for better readability
- ✅ Maintains visual cohesion with existing design
- ✅ Responsive design across all devices
- ✅ Improved typography hierarchy

### Advanced Contact Form
- ✅ SparkPost email delivery with beautiful HTML templates
- ✅ Rate limiting (5 requests per 15 minutes)
- ✅ Input validation and sanitization
- ✅ Automatic fallback to local storage + mailto
- ✅ Real-time backend connectivity testing
- ✅ Error handling with user-friendly messages

### Email Templates
- ✅ Professional HTML emails with portfolio branding
- ✅ Matches website color scheme (#00A3FF)
- ✅ Direct reply functionality
- ✅ Mobile-responsive design

## Testing

### Test Contact Form
1. Visit your portfolio website
2. Navigate to the Contact section
3. Fill out the form with test data
4. Submit and verify:
   - Success message appears
   - Form resets after submission
   - Email received (if backend is deployed)
   - Fallback works (if backend is not deployed)

### Test Backend API
```bash
curl -X POST https://your-backend-url.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Troubleshooting

### Common Issues
1. **CORS errors**: Ensure your domain is in the allowed origins list
2. **401 Unauthorized**: Check your SparkPost API key
3. **403 Forbidden**: Verify your domain in SparkPost
4. **Form not submitting**: Check browser console for JavaScript errors

### Support
- Backend logs show detailed error messages
- Frontend gracefully falls back to original functionality
- All changes are backward compatible

## Security Features
- ✅ Rate limiting to prevent spam
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Environment variable protection
- ✅ No sensitive data exposure

The improvements maintain the existing design aesthetic while adding modern functionality and professional email capabilities.