<template>
  <div class="min-h-screen bg-gray-100 pb-12 font-sans">
    <header class="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <nav class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Administrácia / Program {{ challenge.programType }}</nav>
            <h1 class="text-xl font-black text-gray-900">{{ challenge.title || 'Názov výzvy' }}</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <div :class="statusBadgeClass" class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm border">
            ● {{ statusLabel }}
          </div>
          <button @click="saveAllChanges" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95">
            Uložiť všetko
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2 space-y-6">
        
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
            <h2 class="text-sm font-black uppercase text-gray-500 tracking-wider">Základné nastavenia výzvy</h2>
          </div>
          <div class="p-6 space-y-5">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Názov projektu</label>
              <input v-model="challenge.title" type="text" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-gray-50 focus:bg-white text-gray-800 font-semibold">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Deadline</label>
                <input v-model="challenge.deadline" type="date" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-gray-50 focus:bg-white">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Typ Programu</label>
                <select v-model="challenge.programType" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-gray-50 focus:bg-white">
                  <option value="A">Program A</option>
                  <option value="B">Program B</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Zadanie a popis</label>
              <textarea v-model="challenge.description" rows="4" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-gray-50 focus:bg-white"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 class="text-sm font-black uppercase text-gray-500 tracking-wider">Prihlásené subjekty</h2>
            <span class="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{{ challenge.teams.length }} TÍMOV</span>
          </div>
          <div class="divide-y divide-gray-100">
            <div v-for="team in challenge.teams" :key="team.id" 
                 class="p-6 transition hover:bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-bold text-gray-900">{{ team.name }}</h3>
                  <span v-if="challenge.selectedTeamId === team.id" class="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-md font-black uppercase">Víťaz</span>
                </div>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span v-for="m in team.members" :key="m.email" class="text-[11px] text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm">
                    {{ m.name }} ({{ m.email }})
                  </span>
                </div>
                <div class="flex gap-3">
                  <a :href="team.proposalUrl" class="group flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition">
                    <div class="p-1.5 bg-indigo-50 group-hover:bg-indigo-100 rounded-lg">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    Projekt
                  </a>
                  <a :href="team.motivationLetterUrl" class="group flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition">
                    <div class="p-1.5 bg-indigo-50 group-hover:bg-indigo-100 rounded-lg">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    Motivácia
                  </a>
                </div>
              </div>
              <button @click="challenge.selectedTeamId = team.id" 
                :class="challenge.selectedTeamId === team.id ? 'bg-green-600 text-white shadow-green-100' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-400'"
                class="px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 uppercase tracking-tighter">
                {{ challenge.selectedTeamId === team.id ? 'Vybraný' : 'Zvoliť tím' }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="challenge.committeeVerdict === 'approved'" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden border-l-4 border-l-green-500">
          <div class="bg-green-50/30 px-6 py-4 border-b border-green-50">
            <h2 class="text-sm font-black uppercase text-green-700 tracking-wider">Harmonogram realizácie</h2>
          </div>
          <div class="p-6">
            <div v-for="(milestone, index) in challenge.milestones" :key="index" class="relative pl-8 border-l-2 border-gray-100 pb-8 last:pb-0">
              <div class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
              <div class="grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div class="md:col-span-3">
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Termín</label>
                  <input v-model="milestone.date" type="date" class="w-full bg-transparent border-b border-gray-200 py-1 text-sm outline-none focus:border-green-500 font-semibold">
                </div>
                <div class="md:col-span-8">
                  <label class="text-[10px] font-bold text-gray-400 uppercase">Cieľ míľnika</label>
                  <input v-model="milestone.title" type="text" class="w-full bg-transparent border-b border-gray-200 py-1 text-sm outline-none focus:border-green-500 font-semibold" placeholder="Názov...">
                </div>
                <div class="md:col-span-1 flex items-end justify-center">
                  <button @click="challenge.milestones.splice(index, 1)" class="text-gray-300 hover:text-red-500 p-1">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" /></svg>
                  </button>
                </div>
                <div v-if="milestone.mentorNote" class="md:col-span-12 mt-2 flex gap-2 items-start bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span class="text-indigo-500 font-black text-[10px] uppercase mt-0.5">Mentor:</span>
                  <p class="text-xs italic text-gray-600">{{ milestone.mentorNote }}</p>
                </div>
              </div>
            </div>
            <button @click="addMilestone" class="mt-4 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:bg-gray-50 hover:text-indigo-500 hover:border-indigo-200 transition text-sm">
              + Pridať míľnik do plánu
            </button>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        
        <div v-if="challenge.selectedTeamId" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="bg-gray-900 px-6 py-4">
            <h2 class="text-xs font-black text-white uppercase tracking-widest text-center">Zostavenie komisie</h2>
          </div>
          <div class="p-5 space-y-4">
            <div class="flex gap-2">
              <input v-model="newCommitteeEmail" type="email" placeholder="Email člena..." class="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:ring-1 focus:ring-indigo-500 outline-none">
              <button @click="addCommitteeMember" class="bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition">Pridať</button>
            </div>
            
            <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
              <div v-for="(member, index) in challenge.committee" :key="index" class="group flex flex-col p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-indigo-100 transition">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[11px] font-bold text-gray-700 truncate">{{ member.email }}</span>
                  <button @click="challenge.committee.splice(index, 1)" class="text-gray-300 hover:text-red-500">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" /></svg>
                  </button>
                </div>
                <label class="flex items-center gap-2 cursor-pointer group-hover:text-indigo-600">
                  <input type="radio" :value="member.email" v-model="challenge.recorderEmail" class="w-3 h-3 text-indigo-600 focus:ring-indigo-500">
                  <span class="text-[10px] font-black uppercase text-gray-400 group-hover:text-indigo-600">Zapisovateľ</span>
                </label>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-100 space-y-4">
              <div>
                <label class="block text-[10px] font-black uppercase text-gray-400 mb-1.5 ml-1 tracking-widest">Výsledok komisie</label>
                <select v-model="challenge.committeeVerdict" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option value="pending text-gray-400">Čaká sa...</option>
                  <option value="returned">Vrátiť na opravu</option>
                  <option value="approved">Schválené</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-black uppercase text-gray-400 mb-1.5 ml-1 tracking-widest">Mentor</label>
                <input v-model="challenge.assignedMentor" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="Meno mentora">
              </div>
              <div>
                <label class="block text-[10px] font-black uppercase text-gray-400 mb-1.5 ml-1 tracking-widest">Slovo komisie</label>
                <textarea v-model="challenge.committeeComment" rows="3" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-indigo-500"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div v-if="challenge.status === 'in_realization' || challenge.status === 'completed'" class="bg-indigo-950 rounded-2xl shadow-xl p-6 text-white border-b-8 border-indigo-600">
          <h2 class="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            Ukončenie
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-[10px] font-bold uppercase text-indigo-300 mb-1 tracking-widest">Záverečný feedback</label>
              <textarea v-model="challenge.finalEvaluation" class="w-full bg-indigo-900/50 border border-indigo-800 rounded-xl p-3 text-xs focus:ring-1 focus:ring-indigo-400 outline-none text-indigo-100" rows="3"></textarea>
            </div>
            <button @click="completeChallenge" class="w-full bg-white text-indigo-950 font-black py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg text-xs uppercase tracking-tighter shadow-indigo-900/50">
              Ukončiť celú výzvu
            </button>
          </div>
        </div>

      </aside>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCommitteeEmail: '',
      challenge: {
        id: 1,
        title: 'Modernizácia mestskej zelene',
        description: 'Vytvorte udržateľný model pre výsadbu stromov v centre mesta...',
        programType: 'B',
        status: 'published',
        deadline: '2026-06-15',
        selectedTeamId: null,
        teams: [
          {
            id: 301,
            name: 'Mestskí Záhradníci',
            members: [
              { name: 'Adam Kvet', email: 'adam@zahrada.sk' },
              { name: 'Lucia Lesná', email: 'lucia@zahrada.sk' }
            ],
            proposalUrl: '#',
            motivationLetterUrl: '#'
          }
        ],
        committee: [],
        recorderEmail: '',
        committeeVerdict: 'pending',
        committeeComment: '',
        assignedMentor: '',
        milestones: [],
        finalEvaluation: ''
      }
    }
  },
  computed: {
    statusLabel() {
      const labels = {
        published: 'Zverejnené',
        selection: 'Prebieha výber',
        committee_review: 'V komisii',
        in_realization: 'Realizácia',
        completed: 'Archivované'
      };
      return labels[this.challenge.status] || this.challenge.status;
    },
    statusBadgeClass() {
      const styles = {
        published: 'bg-sky-50 text-sky-700 border-sky-100',
        selection: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
        committee_review: 'bg-amber-50 text-amber-700 border-amber-100',
        in_realization: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        completed: 'bg-gray-50 text-gray-500 border-gray-100'
      };
      return styles[this.challenge.status] || 'bg-gray-50';
    }
  },
  methods: {
    addCommitteeMember() {
      if (this.newCommitteeEmail && !this.challenge.committee.find(m => m.email === this.newCommitteeEmail)) {
        this.challenge.committee.push({ email: this.newCommitteeEmail });
        this.newCommitteeEmail = '';
        if (this.challenge.status === 'published') this.challenge.status = 'selection';
      }
    },
    addMilestone() {
      this.challenge.milestones.push({ date: '', title: '', mentorNote: '' });
    },
    completeChallenge() {
      if(confirm('Chcete definitívne ukončiť a archivovať výzvu?')) {
        this.challenge.status = 'completed';
      }
    },
    saveAllChanges() {
      console.log('Synchronizácia s DB:', this.challenge);
      alert('Všetky údaje boli úspešne synchronizované.');
    }
  }
}
</script>