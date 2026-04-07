<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
    <main class="max-w-3xl mx-auto px-6 py-10">
      
      <div class="mb-10">
        <router-link to="/firm-dashboard" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-6 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Späť na prehľad
        </router-link>
        
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            {{ challenge.title }}
          </h1>
          <div class="flex flex-wrap items-center gap-3">
            <span class="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
              {{ challenge.category }}
            </span>
            <span :class="statusBadgeClasses" class="px-3 py-1 border rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
              {{ challenge.status }}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-6">

        <div v-if="challenge.status === 'Zamietnuté'" class="bg-red-50 border-2 border-red-100 rounded-[2rem] p-8">
            <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                </svg>
                </div>

                <div class="space-y-4 w-full">
                <div>
                    <h3 class="text-red-900 font-bold text-lg">Výzva bola zamietnutá</h3>
                    <p class="text-red-700 mt-2 text-sm leading-relaxed italic">
                    "{{ challenge.adminComment }}"
                    </p>
                </div>
                <button 
                    @click="createDraft" 
                    class="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                >
                    Vytvoriť z tejto žiadosti nový draft
                </button>
                </div>
            </div>
        </div>

        <section class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
          <div class="space-y-8">
            <div>
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Popis</label>
              <p class="text-slate-700 leading-relaxed whitespace-pre-line">{{ challenge.description }}</p>
            </div>
            <div class="pt-6 border-t border-slate-50">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Rozpočet / Odmena</label>
              <p class="text-lg font-bold text-slate-900">{{ challenge.budget }}</p>
            </div>
          </div>
        </section>

        <section class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Prílohy</h2>
          <a :href="challenge.techSpec.url" class="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-400 hover:bg-white transition-all group">
            <div class="w-12 h-12 bg-white text-blue-500 rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-slate-700 truncate">{{ challenge.techSpec.name }}</p>
              <p class="text-[10px] text-slate-400 uppercase font-medium">Technická špecifikácia (PDF)</p>
            </div>
          </a>
        </section>

        <section v-if="['V štádiu konzultácie', 'V realizácii', 'Ukončené'].includes(challenge.status)" class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Realizačný tím</h2>
          <div class="space-y-3">
            <div v-for="member in challenge.team" :key="member.id" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-100">
                  {{ member.initials }}
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-800">{{ member.name }}</p>
                  <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{{ member.email }}</p>
                </div>
              </div>
              <span class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-500 shadow-sm">
                {{ member.role }}
              </span>
            </div>
          </div>
        </section>

        <section v-if="challenge.status === 'V štádiu konzultácie'" class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Súbory na posúdenie</h2>
          <div class="space-y-3">
            <div v-for="file in challenge.consultationFiles" :key="file.label" class="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-2xl group hover:bg-blue-50 transition-colors cursor-pointer">
              <div class="flex flex-col">
                <span class="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">{{ file.label }}</span>
                <span class="text-sm font-bold text-slate-700">{{ file.name }}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-300 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </div>
        </section>

        <section v-if="['V realizácii', 'Ukončené'].includes(challenge.status)" class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex justify-between items-center">
            Míľniky
          </h2>
          <div class="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
            <div v-for="(m, idx) in challenge.milestones" :key="idx" class="relative pl-10">
              <div :class="m.completed ? 'bg-emerald-500 shadow-emerald-100' : 'bg-slate-200 shadow-none'" class="absolute left-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-lg">
                <svg v-if="m.completed" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                <span v-else class="text-[10px] font-black text-slate-500">{{ idx + 1 }}</span>
              </div>
              <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div class="flex flex-col md:flex-row md:justify-between gap-2 mb-2">
                  <h4 class="font-bold text-slate-800">{{ m.title }}</h4>
                  <span class="text-[10px] font-black text-blue-600 uppercase">{{ m.date }}</span>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">Splnenie tohto míľnika je nevyhnutné pre pokračovanie do ďalšej fázy.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "FirmChallengeView",
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      challenge: {
        title: "AI Optimalizácia logistiky a skladov",
        category: "Dátová analytika",
        description: "Potrebujeme vytvoriť inteligentný systém, ktorý bude predikovať vyťaženosť našich skladových priestorov na základe historických objednávok a sezónnych výkyvov.\n\nCieľom je znížiť náklady na skladovanie o 15%.",
        budget: "5 000 € - 8 000 €",
        status: "V realizácii", 
        adminComment: "Zadanie je príliš všeobecné, prosím doplňte zoznam technológií, ktoré používate v sklade.",
        techSpec: { name: "specifikacia_v2.pdf", url: "#" },
        team: [
          { id: 1, name: "Bc. Igor Hnát", role: "Teamleader", initials: "IH", email: "hnat@student.sk" },
          { id: 2, name: "Jana Kováčová", role: "Člen tímu", initials: "JK", email: "kovacova@student.sk" }
        ],
        consultationFiles: [
          { label: "Motivačný list", name: "motivacia_team.pdf" },
          { label: "Návrh realizácie", name: "navrh_riesenia.pdf" },
          { label: "Ostatné", name: "portfolio_clenov.zip" }
        ],
        milestones: [
          { title: "Zber a čistenie dát", date: "12. 05. 2024", completed: true },
          { title: "Návrh matematického modelu", date: "30. 06. 2024", completed: false },
          { title: "Testovanie na reálnych dátach", date: "15. 08. 2024", completed: false }
        ]
      }
    }
  },
  computed: {
    statusBadgeClasses() {
      const styles = {
        'Čaká na schválenie': 'bg-amber-50 text-amber-600 border-amber-100',
        'Zamietnuté': 'bg-red-50 text-red-600 border-red-100',
        'Publikované': 'bg-emerald-50 text-emerald-600 border-emerald-100',
        'V štádiu konzultácie': 'bg-purple-50 text-purple-600 border-purple-100',
        'V realizácii': 'bg-blue-50 text-blue-600 border-blue-100',
        'Ukončené': 'bg-slate-800 text-white border-slate-800',
      };
      return styles[this.challenge.status] || 'bg-slate-50 text-slate-400';
    }
  },
  methods: {
    createDraft() {
      console.log("Vytváram nový draft...");
    },
  }
}
</script>