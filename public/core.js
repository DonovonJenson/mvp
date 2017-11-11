angular.module('app')

.component('main', {
	
	controller: function($http) {
	  this.rhyme = 'Blank'
	  this.speed = 5000;

	  this.getRhymes = () => {
	  	$http.get('/rhymes', {}).then((response) => {
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
        //var continousRhymes = setInterval(this.getRhymes, this.speed);
      };

      this.speedIncrease = () => {
      	clearInterval(continousRhymes)
      	this.speed += 1000;
      	var continousRhymes = setInterval(this.getRhymes, this.speed);

      }

      this.speedDecrease = () => {
      	clearInterval(continousRhymes);
      	this.speed -= 1000;
      	console.log(this.speed)
      	var continousRhymes = setInterval(this.getRhymes, this.speed);
      }

    },


    templateUrl: './template.html' 

});