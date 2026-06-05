<template>
  <div class="w-full space-y-12">
    <div>
      <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Správa FAQ</h2>
      <p class="text-slate-500 text-sm">Spravujte otázky a odpovede pre jednotlivé sekcie webu.</p>
    </div>

    <div v-for="(section, sectionKey) in faqData" :key="sectionKey" class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div class="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h3 class="font-bold text-slate-700 uppercase tracking-wider text-sm">{{ section.title }}</h3>
      </div>

      <div class="p-6 space-y-4">
        <div v-for="(faq, index) in section.items" :key="index" class="border border-slate-100 rounded-2xl p-4 transition-all">
          
          <div v-if="editingIndex !== `${sectionKey}-${index}`" class="flex justify-between items-start gap-4">
            <div class="flex-1">
              <h4 class="font-bold text-slate-800 mb-1">Q: {{ faq.question }}</h4>
              <p class="text-sm text-slate-600">A: {{ faq.answer }}</p>
            </div>
            <div class="flex gap-2">
              <button @click="startEdit(sectionKey, index, faq)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button @click="deleteFaq(faq.id, sectionKey, index)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>

          <div v-else class="space-y-3">
            <input v-model="editForm.question" class="w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Otázka" />
            <textarea v-model="editForm.answer" rows="3" class="w-full px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Odpoveď"></textarea>
            <div class="flex justify-end gap-2">
              <button @click="editingIndex = null" class="px-4 py-1.5 text-sm font-bold text-slate-500">Zrušiť</button>
              <button @click="saveEdit(editForm.id, sectionKey, index)" class="px-4 py-1.5 text-sm font-bold bg-blue-600 text-white rounded-lg">Uložiť</button>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-100">
          <h4 class="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Pridať novú otázku</h4>
          <div class="bg-slate-50 rounded-2xl p-4 space-y-3">
            <input v-model="newFaqs[sectionKey].question" class="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-400" placeholder="Zadajte otázku..." />
            <textarea v-model="newFaqs[sectionKey].answer" rows="2" class="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-400" placeholder="Zadajte odpoveď..."></textarea>
            <button 
              @click="addFaq(sectionKey)"
              :disabled="!newFaqs[sectionKey].question || !newFaqs[sectionKey].answer"
              class="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Pridať do {{ section.title }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "EditorEditFAQView",
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      editingIndex: null,
      editForm: { id: null, question: "", answer: "" },
      newFaqs: {
        A: { id: null, question: "", answer: "" },
        B: { id: null, question: "", answer: "" }
      },
      faqData: {
        A: {
          title: "Program A",
          items: []
        },
        B: {
          title: "Program B",
          items: []
        }
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    startEdit(sectionKey, index, faq) {
      this.editingIndex = `${sectionKey}-${index}`;
      this.editForm = { ...faq };
    },
    async saveEdit(id, sectionKey, index) {
      try {
        await axios.post(`${this.backendApiUrl}/api/auth/faq/${id}`, this.editForm);
        this.faqData[sectionKey].items[index] = { ...this.editForm };
        this.editingIndex = null;
      }
      catch (error) {
        alert("Chyba pri ukladaní.");
        console.error("Chyba pri ukladaní FAQ otázky ", error);
      }
    },
    async deleteFaq(id, sectionKey, index) {
      if (confirm("Naozaj chcete vymazať túto otázku?")) {
        try {
          await axios.delete(`${this.backendApiUrl}/api/auth/faq/${id}`);
          this.faqData[sectionKey].items.splice(index, 1);
        }
        catch (error) {
          alert("Chyba pri vymazaní.");
          console.error("Chyba pri vymazaní FAQ otázky ", error);
        }
      }
    },
    async addFaq(sectionKey) {
      try {
        const formData = new FormData();
        formData.append('question', this.newFaqs[sectionKey].question);
        formData.append('answer', this.newFaqs[sectionKey].answer);
        formData.append('type', sectionKey);
        const response = await axios.post(`${this.backendApiUrl}/api/auth/faq/create`, formData);
        this.newFaqs[sectionKey].id = response.data.id;
        this.faqData[sectionKey].items.push({ ...this.newFaqs[sectionKey] });
        this.newFaqs[sectionKey].id = null;
        this.newFaqs[sectionKey].question = "";
        this.newFaqs[sectionKey].answer = "";
      }
      catch (error) {
        alert("Chyba pri pridaní.");
        console.error("Chyba pri pridaní FAQ otázky ", error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get(`${this.backendApiUrl}/api/faq/a`);
        this.faqData.A.items = response.data.data;

        const responseB = await axios.get(`${this.backendApiUrl}/api/faq/b`);
        this.faqData.B.items = responseB.data.data;
      }
      catch (error) {
        console.error("Chyba pri načítaní výziev:", error);
      }
    }
  }
};
</script>