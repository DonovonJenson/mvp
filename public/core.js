angular.module('app')

.component('main', {
	
	controller: function($http) {
	  this.rhyme = 'Blank'

	  this.getRhymes = () => {
	  	$http.get('/rhymes', {}).then((response) => {
	  		console.log(response.data)
	  	if (response.data.length < 5){
	  		this.getRhymes();
	  	} else {
	  		response.data.sort((a,b) => {
		  		if (a.score !== b.score){
		  			return b.score - a.score
		  		} else if (a.syllables !== b.syllables) {
		  			return a.syllables - b.syllables
		  		} else {
				  return b.freq - a.freq;
				  }
			})
			console.log(response.data)
	  		this.rhyme = response.data
	  	}
  		})
      }

      this.$onInit = () => {
      	this.getRhymes();
        //setInterval(this.getRhymes, 5000);
      };

    },


    templateUrl: './template.html' 

});