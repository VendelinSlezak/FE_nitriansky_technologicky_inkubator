<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white py-20 lg:py-32">
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-4 relative z-10 text-center">
        <span class="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
          O nás • Naša misia
        </span>

        <h1 class="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
          Nitriansky technologický <br class="hidden md:block" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">inkubátor</span>
        </h1>

        <p class="text-xl md:text-2xl mb-12 text-blue-100/80 max-w-3xl mx-auto leading-relaxed font-medium">
          Podporujeme rozvoj technologických talentov, inovácie a podnikateľské myslenie v regióne Nitra.
        </p>
      </div>
    </section>

    <section class="py-24 bg-white">
    <div class="container mx-auto px-4 text-center">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-black mb-8 text-slate-900 tracking-tight">
          Naša misia
        </h2>
        
        <div class="space-y-6">
          <p class="text-xl text-slate-600 leading-relaxed font-medium">
            Nitriansky technologický inkubátor vznikol ako odpoveď na potrebu systematickej
            podpory inovatívnych projektov v regióne. Naším cieľom je vytvárať startupy a 
            profesionálne IT tímy s medzinárodným potenciálom.
          </p>
          
          <p class="text-xl text-slate-600 leading-relaxed font-medium">
            Zameriavame sa na riešenie odlivu talentov a podporu podnikateľského myslenia. 
            Prepájame akademické prostredie s praxou a vytvárame ekosystém, v ktorom môžu 
            inovácie prosperovať a rásť priamo v našom regióne.
          </p>
        </div>

        <div class="mt-12 flex justify-center">
          <div class="w-12 h-1 bg-slate-100 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>

    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black mb-4 text-slate-900 tracking-tight text-center">Náš tím</h2>
          <p class="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Ľudia, ktorí stoja za úspechom našich programov.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div v-for="(member, index) in team" :key="index" class="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 group text-center">
            <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto mb-6 transform group-hover:rotate-6 transition-transform shadow-lg flex items-center justify-center text-white text-3xl font-bold">
              {{ member.name.charAt(0) }}
            </div>
            <h3 class="text-xl font-black text-slate-900 mb-1 tracking-tight">{{ member.name }}</h3>
            <div class="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">{{ member.role }}</div>
            <p class="text-slate-500 text-sm leading-relaxed">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20">
          <h2 class="text-3xl md:text-4xl font-black mb-16 text-center tracking-tight">Náš dopad v číslach</h2>
          <div class="grid md:grid-cols-3 gap-12 text-center">
            <div v-for="(stat, index) in impact" :key="index" class="group">
              <div class="text-5xl md:text-6xl font-black text-blue-400 mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-300">
                {{ stat.value }}
              </div>
              <div class="text-slate-400 font-bold uppercase tracking-widest text-sm">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {
      team: [
        { name: "Prof. Ing. Martin Novák, PhD.", role: "Riaditeľ NTI", description: "Skúsený akademik a odborník na technologické inovácie." },
        { name: "Ing. Jana Kováčová", role: "Koordinátorka programov", description: "Zodpovedná za hladkú realizáciu programov A a B." },
        { name: "Mgr. Peter Horváth", role: "Manažér partnerstiev", description: "Buduje strategické vzťahy s IT firmami v regióne." },
      ],
      impact: [
        { value: "150+", label: "Absolventov programov" },
        { value: "45+", label: "Úspešných projektov" },
        { value: "30+", label: "Partnerských firiem" },
      ],
      iconPaths: {
        lightbulb: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
        building: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>',
        users: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        target: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
      }
    };
  },
  methods: {
    getIcon(name) {
      return this.iconPaths[name] || '';
    }
  },
  mounted() {
    document.title = "O nás | Nitriansky technologický inkubátor";
  },
};
</script>