'use strict';

let empty = require("is-empty");
let request = require('request');
let Promise = require('bluebird');
const HTTPStatus = require('http-status');

module.exports = () => {
    let controller = {};
    const TOKEN_SERVICE = 'http://service.tecnomotor.com.br/token/login';

    controller.hasAuthorization = (authorization) => {        
        return new Promise((resolve, reject) => {
            request.post(TOKEN_SERVICE,
                {json: authorization},  
                (error, response, body) => {
                   if (error) {
                       reject(false);                       
                       return;
                   }                                              

                   if (response.statusCode != HTTPStatus.OK) {
                       resolve(false);
                       return;
                   }
                                                                                          
                   resolve((!empty(body.value)));
                }   
            )
        });        
    }

    return controller; 
}

/**
 * Objeto de autorização
 * {
 *  "user": ""
 *  "password": ""
 *  "api": ""
 * }
 */