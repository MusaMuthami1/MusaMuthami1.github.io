/**
 * SparkPost Email Backend Server
 * 
 * This Node.js server provides email functionality for the portfolio contact form
 * using SparkPost API. It includes CORS support and error handling.
 * 
 * Setup Instructions:
 * 1. Install dependencies: npm install
 * 2. Set your SparkPost API key in environment variables or .env file
 * 3. Configure your verified domain in SparkPost
 * 4. Update the recipient email address below
 * 5. Deploy to your preferred hosting platform (Vercel, Heroku, etc.)
 */

const express = require('express');
const cors = require('cors');
const SparkPost = require('sparkpost');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration placeholders - Update these with your actual values
const SPARKPOST_CONFIG = {
    apiKey: process.env.SPARKPOST_API_KEY, // Set this in your environment variables
    domain: process.env.SPARKPOST_DOMAIN || 'your-verified-domain.com', // Your verified SparkPost domain
    recipientEmail: process.env.RECIPIENT_EMAIL || 'musamwange2@gmail.com', // Where contact emails should be sent
    senderEmail: process.env.SENDER_EMAIL || 'noreply@your-verified-domain.com' // Must be from verified domain
};

// Initialize SparkPost client
const sparky = new SparkPost(SPARKPOST_CONFIG.apiKey);

// Middleware
app.use(cors({
    origin: [
        'https://musamuthami1.github.io',
        'http://localhost:8080',
        'http://localhost:3000',
        'http://127.0.0.1:8080'
    ],
    credentials: true
}));

app.use(express.json());

// Rate limiting to prevent spam
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        error: 'Too many requests. Please try again later.'
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Portfolio Contact API',
        timestamp: new Date().toISOString()
    });
});

// Contact form endpoint
app.post('/api/contact', limiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Input validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields (name, email, message) are required.'
            });
        }

        // Email validation (basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid email address.'
            });
        }

        // Check if SparkPost is configured
        if (!SPARKPOST_CONFIG.apiKey) {
            console.error('SparkPost API key not configured');
            return res.status(500).json({
                success: false,
                error: 'Email service not configured. Please try the direct email link.'
            });
        }

        // Prepare email content
        const emailData = {
            recipients: [
                { address: SPARKPOST_CONFIG.recipientEmail }
            ],
            content: {
                from: {
                    name: 'Portfolio Contact Form',
                    email: SPARKPOST_CONFIG.senderEmail
                },
                subject: `New Contact Form Message from ${name}`,
                html: `
                    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #00A3FF, #0080cc); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Message</h1>
                        </div>
                        
                        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #00A3FF;">${email}</a></p>
                                <p><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
                            </div>
                            
                            <div style="background: white; padding: 20px; border-radius: 8px;">
                                <h3 style="color: #333; margin-top: 0;">Message</h3>
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #00A3FF;">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                            
                            <div style="text-align: center; margin-top: 20px;">
                                <a href="mailto:${email}?subject=Re: Your message from portfolio" 
                                   style="background: #00A3FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                    Reply to ${name}
                                </a>
                            </div>
                        </div>
                    </div>
                `,
                text: `
New Contact Form Message

Name: ${name}
Email: ${email}
Sent: ${new Date().toLocaleString()}

Message:
${message}

Reply to: ${email}
                `
            }
        };

        // Send email via SparkPost
        const response = await sparky.transmissions.send(emailData);
        
        console.log('Email sent successfully:', response);
        
        res.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!',
            messageId: response.results.id
        });

    } catch (error) {
        console.error('Error sending email:', error);
        
        // Handle specific SparkPost errors
        let errorMessage = 'Failed to send message. Please try again or contact me directly.';
        
        if (error.statusCode === 401) {
            errorMessage = 'Email service authentication failed.';
        } else if (error.statusCode === 403) {
            errorMessage = 'Email service access forbidden. Please check domain verification.';
        } else if (error.statusCode === 422) {
            errorMessage = 'Invalid email data. Please check your input.';
        }

        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 Portfolio Contact API Server running on port ${PORT}
📧 SparkPost integration: ${SPARKPOST_CONFIG.apiKey ? '✅ Configured' : '❌ Not configured'}
🌐 Health check: http://localhost:${PORT}/health
📮 Contact endpoint: http://localhost:${PORT}/api/contact

Configuration:
- Domain: ${SPARKPOST_CONFIG.domain}
- Recipient: ${SPARKPOST_CONFIG.recipientEmail}
- Sender: ${SPARKPOST_CONFIG.senderEmail}

Environment Variables Required:
- SPARKPOST_API_KEY: Your SparkPost API key
- SPARKPOST_DOMAIN: Your verified domain (optional)
- RECIPIENT_EMAIL: Where to send contact emails (optional)
- SENDER_EMAIL: Sender email from verified domain (optional)
    `);
});

module.exports = app;