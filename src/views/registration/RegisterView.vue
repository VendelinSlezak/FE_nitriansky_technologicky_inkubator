<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="max-w-4xl w-full">
      
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
          Registrácia do <span class="text-blue-600">NTI</span>
        </h1>
        <p class="text-gray-500 mt-4 font-medium text-lg">
          Vyberte si typ účtu a začnite svoju cestu v inkubátore
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        
        <div 
          @click="$router.push('/register-student')"
          class="group bg-white p-8 rounded-3xl shadow-xl shadow-blue-100 border-2 border-transparent hover:border-blue-600 transition-all cursor-pointer transform hover:-translate-y-2"
        >
          <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h2 class="text-2xl font-black text-gray-900 mb-3 uppercase">Študent</h2>
          <p class="text-gray-600 text-sm leading-relaxed mb-8">
            Hľadáš stáž, prax alebo chceš rozbehnúť vlastný projekt? Pridaj sa k nám a získaj prístup k mentorom a prostriedkom.
          </p>
          <div class="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider">
            Registrovať sa ako študent
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        <div 
          @click="$router.push('/register-firm')"
          class="group bg-white p-8 rounded-3xl shadow-xl shadow-blue-100 border-2 border-transparent hover:border-blue-600 transition-all cursor-pointer transform hover:-translate-y-2"
        >
          <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 class="text-2xl font-black text-gray-900 mb-3 uppercase">Firma / Mentor</h2>
          <p class="text-gray-600 text-sm leading-relaxed mb-8">
            Hľadáte talenty, chcete podporiť inovácie alebo sa stať partnerom našich programov? Vstúpte do ekosystému NTI.
          </p>
          <div class="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider">
            Registrovať firmu
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-500 font-medium">
          Už máte vytvorený účet? 
          <router-link to="/login" class="text-blue-600 font-bold hover:underline ml-1">
            Prihláste sa tu
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
}
</script>