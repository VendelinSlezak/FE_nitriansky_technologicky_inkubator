<template>
  <div class="min-h-screen bg-white font-sans text-slate-900 pt-24 pb-20">
    <div v-if="items" class="container mx-auto px-4 max-w-4xl">
      
      <router-link to="/challenges" class="inline-flex items-center text-slate-400 hover:text-blue-600 mb-12 transition-colors group text-sm font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Späť na zoznam výziev
      </router-link>

      <header class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span :class="[
            'px-3 py-1 rounded-md text-[10px] font-black tracking-[0.2em] uppercase',
            items.program === 'A' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
          ]">
            Program {{ items.program }}
          </span>
          <span v-if="items.program === 'A'" class="text-slate-400 text-xs font-bold uppercase tracking-wider">
            {{ items.category }}
          </span>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
          {{ items.name }}
        </h1>

        <div v-if="items.program === 'B'" class="flex items-center py-6 border-y border-slate-100">
          <div>
            <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Finančná odmena pre tím</span>
            <span class="text-3xl font-black text-emerald-600">{{ items.reward }} €</span>
          </div>
        </div>
      </header>

      <article class="prose prose-slate prose-lg max-w-none mb-16">
        <h3 class="text-slate-900 font-bold">O projekte</h3>
        <p class="text-slate-600 leading-relaxed">
          {{ items.description }}
        </p>

        <div v-if="items.program === 'A'" class="mt-10 p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <h3 class="text-slate-900 font-bold mt-0">Požadované zručnosti</h3>
          <p class="text-slate-600 mb-0">
            {{ items.skillsDescription }}
          </p>
        </div>
      </article>

      <section class="mb-16">
        <h3 class="text-xl font-bold mb-6 text-slate-900">Dokumentácia k výzve</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <a v-for="(file, index) in items.attachments" :key="index" :href="file.url" 
             class="flex items-center p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="overflow-hidden">
              <span class="block font-bold text-slate-700 truncate">{{ file.name }}</span>
              <span class="text-xs text-slate-400 font-medium">{{ file.size }}</span>
            </div>
          </a>
        </div>
      </section>

      <footer class="pt-10 border-t border-slate-100 text-center">
        <button class="inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-xl text-lg mb-4 w-full sm:w-auto">
          Zaregistrujte sa ešte dnes
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </footer>

    </div>

    <div v-else class="text-center py-40">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-blue-600 mb-4"></div>
      <h2 class="text-xl font-bold text-slate-400 tracking-tight">Hľadám detaily výzvy...</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ChallengeView",
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      items: null,
      isLoading: false,
      errorMessage: null,
      challenge: null,
    };
  },
  created() {
    console.log(this.id)
    this.fetchData(this.id)
  },
  methods: {
    async fetchData(id) {
      this.isLoading = true,
      this.errorMessage = null

      try {
        const response = await axios.get(`http://127.0.0.1:8080/api/challenges/${id}`);
        this.items = response.data.data; 
        console.log(this.items)
      } catch (error) {
        this.errorMessage = 'Nepodarilo sa načítať data';
        console.log(error);
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>