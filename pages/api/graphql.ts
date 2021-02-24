import 'reflect-metadata'
import { NextApiRequest } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'src/schema'
import { Context } from 'src/schema/context'
import { prisma } from 'src/prisma'
import { loadIdToken } from 'src/auth/firebaseAdmin'
import { ApolloServerPlugin } from 'apollo-server-plugin-base'

const requestPrinter: ApolloServerPlugin = {
  requestDidStart(requestContext) {
    //console.log('Request started! Variables:')
    //console.dir(requestContext.request.variables)
    //console.log('Request started! Query:\n' + requestContext.request.query)

    return
  },
}

const server = new ApolloServer({
  schema,
  context: async ({ req }: { req: NextApiRequest }): Promise<Context> => {
    const uid = await loadIdToken(req)
    return { uid, prisma }
  },
  tracing: process.env.NODE_ENV === 'development',
  plugins: [requestPrinter],
})

const handler = server.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
