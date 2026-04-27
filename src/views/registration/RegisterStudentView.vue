<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      
      <button 
        @click="goBack()" 
        class="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 mb-8 transition-colors group"
      >
        <svg class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        SPÄŤ
      </button> 

      <div class="bg-white rounded-3xl shadow-xl shadow-blue-100 border border-gray-100 overflow-hidden">
        <div class="bg-blue-600 p-8 text-white">
          <h1 class="text-2xl font-black uppercase tracking-tight">Registrácia študenta</h1>
          <p class="text-blue-100 text-sm mt-1 font-medium">Vyplňte údaje a získajte prístup k mentorom.</p>
        </div>

        <form @submit.prevent="handleRegister" class="p-8 space-y-6">
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Meno</label>
              <input v-model="form.firstName" type="text" required placeholder="Ján" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Priezvisko</label>
              <input v-model="form.lastName" type="text" required placeholder="Novák" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Univerzita</label>
            <input v-model="form.university" type="text" required placeholder="napr. UKF v Nitre" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm" />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Univerzitný Email</label>
            <input v-model="form.email" type="email" required placeholder="jan.novak@student.ukf.sk" class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm" />
            <p class="text-[10px] text-gray-400 mt-2 ml-1 italic font-medium">Overenie prebieha cez doménu vašej univerzity.</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Životopis</label>
            <div class="relative group border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all text-center">
              <input type="file" @change="handleFileUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" />
              <div class="space-y-2">
                <svg class="w-8 h-8 mx-auto text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div class="text-sm text-gray-500">
                  <span v-if="!form.cvName" class="font-bold text-blue-600 underline">Nahrajte súbor</span> alebo ho sem presuňte
                  <p v-if="form.cvName" class="mt-2 text-gray-900 font-black text-xs uppercase tracking-widest">{{ form.cvName }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Heslo</label>
              <input v-model="form.password" type="password" placeholder="••••••••" required class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-2 ml-1">Zopakovať heslo</label>
              <input v-model="form.passwordConfirm" type="password" placeholder="••••••••" required class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm" />
            </div>
          </div>

          <label class="flex items-center gap-3 py-2 cursor-pointer group">
            <input v-model="form.gdpr" type="checkbox" required class="w-5 h-5 text-blue-600 rounded-lg border-gray-300 focus:ring-blue-500 transition-all cursor-pointer" />
            <span class="text-xs text-gray-600 leading-tight font-medium group-hover:text-gray-900 transition-colors">
                Súhlasím so <a href="/gdpr" class="text-blue-600 underline font-bold hover:text-blue-700">spracovaním osobných údajov</a> v súlade s pravidlami NTI.
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
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.97] uppercase tracking-widest text-sm disabled:opacity-50"
          >
            {{ loading ? 'Spracovávam...' : 'Vytvoriť študentský účet' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterStudentView',
  data() {
    return {
      loading: false,
      form: {
        firstName: '',
        lastName: '',
        university: '',
        email: '',
        cvFile: null,
        cvName: '',
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
      } else {
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
        this.form.cvFile = file;
        this.form.cvName = file.name;
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
        const token = await this.$recaptcha('student_registration');

        if (!token) {
          throw new Error("Nepodarilo sa získať CAPTCHA token.");
        }

        const formData = new FormData();
        formData.append('first_name', this.form.firstName);
        formData.append('last_name', this.form.lastName);
        formData.append('university', this.form.university);
        formData.append('email', this.form.email);
        formData.append('password', this.form.password);
        formData.append('password_confirmation', this.form.passwordConfirm);
        formData.append('gdpr', this.form.gdpr ? "1" : "0");
        if (this.form.cvFile) {
          formData.append('cv', this.form.cvFile);
        }
        formData.append('g-recaptcha-response', token);
        
        console.log(token); // debug

        const response = await axios.post(`http://localhost:8080/api/auth/registration/student`, formData);

        console.log('Úspešná registrácia:', response.data);
        this.$router.push('/register-success');

      }
      catch (error) {
        console.error('Chyba pri registrácii:', error);
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
