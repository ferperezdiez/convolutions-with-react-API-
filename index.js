const express = require('express');
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config();
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const { USER, PASS } = process.env



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

    let mailOptions = {
      from: 'fernandoperezdiez.resume@gmail.com',
      to: data,
      subject: 'llego',
      html: `
        <h3>Aca toy</h3>
      `,
      
      attachments: [{
        filename: 'resume.PDF',
        path: './resume.PDF'
      }]

    }

    newTransport.sendMail(mailOptions, (error)=>{
      if(error)
        res.send(error)       
      else res.send('success')
    })
    newTransport.close()




});


app.listen(3004, function () {
console.log('Example app listening on port 3004!');
});