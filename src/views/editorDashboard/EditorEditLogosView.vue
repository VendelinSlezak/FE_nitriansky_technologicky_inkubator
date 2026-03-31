<template>
  <div class="w-full">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-slate-800 tracking-tight mb-2">Partnerské logá</h2>
      <p class="text-slate-500 text-sm">Vyberte logá ktoré sa majú zobrazovať na verejnej stránke.</p>
    </div>

    <div v-if="logos.length === 0" class="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
      <div class="p-4 bg-slate-100 rounded-full text-slate-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p class="text-slate-600 font-bold">Zatiaľ neboli nahrané žiadne logá</p>
      <p class="text-slate-400 text-sm">Najskôr musíte pridať súbory do úložiska.</p>
    </div>

    <div v-else>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        <div 
          v-for="logo in logos" 
          :key="logo.id"
          @click="toggleLogo(logo)"
          :class="[
            'relative aspect-square flex items-center justify-center p-6 rounded-2xl border-2 transition-all cursor-pointer group',
            logo.isVisible 
              ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100' 
              : 'border-slate-100 bg-white hover:border-slate-300'
          ]"
        >
          <div 
            class="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all"
            :class="logo.isVisible ? 'bg-blue-600 text-white scale-100' : 'bg-slate-100 text-slate-300 scale-75 opacity-0 group-hover:opacity-100'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>

          <img 
            :src="logo.url" 
            :alt="logo.name"
            :class="['max-w-full max-h-full object-contain transition-all', logo.isVisible ? 'grayscale-0 opacity-100' : 'grayscale opacity-40']"
          />
          
          <div class="absolute bottom-2 left-0 right-0 text-center">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ logo.name }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between py-6 border-t border-slate-100">
        <div class="text-sm text-slate-500">
            Vybraných: <span class="font-bold text-blue-600">{{ selectedCount }}</span> {{ getLogoLabel }}
        </div>
        <button 
          @click="saveChanges"
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 active:scale-95"
        >
          Uložiť zmeny
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorEditLogosView",
  data() {
    return {
      // Simulované dáta z databázy
      logos: [
        { id: 1, name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", isVisible: true },
        { id: 2, name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", isVisible: true },
        { id: 3, name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", isVisible: false },
        { id: 4, name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", isVisible: true },
        { id: 5, name: "Facebook", url: "https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg", isVisible: false },
      ]
    };
  },
  computed: {
    selectedCount() {
      return this.logos.filter(l => l.isVisible).length;
    },
    getLogoLabel() {
        const count = this.selectedCount;
        
        if (count === 0) {
        return "lôg";
        } else if (count === 1) {
        return "logo";
        } else if (count >= 2 && count <= 4) {
        return "logá";
        } else {
        return "lôg"; // Pre 5 a viac
        }
    },
  },
  methods: {
    toggleLogo(logo) {
      logo.isVisible = !logo.isVisible;
    },
    saveChanges() {
      // Tu by prebehlo API volanie (napr. axios.patch)
      const dataToSave = this.logos.map(l => ({ id: l.id, isVisible: l.isVisible }));
      console.log("Ukladám viditeľnosť log:", dataToSave);
      alert("Nastavenia log boli úspešne uložené.");
    }
  }
};
</script>