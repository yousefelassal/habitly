import jwt from 'jsonwebtoken';
import type { Secret, JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import 'dotenv/config';
import type { BaseContext, ContextFunction } from '@apollo/server';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import type { UserDocument } from '../models/user';

export interface Context {
    currentUser: UserDocument
}

export const userContext: ContextFunction<
    [ExpressContextFunctionArgument],
    BaseContext> = async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET as Secret
        ) as JwtPayload
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
    }
    return -1;
}

export type UserContext = ReturnType<typeof userContext>

