import { z } from 'zod'

export const TestSchema = z.object({
  manyThings: z.array(z.string()).nonempty()
})
