'use strict';

module.exports = (app) => {
    let controller = app.assistencia.assistencia_controller;

    app.route('/assistencia')
        .post(controller.createCall);
        
}