import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

if (process.BROWSER_BUILD) {
    Vue.use(VueLocalStorage)
}