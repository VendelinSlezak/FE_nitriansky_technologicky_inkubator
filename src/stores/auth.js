import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false, 
    user: null,
    token: localStorage.getItem('token') || null,
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
    login(loginData) {
      this.isLoggedIn = true;
      this.token = loginData.token;
      this.user = {
        name: loginData.name,
        role: loginData.role,
        avatar: loginData.avatar,
        dashboard: loginData.dashboard,
      };
      localStorage.setItem('token', this.token);
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  }
})