<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center">
    <div class="max-w-5xl w-full mx-auto space-y-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <router-link to="/mentor-dashboard" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-2 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Späť na prehľad
          </router-link>
          <h1 class="text-3xl font-black text-gray-900 mt-5 mb-5">{{ project.name_of_challenge }}</h1>
          <p class="text-gray-500 font-medium tracking-wide uppercase text-xs mt-1">
            ID Projektu: #{{ project.id }} • Tím: {{ project.name_of_team }}
          </p>
        </div>
        <div class="flex gap-2">
          <span :class="['px-3 py-1 rounded-full text-xs font-bold uppercase border', getProgramClass(project.program)]">
            Program {{ project.program }}
          </span>
        </div>
      </div>

      <section class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <button @click="ui.infoExpanded = !ui.infoExpanded" class="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
            <div class="w-10 h-10 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Podrobné informácie o projekte</h2>
            </div>
            <svg :class="{'rotate-180': ui.infoExpanded}" class="w-6 h-6 transform transition-transform text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        
        <div v-if="ui.infoExpanded" class="p-6 md:p-8 border-t border-gray-100 bg-gray-50/30 space-y-8">
            
            <div class="space-y-3">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Zadanie projektu
            </h3>
            <p class="text-gray-700 leading-relaxed text-lg">{{ project.challenge_description }}</p>
            </div>

            <div class="pt-6 border-t border-gray-100 space-y-4">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest">Prílohy a dokumentácia</h3>
            <div class="flex flex-col gap-2">
                <a :href="project.implementation_file.url" class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all group shadow-sm">
                <span class="font-bold text-sm">{{ project.implementation_file.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                </a>
                <a :href="project.proposal_file.url" class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all group shadow-sm">
                <span class="font-bold text-sm">{{ project.proposal_file.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                </a>
            </div>
            </div>

            <div class="pt-6 border-t border-gray-100 space-y-4">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest">Členovia tímu</h3>
            <div class="space-y-3">
                <div v-for="member in project.team_members" :key="member.id" class="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {{ member.initials }}
                    </div>
                    <div>
                    <div class="text-sm font-bold text-gray-900">{{ member.name }}</div>
                    <div class="text-[10px] text-gray-500 uppercase font-medium tracking-tight">{{ member.email }}</div>
                    </div>
                </div>
                <span 
                    :class="member.status === 'teamleader' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-gray-50 text-gray-500 border-gray-200'" 
                    class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border"
                >
                    {{ member.status }}
                </span>
                </div>
            </div>
            </div>

        </div>
      </section>

      <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 class="text-2xl font-black text-gray-900 mb-8">Míľniky projektu</h2>
        
        <div class="space-y-10 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-100">
            <div v-for="(milestone, index) in project.milestones" :key="milestone.id" class="relative pl-12">
            
            <div :class="['absolute left-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-sm z-10 transition-colors', milestone.is_finished ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500']">
                <svg v-if="milestone.is_finished" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                <span v-else class="text-xs font-black">{{ index + 1 }}</span>
            </div>

            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div class="flex justify-between items-start mb-3">
                <h4 class="text-lg font-bold text-gray-900">{{ milestone.title }}</h4>
                <span class="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">
                    Termín: {{ milestone.date_of_reasisation }}
                </span>
                </div>
                
                <p class="text-gray-600 text-sm leading-relaxed mb-6">{{ milestone.description }}</p>

                <div class="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-inner">
                <div class="flex items-center gap-2 mb-2">
                    <span class="flex h-2 w-2 rounded-full bg-green-500"></span>
                    <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aktuálne zverejnený komentár pre tím</span>
                </div>
                <p v-if="milestone.comment" class="text-sm text-gray-700 italic">
                    "{{ milestone.comment }}"
                </p>
                <p v-else class="text-sm text-gray-400 italic">
                    Zatiaľ nebol zverejnený žiadny komentár.
                </p>
                </div>

                <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <label class="text-[10px] font-black text-blue-600 uppercase tracking-widest">Váš komentár</label>
                    <span v-if="isChanged(index)" class="text-[9px] font-bold text-amber-500 animate-pulse uppercase">Máte neuložené zmeny</span>
                </div>
                
                <textarea 
                    v-model="ui.milestoneDrafts[index]" 
                    rows="3" 
                    class="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm placeholder:text-gray-300" 
                    placeholder="Tu napíšte novú spätnú väzbu pre tím..."
                ></textarea>
                
                <div class="flex justify-end">
                    <button 
                    @click="saveMilestoneComment(index)" 
                    :disabled="!isChanged(index)"
                    :class="[
                        'px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 shadow-md active:scale-95',
                        isChanged(index) 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    ]"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                    PUBLIKOVAŤ KOMENTÁR TÍMU
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "MentorProjectView",
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      ui: { 
        infoExpanded: false, 
        newMessage: "",
        milestoneDrafts: [] 
      },
      newMeeting: { date: "", time: "", type: "online", location: "" },
      project: {},
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${this.backendApiUrl}/api/auth/challenge/${this.id}`);
        const data = response.data;
        if (data && data.team_members) {
          data.team_members = data.team_members.map(member => ({
            ...member,
            initials: member.initials || this.generateInitials(member.name)
          }));
        }
        this.project = response.data;
        console.log(response.data);
        this.ui.milestoneDrafts = this.project.milestones.map(milestone => milestone.comment);
      }
      catch (error) {
        console.error("Chyba pri načítaní dát", error);
      }
    },
    isChanged(index) {
      return this.ui.milestoneDrafts[index] !== this.project.milestones[index].comment;
    },
    async saveMilestoneComment(index) {
      try {
        await axios.post(`${this.backendApiUrl}/api/auth/challenge/${this.project.id}/set-milestone-comment/${this.project.milestones[index].id}`, {
          comment: this.ui.milestoneDrafts[index]
        });
        const updatedText = this.ui.milestoneDrafts[index];
        this.project.milestones[index].comment = updatedText;
      }
      catch (error) {
        alert("Chyba pri ukladaní.");
        console.error("Chyba pri ukladaní komentára", error);
      }
    },
    getProgramClass(program) {
      return program === 'A' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
    },
    generateInitials(name) {
      if (!name) return '?';
      return name
        .trim()
        .split(/\s+/)
        .map(n => n[0])
        .join('')
        .toUpperCase();
    },
  }
};
</script>