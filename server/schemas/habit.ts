import Habit from '../models/habit'
import { GraphQLError } from 'graphql'

export const typeDesfs = `
    type Habit {
        id: ID!
        name: String!
        description: String
        color: String!
        icon: String!
        updated_at: String!
    }

    extend type Query {
        allHabits: [Habit!]!
        findHabit(id: ID!): Habit
    }

    extend type Mutation {
        createHabit(
            name: String!,
            description: String,
            color: String!,
            icon: String!
        ): Habit

        updateHabit(
            id: ID!,
            name: String!,
            description: String,
            color: String!,
            icon: String!
        ): Habit

        deleteHabit(id: ID!): Habit
    }
`

export const resolvers = {
    Query: {
        allHabits: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            return await Habit.find({ user: currentUser._id }).sort({ updated_at: -1 })
        }
    }
}