<template>
  <div class="p-6 max-w-5xl mx-auto text-slate-800">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-8 mb-8">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-800">Správa kategórií</h2>
        <p class="text-slate-500 text-sm mt-1">Definujte kategórie výziev v programe A a požiadavky na zručnosti.</p>
      </div>
    </div>

    <div class="space-y-6 mb-12">
      <div v-if="isLoading" class="py-20 text-center text-slate-400 font-medium">
        Načítavam údaje...
      </div>

      <div 
        v-for="category in categories" 
        :key="category.id"
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div 
          @click="toggleEdit(category.id)"
          class="p-6 flex items-start justify-between cursor-pointer"
        >
          <div class="flex gap-5">
            <div 
              class="mt-1 w-3 h-3 rounded-full flex-shrink-0" 
              :class="category.isVisible ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-300'"
            ></div>
            <div>
              <h3 class="font-bold text-lg text-slate-800 leading-tight">{{ category.name }}</h3>
              <p class="text-slate-500 text-sm mt-2 line-clamp-1 italic">
                {{ category.skillsDescription || 'Bez popisu zručností...' }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <span 
              :class="[
                'hidden sm:block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border',
                category.isVisible ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'
              ]"
            >
              {{ category.isVisible ? 'Verejná' : 'Skrytá' }}
            </span>
            <svg 
              class="h-5 w-5 text-slate-400 transition-transform duration-300" 
              :class="{'rotate-180': expandedCategoryId === category.id}" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div v-if="expandedCategoryId === category.id" class="px-6 pb-8 pt-2 border-t border-slate-50 animate-in fade-in">
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Názov kategórie</label>
                <input v-model="category.name" type="text" class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-bold transition-all" />
              </div>
              
              <div class="flex flex-col gap-2">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Viditeľnosť pre verejnosť</label>
                <div class="flex p-1 bg-slate-100 rounded-xl">
                   <button 
                    @click="category.isVisible = true"
                    :class="category.isVisible ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'"
                    class="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                   >Aktívna</button>
                   <button 
                    @click="category.isVisible = false"
                    :class="!category.isVisible ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'"
                    class="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                   >Skrytá</button>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Popis potrebných zručností</label>
              <textarea 
                v-model="category.skillsDescription" 
                rows="4"
                placeholder="Popíšte, čo by mal uchádzač ovládať..."
                class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm font-medium leading-relaxed transition-all"
              ></textarea>
            </div>

            <div class="flex items-center justify-between pt-6 border-t border-slate-100">
              <button @click="deleteCategory(category.id)" class="inline-flex items-center gap-1.5 text-rose-500 text-xs font-bold hover:text-rose-700 transition-colors uppercase tracking-widest">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2m3 3h.01" /></svg>
                Zmazať
              </button>
              
              <div class="flex gap-3">
                <button @click="expandedCategoryId = null" class="px-6 py-2.5 text-slate-400 font-bold text-xs uppercase hover:text-slate-600">Zrušiť</button>
                <button 
                  @click="updateCategory(category)" 
                  class="px-8 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 transition-all uppercase tracking-widest"
                >
                  Uložiť kategóriu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="new-category-form" class="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 transition-all hover:border-slate-300">
      <div class="mb-8">
        <h3 class="text-xl font-extrabold text-slate-800">Nová kategória</h3>
        <p class="text-slate-500 text-sm mt-1">Pridajte novú oblasť do systému.</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Názov</label>
            <input 
              v-model="newCategory.name" 
              type="text" 
              class="px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-bold text-lg"
              placeholder="Napr. Projektový manažment"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Zručnosti a požiadavky</label>
            <textarea 
              v-model="newCategory.skillsDescription" 
              rows="4"
              class="px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-sm font-medium"
              placeholder="Vypíšte očakávané vedomosti a skúsenosti voľnou formou..."
            ></textarea>
          </div>
        </div>
        
        <div class="pt-4 flex justify-end">
          <button 
            @click="createCategory"
            :disabled="!newCategory.name"
            class="px-10 py-4 bg-slate-900 hover:bg-black disabled:opacity-20 text-white font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest text-xs"
          >
            Vytvoriť kategóriu
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: "AdminManageCategoriesView",
  data() {
    return {
      isLoading: false,
      expandedCategoryId: null,
      categories: [],
      newCategory: {
        name: "",
        skillsDescription: "",
        isVisible: false
      }
    };
  },
  
  async created() {
    await this.fetchCategories();
  },

  methods: {
    // --- AXIOS PRÍPRAVA ---

    async fetchCategories() {
      this.isLoading = true;
      try {
        // const response = await axios.get('/api/categories');
        // this.categories = response.data;
        
        // Simulácia pre teraz:
        this.categories = [
          { 
            id: 1, 
            name: "Backend Development", 
            skillsDescription: "Znalosť Node.js alebo Pythonu, práca s databázami SQL a základné pochopenie REST architektúry.", 
            isVisible: true 
          },
          { 
            id: 2, 
            name: "Grafický dizajn", 
            skillsDescription: "Pokročilá práca s Adobe Creative Cloud (Photoshop, Illustrator), cit pre typografiu a vizuálnu hierarchiu.", 
            isVisible: false 
          }
        ];
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async createCategory() {
      try {
        const payload = { ...this.newCategory };
        // const response = await axios.post('/api/categories', payload);
        
        this.categories.push({ ...payload, id: Date.now() });
        this.newCategory = { name: "", skillsDescription: "", isVisible: true };
        alert("Kategória úspešne vytvorená.");
      } catch (error) {
        alert("Chyba pri vytváraní.");
      }
    },

    async updateCategory(category) {
      try {
        const payload = {
          name: category.name,
          isVisible: category.isVisible,
          skillsDescription: category.skillsDescription
        };
        // await axios.patch(`/api/categories/${category.id}`, payload);
        
        this.expandedCategoryId = null;
        alert("Zmeny boli uložené.");
      } catch (error) {
        alert("Chyba pri ukladaní.");
      }
    },

    async deleteCategory(id) {
      if (!confirm("Naozaj chcete túto kategóriu natrvalo zmazať?")) return;
      try {
        // await axios.delete(`/api/categories/${id}`);
        this.categories = this.categories.filter(c => c.id !== id);
      } catch (error) {
        alert("Chyba pri mazaní.");
      }
    },

    // --- UI ---

    toggleEdit(id) {
      this.expandedCategoryId = this.expandedCategoryId === id ? null : id;
    },

    scrollToNewCategory() {
      document.getElementById('new-category-form').scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>