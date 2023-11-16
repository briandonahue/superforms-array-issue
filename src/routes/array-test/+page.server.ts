import { TestSchema } from '$lib/TestSchema'
import type { Actions, PageServerLoad } from '../$types'
import { message, superValidate } from 'sveltekit-superforms/client'

const people = Array.from({ length: 3 }, (_, i) => ({
  id: i.toString(),
  name: `Person ${i}`
}))

export const load = (async () => {
  const form = superValidate(TestSchema)
  return { people, form }
}) satisfies PageServerLoad

export const actions: Actions = {
  default: async (event) => {
    const { request } = event

    const form = await superValidate(request, TestSchema)

    if (!form.valid) {
      return message(form, { status: 'error', text: 'Please fix the errors below.' })
    } else return message(form, { status: 'success', text: 'Success!' })
  }
}
