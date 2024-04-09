import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user'
import { GraphQLError } from 'graphql'
import 'dotenv/config'

export const typeDefs = `
    type User {
        name: String!
        username: String!
        habits: [Habit!]!
        id: ID!
    }

    type Token {
        value: String!
    }

    extend type Query {
        me: User
    }

    extend type Mutation {
        createUser(
            name: String!
            username: String!
            password: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`

export const resolvers = {
    Query: {
        me: (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }
            return currentUser.populate('habits')
        }
    },
    Mutation: {
        createUser: async (root, args) => {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(args.password, saltRounds)

            const user = new User({
                name: args.name,
                username: args.username,
                passwordHash
            })

            try {
                await user.save()
            } catch (error) {
                if(error.code === 11000) {
                    throw new GraphQLError('Username is already taken', {
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    })
                }
                throw new GraphQLError(error.message)
            }

            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(args.password, user.passwordHash)

            if (!(user && passwordCorrect)) {
                throw new GraphQLError('invalid username or password', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}