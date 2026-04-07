<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center font-sans text-gray-900">
    <div class="max-w-3xl w-full mx-auto space-y-10">
      
      <div class="text-center md:text-left border-b border-gray-200 pb-6">
        <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight">Študentský dashboard</h1>
      </div>

      <section v-if="stavStudenta === 'zaklad'" class="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <p class="text-blue-800 font-bold text-sm leading-relaxed">
            Momentálne nie ste členom žiadneho tímu. Môžete pridať novú výzvu do programu, vytvoriť vlastný tím alebo počkať na pozvánku.
          </p>
        </div>
        
        <router-link :to="{name: 'vytvorit-vyzvu'}" class="w-full">
          <button class="w-full bg-blue-600 text-white px-6 py-5 rounded-xl hover:bg-blue-700 transition-all font-black uppercase text-xs shadow-lg active:scale-[0.98]">
            Vytvoriť novú výzvu
          </button>
        </router-link>

        <router-link :to="{name: 'vytvorit-tim'}" class="w-full">
          <button class="w-full bg-green-600 text-white px-6 py-5 rounded-xl hover:bg-green-700 transition-all font-black uppercase text-xs shadow-lg active:scale-[0.98]">
            Vytvoriť nový tím
          </button>
        </router-link>
      </section>

      <section v-else-if="stavStudenta === 'pozvany'" class="bg-white rounded-3xl shadow-xl border-t-8 border-blue-600 overflow-hidden animate-in zoom-in-95 duration-500">
        <div class="p-6 md:p-10 space-y-8">
          <div class="space-y-2">
            <span class="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Nová pozvánka</span>
            <h2 class="text-3xl font-black text-gray-900 pt-2">{{ pozvanka.projektNazov }}</h2>
            <p class="text-blue-600 font-black text-xl">Tím: {{ pozvanka.timNazov }}</p>
          </div>

          <div class="space-y-3">
            <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Popis projektu</h3>
            <p class="text-gray-700 leading-relaxed font-medium">{{ pozvanka.projektPopis }}</p>
          </div>

          <div class="space-y-3">
            <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Požadované zručnosti</h3>
            <div class="flex flex-col gap-2">
              <div v-for="skill in pozvanka.zrucnosti" :key="skill" class="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-black text-gray-700 flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                {{ skill }}
              </div>
            </div>
          </div>

          <div class="pt-8 border-t border-gray-100 space-y-4">
            <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Čestné vyhlásenie o zručnostiach</h3>
            <a :href="pozvanka.sablonaUrl" class="flex items-center justify-between p-5 bg-blue-50 rounded-2xl text-blue-700 hover:bg-blue-100 transition-all shadow-sm group">
              <span class="text-xs font-black uppercase tracking-wider">Stiahnuť šablónu čestného vyhlásenia</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </a>
            <button class="w-full flex items-center justify-center gap-3 p-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <span class="text-xs font-black uppercase tracking-wider">Nahrať vyplnený dokument</span>
            </button>
          </div>

          <div class="flex flex-col gap-3 pt-6">
            <button @click="prijatPozvanku" class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.1em] shadow-xl active:scale-[0.98]">
              Prijať pozvánku a vstúpiť do tímu
            </button>
            <button @click="odmietnutPozvanku" class="w-full bg-white border-2 border-gray-100 text-gray-400 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.1em]">
              Odmietnuť pozvánku
            </button>
          </div>
        </div>
      </section>

      <section v-else-if="stavStudenta === 'clen_timu'" class="space-y-6 animate-in fade-in duration-700">
        <div class="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10 space-y-10">
          
          <div>
            <h2 class="text-3xl font-black text-gray-900 tracking-tight">Člen tímu {{ aktivnyTim.nazov }}</h2>
            <div class="mt-4 flex items-center gap-3 bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl inline-flex">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span class="text-[10px] font-black text-amber-700 uppercase tracking-[0.15em]">{{ aktivnyTim.stav }}</span>
            </div>
            
            <p v-if="aktivnyTim.stav !== 'tím schválený'" class="mt-6 text-sm text-gray-500 italic border-l-2 border-gray-200 pl-4">
              Harmonogram a dokumentácia k projektu budú sprístupnené po oficiálnom schválení tímu komisiou.
            </p>
          </div>

          <div v-if="aktivnyTim.stav === 'tím schválený'" class="space-y-12 pt-6 border-t border-gray-100 animate-in slide-in-from-top-4 duration-500">
            
            <div class="space-y-4">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Projektová dokumentácia
              </h3>
              <div class="flex flex-col gap-3">
                <a v-for="file in aktivnyTim.dokumenty" :key="file.name" href="#" class="flex items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-white transition-all group shadow-sm">
                  <span class="font-black text-sm text-gray-700">{{ file.name }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </a>
              </div>
            </div>

            <div class="space-y-8">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Míľniky
              </h3>
              
              <div class="relative space-y-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-100">
                <div v-for="(m, index) in aktivnyTim.milniky" :key="m.id" class="relative pl-12 group">
                  
                  <div :class="['absolute left-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-md z-10 transition-colors', m.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 group-hover:bg-gray-300']">
                    <svg v-if="m.done" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                    <span v-else class="text-xs font-black">{{ index + 1 }}</span>
                  </div>

                  <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 group-hover:border-blue-200 transition-colors">
                    <div class="flex justify-between items-start gap-4">
                      <h4 class="text-lg font-black text-gray-900 leading-tight">{{ m.text }}</h4>
                      <span class="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase">{{ m.date }}</span>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">{{ m.goal }}</p>

                    <div class="mt-4 p-5 bg-white rounded-2xl border border-gray-200 shadow-inner space-y-3">
                      <div class="flex items-center gap-2">
                        <span class="flex h-2 w-2 rounded-full bg-blue-500"></span>
                        <span class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Komentár mentora</span>
                      </div>
                      <p v-if="m.mentorComment" class="text-sm text-gray-800 italic font-medium leading-relaxed">
                        "{{ m.mentorComment }}"
                      </p>
                      <p v-else class="text-[10px] text-gray-300 font-black uppercase tracking-widest italic">
                        Čaká sa na vyjadrenie mentora...
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-8 pt-12 border-t-2 border-gray-200 border-dashed">
        <div class="px-2">
          <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tight">História projektov</h2>
          <p class="text-gray-500 text-sm font-medium mt-1">Prehľad dokončených výziev a hodnotenia.</p>
        </div>
        
        <div class="flex flex-col gap-4">
          <div 
            v-for="project in posledneProjekty" 
            :key="project.id" 
            class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
            :class="{'ring-2 ring-blue-500 shadow-xl': otvorenyProjektId === project.id}"
          >
            <div @click="toggleProject(project.id)" class="p-6 cursor-pointer hover:bg-gray-50 flex items-start justify-between transition-colors">
              <div class="space-y-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">ID #{{ project.id }}</span>
                  <span class="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">Dokončené</span>
                </div>
                <h3 class="font-black text-xl text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {{ project.title }}
                </h3>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] mt-1">
                  Uzavreté: {{ project.date }}
                </p>
              </div>
              <div class="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300"
                   :class="{'rotate-180 bg-blue-600 text-white': otvorenyProjektId === project.id, 'bg-gray-100 text-gray-400': otvorenyProjektId !== project.id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div v-if="otvorenyProjektId === project.id" class="p-6 border-t border-gray-100 bg-gray-50/50 animate-in slide-in-from-top-2 duration-300">
              <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div class="flex items-center gap-2 mb-4">
                  <span class="flex h-2 w-2 rounded-full bg-blue-500"></span>
                  <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Záverečné hodnotenie</h4>
                </div>
                <p class="text-sm font-medium text-gray-800 italic leading-relaxed relative z-10">
                  "{{ project.hodnotenie.komentar }}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  name: "StudentDashboardView",
  data() {
    return {
      studentName: "Ján",
      stavStudenta: "clen_timu", // 'zaklad', 'pozvany', 'clen_timu'
      otvorenyProjektId: null,
      
      posledneProjekty: [
        { 
          id: 101, title: "Digitálna transformácia skladu", date: "12.02.2024",
          hodnotenie: { komentar: "Projekt bol spracovaný na profesionálnej úrovni. Tím preukázal vynikajúce technické zručnosti pri integrácii API a čistotu kódu. Dokumentácia je príkladná pre ostatných študentov." }
        },
        { 
          id: 102, title: "Marketingová stratégia NTI", date: "05.01.2024",
          hodnotenie: { komentar: "Analýza trhu bola veľmi hĺbková. Návrh kampane by však potreboval konkrétnejšie rozpočtové rámce. Celkovo veľmi dobrá práca s dátami." }
        }
      ],

      pozvanka: {
        timNazov: "Inovátori 2024",
        projektNazov: "Smart City Osvetlenie",
        projektPopis: "Cieľom projektu je navrhnúť systém inteligentného riadenia pouličných lámp pomocou senzorov pohybu, čím sa zníži energetická náročnosť mesta o 30%.",
        zrucnosti: ["Vue.js", "Tailwind CSS", "Analytické myslenie", "Základy IoT"],
        sablonaUrl: "#"
      },

      aktivnyTim: {
        nazov: "SilverTech",
        stav: "tím schválený", // Pre testovanie zmeň na: 'tím čaká na schválenie komisiou'
        dokumenty: [
          { name: "Technická špecifikácia_v1.pdf", url: "#" },
          { name: "Návrh riešenia_finál.figma", url: "#" }
        ],
        milniky: [
          { 
            id: 1, text: "Analýza a prieskum", date: "01.03.2024", 
            goal: "Identifikovať hlavné problémy cieľovej skupiny cez dotazníky.",
            mentorComment: "Veľmi dobrý výber respondentov, oceňujem hĺbku analýzy.",
            done: true 
          },
          { 
            id: 2, text: "Prototyp aplikácie", date: "15.03.2024", 
            goal: "Vytvorenie klikateľného prototypu v nástroji Figma.",
            mentorComment: "",
            done: false 
          }
        ]
      }
    };
  },
  methods: {
    toggleProject(id) {
      this.otvorenyProjektId = this.otvorenyProjektId === id ? null : id;
    },
    prijatPozvanku() {
      this.stavStudenta = 'clen_timu';
      this.aktivnyTim.stav = "tím čaká na schválenie komisiou";
    },
    odmietnutPozvanku() {
      this.stavStudenta = 'zaklad';
    }
  }
};
</script>

<style scoped>
.animate-in { animation: slide-in 0.4s ease-out; }
@keyframes slide-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>