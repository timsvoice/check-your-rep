import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';

import Schema from '../src/data/schema.js';

var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: Schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.get('/', function(request, response) {
  response.send('Check Your Rep!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
