<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-center mb-4">Moje Projekty</h1>

    <!-- Pridaný odstavec -->
    <p class="text-center text-gray-700 mb-10">
      Pridajte novú výzvu do programu A, vytvorte nový tím, alebo počkajte kým vás teamleader do tímu pozve.
    </p>

    <!-- Tlačidlá -->
    <div class="flex justify-center gap-6 mb-10">
      <router-link :to="{name: 'vytvorit-vyzvu'}">
        <button 
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        Vytvoriť výzvu
      </button>
      </router-link>
      <router-link :to="{name: 'vytvorit-tim'}">
        <button 
            class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Vytvoriť tím
        </button>
      </router-link>
    </div>

    <!-- Posledné ukončené projekty -->
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-semibold mb-4">Posledné ukončené projekty</h2>
      <ul class="divide-y divide-gray-200">
        <li v-for="(project, index) in posledneProjekty" :key="index" class="py-2">
          {{ project }}
        </li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "ProjektyDashboard",
  data() {
    return {
      posledneProjekty: ["Projekt A", "Projekt B", "Projekt C"],
    };
  }
};
</script>

<style scoped>

</style>