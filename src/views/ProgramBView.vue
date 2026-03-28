<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <section class="bg-gradient-to-br from-green-600 to-green-800 text-white py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <span class="inline-block px-3 py-1 rounded-full bg-green-500 text-xs font-bold uppercase tracking-wider mb-4">
            Program B
          </span>
          <h1 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Živá prax
          </h1>
          <p class="text-xl text-green-100 mb-8 leading-relaxed">
            Prepájame študentské tímy s reálnymi projektami od firiem. Študenti získavajú
            cenné praktické skúsenosti a odmenu, firmy realizujú svoje projekty s podporou
            NTI.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink to="/registracia-studenta" class="inline-flex items-center justify-center px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-md hover:bg-green-50 transition-colors duration-200">
              Registrovať sa ako študent
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </RouterLink>
            <RouterLink to="/registracia-firmy" class="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200">
              Registrovať firmu
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center text-slate-800">
          Výhody pre obe strany
        </h2>
        <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div class="bg-white p-8 rounded-2xl border-2 border-green-100 shadow-sm">
            <div class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 class="text-2xl font-bold mb-2">Pre študentov</h3>
            <p class="text-slate-500 mb-6 font-medium">Získajte praktické skúsenosti a vybudujte si portfólio</p>
            <ul class="space-y-4">
              <li v-for="(benefit, index) in benefits.students" :key="'st-' + index" class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span class="text-slate-700">{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-sm">
            <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>
            </div>
            <h3 class="text-2xl font-bold mb-2">Pre firmy</h3>
            <p class="text-slate-500 mb-6 font-medium">Realizujte projekty a získajte prístup k talentom</p>
            <ul class="space-y-4">
              <li v-for="(benefit, index) in benefits.companies" :key="'co-' + index" class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span class="text-slate-700">{{ benefit }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-slate-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Ako to funguje</h2>
        <div class="max-w-4xl mx-auto space-y-4">
          <div v-for="(step, index) in processSteps" :key="'step-' + index" 
               class="bg-white p-6 rounded-xl border-l-4 border-l-green-500 shadow-sm flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0" v-html="getIcon(step.icon)">
            </div>
            <div>
              <span class="text-xs font-bold text-green-600 uppercase tracking-wide">Krok {{ index + 1 }}</span>
              <h4 class="text-xl font-bold mb-1 text-slate-800">{{ step.title }}</h4>
              <p class="text-slate-600">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-12">Požiadavky</h2>
        <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
          <div v-for="(list, side) in requirements" :key="side" class="p-8 rounded-2xl bg-slate-50 border border-slate-100">
            <h3 class="text-xl font-bold mb-6 flex items-center capitalize">
              <span :class="['w-2 h-8 rounded-full mr-3', side === 'students' ? 'bg-green-500' : 'bg-blue-500']"></span>
              {{ side === 'students' ? 'Pre študentské tímy' : 'Pre firmy' }}
            </h3>
            <ul class="space-y-4">
              <li v-for="(req, index) in list" :key="index" class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 mr-3 mt-0.5', side === 'students' ? 'text-green-600' : 'text-blue-600']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span class="text-slate-700">{{ req }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-slate-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-12">Príklady úspešných projektov</h2>
        <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          <div v-for="(story, index) in successStories" :key="'story-' + index" 
               class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 class="text-lg font-bold text-slate-800 mb-1">{{ story.title }}</h4>
            <p class="text-sm font-medium text-green-600 mb-4">{{ story.subtitle }}</p>
            <p class="text-sm text-slate-600 leading-relaxed">{{ story.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-green-700 to-green-900 text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-6 tracking-tight">Zapojte sa do Programu B</h2>
        <p class="text-xl mb-10 text-green-100 max-w-2xl mx-auto">
          Či už ste študent hľadajúci skúsenosti alebo firma s nápadom, sme tu pre vás.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/registracia-studenta" class="px-8 py-4 bg-white text-green-800 font-bold rounded-xl shadow-lg hover:bg-green-50 transition-all">
            Registrovať sa ako študent
          </RouterLink>
          <RouterLink to="/registracia-firmy" class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
            Registrovať firmu
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProgramBView",
  data() {
    return {
      benefits: {
        students: [
          "Práca na reálnych projektoch od firiem",
          "Finančná odmena za realizáciu",
          "Praktické skúsenosti do portfólia",
          "Kontakt s Product Ownerom z firmy",
          "Mentoring od NTI a firmy",
          "Možnosť získať pracovnú ponuku",
        ],
        companies: [
          "Prístup k talentovaným študentským tímom",
          "Realizácia softvérových projektov",
          "Nízke náklady v porovnaní s outsourcingom",
          "Podpora zo strany NTI",
          "Výber najlepších absolventov",
          "Budovanie employer brandu",
        ],
      },
      processSteps: [
        { title: "Firma zadá technickú špecifikáciu", description: "Firma definuje projekt, požiadavky, rozpočet a Product Ownera", icon: "briefcase" },
        { title: "NTI pridá do backlogu", description: "Projekt sa zobrazí študentom v katalógu dostupných zadaní", icon: "code" },
        { title: "Študentské tímy sa hlásia", description: "Tímy predkladajú životopisy, motiváciu a návrh riešenia", icon: "users" },
        { title: "Komisia vyberá tím", description: "NTI a firma spoločne vyberú najvhodnejší tím", icon: "award" },
        { title: "Realizácia projektu", description: "Tím pracuje na projekte s mentorom NTI a Product Ownerom", icon: "handshake" },
        { title: "Odovzdanie a vyhodnotenie", description: "Finálny produkt sa odovzdá firme a projekt sa vyhodnotí", icon: "check" },
      ],
      requirements: {
        students: ["Minimálne 3-členný tím", "Relevantné technické zručnosti", "Motivácia a záujem o projekt", "Časová dostupnosť na realizáciu"],
        companies: ["Jasne definované zadanie projektu", "Určený Product Owner", "Rozpočet na odmenu študentov", "Dostupnosť pre konzultácie"],
      },
      successStories: [
        { title: "E-commerce platforma", subtitle: "Pre retailovú firmu", text: "Tím 4 študentov vytvoril kompletnú e-shop platformu s admin panelom a mobilnou aplikáciou." },
        { title: "Warehouse management system", subtitle: "Pre logistickú spoločnosť", text: "Realizácia WMS systému s QR kódmi, mobilným skenerovaním a reportingom." },
        { title: "CRM systém", subtitle: "Pre služby zákazníkom", text: "Vlastné CRM riešenie prispôsobené špecifickým potrebám klienta." }
      ],
      // SVG cesty pre ikony v sekcii process
      iconPaths: {
        briefcase: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>',
        code: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        users: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        award: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
        handshake: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2 6-6"/><path d="M18 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/></svg>',
        check: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
      }
    };
  },
  methods: {
    getIcon(name) {
      return this.iconPaths[name] || '';
    }
  }
};
</script>