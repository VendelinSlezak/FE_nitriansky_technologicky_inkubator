<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ChallengeComponent',
    props: {
        challenge: {
            type: Object,
            required: true
        }
    }
})
</script>

<template>
    <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group">
    
    <div :class="['h-2 w-full', challenge.program === 'A' ? 'bg-blue-600' : 'bg-emerald-600']"></div>
    
    <div class="p-8 flex flex-col h-full">
    <div class="flex justify-between items-start mb-6">
        <span :class="[
        'px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase',
        challenge.program === 'A' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
        ]">
        Program {{ challenge.program }}
        </span>
    </div>

    <h3 class="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
        {{ challenge.title }}
    </h3>
    
    <p class="text-slate-500 mb-8 leading-relaxed flex-1">
        {{ challenge.description }}
    </p>

    <div class="py-5 border-t border-slate-100 mt-auto">
        <div v-if="challenge.program === 'A'" class="flex items-center justify-between">
        <div>
            <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kategória</span>
            <span class="font-bold text-slate-700">{{ challenge.category }}</span>
        </div>
        <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
        </div>
        <div v-else class="flex items-center justify-between">
        <div>
            <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Finančná odmena</span>
            <span class="text-xl font-black text-emerald-600">{{ challenge.reward }} €</span>
        </div>
        <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        </div>
    </div>

    <router-link :to="{name: 'challenge', params: {id: challenge.id}}" class="mt-4 block">
        <button class="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
        Zobraziť detaily
        </button>
    </router-link>
    </div>
</div>
</template>