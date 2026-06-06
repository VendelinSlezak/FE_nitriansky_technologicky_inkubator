<template>
  <div class="p-6 max-w-7xl mx-auto text-slate-800">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-10">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-800">Správa používateľských účtov</h2>
        <p class="text-slate-500 text-sm mt-1">Vytvárajte, upravujte a spravujte prístupy do administrácie.</p>
      </div>
      
      <button 
        @click="createNewAccount"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Pridať účet
      </button>
    </div>

    <section v-if="pendingRequests.length > 0" class="mb-12 space-y-4">
      <div class="flex items-center gap-2 px-2">
        <h3 class="font-bold text-slate-700 uppercase text-xs tracking-wider">Nové žiadosti o registráciu ({{ pendingRequests.length }})</h3>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table class="w-full text-left text-sm table-fixed">
          <thead class="bg-slate-50 text-slate-600 font-semibold text-[10px] uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th class="px-6 py-3 w-1/3">Meno / Spoločnosť</th>
              <th class="px-6 py-3 w-1/4">Typ účtu</th>
              <th class="px-6 py-3 w-1/4">E-mail</th>
              <th class="px-6 py-3 w-auto text-right">Akcia</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <template v-for="req in pendingRequests" :key="req.id">
              <tr 
                @click="toggleRequest(req.id)"
                class="cursor-pointer hover:bg-slate-50 transition-colors"
                :class="{'bg-blue-50/50': expandedRequestId === req.id}"
              >
                <td class="px-6 py-4 font-bold text-slate-800 truncate">
                  {{ req.type === 'student' ? req.name : req.name_of_company }}
                </td>
                <td class="px-6 py-4">
                  <span 
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border',
                      req.type === 'student' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    ]"
                  >
                    {{ req.type === 'student' ? 'Študent' : 'Firma' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-slate-500 font-medium truncate">{{ req.email }}</td>
                <td class="px-6 py-4 text-right">
                  <div class="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-tight">
                    {{ expandedRequestId === req.id ? 'Zavrieť' : 'Detail' }}
                    <svg class="h-4 w-4 transition-transform duration-300" :class="{'rotate-180': expandedRequestId === req.id}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </td>
              </tr>

              <tr v-if="expandedRequestId === req.id">
                <td colspan="4" class="px-6 md:px-12 py-8 bg-slate-50/80 border-y border-slate-100">
                  <div class="max-w-2xl space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    
                    <div class="grid grid-cols-1 gap-5">
                      <template v-if="req.type === 'student'">
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Celé meno</span>
                          <span class="text-sm font-bold text-slate-800">{{ req.name }}</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Univerzita</span>
                          <span class="text-sm font-bold text-slate-800">{{ req.university }}</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Univerzitný email</span>
                          <span class="text-sm font-bold text-slate-800">{{ req.email }}</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Príloha (Životopis)</span>
                          <div class="flex items-center gap-2 text-blue-600 font-bold text-sm">
                             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" /></svg>
                             <a :href="req.curriculum_vitae_url" @click.prevent class="hover:underline">{{ req.curriculum_vitae_name }}</a>
                          </div>
                        </div>
                      </template>

                      <template v-else>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Názov spoločnosti</span>
                          <span class="text-sm font-bold text-slate-800">{{ req.name_of_company }}</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Identifikačné údaje</span>
                          <span class="text-sm font-bold text-slate-800">IČO: {{ req.ico }} <span class="mx-2 text-slate-300">|</span> DIČ: {{ req.dic || 'Neuvedené' }}</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Kontaktná osoba</span>
                          <span class="text-sm font-bold text-slate-800">{{ req.name_of_contact_person }}</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">E-mail pre prístup</span>
                          <span class="text-sm font-bold text-slate-800">{{ req.email }}</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Logo firmy</span>
                          <div class="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                             <img :src="req.logo_url" :alt="req.name_of_company">
                          </div>
                        </div>
                      </template>
                    </div>

                    <div class="flex items-center gap-3 pt-6 border-t border-slate-200">
                      <button 
                        @click.stop="approveRequest(req)" 
                        class="px-8 py-3 bg-slate-900 hover:bg-black text-white text-xs font-black rounded-xl shadow-xl transition-all uppercase tracking-[0.15em]"
                      >
                        Schváliť prístup
                      </button>
                      <button 
                        @click.stop="rejectRequest(req)" 
                        class="px-6 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors uppercase tracking-widest"
                      >
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

    <div class="space-y-6">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:w-96">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Hľadať používateľa..." 
            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
          />
        </div>
        
        <div class="text-sm text-slate-500 font-medium">
          Celkovo: <strong>{{ filteredUsers.length }}</strong> používateľov
        </div>
      </div>

      <div class="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
        <table class="w-full text-left text-sm table-auto border-collapse">
          <thead class="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th class="px-6 py-4">Používateľ</th>
              <th class="px-6 py-4">Rola</th>
              <th class="px-6 py-4 text-right">Akcie</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div :class="`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-blue-600`">
                    {{ getInitials(user.name) }}
                  </div>
                  <div class="min-w-0">
                    <div class="font-bold text-slate-800 truncate">{{ user.name }}</div>
                    <div class="text-slate-500 text-xs truncate">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight', user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700']">
                  {{ user.role }}
                </span>
              </td>
              
              <td class="px-6 py-4 text-right whitespace-nowrap">
                <div v-if="user.role !== 'admin'" class="flex items-center justify-end gap-1">
                  <button @click="editUser(user)" class="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
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
import axios from "axios";
export default {
  name: "ManageAccountsView",
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      searchQuery: "",
      expandedRequestId: null,

      pendingRequests: [],
      users: [],
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users;
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user => 
        user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    document.title = "Nitriansky technologický inkubátor";
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const responseUsers = await axios.get(`${this.backendApiUrl}/api/auth/users`);
        this.users = responseUsers.data;

        const responseStudentRequests = await axios.get(`${this.backendApiUrl}/api/auth/students/registration-requests`);
        this.pendingRequests = responseStudentRequests.data.students;

        const responseCompaniesRequests = await axios.get(`${this.backendApiUrl}/api/auth/companies/registration-requests`);
        this.pendingRequests.push(...responseCompaniesRequests.data.companies);
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    getInitials(name) {
      return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
    },
    toggleRequest(id) {
      this.expandedRequestId = this.expandedRequestId === id ? null : id;
    },
    async approveRequest(req) {
      try {
        if (req.type === 'student') {
          await axios.post(`${this.backendApiUrl}/api/auth/student/${req.id}/approve-registration`);
        }
        else {
          await axios.post(`${this.backendApiUrl}/api/auth/company/${req.id}/approve-registration`);
        }
      }
      catch (error) {
        console.error("Error approving request:", error);
      }
      this.fetchData();
    },
    async rejectRequest(req) {
      if (confirm("Naozaj chcete zamietnuť túto registráciu?")) {
        try {
          if (req.type === 'student') {
            await axios.post(`${this.backendApiUrl}/api/auth/student/${req.id}/reject-registration`);
          }
          else {
            await axios.post(`${this.backendApiUrl}/api/auth/company/${req.id}/reject-registration`);
          }
        }
        catch (error) {
          console.error("Error deleting request:", error);
        }
        this.fetchData();
      }
    },
    createNewAccount() { 
      this.$router.push({ name: "admin-create-account" });
    },
    editUser(user) { 
      this.$router.push({ name: "admin-edit-account", params: { id: user.id } });
    },
  }
};
</script>