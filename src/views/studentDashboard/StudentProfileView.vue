<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center font-sans text-gray-900">
    <div class="max-w-2xl w-full mx-auto space-y-8">
      
      <div class="text-center md:text-left border-b border-gray-200 pb-6">
        <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight">Môj Profil</h1>
        <p class="text-gray-500 font-bold uppercase text-[10px] mt-2 tracking-widest">
          Spravujte svoje údaje
        </p>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
        
        <div class="space-y-4">
          <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Profilové logo / Fotka
          </h3>
          
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="relative group">
              <div class="w-32 h-32 rounded-3xl bg-gray-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                <img v-if="logoPreview" :src="logoPreview" class="w-full h-full object-cover" />
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <label class="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <input type="file" @change="handleLogoUpload" class="hidden" accept="image/*" />
              </label>
            </div>
            <div class="text-center md:text-left">
              <p class="text-sm font-bold text-gray-700">Nahrať nové logo</p>
              <p class="text-[10px] text-gray-400 font-medium uppercase mt-1">Formát: JPG, PNG (Max 2MB)</p>
            </div>
          </div>
        </div>

        <div class="space-y-4 pt-6 border-t border-gray-100">
          <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Profesijný Životopis (CV)
          </h3>
          
          <div class="relative">
            <div v-if="cvFile" class="flex items-center justify-between p-5 bg-blue-50 border border-blue-100 rounded-2xl animate-in zoom-in-95 duration-300">
              <div class="flex items-center gap-3">
                <div class="bg-blue-600 p-2 rounded-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p class="text-sm font-black text-blue-900 leading-none">{{ cvFile.name }}</p>
                  <p class="text-[10px] text-blue-400 font-bold uppercase mt-1">Súbor pripravený na uloženie</p>
                </div>
              </div>
              <button @click="cvFile = null" class="text-blue-300 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <label v-else class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-300 group-hover:text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">Kliknite pre nahranie nového CV (PDF)</p>
              </div>
              <input type="file" @change="handleCVUpload" class="hidden" accept=".pdf" />
            </label>
          </div>
        </div>

        <div class="pt-6">
          <button 
            @click="saveChanges" 
            :disabled="isSaving"
            class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <span v-if="!isSaving">Uložiť všetky zmeny</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Ukladám...
            </span>
          </button>
        </div>

      </div>

      <transition name="fade">
        <div v-if="showSuccess" class="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          <span class="font-black text-xs uppercase tracking-widest">Zmeny boli úspešne uložené!</span>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
export default {
  name: "StudentProfileView",
  data() {
    return {
      logoPreview: null,
      cvFile: null,
      isSaving: false,
      showSuccess: false
    };
  },
  methods: {
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.logoPreview = URL.createObjectURL(file);
      }
    },
    handleCVUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.cvFile = file;
      }
    },
    async saveChanges() {
      this.isSaving = true;
      
      // Simulácia API requestu
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.isSaving = false;
      this.showSuccess = true;
      
      // Schovať notifikáciu po 3 sekundách
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.animate-in {
  animation-duration: 500ms;
  animation-fill-mode: both;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoom-in-95 {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.fade-in { animation-name: fade-in; }
.zoom-in-95 { animation-name: zoom-in-95; }
</style>