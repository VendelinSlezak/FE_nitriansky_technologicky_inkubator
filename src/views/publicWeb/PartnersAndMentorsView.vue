<template>
  <div class="min-h-screen bg-white font-sans text-slate-900">
    <section class="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16 lg:py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Naši partneri a mentori
          </h1>
          <p class="text-xl text-purple-100 leading-relaxed">
            Spolupracujeme s poprednými firmami a skúsenými odborníkmi, ktorí podporujú
            rozvoj technologických talentov.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center text-slate-800">
          Výhody partnerstva s NTI
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div v-for="(benefit, index) in benefits" :key="index" 
               class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
            <div class="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4" 
                 v-html="getIcon(benefit.icon)">
            </div>
            <h3 class="text-lg font-bold mb-2">{{ benefit.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-slate-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center text-slate-800">Partnerské firmy</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div v-for="(partner, index) in partners" :key="index" 
               class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div class="p-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-inner">
                {{ partner.name.substring(0, 2) }}
              </div>
              <h3 class="text-xl font-bold mb-2 text-slate-800">{{ partner.name }}</h3>
              <span class="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold mb-4">
                {{ partner.category }}
              </span>
              <p class="text-sm text-slate-600 mb-6 leading-relaxed">{{ partner.description }}</p>
              <div class="pt-4 border-t border-slate-50 text-sm">
                <span class="font-bold text-purple-600">{{ partner.projects }} projektov</span>
                <span class="text-slate-500 ml-1 font-medium">realizovaných s NTI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center text-slate-800">Naši mentori</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div v-for="(mentor, index) in mentors" :key="index" 
               class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 mx-auto mb-6 p-1">
              <div class="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                 <svg class="w-12 h-12 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
            </div>
            <h3 class="text-lg font-bold mb-4 text-slate-800 leading-tight h-12 flex items-center justify-center">{{ mentor.name }}</h3>
            <div class="space-y-4 text-left text-sm bg-slate-50 p-4 rounded-xl">
              <div>
                <div class="font-bold text-slate-700 mb-1">Expertíza:</div>
                <div class="text-slate-600 leading-snug">{{ mentor.expertise }}</div>
              </div>
              <div>
                <div class="font-bold text-slate-700 mb-1">Skúsenosti:</div>
                <div class="text-slate-600">{{ mentor.experience }}</div>
              </div>
              <div class="pt-3 border-t border-slate-200">
                <span class="font-bold text-purple-600">{{ mentor.projects }} projektov</span>
                <span class="text-slate-500 ml-1 italic">ako mentor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gradient-to-r from-purple-700 to-purple-900 text-white text-center">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Staňte sa naším partnerom</h2>
          <p class="text-xl mb-10 text-purple-100 leading-relaxed">
            Pripojte sa k našej komunite firiem a odborníkov, ktorí podporujú technologické talenty.
          </p>
          <div class="flex justify-center">
            <RouterLink to="/register-firm" class="px-10 py-4 bg-white text-purple-800 font-bold rounded-xl shadow-lg hover:bg-purple-50 transition-all duration-200">
              Registrovať firmu
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PartnersAndMentorsView",
  data() {
    return {
      partners: [
        { name: "TechCorp Slovakia", category: "Technológie", description: "Líder v oblasti vývoja softvéru a cloudových riešení", projects: 8 },
        { name: "InnoSoft Solutions", category: "IT služby", description: "Poskytovateľ komplexných IT riešení pre firmy", projects: 6 },
        { name: "DataVision Analytics", category: "Data & AI", description: "Špecialista na dátovú analytiku a AI aplikácie", projects: 5 },
        { name: "MobileDev Studio", category: "Mobilné aplikácie", description: "Tvorba mobilných aplikácií pre iOS a Android", projects: 7 },
        { name: "CloudBase Systems", category: "Cloud & DevOps", description: "Cloudová infraštruktúra a DevOps riešenia", projects: 4 },
        { name: "GameForge Studios", category: "Gaming", description: "Vývoj hier a interaktívnych aplikácií", projects: 3 },
      ],
      mentors: [
        { name: "Ing. Peter Novák, PhD.", expertise: "Softvérová architektúra, Cloud computing", experience: "15+ rokov v IT", projects: 12 },
        { name: "Mgr. Mária Kováčová", expertise: "AI a Machine Learning", experience: "10+ rokov v dátovej vede", projects: 8 },
        { name: "Ing. Ján Horváth", expertise: "Mobilné aplikácie, UX/UI", experience: "12+ rokov v mobile dev", projects: 10 },
        { name: "Ing. Eva Tóthová", expertise: "Web development, Full-stack", experience: "8+ rokov vo vývoji", projects: 9 },
      ],
      benefits: [
        { icon: "building", title: "Prístup k talentom", description: "Spolupracujte s najlepšími študentmi a absolventmi" },
        { icon: "users", title: "Employer branding", description: "Budujte si značku zamestnávateľa medzi študentmi" },
        { icon: "award", title: "Inovatívne projekty", description: "Realizujte projekty s podporou NTI" },
        { icon: "handshake", title: "Dlhodobé partnerstvo", description: "Staňte sa súčasťou ekosystému NTI" },
      ],
      iconPaths: {
        building: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>',
        users: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        award: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
        handshake: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2 6-6"/><path d="M18 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/></svg>'
      }
    };
  },
  methods: {
    getIcon(name) {
      return this.iconPaths[name] || '';
    }
  }
};
</script>