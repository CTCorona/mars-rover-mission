export default {
	install( Vue ) {
		
		Vue.prototype.$randomNumber = function ( l, a = 0 ) {
			return (Math.round( Math.random() * (l - 1) ) + a)
		}
	}
}
