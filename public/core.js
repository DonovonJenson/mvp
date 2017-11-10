angular.module('app')

.component('main', {
	
	controller: function($http) {
	  this.rhyme = 'Blank'

	  this.getRhymes = () => {
	  	$http.get('/rhymes', {}).then((response) => {
	  	this.rhyme = response.data
  		 console.log(this)
  		})
      }

      this.$onInit = () => {
        setInterval(this.getRhymes, 5000);
      };

    },


    template: 'Hello, {{$ctrl.rhyme}}!'

});