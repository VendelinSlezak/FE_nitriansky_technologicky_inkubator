<template>
  <div class="max-w-7xl mx-auto p-5 text-slate-800">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8 text-left">
      <div>
        <h2 class="text-2xl font-black text-slate-900 tracking-tight">Správa projektových výziev</h2>
        <p class="text-slate-500 text-sm mt-1">Schvaľujte prichádzajúce návrhy a spravujte aktívne projekty.</p>
      </div>
      
      <button @click="createNewCall" class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-md shadow-slate-200 transition-all active:scale-95 text-sm uppercase tracking-wider">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M12 4v16m8-8H4" /></svg>
        Vytvoriť výzvu
      </button>
    </div>

    <section v-if="pendingChallenges.length > 0" class="mb-12 space-y-3 text-left">
      <div class="flex items-center gap-2 px-2 text-left">
        <div class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
        <h3 class="font-black text-slate-600 uppercase text-[10px] tracking-[0.15em]">
          Čakajúce návrhy ({{ pendingChallenges.length }})
        </h3>
      </div>

      <div class="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm">
        <table class="w-full text-left table-fixed">
          <thead class="bg-slate-50/50 text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] border-b border-slate-100">
            <tr>
              <th class="px-6 py-3 w-1/2">Názov návrhu</th>
              <th class="px-6 py-3 w-1/4 text-center">Program</th>
              <th class="px-6 py-3 w-auto text-right">Akcia</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <template v-for="proposal in pendingChallenges" :key="proposal.id">
              <tr 
                @click="toggleProposal(proposal.id)"
                class="cursor-pointer hover:bg-slate-50 transition-colors group"
                :class="{'bg-blue-50/30': expandedProposalId === proposal.id}"
              >
                <td class="px-6 py-4 text-left">
                  <div class="font-black text-slate-900 text-base group-hover:text-blue-600 transition-colors">{{ proposal.title }}</div>
                  <div class="text-[12px] text-slate-500 font-medium mt-0.5">Odoslal: {{ proposal.author }}</div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2',
                    proposal.type === 'A' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  ]">
                    Program {{ proposal.type }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="inline-flex items-center gap-2 text-slate-400 group-hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-colors">
                    {{ expandedProposalId === proposal.id ? 'Zatvoriť' : 'Detail' }}
                    <svg class="h-4 w-4 transition-transform duration-300" :class="{'rotate-180': expandedProposalId === proposal.id}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </td>
              </tr>

              <tr v-if="expandedProposalId === proposal.id">
                <td colspan="3" class="px-6 md:px-12 py-8 bg-slate-50/50 border-y border-slate-100">
                  <div class="max-w-2xl space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 text-left">
                    
                    <div class="flex flex-col gap-1 text-left text-left">
                      <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategória projektu</span>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-slate-800">{{ proposal.category }}</span>
                        <span class="text-xs text-slate-400 font-medium">— {{ proposal.submittedAt }}</span>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 text-left">
                      <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Podrobný popis</span>
                      <div class="text-base text-slate-700 leading-relaxed bg-white p-6 rounded-[1.2rem] border border-slate-200 shadow-sm italic ring-1 ring-slate-100">
                        "{{ proposal.description }}"
                      </div>
                    </div>

                    <div class="flex flex-col gap-5 text-left">
                      <div v-if="proposal.type === 'B'" class="bg-emerald-600 text-white p-5 rounded-xl inline-flex flex-col w-fit min-w-[200px] shadow-lg shadow-emerald-100">
                        <span class="text-[9px] font-black text-emerald-100 uppercase tracking-widest opacity-80">Navrhovaná odmena</span>
                        <span class="text-2xl font-black">{{ proposal.budget }}</span>
                      </div>

                      <div class="flex flex-col gap-2 text-left">
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Prílohy</span>
                        <a href="#" @click.prevent class="group inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors w-fit bg-white px-4 py-2.5 rounded-lg border border-slate-200 text-sm shadow-sm">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          podklady.pdf
                        </a>
                      </div>
                    </div>

                    <div class="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-200">
                      <button @click.stop="approveProposal(proposal)" class="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black rounded-xl shadow-lg shadow-blue-100 transition-all uppercase tracking-widest active:scale-95">
                        Schváliť výzvu
                      </button>
                      <button @click.stop="rejectProposal(proposal.id)" class="w-full sm:w-auto px-6 py-3 text-[11px] font-bold text-slate-400 hover:text-rose-600 transition-all uppercase tracking-widest">
                        Zamietnuť
                      </button>
                    </div>

                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </section>

    <div class="space-y-4 text-left">
      <div class="flex items-center gap-2 px-2 text-left">
        <h3 class="font-black text-slate-600 uppercase text-[10px] tracking-[0.15em]">
          Aktívne výzvy v systéme
        </h3>
      </div>

      <div class="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm">
        <table class="w-full text-left">
          <thead class="bg-slate-50 text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] border-b border-slate-100">
            <tr>
              <th class="px-6 py-4">Projekt</th>
              <th class="px-6 py-4 text-center">Tímy</th>
              <th class="px-6 py-4">Stav</th>
              <th class="px-6 py-4 text-right">Akcie</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="call in calls" :key="call.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4 text-left">
                <div class="flex items-center gap-3">
                  <div :class="['w-1.5 h-10 rounded-full', call.type === 'A' ? 'bg-blue-500' : 'bg-emerald-500']"></div>
                  <div>
                    <div class="font-black text-slate-900 text-sm leading-tight">{{ call.title }}</div>
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{{ call.category }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center justify-center bg-slate-100 w-8 h-8 rounded-lg font-black text-slate-700 text-[12px]">
                  {{ call.teamCount }}
                </span>
              </td>
              <td class="px-6 py-4 text-left">
                <span :class="['inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest', call.status === 'Otvorená' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700']">
                  <span :class="['w-1.5 h-1.5 rounded-full', call.status === 'Otvorená' ? 'bg-emerald-500' : 'bg-amber-500']"></span>
                  {{ call.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button @click="editCall(call)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Upraviť výzvu">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageCallsView",
  data() {
    return {
      expandedProposalId: null,
      pendingChallenges: [
        {
          id: 101, type: "A",
          title: "Mobilná aplikácia pre zdieľanie parkovania",
          author: "Samuel Hruška",
          category: "Webové aplikácie",
          description: "Cieľom je vytvoriť komunitnú platformu pre obyvateľov sídlisk, kde môžu v reálnom čase zdieľať informácie o voľných parkovacích miestach. Študent navrhuje využitie frameworku Vue.js.",
          submittedAt: "Dnes o 10:45"
        },
        {
          id: 102, type: "B",
          title: "Prediktívna údržba vstrekovacích lisov",
          author: "Innovate AI s.r.o.",
          category: "AI a dátové technológie",
          description: "Hľadáme tím pre analýzu dát zo senzorov našej výrobnej linky. Potrebujeme model, ktorý včas upozorní na možné poruchy motorov.",
          budget: "3 500 €",
          submittedAt: "Včera o 16:20"
        }
      ],
      calls: [
        { id: 1, type: "B", title: "Optimalizácia logistických trás", category: "IoT systémy", teamCount: 4, status: "Otvorená" },
        { id: 2, type: "A", title: "VR trenažér pre medikov", category: "Herný vývoj", teamCount: 12, status: "Otvorená" },
        { id: 3, type: "B", title: "Smart City osvetlenie Nitra", category: "AI technológie", teamCount: 7, status: "V hodnotení" }
      ]
    };
  },
  methods: {
    toggleProposal(id) {
      this.expandedProposalId = this.expandedProposalId === id ? null : id;
    },
    approveProposal(proposal) {
      alert(`Výzva "${proposal.title}" bola schválená.`);
      this.pendingChallenges = this.pendingChallenges.filter(p => p.id !== proposal.id);
    },
    rejectProposal(id) {
      if (confirm("Naozaj chcete zamietnuť tento návrh?")) {
        this.pendingChallenges = this.pendingChallenges.filter(p => p.id !== id);
      }
    },
    createNewCall() {
      this.$router.push('/admin-dashboard/create-challenge');
    },
    editCall(call) {  }
  }
};
</script>

<style scoped>
.animate-in {
  animation: slideDown 0.4s ease-out forwards;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>