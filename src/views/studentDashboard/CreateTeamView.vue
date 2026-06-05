<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center font-sans text-gray-900">
    <div class="max-w-4xl w-full mx-auto space-y-10">
      
      <div class="text-center md:text-left">
        <router-link to="/student-dashboard" class="text-blue-600 hover:text-blue-800 text-sm font-black uppercase tracking-widest flex items-center gap-2 mb-4 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
          Späť na dashboard
        </router-link>
        <h1 class="text-4xl font-black text-gray-900 uppercase tracking-tight">Vytvoriť nový tím</h1>
        <p class="text-gray-500 font-medium mt-2">Zostavte tím pre jednu z existujúcich výziev a staňte sa jeho lídrom.</p>
      </div>

      <div class="space-y-8">
        
        <section class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 class="text-xl font-black uppercase tracking-tight">1. Vyberte si výzvu</h2>
            <div class="flex bg-gray-100 p-1 rounded-xl">
              <button 
                v-for="f in ['Všetko', 'Program A', 'Program B']" :key="f"
                @click="filter = f; currentPage = 1"
                :class="['px-4 py-2 rounded-lg text-xs font-black uppercase transition-all', filter === f ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600']"
              >
                {{ f }}
              </button>
            </div>
          </div>

          <div class="grid gap-4">
            <div 
              v-for="challenge in paginatedChallenges" :key="challenge.id"
              class="border-2 rounded-2xl transition-all overflow-hidden"
              :class="[team.challengeId === challenge.id ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-gray-200']"
            >
              <div @click="toggleExpand(challenge.id)" class="p-5 cursor-pointer flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div @click.stop="selectChallenge(challenge)" :class="['w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all', team.challengeId === challenge.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300']">
                    <svg v-if="team.challengeId === challenge.id" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                  </div>
                  <div>
                    <h3 class="font-black text-gray-900 leading-tight">{{ challenge.name }}</h3>
                    <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">Program {{ challenge.program }}</span>
                  </div>
                </div>
                <svg :class="['w-5 h-5 text-gray-400 transition-transform', expandedId === challenge.id ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </div>

              <div v-if="expandedId === challenge.id" class="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50/50 animate-in slide-in-from-top-2">
                <div class="space-y-4 text-sm">
                  <p class="text-gray-600 leading-relaxed">{{ challenge.description }}</p>
                  <div class="flex flex-wrap gap-4">
                    <div v-if="challenge.program === 'B'"class="bg-white px-4 py-2 rounded-xl border border-gray-200">
                      <span class="text-[9px] font-black text-gray-400 uppercase block">Rozpočet</span>
                      <span class="font-bold text-gray-900">{{ challenge.reward }} €</span>
                    </div>
                    <a :href="challenge.technical_specification" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2 hover:bg-blue-700 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Technická špecifikácia
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="totalPages > 1" class="flex justify-center gap-2 pt-4">
            <button 
              v-for="p in totalPages" :key="p" @click="currentPage = p"
              :class="['w-8 h-8 rounded-lg text-xs font-black transition-all', currentPage === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-100 text-gray-400 hover:bg-gray-200']"
            >
              {{ p }}
            </button>
          </div>
        </section>

        <section class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-8">
          <h2 class="text-xl font-black uppercase tracking-tight">2. Zloženie tímu</h2>
          
          <div class="space-y-4">
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Názov tímu</label>
            <input v-model="team.name" type="text" placeholder="Napr. Inovačná Jednotka" class="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 focus:border-blue-500 outline-none font-bold transition-all" />
          </div>

          <div class="space-y-4">
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Pozvaní členovia</label>
            <div class="overflow-hidden border-2 border-gray-100 rounded-2xl">
              <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email študenta</th>
                    <th class="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Akcia</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(member, index) in team.members" :key="member" class="hover:bg-gray-50 transition-colors">
                    <td class="p-4 font-bold text-gray-700">{{ member }}</td>
                    <td class="p-4">
                      <button @click="removeMember(index)" class="text-red-400 hover:text-red-600 transition-colors p-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="team.members.length === 0">
                    <td colspan="2" class="p-8 text-center text-gray-400 text-sm font-medium italic">Zatiaľ ste nepridali žiadnych členov.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex flex-col md:flex-row gap-3">
              <input 
                v-model="newMemberEmail" 
                type="email" 
                placeholder="zadajte.email@student.sk" 
                class="flex-grow bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 focus:border-blue-500 outline-none font-bold transition-all"
                @keyup.enter="inviteMember"
              />
              <button 
                @click="inviteMember" 
                class="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
              >
                Pozvať do tímu
              </button>
            </div>
            <p v-if="inviteError" class="text-xs font-bold text-red-500 flex items-center gap-2 animate-in fade-in">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" /></svg>
              {{ inviteError }}
            </p>
          </div>
        </section>

        <section class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-8">
          <h2 class="text-xl font-black uppercase tracking-tight">3. Dokumentácia a prílohy</h2>

          <div class="flex flex-col gap-6">
            
            <div class="space-y-3">
              <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Návrh zadania (PDF)</label>
              <div class="relative group">
                <input type="file" @change="handleFileChange($event, 'assignment')" accept=".pdf" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div :class="['p-4 md:p-5 rounded-2xl border-2 border-dashed transition-all flex items-center justify-between', team.files.assignment ? 'border-green-500 bg-green-50' : 'border-gray-200 group-hover:border-blue-400 bg-gray-50']">
                  <div class="flex items-center gap-3 overflow-hidden">
                    <svg class="w-6 h-6 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span class="text-sm font-bold truncate text-gray-700">{{ team.files.assignment ? team.files.assignment.name : 'Nahrať súbor s návrhom...' }}</span>
                  </div>
                  <div v-if="team.files.assignment" class="text-green-500">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Motivačný list (PDF)</label>
              <div class="relative group">
                <input type="file" @change="handleFileChange($event, 'motivation')" accept=".pdf" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div :class="['p-4 md:p-5 rounded-2xl border-2 border-dashed transition-all flex items-center justify-between', team.files.motivation ? 'border-green-500 bg-green-50' : 'border-gray-200 group-hover:border-blue-400 bg-gray-50']">
                  <div class="flex items-center gap-3 overflow-hidden">
                    <svg class="w-6 h-6 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span class="text-sm font-bold truncate text-gray-700">{{ team.files.motivation ? team.files.motivation.name : 'Nahrať motivačný list...' }}</span>
                  </div>
                  <div v-if="team.files.motivation" class="text-green-500">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <div class="flex flex-col sm:flex-row gap-4 pt-6">
          <button 
            @click="submitTeam" 
            :disabled="!isValid"
            class="flex-grow bg-blue-600 text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-30 disabled:shadow-none active:scale-[0.98]"
          >
            Vytvoriť tím a odoslať na schválenie
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "CreateTeamView",
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      filter: 'Všetko',
      currentPage: 1,
      itemsPerPage: 5,
      expandedId: null,
      newMemberEmail: "",
      inviteError: "",
      challenges: [],

      team: {
        name: "",
        challengeId: null,
        members: [],
        files: {
          assignment: null,
          motivation: null,
        },
      }
    };
  },
  computed: {
    filteredChallenges() {
      if (this.filter === 'Program A') return this.challenges.filter(c => c.program === 'A');
      else if (this.filter === 'Program B') return this.challenges.filter(c => c.program === 'B');
      return this.challenges;
    },
    totalPages() {
      return Math.ceil(this.filteredChallenges.length / this.itemsPerPage);
    },
    paginatedChallenges() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredChallenges.slice(start, end);
    },
    isValid() {
      return (
        this.team.name.length > 2 && 
        this.team.challengeId !== null &&
        this.team.files.assignment !== null &&
        this.team.files.motivation !== null
      );
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const responseA = await axios.get(`${this.backendApiUrl}/api/auth/program-a`);
        this.challenges = responseA.data;
        const responseB = await axios.get(`${this.backendApiUrl}/api/auth/program-b`);
        this.challenges.push(...responseB.data);
      }
      catch (error) {
        console.error("Fetch error:", error);
      }
    },
    handleFileChange(event, type) {
      const file = event.target.files[0];
      if (!file) return;
      this.team.files[type] = file;
      event.target.value = '';
    },
    toggleExpand(id) {
      this.expandedId = this.expandedId === id ? null : id;
    },
    selectChallenge(challenge) {
      this.team.challengeId = challenge.id;
    },
    async inviteMember() {
      this.inviteError = "";
      const email = this.newMemberEmail.trim().toLowerCase();

      if (!email || !email.includes('@')) {
        this.inviteError = "Zadajte platný email.";
        return;
      }
      if (this.team.members.includes(email)) {
        this.inviteError = "Tento študent už v tabuľke je.";
        return;
      }
      try {
        const formData = new FormData();
        formData.append('email', email);
        const response = await axios.post(`${this.backendApiUrl}/api/auth/student/can-be-invited`, formData);
        if (response.data.status === true) {
          this.team.members.push(email);
          this.newMemberEmail = "";
        }
        else {
          this.inviteError = "Užívateľa s týmto emailom nie je možné pozvať.";
        }
      }
      catch (error) {
        this.inviteError = "Užívateľ s týmto emailom neexistuje.";
      }
    },
    removeMember(index) {
      this.team.members.splice(index, 1);
    },
    async submitTeam() {
      try {
        const formData = new FormData();
        formData.append('challenge_id', this.team.challengeId);
        formData.append('name_of_team', this.team.name);
        this.team.members.forEach((email, index) => {
          formData.append(`members[${index}][email]`, email);
        });
        formData.append('proposal_of_implementation', this.team.files.assignment);
        formData.append('cover_letter', this.team.files.motivation);
        await axios.post(`${this.backendApiUrl}/api/auth/student/create-team`, formData);
        alert("Tím bol úspešne vytvorený!");
        this.$router.push('/student-dashboard');
      }
      catch (error) {
        alert("Chyba pri vytváraní timu.");
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.animate-in {
  animation: slide-in 0.3s ease-out;
}
@keyframes slide-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>