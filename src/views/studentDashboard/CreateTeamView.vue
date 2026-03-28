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
        <h1 class="text-3xl font-bold mb-2 text-gray-900">Vytvoriť nový tím</h1>
        <p class="text-gray-700 mx-auto md:mx-0">
          Zostavte tím pre jednu z existujúcich výziev. Ako zakladateľ tímu sa automaticky stanete jeho vedúcim.
        </p>
      </div>

      <div class="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <form @submit.prevent="submitTeam" class="space-y-8">
          
          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Názov vášho tímu</label>
            <input
              type="text"
              v-model="team.name"
              placeholder="Napr. Innovation Squad"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Príslušnosť k programu</label>
            <select
              v-model="team.program"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white"
              required
            >
              <option value="" disabled>Vyberte študijný program</option>
              <option v-for="program in programs" :key="program" :value="program">
                {{ program }}
              </option>
            </select>
          </div>

          <div class="space-y-3">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Vyberte výzvu, na ktorej chcete pracovať</label>
            <div class="grid gap-3">
              <div
                v-for="challenge in challenges"
                :key="challenge.id"
                @click="selectChallenge(challenge)"
                :class="[
                  'p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center group',
                  team.challengeTitle === challenge.title 
                    ? 'border-green-500 bg-green-50 shadow-md shadow-green-100' 
                    : 'border-gray-100 bg-gray-50 hover:border-gray-300'
                ]"
              >
                <div class="flex items-center gap-4">
                  <div :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                    team.challengeTitle === challenge.title ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'
                  ]">
                    <svg v-if="team.challengeTitle === challenge.title" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">{{ challenge.title }}</h3>
                    <p class="text-xs text-gray-500 uppercase font-semibold tracking-widest">{{ challenge.category }}</p>
                  </div>
                </div>
                <span class="text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                  {{ team.challengeTitle === challenge.title ? 'VYBRANÉ' : 'ZVOLIŤ' }}
                </span>
              </div>
            </div>
            <p v-if="!team.challengeTitle" class="text-xs text-amber-600 font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              Musíte si vybrať jednu výzvu zo zoznamu.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              class="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-black shadow-lg shadow-green-100 active:scale-95 flex-grow sm:flex-grow-0"
            >
              VYTVORIŤ TÍM A ZAČAŤ
            </button>
            <router-link to="/student-dashboard" class="flex-grow sm:flex-grow-0">
              <button 
                type="button"
                class="w-full bg-gray-100 text-gray-600 px-8 py-4 rounded-lg hover:bg-gray-200 transition font-bold active:scale-95"
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
  name: "CreateTeamView",
  data() {
    return {
      programs: ["Informatika", "Ekonomika", "Design", "Strojárstvo"],
      challenges: [
        { id: 1, title: "Výzva A: Smart City riešenia", category: "Programovanie" },
        { id: 2, title: "Výzva B: Redizajn firemnej identity", category: "Design" },
        { id: 3, title: "Výzva C: Penetrácia na EU trhy", category: "Marketing" },
      ],
      team: {
        program: "",
        challengeTitle: "",
        name: "",
      },
    };
  },
  methods: {
    selectChallenge(challenge) {
      this.team.challengeTitle = challenge.title;
    },
    submitTeam() {
      if (!this.team.challengeTitle) {
        return; // Validácia v UI už existuje
      }
      console.log("Tím vytvorený:", this.team);
      alert(`Tím "${this.team.name}" bol úspešne zaregistrovaný k výzve ${this.team.challengeTitle}.`);
      this.$router.push('/student-dashboard');
    },
  },
};
</script>