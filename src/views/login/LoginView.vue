<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="bg-white p-8 rounded-2xl shadow-xl shadow-blue-100 border border-gray-100 w-full max-w-md">
      
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
          <span class="text-white font-black text-2xl italic">NTI</span>
        </div>
        <h1 class="text-2xl font-extrabold text-gray-900 uppercase tracking-tight">Vitajte späť</h1>
        <p class="text-gray-500 text-sm mt-2 font-medium">Prihláste sa do svojho účtu</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <div>
          <label for="email" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">
            Emailová adresa
          </label>
          <input 
            id="email"
            v-model="email"
            type="email" 
            required
            placeholder="meno@domena.sk"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-2 ml-1">
            <label for="password" class="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Heslo
            </label>
            <router-link to="/reset-password" class="text-xs font-bold text-blue-600 hover:text-blue-700">
              ZABUDLI STE HESLO?
            </router-link>
          </div>
          <input 
            id="password"
            v-model="password"
            type="password" 
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ loading ? 'PRIHLASUJEM...' : 'PRIHLÁSIŤ SA' }}
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-gray-100 text-center">
        <p class="text-sm text-gray-600 font-medium">
          Ešte nemáte účet? 
          <router-link to="/register" class="text-blue-600 font-bold hover:underline ml-1">
            Zaregistrujte sa
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      loading: false,

      student: {
        name: 'Ján Nový',
        role: 'Student',
        avatar: null,
        dashboard: '/student-dashboard',
      },
      mentor: {
        name: 'Ján Nový',
        role: 'Mentor',
        avatar: null,
        dashboard: '/mentor-dashboard',
      },
      clen_komisie: {
        name: 'Ján Nový',
        role: 'Člen Komisie',
        avatar: null,
        dashboard: '/committee-member-dashboard',
      },
      admin: {
        name: 'Ján Nový',
        role: 'Admin',
        avatar: null,
        dashboard: '/admin-dashboard',
      },
      administrator_firmy: {
        name: 'Ján Nový',
        role: 'Administrator firmy',
        avatar: null,
        dashboard: '/firm-dashboard',
      },
      editor_webu: {
        name: 'Ján Nový',
        role: 'Editor webu',
        avatar: null,
        dashboard: '/editor-dashboard/edit-news',
      },
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isLoggedIn', 'user', 'userInitials']),
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),

    handleSubmit() {
      this.loading = true;
      
      // Simulácia API volania
      console.log('Prihlasujem užívateľa:', {
        email: this.email,
        password: this.password
      });

      setTimeout(() => {
        this.loading = false;
        this.login(this.administrator_firmy);
        this.$router.push(this.administrator_firmy.dashboard);
      }, 300);
    }
  }
}
</script>