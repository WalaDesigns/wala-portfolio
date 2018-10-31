const express = require('express');
const app = express();
var path = require("path");
require('dotenv').config()
var port = process.env.PORT || 8080;

const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  //__dirname : It will resolve to your project folder.
});

// POST route from contact form
app.post('/send', function (req, res) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      //service: 'yahoo mail',
      //port: 465,
      service:'gmail',
      secure: false,
      auth: {
        user: "process.env.EMAIL_USERNAME",
        pass: "process.env.EMAIL_PASS"//process.env.EMAIL_PASS
      }
    });
    mailOpts = {
      //from: req.body.name + ' &lt;' + req.body.email + '&gt;',
      from : req.body.email,
      to: "wala.design.agency@gmail.com",
      subject: 'New Email from WalaDesigns',
      text: `${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function (error, info) {
      if (error) {
        res.json('contact-failure');
        console.log(error)
      }
      else {
        console.log(info)
        console.log('sent')
        res.redirect('/')
      }
    });
  });




app.use(express.static(__dirname + '/public')); //__dir and not _dir
app.listen(port);
console.log(`server on ${port}`);