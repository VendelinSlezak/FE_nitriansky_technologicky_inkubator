<template>
  <div v-if="article" class="min-h-screen bg-white font-sans text-slate-900">
    
    <header class="py-12 md:py-16 bg-slate-50 border-b border-slate-100">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          
          <button 
            @click="$router.push('/news')" 
            class="inline-flex items-center text-slate-400 hover:text-blue-600 mb-8 font-bold text-sm transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
            </svg>
            SPÄŤ NA NOVINKY
          </button>

          <div class="space-y-4">            
            <h1 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {{ article.title }}
            </h1>

            <div class="flex items-center gap-4 text-sm font-semibold text-slate-400 pt-2">
              <span>{{ formatDate(article.date) }}</span>
              <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{{ article.author }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="py-10 md:py-14">
      <div class="container mx-auto px-4">
        <article class="max-w-3xl mx-auto">

          <p class="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-10">
            {{ article.excerpt }}
          </p>
          
          <figure v-if="article.coverImage" class="mb-12">
            <div class="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img 
                :src="article.coverImage" 
                :alt="article.title"
                class="w-full h-auto object-cover max-h-[450px]"
              />
            </div>
            <figcaption v-if="article.imageCaption" class="mt-4 text-center text-sm text-slate-400 font-medium italic px-6">
              {{ article.imageCaption }}
            </figcaption>
          </figure>

          <div class="space-y-6">
            <p v-for="(paragraph, index) in article.content" :key="index" class="text-lg text-slate-700 leading-loose">
              {{ paragraph }}
            </p>
          </div>

          <div class="mt-16 pt-10 border-t border-slate-100">
            <button 
                @click="$router.push('/news')" 
                class="inline-flex items-center text-slate-400 hover:text-blue-600 mb-8 font-bold text-sm transition-colors group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
                </svg>
                SPÄŤ NA NOVINKY
            </button>
          </div>

        </article>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "ArticleView",
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      article: null
    };
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    fetchArticle() {
      // Simulácia dát z API (tu pridaj coverImage a imageCaption)
      this.article = {
        id: this.id,
        title: "NTI spúšťa nové kolo Programu A pre jesenný semester 2026",
        date: "2026-03-10",
        author: "Admin NTI",
        coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", // Ukážkový obrázok
        imageCaption: "Mladí inovátori počas workshopu v priestoroch NTI Technologického Inkubátora.",
        excerpt: "Otvárame nové hodnotiace kolo pre grantový inkubačný program. Prihlášky je možné podávať do 31. marca 2026.",
        content: [
          "Technologický inkubátor NTI s radosťou oznamuje otvorenie jarného kola prihlášok...",
          "Úspešní uchádzači získajú nielen finančný grant na rozvoj svojho projektu, ale aj prístup k exkluzívnym priestorom...",
          "Proces výberu pozostáva z dvoch kôl – formálneho posúdenia biznis plánu a následného osobného 'pitchingu'."
        ]
      };
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("sk-SK");
    }
  }
};
</script>