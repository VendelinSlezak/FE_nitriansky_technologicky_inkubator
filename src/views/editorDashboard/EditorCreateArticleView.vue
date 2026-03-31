<template>
  <div class="w-full">
    <div class="flex items-center gap-4 mb-8">
      <button 
        @click="$router.go(-1)" 
        class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Nový článok</h2>
      </div>
    </div>

    <form @submit.prevent="saveArticle" class="space-y-6">
      <div class="space-y-2">
        <label class="text-sm font-bold text-slate-700 ml-1">Názov článku</label>
        <input 
          v-model="article.title"
          type="text" 
          placeholder="Názov novinky..."
          class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          required
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col space-y-2">
            <label class="text-sm font-bold text-slate-700 ml-1">Titulný obrázok</label>
            
            <div 
            @click="$refs.fileInput.click()"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleFileDrop"
            :class="[
                'relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 transition-all cursor-pointer flex-1 min-h-[160px]',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                imagePreview ? 'border-none p-0 overflow-hidden' : ''
            ]"
            >
            <input 
                type="file" 
                ref="fileInput" 
                class="hidden" 
                accept="image/*" 
                @change="handleFileSelect"
            />

            <template v-if="imagePreview">
                <img :src="imagePreview" class="w-full h-full object-cover rounded-2xl" />
                <button 
                @click.stop="removeImage"
                class="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </template>

            <template v-else>
                <div class="text-blue-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                </div>
                <p class="text-sm font-medium text-slate-600 text-center">
                <span class="text-blue-600">Kliknite pre nahranie</span>
                </p>
                <p class="text-[10px] text-slate-400 mt-1 uppercase tracking-wider text-center">JPG, PNG alebo WEBP</p>
            </template>
            </div>
        </div>

        <div class="flex flex-col space-y-2">
            <label class="text-sm font-bold text-slate-700 ml-1">Popis obrázka</label>
            
            <div class="flex-1 flex flex-col">
            <textarea 
                v-model="article.imageAlt"
                placeholder="Napr. Tím NTI pri preberaní ceny..."
                class="w-full flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
            ></textarea>
            <p class="text-[11px] text-slate-400 italic px-1 mt-2">Dôležité pre prístupnosť a SEO.</p>
            </div>
        </div>
        </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-slate-700 ml-1">Perex</label>
        <textarea 
          v-model="article.excerpt"
          rows="2"
          class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all resize-none"
        ></textarea>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-slate-700 ml-1">Text článku</label>
        <textarea 
          v-model="article.content"
          rows="10"
          class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all"
          required
        ></textarea>
      </div>

      <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button type="button" @click="$router.go(-1)" class="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all">Zrušiť</button>
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95">Publikovať</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditorCreateArticleView",
  data() {
    return {
      isDragging: false,
      imagePreview: null,
      article: {
        title: "",
        excerpt: "",
        imageFile: null,
        imageAlt: "",
        content: ""
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
      if (!file.type.startsWith('image/')) {
        alert("Prosím nahrajte iba obrázkový súbor.");
        return;
      }
      this.article.imageFile = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    removeImage() {
      this.article.imageFile = null;
      this.imagePreview = null;
      this.$refs.fileInput.value = "";
    },
    saveArticle() {
      // V reálnej aplikácii by si použil FormData pre nahrávanie súboru:
      // const formData = new FormData();
      // formData.append('image', this.article.imageFile);
      // formData.append('title', this.article.title);
      
      console.log("Odosielam článok:", this.article);
      alert("Článok pripravený na odoslanie na server.");
      this.$router.push('/editor-dashboard/edit-news');
    }
  }
};
</script>