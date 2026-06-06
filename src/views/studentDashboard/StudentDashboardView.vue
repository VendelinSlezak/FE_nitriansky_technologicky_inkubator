<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center font-sans text-gray-900">
    <div class="max-w-4xl w-full mx-auto space-y-10">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div class="space-y-2 text-center md:text-left">
          
          <div v-if="data.status.startsWith('TL_')" class="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full mb-2">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
            <span class="text-[10px] font-black uppercase tracking-widest">Teamleader Dashboard</span>
          </div>
          <div v-else-if="data.status !== 'basic' && data.status !== 'invited'" class="inline-flex items-center gap-2 bg-gray-600 text-white px-3 py-1 rounded-full mb-2">
            <span class="text-[10px] font-black uppercase tracking-widest">Študentský Dashboard</span>
          </div>

          <h1 class="text-4xl font-black text-gray-900 uppercase tracking-tight">
            {{ data.status === 'basic' || data.status === 'invited' ? 'Študentský dashboard' : data.name_of_team }}
          </h1>
          <p v-if="data.status !== 'basic' && data.status !== 'invited'" class="text-gray-500 font-medium">
            Výzva: <span class="text-blue-600 font-bold">{{ data.name_of_project }}</span>
          </p>
        </div>

        <div v-if="data.status === 'team_draft'" class="flex flex-col items-center md:items-end gap-3">
          <div class="flex flex-wrap justify-center gap-3">
            <button @click="odstranitTim" class="bg-white border-2 border-red-100 text-red-500 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95 text-nowrap">
              Odstrániť tím
            </button>
            <button 
              @click="odoslatNaSchvalenie" 
              :disabled="!mozeOdoslat"
              class="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-30 disabled:grayscale active:scale-95 text-nowrap"
            >
              Odoslať na schválenie
            </button>
          </div>
          <p v-if="!mozeOdoslat" class="text-[10px] font-bold text-red-400 uppercase tracking-tight animate-pulse text-center md:text-right">
            <span v-if="!vsetciPozvaniPrijali">Všetci členovia tímu musia prijať pozvánku</span>
          </p>
        </div>

        <div v-else-if="data.status === 'team_waiting_for_approval' || data.status === 'approved_team'" class="flex flex-col items-center md:items-end gap-2">
          <div v-if="data.status === 'team_waiting_for_approval'" class="flex items-center gap-3 bg-amber-50 border-2 border-amber-100 text-amber-700 px-6 py-3 rounded-2xl">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span class="font-black text-xs uppercase tracking-widest">Čaká na schválenie komisiou</span>
          </div>
          <div v-if="data.status === 'approved_team'" class="flex items-center gap-3 bg-green-50 border-2 border-green-100 text-green-700 px-6 py-3 rounded-2xl">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
            <span class="font-black text-xs uppercase tracking-widest">Tím bol schválený</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8">

        <section v-if="data.status === 'basic'" class="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
            <p class="text-blue-800 font-bold text-sm leading-relaxed">
              Momentálne nie ste členom žiadneho tímu. Môžete pridať novú výzvu do programu, vytvoriť vlastný tím alebo počkať na pozvánku.
            </p>
          </div>
          
          <router-link :to="{name: 'vytvorit-vyzvu'}" class="w-full">
            <button class="w-full bg-blue-600 text-white px-6 py-5 rounded-xl hover:bg-blue-700 transition-all font-black uppercase text-xs shadow-lg active:scale-[0.98]">
              Vytvoriť novú výzvu
            </button>
          </router-link>

          <router-link :to="{name: 'vytvorit-tim'}" class="w-full">
            <button class="w-full bg-green-600 text-white px-6 py-5 rounded-xl hover:bg-green-700 transition-all font-black uppercase text-xs shadow-lg active:scale-[0.98]">
              Vytvoriť nový tím
            </button>
          </router-link>
        </section>

        <section v-else-if="data.status === 'invited'" class="bg-white rounded-3xl shadow-xl border-t-8 border-blue-600 overflow-hidden animate-in zoom-in-95 duration-500">
          <div class="p-6 md:p-10 space-y-8">
            <div class="space-y-2">
              <span class="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Nová pozvánka</span>
              <h2 class="text-3xl font-black text-gray-900 pt-2">{{ data.name_of_project }}</h2>
              <p class="text-blue-600 font-black text-xl">Tím: {{ data.name_of_team }}</p>
            </div>

            <div class="space-y-3">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Popis projektu</h3>
              <p class="text-gray-700 leading-relaxed font-medium">{{ data.description_of_project }}</p>
            </div>

            <div class="space-y-3">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Požadované zručnosti</h3>
              <div class="flex flex-col gap-2">
                {{ data.description_of_skills }}
              </div>
            </div>

            <div class="pt-8 border-t border-gray-100 space-y-4">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Čestné vyhlásenie o zručnostiach</h3>
              <a :href="sablonaUrl" class="flex items-center justify-between p-5 bg-blue-50 rounded-2xl text-blue-700 hover:bg-blue-100 transition-all shadow-sm group">
                <span class="text-xs font-black uppercase tracking-wider">Stiahnuť šablónu čestného vyhlásenia</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
              
              <input 
                type="file" 
                ref="fileInput" 
                class="hidden" 
                @change="handleFileUpload" 
                accept=".pdf,.doc,.docx"
              />

              <button 
                @click="$refs.fileInput.click()"
                type="button"
                :class="[
                  'w-full flex items-center justify-center gap-3 p-5 border-2 border-dashed rounded-2xl transition-all',
                  statuory_declaration_file 
                    ? 'bg-green-50 border-green-300 text-green-700 hover:border-green-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="statuory_declaration_file" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span class="text-xs font-black uppercase tracking-wider">
                  {{ statuory_declaration_file ? `Vybraný súbor: ${statuory_declaration_file.name}` : 'Nahrať vyplnený dokument' }}
                </span>
              </button>
            </div>

            <div class="flex flex-col gap-3 pt-6">
              <button 
                @click="prijatPozvanku" 
                :disabled="!statuory_declaration_file"
                class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.1em] shadow-xl active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                Prijať pozvánku a vstúpiť do tímu
              </button>
              <button @click="odmietnutPozvanku" class="w-full bg-white border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-all duration-200">
                Odmietnuť pozvánku
              </button>
            </div>
          </div>
        </section>

        <div v-else class="space-y-8 animate-in fade-in duration-700">
          
          <div v-if="data.status === 'team_waiting_for_approval'" class="bg-white rounded-3xl border border-gray-200 p-6 md:p-10 shadow-sm">
            <h2 class="text-2xl font-black text-gray-900 tracking-tight">Člen tímu {{ data.name_of_team }}</h2>
            <p class="mt-4 text-sm text-gray-500 italic border-l-2 border-gray-200 pl-4">
              Harmonogram a dokumentácia k projektu budú plne sprístupnené po oficiálnom schválení tímu komisiou.
            </p>
          </div>

          <div v-if="data.status === 'approved_team'" class="space-y-8 animate-in slide-in-from-top-4 duration-500">
            
            <section class="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-200 space-y-4">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                O čom je váš projekt
              </h3>
              <p class="text-gray-700 leading-relaxed font-medium text-lg">
                {{ data.description_of_project }}
              </p>
            </section>

            <section class="space-y-4">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Projektová dokumentácia a zdroje
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a :href="data.technical_specification_file.url" class="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group shadow-sm">
                  <span class="font-black text-sm text-gray-700">{{ data.technical_specification_file.name }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </a>
                <a :href="data.proposal_of_implementation_file.url" class="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group shadow-sm">
                  <span class="font-black text-sm text-gray-700">{{ data.proposal_of_implementation_file.name }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </a>
              </div>
            </section>

            <section class="space-y-8">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Časová os a míľniky
              </h3>
              
              <div class="relative space-y-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
                <div v-for="(m, index) in data.milestones" :key="m.id" class="relative pl-12 group">
                  <div :class="['absolute left-0 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-md z-10 transition-colors', m.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 group-hover:bg-gray-300']">
                    <svg v-if="m.done" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                    <span v-else class="text-xs font-black">{{ index + 1 }}</span>
                  </div>

                  <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 group-hover:border-blue-200 transition-colors">
                    <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <h4 class="text-lg font-black text-gray-900 leading-tight">{{ m.title }}</h4>
                      <span class="inline-flex text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase self-start">
                        Termín: {{ m.date_of_reasisation }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed font-medium">{{ m.description }}</p>

                    <div class="mt-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                      <div class="flex items-center gap-2">
                        <span class="flex h-2 w-2 rounded-full bg-blue-500"></span>
                        <span class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Spätná väzba od mentora</span>
                      </div>
                      <p v-if="m.comment" class="text-sm text-gray-800 italic font-medium leading-relaxed">
                        "{{ m.comment }}"
                      </p>
                      <p v-else class="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">
                        Zatiaľ bez komentára...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-black uppercase tracking-tight">
                {{ data.status === 'team_draft' ? 'Skladanie tímu' : 'Tímová zostava' }}
              </h2>
              <span class="text-xs font-black text-gray-400 uppercase tracking-widest">{{ data.team_members.length }} / {{ maxClenov }} Členov</span>
            </div>

            <div class="overflow-hidden border-2 border-gray-100 rounded-2xl">
              <table class="w-full text-left border-collapse text-sm">
                <thead class="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th class="p-4">Meno / Email</th>
                    <th class="p-4 text-center">Rola v tíme</th>
                    <th class="p-4 text-center">Status</th>
                    <th v-if="data.status === 'team_draft'" class="p-4 text-right">Akcia</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-bold">
                  <tr v-for="member in data.team_members" :key="member.email">
                    <td class="p-4 flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-black">STUD</div>
                      <div>
                        <p class="text-gray-900">{{ member.name || 'Študent' }}</p>
                        <p class="text-[10px] text-gray-400 font-medium tracking-tight text-nowrap">{{ member.email }}</p>
                      </div>
                    </td>
                    <td class="p-4 text-center">
                      <span v-if="member.role === 'teamleader'" class="bg-gray-100 text-gray-600 text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider">Teamleader</span>
                      <span v-else class="bg-gray-100 text-gray-600 text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider">Člen tímu</span>
                    </td>
                    <td class="p-4 text-center">
                      <div v-if="member.status === 'invited'" class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-[9px] font-black uppercase px-3 py-1 rounded-full text-nowrap">
                        Pozvaný
                      </div>
                      <div v-else class="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-[9px] font-black uppercase px-3 py-1 rounded-full text-nowrap">
                        Aktívny
                      </div>
                    </td>
                    <td v-if="data.status === 'team_draft' && member.role === 'member'" class="p-4 text-right">
                      <button @click="odstranitClena(member.student_id)" class="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-xl">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section v-if="data.status === 'team_draft' && (data.team_members.length < maxClenov)" class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-black uppercase tracking-tight">Pridať ďalších členov</h2>
              <div class="bg-gray-100 px-3 py-1 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest text-nowrap">
                Zostáva: {{ maxClenov - data.team_members.length }} miest
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-3">
              <input v-model="novyClenEmail" type="email" placeholder="zadajte.email@student.sk" class="flex-grow bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 focus:border-blue-500 outline-none font-bold transition-all" @keyup.enter="pozvatClena" />
              <button @click="pozvatClena" class="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg text-nowrap">
                Poslať pozvánku
              </button>
            </div>
          </section>

        </div>
      </div>

      <section v-if="data.finished_projects.length > 0" class="space-y-8 pt-12 border-t-2 border-gray-200 border-dashed">
        <div class="px-2">
          <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tight">História projektov</h2>
          <p class="text-gray-500 text-sm font-medium mt-1">Prehľad dokončených výziev a hodnotenia.</p>
        </div>
        
        <div class="flex flex-col gap-4">
          <div 
            v-for="project in data.finished_projects" 
            :key="project.id" 
            class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
            :class="{'ring-2 ring-blue-500 shadow-xl': otvorenyProjektId === project.id}"
          >
            <div @click="toggleProject(project.id)" class="p-6 cursor-pointer hover:bg-gray-50 flex items-start justify-between transition-colors">
              <div class="space-y-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">ID #{{ project.id }}</span>
                  <span class="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">Dokončené</span>
                </div>
                <h3 class="font-black text-xl text-gray-900 leading-tight">
                  {{ project.name }}
                </h3>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] mt-1">
                  Uzavreté: {{ project.date_of_completion }}
                </p>
              </div>
              <div class="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300"
                   :class="{'rotate-180 bg-blue-600 text-white': otvorenyProjektId === project.id, 'bg-gray-100 text-gray-400': otvorenyProjektId !== project.id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div v-if="otvorenyProjektId === project.id" class="p-6 border-t border-gray-100 bg-gray-50/50 animate-in slide-in-from-top-2 duration-300">
              <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div class="flex items-center gap-2 mb-4">
                  <span class="flex h-2 w-2 rounded-full bg-blue-500"></span>
                  <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Záverečné hodnotenie</h4>
                </div>
                <p class="text-sm font-medium text-gray-800 italic leading-relaxed relative z-10">
                  "{{ project.final_assessment }}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "StudentDashboardView",
  data() {
    return {
      backendApiUrl: import.meta.env.VITE_BACKEND_API_URL,
      otvorenyProjektId: null,
      novyClenEmail: "",
      maxClenov: 10,
      sablonaUrl: `${import.meta.env.VITE_BACKEND_API_URL}/storage/documents/Cestne_vyhlasenie_vyvoj_softveru.docx`,
      statuory_declaration_file: null, // Sem sa korektne uloží vybraný File objekt
      
      data: {
        status: "basic", // basic, invited, team_draft, team_waiting_for_approval, approved_team
        finished_projects: [],
        team_members: [],
        milestones: [],
      },
    };
  },
  computed: {
    schvaleniClenoviaPocet() {
      return 1 + (this.data.team_members || []).filter(m => m.status === 'active').length;
    },
    vsetciPozvaniPrijali() {
      if (!this.data.team_members) return false;
      return this.data.team_members.every(member => member.status === 'active');
    },
    mozeOdoslat() {
      return this.data.status === 'team_draft' && this.vsetciPozvaniPrijali;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${this.backendApiUrl}/api/auth/student`);
        this.data = response.data;
        console.log(this.data);
      }
      catch (error) {
        console.error("Fetch error:", error);
      }
    },
    toggleProject(id) {
      this.otvorenyProjektId = this.otvorenyProjektId === id ? null : id;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.statuory_declaration_file = file;
      }
    },
    async prijatPozvanku() {
      if (!this.statuory_declaration_file) {
        alert("Pred prijatím pozvánky musíte nahrať čestné vyhlásenie.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append('statuory_declaration', this.statuory_declaration_file);
        await axios.post(`${this.backendApiUrl}/api/auth/student/accept-invitation`, formData);
        
        this.statuory_declaration_file = null;
        this.fetchData();
      }
      catch (error) {
        alert("Chyba pri prijatí pozvánky.");
        console.error(error);
      }
    },
    async odmietnutPozvanku() {
      try {
        await axios.post(`${this.backendApiUrl}/api/auth/student/reject-invitation`);
        this.fetchData();
      }
      catch (error) {
        alert("Chyba pri odmietnutí pozvánky.");
        console.error(error);
      }
    },
    async pozvatClena() {
      const email = this.novyClenEmail.trim().toLowerCase();
      if (!email || !email.includes('@') || this.data.team_members.find(m => m.email === email)) return;
      
      try {
        const formData = new FormData();
        formData.append('email', email);
        await axios.post(`${this.backendApiUrl}/api/auth/team/${this.data.team_id}/invite-member`, formData);
        this.novyClenEmail = "";
        this.fetchData();
      }
      catch (error) {
        alert("Chyba pri posielaní pozvánky.");
        console.error(error);
      }
    },
    async odstranitClena(student_id) {
      try {
        await axios.delete(`${this.backendApiUrl}/api/auth/team/${this.data.team_id}/remove-member/${student_id}`);
        this.fetchData();
      }
      catch (error) {
        alert("Chyba pri odstraňovaní člena.");
        console.error(error);
      }
    },
    async odstranitTim() {
      if (confirm("Naozaj chcete vymazať tím?")) {
        try {
          console.log(`${this.backendApiUrl}/api/auth/team/${this.data.team_id}`);
          await axios.delete(`${this.backendApiUrl}/api/auth/team/${this.data.team_id}`);
          this.fetchData();
        }
        catch (error) {
          alert("Chyba pri odstraňovaní timu.");
          console.error(error);
        }
      }
    },
    async odoslatNaSchvalenie() {
      if (this.mozeOdoslat) {
        try {
          await axios.post(`${this.backendApiUrl}/api/auth/team/${this.data.team_id}/send-for-approval`);
          this.fetchData();
        }
        catch (error) {
          alert("Chyba pri odoslaní na schvalenie.");
          console.error(error);
        }
      }
    }
  }
};
</script>

<style scoped>
.animate-in { animation: slide-in 0.4s ease-out; }
@keyframes slide-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>