<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    
    <div v-if="isLoading" class="min-h-screen flex flex-col items-center justify-center">
      <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Načítavam...</span>
      </div>
      <p class="mt-4 text-slate-500 font-medium text-lg">Načítavam článok...</p>
    </div>

    <div v-else-if="article">
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
              {{ article.perex }}
            </p>
            
            <figure v-if="article.image_url" class="mb-12">
              <div class="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <img 
                  :src="article.image_url" 
                  :alt="article.title"
                  class="w-full h-auto object-cover max-h-[450px]"
                />
              </div>
              <figcaption v-if="article.image_decription" class="mt-4 text-center text-sm text-slate-400 font-medium italic px-6">
                {{ article.image_decription }}
              </figcaption>
            </figure>

            <div class="space-y-6">
              <p v-for="(paragraph, index) in formattedParagraphs" :key="index" class="text-lg text-slate-700 leading-loose">
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

    <div v-else class="min-h-screen flex flex-col items-center justify-center text-slate-500">
      <p>Článok sa nepodarilo načítať.</p>
      <button @click="$router.push('/news')" class="mt-4 text-blue-600 font-bold">Späť na novinky</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ArticleView",
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      article: null,
      isLoading: false,
    };
  },
  computed: {
    // Táto funkcia zoberie article.content (String) a rozbije ho na pole paragrafov
    formattedParagraphs() {
      if (!this.article || !this.article.content) return [];
      
      // Ak je content už pole, vrátime ho, inak ho rozdelíme podľa \n
      if (Array.isArray(this.article.content)) {
        return this.article.content;
      }
      
      return this.article.content
        .split('\n')                // Rozdelenie podľa nového riadku
        .map(p => p.trim())         // Odstránenie bielych znakov na krajoch
        .filter(p => p.length > 0); // Odstránenie úplne prázdnych riadkov
    }
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      this.isLoading = true;
      try {
        const url = "http://localhost:8080/api/articles/" + this.id;
        const response = await axios.get(url);
        // Očakávame, že response.data.data.content je String s odriadkovaním
        this.article = response.data.data;
      }
      catch (error) {
        console.error("Chyba pri načítaní článku:", error);
      }
      finally {
        this.isLoading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("sk-SK");
    }
  }
};
</script>