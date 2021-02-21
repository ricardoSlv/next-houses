import { PrismaClient } from 'src/prisma'

export interface Context {
  uid: string | null
  prisma: PrismaClient
}
export interface AuthorizedContext extends Context {
  uid: string
}
