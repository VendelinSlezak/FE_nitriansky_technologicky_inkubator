<script>
export default {
    name: 'MenuComponent',
    data() {
        return {
            navLinks: [
                { name: 'Domov', path: '/' },
                { name: 'O nás', path: '/o-nas' },
                { name: 'Program A', path: '/program-a' },
                { name: 'Program B', path: '/program-b' },
                { name: 'Kontakt', path: '/kontakt' }
            ]
        }
    },
}
</script>

<template>
    <nav class="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg p-4">
        <div class="container mx-auto flex items-center justify-between">
            <router-link to="/" class="flex items-center space-x-2 text-white text-2xl font-bold tracking-wide">
                <span>NTI</span>
                <span class="text-sm font-normal ml-2">Nitriansky Technologický Inkubátor</span>
            </router-link>

            <div class="flex space-x-4">
                <router-link
                v-for="link in navLinks"
                :key="link.name"
                :to="link.path"
                class="nav-square group"
                >
                {{ link.name }}
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script scoped>
</script>