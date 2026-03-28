<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <section class="bg-gradient-to-br from-slate-600 to-slate-800 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-extrabold mb-6">
            Novinky z NTI
          </h1>
          <p class="text-xl text-slate-300">
            Zostaňte informovaní o najnovších udalostiach, úspechoch a príležitostiach.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-slate-50">
    <div class="container mx-auto px-4">
        <div class="flex flex-col gap-6 max-w-5xl mx-auto">
        <div v-for="item in newsItems" :key="item.id" 
            class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row h-full">
            
            <div :class="[item.image, 'h-48 md:h-auto md:w-64 lg:w-72 flex-shrink-0']"></div>
            
            <div class="p-6 flex-1 flex flex-col justify-center">
            <div class="flex flex-wrap items-center gap-3 mb-3">
                <span :class="[getCategoryColor(item.category), 'px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider']">
                {{ item.category }}
                </span>
                <div class="flex items-center gap-4 text-xs text-slate-400 font-semibold">
                <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    {{ formatDate(item.date) }}
                </span>
                <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {{ item.author }}
                </span>
                </div>
            </div>
            
            <h3 class="text-xl font-bold mb-2 text-slate-800 leading-snug">
                {{ item.title }}
            </h3>
            
            <p class="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                {{ item.excerpt }}
            </p>
            
            <div class="mt-auto">
                <button class="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors group">
                Čítať viac
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
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
  name: "NewsView",
  data() {
    return {
      email: "",
      newsItems: [
        {
          id: 1,
          title: "NTI spúšťa nové kolo Programu A pre jesenný semester 2026",
          category: "Program A",
          date: "2026-03-10",
          author: "Admin NTI",
          excerpt: "Otvárame nové hodnotiace kolo pre grantový inkubačný program. Prihlášky je možné podávať do 31. marca 2026.",
          image: "bg-gradient-to-br from-blue-400 to-blue-600",
        },
        {
          id: 2,
          title: "Úspešný projekt od tímu CodeMasters pre firmu TechCorp",
          category: "Program B",
          date: "2026-03-05",
          author: "Redakcia",
          excerpt: "Študentský tím CodeMasters úspešne dokončil komplexnú e-commerce platformu pre partnerskú firmu TechCorp Slovakia.",
          image: "bg-gradient-to-br from-green-400 to-green-600",
        },
        {
          id: 3,
          title: "NTI víta nových partnerov z IT sektora",
          category: "Partnerstvá",
          date: "2026-02-28",
          author: "Peter Horváth",
          excerpt: "Tri nové technologické firmy sa pridali k NTI ako partneri. Pripravujeme zaujímavé projekty v oblasti AI a cloud computingu.",
          image: "bg-gradient-to-br from-purple-400 to-purple-600",
        },
        {
          id: 4,
          title: "Workshop: Ako pripraviť úspešnú prihlášku do Programu A",
          category: "Udalosti",
          date: "2026-02-20",
          author: "Jana Kováčová",
          excerpt: "Organizujeme workshop pre študentov, ktorí plánujú podať prihlášku. Dozviete sa, ako pripraviť kvalitné dokumenty.",
          image: "bg-gradient-to-br from-orange-400 to-orange-600",
        },
        {
          id: 5,
          title: "Absolvent NTI získal investíciu pre svoj startup",
          category: "Úspechy",
          date: "2026-02-15",
          author: "Redakcia",
          excerpt: "Bývalý účastník Programu A úspešne získal seed investíciu vo výške 150 000 € pre svoj AI startup.",
          image: "bg-gradient-to-br from-pink-400 to-pink-600",
        },
        {
          id: 6,
          title: "NTI rozširuje portfólio mentorov",
          category: "Mentoring",
          date: "2026-02-10",
          author: "Admin NTI",
          excerpt: "Privítali sme päť nových mentorov so skúsenosťami v oblastiach blockchain, IoT a mobile development.",
          image: "bg-gradient-to-br from-indigo-400 to-indigo-600",
        },
      ],
    };
  },
  computed: {
    // Odfiltruje prvú novinku (ktorá je v Hero/Featured sekcii) pre zobrazenie v gride
    remainingNews() {
      return this.newsItems.slice(1);
    }
  },
  methods: {
    getCategoryColor(category) {
      const colors = {
        "Program A": "bg-blue-100 text-blue-700",
        "Program B": "bg-green-100 text-green-700",
        "Partnerstvá": "bg-purple-100 text-purple-700",
        "Udalosti": "bg-orange-100 text-orange-700",
        "Úspechy": "bg-pink-100 text-pink-700",
        "Mentoring": "bg-indigo-100 text-indigo-700",
      };
      return colors[category] || "bg-slate-100 text-slate-700";
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("sk-SK");
    },
  }
};
</script>

<style scoped>
/* Voliteľné: obmedzenie riadkov pre text (v prípade, že prehliadač nepodporuje native line-clamp) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>