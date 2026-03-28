<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="bg-white p-8 rounded-2xl shadow-xl shadow-blue-100 border border-gray-100 w-full max-w-md transition-all duration-500">
      
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
          <span class="text-white font-black text-2xl italic">NTI</span>
        </div>
        
        <template v-if="!isFinished">
          <h1 class="text-2xl font-extrabold text-gray-900 uppercase tracking-tight">Nové heslo</h1>
          <p class="text-gray-500 text-sm mt-2 font-medium">Zvoľte si svoje nové bezpečné heslo.</p>
        </template>
        
        <template v-else>
          <h1 class="text-2xl font-extrabold text-green-600 uppercase tracking-tight">Hotovo!</h1>
          <p class="text-gray-500 text-sm mt-2 font-medium">Vaše heslo bolo úspešne zmenené.</p>
        </template>
      </div>

      <form v-if="!isFinished" @submit.prevent="handleUpdate" class="space-y-6">
        
        <div>
          <label for="new-password" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">
            Nové heslo
          </label>
          <input 
            id="new-password"
            v-model="password"
            type="password" 
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <div>
          <label for="confirm-password" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">
            Zopakujte nové heslo
          </label>
          <input 
            id="confirm-password"
            v-model="passwordConfirm"
            type="password" 
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
        >
          <span v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ loading ? 'UKLADÁM...' : 'ULOŽIŤ HESLO' }}
        </button>
      </form>

      <div v-else class="text-center space-y-6 animate-fade-in">
        <div class="py-4 text-gray-600 font-medium leading-relaxed">
          Teraz sa už môžete prihlásiť do systému pomocou vášho nového hesla.
        </div>
        
        <router-link 
          to="/login"
          class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm"
        >
          PREJSŤ NA PRIHLÁSENIE
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateResettedPasswordView',
  props: {
    token: { type: String, required: true },
  },
  data() {
    return {
      password: '',
      passwordConfirm: '',
      loading: false,
      isFinished: false
    }
  },
  methods: {
    handleUpdate() {
      // Základná validácia
      if (this.password !== this.passwordConfirm) {
        alert("Heslá sa nezhodujú!");
        return;
      }

      if (this.password.length < 8) {
        alert("Heslo musí mať aspoň 8 znakov.");
        return;
      }

      this.loading = true;
      
      // Simulácia uloženia nového hesla do databázy
      setTimeout(() => {
        this.loading = false;
        this.isFinished = true; // Prepne zobrazenie na úspešné dokončenie
      }, 1500);
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>