<template>
  <div class="min-h-screen">
    <!-- HERO -->
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <span class="inline-block mb-4 px-3 py-1 bg-blue-500 rounded-full text-sm">
          Innovation • Mentoring • Partnership
        </span>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Nitriansky technologický inkubátor
        </h1>

        <p class="text-xl md:text-2xl mb-8 text-blue-100">
          Podporujeme technologické talenty, inovácie a startups v regióne.
          Zmeňte svoj nápad na úspešný projekt s našou podporou.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/registracia">
            <button class="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2">
              Registrovať sa ako študent →
            </button>
          </router-link>

          <router-link to="/registracia">
            <button class="border border-white px-6 py-3 rounded-lg hover:bg-white/10">
              Registrovať firmu
            </button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="py-12 bg-white border-b">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, i) in stats" :key="i" class="text-center">
            <component :is="stat.icon" class="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div class="text-3xl font-bold mb-1">{{ stat.value }}</div>
            <div class="text-sm text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- PILIERE -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Naše piliere</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Štyri strategické oblasti, ktoré tvoria základ našej práce
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(pillar, i) in pillars"
            :key="i"
            class="border-2 rounded-xl p-6 hover:shadow-lg transition"
          >
            <div :class="['w-12 h-12 rounded-lg flex items-center justify-center mb-3', pillar.color]">
              <component :is="pillar.icon" class="h-6 w-6" />
            </div>

            <h3 class="font-semibold text-lg mb-2">{{ pillar.title }}</h3>
            <p class="text-gray-600">{{ pillar.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PROGRAMY -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Naše programy</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Vyberte si program, ktorý najlepšie zodpovedá vašim potrebám
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            v-for="program in programs"
            :key="program.id"
            :class="['border-2 rounded-xl p-6 hover:shadow-xl transition', program.color]"
          >
            <h3 class="text-2xl font-bold mb-2">{{ program.title }}</h3>
            <p class="text-gray-600 mb-4">{{ program.description }}</p>

            <ul class="space-y-3 mb-6">
              <li v-for="(b, i) in program.benefits" :key="i" class="flex items-start">
                <span class="text-green-600 mr-2">✔</span>
                <span>{{ b }}</span>
              </li>
            </ul>

            <router-link :to="program.path">
              <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                {{ program.cta }} →
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-3xl mx-auto text-center px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Pripravení začať svoju cestu?
        </h2>

        <p class="text-xl mb-8 text-blue-100">
          Pridajte sa k stovkám úspešných študentov a firiem.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/registracia">
            <button class="bg-white text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50">
              Začať teraz →
            </button>
          </router-link>

          <router-link to="/kontakt">
            <button class="border border-white px-6 py-3 rounded-lg hover:bg-white/10">
              Kontaktovať nás
            </button>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      stats: [
        { label: "Aktívnych projektov", value: "45+", icon: "Target" },
        { label: "Partnerských firiem", value: "30+", icon: "Building2" },
        { label: "Študentov v programoch", value: "200+", icon: "GraduationCap" },
        { label: "Úspešných absolventov", value: "150+", icon: "TrendingUp" },
      ],

      pillars: [
        {
          title: "Inkubácia",
          description: "Podporujeme vznik a akceleráciu startupov",
          icon: "Lightbulb",
          color: "bg-blue-100 text-blue-700",
        },
        {
          title: "Partnerstvá",
          description: "Prepájame študentov s firmami",
          icon: "Building2",
          color: "bg-green-100 text-green-700",
        },
        {
          title: "Mentoring",
          description: "Skúsení mentori pomáhajú tímom",
          icon: "Users",
          color: "bg-purple-100 text-purple-700",
        },
        {
          title: "Retencia",
          description: "Budujeme komunitu talentov",
          icon: "Target",
          color: "bg-orange-100 text-orange-700",
        },
      ],

      programs: [
        {
          id: "a",
          title: "Program A - Grantový inkubačný program",
          description: "Získajte financovanie a mentoring pre váš startup.",
          benefits: [
            "Grantové financovanie",
            "Mentoring",
            "Infraštruktúra",
            "Podpora až do trhu",
          ],
          cta: "Zistiť viac o Programe A",
          path: "/program-a",
          color: "border-blue-200 bg-blue-50",
        },
        {
          id: "b",
          title: "Program B - Živá prax",
          description: "Pracujte na reálnych projektoch.",
          benefits: [
            "Reálne projekty",
            "Finančná odmena",
            "Product Owner",
            "Skúsenosti",
          ],
          cta: "Zistiť viac o Programe B",
          path: "/program-b",
          color: "border-green-200 bg-green-50",
        },
      ],
    };
  },

  mounted() {
    document.title = "Domov | Inkubátor";
  },
};
</script>