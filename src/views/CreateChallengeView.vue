<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-6" style="margin-top: 4%; margin-bottom: 4%;">
    <h2 class="text-2xl font-semibold mb-6">Vytvoriť výzvu do programu A</h2>
    <form @submit.prevent="submitChallenge" class="space-y-4">

      <!-- Názov výzvy -->
      <div>
        <label class="block font-medium mb-1">Názov</label>
        <input
          type="text"
          v-model="challenge.title"
          placeholder="Zadaj názov výzvy"
          class="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <!-- Popis výzvy -->
      <div>
        <label class="block font-medium mb-1">Popis</label>
        <textarea
          v-model="challenge.description"
          placeholder="Popíš výzvu"
          class="w-full border border-gray-300 rounded p-2"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Kategória -->
      <div>
        <label class="block font-medium mb-1">Kategória</label>
        <select
          v-model="challenge.category"
          class="w-full border border-gray-300 rounded p-2"
          required
        >
          <option value="" disabled>Vyber kategóriu</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <!-- Checkbox pre automatické vytvorenie tímu -->
      <div class="flex items-center space-x-2">
        <input
          type="checkbox"
          id="autoTeam"
          v-model="challenge.autoCreateTeam"
          class="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label for="autoTeam" class="text-gray-700">
          Automaticky vytvoriť tím a stať sa teamleadrom, ak bude výzva schválená
        </label>
      </div>

      <!-- Submit tlačidlo -->
      <div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Vytvoriť výzvu
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateChallengeView",
  data() {
    return {
      categories: ["Design", "Programovanie", "Ekonomika", "Marketing"],
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
      // Tu môžeš spraviť API volanie na uloženie výzvy
      alert(
        `Výzva "${this.challenge.title}" (${this.challenge.category}) bola vytvorená.\nAutomatické vytvorenie tímu: ${this.challenge.autoCreateTeam ? 'Áno' : 'Nie'}`
      );

      // Reset po odoslaní
      this.challenge = {
        title: "",
        description: "",
        category: "",
        autoCreateTeam: false,
      };
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS sa používa priamo cez utility classes */
</style>