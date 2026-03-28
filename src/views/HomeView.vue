<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <section class="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white py-20 lg:py-32">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-5xl mx-auto">
          <h1 class="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
            Nitriansky technologický inkubátor
          </h1>

          <p class="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Podporujeme technologické talenty, inovácie a startupy v regióne Nitra. 
            Zmeňte svoj nápad na úspešný projekt s našou odbornou podporou.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link to="/registracia-studenta" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-blue-800 font-bold rounded-lg shadow-xl hover:bg-blue-50 transition-all duration-200 group active:scale-95">
              Registrovať sa ako študent
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </router-link>

            <router-link to="/registracia-firmy" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95">
              Registrovať firmu
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-black mb-4 text-slate-800 tracking-tight text-center">Naše programy</h2>
          <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Vyberte si cestu, ktorá najlepšie zodpovedá vašim cieľom.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div v-for="program in programs" :key="program.id"
               class="relative group rounded-3xl p-1 bg-gradient-to-br transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl"
               :class="program.gradient">
            <div class="bg-white rounded-[1.4rem] p-8 md:p-10 h-full flex flex-col relative z-10">
              <h3 class="text-2xl md:text-3xl font-black mb-4 text-slate-800">{{ program.title }}</h3>
              <p class="text-slate-500 mb-8 leading-relaxed">{{ program.description }}</p>

              <ul class="space-y-4 mb-10 flex-1">
                <li v-for="(b, i) in program.benefits" :key="i" class="flex items-center gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                  </div>
                  <span class="text-slate-700 font-medium">{{ b }}</span>
                </li>
              </ul>

              <router-link :to="program.path">
                <button :class="['w-full py-4 rounded-xl font-bold text-white transition-all shadow-md active:scale-95', program.btnClass]">
                  {{ program.cta }}
                </button>
              </router-link>
            </div>
          </div>
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
      programs: [
        {
          id: "a",
          title: "Grantový inkubačný program",
          description: "Grantový inkubačný program pre ambiciózne startupy. Získajte financovanie a mentoring.",
          benefits: ["Grantové financovanie", "Mentoring expertov", "Moderná infraštruktúra", "GTM stratégia"],
          cta: "Zistiť viac o Programe A",
          path: "/program-a",
          gradient: "from-blue-400 to-indigo-600",
          btnClass: "bg-blue-600 hover:bg-blue-700"
        },
        {
          id: "b",
          title: "Živá prax",
          description: "Živá prax na reálnych zadaniach firiem. Získajte skúsenosti a finančnú odmenu.",
          benefits: ["Reálne firemné projekty", "Finančná odmena", "Product Owner podpora", "Referencie do praxe"],
          cta: "Zistiť viac o Programe B",
          path: "/program-b",
          gradient: "from-emerald-400 to-teal-600",
          btnClass: "bg-emerald-600 hover:bg-emerald-700"
        },
      ],
      iconPaths: {
        target: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
        building: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>',
        graduation: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
        trending: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
        lightbulb: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
        users: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
      }
    };
  },
  methods: {
    getIcon(name) {
      return this.iconPaths[name] || '';
    }
  },
  mounted() {
    document.title = "Domov | Nitriansky technologický inkubátor";
  },
};
</script>