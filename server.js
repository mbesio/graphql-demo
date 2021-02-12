const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')
var port = process.env.PORT || 3000;

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));



app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});