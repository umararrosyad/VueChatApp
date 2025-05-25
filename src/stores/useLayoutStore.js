import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    drawer: true,
  }),
  actions: {
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    openDrawer () {
      this.drawer = true
    },
    closeDrawer () {
      this.drawer = false
    },
  },
})
