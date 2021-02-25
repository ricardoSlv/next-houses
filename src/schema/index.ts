import { buildSchemaSync } from 'type-graphql'
import { ImageResolver } from './image'
import { HouseResolver } from './house'
import { authChecker } from './auth'
import { resolvers } from './type-graphql'

export const schema = buildSchemaSync({
  //resolvers: [ImageResolver, HouseResolver, ...resolvers],
  resolvers: [ImageResolver, HouseResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
})
