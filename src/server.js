'use strict';

let config = require('./config/config.js')(),	
	express = require('express'),
	bodyParser = require('body-parser'),
    consign = require('consign'),
    helmet = require('helmet'),
    cors = require('cors'),
	method_override = require('method-override'),		
	app = express();

app.use(cors());
app.use(cors());
app.use(bodyParser.json()),
app.use(bodyParser.urlencoded({extended: true}))
app.use(method_override());
app.disabled('x-powered-by');
app.use(helmet.xssFilter());

app.routes = express.Router();

consign({cwd: 'src'})
	.then('authorization')
	.then('mailer')		
	.then('assistencia')	
	// .then('assistencia/assistencia_controller.js')	
	// .then('assistencia/assistencia_routes.js')			
	// .then('cliente/cliente_controller.js')	
	// .then('cliente/cliente_routes.js')			
	
	// .then('cliente/hardlock/hardlock_controller.js')	
	// .then('cliente/hardlock/hardlock_routes.js')	

	// .then('cliente/software/software_controller.js')	
	// .then('cliente/software/software_routes.js')	
	
	// .then('cliente/plataforma/plataforma_controller.js')	
	// .then('cliente/plataforma/plataforma_routes.js')		

	.into(app);

app.use((req, res) => {
	res.status(404).json({message: 'Page Not Found'}).end();
})	

let port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('The API-Tecnomail with express is listening the port %d in %s mode.',
		 port, app.get('env'));
});
