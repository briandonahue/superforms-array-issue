import sequence from 'svelte-sequential-preprocessor'
import { vitePreprocess } from '@sveltejs/kit/vite'

// eslint-disable-next-line spaced-comment
/** @type {import('@sveltejs/kit').Config}*/
const config = {
  compilerOptions: {
    enableSourcemap: true
  },
  preprocess: sequence([vitePreprocess()]),
}
export default config
