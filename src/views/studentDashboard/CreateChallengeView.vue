<template>
  <div class="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
    <div class="max-w-4xl w-full mx-auto">
      
      <div class="text-center md:text-left mb-10">
        <router-link to="/student-dashboard" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-4 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Späť na dashboard
        </router-link>
        <h1 class="text-3xl font-bold mb-2 text-gray-900">Vytvoriť novú výzvu</h1>
        <p class="text-gray-700 mx-auto md:mx-0">
          Navrhnite vlastnú tému pre Program A. Po schválení administrátorom sa vaša výzva zobrazí v zozname dostupných projektov.
        </p>
      </div>

      <div class="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <form @submit.prevent="submitChallenge" class="space-y-6">

          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Názov výzvy</label>
            <input
              type="text"
              v-model="challenge.title"
              placeholder="Napr. Optimalizácia logistických procesov"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Kategória</label>
            <select
              v-model="challenge.category"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              required
            >
              <option value="" disabled>Vyberte kategóriu</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Podrobný popis</label>
            <textarea
              v-model="challenge.description"
              placeholder="Popíšte cieľ výzvy, očakávané výsledky a potrebné technológie..."
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              rows="5"
              required
            ></textarea>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-colors hover:border-blue-200">
            <div class="flex items-start space-x-3">
              <input
                type="checkbox"
                id="autoTeam"
                v-model="challenge.autoCreateTeam"
                class="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded cursor-pointer"
              />
              <label for="autoTeam" class="text-sm text-gray-700 leading-tight cursor-pointer">
                <span class="font-bold text-gray-900 block mb-1 text-base">Automaticky vytvoriť tím</span>
                Chcem sa automaticky stať teamleadrom tohto projektu, ak bude výzva schválená administrátorom.
              </label>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-black shadow-md shadow-blue-100 active:scale-95 flex-grow sm:flex-grow-0"
            >
              ODOSLAŤ VÝZVU NA SCHVÁLENIE
            </button>
            <router-link to="/student-dashboard" class="flex-grow sm:flex-grow-0">
              <button 
                type="button"
                class="w-full bg-gray-100 text-gray-600 px-8 py-3 rounded-lg hover:bg-gray-200 transition font-bold active:scale-95"
              >
                Zrušiť
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateChallengeView",
  data() {
    return {
      categories: ["Vývoj softvéru", "AI a dátové technológie", "Webové aplikácie", "Herný vývoj", "IoT a embedded systémy"],
      challenge: {
        title: "",
        description: "",
        category: "",
        autoCreateTeam: false,
      },
    };
  },
  methods: {
    submitChallenge() {
      // Tu pridaj logiku pre odoslanie do Pinia store alebo API
      console.log("Odosielam výzvu:", this.challenge);
      
      alert(`Výzva "${this.challenge.title}" bola úspešne odoslaná na schválenie.`);
      
      // Presmerovanie späť po úspešnom odoslaní
      this.$router.push('/student-dashboard');
    },
  },
};
</script>