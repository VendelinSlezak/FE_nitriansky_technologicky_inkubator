<template>
  <div class="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
    <div class="max-w-4xl w-full mx-auto">
      
      <div class="text-center md:text-left mb-10">
        <h1 class="text-3xl font-bold mb-4 text-gray-900">Mentorský Dashboard</h1>
        <p class="text-gray-700 mx-auto md:mx-0">
          Prehľad projektov, ktoré aktuálne mentorujete. Sledujte progres tímov a poskytujte spätnú väzbu k míľnikom.
        </p>
      </div>

      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          Rozpracované projekty
        </h2>

        <div class="grid gap-4">
          <div 
            v-for="project in rozpracovaneProjekty" 
            :key="project.id"
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-3 mb-1">
                <span 
                  class="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border"
                  :class="{
                    'bg-blue-50 text-blue-600 border-blue-100': project.program === 'Program A',
                    'bg-emerald-50 text-emerald-600 border-emerald-100': project.program === 'Program B'
                  }"
                >
                  {{ project.program }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 leading-tight mb-2 mt-2">
                {{ project.title }}
              </h3>
              <p class="text-sm text-gray-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Tím: <span class="font-semibold">{{ project.teamName }}</span>
              </p>
            </div>

            <div class="flex items-center pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
              <router-link 
                :to="`/mentor-dashboard/project/${project.id}`"
                class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all group active:scale-95"
              >
                OTVORIŤ DETAIL
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="rozpracovaneProjekty.length === 0" class="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
          <p class="text-gray-500 font-medium italic">Momentálne nevediete žiadne rozpracované projekty.</p>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "MentorDashboardView",
  data() {
    return {
      rozpracovaneProjekty: [
        { 
          id: 501, 
          title: "Vývoj mobilnej aplikácie pre seniorov", 
          teamName: "SilverTech", 
          program: "Program A", 
          lastActivity: "pred 2 hodinami" 
        },
        { 
          id: 502, 
          title: "Analýza dopadu obnoviteľných zdrojov", 
          teamName: "EcoLogic", 
          program: "Program B", 
          lastActivity: "včera" 
        },
        { 
          id: 503, 
          title: "UI/UX Redizajn AiS2 portálu", 
          teamName: "Designers Hub", 
          program: "Program A", 
          lastActivity: "pred 3 dňami" 
        },
      ],
    };
  }
};
</script>