import { makeExecutableSchema } from '@graphql-tools/schema'
import merge from 'lodash/merge'

import {
    typeDefs as User,
    resolvers as userResolvers
} from './schemas/user'

import {
  typeDefs as Habit,
  resolvers as habitResolvers
} from './schemas/habit'

const Query = `
  type Query {
    test: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
    Query: {
        test: () => 'Hello World'
    },
    Mutation: {}
};

const schema = makeExecutableSchema({
    typeDefs: [Query, User, Habit],
    resolvers: merge(resolvers, userResolvers, habitResolvers)
});

export default schema;