<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <section class="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-16 lg:py-24">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <span class="inline-block px-3 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            Program A
          </span>

          <h1 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Grantový inkubačný program
          </h1>

          <p class="text-xl text-blue-100 mb-8 leading-relaxed">
            Máte vlastný inovatívny nápad? Získajte financovanie, mentoring a podporu pre 
            váš startup. Zmeňte svoju víziu na úspešný biznis s našou pomocou.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/registracia-studenta" class="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200">
              Registrovať sa ako študent
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-slate-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center text-slate-800">
          Ako to funguje
        </h2>

        <div class="max-w-4xl mx-auto space-y-4">
          <div v-for="(step, index) in steps" :key="'step-' + index" 
              class="bg-white p-6 rounded-xl border-l-4 border-l-blue-600 shadow-sm flex items-start gap-5 transition-transform hover:scale-[1.01]">
            
            <div class="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0" 
                v-html="getIcon(step.icon)">
            </div>

            <div>
              <span class="text-xs font-bold text-blue-600 uppercase tracking-wide">
                Krok {{ index + 1 }}
              </span>
              <h4 class="text-xl font-bold mb-1 text-slate-800">
                {{ step.title }}
              </h4>
              <p class="text-slate-600 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          
          <div>
            <h2 class="text-3xl font-black mb-8 text-slate-900 tracking-tight text-left">Požiadavky</h2>
            <ul class="space-y-5">
              <li v-for="(req, index) in requirements" :key="index" class="flex items-start gap-4">
                <div class="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-lg text-slate-600 font-medium leading-snug">{{ req }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-3xl font-black mb-8 text-slate-900 tracking-tight text-left">Čo získate</h2>
            <ul class="space-y-5">
              <li v-for="(benefit, index) in benefits" :key="index" class="flex items-start gap-4">
                <div class="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-lg text-slate-600 font-medium leading-snug">{{ benefit }}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-black mb-16 text-center text-slate-900 tracking-tight">Projektová dokumentácia</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div v-for="(doc, index) in documents" :key="index" class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="text-blue-600 mb-4" v-html="getIcon('file')"></div>
            <h3 class="font-black text-lg mb-2 text-slate-900">{{ doc.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ doc.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-blue-700 to-indigo-900 text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-6 tracking-tight">Pripravení na štart?</h2>
        
        <p class="text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Podajte prihlášku ešte dnes a staňte sa súčasťou technologickej elity v našom regióne.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link 
            to="/registracia" 
            class="px-10 py-4 bg-white text-blue-800 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all transform active:scale-95"
          >
            Podať prihlášku teraz
          </router-link>

          <router-link 
            to="/partneri-a-mentori" 
            class="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all transform active:scale-95"
          >
            Zobraziť partnerov
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProgramAView",
  data() {
    return {
      steps: [
        { title: "Registrácia tímu", description: "Vytvorte tím minimálne 3 členov.", icon: "userGroup" },
        { title: "Podanie prihlášky", description: "Nahrajte potrebnú dokumentáciu.", icon: "file" },
        { title: "Hodnotenie", description: "Komisia vyhodnotí váš inovatívny projekt.", icon: "award" },
        { title: "Realizácia", description: "Práca na projekte s prideleným mentorom.", icon: "handshake" },
      ],
      categories: [
        { iconKey: "smartphone", title: "Vývoj softvéru", description: "Mobilné aplikácie, desktopové riešenia a embedded systémy." },
        { iconKey: "brain", title: "AI technológie", description: "Strojové učenie, neurónové siete a pokročilá analýza dát." },
        { iconKey: "globe", title: "Webové platformy", description: "Moderné cloudové riešenia a komplexné webové systémy." },
        { iconKey: "gamepad", title: "Herný vývoj", description: "Herné mechaniky, 3D vizualizácie a VR/AR prostredia." },
        { iconKey: "cpu", title: "IoT riešenia", description: "Robotika, inteligentné senzory a prepojené zariadenia." },
      ],
      documents: [
        { title: "Executive Summary", description: "Stručný opis problému, vášho riešenia a potenciálu trhu." },
        { title: "Technická architektúra", description: "Opis technológií, modulov a spôsobu fungovania produktu." },
        { title: "Projektová roadmapa", description: "Kľúčové míľniky, termíny a plánovaný postup prác." },
        { title: "Rozpočet", description: "Detailný plán čerpania grantu na potrebný rozvoj." },
        { title: "Analýza rizík", description: "Identifikácia možných prekážok a spôsobov ich riešenia." },
        { title: "Biznis model", description: "Spôsob, akým bude váš produkt vytvárať hodnotu." },
      ],
      requirements: [
        "Minimálna veľkosť tímu: 3 členovia",
        "Aktívni študenti bez prenášaných predmetov",
        "Vynikajúce výsledky v profilových predmetoch",
        "Originálny a technicky realizovateľný nápad",
      ],
      benefits: [
        "Priame grantové financovanie",
        "Profesionálny mentoring z praxe",
        "Moderná infraštruktúra NTI",
        "Prístup k investorom a partnerom",
        "Silné referencie pre budúcu kariéru",
      ],
      iconPaths: {
        smartphone: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
        brain: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.78-3.06 2.5 2.5 0 0 1-2.41-4.4 2.5 2.5 0 0 1 3.28-3.81c.5-1.14 1.54-1.92 2.73-2.1c.14-.02.27-.05.41-.07Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.78-3.06 2.5 2.5 0 0 0 2.41-4.4 2.5 2.5 0 0 0-3.28-3.81c-.5-1.14-1.54-1.92-2.73-2.1-.14-.02-.27-.05-.41-.07Z"/></svg>',
        globe: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        gamepad: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><circle cx="15" cy="13" r="1"/><circle cx="18" cy="11" r="1"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>',
        cpu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>',
        file: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
        userGroup:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        award: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
        handshake: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2 6-6"/><path d="M18 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/></svg>',
      }
    };
  },
  methods: {
    getIcon(name) {
      return this.iconPaths[name] || '';
    }
  },
  mounted() {
    document.title = "Program A | NTI";
  },
};
</script>