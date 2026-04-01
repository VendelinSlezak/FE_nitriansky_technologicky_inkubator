<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <main class="max-w-6xl mx-auto px-6 py-12 space-y-16">
      
      <section v-for="section in dashboardSections" :key="section.id" class="space-y-6">
        <div class="flex justify-between items-end px-2">
          <div>
            <h2 class="text-2xl font-black text-slate-900">{{ section.title }}</h2>
            <p class="text-slate-500 text-base">{{ section.description }}</p>
          </div>
          <button 
            v-if="section.id === 'drafts'"
            @click="createNewDraft"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            + Vytvoriť nový koncept
          </button>
        </div>

        <div class="space-y-4">
          <div v-if="section.items.length === 0" class="bg-white border border-slate-200 rounded-[2rem] py-10 text-center text-slate-400 text-sm italic">
            V tejto kategórii momentálne nemáte žiadne záznamy.
          </div>

          <div 
            v-for="item in section.items" 
            :key="item.id"
            @click="openChallenge(item.id, section.isDraft)"
            class="group bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col md:flex-row md:items-center gap-6 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-50/50 transition-all cursor-pointer"
          >
            <div :class="[section.color, 'w-2 h-14 rounded-full flex-shrink-0 shadow-sm']"></div>

            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-3 mb-2">
                <span class="text-xs font-black text-slate-300 tracking-widest">#{{ item.id }}</span>

                <div v-if="item.status === 'consultation'" class="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                  <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span class="text-xs font-bold text-amber-700 uppercase tracking-tight">V štádiu konzultácie</span>
                </div>
              </div>
              
              <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                {{ item.title }}
              </h3>
            </div>

            <div class="flex items-center gap-10 text-right shrink-0">
              <div v-if="item.teamName" class="hidden sm:block">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Realizačný tím</p>
                <p class="text-base font-bold text-slate-700">{{ item.teamName }}</p>
              </div>

              <div class="min-w-[110px]">
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{{ item.dateLabel || 'Aktualizácia' }}</p>
                <p class="text-base font-bold text-slate-700">{{ formatDate(item.date) }}</p>
              </div>

              <div class="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white text-slate-300 transition-all shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script>
export default {
  name: "FirmDashboardView",
  data() {
    return {
      drafts: [
        { id: 101, title: "Optimalizácia logistických trás v sklade Sever", date: "2026-03-28" }
      ],
      published: [
        { id: 201, title: "Automatizácia spracovania PDF faktúr", date: "2026-03-15", dateLabel: "Publikované" },
        { id: 202, title: "Portál pre klientsku podporu (B2B)", date: "2026-03-20", dateLabel: "Pridelené", teamName: "PixelPerfect", status: "consultation" }
      ],
      inProgress: [
        { id: 301, title: "Implementácia IoT senzorov do výroby", date: "2026-05-15", dateLabel: "Deadline", teamName: "TechAlpha" },
        { id: 302, title: "Hĺbková analýza zákazníckeho správania", date: "2026-03-31", dateLabel: "Doručené", teamName: "DataWizards" }
      ],
      finished: [
        { id: 401, title: "Modernizácia serverovej infraštruktúry", date: "2026-01-20", dateLabel: "Ukončené", teamName: "NetConnect" }
      ]
    };
  },
  computed: {
    dashboardSections() {
      return [
        { id: 'drafts', title: 'Koncepty a návrhy', description: 'Výzvy v príprave, ktoré čakajú na vaše dopracovanie.', color: 'bg-slate-300', items: this.drafts, isDraft: true  },
        { id: 'published', title: 'Aktívne ponuky', description: 'Výzvy zverejnené pre študentov a projekty v štádiu konzultácie.', color: 'bg-emerald-400', items: this.published, isDraft: false  },
        { id: 'active', title: 'Prebiehajúca realizácia', description: 'Projekty, na ktorých priradené tímy momentálne pracujú.', color: 'bg-emerald-600', items: this.inProgress, isDraft: false  },
        { id: 'done', title: 'História spoluprác', description: 'Archív všetkých odovzdaných projektov.', color: 'bg-slate-900', items: this.finished, isDraft: false  },
      ];
    }
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('sk-SK');
    },
    createNewDraft() { 
        this.$router.push("/firm-dashboard/create-challenge/0");
    },
    openChallenge(id, isDraft) { 
      if (isDraft) {
        this.$router.push(`/firm-dashboard/create-challenge/${id}`);
      } else {
        this.$router.push(`/firm-dashboard/challenge/${id}`);
      }
    },
    logout() { console.log("Logout"); }
  }
};
</script>