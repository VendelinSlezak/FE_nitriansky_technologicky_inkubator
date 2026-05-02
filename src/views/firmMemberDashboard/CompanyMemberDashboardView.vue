<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 pt-12">
    <main class="max-w-4xl mx-auto px-6 space-y-12">
      
      <section class="space-y-6">
        <div class="flex items-center gap-4">
          <h2 class="text-2xl font-black text-slate-900">Pridelené projekty</h2>
          <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">
            {{ activeProjects.length }}
          </span>
        </div>

        <div class="space-y-4">
          <div 
            v-for="project in activeProjects" 
            :key="project.id" 
            @click="toggleProject(project.id)"
            class="bg-white rounded-[2rem] border border-slate-200 shadow-sm cursor-pointer hover:border-blue-400 transition-all overflow-hidden"
          >
            <div class="p-6 flex justify-between items-center bg-white">
              <div class="flex items-center gap-5">
                <div class="w-1.5 h-12 bg-blue-600 rounded-full"></div>
                <div>
                  <h4 class="font-black text-slate-800 text-lg leading-tight">{{ project.title }}</h4>
                </div>
              </div>
              <div class="flex items-center gap-6">
                <div class="text-right hidden sm:block">
                  <p class="text-[10px] text-slate-400 uppercase font-black mb-1">Odmena</p>
                  <p class="text-lg font-black text-blue-600">{{ project.reward }} €</p>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-6 w-6 text-slate-300 transition-transform duration-300" 
                  :class="{ 'rotate-180 text-blue-600': expandedProjects.includes(project.id) }" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <transition name="expand">
              <div v-if="expandedProjects.includes(project.id)" class="px-8 pb-8 pt-2 space-y-8">
                <hr class="border-slate-100" />

                <div class="space-y-2">
                  <h5 class="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-2">
                    <span class="w-1 h-1 bg-slate-400 rounded-full"></span> Detailné zadanie
                  </h5>
                  <p class="text-slate-600 text-sm leading-relaxed max-w-2xl">
                    {{ project.description }}
                  </p>
                </div>

                <div class="space-y-4">
                  <h5 class="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-2">
                    <span class="w-1 h-1 bg-slate-400 rounded-full"></span> Realizačný tím ({{ project.teamName }})
                  </h5>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div 
                      v-for="member in project.teamMembers" 
                      :key="member.email" 
                      class="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100"
                    >
                      <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-blue-600 shadow-sm">
                        {{ member.name.charAt(0) }}
                      </div>
                      <div class="overflow-hidden">
                        <p class="text-sm font-black text-slate-700 truncate">{{ member.name }}</p>
                        <p class="text-xs text-slate-400 truncate">{{ member.email }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="space-y-4" @click.stop> <h5 class="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-2">
                    <span class="w-1 h-1 bg-slate-400 rounded-full"></span> Dokumentácia a zdroje
                  </h5>
                  <div class="flex flex-wrap gap-4">
                    <a 
                      :href="project.documentUrl" 
                      download
                      class="flex items-center gap-3 bg-white border-2 border-blue-50 px-6 py-3 rounded-2xl group hover:border-blue-400 hover:bg-blue-50 transition-all"
                    >
                      <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-xs font-black text-slate-800">Projektová_dokumentácia.pdf</p>
                        <p class="text-[10px] text-slate-400">PDF, 2.4 MB</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="pt-4">
                  <button class="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black hover:bg-blue-600 transition-all shadow-lg shadow-slate-100">
                    Vstúpiť do pracovného priestoru
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script>
export default {
  name: "CompanyMemberDashboard",
  data() {
    return {
      expandedProjects: [],
      activeProjects: [
        { 
          id: 102, 
          title: "B2B Portál - Integrácia platieb", 
          teamName: "TechAlpha",
          description: "Hlavným cieľom tejto fázy je implementácia Stripe API a prepojenie na náš fakturačný systém. Je potrebné dbať na bezpečnosť.",
          reward: 4800,
          documentUrl: "/downloads/b2b-portal-spec.pdf", // Cesta k súboru
          teamMembers: [
            { name: "Michal Tall", email: "tall@techalpha.com" },
            { name: "Lucia Rýchla", email: "rychla@techalpha.com" }
          ]
        },
        { 
          id: 105, 
          title: "Mobilná Appka - Sklad", 
          teamName: "TechAlpha",
          description: "Vývoj modulu pre offline skenovanie QR kódov v prostredí s obmedzeným signálom.",
          reward: 3500,
          documentUrl: "/downloads/mobile-app-doc.zip", // Cesta k súboru
          teamMembers: [
            { name: "Michal Tall", email: "tall@techalpha.com" }
          ]
        }
      ]
    };
  },
  methods: {
    toggleProject(projectId) {
      const index = this.expandedProjects.indexOf(projectId);
      if (index > -1) {
        this.expandedProjects.splice(index, 1);
      } else {
        this.expandedProjects.push(projectId);
      }
    }
  }
};
</script>

<style scoped>
.expand-enter-active, .expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 1200px;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>