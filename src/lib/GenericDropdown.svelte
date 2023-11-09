<script lang="ts" context="module">
  import type { AnyZodObject } from 'zod'
  type T = AnyZodObject
  interface Option {
    value: string
    label: string
  }
</script>

<script lang="ts" generics="T extends AnyZodObject">
  import type { z } from 'zod'
  import type { FormPathLeaves, ZodValidation } from 'sveltekit-superforms'
  import { type SuperForm, formFieldProxy } from 'sveltekit-superforms/client'
  import { writable } from 'svelte/store'
  import { fly } from 'svelte/transition'

  export let form: SuperForm<ZodValidation<T>, unknown>
  export let field: FormPathLeaves<z.infer<T>>
  export let options: Option[] = []

  const { value, errors, path } = formFieldProxy(form, field)

  const optionValues = writable(options.sort((a, b) => a.label.localeCompare(b.label)))
  const open = writable(false)
  const inputValue = writable('')

  function onSelectedChange(next: Option) {
    const nextValue = next?.value
    $open = !$open
    if ($value.includes(nextValue)) {
      $value = $value.filter((val: string) => val !== nextValue)
    } else {
      // @ts-expect-error "more type magic"
      $value = [...$value, nextValue]
    }
  }

  $: filteredOptions = $inputValue
    ? $optionValues.filter(({ label }) => {
      if ($inputValue === '') return true
      const normalizedInput = $inputValue.toLowerCase()
      return label.toLowerCase().includes(normalizedInput)
    })
    : $optionValues

  $: inputValue.set(
    $optionValues
      .filter(({ value }) => $value.includes(value))
      .map(({ label }) => label)
      .join(', ')
  )

  $: isOptionSelected = (option: Option) => {
    return $value.some((val: string) => val === option.value)
  }
  $: console.log('GDD', $errors, path, typeof $value, $value)
</script>

<div class="form-group">
  <label>Options</label>
  <div class="input-group has-validation">
    <input
      bind:value={$inputValue}
      class:is-invalid={$errors != null}
      class="form-control"
      placeholder="Select an option"
      on:click={() => {
        $open = !$open
      }}
    />
    <div class="input-group-append">
      {#if $open}
        <i class="bi bi-chevron-up input-group-text" />
      {:else}
        <i class="bi bi-chevron-down input-group-text" />
      {/if}
    </div>
    <!-- HACK: I don't understand why this is in _errors and VendorId are not -->
    {#if $errors?._errors}
      <div id="validationFeedback" class="invalid-feedback">
        {$errors._errors.join(', ')}
      </div>
    {/if}
  </div>
</div>
{#if $open}
  <ul class="list-group" transition:fly={{ duration: 150, y: -5 }}>
    {#each filteredOptions as option, index (index)}
      <li
        class="list-group-item list-group-item-action"
        on:click={() => {
          onSelectedChange(option)
        }}
      >
        {#if isOptionSelected(option)}
          <i class="bi bi-check2 mr-2" />
        {/if}
        {option.label}
      </li>
    {:else}
      <li class="list-group-item">No results found</li>
    {/each}
  </ul>
{/if}
