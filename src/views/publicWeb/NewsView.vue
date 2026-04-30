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
        
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Načítavam...</span>
          </div>
          <p class="mt-4 text-slate-500 font-medium">Načítavam články...</p>
        </div>

        <div v-else class="flex flex-col gap-6 max-w-5xl mx-auto">
          <div v-for="item in articles" :key="item.id" 
              class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row h-full">
              
              <div class="h-48 md:h-auto md:w-64 lg:w-72 flex-shrink-0">
                <img :src="item.image_url" :alt="item.title" class="w-full h-full object-cover" />
              </div>
              
              <div class="p-6 flex-1 flex flex-col justify-center">
                <div class="flex flex-wrap items-center gap-3 mb-3">
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
                
                <p class="text-sm text-slate-500 mb-4 leading-relaxed">
                    {{ item.perex }}
                </p>
                
                <div class="mt-auto">
                    <button @click="$router.push('/news/' + item.id)" class="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors group">
                    Čítať viac
                    <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                </div>
              </div>
          </div>

          <div v-if="articles.length === 0" class="text-center py-10 text-slate-500">
            Momentálne nie sú k dispozícii žiadne novinky.
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "NewsView",
  data() {
    return {
      articles: [],
      isLoading: false,
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      this.isLoading = true;
      try {
        const url = "http://localhost:8080/api/articles";
        const response = await axios.get(url);
        this.articles = response.data.data;
      }
      catch (error) {
        console.error("Chyba pri načítaní článkov:", error);
      }
      finally {
        this.isLoading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("sk-SK");
    },
  }
};
</script>