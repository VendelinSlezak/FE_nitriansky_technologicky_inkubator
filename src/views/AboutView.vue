<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div class="container mx-auto px-4 text-center max-w-3xl">
        <span class="inline-block mb-4 px-3 py-1 bg-blue-500 rounded-full text-sm font-semibold">O nás</span>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Nitriansky technologický inkubátor</h1>
        <p class="text-xl text-blue-100">
          Podporujeme rozvoj technologických talentov, inovácie a podnikateľské myslenie
          v regióne Nitra a celom Slovensku
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-6 text-center">Naša misia</h2>
        <p class="text-lg text-gray-700 mb-4">
          Nitriansky technologický inkubátor vznikol ako odpoveď na potrebu systematickej
          podpory inovatívnych projektov a technologických talentov v regióne. Našim cieľom
          je vytvárať nové projekty, startupy a profesionálne IT tímy s medzinárodným
          potenciálom.
        </p>
        <p class="text-lg text-gray-700 mb-4">
          Zameriavame sa na riešenie odlivu talentov z regiónu a podporu podnikateľského
          myslenia medzi študentmi. Prepájame akademické prostredie s praxou a vytvárame
          ekosystém, v ktorom môžu inovácie rásť a prosperovať.
        </p>
      </div>
    </section>

    <!-- Pillars Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Strategické piliere NTI</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card v-for="(pillar, index) in pillars" :key="index" class="border-2" :class="pillar.border">
            <CardHeader>
              <div :class="`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${pillar.bgColor} ${pillar.textColor}`">
                <component :is="pillar.icon" class="h-6 w-6" />
              </div>
              <CardTitle>{{ pillar.title }}</CardTitle>
              <CardDescription>{{ pillar.description }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Naše hodnoty</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div v-for="(value, index) in values" :key="index" class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <component :is="value.icon" class="h-8 w-8" />
            </div>
            <h3 class="font-semibold text-lg mb-2">{{ value.title }}</h3>
            <p class="text-gray-600 text-sm">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Náš tím</h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card v-for="(member, index) in team" :key="index">
            <CardHeader>
              <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mx-auto mb-4"></div>
              <CardTitle class="text-center">{{ member.name }}</CardTitle>
              <CardDescription class="text-center text-blue-600 font-medium">{{ member.role }}</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-gray-600 text-center">{{ member.description }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-bold mb-6 text-center">Náš dopad</h2>
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div v-for="(impact, index) in impact" :key="index">
            <div class="text-4xl font-bold text-blue-600 mb-2">{{ impact.value }}</div>
            <div class="text-gray-600">{{ impact.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/*import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Target, Users, Lightbulb, TrendingUp, Building2, Award, Globe, Heart } from "lucide-vue-next";*/

export default {
  name: "About",
  /*components: { Card, CardContent, CardHeader, CardTitle, CardDescription, Target, Users, Lightbulb, TrendingUp, Building2, Award, Globe, Heart },*/
  data() {
    return {
      pillars: [
        { icon: Lightbulb, title: "Inkubácia", description: "Podporujeme vznik a akceleráciu projektov, evidenciu tímov, prihlášok, míľnikov a výstupov", border: "border-blue-100", bgColor: "bg-blue-100", textColor: "text-blue-700" },
        { icon: Building2, title: "Partnerstvá", description: "Spolupracujeme s firmami, ktoré zadávajú projekty a poskytujú prax našim študentom", border: "border-green-100", bgColor: "bg-green-100", textColor: "text-green-700" },
        { icon: Users, title: "Mentoring", description: "Priraďujeme skúsených mentorov, plánujeme konzultácie a sledujeme progres projektov", border: "border-purple-100", bgColor: "bg-purple-100", textColor: "text-purple-700" },
        { icon: Target, title: "Retencia", description: "Budujeme komunitu absolventov a udržiavame dlhodobú väzbu talentov na región", border: "border-orange-100", bgColor: "bg-orange-100", textColor: "text-orange-700" },
      ],
      values: [
        { icon: Lightbulb, title: "Inovácia", description: "Podporujeme nové nápady a technologické riešenia" },
        { icon: Users, title: "Spolupráca", description: "Prepájame študentov, firmy a mentorship" },
        { icon: Award, title: "Excelencia", description: "Kladieme dôraz na kvalitu a profesionalitu" },
        { icon: Heart, title: "Komunitný prístup", description: "Budujeme silnú komunitu technologických talentov" },
      ],
      team: [
        { name: "Prof. Ing. Martin Novák, PhD.", role: "Riaditeľ NTI", description: "Skúsený akademik a odborník na technologické inovácie" },
        { name: "Ing. Jana Kováčová", role: "Koordinátorka programov", description: "Zodpovedná za realizáciu programov A a B" },
        { name: "Mgr. Peter Horváth", role: "Manažér partnerstiev", description: "Buduje vzťahy s firmami a partnermi" },
      ],
      impact: [
        { value: "150+", label: "Absolventov programov" },
        { value: "45+", label: "Úspešných projektov" },
        { value: "30+", label: "Partnerských firiem" },
      ],
    };
  },
  mounted() {
    document.title = "O nás | NTI";
  },
};
</script>

<style scoped>
/* Tu môžeš doplniť vlastné štýly, Tailwind utility sa použijú priamo v template */
</style>