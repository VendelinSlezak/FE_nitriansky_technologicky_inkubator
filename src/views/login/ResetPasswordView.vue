<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="bg-white p-8 rounded-2xl shadow-xl shadow-blue-100 border border-gray-100 w-full max-w-md">
      
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
          <span class="text-white font-black text-2xl italic">NTI</span>
        </div>
        <h1 class="text-2xl font-extrabold text-gray-900 uppercase tracking-tight">Zabudnuté heslo</h1>
        <p class="text-gray-500 text-sm mt-2 font-medium">Zadajte svoj email a my vám pošleme odkaz na obnovu hesla.</p>
      </div>

      <form @submit.prevent="handleReset" class="space-y-6">
        
        <div>
          <label for="reset-email" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">
            Emailová adresa
          </label>
          <input 
            id="reset-email"
            v-model="email"
            type="email" 
            required
            placeholder="meno@domena.sk"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <div class="text-center py-2">
          <p class="text-[10px] text-gray-400">
            Tento formulár je chránený službou reCAPTCHA v3.
          </p>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
        >
          <span v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ loading ? 'ODOSIELAM...' : 'OBNOVIŤ HESLO' }}
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-gray-100 text-center">
        <p class="text-sm text-gray-600 font-medium">
          Spomenuli ste si na heslo? 
          <router-link to="/login" class="text-blue-600 font-bold hover:underline ml-1">
            Prihláste sa
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ResetPasswordView',
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      email: '',
      loading: false
    }
  },
  methods: {
    async handleReset() {
      await this.$recaptchaLoaded();
      const token = await this.$recaptcha('password_reset');
      if (!token) {
        throw new Error("Nepodarilo sa získať CAPTCHA token.");
      }

      try {
        this.loading = true;
        const response = await axios.post(`${this.backendApiUrl}/api/auth/reset-password-request`, {
          "email": this.email,
          "g-recaptcha-response": token
        });
        alert('Ak je tento email registrovaný, poslali sme naň inštrukcie na obnovu hesla.');
        this.$router.push('/login');
      }
      catch (error) {
        alert(error.response.data.message);
      }
      finally {
        this.loading = false;
      }
    }
  }
}
</script>