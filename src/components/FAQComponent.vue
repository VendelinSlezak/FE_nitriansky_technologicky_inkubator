<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FAQComponent',
  props: {
    faqItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeIndex: null,
    };
  },
  computed: {
    theme() {
      const isSpecialPage = this.$route.path.includes('program-b');

      if (isSpecialPage) {
        return {
          border: 'border-l-green-500',
          activeText: 'text-green-600',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        };
      }

      return {
        border: 'border-l-blue-600',
        activeText: 'text-blue-600',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      };
    }
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    }
  }
});
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-4" style="margin-top: 3%; margin-bottom: 3%;">
    <div 
      v-for="(item, index) in faqItems" 
      :key="'faq-' + index"
      class="bg-white rounded-xl border-l-4 shadow-sm overflow-hidden transition-all duration-300"
      :class="[theme.border, activeIndex === index ? 'scale-[1.01]' : '']"
    >
      <button 
        @click="toggle(index)"
        class="w-full p-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span 
          class="text-lg font-bold transition-colors"
          :class="activeIndex === index ? theme.activeText : 'text-slate-800'"
        >
          {{ item.question }}
        </span>
        
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
          :class="[theme.iconBg, theme.iconColor, activeIndex === index ? 'rotate-180' : '']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div 
        v-show="activeIndex === index"
        class="px-6 pb-6"
      >
        <div class="border-t border-slate-100 pt-4 text-slate-600 leading-relaxed">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>