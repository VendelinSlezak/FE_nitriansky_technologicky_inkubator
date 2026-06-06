<template>
  <div v-if="project" class="max-w-4xl mx-auto pb-20 px-4 pt-8 text-left">
    <router-link to="/committee-member-dashboard" class="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group font-medium text-left">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Späť na dashboard
    </router-link>

    <div class="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div class="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50">
        <div class="flex items-center gap-3 mb-4">
          <span :class="project.program === 'A' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'" class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
            Program {{ project.program }}
          </span>
          <span class="text-slate-400 text-sm font-bold text-left">ID: #{{ project.id }}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight text-left">{{ project.name_of_challenge }}</h1>
        <p class="mt-4 text-slate-400 flex items-center gap-2 text-lg font-medium text-left">
          Tím: <span class="text-slate-700">{{ project.name_of_team }}</span>
        </p>
      </div>

      <div class="p-8 md:p-10 space-y-12">
        <section class="grid gap-8 font-medium" :class="project.program === 'A' ? 'md:grid-cols-2' : 'grid-cols-1'">
          <div class="space-y-4">
            <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-left">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Zadanie projektu
            </h3>
            <p class="text-slate-700 leading-relaxed text-lg text-left">{{ project.challenge_description }}</p>
          </div>
          
          <div v-if="project.program === 'A'" class="space-y-4">
            <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-left">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M13.488 20.93a2 2 0 01-2.827 0l-7.588-7.588a2 2 0 010-2.827l7.588-7.588a2 2 0 012.827 0l7.588 7.588a2 2 0 010 2.827l-7.588 7.588z" />
              </svg>
              Kategória: <span class="text-slate-600 text-left">{{ project.category }}</span>
            </h3>
            <p class="text-slate-500 italic leading-relaxed text-left">{{ project.category_skills }}</p>
          </div>
        </section>

        <section v-if="project.program === 'B'" class="space-y-4 text-left">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Plánovaný rozpočet</h3>
          <div class="inline-flex items-center gap-4 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl text-emerald-900 font-medium text-left shadow-sm">
            <div class="p-3 bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-600/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div class="text-2xl font-black text-emerald-700 tracking-tight">
                {{ formatCurrency(project.reward) }}
              </div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-600/70 mt-0.5">Finančná dotácia</div>
            </div>
          </div>
        </section>

        <section class="space-y-6 font-medium text-left">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-left">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.415a6 6 0 108.486 8.486L20.5 13" /></svg>
            Prílohy a dokumentácia
          </h3>
          
          <div v-if="hasAnyFiles" class="flex flex-col gap-5">
            <div v-for="(file, label) in mappedFiles" :key="label">
              <label class="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-wider text-left">{{ label }}</label>
              <a :href="file.url" target="_blank" class="flex items-center justify-between p-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all group">
                <span class="font-bold text-slate-700">{{ file.name }}</span>
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
            </div>
          </div>
        </section>

        <section class="space-y-4 text-left">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Členovia tímu</h3>
          <div class="grid sm:grid-cols-2 gap-3 font-medium text-left">
            <div v-for="member in project.team_members" :key="member.id" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-blue-600 shadow-sm text-xs select-none">
                  {{ member.initials }}
                </div>
                <div>
                  <div class="text-sm font-bold text-slate-900">{{ member.name }}</div>
                  <div class="text-[11px] text-slate-500">{{ member.email }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <section v-if="project.decision" class="mt-16 p-8 md:p-10 border-2 rounded-[2.5rem] relative overflow-hidden text-left transition-all"
      :class="project.decision.status === 'accepted' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-amber-50/50 border-amber-100'">
      
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white rounded-lg shadow-sm border border-slate-200" :class="project.decision.status === 'accepted' ? 'text-emerald-600' : 'text-amber-600'">
              <svg v-if="project.decision.status === 'accepted'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
            </div>
            <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight">
              {{ project.decision.status === 'accepted' ? 'Projekt Schválený' : 'Vrátené na dopracovanie' }}
            </h2>
          </div>
        </div>

        <div v-if="project.decision.status === 'accepted'" class="grid md:grid-cols-2 gap-6 font-medium">
          <div :class="(!project.decision.product_owner_email || project.program !== 'B') ? 'md:col-span-2' : ''" class="space-y-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pridelený mentor</label>
            <div class="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <span class="font-bold text-slate-700">{{ project.decision.mentor_email }}</span>
            </div>
          </div>
          <div v-if="project.program === 'B' && project.decision.product_owner_email" class="space-y-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product owner</label>
            <div class="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-emerald-700 font-bold">
              {{ project.decision.product_owner_email }}
            </div>
          </div>
        </div>

        <div class="space-y-2 pt-4 border-t border-slate-200/60">
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vyjadrenie komisie</label>
          <div class="p-6 bg-white border border-slate-200 rounded-3xl italic text-slate-600 leading-relaxed shadow-sm font-medium">
            "{{ project.decision.commission_comment }}"
          </div>
        </div>
      </div>
    </section>

    <section v-if="isZapisovatel" class="mt-16 p-8 md:p-10 bg-white rounded-[2.5rem] border-2 border-blue-100 shadow-2xl shadow-blue-100/30 text-left">
      <div class="space-y-10">
        <h2 class="text-2xl font-black text-slate-900 tracking-tight italic text-left">Rozhodnutie komisie</h2>

        <div class="p-2 bg-slate-100 rounded-2xl flex gap-2">
          <button @click="form.status = 'accepted'" class="flex-1 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all" :class="form.status === 'accepted' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500'">
            Schváliť
          </button>
          <button @click="form.status = 'rejected'" class="flex-1 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all" :class="form.status === 'rejected' ? 'bg-white text-amber-600 shadow-md' : 'text-slate-500'">
            Vrátiť
          </button>
        </div>

        <div class="space-y-8"> 
          <template v-if="form.status === 'accepted'">
            <div class="grid gap-6">
              <div> 
                <label class="block mb-3 text-[11px] font-black uppercase tracking-widest ml-1" :class="errors.mentor_id ? 'text-red-500' : 'text-slate-400'">Pridelený Mentor</label>
                <select v-model="form.mentor_id" class="w-full p-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" :class="errors.mentor_id ? 'border-red-300' : 'border-slate-200'">
                  <option value="">Vyberte mentora...</option>
                  <option v-for="m in dostupniMentori" :key="m.mentor_id" :value="m.mentor_id">{{ m.email }}</option>
                </select>
              </div>
            </div>
          </template>

          <div>
            <label class="block mb-3 text-[11px] font-black uppercase tracking-widest ml-1" :class="errors.commission_comment ? 'text-red-500' : 'text-slate-400'">
              {{ form.status === 'accepted' ? 'Záverečné vyjadrenie' : 'Dôvod vrátenia' }}
            </label>
            <textarea v-model="form.commission_comment" rows="5" class="w-full p-5 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-medium" :class="errors.commission_comment ? 'border-red-300' : 'border-slate-200'"></textarea>
          </div>
        </div>

        <button 
          @click="ulozitRozhodnutie" 
          :disabled="isSubmitting"
          class="w-full py-4 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-400 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3"
        >
          {{ isSubmitting ? 'Odosiela sa...' : 'Uložiť zápis' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      isZapisovatel: true,
      isSubmitting: false,
      project: null,
      dostupniMentori: [],
      form: { 
        status: 'accepted', 
        mentor_id: null,
        product_owner_email: '', 
        commission_comment: '' 
      },
      errors: { 
        mentor_id: false, 
        productOwnerEmail: false, 
        commission_comment: false 
      }
    };
  },
  computed: {
    hasAnyFiles() {
      return !!(this.project && (this.project.proposal_file || this.project.implementation_file));
    },
    mappedFiles() {
      if (!this.project) return {};
      
      const files = {};
      if (this.project.proposal_file) {
        files['Technická špecifikácia'] = this.project.proposal_file;
      }
      if (this.project.implementation_file) {
        files['Implementácia'] = this.project.implementation_file;
      }
      return files;
    }
  },
  mounted() {
    document.title = "Nitriansky technologický inkubátor";
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const responseMentors = await axios.get(`${this.backendApiUrl}/api/auth/accounts/mentors`);
        this.dostupniMentori = responseMentors.data.data;

        const responseChallenge = await axios.get(`${this.backendApiUrl}/api/auth/challenge/${this.id}`);
        const data = responseChallenge.data;

        if (data && data.team_members) {
          data.team_members = data.team_members.map(member => ({
            ...member,
            initials: member.initials || this.generateInitials(member.name)
          }));
        }

        this.project = data;

        if (this.project.decision) {
          this.form = { ...this.project.decision };
        }
      }
      catch (error) {
        console.error("Chyba pri načítaní projektu:", error);
      }
    },

    async ulozitRozhodnutie() {
      this.errors.commission_comment = this.form.commission_comment.trim().length === 0;
      this.errors.mentor_id = (this.form.status === 'accepted' && !this.form.mentor_id);
      this.errors.productOwnerEmail = (this.form.status === 'accepted' && this.project.program === 'B');
      
      const hasErrors = this.errors.commission_comment || this.errors.mentor_id;
      if (hasErrors) {
        alert("Formulár obsahuje chyby");
        return;
      }

      try {
        this.isSubmitting = true;
        const formData = new FormData();
        formData.append('decision', this.form.status);
        formData.append('comment', this.form.commission_comment);
        if(this.form.status === 'accepted') {
          formData.append('mentor_id', this.form.mentor_id);
        }
        console.log(formData);
        await axios.post(`${this.backendApiUrl}/api/auth/challenge/${this.id}/set-commission-decision`, formData);
        Object.keys(this.errors).forEach(key => this.errors[key] = false);
      }
      catch (error) {
        console.error("Chyba pri ukladaní rozhodnutia:", error);
        alert('Nepodarilo sa uložiť rozhodnutie.');
      }
      finally {
        this.isSubmitting = false;
      }

      this.fetchData();
    },

    generateInitials(name) {
      if (!name) return '?';
      return name
        .trim()
        .split(/\s+/)
        .map(n => n[0])
        .join('')
        .toUpperCase();
    },

    formatCurrency(value) {
      if (value === undefined || value === null) return '0 €';

      const cleanNumber = typeof value === 'string' 
        ? parseFloat(value.replace(/[^0-9.]/g, '')) 
        : value;

      if (isNaN(cleanNumber)) return value;

      return new Intl.NumberFormat('sk-SK', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(cleanNumber);
    }
  }
};
</script>