import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import { useAuthStore } from '@/stores/auth.js'
import axios from 'axios'

const app = createApp(App)

app.use(VueReCaptcha, { 
  siteKey: '6Lf_7MksAAAAAIz3hyHSMtvbHueY5BKunqpSmlM-',
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: false
  }
})
app.use(createPinia())
app.use(router)

axios.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore();
            authStore.logout();
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

app.mount('#app')
