<template>
  <div class="min-h-screen p-4 md:p-8 flex flex-col items-center font-sans text-slate-900">
    <div class="max-w-3xl w-full mx-auto space-y-6">
      
      <div class="pb-6">
        <router-link to="/admin-dashboard/manage-teams" class="text-emerald-600 hover:text-emerald-700 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
          Späť na zoznam
        </router-link>
        <h1 class="text-3xl font-black text-slate-900 uppercase">Nový tím</h1>
        <p class="text-slate-500 text-sm mt-1 font-medium">Vytvorenie tímu, priradenie členov a určenie lídra.</p>
      </div>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-black uppercase text-slate-400 tracking-widest italic">1. Výber výzvy</h2>
          <select v-model="filter" class="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold p-1 px-2 outline-none">
            <option v-for="f in ['Všetko', 'Program A', 'Program B']" :key="f" :value="f">{{ f }}</option>
          </select>
        </div>

        <div class="space-y-2">
          <div 
            v-for="challenge in filteredChallenges" :key="challenge.id"
            @click="selectChallenge(challenge)"
            :class="[
              'p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between',
              team.challengeId === challenge.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'
            ]"
          >
            <div>
              <div class="font-bold text-slate-800">{{ challenge.title }}</div>
              <div class="text-[10px] font-black text-emerald-600 uppercase">{{ challenge.program }}</div>
            </div>
            <div v-if="team.challengeId === challenge.id" class="text-emerald-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2 italic">2. Identita tímu</h2>
        <div class="space-y-1">
          <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Názov tímu</label>
          <input v-model="team.name" type="text" placeholder="Napr. Projektoví králi" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm" />
        </div>
      </section>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2 italic">3. Členovia a výber lídra</h2>
        
        <div class="flex gap-2">
          <input 
            v-model="newMemberEmail" 
            @keyup.enter="addMember" 
            type="email" 
            placeholder="email.studenta@student.sk" 
            class="flex-grow bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-slate-400 outline-none font-bold text-sm" 
          />
          <button @click="addMember" class="bg-slate-800 text-white px-6 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-600 transition-all">Pridať do zoznamu</button>
        </div>

        <div v-if="team.members.length > 0" class="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
          <div v-for="member in team.members" :key="member.email" class="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-4">
              <input 
                type="radio" 
                :checked="member.isLeader"
                @change="setLeader(member.email)"
                name="leaderSelection"
                class="w-5 h-5 text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <div class="flex flex-col">
                <span :class="['text-sm font-bold', member.isLeader ? 'text-emerald-700' : 'text-slate-700']">{{ member.email }}</span>
                <span v-if="member.isLeader" class="text-[9px] font-black text-emerald-500 uppercase tracking-widest font-mono">Hlavný Teamleader</span>
              </div>
            </div>

            <button @click="removeMember(member.email)" class="text-slate-300 hover:text-rose-500 transition-colors p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <p v-else class="text-center py-4 text-xs text-slate-400 italic">Zatiaľ neboli pridaní žiadni členovia.</p>
      </section>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2 italic">4. Prílohy (Nepovinné)</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label v-for="type in ['assignment', 'motivation']" :key="type" class="relative cursor-pointer group">
            <input type="file" @change="handleFileChange($event, type)" class="hidden" />
            <div :class="['p-3 rounded-xl border-2 border-dashed text-xs font-bold flex items-center gap-3 transition-all', team.files[type] ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300']">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" v-if="type === 'assignment'"/>
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" v-else/>
              </svg>
              <span class="truncate">{{ team.files[type] ? team.files[type].name : (type === 'assignment' ? 'Návrh zadania' : 'Motivačný list') }}</span>
            </div>
          </label>
        </div>
      </section>

      <div class="pt-4 pb-12">
        <button 
          @click="submitTeam" 
          :disabled="!isValid"
          class="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 disabled:opacity-30 disabled:shadow-none active:scale-[0.98]"
        >
          Vytvoriť a aktivovať tím
        </button>
        <p class="text-center text-[10px] text-slate-400 font-bold uppercase mt-4 tracking-tighter">
          Všetkým členom bude projekt okamžite aktivovaný v ich dashboarde.
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCreateTeamView",
  data() {
    return {
      filter: 'Všetko',
      newMemberEmail: "",
      challenges: [
        { id: 1, program: 'Program A', title: 'Smart City Osvetlenie' },
        { id: 2, program: 'Program B', title: 'Logistický Robot pre Sklad' },
        { id: 3, program: 'Program A', title: 'Digitálny archív obce' },
        { id: 4, program: 'Program B', title: 'Solárny tracking systém' }
      ],
      team: {
        name: "",
        challengeId: null,
        members: [], // Teraz obsahuje objekty { email, isLeader }
        files: { assignment: null, motivation: null }
      }
    };
  },
  computed: {
    filteredChallenges() {
      if (this.filter === 'Všetko') return this.challenges;
      return this.challenges.filter(c => c.program === this.filter);
    },
    isValid() {
      const hasLeader = this.team.members.some(m => m.isLeader);
      return (
        this.team.name.length > 2 && 
        this.team.challengeId !== null && 
        hasLeader
      );
    }
  },
  methods: {
    selectChallenge(challenge) { this.team.challengeId = challenge.id; },
    addMember() {
      const email = this.newMemberEmail.trim().toLowerCase();
      const exists = this.team.members.find(m => m.email === email);
      
      if (email && email.includes('@') && !exists) {
        // Ak je to prvý pridaný člen, automaticky mu dáme rolu lídra
        const isFirst = this.team.members.length === 0;
        this.team.members.push({
          email: email,
          isLeader: isFirst
        });
        this.newMemberEmail = "";
      }
    },
    setLeader(email) {
      this.team.members.forEach(m => {
        m.isLeader = (m.email === email);
      });
    },
    removeMember(email) {
      this.team.members = this.team.members.filter(m => m.email !== email);
      // Ak sme zmazali lídra a ostali nejakí členovia, nastavíme prvého ako lídra
      if (this.team.members.length > 0 && !this.team.members.some(m => m.isLeader)) {
        this.team.members[0].isLeader = true;
      }
    },
    handleFileChange(event, type) { 
      this.team.files[type] = event.target.files[0]; 
    },
    submitTeam() {
      // Pre backend by ste pravdepodobne chceli leaderEmail vyextrahovať
      const leader = this.team.members.find(m => m.isLeader);
      const membersOnly = this.team.members.filter(m => !m.isLeader).map(m => m.email);

      const payload = {
        name: this.team.name,
        challengeId: this.team.challengeId,
        leaderEmail: leader ? leader.email : null,
        members: membersOnly,
        files: this.team.files
      };

      console.log("Odosielanie payloadu:", payload);
      alert("Tím úspešne vytvorený!");
      this.$router.push('/admin/teams');
    }
  }
};
</script>