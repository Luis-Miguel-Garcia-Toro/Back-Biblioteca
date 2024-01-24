const nodemailer = require("nodemailer");

class Mail {
  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bookverse856@gmail.com',
        pass: 'xfnocnwpxxgudfbe'
      }
    });
  }
  
  sendMail(mailOptions) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Correo electrónico enviado: ' + info.response);
          resolve(info);
        }
      });
    });
  }
}

module.exports = {
  Mail
};