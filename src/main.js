import Vue from 'vue';
import App from './App.vue';

// ----------------------------------------------
// Vuetify --------------------------------------
// ----------------------------------------------

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use( Vuetify, {} );

// import wysiwyg from "./editor";
// Vue.use(wysiwyg, {
//   hideModules: {
//     bold: false
//   }
// });

new Vue({
  el: '#app',
  render: h => h(App)
})
