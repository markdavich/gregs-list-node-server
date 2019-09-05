// Express is a Node.js web application framework
import express from 'express'

// http://expressjs.com/en/5x/api.html#req.param
// 
// Body-parsing middleware must be loaded for request.param()
// to work predictably.

// http://expressjs.com/en/5x/api.html#req.body
// request.body Contains key-value pairs of data submitted in the
// request body. By Default, it is "undefined", and is populated
// when "body-parsing" middleware is used.
import bodyParser from 'body-parser'

// This is mongoose
// This import configures mongoose for the entire
// project. It also gets the connection string from
// NodeJS.Process process.env.CONNECTION_STRING (SEE: The .env file)
import DbContext from './db/db-config';

// CORS: Cross - Origin Resource Sharing
// cors is a node.js package for providing a Connect/Express
// middleware that can be used to enable CORS with various options.
import cors from 'cors'

// Import controllers



// Standard port for node server
const port = 3000

// Start instance of express
let server = express()

// Opens default mongoose connection that
// uses the connection string in .env
DbContext.connect()

// -- Register Middleware --

// Creates a reference to the build project on the client (if api only remove this line)
server.use(express.static(__dirname + '/../client/dist'))

// cors middleware
// Allows requests from the port 8080, add additional addresses as needed
let whitelist = ['http://localhost:8080'];
let corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions))

// body-parser middleware
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

//NOTE Register Routes...
//NOTE Everything above this line always stays the same
//NOTE next we want to register all our routes(doorways that can be accessed in our app)
//NOTE we have to import access to our controllers
import GregsListController from './controllers/gregs-list-controller'
import { JOB_PATH, HOUSE_PATH, CAR_PATH, DN_JOB, DN_HOUSE, DN_CAR } from './schemas/DOCUMENT_NAMES'
import { jobSchema } from './schemas/job';
import { houseSchema } from './schemas/house';
import { carSchema } from './schemas/car';

//NOTE remember the forward slash at the start of your path!

server.use(JOB_PATH(), GregsListController.getRouter(DN_JOB, jobSchema))
server.use(HOUSE_PATH(), GregsListController.getRouter(DN_HOUSE, houseSchema))
server.use(CAR_PATH(), GregsListController.getRouter(DN_CAR, carSchema))


//NOTE Everything below this line always stays the same

//NOTE Default error handler, catches all routes with an error attached
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } })
})

//NOTE Catch all to insure to return 404 if recieved a bad route
server.use('*', (req, res, next) => {
  res.status(404).send("Route not found")
})


server.listen(port, () => { console.log(`Server is running on port: ${port}`) })