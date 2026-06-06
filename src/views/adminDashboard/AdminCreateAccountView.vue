<template>
  <div class="p-6 max-w-4xl mx-auto text-slate-800 animate-in">
    <div class="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-800">Vytvoriť nový účet</h2>
        <p class="text-slate-500 text-sm mt-1 font-medium">Manuálne pridanie používateľa a nastavenie jeho oprávnení.</p>
      </div>
      <button @click="goBack" :disabled="submitting" class="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest flex items-center gap-2 group disabled:opacity-50">
        <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Späť do zoznamu
      </button>
    </div>

    <div class="mb-10">
      <div class="mb-4">
        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Typ používateľského účtu</label>
        <p class="text-xs text-slate-500 mt-1">Výber roly ovplyvní požadované údaje a rozsah prístupu v systéme.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="role in roles" :key="role.value" @click="changeRole(role.value)" :disabled="submitting"
          :class="[roleTabClass, form.role === role.value ? 'border-blue-600 bg-blue-600 text-white shadow-md' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200', submitting ? 'opacity-50 cursor-not-allowed' : '']"
        >
          {{ role.label }}
        </button>
      </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
      <div :class="['h-2 w-full transition-colors duration-500', roleAccentColor]"></div>
      
      <form @submit.prevent="handleSubmit" class="p-8 md:p-12 space-y-10">
        
        <div v-if="form.role === 'student'" class="space-y-6 animate-in">
          <div>
            <h3 class="text-sm font-black text-blue-600 uppercase tracking-widest">Informácie o študentovi</h3>
            <p class="text-xs text-slate-500 mt-1 font-medium">Zadajte základné identifikačné údaje študenta a jeho akademickú príslušnosť.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <input v-model="form.name" type="text" required placeholder="Celé meno" :class="inputBaseClass" />
            </div>
            <div class="md:col-span-2">
              <input v-model="form.university" type="text" required placeholder="Názov univerzity a fakulty" :class="inputBaseClass" />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Životopis (PDF format)</label>
              <div :class="uploadBoxClass">
                <input type="file" @change="handleCvUpload" class="hidden" id="cv-upload" accept=".pdf" />
                <label for="cv-upload" class="flex items-center justify-between cursor-pointer w-full">
                  <span class="text-sm font-medium" :class="cvName ? 'text-blue-600' : 'text-slate-400'">
                    {{ cvName || 'Kliknite pre nahranie životopisu...' }}
                  </span>
                  <span class="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase">Pridať súbor</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="form.role === 'company_admin'" class="space-y-6 animate-in">
          <div>
            <h3 class="text-sm font-black text-emerald-600 uppercase tracking-widest">Firemné údaje</h3>
            <p class="text-xs text-slate-500 mt-1 font-medium">Uveďte fakturačné údaje, adresu a nahrajte oficiálne logo spoločnosti pre profil.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <input v-model="form.name" type="text" required placeholder="Obchodné meno / Názov spoločnosti (napr. Firma s.r.o.)" :class="inputBaseClass" />
            </div>
            <input v-model="form.ico" type="text" required placeholder="IČO" :class="inputBaseClass" />
            <input v-model="form.dic" type="text" placeholder="DIČ" :class="inputBaseClass" />
            <div class="md:col-span-2">
               <input v-model="form.contactPerson" type="text" required placeholder="Meno kontaktnej osoby" :class="inputBaseClass" />
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
                    <div v-if="logoPreview" class="w-8 h-8 rounded bg-slate-50 border border-slate-200 overflow-hidden">
                      <img :src="logoPreview" class="w-full h-full object-cover" />
                    </div>
                    <span class="text-sm font-medium" :class="logoName ? 'text-emerald-600' : 'text-slate-400'">
                      {{ logoName || 'Vyberte súbor loga...' }}
                    </span>
                  </div>
                  <span class="bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-black uppercase">Nahrať obrázok</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="form.role === 'mentor'" class="space-y-6 animate-in">
          <div>
            <h3 class="text-sm font-black text-indigo-600 uppercase tracking-widest">Profil mentora</h3>
            <p class="text-xs text-slate-500 mt-1 font-medium">Zadajte profesijný profil a zameranie mentora.</p>
          </div>
          <div class="grid gap-6">
            <input v-model="form.name" type="text" required placeholder="Celé meno" :class="inputBaseClass" />
            <input v-model="form.expertise" type="text" placeholder="Expertíza (napr. Vue.js, UI/UX, Product Management)" :class="inputBaseClass" />
            <textarea v-model="form.description" rows="3" placeholder="Krátky popis mentora..." :class="inputBaseClass + ' resize-none'"></textarea>
            <textarea v-model="form.experience" rows="3" placeholder="Predchádzajúce skúsenosti..." :class="inputBaseClass + ' resize-none'"></textarea>
          </div>
        </div>

        <div v-else class="space-y-6 animate-in">
          <div>
            <h3 class="text-sm font-black text-purple-600 uppercase tracking-widest">Interný spolupracovník</h3>
            <p class="text-xs text-slate-500 mt-1 font-medium">Zadajte celé meno pracovníka vrátane akademických titulov.</p>
          </div>
          <div class="grid gap-6">
            <input v-model="form.name" type="text" required placeholder="doc. Ing. Jozef Novák, PhD." :class="inputBaseClass" />
          </div>
        </div>

        <div class="pt-10 border-t border-slate-100 space-y-6">
          <div>
            <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Prihlasovacie údaje</h3>
            <p class="text-xs text-slate-500 mt-1 font-medium">Tieto údaje budú slúžiť používateľovi na prvý vstup do systému.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <input v-model="form.email" type="email" required placeholder="E-mailová adresa" :class="inputBaseClass" />
            <input v-model="form.password" type="password" required placeholder="Počiatočné heslo" :class="inputBaseClass" />
          </div>
        </div>

        <div class="pt-6">
          <button type="submit" :disabled="submitting" :class="[submitBtnClass, buttonColorClass, submitting ? 'opacity-70 cursor-not-allowed' : '']">
            {{ submitting ? 'Vytváram...' : 'Vytvoriť používateľský profil' }}
          </button>
          <p class="text-center text-slate-400 text-[10px] mt-6 font-medium italic">
            Poznámka: Po vytvorení účtu bude možné nahrávať ďalšie prílohy v sekcii úpravy profilu.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminCreateAccountView',
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      submitting: false,
      inputBaseClass: 'w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm placeholder:text-slate-300',
      uploadBoxClass: 'relative flex items-center px-5 py-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all group',
      roleTabClass: 'px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border-2',
      submitBtnClass: 'w-full py-5 rounded-2xl text-white font-black uppercase tracking-[0.25em] text-xs shadow-xl transition-all transform active:scale-[0.98] focus:ring-4 focus:ring-offset-2',
      
      logoPreview: null,
      cvFile: null,
      cvName: '',
      logoFile: null,
      logoName: '',
      
      roles: [
        { label: 'Študent', value: 'student' },
        { label: 'Firma', value: 'company_admin' },
        { label: 'Mentor', value: 'mentor' },
        { label: 'Editor stránky', value: 'web_editor' },
        { label: 'Člen komisie', value: 'committee_member' },
      ],
      form: {
        role: 'student',
        email: '',
        password: '',
        name: '',
        university: '',
        ico: '', 
        dic: '', 
        contactPerson: '',
        address: '',
        category: '',
        companyDescription: '',
        description: '', 
        experience: '', 
        expertise: ''
      }
    }
  },
  computed: {
    roleAccentColor() {
      const colors = { 
        student: 'bg-blue-600', 
        company_admin: 'bg-emerald-600', 
        company_member: 'bg-teal-500',
        web_editor: 'bg-orange-500', 
        committee_member: 'bg-purple-600', 
        mentor: 'bg-indigo-600' 
      };
      return colors[this.form.role] || 'bg-slate-600';
    },
    buttonColorClass() {
      if (this.form.role === 'student') return 'bg-blue-600 hover:bg-blue-700 shadow-blue-100 focus:ring-blue-500';
      if (this.form.role === 'company_admin') return 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 focus:ring-emerald-500';
      if (this.form.role === 'mentor') return 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 focus:ring-indigo-500';
      return 'bg-slate-900 hover:bg-black shadow-slate-200 focus:ring-slate-400';
    }
  },
  methods: {
    changeRole(newRole) {
      this.form.role = newRole;
      this.cvFile = null;
      this.cvName = '';
      this.logoFile = null;
      this.logoName = '';
      this.logoPreview = null;
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
    goBack() {
      this.$router.push('/admin-dashboard/manage-accounts');
    },
    async handleSubmit() {
      this.submitting = true;
      try {
        const formData = new FormData();
        
        formData.append('type', this.form.role);
        formData.append('email', this.form.email);
        formData.append('password', this.form.password);
        formData.append('name', this.form.name);

        if (this.form.role === 'company_admin') {
          formData.append('company_name', this.form.name);
          formData.append('ico', this.form.ico);
          formData.append('dic', this.form.dic || '');
          formData.append('name_of_contact_person', this.form.contactPerson);
          formData.append('company_address', this.form.address || '');
          formData.append('category', this.form.category || '');
          formData.append('description', this.form.companyDescription || '');
          if (this.logoFile) {
            formData.append('logo', this.logoFile);
          }
        }
        
        if (this.form.role === 'mentor') {
          formData.append('description', this.form.description || '');
          formData.append('experience', this.form.experience || '');
          formData.append('expertise', this.form.expertise || '');
        }
        
        if (this.form.role === 'student') {
          formData.append('university', this.form.university);
          if (this.cvFile) {
            formData.append('curriculum_vitae', this.cvFile);
          }
        }

        await axios.post(`${this.backendApiUrl}/api/auth/create-account`, formData);

        alert('Používateľ bol úspešne vytvorený.');
        this.goBack();
      }
      catch (error) {
        console.error('Chyba pri vytváraní účtu:', error);
        alert('Pri vytváraní účtu nastala chyba. Skontrolujte zadané údaje.');
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