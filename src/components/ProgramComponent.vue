<template>
    <div class="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div v-for="program in programInfo" :key="program.id"
               class="relative group rounded-3xl p-1 bg-gradient-to-br transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl"
               :class="program.gradient">
            <div class="bg-white rounded-[1.4rem] p-8 md:p-10 h-full flex flex-col relative z-10">
              <h3 class="text-2xl md:text-3xl font-black mb-4 text-slate-800">{{ program.title }}</h3>
              <p class="text-slate-500 mb-8 leading-relaxed">{{ program.description }}</p>

              <ul class="space-y-4 mb-10 flex-1">
                <li v-for="(b, i) in program.benefits" :key="i" class="flex items-center gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                  </div>
                  <span class="text-slate-700 font-medium">{{ b }}</span>
                </li>
              </ul>

              <router-link :to="program.path">
                <button :class="['w-full py-4 rounded-xl font-bold text-white transition-all shadow-md active:scale-95', program.btnClass]">
                  {{ program.cta }}
                </button>
              </router-link>
            </div>
          </div>
        </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProgramComponent',
    props: {
        programInfo:{
            type: Array,
            required: true
        } 
    }
})
</script>
<style scoped>

</style>