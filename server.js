const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')
var port = process.env.PORT || 4000;

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});