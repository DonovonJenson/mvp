angular.module('app')

.component('main', {
	
	controller: function($http) {
	  this.rhyme = 'Blank'

	  this.getRhymes = () => {
	  	$http.get('/rhymes', {}).then((response) => {
	  	this.rhyme = response.data
	  	if (this.rhyme.length === 0){
	  		this.getRhymes();
	  	}
  		})
  		 console.log(this)
      }

      this.$onInit = () => {
      	this.getRhymes();
        //setInterval(this.getRhymes, 5000);
      };

    },


    template: 'Your Word Is: {{$ctrl.rhyme[0].word}}!'

});