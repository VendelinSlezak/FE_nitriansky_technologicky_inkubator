import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('token') ? true : false, 
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', this.token);
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  }
})