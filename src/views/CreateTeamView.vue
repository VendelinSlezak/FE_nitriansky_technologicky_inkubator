<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto"
    style="margin-top: 4%; margin-bottom: 4%;">
    <h2 class="text-2xl font-semibold mb-6">Vytvoriť tím</h2>
    <form @submit.prevent="submitTeam" class="space-y-4">
      
      <!-- Výber programu -->
      <div>
        <label class="block font-medium mb-1">Vyber program</label>
        <select
          v-model="team.program"
          class="w-full border border-gray-300 rounded p-2"
          required
        >
          <option value="" disabled>Vyber program</option>
          <option v-for="program in programs" :key="program" :value="program">
            {{ program }}
          </option>
        </select>
      </div>

      <!-- Názov výzvy: vyber zo zoznamu -->
      <div>
        <label class="block font-medium mb-2">Vyber výzvu</label>
        <ul class="space-y-2">
          <li
            v-for="challenge in challenges"
            :key="challenge.id"
            class="flex justify-between items-center border border-gray-200 rounded p-2"
          >
            <div>
              <h3 class="font-semibold">{{ challenge.title }}</h3>
              <p class="text-gray-600 text-sm">{{ challenge.category }}</p>
            </div>
            <button
              type="button"
              @click="selectChallenge(challenge)"
              :class="team.challengeTitle === challenge.title ? 'bg-blue-600' : 'bg-blue-500'"
              class="text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Vybrať
            </button>
          </li>
        </ul>
        <p v-if="team.challengeTitle" class="text-green-600 mt-2">
          Vybraná výzva: {{ team.challengeTitle }}
        </p>
      </div>

      <!-- Názov tímu -->
      <div>
        <label class="block font-medium mb-1">Názov tímu</label>
        <input
          type="text"
          v-model="team.name"
          placeholder="Zadaj názov tímu"
          class="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <!-- Submit tlačidlo -->
      <div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Vytvoriť tím
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateTeamSection",
  data() {
    return {
      programs: ["Informatika", "Ekonomika", "Design", "Strojárstvo"], // možné programy
      challenges: [
        { id: 1, title: "Výzva A", category: "Programovanie" },
        { id: 2, title: "Výzva B", category: "Design" },
        { id: 3, title: "Výzva C", category: "Marketing" },
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
        alert("Prosím, vyberte výzvu pre tím!");
        return;
      }
      alert(
        `Tím "${this.team.name}" pre program "${this.team.program}" s výzvou "${this.team.challengeTitle}" bol vytvorený!`
      );
      // Reset po odoslaní
      this.team = {
        program: "",
        challengeTitle: "",
        name: "",
      };
    },
  },
};
</script>

<style scoped>
</style>