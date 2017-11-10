angular.module('app')

.component('main', {
	
	controller: function() {
	 this.message = 'HELLO!'
    },

    template: 'Hello, {{$ctrl.message}}!'

});