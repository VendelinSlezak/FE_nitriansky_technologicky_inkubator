<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PartnerCompanyComponent',
    props: {
        partners: {
            type: Array,
            required: true
        }
    }
})
</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-5xl mx-auto items-center">
      <div v-for="(partner, index) in partners" :key="index" 
           class="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center h-28">
        
        <img :src="partner.logo" :alt="partner.name" 
             class="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
             
        </div>
    </div>
</template>
<style scoped>

</style>