const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname)));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'portfolio.html'))
})
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adityagoel9065@gmail.com', // replace with your Gmail address
            pass: 'twgv cssc pyvl qfpz'   // replace with your Gmail password or an app-specific password
        }
    });

    // Set up email data
    let mailOptions = {
        from: email,
        to: 'adityagoel9065@gmail.com', // replace with your Gmail address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error while sending email: ' + error.message);
        }
        res.status(200).sendFile(path.join(__dirname,'portfolio.html'))
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
