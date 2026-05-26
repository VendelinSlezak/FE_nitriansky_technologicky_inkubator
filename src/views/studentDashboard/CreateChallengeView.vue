<template>
  <div class="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
    <div class="max-w-4xl w-full mx-auto">
      
      <div class="text-center md:text-left mb-10">
        <router-link to="/student-dashboard" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-4 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Späť na dashboard
        </router-link>
        <h1 class="text-3xl font-bold mb-2 text-gray-900">Vytvoriť novú výzvu</h1>
        <p class="text-gray-700 mx-auto md:mx-0">
          Navrhnite vlastnú tému pre Program A. Po schválení administrátorom sa vaša výzva zobrazí v zozname dostupných projektov.
        </p>
      </div>

      <div class="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <form @submit.prevent="submitChallenge" class="space-y-6">

          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Názov výzvy</label>
            <input
              type="text"
              v-model="challenge.title"
              placeholder="Napr. Optimalizácia logistických procesov"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Kategória</label>
            <select
              v-model="challenge.category"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              required
            >
              <option value="" disabled>Vyberte kategóriu</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.title }}
              </option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Podrobný popis</label>
            <textarea
              v-model="challenge.description"
              placeholder="Popíšte cieľ výzvy, očakávané výsledky a potrebné technológie..."
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              rows="5"
              required
            ></textarea>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider">Príloha (Súbor s popisom výzvy)</label>
            <div 
              class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all"
              :class="challenge.file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 bg-gray-50'"
              @click="$refs.fileInput.click()"
            >
              <input 
                type="file" 
                ref="fileInput" 
                class="hidden" 
                @change="handleFileUpload"
                accept=".pdf,.doc,.docx,.txt"
              />
              
              <div v-if="!challenge.file" class="space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-sm text-gray-600">
                  <span class="font-bold text-blue-600 hover:underline">Kliknite pre nahranie</span> alebo presuňte súbor sem
                </p>
                <p class="text-xs text-gray-500">Podporované formáty: PDF, DOCX, TXT (Max. 2 MB)</p>
              </div>
              
              <div v-else class="flex items-center justify-between bg-white p-3 rounded-md border border-green-200">
                <div class="flex items-center gap-2 truncate">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div class="text-left truncate">
                    <p class="text-sm font-medium text-gray-800 truncate">{{ challenge.file.name }}</p>
                    <p class="text-xs text-gray-500">{{ formatFileSize(challenge.file.size) }}</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  @click.stop="removeFile" 
                  class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-black shadow-md shadow-blue-100 active:scale-95 flex-grow sm:flex-grow-0"
            >
              ODOSLAŤ VÝZVU NA SCHVÁLENIE
            </button>
            <router-link to="/student-dashboard" class="flex-grow sm:flex-grow-0">
              <button 
                type="button"
                class="w-full bg-gray-100 text-gray-600 px-8 py-3 rounded-lg hover:bg-gray-200 transition font-bold active:scale-95"
              >
                Zrušiť
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "CreateChallengeView",
  data() {
    return {
      categories: [],
      challenge: {
        title: "",
        description: "",
        category: "",
        file: null,
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/program-a/categories');
        this.categories = response.data.categories;
      }
      catch (error) {
        console.error("Fetch error:", error);
      }
    },
    handleFileUpload(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.challenge.file = selectedFile;
      }
    },
    removeFile() {
      this.challenge.file = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    async submitChallenge() {
      try {
        const formData = new FormData();
        formData.append('name_of_challenge', this.challenge.title);
        formData.append('description_of_challenge', this.challenge.description);
        formData.append('category_of_challenge_id', this.challenge.category);
        if (this.challenge.file) {
          formData.append('proposal_implemenation_file', this.challenge.file);
        }
        await axios.post('http://localhost:8080/api/auth/program-a/create-challenge', formData);
        alert(`Výzva "${this.challenge.title}" bola úspešne odoslaná na schválenie.`);
        this.$router.push('/student-dashboard');
      }
      catch (error) {
        alert("Chyba pri odoslaní výzvy.");
        console.error("Chyba pri odoslaní výzvy:", error);
      }
    },
  },
};
</script>