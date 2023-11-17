import { type Todo, TodoSchema } from '$lib/TodoSchema'
import { superValidate } from 'sveltekit-superforms/server'
import { loadFlash } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from './$types'

export const load = loadFlash((async ({ fetch, params }) => {
  const response = await fetch('/api/todo')
  if (response.ok) {
    const todoList = await response.json() as Todo[]
    const todo = todoList.find(t => t.id === Number(params?.id))
    const form = superValidate(todo, TodoSchema)

    return { todoList, form }
  } else {
    throw new Error('Failed to load todos')
  }
})) satisfies PageServerLoad
