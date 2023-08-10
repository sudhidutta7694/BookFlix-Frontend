const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51NWyK6SC7WXy8eUt5PPBT4xMp8rxYECwTb1IQXCpsltyc9GC9XvtC3vd6gwVnfKkKT2cdcv3LRGfYyKlNguhqfMh00VmZuOhbW');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your SMTP server host
  port: 587, // Replace with your SMTP server port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'sudhisundar.dutta29@gmail.com', // Replace with your email address
    pass: 'wkglyswaepwkybmz', // Replace with your email password
  },
});

// Your existing code...
// const email = JSON.parse(localStorage.getItem('user')).email;

app.post('/create-checkout-session', async (req, res) => {
   try {
      const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         mode: 'payment',
         line_items: req.body.items.map(item => {
            return {
               price_data: {
                  currency: 'inr',
                  product_data: {
                     name: item.movieName,
                     images: [item.imageUrl],
                     description: `Paying for ${item.numTickets} tickets of ${item.movieName}`,
                  },
                  unit_amount: item.totalPayment * 100,
               },
               quantity: 1,
            };
         }),
         success_url: `http://localhost:3000/paySuccess`,
         cancel_url: `http://localhost:3000/payFailure`,
      });

      const emailContent = `
         Thank you for your purchase!

         You have successfully paid for ${req.body.items.map((item) => `${item.numTickets} ticket(s) for ${item.movieName} (Total Amount: ₹${item.totalPayment})`).join('\n')}

         And your Ticket no. is ${req.body.items.map((item) => `${item.movieToken}`)}

         We hope you enjoy the movie!

         Regards,
         BookFlix
      `;

      // console.log(req.body.email);

      const mailOptions = {
         from: 'sudhisundar.dutta29@gmail.com', // Replace with your email address
         to: req.body.items.map((item) => item.email), // Replace with the customer's email address
         subject: 'Movie Booking Receipt',
         text: emailContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            console.log('Error sending email:', error);
         } else {
            console.log('Email sent:', info.response);
         }
      });

      res.json({ url: session.url });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Serve the built Vue app from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// All other requests will serve the index.html file from the 'dist' directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT }`);
});
