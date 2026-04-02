<template>
  <div class="min-h-screen font-sans text-slate-900 pb-20">
    <div class="max-w-6xl mx-auto px-6 py-12 space-y-16">
      
      <div class="pb-3">
        <h1 class="text-3xl font-black text-slate-900 uppercase tracking-tight">Správa používateľských účtov</h1>
      </div>

      <section class="space-y-6">
        <div class="flex items-center gap-3 px-2">
          <div class="w-3 h-8 bg-amber-400 rounded-full"></div>
          <h2 class="text-2xl font-black text-slate-800 uppercase">Čakajúce žiadosti ({{ pendingRequests.length }})</h2>
        </div>

        <div v-if="pendingRequests.length === 0" class="bg-white border border-slate-200 rounded-[2rem] py-10 text-center text-slate-400 text-sm italic">
          Momentálne neevidujeme žiadne nové žiadosti o registráciu.
        </div>

        <div class="grid gap-4">
          <div v-for="req in pendingRequests" :key="req.id" class="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div class="flex items-center gap-4">
                <div :class="[req.type === 'student' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600', 'p-3 rounded-2xl']">
                  <svg v-if="req.type === 'student'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-black text-lg">{{ req.name }}</h3>
                  <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ req.type === 'student' ? 'Študent' : 'Firma' }} • {{ req.email }}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-3 w-full md:w-auto">
                <button @click="openRequestDetail(req)" class="flex-1 md:flex-none px-4 py-2 text-sm font-bold bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                  Detail
                </button>
                <button @click="approveUser(req.id)" class="flex-1 md:flex-none px-4 py-2 text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-all">
                  Schváliť
                </button>
                <button @click="rejectUser(req.id)" class="flex-1 md:flex-none px-4 py-2 text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors">
                  Odmietnuť
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr class="border-slate-200">

      <section class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div class="space-y-4 flex-1">
            <div class="flex items-center gap-3">
              <div class="w-3 h-8 bg-blue-600 rounded-full"></div>
              <h2 class="text-2xl font-black text-slate-800 uppercase">Databáza účtov</h2>
            </div>
            <div class="flex flex-wrap gap-3">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Hľadať podľa mena, firmy alebo emailu..." 
                class="flex-1 min-w-[300px] px-6 py-3 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm"
              />
              <select v-model="filterType" class="px-4 py-3 rounded-2xl bg-white border border-slate-200 font-bold text-sm outline-none">
                <option value="all">Všetky typy</option>
                <option value="student">Študenti</option>
                <option value="firm">Firmy</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-100">
                  <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Používateľ</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Typ</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status / Príslušnosť</th>
                  <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Akcie</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <template v-for="user in paginatedUsers" :key="user.id">
                  <tr class="hover:bg-slate-50 transition-colors group">
                    <td class="px-8 py-6">
                      <div class="font-black text-slate-800">{{ user.name }}</div>
                      <div class="text-xs text-slate-400 font-medium">{{ user.email }}</div>
                    </td>
                    <td class="px-8 py-6">
                      <span :class="[user.type === 'student' ? 'text-blue-600 bg-blue-50' : 'text-emerald-600 bg-emerald-50', 'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-current opacity-80']">
                        {{ user.type === 'student' ? 'Študent' : 'Firma' }}
                      </span>
                    </td>
                    <td class="px-8 py-6">
                      <div v-if="user.type === 'student'" class="text-sm">
                        <span v-if="user.teamId" class="text-slate-600 font-bold">Tím: {{ user.teamName }}</span>
                        <span v-else class="text-slate-300 italic">Bez tímu</span>
                      </div>
                      <div v-else class="text-sm text-slate-600 font-bold">
                        IČO: {{ user.ico }}
                      </div>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <button 
                        @click="toggleEdit(user.id)" 
                        class="p-2 hover:bg-blue-600 hover:text-white rounded-xl transition-all text-slate-300"
                      >
                        <svg v-if="editingId === user.id" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </td>
                  </tr>

                  <tr v-if="editingId === user.id" class="bg-blue-50/30">
                    <td colspan="4" class="px-8 py-8 border-y border-blue-100">
                      <div class="grid md:grid-cols-2 gap-8">
                        <div class="space-y-4">
                          <h4 class="text-[10px] font-black text-blue-600 uppercase tracking-widest">Základné údaje</h4>
                          <div class="grid gap-4">
                            <div>
                              <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Meno / Názov</label>
                              <input v-model="editForm.name" type="text" class="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                            </div>
                            <div>
                              <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Email</label>
                              <input v-model="editForm.email" type="email" class="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                            </div>
                          </div>
                        </div>

                        <div class="space-y-4">
                          <h4 class="text-[10px] font-black text-blue-600 uppercase tracking-widest">Atribúty roli</h4>
                          
                          <div v-if="user.type === 'student'" class="space-y-4">
                            <div>
                              <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Univerzita</label>
                              <input v-model="editForm.university" type="text" class="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                            </div>
                            <div v-if="user.teamId" class="p-4 bg-white border border-blue-100 rounded-2xl flex justify-between items-center">
                              <span class="text-xs font-bold text-slate-600 italic">Člen tímu {{ user.teamName }}</span>
                              <router-link :to="`/admin/teams/${user.teamId}`" class="text-xs font-black text-blue-600 underline uppercase">Spravovať tím</router-link>
                            </div>
                          </div>

                          <div v-if="user.type === 'firm'" class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                              <div>
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">IČO</label>
                                <input v-model="editForm.ico" type="text" class="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                              </div>
                              <div>
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">DIČ</label>
                                <input v-model="editForm.dic" type="text" class="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                              </div>
                            </div>
                            <router-link :to="`/admin/challenges?firm=${user.id}`" class="block w-full p-4 bg-white border border-emerald-100 rounded-2xl text-center text-xs font-black text-emerald-600 underline uppercase">
                              Zobraziť výzvy firmy
                            </router-link>
                          </div>
                        </div>

                        <div class="md:col-span-2 pt-4 flex justify-between items-center border-t border-blue-100">
                          <button @click="deleteUser(user.id)" class="text-xs font-black text-red-500 hover:text-red-700 uppercase tracking-widest flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Vymazať účet
                          </button>
                          <div class="flex gap-3">
                            <button @click="editingId = null" class="px-6 py-2 text-xs font-black uppercase text-slate-400">Zrušiť</button>
                            <button @click="saveUserChanges(user.id)" class="px-8 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-blue-200">Uložiť zmeny</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          
          <div class="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <p class="text-xs font-bold text-slate-400">Zobrazuje sa {{ paginatedUsers.length }} z {{ filteredUsers.length }} výsledkov</p>
            <div class="flex gap-2">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-30"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                @click="currentPage++" 
                :disabled="currentPage >= totalPages"
                class="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-30"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="selectedRequest" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div :class="[selectedRequest.type === 'student' ? 'bg-blue-600' : 'bg-emerald-600', 'p-8 text-white']">
           <h3 class="text-xl font-black uppercase tracking-tight">Detail žiadosti</h3>
           <p class="opacity-80 text-sm">{{ selectedRequest.name }}</p>
        </div>
        <div class="p-8 space-y-4">
          <div v-for="(val, key) in selectedRequest.details" :key="key">
            <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ key }}</span>
            <span class="text-slate-800 font-bold">{{ val }}</span>
          </div>
          <div class="pt-6 flex gap-3">
             <button @click="selectedRequest = null" class="flex-1 py-4 text-xs font-black uppercase text-slate-400">Zatvoriť</button>
             <button @click="approveUser(selectedRequest.id)" class="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase shadow-lg">Schváliť prístup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAccountManagementView',
  data() {
    return {
      searchQuery: '',
      filterType: 'all',
      currentPage: 1,
      itemsPerPage: 10,
      editingId: null,
      selectedRequest: null,
      
      editForm: {
        name: '',
        email: '',
        university: '',
        ico: '',
        dic: ''
      },

      pendingRequests: [
        { 
          id: 501, type: 'student', name: 'Milan Šikovný', email: 'milan@stuba.sk', 
          details: { 'Univerzita': 'STU v Bratislave', 'Fakulta': 'FIIT', 'Ročník': '2. Ing' }
        },
        { 
          id: 502, type: 'firm', name: 'Tech Innovations s.r.o.', email: 'hr@techin.sk', 
          details: { 'IČO': '55888999', 'Sídlo': 'Košice', 'Zameranie': 'AI & ML' }
        }
      ],

      allUsers: [
        { id: 1, type: 'student', name: 'Ján Novák', email: 'jan@student.ukf.sk', university: 'UKF v Nitre', teamId: 10, teamName: 'PixelPerfect' },
        { id: 2, type: 'firm', name: 'GlobLogistics a.s.', email: 'admin@globlog.sk', ico: '12345678', dic: '2021234567' },
      ]
    }
  },
  computed: {
    filteredUsers() {
      return this.allUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesFilter = this.filterType === 'all' || user.type === this.filterType;
        return matchesSearch && matchesFilter;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    }
  },
  methods: {
    toggleEdit(userId) {
      if (this.editingId === userId) {
        this.editingId = null;
      } else {
        const user = this.allUsers.find(u => u.id === userId);
        this.editForm = { ...user };
        this.editingId = userId;
      }
    },
    openRequestDetail(req) {
      this.selectedRequest = req;
    },
    approveUser(id) {
      alert(`Používateľ ${id} bol schválený.`);
      this.pendingRequests = this.pendingRequests.filter(r => r.id !== id);
      this.selectedRequest = null;
    },
    rejectUser(id) {
      if(confirm('Naozaj chcete zamietnuť túto žiadosť?')) {
        this.pendingRequests = this.pendingRequests.filter(r => r.id !== id);
      }
    },
    saveUserChanges(id) {
      const index = this.allUsers.findIndex(u => u.id === id);
      this.allUsers[index] = { ...this.allUsers[index], ...this.editForm };
      this.editingId = null;
      alert('Zmeny boli uložené.');
    },
    deleteUser(id) {
      if(confirm('VAROVANIE: Naozaj chcete nenávratne vymazať tento účet?')) {
        this.allUsers = this.allUsers.filter(u => u.id !== id);
        this.editingId = null;
      }
    }
  },
  watch: {
    searchQuery() { this.currentPage = 1; },
    filterType() { this.currentPage = 1; }
  }
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>