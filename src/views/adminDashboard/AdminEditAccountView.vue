<template>
  <div class="p-6 max-w-4xl mx-auto text-slate-800 animate-in">
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
            <input v-model="form.firstName" type="text" required placeholder="Meno" :class="inputBaseClass" />
            <input v-model="form.lastName" type="text" required placeholder="Priezvisko" :class="inputBaseClass" />
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

        <div v-else-if="form.role === 'firm'" class="space-y-6">
          <div>
            <h3 class="text-sm font-black text-emerald-600 uppercase tracking-widest">Firemný profil</h3>
            <p class="text-xs text-slate-500 mt-1 font-medium">Správa fakturačných údajov a loga spoločnosti.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <input v-model="form.companyName" type="text" required placeholder="Názov spoločnosti" :class="inputBaseClass" />
            </div>
            <input v-model="form.ico" type="text" required placeholder="IČO" :class="inputBaseClass" />
            <input v-model="form.dic" type="text" placeholder="DIČ" :class="inputBaseClass" />
            <div class="md:col-span-2">
               <input v-model="form.contactPerson" type="text" required placeholder="Kontaktná osoba" :class="inputBaseClass" />
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

        <div v-else class="space-y-6">
          <div>
            <h3 class="text-sm font-black text-purple-600 uppercase tracking-widest">Informácie o spolupracovníkovi</h3>
            <p class="text-xs text-slate-500 mt-1 font-medium">Úprava mena a titulov člena tímu.</p>
          </div>
          <div class="grid gap-6">
            <input v-model="form.fullName" type="text" required placeholder="Celé meno" :class="inputBaseClass" />
          </div>
        </div>

        <div class="pt-10 border-t border-slate-100 space-y-6">
          <div>
            <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Zmena prístupových údajov</h3>
            <p class="text-xs text-slate-500 mt-1 font-medium">E-mail je primárny identifikátor. Heslo vyplňte len ak ho chcete zmeniť.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <input v-model="form.email" type="email" required placeholder="E-mailová adresa" :class="inputBaseClass" />
            <input v-model="form.password" type="password" placeholder="Nové heslo (nechajte prázdne)" :class="inputBaseClass" />
          </div>
        </div>

        <div class="pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <button 
            type="button" 
            @click="confirmDelete"
            class="text-xs font-black text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-xl"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Odstrániť tento účet
          </button>

          <button type="submit" :class="[submitBtnClass, buttonColorClass]">
            Uložiť vykonané zmeny
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminEditAccountView',
  props: {
    // Predpokladáme, že ID dostaneme z routera
    id: { type: String, required: true }
  },
  data() {
    return {
      inputBaseClass: 'w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm placeholder:text-slate-300',
      uploadBoxClass: 'relative flex items-center px-5 py-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all group',
      submitBtnClass: 'w-full md:w-auto px-10 py-5 rounded-2xl text-white font-black uppercase tracking-[0.25em] text-xs shadow-xl transition-all transform active:scale-[0.98] focus:ring-4 focus:ring-offset-2',
      
      logoPreview: null,
      form: {
        role: '', // Načíta sa z API
        email: '',
        password: '',
        firstName: '', lastName: '', university: '',
        cvFile: null, cvName: '',
        companyName: '', ico: '', dic: '', contactPerson: '',
        logoFile: null, logoName: '',
        fullName: ''
      }
    }
  },
  computed: {
    currentRoleLabel() {
      const roles = { student: 'Študent', firm: 'Firma', editor: 'Editor', committee: 'Komisia', mentor: 'Mentor' };
      return roles[this.form.role] || 'Neznáma rola';
    },
    roleAccentColor() {
      const colors = { student: 'bg-blue-600', firm: 'bg-emerald-600', editor: 'bg-orange-500', committee: 'bg-purple-600', mentor: 'bg-indigo-600' };
      return colors[this.form.role] || 'bg-slate-600';
    },
    buttonColorClass() {
      if (this.form.role === 'student') return 'bg-blue-600 hover:bg-blue-700 shadow-blue-100 focus:ring-blue-500';
      if (this.form.role === 'firm') return 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 focus:ring-emerald-500';
      return 'bg-slate-900 hover:bg-black shadow-slate-200 focus:ring-slate-400';
    }
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
        const studentData = {
            id: "user-123",
            role: "student",
            email: "patrik.studos@student.ukf.sk",
            firstName: "Patrik",
            lastName: "Vysokoškolák",
            university: "UKF v Nitre, Fakulta prírodných vied a informatiky",
            cvName: "zivotopis_patrik_final.pdf", // Názov pre zobrazenie v UI
            cvFile: null, // Tu by bol File objekt po nahraní nového
            avatarBg: "bg-blue-600"
        };

        // 2. FIRMA (Identické polia ako RegisterFirmView)
        const firmaData = {
            id: "user-456",
            role: "firm",
            email: "info@techsolutions.sk",
            companyName: "TechSolutions s.r.o.",
            ico: "36123456",
            dic: "2021234567",
            contactPerson: "Ing. Peter Kováč",
            logoName: "tech_logo_2024.png", // Názov pre zobrazenie v UI
            logoPreview: "https://placehold.co/100x100?text=TS", // Simulovaný náhľad existujúceho loga
            logoFile: null,
            avatarBg: "bg-emerald-600"
        };

        // 3. EDITOR STRÁNKY
        const editorData = {
            id: "user-789",
            role: "editor",
            email: "marek.admin@nti.sk",
            fullName: "Mgr. Marek Redaktor",
            avatarBg: "bg-orange-500"
        };

        // 4. ČLEN KOMISIE
        const committeeData = {
            id: "user-101",
            role: "committee",
            email: "jana.profesorka@uni.sk",
            fullName: "prof. RNDr. Jana Vzdelaná, DrSc.",
            avatarBg: "bg-purple-600"
        };

        // 5. MENTOR
        const mentorData = {
            id: "user-202",
            role: "mentor",
            email: "stefan.skuseny@prax.sk",
            fullName: "Ing. Štefan Mentor",
            avatarBg: "bg-indigo-600"
        };
      
      this.form = { ...this.form, ...studentData };
      // Ak by to bola firma, tu by sme nastavili aj existujúce logo do preview
      // this.logoPreview = 'https://api.nti.sk/storage/logos/spacex.png';
    },
    handleCvUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.cvFile = file;
        this.form.cvName = file.name;
      }
    },
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.logoFile = file;
        this.form.logoName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => { this.logoPreview = e.target.result; };
        reader.readAsDataURL(file);
      }
    },
    confirmDelete() {
      if (confirm(`Naozaj chcete natrvalo odstrániť účet ${this.form.email}? Táto akcia je nevratná.`)) {
        console.log('Mažem účet ID:', this.id);
        alert('Účet bol úspešne odstránený.');
        this.goBack();
      }
    },
    goBack() {
      this.$router.push('/admin-dashboard/manage-accounts');
    },
    handleUpdate() {
      console.log('Aktualizujem dáta:', this.form);
      alert('Zmeny boli úspešne uložené.');
      this.goBack();
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