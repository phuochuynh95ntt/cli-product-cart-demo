import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import './assets/styles/main.css'
import './assets/styles/style.scss'

const myApp = createApp(App)
myApp.use(router)
myApp.mount('#app')
