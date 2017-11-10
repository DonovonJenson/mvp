angular.module('app')

.component('main', {
	
	controller: function($http) {
	  this.message = 'HELLO!';

	  this.getRhymes = function() {
	  	$http.get('/rhymes', {}).then(function successCallback(response) {
  		 console.log(response)
  		})
      }

      this.$onInit = function () {
        this.getRhymes();
      };

    },


    template: 'Hello, {{$ctrl.message}}!'

});