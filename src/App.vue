<script>
import MenuComponent from './components/MenuComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
    name: 'App',
    components: {
        MenuComponent,
        FooterComponent,
    },
}
</script>

<template>
    <MenuComponent />
    <router-view />
    <FooterComponent />
</template>

<style>
</style>