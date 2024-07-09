import { getContext, setContext } from "svelte"
import { pb } from "."
import type { AuthModel } from "pocketbase"


class AuthStore {
  user = $state<AuthModel>()
  isSynced = $state(false)

  constructor() {
    $effect(() => {
      if (pb.authStore.isValid) {
        this.user = pb.authStore.model
      }
      this.isSynced = true
    })
  }

  async signin() {
    this.user = await pb.admins.authWithPassword('admin@gmail.com', '1234567890')
  }

  async signinPassword() {
    this.user = await pb.collection('users').authWithPassword('test@gmail.com', '1234567890')
    // try { this.user = await pb.collection('users').authWithOAuth2({ provider: 'google' }) }
    // catch (e) {
    //   console.log('error', e)
    // }
  }

  signout() {
    pb.authStore.clear()
    this.user = null
  }
}


const AUTH_STORE_KEY = 'auth store'

export const setAuthContext = () => {
  const nAuthStore = new AuthStore();
  return setContext(AUTH_STORE_KEY, nAuthStore)
}

export const getAuthContext = (): AuthStore => {
  return getContext(AUTH_STORE_KEY)
}