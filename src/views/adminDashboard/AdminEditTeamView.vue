<template>
  <div class="min-h-screen p-4 md:p-8 flex flex-col items-center font-sans text-slate-900">
    <div class="max-w-2xl w-full mx-auto space-y-6">
      
      <div class="flex flex-col gap-2 pb-4 border-b border-slate-200">
        <router-link to="/admin-dashboard/manage-teams" class="text-slate-500 hover:text-slate-800 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-2 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
          Späť na zoznam
        </router-link>
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-black text-slate-900 uppercase italic">Upraviť Tím</h1>
          <button @click="confirmDelete" class="text-rose-600 text-[10px] font-black uppercase hover:underline">
            Zmazať tím
          </button>
        </div>
      </div>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-[10px] font-black uppercase text-slate-400 tracking-widest">1. Základné informácie</h2>
        <div class="space-y-4">
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-slate-500 ml-1">Názov tímu</label>
            <input v-model="team.name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm" />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-slate-500 ml-1">Výzva</label>
            <select v-model="team.challengeId" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm">
              <option v-for="c in challenges" :key="c.id" :value="c.id">{{ c.title }}</option>
            </select>
          </div>
        </div>
      </section>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-[10px] font-black uppercase text-slate-400 tracking-widest">2. Správa členov a lídra</h2>
        
        <div class="flex gap-2">
          <input 
            v-model="newMemberEmail" 
            @keyup.enter="addNewPerson" 
            type="email" 
            placeholder="Pridať email študenta..." 
            class="flex-grow bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-slate-400 outline-none font-bold text-sm" 
          />
          <button @click="addNewPerson" class="bg-slate-800 text-white px-5 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-600 transition-all">Pridať</button>
        </div>

        <div class="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
          <div 
            v-for="member in team.members" :key="member.email" 
            class="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
          >
            <div class="flex items-center gap-4">
              <input 
                type="radio" 
                :checked="member.isLeader"
                @change="setLeader(member.email)"
                name="leaderSelection"
                class="w-5 h-5 text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <div class="flex flex-col">
                <span :class="['text-sm font-bold', member.isLeader ? 'text-emerald-700' : 'text-slate-700']">
                  {{ member.email }}
                </span>
                <span v-if="member.isLeader" class="text-[9px] font-black text-emerald-500 uppercase tracking-widest font-mono">Teamleader</span>
              </div>
            </div>

            <button @click="removePerson(member.email)" class="text-slate-300 hover:text-rose-500 p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-[10px] font-black uppercase text-slate-400 tracking-widest">3. Súbory</h2>
        <div class="space-y-2">
          <div v-for="ft in ['assignment', 'motivation']" :key="ft" class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span class="text-xs font-bold text-slate-700 truncate">{{ team.files[ft] ? team.files[ft].name : 'Chýba súbor' }}</span>
            <label class="cursor-pointer bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase hover:text-emerald-600 shrink-0">
              Nahradiť
              <input type="file" @change="handleFile($event, ft)" class="hidden" />
            </label>
          </div>
        </div>
      </section>

      <button 
        @click="saveChanges" 
        :disabled="!isValid"
        class="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 disabled:opacity-30 active:scale-95"
      >
        Uložiť zmeny
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: "AdminEditTeamView",
  data() {
    return {
      newMemberEmail: "",
      challenges: [
        { id: 1, title: 'Smart City Osvetlenie' },
        { id: 2, title: 'Logistický Robot pre Sklad' }
      ],
      team: {
        id: 124,
        name: "Inovačná Jednotka",
        challengeId: 1,
        // Všetci členovia sú v jednom poli ako OBJEKTY
        members: [
          { email: "marek.kovac@student.sk", isLeader: true },
          { email: "jana.nova@student.sk", isLeader: false },
          { email: "fero.mrkvicka@student.sk", isLeader: false }
        ],
        files: { assignment: { name: "projekt.pdf" }, motivation: null }
      }
    };
  },
  computed: {
    isValid() {
      // Tím je validný, ak má meno, výzvu a práve jedného lídra
      const hasLeader = this.team.members.some(m => m.isLeader);
      return this.team.name.length > 2 && this.team.challengeId && hasLeader;
    }
  },
  methods: {
    addNewPerson() {
      const email = this.newMemberEmail.trim().toLowerCase();
      // Kontrola, či už v zozname nie je
      const exists = this.team.members.find(m => m.email === email);
      
      if (email && email.includes('@') && !exists) {
        // Ak je zoznam prázdny, prvý bude automaticky líder
        const isFirst = this.team.members.length === 0;
        this.team.members.push({
          email: email,
          isLeader: isFirst
        });
        this.newMemberEmail = "";
      }
    },
    setLeader(email) {
      // Prejdeme pole a všetkým nastavíme isLeader na false, vybranému na true
      this.team.members.forEach(m => {
        m.isLeader = (m.email === email);
      });
    },
    removePerson(email) {
      this.team.members = this.team.members.filter(m => m.email !== email);
    },
    handleFile(e, type) {
      const file = e.target.files[0];
      if (file) this.team.files[type] = file;
    },
    saveChanges() {
      console.log("Odosielam upravený tím:", this.team);
      alert("Zmeny boli úspešne uložené.");
      this.$router.push('/admin/teams');
    },
    confirmDelete() {
      if (confirm("Naozaj zmazať tím?")) this.$router.push('/admin/teams');
    }
  }
};
</script>