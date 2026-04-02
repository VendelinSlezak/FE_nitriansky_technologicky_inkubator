<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-800">Správa tímov</h2>
        <p class="text-slate-500 text-sm mt-1">Vytvárajte pracovné skupiny a priraďujte k nim používateľov.</p>
      </div>
      
      <button 
        @click="openCreateTeamModal"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Vytvoriť tím
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
          placeholder="Hľadať podľa názvu tímu alebo lídra..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-colors"
        />
      </div>
      
      <div class="flex items-center gap-2 text-sm text-slate-500 w-full md:w-auto justify-end">
        <span>Zobrazených: <strong>{{ filteredTeams.length }}</strong> z {{ teams.length }}</span>
      </div>
    </div>

    <div class="border border-slate-150 rounded-2xl overflow-hidden bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th scope="col" class="px-6 py-4">Tím</th>
              <th scope="col" class="px-6 py-4">Vedúci tímu (Líder)</th>
              <th scope="col" class="px-6 py-4">Členovia</th>
              <th scope="col" class="px-6 py-4">Stav</th>
              <th scope="col" class="px-6 py-4 text-right">Akcie</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="team in filteredTeams" :key="team.id" class="hover:bg-slate-50/50 transition-colors">
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-bold text-slate-800">{{ team.name }}</div>
                    <div class="text-slate-500 text-xs">{{ team.description }}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                    {{ getInitials(team.leader) }}
                  </div>
                  <span class="font-medium text-slate-700">{{ team.leader }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="flex -space-x-2 overflow-hidden">
                    <div v-for="n in Math.min(team.memberCount, 3)" :key="n" class="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-slate-300 flex items-center justify-center text-xs text-slate-600 font-medium">
                      {{ n }}
                    </div>
                  </div>
                  <span class="ml-3 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    +{{ team.memberCount }} členov
                  </span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span 
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    team.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  <span :class="['w-1.5 h-1.5 rounded-full', team.isActive ? 'bg-emerald-500' : 'bg-slate-400']"></span>
                  {{ team.isActive ? 'Aktívny' : 'Pozastavený' }}
                </span>
              </td>
              
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="editTeam(team)"
                    class="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Upraviť tím"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="deleteTeam(team.id)"
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Zmazať tím"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            
            <tr v-if="filteredTeams.length === 0">
              <td colspan="5" class="text-center py-12 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Nenašli sa žiadne tímy vyhovujúci vyhľadávaniu.
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
  name: "ManageTeamsView",
  data() {
    return {
      searchQuery: "",
      teams: [
        {
          id: 1,
          name: "Redakcia správ",
          description: "Správa hlavných článkov a aktualít",
          leader: "Marek Kováč",
          memberCount: 5,
          isActive: true
        },
        {
          id: 2,
          name: "Zákaznícka podpora",
          description: "Riešenie FAQ a odpovedí pre klientov",
          leader: "Jana Nováková",
          memberCount: 3,
          isActive: true
        },
        {
          id: 3,
          name: "Grafický tím",
          description: "Príprava log a grafických podkladov",
          leader: "Lucia Richterová",
          memberCount: 2,
          isActive: false
        }
      ]
    };
  },
  computed: {
    filteredTeams() {
      if (!this.searchQuery) return this.teams;
      
      const query = this.searchQuery.toLowerCase();
      return this.teams.filter(team => 
        team.name.toLowerCase().includes(query) || 
        team.leader.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    getInitials(name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    },
    openCreateTeamModal() {
      alert("Tu by sa otvoril modál pre vytvorenie nového tímu.");
    },
    editTeam(team) {
      alert(`Úprava tímu: ${team.name}`);
    },
    deleteTeam(id) {
      if (confirm("Naozaj chcete zmazať tento tím?")) {
        this.teams = this.teams.filter(t => t.id !== id);
      }
    }
  }
};
</script>