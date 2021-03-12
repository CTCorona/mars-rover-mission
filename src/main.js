import Vue from 'vue'
import _utils from './plugins/_utils'
import App from './App.vue'

Vue.use( _utils )

Vue.config.productionTip = false

new Vue( {
	render : h => h( App ),
} ).$mount( '#app' )
