<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center">
    <div class="max-w-5xl w-full mx-auto space-y-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <router-link to="/mentor-dashboard" class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 mb-2 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Späť na prehľad
          </router-link>
          <h1 class="text-3xl font-black text-gray-900 mt-5 mb-5">{{ project.title }}</h1>
          <p class="text-gray-500 font-medium tracking-wide uppercase text-xs mt-1">
            ID Projektu: #{{ project.id }} • Tím: {{ project.teamName }}
          </p>
        </div>
        <div class="flex gap-2">
          <span :class="['px-3 py-1 rounded-full text-xs font-bold uppercase border', getProgramClass(project.program)]">
            {{ project.program }}
          </span>
        </div>
      </div>

      <section class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <button @click="ui.infoExpanded = !ui.infoExpanded" class="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
            <div class="w-10 h-10 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Podrobné informácie o projekte</h2>
            </div>
            <svg :class="{'rotate-180': ui.infoExpanded}" class="w-6 h-6 transform transition-transform text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        
        <div v-if="ui.infoExpanded" class="p-6 md:p-8 border-t border-gray-100 bg-gray-50/30 space-y-8">
            
            <div class="space-y-3">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Zadanie projektu
            </h3>
            <p class="text-gray-700 leading-relaxed text-lg">{{ project.description }}</p>
            </div>

            <div class="pt-6 border-t border-gray-100 space-y-4">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest">Prílohy a dokumentácia</h3>
            <div class="flex flex-col gap-2">
                <a v-for="file in project.attachments" :key="file.name" :href="file.url" class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all group shadow-sm">
                <span class="font-bold text-sm">{{ file.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                </a>
            </div>
            </div>

            <div class="pt-6 border-t border-gray-100 space-y-4">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest">Členovia tímu</h3>
            <div class="space-y-3">
                <div v-for="member in project.members" :key="member.id" class="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {{ member.initials }}
                    </div>
                    <div>
                    <div class="text-sm font-bold text-gray-900">{{ member.name }}</div>
                    <div class="text-[10px] text-gray-500 uppercase font-medium tracking-tight">{{ member.email }}</div>
                    </div>
                </div>
                <span 
                    :class="member.role === 'Teamleader' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-gray-50 text-gray-500 border-gray-200'" 
                    class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border"
                >
                    {{ member.role }}
                </span>
                </div>
            </div>
            </div>

        </div>
      </section>

      <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div class="w-full flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-800">Chat s Teamleadrom</h2>
            </div>
        </div>

        <div class="bg-gray-50 rounded-xl border border-gray-100 flex flex-col h-[400px]">
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div v-for="msg in project.messages" :key="msg.id" :class="{'flex justify-end': msg.sender === 'Mentor'}">
              <div :class="['max-w-[80%] p-4 rounded-2xl text-sm shadow-sm', msg.sender === 'Mentor' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none']">
                <div class="font-black text-[10px] uppercase mb-1 opacity-70">{{ msg.sender }} • {{ msg.time }}</div>
                {{ msg.text }}
              </div>
            </div>
          </div>
          <div class="p-4 bg-white border-t border-gray-100 rounded-b-xl flex gap-2">
            <input v-model="ui.newMessage" type="text" placeholder="Napíšte správu teamleadrovi..." class="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" @keyup.enter="sendMessage">
            <button @click="sendMessage" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 class="text-2xl font-black text-gray-900 mb-8">Míľniky projektu</h2>
        
        <div class="space-y-10 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-100">
            <div v-for="(milestone, index) in project.milestones" :key="milestone.id" class="relative pl-12">
            
            <div :class="['absolute left-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-sm z-10 transition-colors', milestone.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500']">
                <svg v-if="milestone.completed" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                <span v-else class="text-xs font-black">{{ index + 1 }}</span>
            </div>

            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div class="flex justify-between items-start mb-3">
                <h4 class="text-lg font-bold text-gray-900">{{ milestone.title }}</h4>
                <span class="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">
                    Termín: {{ milestone.deadline }}
                </span>
                </div>
                
                <p class="text-gray-600 text-sm leading-relaxed mb-6">{{ milestone.goal }}</p>

                <div class="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-inner">
                <div class="flex items-center gap-2 mb-2">
                    <span class="flex h-2 w-2 rounded-full bg-green-500"></span>
                    <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aktuálne zverejnený komentár pre tím</span>
                </div>
                <p v-if="milestone.mentorComment" class="text-sm text-gray-700 italic">
                    "{{ milestone.mentorComment }}"
                </p>
                <p v-else class="text-sm text-gray-400 italic">
                    Zatiaľ nebol zverejnený žiadny komentár.
                </p>
                </div>

                <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <label class="text-[10px] font-black text-blue-600 uppercase tracking-widest">Váš pracovný koncept (neuložené)</label>
                    <span v-if="isChanged(index)" class="text-[9px] font-bold text-amber-500 animate-pulse uppercase">Máte neuložené zmeny</span>
                </div>
                
                <textarea 
                    v-model="ui.milestoneDrafts[index]" 
                    rows="3" 
                    class="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm placeholder:text-gray-300" 
                    placeholder="Tu napíšte novú spätnú väzbu pre tím..."
                ></textarea>
                
                <div class="flex justify-end">
                    <button 
                    @click="saveMilestoneComment(index)" 
                    :disabled="!isChanged(index)"
                    :class="[
                        'px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 shadow-md active:scale-95',
                        isChanged(index) 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    ]"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                    PUBLIKOVAŤ KOMENTÁR TÍMU
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

      <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 class="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
            Plánované konzultácie
        </h2>

        <div class="space-y-3 mb-10">
            <div 
            v-for="meeting in project.consultations" 
            :key="meeting.id" 
            class="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors"
            >
            <div class="flex items-center gap-5">
                <div :class="meeting.type === 'online' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'" class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg v-if="meeting.type === 'online'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </div>

                <div>
                <div class="flex items-center gap-3 mb-1">
                    <span class="text-lg font-bold text-gray-900">{{ meeting.date }} o {{ meeting.time }}</span>
                    <span :class="['text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border', meeting.type === 'online' ? 'bg-purple-50 border-purple-100 text-purple-600' : 'bg-orange-50 border-orange-100 text-orange-600']">
                    {{ meeting.type }}
                    </span>
                </div>
                <div class="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <span class="opacity-70">{{ meeting.type === 'online' ? 'Link:' : 'Miesto:' }}</span>
                    <a v-if="meeting.type === 'online'" :href="meeting.location" target="_blank" class="text-blue-600 hover:underline font-bold">{{ meeting.location }}</a>
                    <span v-else class="text-gray-800 font-bold">{{ meeting.location }}</span>
                </div>
                </div>
            </div>

            <button 
                @click="deleteConsultation(meeting.id)" 
                class="mt-4 md:mt-0 self-end md:self-center flex items-center gap-1 px-4 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-xs"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                ZMAZAŤ
            </button>
            </div>

            <div v-if="project.consultations.length === 0" class="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p class="text-gray-400 italic">Zatiaľ nie sú naplánované žiadne konzultácie.</p>
            </div>
        </div>

        <div class="p-8 bg-blue-50 rounded-3xl border border-blue-100">
            <h3 class="text-sm font-black text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-2">
            Naplánovať novú konzultáciu
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold text-blue-400 uppercase ml-1">Dátum</label>
                <input v-model="newMeeting.date" type="date" class="bg-white border border-blue-100 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold text-blue-400 uppercase ml-1">Čas</label>
                <input v-model="newMeeting.time" type="time" class="bg-white border border-blue-100 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold text-blue-400 uppercase ml-1">Typ</label>
                <select v-model="newMeeting.type" class="bg-white border border-blue-100 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                <option value="online">Online</option>
                <option value="naživo">Naživo</option>
                </select>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold text-blue-400 uppercase ml-1">{{ newMeeting.type === 'online' ? 'Link na hovor' : 'Miestnosť / Adresa' }}</label>
                <input v-model="newMeeting.location" type="text" class="bg-white border border-blue-100 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" placeholder="...">
            </div>
            </div>
            <button @click="addConsultation" class="mt-6 w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] tracking-widest uppercase text-xs">
            PRIDAŤ KONZULTÁCIU DO ZOZNAMU
            </button>
        </div>
        </section>

    </div>
  </div>
</template>

<script>
export default {
  name: "MentorProjectView",
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      ui: { 
        infoExpanded: false, 
        newMessage: "",
        milestoneDrafts: [] 
      },
      newMeeting: { date: "", time: "", type: "online", location: "" },
      project: {
        id: "501",
        title: "Vývoj mobilnej aplikácie pre seniorov",
        teamName: "SilverTech",
        program: "Program A",
        description: "Cieľom projektu je vytvoriť prístupné používateľské rozhranie pre seniorov, ktoré im umožní jednoducho spravovať pripomienky na lieky a priame spojenie s ošetrujúcim lekárom.",
        attachments: [
          { name: "Specifikacia_v1.pdf", url: "#" },
          { name: "Graficky_navrh.figma", url: "#" }
        ],
        members: [
          { id: 1, name: "Peter Kováč", role: "Teamleader", initials: "PK", email: "peter.kovac@student.sk" },
          { id: 2, name: "Lucia Malá", role: "Člen", initials: "LM", email: "lucia.mala@student.sk" },
          { id: 3, name: "Marek Nový", role: "Člen", initials: "MN", email: "marek.novy@student.sk" }
        ],
        messages: [
          { id: 1, sender: "Teamleader", text: "Dobrý deň, pripravili sme úvodnú analýzu trhu. Mohli by ste sa na to pozrieť?", time: "Včera 14:20" },
          { id: 2, sender: "Mentor", text: "Jasné, pozriem si to dnes večer a napíšem vám komentár k míľniku.", time: "Včera 16:05" }
        ],
        milestones: [
          { id: 1, title: "Analýza a prieskum", deadline: "15.04.2024", goal: "Identifikovať hlavné problémy cieľovej skupiny cez dotazníky.", mentorComment: "Veľmi dobrý výber respondentov.", completed: true },
          { id: 2, title: "Prototyp aplikácie", deadline: "30.05.2024", goal: "Vytvorenie klikateľného prototypu v nástroji Figma.", mentorComment: "", completed: false }
        ],
        consultations: [
          { id: 1, type: "online", date: "05.04.2024", time: "10:00", location: "https://zoom.us/j/123456" },
          { id: 2, type: "naživo", date: "12.04.2024", time: "14:30", location: "Miestnosť B204" }
        ]
      }
    };
  },
  mounted() {
    this.initDrafts();
  },
  methods: {
    initDrafts() {
      this.ui.milestoneDrafts = this.project.milestones.map(m => m.mentorComment || "");
    },
    isChanged(index) {
      return this.ui.milestoneDrafts[index] !== this.project.milestones[index].mentorComment;
    },
    saveMilestoneComment(index) {
      const updatedText = this.ui.milestoneDrafts[index];
      
      // Simulácia uloženia (v produkcii by tu bol axios call)
      this.project.milestones[index].mentorComment = updatedText;
    },
    getProgramClass(program) {
      return program === 'Program A' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
    },
    sendMessage() {
      if (!this.ui.newMessage.trim()) return;
      this.project.messages.push({
        id: Date.now(),
        sender: "Mentor",
        text: this.ui.newMessage,
        time: "Dnes " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.ui.newMessage = "";
    },
    deleteConsultation(id) {
      this.project.consultations = this.project.consultations.filter(c => c.id !== id);
    },
    addConsultation() {
      if (!this.newMeeting.date || !this.newMeeting.location) return;
      this.project.consultations.push({
        id: Date.now(),
        ...this.newMeeting
      });
      this.newMeeting = { date: "", time: "", type: "online", location: "" };
    }
  }
};
</script>