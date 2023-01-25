'use strict';

let sanitize = require('mongo-sanitize');
const HTTPStatus = require('http-status');

module.exports = (app) => {
    let controller = {};    
    let mailer = app.mailer.mailer_controller;
    let authorization = app.authorization.authorization_controller;    

    controller.createCall = (request, response) => {        
        let message = sanitize(request.body);

        //validate software token        
        authorization.hasAuthorization(message.authenticate)
        .then((authorized) => {       
            if (!authorized) 
                return response.status(HTTPStatus.FORBIDDEN)
                        .send({message: "Usuário sem permissão para enviar email!"});
                            

            delete message.authorization;            

            mailer.isconnected()
            .then((result) => {
                let email = Object.assign(message, JSON.parse(process.env.EMAILS_ASSISTENCIA));                
                mailer.sendMail(email);
                response.status(HTTPStatus.OK).send({message: "Email enviado com sucesso!"});
            })
            .catch((error) => {
                response.status(HTTPStatus.INTERNAL_SERVER_ERROR)
                        .send({message: "Falha ao enviar email!"});
            });    
        })
        .catch((error) => {
            response.status(HTTPStatus.INTERNAL_SERVER_ERROR)
                .send({message: "Falha ao solicitar autorização para envio de email!"});
        });                                            
    }

    return controller;
}

// var message = {
//    "authenticate": {
//       "user": "",
//       "password": ",
//       "api": "TECNOMAIL"
//     },
//     from: 'sender@server.com',
//     to: 'receiver@sender.com',
//     subject: 'Message title',
//     html: '<p>HTML version of the message</p>',
//     attachments: [],
// };