import Habit from '../models/habit'
import { GraphQLError } from 'graphql'
import type { Context } from '../utils/context'


export const typeDefs = `
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
        allHabits: async (root:any, args:any, context:Context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            return await Habit.find({ user: currentUser._id }).sort({ updated_at: -1 })
        },
        findHabit: async (root:any, args:{id:string}, context:Context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            return await Habit.findOne({ _id: args.id, user: currentUser._id })
        }
    },
    Mutation: {
        createHabit: async (root:any, args:any, context:Context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const habit = new Habit({
                ...args,
                user: currentUser._id
            })
            try {
                await habit.save()
            } catch (error: any) {
                throw new GraphQLError(error.message)
            }

            currentUser.habits = currentUser.habits.concat(habit._id)
            await currentUser.save()

            return habit
        },
        updateHabit: async (root:any, args:any, context:Context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            const habit = await Habit.findById(args.id)
            if(habit?.user.toString() !== currentUser._id.toString()) {
                throw new GraphQLError('Not authorized', {
                    extensions: {
                        code: 'UNAUTHORIZED'
                    }
                })
            }
            const updatedHabit = await Habit.findByIdAndUpdate(args.id, { ...args }, { new: true })
            return updatedHabit
        },
        deleteHabit: async (root:any, args:{id:string}, context:Context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const habit = await Habit.findById(args.id)
            if(habit?.user.toString() !== currentUser._id.toString()) {
                throw new GraphQLError('Not authorized', {
                    extensions: {
                        code: 'UNAUTHORIZED'
                    }
                })
            }

            await Habit.findByIdAndDelete(args.id)
            return habit
        }
    }
}