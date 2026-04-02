<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-800">Správa používateľských účtov</h2>
        <p class="text-slate-500 text-sm mt-1">Vytvárajte, upravujte a spravujte prístupy do administrácie.</p>
      </div>
      
      <button 
        @click="openCreateModal"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Pridať účet
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
          placeholder="Hľadať podľa mena alebo e-mailu..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
        />
      </div>
      
      <div class="flex items-center gap-2 text-sm text-slate-500 w-full md:w-auto justify-end">
        <span>Zobrazených: <strong>{{ filteredUsers.length }}</strong> z {{ users.length }}</span>
      </div>
    </div>

    <div class="border border-slate-150 rounded-2xl overflow-hidden bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th scope="col" class="px-6 py-4">Používateľ</th>
              <th scope="col" class="px-6 py-4">Rola</th>
              <th scope="col" class="px-6 py-4">Stav</th>
              <th scope="col" class="px-6 py-4">Posledné prihlásenie</th>
              <th scope="col" class="px-6 py-4 text-right">Akcie</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 flex items-center gap-3">
                <div :class="`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${user.avatarBg}`">
                  {{ getInitials(user.name) }}
                </div>
                <div>
                  <div class="font-bold text-slate-800">{{ user.name }}</div>
                  <div class="text-slate-500 text-xs">{{ user.email }}</div>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>
              
              <td class="px-6 py-4">
                <span 
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    user.status === 'Aktívny' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  <span :class="['w-1.5 h-1.5 rounded-full', user.status === 'Aktívny' ? 'bg-emerald-500' : 'bg-slate-400']"></span>
                  {{ user.status }}
                </span>
              </td>
              
              <td class="px-6 py-4 text-slate-500 text-xs">
                {{ user.lastLogin }}
              </td>
              
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="editUser(user)"
                    class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Upraviť používateľa"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="deleteUser(user.id)"
                    class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Zmazať používateľa"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            
            <tr v-if="filteredUsers.length === 0">
              <td colspan="5" class="text-center py-12 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Nenašli sa žiadni používatelia vyhovujúci vyhľadávaniu.
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
  name: "ManageAccountsView",
  data() {
    return {
      searchQuery: "",
      users: [
        {
          id: 1,
          name: "Marek Kovác",
          email: "marek.kovac@nti.sk",
          role: "Admin",
          status: "Aktívny",
          lastLogin: "Dnes o 08:45",
          avatarBg: "bg-blue-600"
        },
        {
          id: 2,
          name: "Jana Nováková",
          email: "jana.novakova@nti.sk",
          role: "Editor",
          status: "Aktívny",
          lastLogin: "Včera o 14:20",
          avatarBg: "bg-emerald-600"
        },
        {
          id: 3,
          name: "Peter Halás",
          email: "peter.halas@nti.sk",
          role: "Editor",
          status: "Neaktívny",
          lastLogin: "Pred 5 dňami",
          avatarBg: "bg-purple-600"
        },
        {
          id: 4,
          name: "Lucia Richterová",
          email: "lucia.richterova@nti.sk",
          role: "Editor",
          status: "Aktívny",
          lastLogin: "Dnes o 11:10",
          avatarBg: "bg-pink-600"
        }
      ]
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users;
      
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
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
    openCreateModal() {
      alert("Tu by sa otvoril modál pre pridanie nového účtu.");
    },
    editUser(user) {
      alert(`Úprava používateľa: ${user.name}`);
    },
    deleteUser(id) {
      if (confirm("Naozaj chcete zmazať tento účet?")) {
        this.users = this.users.filter(u => u.id !== id);
      }
    }
  }
};
</script>