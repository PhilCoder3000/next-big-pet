import { User } from '@prisma/client'

export type AuthenticatedItem = {
  authenticatedItem: User | null
}