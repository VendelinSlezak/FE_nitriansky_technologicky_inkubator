<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProgramStepComponent',
    props: {
        steps: {
            type: Array,
            required: true
        },
        getIcon: {
            type: Function,
            required: true
        }
    },
    computed: {
        theme() {
            const isSpecialPage = this.$route.path.includes('program-b');

            if (isSpecialPage) {
                return {
                border: 'border-l-green-500',
                iconBg: 'bg-green-100',
                text: 'text-green-600'
                };
            }
            return {
                border: 'border-l-blue-600',
                iconBg: 'bg-blue-100',
                text: 'text-blue-600'
            };
    }
  }
})
</script>
<template>
    <div class="max-w-4xl mx-auto space-y-4">
  <div v-for="(step, index) in steps" :key="'step-' + index" 
    class="bg-white p-6 rounded-xl border-l-4 shadow-sm flex items-start gap-5 transition-transform hover:scale-[1.01]"
    :class="theme.border"> <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" 
      :class="[theme.iconBg, theme.text]"
      v-html="getIcon(step.icon)">
    </div>

    <div>
      <span class="text-xs font-bold uppercase tracking-wide" :class="theme.text">
        Krok {{ index + 1 }}
      </span>
      
      <h4 class="text-xl font-bold mb-1 text-slate-800">
        {{ step.title }}
      </h4>
      
      <p class="text-slate-600 leading-relaxed">
        {{ step.description }}
      </p>
    </div>
  </div>
</div>
</template>