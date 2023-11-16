<script>
  import { onMount } from 'svelte'

  import { writable } from 'svelte/store'
  import '../app.scss'

  onMount(async () => {
    // import onMount to ensure `document` is available
    const _module = await import('bootstrap')
  })

  export let pageTitle = writable('')
</script>

<div
  class="sidebar-nav d-flex flex-column fixed-top fixed-bottom bg-primary text-white"
  style="width: var(--nav-width);"
>
  <div class="d-flex justify-content-between">
    <a href="/" class="btn"><i class="bi bi-text-indent-right" /> HOME</a>
    <a hre="/">Test</a>
  </div>
  <hr class="mt-0" />

  <hr class="mb-0" />
</div>

<div class="min-vh-100 d-flex flex-column" style="margin-left: var(--nav-width);">
  <main class="flex-grow-1">
    <div class="row">
      <div class="col-4">
        <slot />
      </div>
    </div>
  </main>

  <footer>
    <div class="navbar bg-body-tertiary py-3">
      <div class="container-fluid">Footer</div>
    </div>
  </footer>
</div>

<style>
  .sidebar-nav .bi {
    font-size: 1.5em;
  }
</style>
