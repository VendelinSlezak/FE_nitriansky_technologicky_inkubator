<template>
  <div class="max-w-4xl mx-auto p-4 md:p-6 text-slate-800 pb-20 font-sans">
    
    <div class="flex flex-col border-b border-slate-100 pb-6 mb-8 text-left">
      <div class="flex justify-between items-start mb-6">
        <div>
          <router-link to="/admin-dashboard/manage-challenges" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-2 transition-all">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M15 19l-7-7 7-7" /></svg>
            Späť na zoznam
          </router-link>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">{{ form.title }}</h2>
          <p class="text-slate-500 text-sm mt-1 uppercase font-bold tracking-tighter">
            ID: {{ challengeId }} • Program {{ form.type }} • {{ form.category }}
          </p>
        </div>
        <div class="flex flex-col items-end gap-2">
          <span :class="['px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border', phaseTheme.badge]">
            Fáza: {{ form.phase }}
          </span>
        </div>
      </div>

      <div class="flex items-center justify-between w-full px-4 relative mt-4">
        <div class="absolute h-0.5 bg-slate-100 left-10 right-10 top-1/2 -translate-y-1/2 -z-10"></div>
        <div v-for="p in allPhases" :key="p" class="flex flex-col items-center gap-2">
          <div :class="['w-4 h-4 rounded-full border-2 transition-all', form.phase === p ? 'bg-blue-600 border-blue-600 scale-125 shadow-lg shadow-blue-200' : 'bg-white border-slate-300']"></div>
          <span :class="['text-[9px] font-black uppercase tracking-tighter', form.phase === p ? 'text-blue-600' : 'text-slate-400']">{{ p }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-8 text-left">
      
      <section v-if="form.phase === 'Otvorená'" class="bg-white rounded-[1.5rem] p-6 md:p-8 border border-slate-200 shadow-sm space-y-6 animate-in">
        <div class="flex justify-between items-center border-b border-slate-50 pb-4">
          <h3 class="font-black text-slate-800 uppercase text-xs tracking-widest italic">1. Identita výzvy</h3>
        </div>
        
        <div class="grid md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Názov výzvy</label>
            <input 
              v-model="form.title" 
              type="text" 
              placeholder="Zadajte názov..."
              class="w-full px-5 py-3.5 border border-slate-100 bg-slate-50 rounded-xl outline-none transition-all font-bold focus:bg-white focus:ring-2 focus:ring-blue-500/20" 
            />
          </div>
          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Kategória</label>
            <select 
              v-model="form.category" 
              class="w-full px-5 py-3.5 border border-slate-100 bg-slate-50 rounded-xl outline-none transition-all font-bold appearance-none focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div v-if="form.type === 'B'">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Rozpočet projektu</label>
            <input 
              v-model="form.budget" 
              type="text" 
              class="w-full px-5 py-3.5 border border-slate-100 bg-slate-50 text-emerald-600 rounded-xl outline-none transition-all font-black focus:bg-white focus:ring-2 focus:ring-blue-500/20" 
            />
          </div>
        </div>
      </section>

      <div v-if="form.phase === 'Otvorená'" class="space-y-6">
        <section class="bg-white rounded-[1.5rem] p-6 border border-slate-200 shadow-sm space-y-6">
          <h3 class="font-black text-slate-800 uppercase text-xs tracking-widest border-b border-slate-50 pb-4">2. Prihlásené tímy</h3>
          <div class="grid gap-2">
            <div v-for="t in applicantTeams" :key="t.id" 
                 @click="toggleTeamSelection(t.id)"
                 :class="['p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between', 
                          form.selectedTeamIds.includes(t.id) ? 'border-blue-500 bg-blue-50/50' : 'border-slate-50 bg-slate-50/30 hover:border-slate-200']">
              <div>
                <div class="font-bold text-sm text-slate-800">{{ t.name }}</div>
                <div class="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Líder: {{ t.leader }} • Členovia: {{ t.memberCount }}</div>
              </div>
              <div v-if="form.selectedTeamIds.includes(t.id)" class="text-blue-600">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-[1.5rem] p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 class="font-black text-slate-800 uppercase text-xs tracking-widest border-b border-slate-50 pb-4">3. Zostavenie komisie</h3>
          <div class="flex gap-2">
            <input v-model="newJurorEmail" @keyup.enter="addJuror" type="email" placeholder="Email člena komisie..." class="flex-grow px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20" />
            <button @click="addJuror" class="bg-slate-800 text-white px-6 rounded-xl font-black text-[10px] uppercase hover:bg-black transition-colors">Pridať</button>
          </div>
          <div class="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            <div v-for="j in form.jury" :key="j.email" class="flex items-center justify-between p-4 bg-white">
              <div class="flex items-center gap-4">
                <input type="radio" :checked="j.isRecorder" @change="setRecorder(j.email)" name="recorder" class="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500" />
                <div class="flex flex-col text-left">
                  <span :class="['text-sm font-bold', j.isRecorder ? 'text-blue-700' : 'text-slate-700']">{{ j.email }}</span>
                  <span v-if="j.isRecorder" class="text-[9px] font-black text-blue-500 uppercase tracking-widest font-mono">Zapisovateľ / Reportér</span>
                </div>
              </div>
              <button @click="removeJuror(j.email)" class="text-slate-300 hover:text-rose-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <button @click="moveToPhase('Posudzovaná komisiou')" :disabled="!canMoveToJury" class="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 disabled:opacity-30 hover:bg-blue-700 transition-all active:scale-[0.98]">
            Posunúť na posúdenie komisiou
          </button>
        </section>
      </div>

      <div v-if="form.phase === 'Posudzovaná komisiou'" class="space-y-6 animate-in">
        <section class="bg-amber-50 rounded-[1.5rem] p-6 border border-amber-100 space-y-6">
          <div class="flex items-center gap-2 text-amber-700 border-b border-amber-100 pb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            <h3 class="font-black uppercase text-xs tracking-widest">Nastavenie podmienok realizácie</h3>
          </div>

          <div class="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4 text-left">
            <div>
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Výstup od zapisovateľa</label>
              <p class="text-sm italic text-slate-600 border-l-4 border-amber-200 pl-4 py-1 leading-relaxed">{{ juryOutput.comment }}</p>
            </div>
            <div>
              <label class="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">Mentor pre projekt</label>
              <input v-model="juryOutput.mentorEmail" type="email" placeholder="mentor@expert.sk" class="w-full px-5 py-3.5 bg-blue-50/30 border border-blue-100 rounded-xl text-sm font-bold text-blue-800 outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all" />
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4 text-left">
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Definovanie míľnikov pre realizáciu</h4>
            <div class="space-y-3">
              <div v-for="(m, index) in form.milestones" :key="index" class="flex flex-col sm:flex-row gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 relative">
                <input v-model="m.date" type="date" class="bg-white border border-slate-200 rounded-lg p-2 text-xs font-black outline-none focus:border-blue-400" />
                <input v-model="m.title" type="text" placeholder="Názov a krátky popis cieľa..." class="flex-grow bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium outline-none focus:border-blue-400" />
                <button @click="removeMilestone(index)" class="text-rose-500 hover:text-rose-700 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
              <button @click="addMilestone" class="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px] font-black uppercase hover:bg-slate-50 hover:text-slate-600 transition-all">+ Pridať nový míľnik</button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button @click="moveToPhase('Otvorená')" class="flex-1 py-4 bg-white border border-amber-200 text-amber-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-100 transition-colors">Vrátiť na otvorenie</button>
            <button @click="moveToPhase('V realizácií')" class="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all">Schváliť a spustiť realizáciu</button>
          </div>
        </section>
      </div>

      <div v-if="form.phase === 'V realizácií'" class="space-y-6 animate-in">
        <section class="bg-white rounded-[1.5rem] p-6 md:p-8 border border-emerald-100 shadow-sm space-y-6">
          <div class="flex justify-between items-center border-b border-emerald-50 pb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 class="font-black text-slate-800 uppercase text-xs tracking-widest">Aktívna realizácia projektu</h3>
                <p class="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">Sledovanie a úprava míľnikov</p>
              </div>
            </div>
            <button @click="addMilestone" class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-100 transition-all border border-emerald-100">+ Nový míľnik</button>
          </div>

          <div class="space-y-6">
            <div v-for="(m, index) in form.milestones" :key="index" class="p-5 bg-slate-50 border border-slate-100 rounded-[1.25rem] hover:border-emerald-200 transition-all shadow-sm space-y-4">
              <div class="flex flex-col md:flex-row gap-4 items-start">
                <div class="w-full md:w-44 shrink-0 text-left">
                  <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Termín dokončenia</label>
                  <input v-model="m.date" type="date" class="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-black outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div class="flex-grow w-full text-left">
                  <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Popis míľnika</label>
                  <input v-model="m.title" type="text" class="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <button @click="removeMilestone(index)" class="mt-6 p-3 text-slate-300 hover:text-rose-500 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>

              <div class="bg-white/60 p-4 rounded-xl border border-emerald-50 space-y-2">
                <label class="text-[9px] font-black text-emerald-600 uppercase tracking-widest ml-1 block">Spätná väzba od mentora</label>
                <textarea 
                  v-model="m.mentorComment" 
                  rows="2" 
                  placeholder="Napíšte hodnotenie plnenia tohto míľnika..." 
                  class="w-full bg-white border border-slate-100 rounded-lg p-3 text-xs font-medium italic outline-none focus:ring-2 focus:ring-emerald-500/10 placeholder:text-slate-300"
                ></textarea>
              </div>
            </div>

            <div v-if="form.milestones.length === 0" class="py-12 bg-slate-50 border-2 border-dashed border-slate-100 rounded-3xl text-center text-slate-400">
              <p class="text-sm font-medium italic">Žiadne aktívne míľniky.</p>
            </div>
          </div>

          <div class="pt-8 flex justify-center">
            <button @click="showClosingModal = true" class="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-200 active:scale-95">
              Uzatvoriť výzvu a ohodnotiť
            </button>
          </div>
        </section>
      </div>

      <div v-if="form.phase === 'Uzatvorená'" class="space-y-6 animate-in">
        <section class="bg-slate-50 rounded-[1.5rem] p-6 border border-slate-200 text-left">
          <h3 class="font-black text-slate-400 uppercase text-xs tracking-widest italic mb-4">Záverečné hodnotenie výzvy</h3>
          <div class="bg-white p-6 rounded-2xl border border-slate-100 text-sm text-slate-700 leading-relaxed shadow-sm min-h-[100px]">
            {{ form.finalEvaluation || 'Žiadne záverečné hodnotenie nebolo zadané.' }}
          </div>
        </section>
      </div>

    </div>

    <div v-if="showClosingModal" class="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <h3 class="text-2xl font-black uppercase mb-2 text-left text-slate-900">Uzatvoriť výzvu</h3>
        <p class="text-sm text-slate-500 mb-8 text-left leading-relaxed font-medium">Zadajte finálny komentár k priebehu realizácie. Tento text uvidia všetky zúčastnené strany.</p>
        
        <textarea 
          v-model="tempEvaluation" 
          rows="6" 
          placeholder="Zhodnotenie spolupráce, výsledkov a celkového priebehu..." 
          class="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-slate-100 font-medium text-sm mb-8 text-slate-700 transition-all shadow-inner"
        ></textarea>

        <div class="flex gap-4">
          <button @click="showClosingModal = false" class="flex-1 py-5 text-xs font-black uppercase text-slate-400 hover:text-slate-600 transition-colors tracking-widest">Zrušiť</button>
          <button @click="confirmCloseChallenge" class="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200">
            Potvrdiť uzatvorenie
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminEditChallengeView",
  props: ['id'],
  data() {
    return {
      challengeId: this.id || 'CH-2024-X1',
      allPhases: ['Otvorená', 'Posudzovaná komisiou', 'V realizácií', 'Uzatvorená'],
      categories: ["Webové aplikácie", "AI technológie", "IoT systémy", "UX/UI Design", "Smart City", "Green Energy"],
      
      newJurorEmail: "",
      showClosingModal: false,
      tempEvaluation: "",

      applicantTeams: [
        { id: 101, name: "Nexus Devs", leader: "peter@student.sk", memberCount: 3 },
        { id: 102, name: "Green Future", leader: "elena@student.sk", memberCount: 4 },
        { id: 103, name: "AI Explorers", leader: "tomas@student.sk", memberCount: 2 }
      ],

      juryOutput: {
        comment: "Komisia preverila všetky prihlášky. Odporúčame tím Nexus Devs.",
        mentorEmail: "expert.iot@univerzita.sk"
      },

      form: {
        type: "A",
        phase: "Otvorená",
        title: "Smart Monitoring mestskej zelene",
        category: "IoT systémy",
        budget: "2 500 €",
        selectedTeamIds: [],
        jury: [], 
        milestones: [], // { date, title, mentorComment }
        finalEvaluation: ""
      }
    };
  },
  computed: {
    phaseTheme() {
      const themes = {
        'Otvorená': { badge: 'bg-blue-50 text-blue-600 border-blue-100' },
        'Posudzovaná komisiou': { badge: 'bg-amber-50 text-amber-600 border-amber-100' },
        'V realizácií': { badge: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        'Uzatvorená': { badge: 'bg-slate-100 text-slate-500 border-slate-200' }
      };
      return themes[this.form.phase] || themes['Otvorená'];
    },
    canMoveToJury() {
      return this.form.selectedTeamIds.length > 0 && 
             this.form.jury.some(j => j.isRecorder);
    }
  },
  methods: {
    addJuror() {
      const email = this.newJurorEmail.trim().toLowerCase();
      if (email && email.includes('@') && !this.form.jury.find(j => j.email === email)) {
        this.form.jury.push({ email, isRecorder: this.form.jury.length === 0 });
        this.newJurorEmail = "";
      }
    },
    setRecorder(email) {
      this.form.jury.forEach(j => j.isRecorder = (j.email === email));
    },
    removeJuror(email) {
      this.form.jury = this.form.jury.filter(j => j.email !== email);
      if (this.form.jury.length > 0 && !this.form.jury.some(j => j.isRecorder)) {
        this.form.jury[0].isRecorder = true;
      }
    },
    toggleTeamSelection(id) {
      const idx = this.form.selectedTeamIds.indexOf(id);
      if (idx > -1) this.form.selectedTeamIds.splice(idx, 1);
      else this.form.selectedTeamIds.push(id);
    },
    addMilestone() {
      // Dôležité: Pridané pole mentorComment pre reaktivitu
      this.form.milestones.push({ 
        date: '', 
        title: '', 
        mentorComment: '' 
      });
    },
    removeMilestone(index) {
      this.form.milestones.splice(index, 1);
    },
    moveToPhase(newPhase) {
      this.form.phase = newPhase;
      console.log(`Zmena fázy na ${newPhase}`, {
        mentor: this.juryOutput.mentorEmail,
        milestones: this.form.milestones
      });
    },
    confirmCloseChallenge() {
      this.form.finalEvaluation = this.tempEvaluation;
      this.form.phase = 'Uzatvorená';
      this.showClosingModal = false;
    }
  }
};
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>