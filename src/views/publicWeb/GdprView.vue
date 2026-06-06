<template>
  <div class="bg-gray-50 min-h-screen text-gray-800 font-sans antialiased">
    <header class="bg-gradient-to-r block from-blue-700 to-indigo-800 text-white py-16 px-4 sm:px-6 lg:px-8 text-center shadow-md">
      <div class="max-w-3xl mx-auto">
        <div class="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Ochrana osobných údajov (GDPR)
        </h1>
        <p class="text-lg text-blue-100 max-w-2xl mx-auto">
          Vaše súkromie je pre nás prioritou. Prečítajte si, ako chránime, spracúvame a uchovávame vaše osobné údaje v súlade s európskym nariadením.
        </p>
        <p class="text-sm text-blue-200/80 mt-4 italic">
          Posledná aktualizácia: 25. mája 2026
        </p>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 space-y-12">
        
        <section>
          <h2 class="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 text-sm font-bold">1</span>
            Identifikácia prevádzkovateľa
          </h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            Prevádzkovateľom, ktorý určuje účely a prostriedky spracúvania vašich osobných údajov, je:
          </p>
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:grid sm:grid-cols-2 sm:gap-6 space-y-3 sm:space-y-0 text-sm">
            <div>
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Názov spoločnosti</p>
              <p class="font-medium text-gray-900">[Názov Vašej Firmy s.r.o.]</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sídlo</p>
              <p class="font-medium text-gray-900">[Ulica 123, 811 01 Bratislava]</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">IČO / Registrácia</p>
              <p class="font-medium text-gray-900">[12345678] / Zapísaná v OR SR</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">E-mailový kontakt</p>
              <p class="font-medium text-blue-600 hover:underline">[gdpr@vasafirma.sk]</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 text-sm font-bold">2</span>
            Rozsah a účel spracúvania údajov
          </h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            Spracúvame len tie údaje, ktoré sú nevyhnutné na to, aby sme vám mohli poskytnúť naše služby na profesionálnej úrovni. Ide najmä o tieto kategórie:
          </p>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="border-b border-gray-200 text-gray-500 font-semibold bg-gray-50">
                  <th class="py-3 px-4">Kategória údajov</th>
                  <th class="py-3 px-4">Účel spracúvania</th>
                  <th class="py-3 px-4">Právny základ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-gray-600">
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900">Meno, priezvisko, e-mail</td>
                  <td class="py-3 px-4">Vybavenie objednávky, registrácia účtu</td>
                  <td class="py-3 px-4">Plnenie zmluvy</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900">Fakturačná adresa, IČO</td>
                  <td class="py-3 px-4">Vystavenie daňových dokladov</td>
                  <td class="py-3 px-4">Zákonná povinnosť</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900">E-mailová adresa</td>
                  <td class="py-3 px-4">Zasielanie noviniek (Newsletter)</td>
                  <td class="py-3 px-4">Oprávnený záujem / Súhlas</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-medium text-gray-900">IP adresa, cookies</td>
                  <td class="py-3 px-4">Analýza návštevnosti, optimalizácia webu</td>
                  <td class="py-3 px-4">Oprávnený záujem</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 text-sm font-bold">3</span>
            Vaše práva v zmysle GDPR
          </h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            Nariadenie GDPR vám dáva silné práva na kontrolu toho, ako sa s vašimi informáciami nakladá. Ako dotknutá osoba máte právo:
          </p>
          
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="p-4 rounded-xl border border-gray-100 hover:border-blue-100 bg-white transition shadow-sm">
              <h3 class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span> Právo na prístup
              </h3>
              <p class="text-sm text-gray-500">Môžete od nás požadovať potvrdenie a výpis údajov, ktoré o vás evidujeme.</p>
            </div>
            
            <div class="p-4 rounded-xl border border-gray-100 hover:border-blue-100 bg-white transition shadow-sm">
              <h3 class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span> Právo na opravu
              </h3>
              <p class="text-sm text-gray-500">Ak sú vaše údaje nepresné alebo neaktuálne, kedykoľvek ich na požiadanie opravíme.</p>
            </div>

            <div class="p-4 rounded-xl border border-gray-100 hover:border-blue-100 bg-white transition shadow-sm">
              <h3 class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span> Právo na vymazanie (Zabudnutie)
              </h3>
              <p class="text-sm text-gray-500">Máte právo žiadať vymazanie údajov, ak už pominul účel alebo odvoláte súhlas.</p>
            </div>

            <div class="p-4 rounded-xl border border-gray-100 hover:border-blue-100 bg-white transition shadow-sm">
              <h3 class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span> Právo namietať spracúvanie
              </h3>
              <p class="text-sm text-gray-500">Môžete namietať spracúvanie na účely priameho marketingu vrátane profilovania.</p>
            </div>
          </div>
        </section>

        <section class="grid sm:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Doba uchovávania údajov</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Osobné údaje uchovávame len po dobu nevyhnutnú na splnenie účelu (napr. počas trvania zmluvného vzťahu alebo záručnej doby). Fakturačné údaje uchovávame zo zákona po dobu 10 rokov.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Príjemcovia a tretie strany</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Vaše dáta sú u nás v bezpečí. Pre správny chod služieb využívame overených subdodávateľov (napr. účtovné softvéry, doručovacie služby, analytické nástroje Google), ktorí striktne spĺňajú podmienky GDPR.
            </p>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "GdprView",
  mounted() {
    document.title = "Nitriansky technologický inkubátor";
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>