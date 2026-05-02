<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
    <header class="bg-gradient-to-br from-slate-700 to-slate-900 text-white py-10 shadow-lg">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-extrabold mb-2">
            Admin
          </h1>
          <p class="text-slate-300">
            Vitajte v administrácii NTI. Tu môžete spravovať obsah webu.
          </p>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 flex-1">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        <aside class="w-full md:w-72 flex-shrink-0">
          <nav class="flex flex-col gap-3">           
            <router-link 
              to="/admin-dashboard/edit-news" 
              class="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-blue-300 group"
              active-class="!border-blue-500 !bg-blue-50 ring-2 ring-blue-500/10"
            >
              <div class="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2v6h6" />
                </svg>
              </div>
              <span class="font-bold text-slate-700">Upraviť novinky</span>
            </router-link>

            <router-link 
              to="/admin-dashboard/edit-faq" 
              class="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-purple-300 group"
              active-class="!border-purple-500 !bg-purple-50 ring-2 ring-purple-500/10"
            >
              <div class="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="font-bold text-slate-700">Upraviť FAQ</span>
            </router-link>
            <router-link 
                to="/admin-dashboard/manage-accounts" 
                class="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-indigo-300 group"
                active-class="!border-indigo-500 !bg-indigo-50 ring-2 ring-indigo-500/10"
                >
                <div class="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <span class="font-bold text-slate-700">Správa účtov</span>
            </router-link>
            <router-link 
                to="/admin-dashboard/manage-teams" 
                class="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-emerald-300 group"
                active-class="!border-emerald-500 !bg-emerald-50 ring-2 ring-emerald-500/10"
                >
                <div class="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <span class="font-bold text-slate-700">Správa tímov</span>
            </router-link>
            <router-link 
                to="/admin-dashboard/manage-challenges" 
                class="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-sky-300 group"
                active-class="!border-sky-500 !bg-sky-50 ring-2 ring-sky-500/10"
                >
                <div class="p-2 bg-sky-100 text-sky-600 rounded-lg group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                </div>
                <span class="font-bold text-slate-700">Správa výziev</span>
            </router-link>
          </nav>
        </aside>

        <section class="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[500px] overflow-hidden">
          <div class="p-8">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "EditorDashboardView",
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>