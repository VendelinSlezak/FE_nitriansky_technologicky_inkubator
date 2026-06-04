<template>
  <div class="min-h-screen p-4 md:p-8 flex flex-col items-center font-sans text-slate-900">
    <div class="max-w-3xl w-full mx-auto space-y-6">
      
      <div class="pb-6 border-b border-slate-200">
        <router-link to="/admin-dashboard/manage-teams" class="text-emerald-600 hover:text-emerald-700 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
          Späť na zoznam
        </router-link>
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-black text-slate-900 uppercase">Upraviť tím</h1>
            <p class="text-slate-500 text-sm mt-1 font-medium">Úprava detailov tímu, správa členov a nahraných príloh.</p>
          </div>
          <button 
            @click="confirmDelete" 
            :disabled="isLoading"
            class="text-rose-600 text-[10px] font-black uppercase tracking-widest hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl border border-rose-100 transition-all disabled:opacity-50"
          >
            Zmazať tím
          </button>
        </div>
      </div>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-black uppercase text-slate-400 tracking-widest italic">1. Výber výzvy</h2>
          <select v-model="filter" class="bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold p-1 px-2 outline-none">
            <option v-for="f in ['Všetko', 'Program A', 'Program B']" :key="f" :value="f">{{ f }}</option>
          </select>
        </div>

        <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
          <div 
            v-for="challenge in filteredChallenges" :key="challenge.id"
            @click="selectChallenge(challenge)"
            :class="[
              'p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between',
              team.challenge_id === challenge.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'
            ]"
          >
            <div>
              <div class="font-bold text-slate-800">{{ challenge.name }}</div>
              <div class="text-[10px] font-black text-emerald-600 uppercase">Program {{ challenge.program }}</div>
            </div>
            <div v-if="team.challenge_id === challenge.id" class="text-emerald-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2 italic">2. Identita tímu</h2>
        <div class="space-y-1">
          <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Názov tímu</label>
          <input v-model="team.name" type="text" placeholder="Napr. Projektoví králi" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm" />
        </div>
      </section>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2 italic">3. Členovia a výber lídra</h2>
        
        <div class="flex gap-2">
          <input 
            v-model="newMemberEmail" 
            @keyup.enter="addMember" 
            type="email" 
            placeholder="email.studenta@student.sk" 
            class="flex-grow bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-slate-400 outline-none font-bold text-sm" 
            :disabled="isLoading"
          />
          <button 
            @click="addMember" 
            :disabled="isLoading"
            class="bg-slate-800 text-white px-6 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-600 transition-all disabled:opacity-50"
          >
            {{ isLoadingOverVerify ? 'Overujem...' : 'Pridať do zoznamu' }}
          </button>
        </div>

        <p v-if="errorMessage" class="text-rose-500 text-xs font-bold bg-rose-50 p-2 rounded-lg border border-rose-100">
          {{ errorMessage }}
        </p>

        <div v-if="team.members.length > 0" class="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
          <div v-for="member in team.members" :key="member.id" class="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-4">
              <input 
                type="radio" 
                :checked="member.status === 'teamleader'"
                @change="setLeader(member.id)"
                name="leaderSelection"
                class="w-5 h-5 text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <div class="flex flex-col">
                <span :class="['text-sm font-bold', member.status === 'teamleader' ? 'text-emerald-700' : 'text-slate-700']">{{ member.email }}</span>
                <span v-if="member.status === 'teamleader'" class="text-[9px] font-black text-emerald-500 uppercase tracking-widest font-mono">Hlavný Teamleader</span>
              </div>
            </div>

            <button @click="removeMember(member.id)" class="text-slate-300 hover:text-rose-500 transition-colors p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <p v-else class="text-center py-4 text-xs text-slate-400 italic">Zatiaľ neboli pridaní žiadni členovia.</p>
      </section>

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2 italic">4. Prílohy</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          <label class="relative cursor-pointer group">
            <input type="file" @change="handleFileChange($event, 'assignment')" class="hidden" />
            <div :class="['p-3 rounded-xl border-2 border-dashed text-xs font-bold flex items-center gap-3 transition-all', hasAssignment ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300']">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <span class="truncate">
                <template v-if="newAssignmentFile">{{ newAssignmentFile.name }}</template>
                <template v-else-if="team.proposal_of_implementation_name">{{ team.proposal_of_implementation_name }}</template>
                <template v-else>Návrh zadania (Chýba)</template>
              </span>
              <a v-if="team.proposal_of_implementation_url && !newAssignmentFile" :href="team.proposal_of_implementation_url" target="_blank" class="ml-auto text-emerald-600 hover:underline text-[10px]" @click.stop>Stiahnuť</a>
            </div>
          </label>

          <label class="relative cursor-pointer group">
            <input type="file" @change="handleFileChange($event, 'motivation')" class="hidden" />
            <div :class="['p-3 rounded-xl border-2 border-dashed text-xs font-bold flex items-center gap-3 transition-all', hasMotivation ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300']">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span class="truncate">
                <template v-if="newMotivationFile">{{ newMotivationFile.name }}</template>
                <template v-else-if="team.cover_letter_name">{{ team.cover_letter_name }}</template>
                <template v-else>Motivačný list (Chýba)</template>
              </span>
              <a v-if="team.cover_letter_url && !newMotivationFile" :href="team.cover_letter_url" target="_blank" class="ml-auto text-emerald-600 hover:underline text-[10px]" @click.stop>Stiahnuť</a>
            </div>
          </label>

        </div>
      </section>

      <div class="pt-4 pb-12">
        <button 
          @click="submitTeamEdit" 
          :disabled="!isValid || isLoading"
          class="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 disabled:opacity-30 disabled:shadow-none active:scale-[0.98]"
        >
          {{ isLoading ? 'Ukladám...' : 'Uložiť zmeny tímu' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AdminEditTeamView",
  data() {
    return {
      teamId: null,
      filter: 'Všetko',
      newMemberEmail: "",
      errorMessage: "",
      isLoading: false,
      isLoadingOverVerify: false,
      challenges: [],
      newAssignmentFile: null,
      newMotivationFile: null,

      team: {
        name: "",
        challenge_id: null,
        members: [], // Obsahuje objekty { id, email, status: 'teamleader' / 'member' }
        proposal_of_implementation_url: null,
        proposal_of_implementation_name: null,
        cover_letter_url: null,
        cover_letter_name: null
      }
    };
  },
  mounted() {
    this.teamId = this.$route.params.id;
    this.fetchData();
  },
  computed: {
    filteredChallenges() {
      if (this.filter === 'Všetko') return this.challenges;
      return this.challenges.filter(c => c.program === this.filter);
    },
    isValid() {
      const hasLeader = this.team.members.some(m => m.status === 'teamleader');
      return (
        this.team.name &&
        this.team.name.length > 2 && 
        this.team.challenge_id !== null && 
        hasLeader
      );
    },
    hasAssignment() {
      return this.newAssignmentFile || this.team.proposal_of_implementation_name;
    },
    hasMotivation() {
      return this.newMotivationFile || this.team.cover_letter_name;
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const responseProgramA = await axios.get('http://localhost:8080/api/auth/program-a');
        this.challenges = responseProgramA.data;
        const responseProgramB = await axios.get('http://localhost:8080/api/auth/program-b');
        this.challenges.push(...responseProgramB.data);

        const teamResponse = await axios.get(`http://localhost:8080/api/auth/team/${this.teamId}`);
        const teamData = teamResponse.data;

        this.team.name = teamData.name_of_team || teamData.name;
        this.team.challenge_id = teamData.challenge_id;
        
        if (teamData.members && Array.isArray(teamData.members)) {
          this.team.members = teamData.members.map(m => ({
            id: m.id,
            email: m.email,
            status: m.status === 'teamleader' ? 'teamleader' : 'member'
          }));
        }

        // Mapovanie priamo na vlastnosti v objekte team podľa požiadavky
        this.team.proposal_of_implementation_url = teamData.proposal_of_implementation_url || null;
        this.team.proposal_of_implementation_name = teamData.proposal_of_implementation_name || null;
        this.team.cover_letter_url = teamData.cover_letter_url || null;
        this.team.cover_letter_name = teamData.cover_letter_name || null;

      } catch (err) {
        console.error(err);
        alert("Chyba pri načítavaní dát zo servera.");
      } finally {
        this.isLoading = false;
      }
    },
    selectChallenge(challenge) { 
      this.team.challenge_id = challenge.id; 
    },
    async addMember() {
      this.errorMessage = "";
      const email = this.newMemberEmail.trim().toLowerCase();
      
      if (!email || !email.includes('@')) {
        this.errorMessage = "Zadajte platnú e-mailovú adresu.";
        return;
      }

      const exists = this.team.members.find(m => m.email === email);
      if (exists) {
        this.errorMessage = "Tento člen už bol do zoznamu pridaný.";
        return;
      }

      try {
        this.isLoadingOverVerify = true;
        const formData = new FormData();
        formData.append('email', email);
        const response = await axios.post('http://localhost:8080/api/auth/student/can-be-invited', formData);
        
        const canBeInvited = response.data.status;
        const studentId = response.data.id;
        
        if (canBeInvited) {
          const isFirst = this.team.members.length === 0;
          this.team.members.push({
            id: studentId,
            email: email,
            status: isFirst ? 'teamleader' : 'member'
          });
          this.newMemberEmail = "";
        } else {
          this.errorMessage = "Študenta nie je možné pozvať";
        }
      } catch (err) {
        console.error(err);
        this.errorMessage = "Chyba pri komunikácii so serverom pri overovaní študenta.";
      } finally {
        this.isLoadingOverVerify = false;
      }
    },
    setLeader(id) {
      this.team.members.forEach(m => {
        m.status = (m.id === id) ? 'teamleader' : 'member';
      });
    },
    removeMember(id) {
      this.team.members = this.team.members.filter(m => m.id !== id);
      if (this.team.members.length > 0 && !this.team.members.some(m => m.status === 'teamleader')) {
        this.team.members[0].status = 'teamleader';
      }
    },
    handleFileChange(event, type) { 
      const file = event.target.files[0];
      if (type === 'assignment') {
        this.newAssignmentFile = file;
      } else if (type === 'motivation') {
        this.newMotivationFile = file;
      }
    },
    async submitTeamEdit() {
      this.isLoading = true;
      try {
        const formData = new FormData();
        formData.append('challenge_id', this.team.challenge_id);
        formData.append('name_of_team', this.team.name);
        
        this.team.members.forEach((member, index) => {
          formData.append(`members[${index}][id]`, member.id);
          formData.append(`members[${index}][status]`, member.status);
        });

        // Ak používateľ vybral nový súbor, priloží sa do requestu
        if (this.newAssignmentFile) {
          formData.append('proposal_of_implementation', this.newAssignmentFile);
        }
        if (this.newMotivationFile) {
          formData.append('cover_letter', this.newMotivationFile);
        }

        await axios.post(`http://localhost:8080/api/auth/team/${this.teamId}`, formData);
        
        alert("Zmeny v tíme boli úspešne uložené!");
        this.$router.push('/admin-dashboard/manage-teams');
      } catch (error) {
        console.error(error);
        alert("Nastala chyba pri ukladaní tímu.");
      } finally {
        this.isLoading = false;
      }
    },
    async confirmDelete() {
      if (confirm("Naozaj chcete natrvalo vymazať tento tím? Všetky väzby budú odstránené.")) {
        this.isLoading = true;
        try {
          await axios.delete(`http://localhost:8080/api/auth/team/${this.teamId}`);
          alert("Tím bol úspešne vymazaný.");
          this.$router.push('/admin-dashboard/manage-teams');
        } catch (error) {
          console.error(error);
          alert("Nastala chyba pri mazaní tímu.");
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
};
</script>