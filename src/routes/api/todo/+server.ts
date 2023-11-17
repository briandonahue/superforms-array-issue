import { json } from '@sveltejs/kit'
import type { RequestHandler } from '../$types'
import { type Todo, TodoSchema } from '$lib/TodoSchema'
import { actionResult, superValidate } from 'sveltekit-superforms/client'

const todos: Todo[] = [
  { id: 1, title: 'First Todo', completed: false },
  { id: 2, title: 'Second Todo', completed: true },
  { id: 3, title: 'Third Todo', completed: false }
]

export const GET: RequestHandler = async () => {
  return json(todos)
}

export const POST: RequestHandler = async (request) => {
  const form = await superValidate(request, TodoSchema)
  if (!form.valid) {
    return actionResult('failure', { form, message: 'Flash message' }, 400)
  } else {
    const todo = form.data
    const index = todos.findIndex(t => t.id === todo.id)
    let message = ''
    if (index !== -1) {
      message = 'Todo updated.'
      todos[index] = todo
    } else {
      todo.id = todos.length + 1
      todos.push(todo)
      message = 'Todo created.'
      //      setFlash(message, request)
    }
    //    setFlash(message, request)
    return actionResult('redirect', `/todo/${todo.id}`, {
      message
    })
  }
}
