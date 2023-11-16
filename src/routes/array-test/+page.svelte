<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client'
  import type { PageData } from './$types'
  import GenericDropdown from '$lib/GenericDropdown.svelte'
  import { TestSchema } from '$lib/TestSchema'
  export let data: PageData

  const form = superForm(data.form, {
    dataType: 'json',
    validators: TestSchema,
    syncFlashMessage: true
  })
  const { enhance } = form
</script>

<container>
  <div class="p-4">
    <div class="row">
      <div class="col-12">
        <form method="POST" use:enhance>
          <GenericDropdown
            {form}
            field="manyThings"
            options={data.people.map((p) => {
              return { value: p.id, label: p.name }
            })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</container>
