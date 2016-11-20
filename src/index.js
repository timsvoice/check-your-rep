import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import { dispatch } from './lib/dispatch.js';

import { graphqlSchema } from './api/index.js';

dispatch.scheduler()
  .then((res) => { console.log(res) })
  .catch((err) => { throw err })

// Express
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(cors());

app.use(express.static(__dirname + '/public'))

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: graphqlSchema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// serve static assets normally
app.use(express.static(__dirname + './src/client/public'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './src/client/public', './src/client/index.html'))
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
