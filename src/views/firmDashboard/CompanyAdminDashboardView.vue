<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
    <main class="max-w-6xl mx-auto px-6 py-12 space-y-12">
      
      <section class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-black text-slate-900">Správa zamestnancov</h2>
            <p class="text-slate-500 text-sm">Aktuálny počet: {{ employees.length }} / 10</p>
          </div>
          <button 
            @click="showAddEmployee = !showAddEmployee"
            v-if="employees.length < 10"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all"
          >
            {{ showAddEmployee ? 'Zrušiť' : '+ Pridať zamestnanca' }}
          </button>
        </div>

        <div v-if="showAddEmployee" class="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input v-model="newEmp.name" placeholder="Meno" class="px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-blue-400" />
          <input v-model="newEmp.email" placeholder="Email" class="px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-blue-400" />
          <input v-model="newEmp.password" type="password" placeholder="Heslo" class="px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-blue-400" />
          <button @click="addEmployee" class="bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">Uložiť</button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th class="pb-4 px-2">Meno</th>
                <th class="pb-4 px-2">Email</th>
                <th class="pb-4 px-2 text-right">Akcie</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="emp in employees" :key="emp.id" class="text-sm hover:bg-slate-50/50">
                <td class="py-4 px-2 font-bold">{{ emp.name }}</td>
                <td class="py-4 px-2 text-slate-500">{{ emp.email }}</td>
                <td class="py-4 px-2 text-right">
                  <button @click="deleteEmployee(emp.id)" class="text-red-500 hover:text-red-700 font-bold transition-colors">Zmazať</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 mx-auto">
        <h2 class="text-2xl font-black text-slate-900 mb-6">Nový projekt na schválenie</h2>
        <form @submit.prevent="submitProject" class="flex flex-col gap-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label class="font-bold text-slate-700 ml-1">Názov projektu</label>
              <input v-model="projectForm.name_of_challenge" type="text" placeholder="Napr. Modernizácia API" class="w-full px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-400 outline-none transition-all" required />
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-bold text-slate-700 ml-1">Odmena (€)</label>
              <input v-model.number="projectForm.reward" type="number" step="0.01" placeholder="0.00" class="w-full px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-400 outline-none transition-all" required />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 ml-1">Popis projektu</label>
            <textarea v-model="projectForm.description" placeholder="Detailné informácie..." rows="2" class="w-full px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-400 outline-none transition-all"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label class="font-bold text-slate-700 ml-1">Product Owner</label>
              <select v-model="projectForm.product_owner_id" class="w-full px-5 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-400 outline-none transition-all" required>
                <option value="" disabled>Vyberte zodpovednú osobu</option>
                <option v-for="emp in employees" :key="emp.id" :value="emp.id">{{ emp.name }}</option>
              </select>
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-bold text-slate-700 ml-1">Dokumentácia (PDF/DOCX)</label>
              <div class="relative group">
                <input type="file" ref="fileInput" @change="handleFileChange" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div class="w-full px-5 py-3 rounded-xl border-2 border-dashed border-slate-200 group-hover:border-blue-400 bg-slate-50 flex items-center gap-3 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span class="text-sm text-slate-500 italic truncate">{{ projectForm.fileName || 'Vybrať súbor...' }}</span>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="mt-4 w-full bg-blue-600 text-white py-4 rounded-xl font-black shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-[0.98]">
            Odoslať výzvu administrátorovi
          </button>
        </form>
      </section>

      <section v-for="section in projectSections" :key="section.id" class="space-y-4">
        <h3 class="text-xl font-black flex items-center gap-3">
          <div :class="[section.color, 'w-3 h-3 rounded-full']"></div>
          {{ section.title }}
        </h3>
        
        <div class="grid grid-cols-1 gap-4">
          <div 
            v-for="project in section.items" 
            :key="project.id" 
            @click="toggleProject(project.id)"
            class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-300 transition-all overflow-hidden"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-bold text-slate-800 text-lg">{{ project.name_of_project }}</h4>
                <p class="text-xs text-slate-400 uppercase font-bold tracking-wider">Product Owner: {{project.product_owner_name}}</p>
              </div>
              <div class="flex items-center gap-4">
                <a v-if="project.fileUrl" :href="project.fileUrl" :download="project.fileName" @click.stop class="flex items-center gap-2 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 px-3 py-2 rounded-xl transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span class="text-[10px] font-bold uppercase">Dokumentácia</span>
                </a>
                <div class="text-right hidden sm:block">
                  <span class="text-sm font-bold text-slate-600">{{ project.name_of_team || 'Čaká na priradenie' }}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 transition-transform duration-300" :class="{ 'rotate-180': expandedProjects.includes(project.id) }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div v-if="expandedProjects.includes(project.id)" class="mt-6 pt-6 border-t border-slate-100 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <p class="text-[10px] text-slate-400 uppercase font-black tracking-widest">Popis projektu</p>
                    <p class="text-slate-600 text-sm mt-1 leading-relaxed">{{ project.description || 'Bez popisu.' }}</p>
                  </div>
                  <div class="bg-blue-50 p-4 rounded-2xl">
                    <p class="text-[10px] text-blue-400 uppercase font-black tracking-widest">Finančná odmena</p>
                    <p class="text-2xl font-black text-blue-600 mt-1">{{ project.reward ? project.reward + ' €' : '0.00 €' }}</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <div v-if="project.team_members && project.team_members.length > 0">
                    <p class="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Realizačný tím: {{ project.name_of_team }}</p>
                    <div class="space-y-2">
                      <div v-for="member in project.team_members" :key="member.email" class="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <div class="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                          {{ member.name.charAt(0) }}
                        </div>
                        <div>
                          <p class="text-xs font-bold text-slate-700">{{ member.name }}</p>
                          <p class="text-[10px] text-slate-400">{{ member.email }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="project.status === 'finished'" class="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    <p class="text-[10px] text-emerald-500 uppercase font-black tracking-widest">Záverečné zhodnotenie</p>
                    <p class="text-slate-700 text-sm italic mt-1 leading-relaxed">
                      "{{ project.globalComment || 'Projekt bol úspešne odovzdaný bez ďalších komentárov.' }}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AdminDashboard",
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      showAddEmployee: false,
      expandedProjects: [],
      employees: [
        { id: 1, name: "Igor Hnát", email: "hnat@firma.sk" },
        { id: 2, name: "Jana Kováčová", email: "kovacova@firma.sk" }
      ],
      newEmp: { name: '', email: '', password: '' },
      projectForm: { 
        name_of_challenge: '', description: '', reward: null, product_owner_id: '',
        documentation: null, fileName: '', fileUrl: null
      },
      projects: []
    };
  },
  computed: {
    projectSections() {
      return [
        { id: 'open', title: 'Aktívne ponuky', color: 'bg-emerald-400', items: this.projects.filter(p => p.status === 'open') },
        { id: 'in_progress', title: 'V realizácii', color: 'bg-blue-500', items: this.projects.filter(p => p.status === 'in_progress') },
        { id: 'finished', title: 'Ukončené', color: 'bg-slate-900', items: this.projects.filter(p => p.status === 'finished') }
      ];
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${this.backendApiUrl}/api/auth/company/members`);
        this.employees = response.data;

        const responseProjects = await axios.get(`${this.backendApiUrl}/api/auth/company/challenges`);
        this.projects = responseProjects.data;
      }
      catch (error) {
        console.error("Chyba pri načítaní dát", error);
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.projectForm.documentation = file;
        this.projectForm.fileName = file.name;
        this.projectForm.fileUrl = '#';
      }
    },
    async addEmployee() {
      if (this.employees.length < 10 && this.newEmp.name) {
        try {
          const response = await axios.post(`${this.backendApiUrl}/api/auth/company/create-member`, {
            name: this.newEmp.name,
            email: this.newEmp.email,
            password: this.newEmp.password
          });
          this.employees.push({ ...this.newEmp, id: response.data.id });
          this.newEmp = { name: '', email: '', password: '' };
          this.showAddEmployee = false;
        }
        catch (error) {
          alert("Chyba pri vytváraní zamestnanca.");
        }
      }
    },
    async deleteEmployee(id) {
      try {
        await axios.delete(`${this.backendApiUrl}/api/auth/company/member/${id}`);
        this.employees = this.employees.filter(e => e.id !== id);
      }
      catch (error) {
        alert("Chyba pri odstránení zamestnanca.");
      }
    },
    toggleProject(projectId) {
      const index = this.expandedProjects.indexOf(projectId);
      if (index > -1) {
        this.expandedProjects.splice(index, 1);
      } else {
        this.expandedProjects.push(projectId);
      }
    },
    async submitProject() {
      try {
        const formData = new FormData();
        formData.append('name_of_challenge', this.projectForm.name_of_challenge);
        formData.append('description_of_challenge', this.projectForm.description);
        formData.append('reward', this.projectForm.reward);
        formData.append('product_owner_id', this.projectForm.product_owner_id);
        formData.append('documentation_file', this.projectForm.documentation);
        const response = await axios.post(`${this.backendApiUrl}/api/auth/program-b/create`, formData);
        alert("Projekt bol úspešne odoslaný.");
        this.projectForm = { name_of_challenge: '', description: '', reward: null, product_owner_id: '', documentation: null, fileName: '', fileUrl: null };
        if (this.$refs.fileInput) this.$refs.fileInput.value = '';
      }
      catch (error) {
        alert("Chyba pri odoslaní projektu.");
      }
    }
  }
};
</script>