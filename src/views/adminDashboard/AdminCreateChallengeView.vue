<template>
  <div class="max-w-4xl mx-auto p-6 text-slate-800 pb-20">
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6 mb-8 text-left">
      <div>
        <router-link to="/admin-dashboard/manage-calls" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-2 transition-all">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          Späť na zoznam
        </router-link>
        <h2 class="text-3xl font-black text-slate-900 tracking-tight">Vytvoriť novú výzvu</h2>
        <p class="text-slate-500 text-sm mt-1">Manuálne vytvorenie výzvy pre Program A (Študenti) alebo Program B (Firmy).</p>
      </div>
    </div>

    <form @submit.prevent="submitChallenge" class="space-y-6 text-left">
      
      <div class="bg-white rounded-[1.5rem] p-6 border border-slate-200 shadow-sm">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Typ programu</label>
        <div class="grid grid-cols-2 gap-4">
          <button 
            type="button"
            @click="form.type = 'A'"
            :class="[
              'flex flex-col items-center p-4 rounded-2xl border-2 transition-all',
              form.type === 'A' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'
            ]"
          >
            <span :class="['text-sm font-black uppercase tracking-widest', form.type === 'A' ? 'text-blue-600' : 'text-slate-400']">Program A</span>
            <span class="text-[10px] font-medium text-slate-500 mt-1">Študentské projekty</span>
          </button>
          
          <button 
            type="button"
            @click="form.type = 'B'"
            :class="[
              'flex flex-col items-center p-4 rounded-2xl border-2 transition-all',
              form.type === 'B' ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'
            ]"
          >
            <span :class="['text-sm font-black uppercase tracking-widest', form.type === 'B' ? 'text-emerald-600' : 'text-slate-400']">Program B</span>
            <span class="text-[10px] font-medium text-slate-500 mt-1">Firemné zadania</span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-[1.5rem] p-6 md:p-8 border border-slate-200 shadow-sm space-y-6 text-left">
        <div class="flex items-center gap-3 border-b border-slate-50 pb-4">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs shadow-sm', form.type === 'A' ? 'bg-blue-600' : 'bg-emerald-600']">1</div>
          <h3 class="font-black text-slate-800 uppercase text-sm tracking-widest">Základné informácie</h3>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Názov výzvy</label>
            <input 
              v-model="form.title"
              type="text"
              placeholder="Napr. Vývoj mobilnej aplikácie..."
              class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
              required
            />
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Kategória</label>
              <select 
                v-model="form.category"
                class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-bold text-slate-800 appearance-none"
                required
              >
                <option value="" disabled>Vyberte kategóriu</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            
            <div v-if="form.type === 'B'">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Rozpočet / Odmena</label>
              <input 
                v-model="form.budget"
                type="text"
                placeholder="Napr. 2 000 €"
                class="w-full px-5 py-3.5 bg-emerald-50/30 border border-emerald-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-black text-emerald-700"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[1.5rem] p-6 md:p-8 border border-slate-200 shadow-sm space-y-6 text-left">
        <div class="flex items-center gap-3 border-b border-slate-50 pb-4 text-left">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs shadow-sm', form.type === 'A' ? 'bg-blue-600' : 'bg-emerald-600']">2</div>
          <h3 class="font-black text-slate-800 uppercase text-sm tracking-widest">Detail zadania</h3>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Podrobný popis</label>
            <textarea 
              v-model="form.description"
              rows="6"
              placeholder="Popíšte ciele, požiadavky a očakávané výsledky..."
              class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium text-slate-700 leading-relaxed"
              required
            ></textarea>
          </div>

          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Príloha (Technické podklady)</label>
            <div 
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleFileDrop"
              :class="[
                'border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-3',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'
              ]"
            >
              <div v-if="!form.file" class="text-center">
                <svg class="w-8 h-8 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke-width="2" /></svg>
                <p class="text-xs font-bold text-slate-500 uppercase tracking-tighter">Potiahnite súbor sem alebo</p>
                <button type="button" @click="$refs.fileInput.click()" class="text-blue-600 font-black text-xs uppercase tracking-widest mt-1 hover:underline">Prehľadávať PC</button>
              </div>
              <div v-else class="flex items-center gap-4 bg-white p-3 px-5 rounded-xl border border-slate-200 shadow-sm">
                <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-black text-[10px]">PDF</div>
                <div class="text-left">
                  <p class="text-sm font-black text-slate-800 leading-tight">{{ form.fileName }}</p>
                  <button type="button" @click="removeFile" class="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:underline">Odstrániť súbor</button>
                </div>
              </div>
              <input type="file" ref="fileInput" class="hidden" @change="handleFileSelect" accept=".pdf,.doc,.docx,.zip" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
        <button 
          type="button" 
          @click="$router.back()"
          class="w-full sm:w-auto px-8 py-4 text-xs font-bold text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest"
        >
          Zrušiť
        </button>
        <button 
          type="submit" 
          :class="[
            'w-full sm:w-auto px-12 py-4 text-white text-xs font-black rounded-2xl shadow-xl transition-all uppercase tracking-[0.2em] active:scale-95',
            form.type === 'A' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
          ]"
        >
          Vytvoriť a zverejniť
        </button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: "AdminCreateChallengeView",
  data() {
    return {
      isDragging: false,
      categories: [
        "Webové aplikácie", 
        "AI a dátové technológie", 
        "Mobilné aplikácie", 
        "Herný vývoj", 
        "IoT systémy", 
        "UX/UI Design"
      ],
      form: {
        type: "A", // Predvolený Program A
        title: "",
        category: "",
        description: "",
        budget: "", // Iba pre Program B
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
      if (this.$refs.fileInput) this.$refs.fileInput.value = "";
    },
    submitChallenge() {
      // Validácia
      if (!this.form.title || !this.form.category || !this.form.description) {
        alert("Prosím vyplňte všetky povinné polia.");
        return;
      }

      const challengeData = {
        ...this.form,
        id: Date.now(),
        status: "Otvorená",
        teamCount: 0,
        createdAt: new Date().toISOString()
      };

      console.log("Admin vytvára výzvu:", challengeData);
      alert("Výzva bola úspešne vytvorená.");
      this.$router.push("/admin-dashboard/manage-calls");
    }
  }
};
</script>

<style scoped>
/* Plynulé prepínanie farieb tlačidiel */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>