'use strict';
const nodemailer = require('nodemailer');
let Promise = require('bluebird');

module.exports = () => {
    
    let controller = {};
    let email = {};    


    let transporter = nodemailer.createTransport({
        /*
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        */
       service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD  // generated ethereal password
        }
        /*,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false            
        }*/
    });

       
    controller.sendMail = (mail) => {
        transporter.sendMail(mail, (error) => {
            if (error) {
                console.log(error);
                return;
            }
            transporter.close();
            //console.log("E-mail sent successfully");
        })
    }

    controller.isconnected = () => {
       return new Promise((resolve, reject) => {
            transporter.verify((error, success) => {
                if (error) {
                    console.log("Email não conectado:", error);
                    return reject(false);
                }            
                
                return resolve(true);
            });
       });        
    }

    return controller;
}