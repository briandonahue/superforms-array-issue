// See https://kit.svelte.dev/docs/types#app

import type mongoose from 'mongoose'
import type { Auth, AuthRequest } from 'lucia'
import type { Message } from '$lib/Message'

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
    interface Locals {
      auth: Auth
      authRequest: AuthRequest
      db: typeof mongoose
    }
  }
  namespace Lucia {
    type Auth = Auth
  }
  interface PageData {
    flash?: Message
  }
}

export {}
