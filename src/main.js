import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import { VueReCaptcha } from 'vue-recaptcha-v3'

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

app.mount('#app')
