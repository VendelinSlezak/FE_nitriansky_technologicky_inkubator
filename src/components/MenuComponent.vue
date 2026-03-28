<script>
export default {
    name: 'MenuComponent',
    data() {
        return {
            navLinks: [
                { name: 'Domov', path: '/' },
                { name: 'O nás', path: '/o-nas' },
                { name: 'Grantový inkubačný program', path: '/program-a' },
                { name: 'Program živej praxe', path: '/program-b' },
                { name: 'Partneri a mentori', path: '/partneri-a-mentori' },
                { name: 'Novinky', path: '/novinky' },
            ]
        }
    },
}
</script>

<template>
  <nav class="bg-white shadow-sm border-b border-gray-100">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      
      <router-link to="/" class="flex items-center group transition-transform hover:scale-[1.02]">
        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <span class="text-white font-black text-xl italic">NTI</span>
        </div>
        <div class="flex flex-col leading-tight">
          <span class="text-xl font-extrabold tracking-tight text-gray-900 uppercase">NTI</span>
          <span class="text-[10px] font-semibold text-blue-600 uppercase tracking-widest">Technologický Inkubátor</span>
        </div>
      </router-link>

      <div class="flex items-center space-x-2">
        <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            v-slot="{ isActive }"
        >
            <span
            :class="[
                'px-4 py-2 rounded-lg text-sm transition-all duration-200',
                isActive 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
            ]"
            >
            {{ link.name }}
            </span>
        </router-link>
      </div>

      <div class="flex items-center space-x-6 border-l border-gray-200 pl-8">
        <router-link to="/login" class="text-gray-500 hover:text-blue-600 text-sm font-bold transition-colors">
          PRIHLÁSENIE
        </router-link>
        <router-link to="/register" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-black shadow-lg shadow-blue-200 transition-all transform active:scale-95">
          REGISTRÁCIA
        </router-link>
      </div>

    </div>
  </nav>
</template>

<script scoped>
</script>