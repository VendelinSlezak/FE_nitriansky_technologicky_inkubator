<template>
  <div class="w-full">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Správa článkov</h2>
        <p class="text-slate-500 text-sm">Zoznam publikovaných noviniek</p>
      </div>
      
      <button 
        @click="addNewArticle"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Pridať článok
      </button>
    </div>

    <div class="space-y-3">
      <div 
        v-for="item in newsItems" 
        :key="item.id" 
        class="group bg-white border border-slate-200 rounded-2xl p-3 flex flex-col lg:flex-row items-center gap-4 hover:border-blue-300 hover:shadow-sm transition-all"
      >
        <div :class="[item.image, 'w-full lg:w-32 h-24 lg:h-20 rounded-xl flex-shrink-0 shadow-inner']"></div>
        
        <div class="flex-1 min-w-0 w-full text-center lg:text-left">
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-1">
            <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
              #{{ item.id }}
            </span>
            <span class="text-xs text-slate-400 font-semibold">
              {{ formatDate(item.date) }}
            </span>
          </div>
          <h3 class="text-base font-bold text-slate-800 truncate leading-tight mb-1">
            {{ item.title }}
          </h3>
          <p class="text-xs text-slate-500 truncate opacity-80">
            {{ item.excerpt }}
          </p>
        </div>

        <div class="flex items-center gap-2 w-full lg:w-auto justify-center border-t lg:border-t-0 pt-3 lg:pt-0">
          <button 
            @click="editArticle(item.id)"
            class="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 font-bold rounded-lg transition-colors text-sm border border-slate-100 hover:border-blue-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Upraviť
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorEditNewsView",
  data() {
    return {
      newsItems: [
        {
          id: 1,
          title: "NTI spúšťa nové kolo Programu A pre jesenný semester 2026",
          date: "2026-03-10",
          image: "bg-gradient-to-br from-blue-400 to-blue-600",
          excerpt: "Otvárame nové hodnotiace kolo pre grantový inkubačný program.",
        },
        {
          id: 2,
          title: "Úspešný projekt od tímu CodeMasters pre firmu TechCorp",
          date: "2026-03-05",
          image: "bg-gradient-to-br from-green-400 to-green-600",
          excerpt: "Študentský tím CodeMasters úspešne dokončil e-commerce platformu.",
        },
        {
          id: 3,
          title: "NTI víta nových partnerov z IT sektora",
          date: "2026-02-28",
          image: "bg-gradient-to-br from-purple-400 to-purple-600",
          excerpt: "Tri nové technologické firmy sa pridali k NTI ako partneri.",
        }
      ],
    };
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("sk-SK");
    },
    addNewArticle() { 
        this.$router.push("/editor-dashboard/create-article");
    },
    editArticle(id) { 
        this.$router.push(`/editor-dashboard/edit-article/${id}`);
    },
  }
};
</script>