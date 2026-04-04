<template>
  <div class="space-y-6 p-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-800">Správa tímov</h2>
        <p class="text-slate-500 text-sm mt-1">Zoznam aktívnych pracovných skupín.</p>
      </div>
      
      <button 
        @click="openCreateTeam"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-sm"
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
          placeholder="Hľadať tím..." 
          class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
        />
      </div>
    </div>

    <div class="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th scope="col" class="px-6 py-4">Názov tímu</th>
              <th scope="col" class="px-6 py-4">Zodpovedný líder</th>
              <th scope="col" class="px-6 py-4">Stav</th>
              <th scope="col" class="px-6 py-4 text-right">Akcie</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="team in filteredTeams" :key="team.id" class="hover:bg-slate-50/50 transition-colors">
              
              <td class="px-6 py-4 font-semibold text-slate-800">
                <div class="flex items-center gap-3">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {{ team.name }}
                </div>
              </td>
              
              <td class="px-6 py-4 text-slate-600">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                    {{ getInitials(team.leader) }}
                  </div>
                  {{ team.leader }}
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span 
                  :class="[
                    'px-2.5 py-0.5 rounded-md text-xs font-medium',
                    team.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  {{ team.isActive ? 'Aktívny' : 'Neaktívny' }}
                </span>
              </td>
              
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-3">
                  <button @click="editTeam(team)" class="text-slate-400 hover:text-emerald-600 transition-colors">
                    Upraviť
                  </button>
                  <button @click="deleteTeam(team.id)" class="text-slate-400 hover:text-rose-600 transition-colors">
                    Zmazať
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
    openCreateTeam() {
      this.$router.push({ name: "admin-create-team" });
    },
    editTeam(team) {
      this.$router.push({ name: "admin-edit-team", params: { id: team.id } });
    },
    deleteTeam(id) {
      if (confirm("Naozaj chcete zmazať tento tím?")) {
        this.teams = this.teams.filter(t => t.id !== id);
      }
    }
  }
};
</script>