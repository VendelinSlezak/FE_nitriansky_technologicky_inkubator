<template>
  <div class="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
    
    <div class="max-w-4xl w-full mx-auto">
      
      <div class="text-center md:text-left">
        <h1 class="text-3xl font-bold mb-4 text-gray-900">Študentský dashboard</h1>

        <p class="text-gray-700 mb-10 mx-auto md:mx-0">
          Pridajte novú výzvu do programu A, vytvorte nový tím, alebo počkajte kým vás teamleader do tímu pozve.
        </p>
      </div>

      <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
        <router-link :to="{name: 'vytvorit-vyzvu'}">
          <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-sm active:scale-95">
            Vytvoriť výzvu
          </button>
        </router-link>
        <router-link :to="{name: 'vytvorit-tim'}">
          <button class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-sm active:scale-95">
            Vytvoriť tím
          </button>
        </router-link>
      </div>

      <h2 class="text-2xl font-bold mb-6 text-gray-900">Posledné ukončené projekty</h2>
      <div class="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <ul class="divide-y divide-gray-100">
          <li 
            v-for="project in posledneProjekty" 
            :key="project.id" 
            class="py-4 first:pt-0 last:pb-0 flex items-center justify-between group"
          >
            <div class="flex flex-col">
              <span class="font-medium text-gray-900">{{ project.title }}</span>
              <span class="text-xs text-gray-500 italic">Dokončené: {{ project.date }}</span>
            </div>

            <router-link 
              :to="`/student-dashboard/project/${project.id}`"
              class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 transition-all"
            >
              <span class="hidden sm:inline">Zobraziť viac</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </li>
        </ul>

        <p v-if="posledneProjekty.length === 0" class="text-gray-500 py-4 text-center">
          Zatiaľ nemáte žiadne ukončené projekty.
        </p>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "StudentDashboardView",
  data() {
    return {
      posledneProjekty: [
        { id: 101, title: "Digitálna transformácia skladu", date: "12.02.2024" },
        { id: 102, title: "Marketingová stratégia NTI", date: "05.01.2024" },
        { id: 103, title: "Analýza trhu - Segment B", date: "20.12.2023" },
      ],
    };
  }
};
</script>