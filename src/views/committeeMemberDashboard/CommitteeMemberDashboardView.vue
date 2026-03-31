<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8">
    <div class="max-w-5xl mx-auto">
      
      <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Dashboard Člena Komisie</h1>
          <p class="text-slate-500 mt-2 text-lg">
            Prehľad projektov pridelených na odborné zhodnotenie.
          </p>
        </div>
      </header>

      <div class="grid grid-cols-1 gap-12">
        
        <section>
          <div class="flex items-center gap-3 mb-6">
            <div class="h-8 w-1.5 bg-blue-600 rounded-full"></div>
            <h2 class="text-xl font-bold text-slate-800">Projekty z Programu A</h2>
          </div>

          <div v-if="projektyA.length > 0" class="grid gap-4">
            <div 
              v-for="project in projektyA" 
              :key="project.id"
              class="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all group flex flex-col md:flex-row md:items-center justify-between shadow-sm"
            >
              <div class="space-y-2">
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {{ project.title }}
                </h3>
                <div class="flex items-center gap-4 text-sm text-slate-500">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Tím: <span class="text-slate-700 font-medium">{{ project.teamName }}</span>
                  </span>
                  <span class="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">ID: #{{ project.id }}</span>
                </div>
              </div>

              <div class="mt-4 md:mt-0">
                <router-link 
                  :to="`/committee-member-dashboard/project/${project.id}`"
                  class="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-600 active:scale-95 transition-all shadow-sm"
                >
                  Hodnotiť projekt
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </router-link>
              </div>
            </div>
          </div>

          <div v-else class="bg-slate-100/50 rounded-xl p-8 text-center border-2 border-dashed border-slate-200">
            <p class="text-slate-400 italic">Žiadne pridelené projekty v Programe A.</p>
          </div>
        </section>

        <section>
          <div class="flex items-center gap-3 mb-6">
            <div class="h-8 w-1.5 bg-emerald-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-slate-800">Projekty z Programu B</h2>
          </div>

          <div v-if="projektyB.length > 0" class="grid gap-4">
            <div 
              v-for="project in projektyB" 
              :key="project.id"
              class="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group flex flex-col md:flex-row md:items-center justify-between shadow-sm"
            >
              <div class="space-y-2">
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {{ project.title }}
                </h3>
                <div class="flex items-center gap-4 text-sm text-slate-500">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Tím: <span class="text-slate-700 font-medium">{{ project.teamName }}</span>
                  </span>
                  <span class="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">ID: #{{ project.id }}</span>
                </div>
              </div>

              <div class="mt-4 md:mt-0">
                <router-link 
                  :to="`/committee-member-dashboard/project/${project.id}`"
                  class="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-emerald-600 active:scale-95 transition-all shadow-sm"
                >
                  Hodnotiť projekt
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </router-link>
              </div>
            </div>
          </div>

          <div v-else class="bg-slate-100/50 rounded-xl p-8 text-center border-2 border-dashed border-slate-200">
            <p class="text-slate-400 italic">Žiadne pridelené projekty v Programe B.</p>
          </div>
        </section>

      </div>
    </div>
    <router-view class="mt-8"></router-view>
  </div>
</template>

<script>
export default {
  name: "CommitteeMemberDashboardView",
  data() {
    return {
      rozpracovaneProjekty: [
        { 
          id: 501, 
          title: "Vývoj mobilnej aplikácie pre seniorov", 
          teamName: "SilverTech", 
          program: "Program A", 
        },
        { 
          id: 502, 
          title: "Analýza dopadu obnoviteľných zdrojov", 
          teamName: "EcoLogic", 
          program: "Program B", 
        },
        { 
          id: 503, 
          title: "UI/UX Redizajn AiS2 portálu", 
          teamName: "Designers Hub", 
          program: "Program A", 
        },
      ],
    };
  },
  computed: {
    projektyA() {
      return this.rozpracovaneProjekty.filter(p => p.program === 'Program A');
    },
    projektyB() {
      return this.rozpracovaneProjekty.filter(p => p.program === 'Program B');
    }
  }
};
</script>