<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FAQComponent',
  props: {
  },
  data() {
    return {
      activeIndex: null,
      faqItems: [
        {
          question: "Aké sú technické požiadavky pre implementáciu API?",
          answer: "Naše rozhranie vyžaduje autentifikáciu cez OAuth 2.0 a podporuje formáty JSON. Minimálna verzia TLS pre zabezpečené pripojenie je 1.2. Podrobnú dokumentáciu k endpointom nájdete v sekcii pre vývojárov."
        },
        {
          question: "Akým spôsobom prebieha fakturácia a spracovanie platieb?",
          answer: "Fakturácia prebieha na mesačnej báze s 14-dňovou splatnosťou. Podporujeme SEPA prevody, platobné karty a Stripe. Všetky daňové doklady sú automaticky generované v PDF formáte a dostupné v klientskej zóne."
        },
        {
          question: "Garantujete úroveň dostupnosti služieb (SLA)?",
          answer: "Áno, pre Enterprise klientov garantujeme 99.9% dostupnosť služieb (uptime). V prípade plánovanej údržby systému sú klienti informovaní minimálne 48 hodín vopred prostredníctvom e-mailovej notifikácie a stavového dashboardu."
        },
        {
          question: "Je možné migrovať dáta z iných platforiem?",
          answer: "Poskytujeme natívne importovacie nástroje pre formáty CSV, XML a SQL. Pri prechode z konkurenčných systémov ponúkame asistovanú migráciu, ktorá zahŕňa validáciu integrity dát a mapovanie polí v databáze."
        },
        {
          question: "Ako je zabezpečená ochrana osobných údajov (GDPR)?",
          answer: "Všetky dáta sú šifrované pomocou AES-256 a uložené v dátových centrách na území EÚ. Pravidelne vykonávame penetračné testy a audity bezpečnosti, aby sme zabezpečili súlad s najnovšími štandardmi kybernetickej ochrany."
        }
      ]
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