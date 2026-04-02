<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-800">Správa výziev</h2>
        <p class="text-slate-500 text-sm mt-1">Vytvárajte a spravujte inkubačné a technologické výzvy pre projekty.</p>
      </div>
      
      <button 
        @click="openCreateCallModal"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nová výzva
      </button>
    </div>

    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative w-full md:w-96">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Hľadať výzvu podľa názvu..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm transition-colors"
        />
      </div>
      
      <div class="flex items-center gap-2 text-sm text-slate-500 w-full md:w-auto justify-end">
        <span>Zobrazených: <strong>{{ filteredCalls.length }}</strong> z {{ calls.length }}</span>
      </div>
    </div>

    <div class="border border-slate-150 rounded-2xl overflow-hidden bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th scope="col" class="px-6 py-4">Názov výzvy</th>
              <th scope="col" class="px-6 py-4">Uzávierka (Deadline)</th>
              <th scope="col" class="px-6 py-4">Prihlásené projekty</th>
              <th scope="col" class="px-6 py-4">Stav</th>
              <th scope="col" class="px-6 py-4 text-right">Akcie</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="call in filteredCalls" :key="call.id" class="hover:bg-slate-50/50 transition-colors">
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v16a2 2 0 002 2h10a2 2 0 002-2V7l-4-4H7a2 2 0 00-2 2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 3v4h4" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-bold text-slate-800">{{ call.title }}</div>
                    <div class="text-xs text-slate-500 mt-0.5">{{ call.category }}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="font-medium text-slate-700">{{ call.deadline }}</span>
                  <span class="text-xs text-slate-500">{{ call.daysRemaining }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-full bg-slate-100 h-1.5 rounded-full max-w-[100px] overflow-hidden">
                    <div 
                      class="h-full bg-sky-500 rounded-full" 
                      :style="{ width: `${Math.min((call.applications / 30) * 100, 100)}%` }"
                    ></div>
                  </div>
                  <span class="font-bold text-slate-700">{{ call.applications }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span 
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    call.status === 'Otvorená' ? 'bg-emerald-100 text-emerald-700' : 
                    call.status === 'V hodnotení' ? 'bg-amber-100 text-amber-700' : 
                    call.status === 'Uzatvorená' ? 'bg-rose-100 text-rose-700' : 
                    'bg-slate-100 text-slate-600'
                  ]"
                >
                  <span :class="[
                    'w-1.5 h-1.5 rounded-full', 
                    call.status === 'Otvorená' ? 'bg-emerald-500' : 
                    call.status === 'V hodnotení' ? 'bg-amber-500' : 
                    call.status === 'Uzatvorená' ? 'bg-rose-500' : 
                    'bg-slate-400'
                  ]"></span>
                  {{ call.status }}
                </span>
              </td>
              
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="viewApplications(call)"
                    class="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="Zobraziť prihlášky"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    @click="editCall(call)"
                    class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Upraviť výzvu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="deleteCall(call.id)"
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Zmazať výzvu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            
            <tr v-if="filteredCalls.length === 0">
              <td colspan="5" class="text-center py-12 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Nenašli sa žiadne výzvy vyhovujúce vyhľadávaniu.
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
      searchQuery: "",
      calls: [
        {
          id: 1,
          title: "Inovačný voucher 2026",
          category: "Technologický transfer",
          deadline: "15. Máj 2026",
          daysRemaining: "Zostáva 43 dní",
          applications: 12,
          status: "Otvorená"
        },
        {
          id: 2,
          title: "Študentský startup program",
          category: "Pre študentov a absolventov",
          deadline: "30. Apríl 2026",
          daysRemaining: "Zostáva 28 dní",
          applications: 24,
          status: "Otvorená"
        },
        {
          id: 3,
          title: "Akcelerátor: Smart City riešenia",
          category: "Priemyselná spolupráca",
          deadline: "01. Marec 2026",
          daysRemaining: "Ukončené",
          applications: 18,
          status: "V hodnotení"
        },
        {
          id: 4,
          title: "Zimný inkubačný program 2025",
          category: "Všeobecná inkubácia",
          deadline: "15. December 2025",
          daysRemaining: "Ukončené",
          applications: 32,
          status: "Uzatvorená"
        }
      ]
    };
  },
  computed: {
    filteredCalls() {
      if (!this.searchQuery) return this.calls;
      
      const query = this.searchQuery.toLowerCase();
      return this.calls.filter(call => 
        call.title.toLowerCase().includes(query) || 
        call.category.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    openCreateCallModal() {
      alert("Tu by sa otvoril modál pre vytvorenie novej výzvy.");
    },
    editCall(call) {
      alert(`Úprava výzvy: ${call.title}`);
    },
    viewApplications(call) {
      alert(`Zobrazenie prihlásených projektov pre výzvu: ${call.title}`);
    },
    deleteCall(id) {
      if (confirm("Naozaj chcete zmazať túto výzvu?")) {
        this.calls = this.calls.filter(c => c.id !== id);
      }
    }
  }
};
</script>