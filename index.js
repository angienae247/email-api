import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

app.get('/', (req, res) => {
  res.send('Email API is running!');
});

app.get('/senda', (req, res) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'mail.bpserver.site', // or use your SMTP provider
    auth: {
      user: 'hr@mail.bpserver.site',       // replace with your email
      pass: 'IdontKnow'   // use App Password for Gmail
    }
  });
  
  // Email details
  const mailOptions = {
    from: 'hr@mail.bpserver.site',
    to: 'mia8kelly@gmail.com',
    subject: 'Test Email from Nodemailer',
    text: 'Hello! This is a test email sent using Nodemailer.'
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send('Error sending email:', error);
    }
    res.send('Email sent:', info.response);
  });
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
