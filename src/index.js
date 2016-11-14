import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as firebase from 'firebase';

import { graphqlSchema } from '../src/api/index.js';

// Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_ID
};

firebase.initializeApp(firebaseConfig);

// Express
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: graphqlSchema
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
