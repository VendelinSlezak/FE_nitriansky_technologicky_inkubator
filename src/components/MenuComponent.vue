<template>
  <nav class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      
      <router-link to="/" class="flex items-center group transition-transform hover:scale-[1.02] flex-shrink-0">
        <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <span class="text-white font-black text-lg md:text-xl italic">NTI</span>
        </div>
        <div class="flex flex-col leading-tight">
          <span class="text-lg md:text-xl font-extrabold tracking-tight text-gray-900 uppercase leading-none">NTI</span>
          <span class="text-[8px] md:text-[10px] font-semibold text-blue-600 uppercase tracking-widest mt-1">Technologický Inkubátor</span>
        </div>
      </router-link>

      <div class="hidden xl:flex items-center space-x-8">
        <div class="flex items-center gap-1">
          <router-link
              v-for="link in visibleLinks"
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

        <div class="flex items-center space-x-6 border-l border-gray-200 pl-8">
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-xs font-black shadow-lg shadow-blue-200 transition-all transform active:scale-95 whitespace-nowrap uppercase tracking-wider">
              PRIHLÁSENIE
            </router-link>
          </template>
          
          <template v-else>
            <div class="flex items-center gap-4">
              
              <component
                :is="user?.role === 'Student' ? 'router-link' : 'div'"
                :to="user?.role === 'Student' ? '/student-dashboard/profile' : null"
                class="flex items-center gap-4 transition-all duration-200"
                :class="{ 'hover:opacity-80 cursor-pointer group': user?.role === 'Student' }"
              >
                <div class="flex flex-col items-end leading-tight">
                  <span 
                    class="text-sm font-bold text-gray-900 transition-colors"
                    :class="{ 'group-hover:text-blue-600': user?.role === 'Student' }"
                  >
                    {{ user.name }}
                  </span>
                  <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    {{ user.role }}
                  </span>
                </div>
                
                <div class="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold overflow-hidden shadow-sm transition-transform"
                    :class="{ 'group-hover:scale-105 group-hover:border-blue-400': user?.role === 'Student' }">
                  <img v-if="user.avatar" :src="user.avatar" alt="User" class="w-full h-full object-cover">
                  <span v-else>{{ userInitials }}</span>
                </div>
              </component>

              <div class="h-8 w-px bg-gray-200 ml-2"></div>

              <button 
                @click="handleLogout" 
                class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="Odhlásiť sa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
              
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
        <div class="px-6 py-6 space-y-1">
          <component
            :is="user?.role === 'Student' ? 'router-link' : 'div'"
            v-if="isLoggedIn"
            :to="user?.role === 'Student' ? '/student-dashboard/profile' : null"
            @click="user?.role === 'Student' ? closeMenu() : null"
            class="flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-2xl mb-4 transition-colors"
            :class="{ 'hover:bg-gray-100 cursor-pointer group': user?.role === 'Student' }"
          >
            <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              {{ userInitials }}
            </div>

            <div>
              <div class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {{ user.name }}
              </div>
              <div class="text-xs text-gray-500 uppercase tracking-widest">
                {{ user.role }}
              </div>
            </div>
          </component>

          <router-link
            v-for="link in visibleLinks"
            :key="link.name"
            :to="link.path"
            @click="closeMenu"
            v-slot="{ isActive }"
          >
            <span
              :class="[
                'block px-4 py-3 rounded-xl font-semibold transition-all duration-200',
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              ]"
            >
              {{ link.name }}
            </span>
          </router-link>
          
          <div class="pt-6 border-t border-gray-100 mt-4 px-2">
            <template v-if="!isLoggedIn">
              <router-link to="/login" @click="closeMenu" class="block text-center bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg uppercase tracking-widest text-sm">
                PRIHLÁSENIE
              </router-link>
            </template>
            <button v-else @click="handleLogout" class="w-full text-center bg-gray-900 text-white py-4 rounded-2xl font-black shadow-lg uppercase tracking-widest text-sm">
               ODHLÁSIŤ SA
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/auth' // Uprav cestu podľa tvojho projektu
import { mapState, mapActions } from 'pinia'

export default {
  name: 'MenuComponent',
  data() {
    return {
      isOpen: false,
      // NavLinks zostávajú v komponente, lebo sú statické pre toto menu
      navLinks: [
        { name: 'Domov', path: '/' },
        { name: 'O nás', path: '/o-nas' },
        { name: 'Grantový program', path: '/program-a' },
        { name: 'Živá prax', path: '/program-b' },
        { name: 'Partneri', path: '/partneri-a-mentori' },
        { name: 'Novinky', path: '/news' },
      ]
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isLoggedIn', 'user', 'userInitials']),

    visibleLinks() {
      let links = [...this.navLinks];
      
      if (this.isLoggedIn && this.user) {
        links.unshift({ 
          name: 'Dashboard', 
          path: this.user.dashboard || '/dashboard' 
        });
      }
      
      return links;
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),

    handleLogout() {
      console.log("Odhlasujem cez Pinia Store...");
      this.logout(); // Zavolá akciu v uložisku
      this.closeMenu();
      this.$router.push('/');
    },

    // UI pomocné metódy zostávajú nezmenené
    toggleMenu() {
      this.isOpen = !this.isOpen;
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },
    handleResize() {
      if (window.innerWidth >= 1200 && this.isOpen) {
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