<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
    <div class="max-w-4xl mx-auto px-6 py-12 space-y-16">
      
      <div class="border-b border-slate-200 pb-8 text-center md:text-left">
        <h1 class="text-3xl font-black text-slate-900 uppercase tracking-tight">Správa tímov</h1>
        <p class="text-slate-500 font-medium mt-2">Schvaľovanie nových formácií, priraďovanie komisií a manažment aktívnych tímov.</p>
      </div>

      <section class="space-y-8">
        <div class="flex items-center gap-3 px-2">
          <div class="w-3 h-8 bg-indigo-500 rounded-full"></div>
          <h2 class="text-2xl font-black text-slate-800 uppercase">Nové žiadosti ({{ pendingTeamRequests.length }})</h2>
        </div>

        <div v-if="pendingTeamRequests.length === 0" class="bg-white border border-slate-200 rounded-[2rem] py-12 text-center text-slate-400 text-sm italic">
          Žiadne nové požiadavky na založenie tímu.
        </div>

        <div class="space-y-6">
          <div v-for="req in pendingTeamRequests" :key="req.id" class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div class="p-8 space-y-6">
              <div class="border-b border-slate-50 pb-6">
                <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Názov tímu</span>
                <h3 class="text-3xl font-black uppercase leading-none mt-1">{{ req.teamName }}</h3>
              </div>

              <div class="space-y-4">
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Zakladateľ</span>
                  <p class="font-bold text-lg text-slate-700">{{ req.founderName }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Počet členov</span>
                  <p class="font-bold text-lg text-slate-700">{{ req.memberCount }}</p>
                </div>
              </div>

              <div class="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-black uppercase tracking-tight text-slate-500">Zloženie hodnotiacej komisie</h4>
                  <button @click="addCommitteeMember(req.id)" class="text-[10px] font-black text-indigo-600 uppercase underline">+ Pridať člena</button>
                </div>
                
                <div class="space-y-3">
                  <div v-for="(member, index) in req.committee" :key="index" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200">
                    <input v-model="member.name" placeholder="Meno člena" class="flex-1 text-sm font-bold outline-none border-none bg-transparent px-2 py-1">
                    <div class="flex items-center gap-2">
                      <button 
                        @click="setRecorder(req.id, index)" 
                        :class="[member.isRecorder ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400', 'flex-1 sm:flex-none px-3 py-2 rounded-xl text-[9px] font-black uppercase transition-all']"
                      >
                        {{ member.isRecorder ? 'Zapisovateľ' : 'Označiť zapisovateľa' }}
                      </button>
                      <button @click="removeCommitteeMember(req.id, index)" class="text-slate-300 hover:text-red-500 p-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-3 pt-4">
                <button @click="approveTeam(req.id)" class="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                  Vytvoriť tím a odoslať notifikácie
                </button>
                <button @click="rejectTeamRequest(req.id)" class="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase text-xs hover:bg-red-100 transition-all">
                  Zamietnuť žiadosť
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr class="border-slate-200">

      <section class="space-y-8">
        <div class="space-y-6 px-2">
          <div class="flex items-center gap-3">
            <div class="w-3 h-8 bg-slate-900 rounded-full"></div>
            <h2 class="text-2xl font-black text-slate-800 uppercase">Databáza tímov</h2>
          </div>
          
          <div class="space-y-4">
            <input 
              v-model="teamSearch" 
              type="text" 
              placeholder="Hľadať podľa názvu alebo mentora..." 
              class="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm"
            />
            <div class="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-200 w-max">
              <label class="text-xs font-black uppercase text-slate-400">Zobraziť ukončené projekty</label>
              <input type="checkbox" v-model="showFinished" class="w-5 h-5 accent-indigo-600 cursor-pointer">
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="team in filteredTeams" :key="team.id" class="bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all">
            <div class="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div :class="[getStatusColor(team.status), 'w-3 h-3 rounded-full shadow-sm']"></div>
                <div>
                  <h3 class="font-black text-lg uppercase tracking-tight">{{ team.name }}</h3>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ team.statusLabel }}</p>
                </div>
              </div>
              
              <div class="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                <router-link v-if="team.challengeId" :to="`/admin/challenges/${team.challengeId}`" class="text-[10px] font-black text-indigo-600 underline uppercase tracking-widest">
                  Výzva
                </router-link>
                <button @click="toggleTeamEdit(team.id)" class="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase transition-colors flex items-center gap-2">
                  <span>{{ editingTeamId === team.id ? 'Zatvoriť' : 'Spravovať' }}</span>
                  <svg v-if="editingTeamId !== team.id" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>

            <div v-if="editingTeamId === team.id" class="p-8 bg-slate-50 border-t border-slate-100 space-y-10">
              
              <div class="space-y-4">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Zloženie tímu</h4>
                <div class="space-y-3">
                  <div v-for="(m, idx) in team.members" :key="idx" class="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div class="flex items-center justify-between">
                      <input v-model="m.name" class="font-black text-base bg-transparent border-none outline-none flex-1">
                      <div class="flex gap-2">
                         <button v-if="!m.isLeader" @click="makeLeader(team.id, idx)" class="p-2 text-slate-300 hover:text-indigo-600" title="Urobiť leaderom">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                         </button>
                         <button @click="removeMember(team.id, idx)" class="p-2 text-slate-300 hover:text-red-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                         </button>
                      </div>
                    </div>
                    <span v-if="m.isLeader" class="text-[9px] font-black text-indigo-500 uppercase bg-indigo-50 px-3 py-1 rounded-full w-max">Team Leader</span>
                  </div>
                  <button @click="addEmptyMember(team.id)" class="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase hover:bg-white hover:border-indigo-300 hover:text-indigo-500 transition-all">+ Pridať nového člena</button>
                </div>
              </div>

              <div class="space-y-6">
                <div class="space-y-6">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Priradený mentor</label>
                    <input 
                      v-model="team.mentor" 
                      :disabled="team.status === 'finished'"
                      class="w-full px-5 py-4 rounded-2xl border border-slate-200 font-bold disabled:bg-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Status realizácie</label>
                    <select v-model="team.status" class="w-full px-5 py-4 rounded-2xl border border-slate-200 font-bold bg-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                      <option value="pending">Čaká na schválenie</option>
                      <option value="active">V realizácii</option>
                      <option value="finished">Ukončený</option>
                    </select>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Stanovisko komisie a interné poznámky</label>
                  <textarea 
                    v-model="team.commissionNote" 
                    :disabled="team.status === 'finished'"
                    rows="5" 
                    class="w-full px-5 py-4 rounded-3xl border border-slate-200 font-medium text-sm disabled:bg-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  ></textarea>
                </div>

                <div class="flex flex-col gap-4 pt-8 border-t border-slate-200">
                  <button @click="saveTeam(team.id)" class="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all">
                    Uložiť všetky zmeny
                  </button>
                  <button @click="fullDeleteTeam(team.id)" class="flex items-center justify-center gap-2 py-3 text-red-500 text-[10px] font-black uppercase hover:underline group">
                    <svg class="w-4 h-4 group-hover:shake" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    <span>Trvalo odstrániť tím zo systému</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminTeamManagementView',
  // ... (Metódy a dáta zostávajú rovnaké ako v predošlom návrhu)
  data() {
    return {
      teamSearch: '',
      showFinished: false,
      editingTeamId: null,
      pendingTeamRequests: [
        {
          id: 1,
          teamName: 'GreenCode Builders',
          founderName: 'Peter Programátor',
          memberCount: 4,
          committee: [
            { name: 'Ing. Jozef Testovač', isRecorder: true },
            { name: 'PhDr. Marta Prísna', isRecorder: false }
          ]
        }
      ],
      allTeams: [
        {
          id: 101,
          name: 'CyberGuardians',
          status: 'pending',
          statusLabel: 'Čaká na schválenie',
          mentor: 'Dr. Bezpečný',
          commissionNote: 'Tím potrebuje doplniť technickú špecifikáciu pre komisiu.',
          challengeId: 55,
          members: [
            { name: 'Michal Heker', isLeader: true },
            { name: 'Anna Sieťová', isLeader: false }
          ]
        },
        {
          id: 102,
          name: 'SilverTech AI',
          status: 'active',
          statusLabel: 'V realizácii',
          mentor: 'Ing. Umelý',
          commissionNote: 'Schválené jednohlasne, mentor priradený na základe expertízy.',
          challengeId: 42,
          members: [
            { name: 'Samuel Dáta', isLeader: true },
            { name: 'Eva Kódová', isLeader: false },
            { name: 'Filip Logika', isLeader: false }
          ]
        },
        {
          id: 103,
          name: 'EkoTrack 2023',
          status: 'finished',
          statusLabel: 'Ukončený',
          mentor: 'Mgr. Príroda',
          commissionNote: 'Projekt úspešne odovzdaný a implementovaný u klienta.',
          challengeId: null,
          members: [
            { name: 'Lucia Zelená', isLeader: true }
          ]
        }
      ]
    }
  },
  computed: {
    filteredTeams() {
      return this.allTeams.filter(team => {
        const matchesSearch = team.name.toLowerCase().includes(this.teamSearch.toLowerCase()) || 
                             team.mentor.toLowerCase().includes(this.teamSearch.toLowerCase());
        const matchesVisibility = this.showFinished ? true : team.status !== 'finished';
        return matchesSearch && matchesVisibility;
      });
    }
  },
  methods: {
    addCommitteeMember(reqId) {
      const req = this.pendingTeamRequests.find(r => r.id === reqId);
      req.committee.push({ name: '', isRecorder: false });
    },
    removeCommitteeMember(reqId, index) {
      const req = this.pendingTeamRequests.find(r => r.id === reqId);
      req.committee.splice(index, 1);
    },
    setRecorder(reqId, index) {
      const req = this.pendingTeamRequests.find(r => r.id === reqId);
      req.committee.forEach((m, i) => m.isRecorder = i === index);
    },
    approveTeam(reqId) {
      alert(`Tím bol úspešne vytvorený.`);
      this.pendingTeamRequests = this.pendingTeamRequests.filter(r => r.id !== reqId);
    },
    rejectTeamRequest(reqId) {
      if(confirm('Naozaj chcete zamietnuť túto žiadosť?')) {
        this.pendingTeamRequests = this.pendingTeamRequests.filter(r => r.id !== reqId);
      }
    },
    toggleTeamEdit(teamId) {
      this.editingTeamId = this.editingTeamId === teamId ? null : teamId;
    },
    getStatusColor(status) {
      switch(status) {
        case 'pending': return 'bg-amber-400';
        case 'active': return 'bg-emerald-500';
        case 'finished': return 'bg-slate-400';
        default: return 'bg-slate-200';
      }
    },
    makeLeader(teamId, memberIndex) {
      const team = this.allTeams.find(t => t.id === teamId);
      team.members.forEach((m, i) => m.isLeader = i === memberIndex);
    },
    removeMember(teamId, memberIndex) {
      const team = this.allTeams.find(t => t.id === teamId);
      team.members.splice(memberIndex, 1);
    },
    addEmptyMember(teamId) {
      const team = this.allTeams.find(t => t.id === teamId);
      team.members.push({ name: 'Meno člena', isLeader: false });
    },
    saveTeam(teamId) {
      this.editingTeamId = null;
      alert('Zmeny v tíme boli úspešne uložené.');
    },
    fullDeleteTeam(teamId) {
      if(confirm('POZOR: Naozaj chcete natrvalo vymazať celý tím? Táto akcia je nevratná.')) {
        this.allTeams = this.allTeams.filter(t => t.id !== teamId);
        this.editingTeamId = null;
      }
    }
  }
}
</script>

<style scoped>
.shake:hover {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-2px, 0, 0); }
  40%, 60% { transform: translate3d(2px, 0, 0); }
}
</style>