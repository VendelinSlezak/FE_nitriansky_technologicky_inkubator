<template>
  <div v-if="project" class="max-w-4xl mx-auto pb-20 px-4 pt-8 text-left">
    <router-link to="/committee-member-dashboard" class="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group font-medium text-left">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Späť na dashboard
    </router-link>

    <div class="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div class="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50">
        <div class="flex items-center gap-3 mb-4">
          <span :class="project.program === 'Program A' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'" class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
            {{ project.program }}
          </span>
          <span class="text-slate-400 text-sm font-bold text-left">ID: #{{ project.id }}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight text-left">{{ project.title }}</h1>
        <p class="mt-4 text-slate-400 flex items-center gap-2 text-lg font-medium text-left">
          Tím: <span class="text-slate-700">{{ project.teamName }}</span>
        </p>
      </div>

      <div class="p-8 md:p-10 space-y-12">
        <section class="grid md:grid-cols-2 gap-8 font-medium">
          <div class="space-y-4">
            <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-left">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Zadanie projektu
            </h3>
            <p class="text-slate-700 leading-relaxed text-lg text-left">{{ project.description }}</p>
          </div>
          <div class="space-y-4">
            <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-left">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M13.488 20.93a2 2 0 01-2.827 0l-7.588-7.588a2 2 0 010-2.827l7.588-7.588a2 2 0 012.827 0l7.588 7.588a2 2 0 010 2.827l-7.588 7.588z" />
              </svg>
              Kategória: <span class="text-slate-600 text-left">{{ project.category }}</span>
            </h3>
            <p class="text-slate-500 italic leading-relaxed text-left">{{ project.categoryDescription }}</p>
          </div>
        </section>

        <section v-if="project.program === 'Program B'" class="space-y-4 text-left">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Plánovaný rozpočet</h3>
          <div class="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-900 font-medium leading-relaxed text-left">
            {{ project.budgetPlan }}
          </div>
        </section>

        <section class="space-y-6 font-medium text-left">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 text-left">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.415a6 6 0 108.486 8.486L20.5 13" /></svg>
            Prílohy a dokumentácia
          </h3>
          
          <div v-if="hasAnyFiles" class="flex flex-col gap-5">
            <div v-for="(file, label) in mappedFiles" :key="label">
              <label class="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-wider text-left">{{ label }}</label>
              <a :href="file.url" class="flex items-center justify-between p-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all group">
                <span class="font-bold text-slate-700">{{ file.name }}</span>
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
            </div>
          </div>
        </section>

        <section class="space-y-4 text-left">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest text-left">Členovia tímu</h3>
          <div class="grid sm:grid-cols-2 gap-3 font-medium text-left">
            <div v-for="member in project.members" :key="member.id" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-blue-600 shadow-sm text-xs">
                  {{ member.initials }}
                </div>
                <div>
                  <div class="text-sm font-bold text-slate-900">{{ member.name }}</div>
                  <div class="text-[11px] text-slate-500">{{ member.email }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <section v-if="project.decision" class="mt-16 p-8 md:p-10 border-2 rounded-[2.5rem] relative overflow-hidden text-left transition-all"
      :class="project.decision.status === 'approved' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-amber-50/50 border-amber-100'">
      
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white rounded-lg shadow-sm border border-slate-200" :class="project.decision.status === 'approved' ? 'text-emerald-600' : 'text-amber-600'">
              <svg v-if="project.decision.status === 'approved'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
            </div>
            <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight">
              {{ project.decision.status === 'approved' ? 'Projekt Schválený' : 'Vrátené na dopracovanie' }}
            </h2>
          </div>
        </div>

        <div v-if="project.decision.status === 'approved'" class="grid md:grid-cols-2 gap-6 font-medium">
          <div :class="(!project.decision.poEmail || project.program !== 'Program B') ? 'md:col-span-2' : ''" class="space-y-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pridelený mentor</label>
            <div class="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <span class="font-bold text-slate-700">{{ project.decision.mentorEmail }}</span>
            </div>
          </div>
          <div v-if="project.program === 'Program B' && project.decision.poEmail" class="space-y-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product owner</label>
            <div class="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-emerald-700 font-bold">
              {{ project.decision.poEmail }}
            </div>
          </div>
        </div>

        <div class="space-y-2 pt-4 border-t border-slate-200/60">
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vyjadrenie komisie</label>
          <div class="p-6 bg-white border border-slate-200 rounded-3xl italic text-slate-600 leading-relaxed shadow-sm font-medium">
            "{{ project.decision.committeeComment }}"
          </div>
        </div>
      </div>
    </section>

    <section v-if="isZapisovatel" class="mt-16 p-8 md:p-10 bg-white rounded-[2.5rem] border-2 border-blue-100 shadow-2xl shadow-blue-100/30 text-left">
      <div class="space-y-10">
        <h2 class="text-2xl font-black text-slate-900 tracking-tight italic text-left">Nové rozhodnutie komisie</h2>

        <div class="p-2 bg-slate-100 rounded-2xl flex gap-2">
          <button @click="form.status = 'approved'" class="flex-1 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all" :class="form.status === 'approved' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500'">
            Schváliť
          </button>
          <button @click="form.status = 'returned'" class="flex-1 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all" :class="form.status === 'returned' ? 'bg-white text-amber-600 shadow-md' : 'text-slate-500'">
            Vrátiť
          </button>
        </div>

        <div class="space-y-8"> 
          <template v-if="form.status === 'approved'">
            <div class="grid md:grid-cols-2 gap-6">
              <div> 
                <label class="block mb-3 text-[11px] font-black uppercase tracking-widest ml-1" :class="errors.mentorEmail ? 'text-red-500' : 'text-slate-400'">Pridelený Mentor</label>
                <select v-model="form.mentorEmail" class="w-full p-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" :class="errors.mentorEmail ? 'border-red-300' : 'border-slate-200'">
                  <option value="">Vyberte mentora...</option>
                  <option v-for="m in dostupniMentori" :key="m" :value="m">{{ m }}</option>
                </select>
              </div>
              <div v-if="project.program === 'Program B'">
                <label class="block mb-3 text-[11px] font-black uppercase tracking-widest ml-1" :class="errors.productOwnerEmail ? 'text-red-500' : 'text-slate-400'">Product Owner</label>
                <select v-model="form.poEmail" class="w-full p-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-left" :class="errors.productOwnerEmail ? 'border-red-300' : 'border-slate-200'">
                  <option value="">Vyberte Product Ownera...</option>
                  <option v-for="po in dostupniPO" :key="po" :value="po">{{ po }}</option>
                </select>
              </div>
            </div>
          </template>

          <div>
            <label class="block mb-3 text-[11px] font-black uppercase tracking-widest ml-1" :class="errors.committeeComment ? 'text-red-500' : 'text-slate-400'">
              {{ form.status === 'approved' ? 'Záverečné vyjadrenie' : 'Dôvod vrátenia' }}
            </label>
            <textarea v-model="form.committeeComment" rows="5" class="w-full p-5 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-medium" :class="errors.committeeComment ? 'border-red-300' : 'border-slate-200'"></textarea>
          </div>
        </div>

        <button @click="ulozitRozhodnutie" class="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3">
          Uložiť zápis
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: { id: { type: [String, Number], required: true } },
  data() {
    return {
      isZapisovatel: true,
      project: null,
      dostupniMentori: ['mentor.hlavny@uniba.sk', 'mentor.druhy@uniba.sk'],
      dostupniPO: ['po.firma@startup.sk', 'martin.owner@tech.sk'],
      form: { status: 'approved', mentorEmail: '', poEmail: '', committeeComment: '' },
      errors: { mentorEmail: false, productOwnerEmail: false, committeeComment: false }
    };
  },
  computed: {
    hasAnyFiles() {
      return this.project && (this.project.files.techSpec || this.project.files.implementation || this.project.attachments?.length);
    },
    mappedFiles() {
      const files = {};
      if (this.project.files.techSpec) files['Technická špecifikácia'] = this.project.files.techSpec;
      if (this.project.files.implementation) files['Návrh realizácie'] = this.project.files.implementation;
      return files;
    }
  },
  created() { this.fetchProjectData(); },
  methods: {
    fetchProjectData() {
      this.project = {
        id: this.id || 123,
        title: "Inovatívny systém recyklácie odpadu",
        teamName: "GreenFuture",
        program: "Program B",
        category: "Ekológia",
        categoryDescription: "Zamerané na technologické riešenia udržateľnosti.",
        description: "Vývoj inteligentných senzorov pre smetné nádoby.",
        budgetPlan: "Celkový rozpočet 2 500€ na prototypy.",
        members: [
          { id: 1, name: "Peter Malý", initials: "PM", email: "maly@student.uniba.sk" },
          { id: 2, name: "Lucia Krátka", initials: "LK", email: "kratka@student.uniba.sk" }
        ],
        files: {
          techSpec: { name: "specifikacia.pdf", url: "#" },
          implementation: { name: "navrh.pdf", url: "#" }
        },
        decision: {
          status: 'approved',
          mentorEmail: 'mentor.hlavny@uniba.sk',
          poEmail: 'po.firma@startup.sk',
          committeeComment: 'Projekt vykazuje vysoký potenciál.'
        }
      };
      if (this.project.decision) this.form = { ...this.project.decision };
    },
    ulozitRozhodnutie() {
      this.errors.committeeComment = this.form.committeeComment.length < 5;
      this.errors.mentorEmail = (this.form.status === 'approved' && !this.form.mentorEmail);
      this.errors.productOwnerEmail = (this.form.status === 'approved' && !this.form.poEmail);
      
      if (this.errors.mentorEmail || this.errors.productOwnerEmail || this.errors.committeeComment) return;

      const finalData = { ...this.form };
      if (this.form.status === 'returned') { finalData.mentorEmail = ''; finalData.poEmail = ''; }

      this.project = { ...this.project, decision: finalData };
    }
  }
};
</script>