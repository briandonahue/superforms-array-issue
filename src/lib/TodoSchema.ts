import { z } from 'zod'

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean()
})

export type Todo = z.infer<typeof TodoSchema>
