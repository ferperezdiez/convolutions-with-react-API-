const express = require('express');
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config();
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const { USER, PASS, PORT } = process.env
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



app.post('/', function (req, res) {

  const data = req.body.mail;
  const newTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth:{
      user: USER,
      pass: PASS
    }
  })
  if(!req.body.text){
    const data = req.body.mail;
      let mailOptions = {
        from: 'fernandoperezdiez.resume@gmail.com',
        to: data,
        subject: 'Full Stack Developer || Fernando Perez Diez',
        html: `
          <h3>Thank you for received my resume! </3>
          <h3>Have a nice day!</h3>
        `,
        
        attachments: [{
          filename: 'resume.pdf',
          path: './resume.pdf'
        }]

      }

      newTransport.sendMail(mailOptions, (error)=>{
        if(error)
          res.send(error)
        else res.send('success')
      })
      newTransport.close()
    } else {
   
      const mail = req.body.mail;
      const suggestion = req.body.text;
      let mailOptions = {
        from: 'fernandoperezdiez.resume@gmail.com',
        to: 'perezdiezf@gmail.com',
        subject: 'Suggestion',
        html: `
          <p>Recibiste la siguiente sugerencia de ${mail}: ${suggestion}</p>
        `
      }

      newTransport.sendMail(mailOptions, (error)=>{
        if(error)
          res.send(error)
        else res.send('success')
      })
      newTransport.close()

  }




});


app.listen(PORT, function () {
console.log('Listening on port 3004!');
});