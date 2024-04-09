import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { createRouteHandler } from "uploadthing/express"
import { UTApi } from 'uploadthing/server';
import { uploadRouter } from './uploadthing'
import config from './utils/config'
import schema from './schema'
import { userContext } from './utils/context'
import morgan from 'morgan'

mongoose.set('strictQuery', false);
console.log('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI as string)
    .then(() => console.log('connected to mongo'))
    .catch((err) => console.log('error connecting to mongo', err))

const app = express();
const utapi = new UTApi()

const start = async () => {
    const httpServer = http.createServer(app);
    app.use(cors());
    app.use(morgan('dev'));
    app.get('/', (req, res) => res.send('Hello from the api'));

    const server = new ApolloServer({
        schema
    });

    await server.start();

    app.use(
        '/graphql',
        cors({origin: config.FRONTEND_URL}),
        express.json(),
        expressMiddleware(server, {
            context: userContext
        })
    )

    app.use(
        '/api/uploadthing',
        createRouteHandler({
            router: uploadRouter,
        })
    )

    const deleteRouter = express.Router()

    deleteRouter.post('/:id', async (req:Request, res:Response) => {
        const key = req.params.id
        if (!key) {
            res.status(400).send('missing key')
            return
        }
        try {
            await utapi.deleteFiles(key)
            res.status(200).send('deleted')
        } catch (err) {
            res.status(500).send(err)
        }
    })

    app.use('/api/uploadthing/delete', deleteRouter)

    httpServer.listen(config.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${config.PORT}`)
    })
}

start()