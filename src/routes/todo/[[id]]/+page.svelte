<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client'
  import type { PageData } from './$types'
  import { writable } from 'svelte/store'
  import { getFlash } from 'sveltekit-flash-message'
  import { page } from '$app/stores'
  export let data: PageData

  const todos = writable(data.todoList)

  const flash = getFlash(page)

  const { form, enhance, constraints, message } = superForm(data.form, {
    dataType: 'json',
    syncFlashMessage: true
    /*     onResult: ({ result }) => {
      if (result.type === 'success') {
        const newTodo = result.data?.form.data as Todo
        $todos = [...$todos, newTodo]
      }
    } */
  })
</script>

<ul>
  {#each data.todoList as todo (todo.id)}
    <li><a href="/todo/{todo.id}">{todo.title}</a></li>
  {/each}
  <li><a href="/todo/">[+ Add To Do]</a></li>
</ul>

<form use:enhance method="POST" action="/api/todo">
  <input type="text" bind:value={$form.title} placeholder="New todo" {...$constraints.title} />
  <button type="submit">{$form.id ? 'Update' : 'Add'}</button>
</form>

{#if $flash}
  <div>
    Flash:
    <p>{$flash}</p>
  </div>
{/if}

{#if $message}
  <div>
    Message:
    <p>{$message}</p>
  </div>
{/if}

Here I want to redirect to /todo/[id] on create, and stay on the same page if an update.
Either way I'd like to show a flash message.
