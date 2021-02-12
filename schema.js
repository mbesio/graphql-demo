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


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age
        })
          .then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios.delete(`http://localhost:3000/customers/${args.id}`, {
        })
          .then(res => res.data);
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return axios.patch(`http://localhost:3000/customers/${args.id}`,  args)
          .then(res => res.data);
      }
    },
  }
})

module.exports = new GraphQLSchema ({
  query: RootQuery,
  mutation
});