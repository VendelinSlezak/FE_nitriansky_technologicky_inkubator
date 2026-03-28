<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      navLinks: [
        { name: 'Domov', path: '/' },
        { name: 'O nás', path: '/o-nas' },
        { name: 'Novinky', path: '/news' },
      ],
    }
  },
}
</script>

<template>
  <footer class="bg-white border-t border-gray-100">
    <div class="container mx-auto px-6 pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <div class="space-y-6">
          <router-link to="/" class="flex items-center group">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <span class="text-white font-black text-lg italic">NTI</span>
            </div>
            <span class="text-xl font-extrabold tracking-tight text-gray-900 uppercase">NTI</span>
          </router-link>
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs">
            Nitriansky Technologický inkubátor pomáha nápadom rásť. Prepájame inovátorov, mentorov a investorov do jedného ekosystému.
          </p>
        </div>

        <div>
          <h4 class="text-gray-900 font-bold uppercase text-xs tracking-widest mb-6">Navigácia</h4>
          <ul class="space-y-4">
            <li v-for="link in navLinks" :key="link.name">
              <router-link :to="link.path" class="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-gray-900 font-bold uppercase text-xs tracking-widest mb-6">Naše aktivity</h4>
          <ul class="space-y-4">
            <li>
              <router-link to="/program-a" class="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
                Grantový inkubačný program
              </router-link>
            </li>
            <li>
              <router-link to="/program-b" class="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
                Program živej praxe
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-gray-900 font-bold uppercase text-xs tracking-widest mb-6">Kontakt</h4>
          <div class="space-y-4">
            <div class="flex items-start group">
            <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-blue-600 group-hover:text-white transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            </div>
            <p class="text-gray-500 text-sm leading-snug">
                Ilkovičova 2, <br>841 04 Bratislava
            </p>
            </div>

            <a href="mailto:info@nti.sk" class="flex items-center group">
            <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-blue-600 group-hover:text-white transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
            </div>
            <span class="text-gray-500 group-hover:text-blue-600 text-sm transition-colors">info@nti.sk</span>
            </a>

            <a href="tel:+421900000000" class="flex items-center group">
            <div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-blue-600 group-hover:text-white transition-colors">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
            </div>
            <span class="text-gray-500 group-hover:text-blue-600 text-sm transition-colors">+421 900 000 000</span>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p class="text-gray-400 text-xs font-medium">
          &copy; {{ currentYear }} Nitriansky Technologický Inkubátor. Všetky práva vyhradené.
        </p>
        <div class="flex space-x-8 mt-4 md:mt-0">
          <router-link to="/gdpr" class="text-gray-400 hover:text-gray-600 text-xs transition-colors">Ochrana osobných údajov</router-link>
          <router-link to="/cookies" class="text-gray-400 hover:text-gray-600 text-xs transition-colors">Cookies</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>