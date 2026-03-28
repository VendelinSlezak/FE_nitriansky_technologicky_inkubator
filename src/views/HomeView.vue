<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white py-20 lg:py-32">
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-4 relative z-10 text-center">
        <span class="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
          Innovation • Mentoring • Partnership
        </span>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Nitriansky technologický <span class="text-blue-300">inkubátor</span>
        </h1>

        <p class="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Podporujeme technologické talenty, inovácie a startupy v regióne.
          Zmeňte svoj nápad na úspešný projekt s našou podporou.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/registracia" class="w-full sm:w-auto">
            <button class="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 group">
              Registrovať sa ako študent
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </router-link>

          <router-link to="/registracia" class="w-full sm:w-auto">
            <button class="w-full sm:w-auto border-2 border-white/30 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all text-white">
              Registrovať firmu
            </button>
          </router-link>
        </div>
      </div>
    </section>

    <section class="py-12 bg-white relative z-20 -mt-10">
      <div class="max-w-6xl mx-auto px-4">
        <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, i) in stats" :key="i" class="text-center group">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" v-html="getIcon(stat.icon)"></div>
            <div class="text-3xl md:text-4xl font-black text-slate-800 mb-1">{{ stat.value }}</div>
            <div class="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-black mb-4 text-slate-800 tracking-tight">Naše piliere</h2>
          <div class="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Štyri strategické oblasti, ktoré tvoria základ našej práce a vašej budúcnosti.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div v-for="(pillar, i) in pillars" :key="i" 
               class="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div :class="['w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-inner', pillar.color]" v-html="getIcon(pillar.icon)"></div>
            <h3 class="font-bold text-xl mb-3 text-slate-800">{{ pillar.title }}</h3>
            <p class="text-slate-500 leading-relaxed text-sm">{{ pillar.description }}</p>
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
      stats: [
        { label: "Aktívnych projektov", value: "45+", icon: "target" },
        { label: "Partnerských firiem", value: "30+", icon: "building" },
        { label: "Študentov v programoch", value: "200+", icon: "graduation" },
        { label: "Úspešných absolventov", value: "150+", icon: "trending" },
      ],
      pillars: [
        { title: "Inkubácia", description: "Podporujeme vznik a akceleráciu perspektívnych startupov.", icon: "lightbulb", color: "bg-blue-100 text-blue-700" },
        { title: "Partnerstvá", description: "Prepájame talentovaných študentov priamo s IT sférou.", icon: "building", color: "bg-green-100 text-green-700" },
        { title: "Mentoring", description: "Skúsení odborníci z praxe pomáhajú vašim projektom.", icon: "users", color: "bg-purple-100 text-purple-700" },
        { title: "Retencia", description: "Budujeme silnú a udržateľnú komunitu lokálnych talentov.", icon: "target", color: "bg-orange-100 text-orange-700" },
      ],
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