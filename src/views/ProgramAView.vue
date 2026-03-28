<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 lg:py-24">
      <div class="container mx-auto px-4 max-w-4xl">
        <span class="inline-block mb-4 px-3 py-1 bg-blue-500 rounded-full text-sm font-semibold">Program A</span>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Grantový inkubačný program</h1>
        <p class="text-xl text-blue-100 mb-8">
          Máte vlastný inovatívny nápad? Získajte financovanie, mentoring a podporu pre
          váš startup alebo produkt. Zmeňte svoj nápad na úspešný biznis.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <router-link to="/registracia">
            <Button size="lg" class="bg-white text-blue-700 hover:bg-blue-50">
              Podať prihlášku
              <ArrowRight class="ml-2 h-5 w-5" />
            </Button>
          </router-link>
          <Button size="lg" variant="outline" class="border-white text-white hover:bg-white/10">
            Stiahnuť podmienky
          </Button>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-8 text-center">Ako to funguje</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div v-for="(step, index) in steps" :key="index" class="text-center">
            <div class="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {{ index + 1 }}
            </div>
            <h3 class="font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Tematické kategórie</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card v-for="(category, index) in categories" :key="index" class="border-2 hover:border-blue-300 transition-colors">
            <CardHeader>
              <div class="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <component :is="category.icon" class="h-6 w-6" />
              </div>
              <CardTitle>{{ category.title }}</CardTitle>
              <CardDescription>{{ category.description }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>

    <!-- Requirements -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-8 text-center">Požiadavky na uchádzačov</h2>
        <Card class="border-2 border-blue-100">
          <CardContent class="pt-6">
            <ul class="space-y-4">
              <li v-for="(req, index) in requirements" :key="index" class="flex items-start">
                <CheckCircle2 class="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <span class="text-lg">{{ req }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Required Documents -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Povinná projektová dokumentácia</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card v-for="(doc, index) in documents" :key="index">
            <CardHeader>
              <component :is="doc.icon" class="h-8 w-8 text-blue-600 mb-3" />
              <CardTitle class="text-lg">{{ doc.title }}</CardTitle>
              <CardDescription>{{ doc.description }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-8 text-center">Čo získate</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(benefit, index) in benefits" :key="index" class="flex items-start">
            <CheckCircle2 class="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <span class="text-lg">{{ benefit }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="py-16 bg-blue-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-8 text-center">Harmonogram</h2>
        <Card>
          <CardContent class="pt-6">
            <div class="space-y-6">
              <div v-for="(item, index) in timeline" :key="index" class="flex items-start">
                <component :is="item.icon" class="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <div class="font-semibold text-lg mb-1">{{ item.title }}</div>
                  <p class="text-gray-600">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="container mx-auto px-4 max-w-3xl text-center">
        <h2 class="text-3xl font-bold mb-4">Pripravení zmeniť váš nápad na realitu?</h2>
        <p class="text-xl mb-8 text-blue-100">
          Podajte prihlášku do Program A a získajte podporu pre váš inovatívny projekt
        </p>
        <router-link to="/registracia">
          <Button size="lg" class="bg-white text-blue-700 hover:bg-blue-50">
            Podať prihlášku teraz
            <ArrowRight class="ml-2 h-5 w-5" />
          </Button>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle2, ArrowRight, FileText, Users, Banknote, Calendar, Smartphone, Brain, Globe, Gamepad2, Cpu } from "lucide-vue-next";

export default {
  name: "ProgramA",
  components: {
    Card, CardContent, CardHeader, CardTitle, CardDescription, Button,
    CheckCircle2, ArrowRight, FileText, Users, Banknote, Calendar, Smartphone, Brain, Globe, Gamepad2, Cpu
  },
  data() {
    return {
      steps: [
        { title: "Registrácia tímu", description: "Vytvorte tím minimálne 3 členov" },
        { title: "Podanie prihlášky", description: "Vyplňte prihlášku a nahrajte dokumentáciu" },
        { title: "Hodnotenie", description: "Komisia vyhodnotí váš projekt" },
        { title: "Realizácia", description: "Realizujte projekt s mentorom" },
      ],
      categories: [
        { icon: Smartphone, title: "Vývoj softvéru", description: "Desktop, mobilné aplikácie, embedded systémy" },
        { icon: Brain, title: "AI a dátové technológie", description: "AI aplikácie, strojové učenie, analýza dát" },
        { icon: Globe, title: "Webové aplikácie", description: "Internetové a prehliadačové aplikácie" },
        { icon: Gamepad2, title: "Herný vývoj", description: "Herné aplikácie, 3D vývoj, VR/AR" },
        { icon: Cpu, title: "IoT a embedded systémy", description: "Internet vecí, robotika, priemyselné systémy" },
      ],
      documents: [
        { icon: FileText, title: "Executive Summary", description: "Stručný opis problému, riešenia, trhu a prínosu" },
        { icon: FileText, title: "Technická architektúra", description: "Opis riešenia, technológií, modulov a prevádzky" },
        { icon: FileText, title: "Roadmapa", description: "Míľniky, plán realizácie a harmonogram" },
        { icon: FileText, title: "Rozpočet", description: "Plán čerpania grantu a očakávané náklady" },
        { icon: FileText, title: "Riziková analýza", description: "Identifikácia rizík, dopadov a mitigácií" },
        { icon: FileText, title: "Monetizačný model", description: "Spôsob vytvárania hodnoty a príjmov produktu" },
      ],
      requirements: [
        "Minimálna veľkosť tímu: 3 členovia",
        "Študenti bez prenášaných predmetov",
        "Dobrý priemer profilových predmetov",
        "Originálny inovatívny nápad",
        "Technická realizovateľnosť projektu",
      ],
      benefits: [
        "Grantové financovanie projektu",
        "Prístup k infraštruktúre a technológiám",
        "Profesionálny mentoring od skúsených odborníkov",
        "Podpora až do uvedenia produktu na trh",
        "Možnosť získať investície",
        "Budovanie portfólia a referencií",
      ],
      timeline: [
        { icon: Calendar, title: "Kvartálne hodnotiace kolá", description: "Prihlášky sa hodnotia 4x ročne podľa harmonogramu výziev" },
        { icon: Users, title: "Onboarding a pridelenie mentora", description: "Po schválení vás sprevádzame celým procesom realizácie" },
        { icon: Banknote, title: "Priebežné financovanie podľa míľnikov", description: "Grant čerpáte postupne na základe dosiahnutých míľnikov" },
      ],
    };
  },
  mounted() {
    document.title = "Program A | NTI";
  },
};
</script>

<style scoped>
/* Tailwind utility sa používa priamo v template */
</style>