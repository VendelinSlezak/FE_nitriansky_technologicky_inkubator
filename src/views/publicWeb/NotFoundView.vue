<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12">
    <div class="text-center max-w-md">
      <div class="flex justify-center mb-6">
        <div class="p-4 bg-indigo-50 rounded-full text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
      </div>

      <p class="text-base font-semibold text-indigo-600">404</p>
      
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Stránka sa nenašla
      </h1>
      
      <p class="mt-4 text-base leading-7 text-gray-600">
        Prepáčte, ale stránku, ktorú hľadáte, sme nenašli. Možno bola presunutá alebo už neexistuje.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  mounted() {
    document.title = "Nitriansky technologický inkubátor";
  },
}
</script>