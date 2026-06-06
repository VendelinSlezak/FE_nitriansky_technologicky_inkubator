<template>
  <div class="p-6 max-w-4xl mx-auto text-slate-800 animate-in">
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
      <div class="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p class="text-sm font-medium text-slate-500">Načítavam údaje používateľa...</p>
    </div>

    <div v-else>
      <div class="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-extrabold text-slate-800">Upraviť účet</h2>
            <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white', roleAccentColor]">
              {{ currentRoleLabel }}
            </span>
          </div>
          <p class="text-slate-500 text-sm mt-1 font-medium italic">{{ form.email }}</p>
        </div>
        <button @click="goBack" class="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest flex items-center gap-2 group">
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Zrušiť zmeny
        </button>
      </div>

      <div class="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        <div :class="['h-2 w-full transition-colors duration-500', roleAccentColor]"></div>
        
        <form @submit.prevent="handleUpdate" class="p-8 md:p-12 space-y-10">
          
          <div v-if="form.role === 'student'" class="space-y-6">
            <div>
              <h3 class="text-sm font-black text-blue-600 uppercase tracking-widest">Profil študenta</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">Aktualizujte osobné údaje a akademické informácie.</p>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <input v-model="form.name" type="text" required placeholder="Meno" :class="inputBaseClass" />
              <div class="md:col-span-2">
                <input v-model="form.university" type="text" required placeholder="Univerzita" :class="inputBaseClass" />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Aktuálny životopis</label>
                <div :class="uploadBoxClass">
                  <input type="file" @change="handleCvUpload" class="hidden" id="cv-upload" accept=".pdf" />
                  <label for="cv-upload" class="flex items-center justify-between cursor-pointer w-full">
                    <span class="text-sm font-medium" :class="form.cvName ? 'text-blue-600' : 'text-slate-400'">
                      {{ form.cvName || 'Ponechať pôvodný súbor alebo nahrať nový...' }}
                    </span>
                    <span class="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase">Vymeniť CV</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="form.role === 'company_admin'" class="space-y-6">
            <div>
              <h3 class="text-sm font-black text-emerald-600 uppercase tracking-widest">Firemný profil</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">Správa fakturačných údajov, adresy a loga spoločnosti.</p>
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <input v-model="form.name" type="text" required placeholder="Názov spoločnosti" :class="inputBaseClass" />
              </div>
              <input v-model="form.ico" type="text" required placeholder="IČO" :class="inputBaseClass" />
              <input v-model="form.dic" type="text" placeholder="DIČ" :class="inputBaseClass" />
              <div class="md:col-span-2">
                 <input v-model="form.contactPerson" type="text" required placeholder="Kontaktná osoba" :class="inputBaseClass" />
              </div>
              <div class="md:col-span-2">
                 <input v-model="form.address" type="text" placeholder="Adresa spoločnosti" :class="inputBaseClass" />
              </div>
              <div class="md:col-span-2">
                 <input v-model="form.category" type="text" placeholder="Kategória / Zameranie" :class="inputBaseClass" />
              </div>
              <div class="md:col-span-2">
                 <textarea v-model="form.companyDescription" rows="3" placeholder="Krátky popis firmy..." :class="inputBaseClass + ' resize-none'"></textarea>
              </div>

              <div class="md:col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Logo spoločnosti</label>
                <div :class="uploadBoxClass">
                  <input type="file" @change="handleLogoUpload" class="hidden" id="logo-upload" accept="image/*" />
                  <label for="logo-upload" class="flex items-center justify-between cursor-pointer w-full">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded bg-slate-50 border border-slate-200 overflow-hidden">
                        <img v-if="logoPreview" :src="logoPreview" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-slate-300 text-[8px]">LOGO</div>
                      </div>
                      <span class="text-sm font-medium" :class="form.logoName ? 'text-emerald-600' : 'text-slate-400'">
                        {{ form.logoName || 'Ponechať aktuálne logo...' }}
                      </span>
                    </div>
                    <span class="bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase">Zmeniť logo</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="form.role === 'mentor'" class="space-y-6">
            <div>
              <h3 class="text-sm font-black text-indigo-600 uppercase tracking-widest">Profil mentora</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">Úprava profesijného profilu a zamerania mentora.</p>
            </div>
            <div class="grid gap-6">
              <input v-model="form.name" type="text" required placeholder="Celé meno" :class="inputBaseClass" />
              <input v-model="form.expertise" type="text" placeholder="Expertíza (napr. Vue.js, UI/UX, Product Management)" :class="inputBaseClass" />
              <textarea v-model="form.description" rows="3" placeholder="Krátky popis mentora..." :class="inputBaseClass + ' resize-none'"></textarea>
              <textarea v-model="form.experience" rows="3" placeholder="Predchádzajúce skúsenosti..." :class="inputBaseClass + ' resize-none'"></textarea>
            </div>
          </div>

          <div v-else class="space-y-6">
            <div>
              <h3 class="text-sm font-black text-purple-600 uppercase tracking-widest">Informácie o spolupracovníkovi</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">Úprava mena a titulov člena tímu.</p>
            </div>
            <div class="grid gap-6">
              <input v-model="form.name" type="text" required placeholder="Celé meno" :class="inputBaseClass" />
            </div>
          </div>

          <div class="pt-10 border-t border-slate-100 space-y-6">
            <div>
              <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Zmena prístupových údajov</h3>
            </div>
            <div class="grid gap-6">
              <input v-model="form.email" type="email" required placeholder="E-mailová adresa" :class="inputBaseClass" />
            </div>
          </div>

          <div class="pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <button 
              type="button" 
              @click="confirmDelete"
              :disabled="submitting"
              class="text-xs font-black text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors uppercase tracking-widest flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-xl"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Odstrániť tento účet
            </button>

            <button type="submit" :disabled="submitting" :class="[submitBtnClass, buttonColorClass, submitting ? 'opacity-70 cursor-not-allowed' : '']">
              {{ submitting ? 'Ukladám...' : 'Uložiť vykonané zmeny' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminEditAccountView',
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      loading: true,
      submitting: false,
      inputBaseClass: 'w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm placeholder:text-slate-300',
      uploadBoxClass: 'relative flex items-center px-5 py-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all group',
      submitBtnClass: 'w-full md:w-auto px-10 py-5 rounded-2xl text-white font-black uppercase tracking-[0.25em] text-xs shadow-xl transition-all transform active:scale-[0.98] focus:ring-4 focus:ring-offset-2',
      
      logoPreview: null,
      cvFile: null, cvName: '',
      logoFile: null, logoName: '',
      form: {
        role: 'mentor', 
        email: '',
        name: '', university: '',
        ico: '', dic: '', contactPerson: '', address: '', category: '', companyDescription: '',
        description: '', experience: '', expertise: ''
      }
    }
  },
  computed: {
    currentRoleLabel() {
      const roles = { student: 'Študent', company_admin: 'Firma', company_member: 'Člen firmy', web_editor: 'Editor', committee_member: 'Člen komisie', mentor: 'Mentor' };
      return roles[this.form.role] || 'Neznáma rola';
    },
    roleAccentColor() {
      const colors = { student: 'bg-blue-600', company_admin: 'bg-emerald-600', editor: 'bg-orange-500', committee: 'bg-purple-600', mentor: 'bg-indigo-600' };
      return colors[this.form.role] || 'bg-slate-600';
    },
    buttonColorClass() {
      if (this.form.role === 'student') return 'bg-blue-600 hover:bg-blue-700 shadow-blue-100 focus:ring-blue-500';
      if (this.form.role === 'company_admin') return 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 focus:ring-emerald-500';
      if (this.form.role === 'mentor') return 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 focus:ring-indigo-500';
      return 'bg-slate-900 hover:bg-black shadow-slate-200 focus:ring-slate-400';
    }
  },
  mounted() {
    document.title = "Nitriansky technologický inkubátor";
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get(`${this.backendApiUrl}/api/auth/user/${this.id}`);
        this.form = response.data;
      }
      catch (error) {
        console.error('Chyba pri načítavaní dát:', error);
        alert('Nepodarilo sa načítať údaje používateľa.');
      }
      finally {
        this.loading = false;
      }
    },
    handleCvUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.cvFile = file;
        this.cvName = file.name;
      }
    },
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.logoFile = file;
        this.logoName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => { this.logoPreview = e.target.result; };
        reader.readAsDataURL(file);
      }
    },
    async confirmDelete() {
      if (confirm(`Naozaj chcete natrvalo odstrániť účet ${this.form.email}? Táto akcia je nevratná.`)) {
        try {
          await axios.delete(`${this.backendApiUrl}/api/auth/user/${this.form.id}`);
          this.$router.push('/admin-dashboard/manage-accounts');
        }
        catch (error) {
          console.error('Chyba pri odstranení účtu:', error);
          alert('Nepodarilo sa odstrániť účet.');
        }
      }
    },
    goBack() {
      this.$router.push('/admin-dashboard/manage-accounts');
    },
    async handleUpdate() {
      this.submitting = true;
      try {
        const formData = new FormData();
        if(this.form.role === 'company_admin') {
          formData.append('companyName', this.form.name);
          formData.append('ico', this.form.ico);
          formData.append('dic', this.form.dic);
          formData.append('name_of_contact_person', this.form.contactPerson);
          formData.append('company_address', this.form.address);
          formData.append('category', this.form.category);
          formData.append('description', this.form.companyDescription);
          if(this.logoFile) {
            formData.append('logo', this.logoFile);
          }
        }
        if(this.form.role === 'mentor') {
          formData.append('description', this.form.description);
          formData.append('experience', this.form.experience);
          formData.append('expertise', this.form.expertise);
        }
        if(this.form.role === 'student') {
          formData.append('university', this.form.university);
          if(this.cvFile) {
            formData.append('curriculum_vitae', this.cvFile);
          }
        }
        formData.append('name', this.form.name);
        formData.append('email', this.form.email);
        await axios.post(`${this.backendApiUrl}/api/auth/user/${this.form.id}`, formData);
        
        this.$router.push('/admin-dashboard/manage-accounts');
      }
      catch (error) {
        console.error('Chyba pri ukladaní dát:', error);
        alert('Pri ukladaní zmien nastala chyba. Skontrolujte zadané údaje.');
      }
      finally {
        this.submitting = false;
      }
    }
  }
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>