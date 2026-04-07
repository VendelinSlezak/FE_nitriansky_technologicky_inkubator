<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <section class="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-20 lg:py-28">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            Budujeme technologickú <br class="hidden md:block" /> budúcnosť regiónu
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 leading-relaxed font-light">
            NTI vznikol ako odpoveď na odliv talentov. Naším cieľom je vytvárať nové startupy 
            a profesionálne IT tímy s medzinárodným potenciálom.
          </p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-800 mb-4">Strategické piliere NTI</h2>
          <p class="text-slate-500">Základné kamene, na ktorých staviame náš informačný systém a procesy.</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div v-for="(pillar, i) in pillars" :key="i" 
               class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-all">
            <div class="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6" 
                 v-html="getIcon(pillar.icon)">
            </div>
            <h3 class="text-lg font-bold mb-3 text-slate-800">{{ pillar.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ pillar.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-50 border-y border-slate-100">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="flex flex-col lg:flex-row items-center gap-12">
            <div class="lg:w-1/2">
              <h2 class="text-3xl font-bold mb-6 text-slate-900">Inovačný ekosystém</h2>
              <p class="text-slate-600 mb-6 leading-relaxed">
                Náš ekosystém nie je len o priestoroch, ale o plnohodnotnej <b>procesnej platforme</b>. 
                Prepájame akademické prostredie s reálnou praxou cez dva kľúčové programy:
              </p>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <div class="mt-1.5 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                  <span class="text-slate-700"><strong>Program A:</strong> Inkubácia vlastných startupov a inovatívnych produktov.</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0"></div>
                  <span class="text-slate-700"><strong>Program B:</strong> Živá prax na reálnych zadaniach od firiem pod dohľadom mentorov.</span>
                </li>
              </ul>
            </div>
            <div class="lg:w-1/2 bg-blue-600 rounded-3xl p-8 text-white shadow-2xl">
              <h4 class="text-xl font-bold mb-4">Cieľové skupiny</h4>
              <p class="text-blue-100 text-sm mb-6">Naša platforma obsluhuje celý životný cyklus spolupráce.</p>
              <div class="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest">
                <div class="bg-blue-500/30 p-4 rounded-xl border border-blue-400/20 text-center">Študenti</div>
                <div class="bg-blue-500/30 p-4 rounded-xl border border-blue-400/20 text-center">Firmy</div>
                <div class="bg-blue-500/30 p-4 rounded-xl border border-blue-400/20 text-center">Mentori</div>
                <div class="bg-blue-500/30 p-4 rounded-xl border border-blue-400/20 text-center">Komisia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 class="text-3xl font-bold mb-8 text-slate-900">Akademické zázemie</h2>
              <div class="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                <p class="text-slate-600 leading-relaxed mb-6">
                  NTI úzko spolupracuje s fakultou na overovaní <b>akademickej spôsobilosti</b> kandidátov. 
                  Využívame kvalifikačné stacky v oblastiach AI, IoT, herného vývoja a softvérového inžinierstva.
                </p>
                <div class="inline-flex items-center gap-2 text-blue-600 font-bold">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.382 0z"/></svg>
                  <span>Prepojenie s univerzitným výskumom</span>
                </div>
              </div>
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
      pillars: [
        { title: 'Inkubácia', icon: 'lightbulb', description: 'Podpora vzniku startupov, akcelerácia nápadov a evidencia míľnikov k úspechu.' },
        { title: 'Partnerstvá', icon: 'building', description: 'Modul pre firmy a partnerov, správa spoločných výziev a technologických zadaní.' },
        { title: 'Mentoring', icon: 'users', description: 'Priraďovanie mentorov, plánovanie konzultácií a sledovanie odborného progresu.' },
        { title: 'Retencia', icon: 'target', description: 'Budovanie komunity absolventov a udržanie talentov v našom regióne.' }
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
  }
};
</script>