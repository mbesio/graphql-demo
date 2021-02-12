const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// Hardcoded data
// const customers = [
//   {
//     id: '1',
//     name: 'Matteo Besio',
//     email: 'matteo.besio@gmail.com',
//     age: 35
//   },
//   {
//     id: '2',
//     name: 'John Green',
//     email: 'john.green@gmail.com',
//     age: 30
//   },
//   {
//     id: '3',
//     name: 'Sarah White',
//     email: 'sarah.white@gmail.com',
//     age: 22
//   },
// ]


const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        // default port for json-server is 3000
        return axios.get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data)

      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers')
        .then(res => res.data)
      }
    }
  }
});

module.exports = new GraphQLSchema ({
  query: RootQuery
});