<template>
  <div class="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="bg-white p-10 rounded-3xl shadow-xl shadow-blue-100 border border-gray-100 w-full max-w-md text-center transform transition-all">
      
      <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-8">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 class="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">
        Žiadosť odoslaná!
      </h1>
      
      <p class="text-gray-600 leading-relaxed font-medium">
        Vaša žiadosť o registráciu bola prijatá. O jej schválení vás budeme informovať 
        emailom a následne sa budete môcť prihlásiť do systému.
      </p>

      <div class="mt-10">
        <router-link 
          to="/" 
          class="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.97] uppercase tracking-widest text-sm"
        >
          Späť na hlavnú stránku
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterSuccessView'
}
</script>