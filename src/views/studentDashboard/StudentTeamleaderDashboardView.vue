<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center font-sans text-gray-900">
    <div class="max-w-4xl w-full mx-auto space-y-10">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div class="space-y-2 text-center md:text-left">
          <div class="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full mb-2">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
            <span class="text-[10px] font-black uppercase tracking-widest">Teamleader Dashboard</span>
          </div>
          <h1 class="text-4xl font-black text-gray-900 uppercase tracking-tight">{{ tim.nazov }}</h1>
          <p class="text-gray-500 font-medium">Výzva: <span class="text-blue-600 font-bold">{{ tim.vyzvaNazov }}</span></p>
        </div>

        <div v-if="statusTimu === 'draft'" class="flex flex-col items-center md:items-end gap-3">
          <div class="flex flex-wrap justify-center gap-3">
            <button @click="potvrditZmazanieTimu" class="bg-white border-2 border-red-100 text-red-500 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95 text-nowrap">
              Odstrániť tím
            </button>
            <button 
              @click="odoslatNaSchvalenie" 
              :disabled="!mozeOdoslat"
              class="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-30 disabled:grayscale active:scale-95 text-nowrap"
            >
              Odoslať na schválenie
            </button>
          </div>
          <p v-if="!mozeOdoslat" class="text-[10px] font-bold text-red-400 uppercase tracking-tight animate-pulse">
            <span v-if="schvaleniClenoviaPocet < 2">Tím musí mať aspoň 2 členov</span>
            <span v-else-if="!vsetciPozvaniPrijali">Všetci členovia musia prijať pozvánku</span>
          </p>
        </div>

        <div v-else class="flex flex-col items-center md:items-end gap-2">
          <div v-if="statusTimu === 'cakajuci'" class="flex items-center gap-3 bg-amber-50 border-2 border-amber-100 text-amber-700 px-6 py-3 rounded-2xl">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span class="font-black text-xs uppercase tracking-widest">Čaká na schválenie komisiou</span>
          </div>
          <div v-if="statusTimu === 'schvaleny'" class="flex items-center gap-3 bg-green-50 border-2 border-green-100 text-green-700 px-6 py-3 rounded-2xl">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <span class="font-black text-xs uppercase tracking-widest">Tím bol schválený</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8">
        
        <div v-if="statusTimu === 'schvaleny'" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <section class="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              O čom je váš projekt
            </h3>
            <p class="text-gray-700 leading-relaxed font-medium text-lg">
              {{ projektoveDetaily.popis }}
            </p>
          </section>

          <section class="space-y-4">
            <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Projektová dokumentácia a zdroje
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a v-for="file in projektoveDetaily.dokumenty" :key="file.name" :href="file.url" class="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group shadow-sm">
                <span class="font-black text-sm text-gray-700">{{ file.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
            </div>
          </section>

          <section class="space-y-8">
            <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Časová os a míľniky
            </h3>
            
            <div class="relative space-y-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
              <div v-for="(m, index) in projektoveDetaily.milniky" :key="m.id" class="relative pl-12 group">
                <div :class="['absolute left-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-md z-10 transition-colors', m.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 group-hover:bg-gray-300']">
                  <svg v-if="m.done" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                  <span v-else class="text-xs font-black">{{ index + 1 }}</span>
                </div>

                <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 group-hover:border-blue-200 transition-colors">
                  <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <h4 class="text-lg font-black text-gray-900 leading-tight">{{ m.text }}</h4>
                    <span class="inline-flex text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase self-start">
                      Termín: {{ m.date }}
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm leading-relaxed font-medium">{{ m.goal }}</p>

                  <div class="mt-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <div class="flex items-center gap-2">
                      <span class="flex h-2 w-2 rounded-full bg-blue-500"></span>
                      <span class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Spätná väzba od komisie</span>
                    </div>
                    <p v-if="m.mentorComment" class="text-sm text-gray-800 italic font-medium leading-relaxed">
                      "{{ m.mentorComment }}"
                    </p>
                    <p v-else class="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">
                      Zatiaľ bez komentára...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        <section class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-black uppercase tracking-tight">
              {{ statusTimu === 'schvaleny' ? 'Tímová zostava' : 'Skladanie tímu' }}
            </h2>
            <span class="text-xs font-black text-gray-400 uppercase tracking-widest">{{ schvaleniClenoviaPocet }} / {{ tim.maxClenov }} Členov</span>
          </div>

          <div class="overflow-hidden border-2 border-gray-100 rounded-2xl">
            <table class="w-full text-left border-collapse text-sm">
              <thead class="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <tr>
                  <th class="p-4">Meno / Email</th>
                  <th class="p-4 text-center">Status</th>
                  <th v-if="statusTimu === 'draft'" class="p-4 text-right">Akcia</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 font-bold">
                <tr class="bg-blue-50/30">
                  <td class="p-4 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">TL</div>
                    <div>
                      <p class="text-gray-900">Vy (Leader)</p>
                      <p class="text-[10px] text-gray-400 font-medium tracking-tight text-nowrap">leader@student.sk</p>
                    </div>
                  </td>
                  <td class="p-4 text-center">
                    <span class="bg-blue-100 text-blue-700 text-[9px] font-black uppercase px-3 py-1 rounded-full">Zakladateľ</span>
                  </td>
                  <td v-if="statusTimu === 'draft'" class="p-4"></td>
                </tr>
                <tr v-for="member in tim.clenovia" :key="member.email">
                  <td class="p-4 text-gray-700">{{ member.email }}</td>
                  <td class="p-4 text-center">
                    <div v-if="member.status === 'clen'" class="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-[9px] font-black uppercase px-3 py-1 rounded-full text-nowrap">
                      <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Člen
                    </div>
                    <div v-else class="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-[9px] font-black uppercase px-3 py-1 rounded-full text-nowrap">
                      <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></span> Pozvánka odoslaná
                    </div>
                  </td>
                  <td v-if="statusTimu === 'draft'" class="p-4 text-right">
                    <button @click="odstranitClena(member.email)" class="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-xl">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section v-if="statusTimu === 'draft' && (tim.clenovia.length + 1 < tim.maxClenov)" class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-black uppercase tracking-tight">Pridať ďalších členov</h2>
            <div class="bg-gray-100 px-3 py-1 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest text-nowrap">
              Zostáva: {{ tim.maxClenov - (tim.clenovia.length + 1) }} miest
            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-3">
            <input v-model="novyClenEmail" type="email" placeholder="zadajte.email@student.sk" class="flex-grow bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 focus:border-blue-500 outline-none font-bold transition-all" @keyup.enter="pozvatClena" />
            <button @click="pozvatClena" class="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg text-nowrap">
              Poslať pozvánku
            </button>
          </div>
        </section>

        <div class="flex justify-center gap-4 py-8 opacity-20 hover:opacity-100 transition-opacity">
          <button @click="statusTimu = 'draft'" class="text-[10px] underline">Set Draft</button>
          <button @click="statusTimu = 'cakajuci'" class="text-[10px] underline">Set Čakajúci</button>
          <button @click="statusTimu = 'schvaleny'" class="text-[10px] underline font-bold">Set Schválený</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentTeamleaderDashboardView",
  data() {
    return {
      statusTimu: "schvaleny",
      novyClenEmail: "",
      
      tim: {
        nazov: "Inovátori 2024",
        vyzvaNazov: "Smart City Osvetlenie",
        maxClenov: 10,
        clenovia: [
          { email: "peter.mrkva@student.sk", status: "clen" },
          { email: "matej.novak@student.sk", status: "clen" }
        ]
      },

      // Tieto dáta by v reálnej appke prišli z API až po schválení tímu
      projektoveDetaily: {
        popis: "Cieľom projektu je navrhnúť systém inteligentného riadenia pouličných lámp pomocou senzorov pohybu, čím sa zníži energetická náročnosť mesta o 30%. Vaša práca zahŕňa vývoj dashboardu pre dispečing a optimalizáciu dátových prenosov.",
        dokumenty: [
          { name: "Zadanie_Projektu_Smart_City.pdf", url: "#" },
          { name: "Sablona_Technickej_Spravy.docx", url: "#" },
          { name: "Umiestnenie_Senzorov_Mapa.pdf", url: "#" },
          { name: "Brand_Kit_Sutaz_2024.zip", url: "#" }
        ],
        milniky: [
          { 
            id: 1, text: "Analýza a zber dát", date: "15.04.2026", 
            goal: "Získanie reálnych dát o pohybe na vybraných uliciach za posledný mesiac.",
            mentorComment: "Pozrite si aj otvorené dáta mesta, sú voľne dostupné na GitHub portáli.",
            done: true 
          },
          { 
            id: 2, text: "Návrh architektúry", date: "01.05.2026", 
            goal: "Vytvorenie schémy zapojenia senzorov a návrh databázovej štruktúry.",
            mentorComment: "",
            done: false 
          },
          { 
            id: 3, text: "Finálne odovzdanie", date: "20.06.2026", 
            goal: "Odovzdanie funkčného prototypu a kompletnej technickej správy.",
            mentorComment: "",
            done: false 
          }
        ]
      }
    };
  },
  computed: {
    schvaleniClenoviaPocet() {
      return 1 + this.tim.clenovia.filter(m => m.status === 'clen').length;
    },
    vsetciPozvaniPrijali() {
      return this.tim.clenovia.every(member => member.status === 'clen');
    },
    mozeOdoslat() {
      return this.statusTimu === 'draft' && this.schvaleniClenoviaPocet >= 2 && this.vsetciPozvaniPrijali;
    }
  },
  methods: {
    pozvatClena() {
      const email = this.novyClenEmail.trim().toLowerCase();
      if (!email || !email.includes('@') || this.tim.clenovia.find(m => m.email === email)) return;
      this.tim.clenovia.push({ email, status: "prijate" }); // Pre testovanie rovno prijaté
      this.novyClenEmail = "";
    },
    odstranitClena(email) {
      this.tim.clenovia = this.tim.clenovia.filter(m => m.email !== email);
    },
    odoslatNaSchvalenie() {
      if (this.mozeOdoslat) {
        this.statusTimu = 'cakajuci';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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