/*  Entry Point!!! This file is run by either of the following:

    package.json: npm run start
      "scripts": {
        ...
        "start": "node index.js"
      }

    .vscode/launch.json: When the debugger is run
      "configurations": [
        {
          "type": "node",
          "request": "launch",
          "name": "Launch Program",
          "program": "${workspaceFolder}/index.js"
        }
      ]

    So it can be seen that the location of index.js is important
    otherwise the two files would have to be edited
*/

require('dotenv').config()

// Override the functionallity of Node.js 'require'
// require: NodeRequire
// module: NodeModule
require = require('esm')(module)

// Using the overriden 'require' run the
// code in main.js
module.exports = require('./server/main')

// start node project
// sudo npm init

// entrypoint index.js


// These install and register stuff with package.json
// sudo npm install express package.json
// sudo npm install esm package.json(Import and Export)
// sudo npm install dotenv
// sudo npm install mongoose

// mongo db
// 1. Database Access: create user
// 2. Network Access: create whitelist entry: 0.0.0.0 / 0
// 3. Create cluster

// create.env
// !!! .gitignore.env!!!


// UPDATE BCW: sudo npm i - g bcw