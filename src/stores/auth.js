import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false, 
    user: null,
  }),

  getters: {
    userInitials: (state) => {
      if (!state.user.name) return '?';
      return state.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    }
  },

  actions: {
    login(newData) {
      this.isLoggedIn = true;
      this.user = { ...this.user, ...newData };
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
  }
})