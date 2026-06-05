<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      
      <button 
        @click="goBack()" 
        class="inline-flex items-center text-sm font-bold text-gray-500 hover:text-emerald-600 mb-8 transition-colors group"
      >
        <svg class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        SPÄŤ
      </button>

      <div class="bg-white rounded-3xl shadow-xl shadow-emerald-100 border border-gray-100 overflow-hidden">
        <div class="bg-emerald-600 p-8 text-white">
          <h1 class="text-2xl font-black uppercase tracking-tight">Registrácia firmy</h1>
          <p class="text-emerald-100 text-sm mt-1 font-medium">Staňte sa partnerom a podporte inovácie v NTI.</p>
        </div>

        <form @submit.prevent="handleRegister" class="p-8 space-y-6">
          
          <div class="grid md:grid-cols-1 gap-6">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Názov spoločnosti</label>
              <input 
                v-model="form.companyName" 
                type="text" 
                required 
                placeholder="Názov s.r.o. / a.s." 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">IČO</label>
              <input 
                v-model="form.ico" 
                type="text" 
                required 
                placeholder="12345678" 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">DIČ</label>
              <input 
                v-model="form.dic" 
                type="text" 
                placeholder="2021234567" 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Adresa firmy</label>
              <input 
                v-model="form.companyAddress" 
                type="text" 
                required 
                placeholder="Hlavná 123, 949 01 Nitra" 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Kategória / Odvetvie</label>
              <input 
                v-model="form.category" 
                type="text" 
                required 
                placeholder="napr. Informačné technológie" 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Krátky popis firmy</label>
            <textarea 
              v-model="form.description" 
              required 
              rows="3"
              placeholder="Čomu sa vaša spoločnosť venuje a aké technológie/inovácie podporujete..." 
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Logo</label>
            <div class="relative group border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-center">
              <input 
                type="file" 
                @change="handleFileUpload" 
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept=".png,.jpg,.jpeg" 
              />
              <div class="space-y-2">
                <svg class="w-8 h-8 mx-auto text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div class="text-sm text-gray-500">
                  <span v-if="!form.logoName" class="font-bold text-emerald-600 underline">Nahrajte súbor</span> alebo ho sem presuňte
                  <p v-if="form.logoName" class="mt-2 text-gray-900 font-black text-xs uppercase tracking-widest">{{ form.logoName }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
            <div class="md:col-span-2 mt-2">
                <p class="text-[11px] font-black text-emerald-600 uppercase tracking-widest">Kontaktná osoba a prístup</p>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Meno a Priezvisko</label>
              <input 
                v-model="form.contactPerson" 
                type="text" 
                required 
                placeholder="Ing. Jozef Mrkva" 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Email (Prihlasovacie meno)</label>
              <input 
                v-model="form.email" 
                type="email" 
                required 
                placeholder="firma@spolocnost.sk" 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Heslo</label>
              <input 
                v-model="form.password" 
                type="password" 
                placeholder="••••••••"
                required 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Zopakovať heslo</label>
              <input 
                v-model="form.passwordConfirm" 
                type="password" 
                placeholder="••••••••"
                required 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-sm" 
              />
            </div>
          </div>

          <label class="flex items-center gap-3 py-2 cursor-pointer group">
            <input 
                v-model="form.gdpr" 
                type="checkbox" 
                required 
                class="w-5 h-5 text-emerald-600 rounded-lg border-gray-300 focus:ring-emerald-500 transition-all cursor-pointer" 
            />
            <span class="text-xs text-gray-600 leading-tight font-medium group-hover:text-gray-900 transition-colors">
                Súhlasím so <a href="/gdpr" class="text-emerald-600 underline font-bold hover:text-emerald-700">spracovaním osobných údajov</a> právnickej osoby.
            </span>
          </label>

          <div class="text-center py-2">
            <p class="text-[10px] text-gray-400">
              Tento formulár je chránený službou reCAPTCHA v3.
            </p>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all transform active:scale-[0.97] uppercase tracking-widest text-sm disabled:opacity-50"
          >
            {{ loading ? 'Spracovávam...' : 'Vytvoriť firemný účet' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterFirmView',
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      loading: false,
      form: {
        companyName: '',
        ico: '',
        dic: '',
        companyAddress: '',
        category: '',
        description: '',
        logoFile: null,
        logoName: '',
        contactPerson: '',
        email: '',
        password: '',
        passwordConfirm: '',
        gdpr: false
      }
    }
  },
  methods: {
    goBack() {
        if(window.history.state && window.history.state.back) {
            this.$router.back();
        }
        else {
            this.$router.push('/');
        }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert("Súbor je príliš veľký (max 2MB)");
          event.target.value = '';
          return;
        }
        this.form.logoFile = file;
        this.form.logoName = file.name;
      }
    },
    async handleRegister() {
      if (this.form.password !== this.form.passwordConfirm) {
        alert("Chyba: Heslá sa musia zhodovať.");
        return;
      }

      this.loading = true;

      try {
        await this.$recaptchaLoaded();
        const token = await this.$recaptcha('company_registration');

        if (!token) {
          throw new Error("Nepodarilo sa získať CAPTCHA token.");
        }

        const formData = new FormData();
        formData.append('company_name', this.form.companyName);
        formData.append('ico', this.form.ico);
        formData.append('dic', this.form.dic);
        formData.append('company_address', this.form.companyAddress);
        formData.append('category', this.form.category);
        formData.append('description', this.form.description);
        formData.append('name_of_contact_person', this.form.contactPerson);
        formData.append('email', this.form.email);
        formData.append('password', this.form.password);
        formData.append('password_confirmation', this.form.passwordConfirm);
        formData.append('gdpr', this.form.gdpr ? "1" : "0");
        
        if (this.form.logoFile) {
          formData.append('logo', this.form.logoFile);
        }
        
        formData.append('g-recaptcha-response', token);

        const response = await axios.post(`${this.backendApiUrl}/api/auth/registration/company`, formData);

        console.log('Úspešná registrácia firmy:', response.data);
        this.$router.push('/register-success');

      }
      catch (error) {
        console.error('Chyba pri registrácii firmy:', error);
        const errorMsg = error.response?.data?.message || "Nastala neočakávaná chyba pri registrácii.";
        alert(errorMsg);
      }
      finally {
        this.loading = false;
      }
    }
  }
}
</script>