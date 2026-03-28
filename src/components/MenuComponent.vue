<template>
  <nav class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between xl:justify-center max-w-full">
      
      <router-link to="/" class="flex items-center group transition-transform hover:scale-[1.02] flex-shrink-0 xl:mr-10">
        <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-2 md:mr-3 shadow-md">
          <span class="text-white font-black text-lg md:text-xl italic">NTI</span>
        </div>
        <div class="flex flex-col leading-tight">
          <span class="text-lg md:text-xl font-extrabold tracking-tight text-gray-900 uppercase leading-none">NTI</span>
          <span class="text-[8px] md:text-[10px] font-semibold text-blue-600 uppercase tracking-widest mt-1">Technologický Inkubátor</span>
        </div>
      </router-link>

      <div class="hidden xl:flex items-center">
        <div class="flex items-center gap-1">
          <router-link
              v-for="link in navLinks"
              :key="link.name"
              :to="link.path"
              v-slot="{ isActive }"
          >
            <span
              :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                  isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
              ]"
            >
              {{ link.name }}
            </span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4 border-l border-gray-200 pl-6 ml-6">
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="text-gray-500 hover:text-blue-600 text-sm font-bold transition-colors whitespace-nowrap">
              PRIHLÁSENIE
            </router-link>
            <router-link to="/register" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-black shadow-lg shadow-blue-200 transition-all transform active:scale-95 whitespace-nowrap">
              REGISTRÁCIA
            </router-link>
          </template>
          <template v-else>
            <button 
              @click="handleLogout" 
              class="px-5 py-2.5 rounded-full text-sm font-black transition-all transform active:scale-95 whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              ODHLÁSIŤ SA
            </button>

            <div class="flex items-center gap-3 mr-2">
              <div class="flex flex-col items-end leading-tight">
                <span class="text-sm font-bold text-gray-900">{{ user.name }}</span>
                <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{{ user.role }}</span>
              </div>
              <div class="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                <img v-if="user.avatar" :src="user.avatar" alt="User" class="w-full h-full object-cover">
                <span v-else>{{ userInitials }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <button 
        @click="toggleMenu" 
        class="xl:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none transition-colors"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-show="isOpen" class="xl:hidden bg-white border-t border-gray-100 w-full shadow-xl overflow-hidden">
        <div class="px-4 py-6 space-y-1">
          
          <div v-if="isLoggedIn" class="flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-2xl mb-4">
            <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {{ userInitials }}
            </div>
            <div>
              <div class="font-bold text-gray-900">{{ user.name }}</div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">{{ user.role }}</div>
            </div>
          </div>

          <router-link
              v-for="link in navLinks"
              :key="link.name"
              :to="link.path"
              @click="closeMenu"
              class="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-semibold transition-colors"
          >
            {{ link.name }}
          </router-link>
          
          <div class="pt-6 pb-2 border-t border-gray-100 mt-4 space-y-4 px-2">
            <template v-if="!isLoggedIn">
              <router-link to="/login" @click="closeMenu" class="block text-center text-gray-600 font-bold py-2">
                PRIHLÁSENIE
              </router-link>
              <router-link to="/register" @click="closeMenu" class="block text-center bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">
                REGISTRÁCIA
              </router-link>
            </template>
            <button v-else @click="handleLogout" class="w-full text-center bg-gray-900 text-white py-4 rounded-2xl font-black shadow-lg uppercase">
               ODHLÁSIŤ SA
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'MenuComponent',
  data() {
    return {
      isOpen: false,
      isLoggedIn: true, 
      user: {
        name: 'Ján Novák',
        role: 'Študent',
        avatar: null
      },
      navLinks: [
        { name: 'Domov', path: '/' },
        { name: 'O nás', path: '/o-nas' },
        { name: 'Grantový program', path: '/program-a' },
        { name: 'Živá prax', path: '/program-b' },
        { name: 'Partneri', path: '/partneri-a-mentori' },
        { name: 'Novinky', path: '/novinky' },
      ]
    }
  },
  computed: {
    userInitials() {
      if (!this.user.name) return '?';
      return this.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
  },
  methods: {
    handleLogout() {
      console.log("Odhlasujem...");
      this.isLoggedIn = false;
      this.closeMenu();
      // Tu pridaj logiku na premazanie tokenu a redirect na home
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },
    handleResize() {
      if (window.innerWidth >= 1280 && this.isOpen) {
        this.closeMenu();
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.body.style.overflow = '';
  }
}
</script>