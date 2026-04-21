<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 pt-24 pb-20">
    <div class="container mx-auto px-4">
      
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-6 text-slate-800 tracking-tight">
          Aktuálne výzvy
        </h1>
        <p class="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          Prehliadajte si voľné zadania v našich programoch. Či už hľadáte technologický mentoring pre svoj startup alebo platenú prax na reálnom zadaní.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <button 
          @click="activeFilter = 'all'"
          :class="[filterBtnClass, activeFilter === 'all' ? activeClass : inactiveClass]"
        >
          Všetky výzvy
        </button>
        <button 
          @click="activeFilter = 'A'"
          :class="[filterBtnClass, activeFilter === 'A' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : inactiveClass]"
        >
          Program A
        </button>
        <button 
          @click="activeFilter = 'B'"
          :class="[filterBtnClass, activeFilter === 'B' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : inactiveClass]"
        >
          Program B
        </button>
      </div>

      <div v-if="filteredChallenges.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="challenge in filteredChallenges" :key="challenge.id">
          <ChallengeComponent :challenge="challenge" />
        </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
        <p class="text-slate-400 text-lg italic">Momentálne nie sú v tejto kategórii žiadne otvorené výzvy.</p>
      </div>

    </div>
  </div>
</template>

<script>
import ChallengeComponent from '@/components/ChallengeComponent.vue';

export default {
  name: "ChallengesView",
  components: {
    ChallengeComponent
  },
  data() {
    return {
      activeFilter: 'all',
      filterBtnClass: 'px-6 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 border-2',
      activeClass: 'bg-slate-900 text-white border-slate-900 shadow-xl',
      inactiveClass: 'bg-white text-slate-600 border-slate-200 hover:border-slate-400',
      challenges: [
        {
          id: 1,
          program: 'A',
          title: 'AI v mestskej mobilite',
          description: 'Hľadáme inovatívne projekty využívajúce strojové učenie na optimalizáciu dopravy v Nitrianskom kraji.',
          category: 'AI a dátové technológie',
          path: '/challenges/ai-mobility'
        },
        {
          id: 2,
          program: 'B',
          title: 'E-commerce analytika pre eBay',
          description: 'Vývoj dashboardov pre vizualizáciu trendov v predaji použitých bicyklov na platforme eBay.',
          reward: 1200,
          path: '/challenges/ebay-analytics'
        },
        {
          id: 3,
          program: 'B',
          title: 'Senzorická sieť pre Smart City',
          description: 'Implementácia IoT riešenia pre monitorovanie kvality ovzdušia v priemyselnej zóne pod Zoborom.',
          reward: 950,
          path: '/challenges/iot-nitra'
        },
        {
          id: 4,
          program: 'A',
          title: 'Zelená energia pre domy',
          description: 'Platforma na zdieľanie prebytočnej energie z fotovoltických panelov v rámci komunity.',
          category: 'GreenTech',
          path: '/challenges/green-energy'
        },
        {
          id: 5,
          program: 'B',
          title: 'AR navigácia v budovách',
          description: 'Vývoj prototypu rozšírenej reality pre navigáciu návštevníkov v komplexných administratívnych budovách.',
          reward: 1500,
          path: '/challenges/ar-navigation'
        }
      ]
    };
  },
  computed: {
    filteredChallenges() {
      if (this.activeFilter === 'all') {
        return this.challenges;
      }
      return this.challenges.filter(c => c.program === this.activeFilter);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    document.title = "Aktuálne výzvy | Nitriansky technologický inkubátor";
  }
};
</script>

<style scoped>
/* Voliteľné animácie pre prechod medzi filtrami */
.grid {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>