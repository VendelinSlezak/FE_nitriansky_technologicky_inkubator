<script>
import MenuComponent from './components/MenuComponent.vue';

export default {
    name: 'App',
    components: {
        MenuComponent,
    },
}
</script>

<template>
    <MenuComponent />
    <router-view />
</template>

<style>
</style>