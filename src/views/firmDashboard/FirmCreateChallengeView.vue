<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
    <main class="max-w-3xl mx-auto px-6 py-10">

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
        <div>
          <router-link to="/firm-dashboard" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-2 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Späť na prehľad
          </router-link>
        </div>
      </div>

      <form @submit.prevent="saveChallenge" class="space-y-6">
        
        <div class="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <h2 class="text-lg font-bold text-slate-800 flex items-center gap-3">
            <span class="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">1</span>
            Základné informácie
          </h2>
          
          <div class="grid grid-cols-1 gap-5">
            <div class="space-y-1.5">
              <label class="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-wider">Názov výzvy</label>
              <input 
                v-model="form.title"
                type="text" 
                placeholder="Napr. Optimalizácia skladových zásob..."
                class="w-full px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-400 outline-none transition-all text-sm font-semibold"
                required
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-wider">Kategória</label>
              <input 
                v-model="form.category"
                type="text" 
                placeholder="Napr. Softvérový vývoj"
                class="w-full px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-400 outline-none transition-all text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 space-y-4">
          <h2 class="text-lg font-bold text-slate-800 flex items-center gap-3">
            <span class="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">2</span>
            Detailné zadanie
          </h2>
          
          <div class="space-y-1.5">
            <label class="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-wider">Popis problému a ciele</label>
            <textarea 
              v-model="form.description"
              rows="5"
              placeholder="Detailne popíšte vašu požiadavku..."
              class="w-full px-5 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-blue-400 outline-none transition-all text-sm leading-relaxed"
            ></textarea>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-wider">Rozpočet / Odmena</label>
            <textarea 
              v-model="form.budget"
              rows="5"
              placeholder="Napr. 2000 - 3000 €"
              class="w-full px-5 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-blue-400 outline-none transition-all text-sm leading-relaxed"
            ></textarea>
          </div>
        </div>

        <div class="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 space-y-5">
          <h2 class="text-lg font-bold text-slate-800 flex items-center gap-3">
            <span class="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">3</span>
            Technická špecifikácia
          </h2>

          <div 
            @click="$refs.fileInput.click()"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleFileDrop"
            :class="[
              'relative border-2 border-dashed rounded-[1.5rem] flex flex-col items-center justify-center p-8 transition-all cursor-pointer',
              isDragging ? 'border-blue-400 bg-blue-50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
            ]"
          >
            <input type="file" ref="fileInput" class="hidden" @change="handleFileSelect" />

            <div v-if="!form.fileName" class="text-center">
              <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <p class="text-sm font-bold text-slate-700">Nahrať dokumentáciu</p>
              <p class="text-[10px] text-slate-400 mt-1 uppercase">PDF, DOCX alebo ZIP (max 10MB)</p>
            </div>

            <div v-else class="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100 w-full">
              <div class="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-700 truncate">{{ form.fileName }}</p>
                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Súbor pripravený</p>
              </div>
              <button @click.stop="removeFile" class="text-slate-300 hover:text-red-500 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 px-2">
          <button 
            type="button"
            @click="$router.go(-1)"
            class="text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
          >
            Zrušiť úpravy
          </button>
          
          <div class="flex items-center gap-3 w-full md:w-auto">
            <button 
              type="button"
              @click="saveDraft"
              class="flex-1 md:flex-none px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
            >
              Uložiť draft
            </button>
            <button 
              type="submit"
              class="flex-1 md:flex-none px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-sm shadow-lg shadow-slate-200 hover:bg-black transition-all active:scale-95"
            >
              Odoslať výzvu
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "FirmCreateChallengeView",
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      isDragging: false,
      form: {
        title: "",
        category: "",
        description: "",
        budget: "",
        file: null,
        fileName: ""
      }
    };
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) this.processFile(file);
    },
    handleFileDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file) this.processFile(file);
    },
    processFile(file) {
      this.form.file = file;
      this.form.fileName = file.name;
    },
    removeFile() {
      this.form.file = null;
      this.form.fileName = "";
      this.$refs.fileInput.value = "";
    },
    saveDraft() {
      console.log("Draft uložený:", this.form);
    },
    saveChallenge() {
      console.log("Odoslané:", this.form);
      this.$router.push('/firm-dashboard');
    }
  }
};
</script>