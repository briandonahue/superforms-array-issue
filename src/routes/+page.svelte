<script lang="ts">
  import { TodoSchema } from '$lib/TodoSchema'
  import { superForm, superValidateSync } from 'sveltekit-superforms/client'

  const sf = superValidateSync(TodoSchema)
  const { form, enhance, constraints } = superForm(sf)
</script>

<p>
  <a href="/todo">Todo List (Flash message test)</a>
</p>

<form use:enhance method="POST" action="/api/todo">
  <input type="text" bind:value={$form.title} placeholder="New todo" {...$constraints.title} />
  <button type="submit">{$form.id ? 'Update' : 'Add'}</button>
</form>

Here I don't want to show a flash message or redirect. This will be in a modal window and the modal
will just close and update a store on the page with the new item.
